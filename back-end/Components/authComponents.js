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
        teamSize: user.teamSize ? parseInt(user.teamSize) : 1,
        invoices: user.Invoices,
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
  const { subscription, subscriptionDate, user_id, teamSize, subscriptionId } =
    req.body;

  try {
    const profile = await UserModel.findById(user_id);
    if (!profile) {
      return res.status(404).json({ error: "User not found" });
    }

    const startDate = new Date(subscriptionDate);
    let endDate = new Date(subscriptionDate);

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

    // Update teamSize if provided
    if (teamSize !== undefined) {
      profile.teamSize = teamSize;
    }

    // Store subscriptionId if provided
    if (subscriptionId) {
      profile.subscriptionId = subscriptionId;
    }

    // Create invoice if subscription is active
    if (subscription === "monthly" || subscription === "yearly") {
      if (!profile.Invoices) {
        profile.Invoices = [];
      }

      const newInvoice = {
        invoice: `Invoice_${startDate.toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        })}`,
        billingDate: startDate,
        endDate: endDate,
        plan: subscription,
        amount:
          (subscription === "monthly" ? 10 : 120) *
          (teamSize || profile.teamSize || 1),
        users: teamSize || profile.teamSize || 1,
        subscriptionId,
      };

      profile.Invoices.push(newInvoice);
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

const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({}, "fullName email avatar _id");
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const sendPasswordResetEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        error: "No user found with this email address",
      });
    }

    // Send password reset email
    const { Resend } = require("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    const resetLink = `https://simple-quotes-alter.vercel.app/#/changepass/${user._id}`;

    try {
      await resend.emails.send({
        from: "noreply@updates.jashkumar.dev",
        to: email,
        subject: "Password Reset - Simple Quotes",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #333; text-align: center;">Password Reset Request</h2>
            <p>Hello ${user.fullName},</p>
            <p>You have requested to reset your password for your Simple Quotes account.</p>
            <p>Please click the link below to reset your password:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetLink}" style="background-color: #df064e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
                Reset Password
              </a>
            </div>
            <p>If you didn't request this password reset, please ignore this email.</p>
            <p>This link will expire in 24 hours for security reasons.</p>
            <p>Best regards,<br>Simple Quotes Team</p>
          </div>
        `,
      });

      console.log("Password reset email sent successfully");
      return res.status(200).json({
        message: "Password reset email sent successfully",
      });
    } catch (emailError) {
      console.error("Error sending password reset email:", emailError);
      return res.status(500).json({ error: "Failed to send email" });
    }
  } catch (error) {
    console.error("Error sending password reset email:", error);
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
  getAllUsers,
  sendPasswordResetEmail,
};
