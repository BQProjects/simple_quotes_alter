const UserModel = require("../models/tempModel");
const WorkspaceModel = require("../models/workspaceModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const RecycleModel = require("../models/RecycleBinModel");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email) {
      return res.json({
        error: "email not entered",
      });
    }
    if (!password) {
      return res.json({
        error: "password not entered",
      });
    }
    const user = await UserModel.findOne({ email }).populate("goals");
    if (!user) {
      return res.json({
        error: "Username dont exist",
      });
    }

    const pass = await bcrypt.compare(password, user.password);
    if (!pass) {
      return res.json({
        error: "Password didnt match",
      });
    }

    const acesstoken = await jwt.sign(
      {
        name: user.username,
        id: user._id,
      },
      "My_key",
      { expiresIn: "15d" }
    );

    res.cookie("token", acesstoken, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    temp = {
      username: user.fullName,
      id: user.id,
      email: user.email,
      pendingWorkspaces: user.pendingWorkspaces,
      approvedWorkspaces: user.approvedWorkspaces,
      goals: user?.goals || [],
    };
    return res.json(temp);
  } catch (error) {
    console.log(error);
  }
};

const logout = (req, res) => {
  res.json({
    message: "something",
  });
};

const signUp = async (req, res) => {
  const {
    fullName,
    email,
    password,
    companyName,
    companySize,
    teamName,
    teamSize,
    workspaceName,
    workspaceColor,
    subscription,
  } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required.",
      });
    }

    const userExist = await UserModel.findOne({ email });
    if (userExist) {
      return res.status(400).json({
        error: "User already exists.",
      });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new UserModel({
      fullName,
      email,
      password: hashedPassword,
      companyName,
      companySize,
      teamName,
      teamSize,
      subscription: "trial",
      subscriptionDate: new Date(),
    });
    await user.save();

    const newuser = await UserModel.findOne({ email: email });
    if (!newuser) {
      return res.json({ message: "New user is not created" });
    }

    const workspace = new WorkspaceModel({
      workspaceName,
      workspaceColor,
      owner: newuser._id,
      favorite: false,
    });
    workspace.activities.push("New Workspace has been created");
    workspace.userActive.push(user._id);
    await workspace.save();

    const Recycle = new RecycleModel({
      user: newuser._id,
    });

    await Recycle.save();

    return res.status(201).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getUser = async (req, res) => {
  const { user_id } = req.query;
  try {
    const user = await UserModel.findById(user_id).populate("goals");
    if (user) {
      temp = {
        username: user.fullName,
        id: user.id,
        email: user.email,
        avatar: user.avatar,
        pendingWorkspaces: user?.pendingWorkspaces || [],
        approvedWorkspaces: user?.approvedWorkspaces || [],
        goals: user?.goals || [],
        subscription: user.subscription ? user.subscription : "trial",
        subscriptionDate: user.subscriptionDate
          ? user.subscriptionDate
          : new Date(),
        teamMembers: user.teamMembers ? user.teamMembers : 1,
        subscriptionEnd: user.subscriptionEnd || new Date(),
      };
      return res.json(temp);
    } else {
      return res.json({
        error: "No user Found",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const setSubscription = async (req, res) => {
  const { subscription, subscriptionDate, user_id } = req.body;

  try {
    const profile = await UserModel.findById(user_id);
    if (!profile) {
      return res.status(404).json({ error: "User not found" });
    }

    const startDate = new Date(subscriptionDate);
    let endDate = null;

    if (subscription === "expired") {
      profile.subscription = "expired";
    } else if (subscription === "monthly") {
      endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + 1);

      profile.subscription = "monthly";
      profile.subscriptionDate = startDate;
      profile.subscriptionEnd = endDate;

      // Update shared users
      if (Array.isArray(profile.sharedSubscription)) {
        await Promise.all(
          profile.sharedSubscription.map(async (sharedUserId) => {
            const sharedUser = await UserModel.findById(sharedUserId);
            if (sharedUser) {
              sharedUser.subscription = "shared";
              sharedUser.subscriptionDate = startDate;
              sharedUser.subscriptionEnd = endDate;
              await sharedUser.save();
            }
          })
        );
      }
    } else if (subscription === "yearly") {
      endDate = new Date(startDate);
      endDate.setFullYear(endDate.getFullYear() + 1);

      profile.subscription = "yearly";
      profile.subscriptionDate = startDate;
      profile.subscriptionEnd = endDate;
      if (Array.isArray(profile.sharedSubscription)) {
        await Promise.all(
          profile.sharedSubscription.map(async (sharedUserId) => {
            const sharedUser = await UserModel.findById(sharedUserId);
            if (sharedUser) {
              sharedUser.subscription = "shared";
              sharedUser.subscriptionDate = startDate;
              sharedUser.subscriptionEnd = endDate;
              await sharedUser.save();
            }
          })
        );
      }
    } else if (subscription === "canceled") {
      profile.subscription = subscription;
      if (Array.isArray(profile.sharedSubscription)) {
        await Promise.all(
          profile.sharedSubscription.map(async (sharedUserId) => {
            const sharedUser = await UserModel.findById(sharedUserId);
            if (sharedUser) {
              sharedUser.subscription = "canceled";
              await sharedUser.save();
            }
          })
        );
      }
    }

    await profile.save();
    return res.status(200).json(profile);
  } catch (error) {
    console.error("Error updating subscription:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const addMemeber = async (req, res) => {
  const { user_id, new_user } = req.body;
  try {
    const profile = await UserModel.findById(user_id);
    if (!profile.sharedSubscription.includes(new_user)) {
      profile.sharedSubscription.push(new_user);
    }
    const result = await UserModel.findById(new_user);
    await profile.save();
    res.json(result);
  } catch (error) {
    console.error("Error updating subscription:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getSharedUsers = async (req, res) => {
  const { user_id } = req.query;
  try {
    const profile = await UserModel.findById(user_id);
    const result = [];
    if (Array.isArray(profile.sharedSubscription)) {
      await Promise.all(
        profile.sharedSubscription.map(async (sharedUserId) => {
          const sharedUser = await UserModel.findById(sharedUserId);
          if (sharedUser) {
            result.push(sharedUser);
          }
        })
      );
    }
    res.json(result);
  } catch (error) {
    console.error("Error updating subscription:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const removeSharedUser = async (req, res) => {
  const { user_id, new_user } = req.body;
  try {
    const profile = await UserModel.findById(user_id);
    profile.sharedSubscription.pull(new_user);
    await profile.save();
    if (
      profile.subscription !== "trial" &&
      profile.subscription !== "canceled"
    ) {
      const user = await UserModel.findById(new_user);
      user.subscription = "canceled";
      user.save();
    }
    res.json(profile);
  } catch (error) {
    console.error("Error updating subscription:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getUserBGmail = async (req, res) => {
  const { email } = req.query;
  try {
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      res.json({
        error: "The email doesnt exist",
      });
    }
    res.json({
      id: user._id,
    });
  } catch (error) {
    console.error("Error updating subscription:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const chnagePassword = async (req, res) => {
  const { id, password } = req.body;
  try {
    const user = await UserModel.findById(id);
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();
    res.json({
      message: "Password Changed Successfully",
    });
  } catch (error) {
    console.error("Error updating subscription:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = {
  login,
  logout,
  signUp,
  getUser,
  setSubscription,
  addMemeber,
  removeSharedUser,
  getSharedUsers,
  getUserBGmail,
  chnagePassword,
};
