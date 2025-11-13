const WorkspaceModel = require("../models/workspaceModel");
const UserModel = require("../models/tempModel");
const ProposalModel = require("../models/proposeModel");
const AnalyticsModel = require("../models/analysticsModel");
const RecycleModel = require("../models/RecycleBinModel");
const ViewModel = require("../models/viewAnalystics");
const CollabModel = require("../models/collabModel");
const Stripe = require("stripe");
const mongoose = require("mongoose");

const stripe = new Stripe(process.env.STRIPE_KEY);

const stripePaymentIntegration = async (req, res) => {
  try {
    const { amount, user_id, plan, teamSize } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Subscription Plan - ${plan}`,
            },
            unit_amount: amount, // in cents
            recurring: {
              interval: plan === "yearly" ? "year" : "month",
            },
          },
          quantity: 1,
        },
      ],
      success_url: `https://simple-quotes-alter.vercel.app/#/subscription?success=true&plan=${plan}&user=${user_id}&teamSize=${teamSize}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `https://simple-quotes-alter.vercel.app/#/subscription?cancelled=true&plan=${plan}&user=${user_id}&teamSize=${teamSize}`,
      metadata: {
        user_id,
        plan,
      },
    });

    res.json({ url: session.url }); // Send Stripe redirect URL
  } catch (err) {
    console.error("Error creating checkout session:", err);
    res.status(500).json({ error: err.message });
  }
};

const workspaceUpdate = async (req, res) => {
  const { id, value } = req.body;

  try {
    const workspace = await WorkspaceModel.findByIdAndUpdate(id, {
      favorate: value,
    });
    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found" });
    }

    await workspace.save();
    return res.status(200).json(workspace);
  } catch (error) {
    console.error("Error editing workspace:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const temp = async (req, res) => {
  console.log(req.body);
  return res.json({
    results: req.body,
  });
};

const createAnalytics = async (req, res) => {
  const { temp, os, browser, country, sta, timespent, seen, id } = req.body;
  try {
    const proposal = await ProposalModel.findById(id);

    if (!proposal) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (!proposal.analytics) {
      proposal.analytics = [];
    }

    if (proposal.totalTime === undefined) {
      proposal.totalTime = 0;
    }

    if (!proposal.sectionWise) {
      proposal.sectionWise = {};
    }

    const totalFromSections = Object.values(temp).reduce(
      (sum, val) => sum + val,
      0
    );

    const view = new ViewModel({
      averageTime: totalFromSections,
      user: proposal.Users[0],
    });

    await view.save();

    const singleAnalystics = new AnalyticsModel({
      sectionWise: temp,
      proposal: id,
      os: os,
      browser: browser,
      country: country,
      sta: sta,
      totalTime: totalFromSections,
      seen: seen,
    });

    await singleAnalystics.save();

    proposal.analytics.push(singleAnalystics._id);
    proposal.totalTime = proposal.totalTime + totalFromSections;

    for (let key in temp) {
      if (proposal.sectionWise[key] === undefined) {
        proposal.sectionWise[key] = temp[key];
      } else {
        proposal.sectionWise[key] += temp[key];
      }
    }

    await proposal.save();
    return res.json(singleAnalystics);
  } catch (error) {
    console.error("Error creating workspace:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const workspaceCreate = async (req, res) => {
  const { user_id, workspaceName, workspaceColor, users } = req.body;

  try {
    // Create the workspace
    const workspace = new WorkspaceModel({
      workspaceName,
      workspaceColor,
      owner: [user_id],
      activities: ["New Workspace has been created"],
      favorate: false,
    });

    await workspace.save();

    // Find the user profile with populated collabs
    const profile = await UserModel.findById(user_id).populate("collab");

    const temp = `${profile.fullName} has successfully created a new workspace titled "${workspaceName}". You can review the details and track its progress in your dashboard.`;

    if (profile.notifications === undefined) {
      profile.notifications = [];
    }

    profile.notifications.push({
      title: "Workspace created Successfully!",
      discription: temp,
      createdAt: new Date(),
    });

    await profile.save();

    // Loop through the user's collabs
    for (let collab of profile.collab) {
      const isFullType = collab.type === "full";
      if (isFullType) {
        workspace.collabUsers.push(collab.user);
        await workspace.save();
        collab.workspaces.push(workspace._id);
        await collab.save(); // Save the updated collab
      }
    }

    // Send email notification if enabled
    if (profile.EmailN) {
      const { Resend } = require("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);

      try {
        await resend.emails.send({
          from: "noreply@updates.jashkumar.dev",
          to: profile.email,
          subject: "New Workspace Created",
          html: `<p>Hi ${profile.fullName},</p><p>You have successfully created a new workspace titled "${workspaceName}".</p><p>You can review the details and track its progress in your dashboard.</p>`,
        });
        console.log("Workspace creation email sent successfully");
      } catch (emailError) {
        console.error("Error sending workspace creation email:", emailError);
      }
    }

    return res.status(201).json(workspace);
  } catch (error) {
    console.error("Error creating workspace:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const workspaceDelete = async (req, res) => {
  const { id } = req.params;

  try {
    const workspace = await WorkspaceModel.findByIdAndDelete(id);

    return res.status(200).json(workspace);
  } catch (error) {
    console.error("Error editing workspace:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const workspaceGetAll = async (req, res) => {
  const { user_id, sortw } = req.query;

  if (!user_id) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    let workspaces = await WorkspaceModel.find({ owner: user_id })
      .populate("proposals")
      .lean();

    if (!workspaces.length) {
      return res
        .status(404)
        .json({ message: "No workspaces found for this user" });
    }

    // Sort proposals inside each workspace
    workspaces = workspaces.map((workspace) => {
      if (workspace.proposals && Array.isArray(workspace.proposals)) {
        workspace.proposals.sort((a, b) => {
          if (a.favorite === b.favorite) {
            return a.proposalName.localeCompare(b.proposalName);
          }
          return b.favorite - a.favorite;
        });
      }
      return workspace;
    });

    // Sort workspaces based on sortw
    if (sortw === "alp") {
      workspaces.sort((a, b) => a.workspaceName.localeCompare(b.workspaceName));
    } else if (sortw === "recent") {
      workspaces.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortw === "") {
      // Favorite workspaces first, then alphabetical
      workspaces.sort((a, b) => {
        const aFav = a.favorite ? 1 : 0;
        const bFav = b.favorite ? 1 : 0;

        if (aFav === bFav) {
          return a.workspaceName.localeCompare(b.workspaceName);
        }
        return bFav - aFav;
      });
    }

    return res.status(200).json(workspaces);
  } catch (error) {
    console.error("Error fetching workspaces:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getfavorate = async (req, res) => {
  const { user_id } = req.query;

  if (!user_id) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const proposals = await ProposalModel.find({
      Users: user_id,
    })
      .sort({ createdAt: -1 })
      .limit(5);

    return res.status(200).json(proposals);
  } catch (error) {
    console.error("Error fetching Proposals:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getNotifications = async (req, res) => {
  const { user_id } = req.query;

  if (!user_id) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const proposals = await UserModel.findById(user_id);
    return res.status(200).json(proposals.notifications);
  } catch (error) {
    console.error("Error fetching Proposals:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const markNotificationsAsRead = async (req, res) => {
  const { user_id } = req.body;

  if (!user_id) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const user = await UserModel.findById(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.notifications && user.notifications.length > 0) {
      user.notifications = user.notifications.map((notification) => ({
        ...notification,
        read: true,
      }));
      await user.save();
    }

    return res.status(200).json({ message: "Notifications marked as read" });
  } catch (error) {
    console.error("Error marking notifications as read:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getfavorateW = async (req, res) => {
  const { user_id } = req.query;

  if (!user_id) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const proposals = await WorkspaceModel.find({
      owner: user_id,
    })
      .sort({ createdAt: -1 })
      .limit(4);

    return res.status(200).json(proposals);
  } catch (error) {
    console.error("Error fetching Proposals:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getProposals = async (req, res) => {
  const { user_id, sort } = req.query;

  if (!user_id) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    let sortQuery = {};

    if (sort === "alp") {
      // Sort by title alphabetically (replace 'title' with actual field)
      sortQuery = { proposalName: 1 };
    } else if (sort === "recent") {
      // Sort by most recently created
      sortQuery = { createdAt: -1 };
    } else if (sort === "default") {
      // Custom: sort by `proposalMove.favorate` true first, then recent
      sortQuery = { favorate: -1, createdAt: -1 };
    }

    const proposals = await ProposalModel.find({
      Users: user_id,
      $or: [{ recycle: false }, { recycle: { $exists: false } }],
    }).sort(sortQuery);

    return res.status(200).json(proposals);
  } catch (error) {
    console.error("Error fetching Proposals:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const workspaceGet = async (req, res) => {
  const { workspace_id } = req.query;
  if (!workspace_id) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const workspace = await WorkspaceModel.findById(workspace_id).populate(
      "collabUsers"
    );

    return res.status(200).json(workspace);
  } catch (error) {
    console.error("Error fetching Proposals:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//Need to edit this for Collaberation still pending
const workspaceEdit = async (req, res) => {
  const { id, name, color, users } = req.body;

  try {
    const workspace = await WorkspaceModel.findById(id);
    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found" });
    }

    workspace.workspaceName = name;
    workspace.workspaceColor = color;

    if (Array.isArray(users) && users.length > 0) {
      const userDocs = await Promise.all(
        users.map(async (fullName) => {
          const user = await UserModel.findOne({ fullName });
          return user?._id;
        })
      );

      // Filter out undefined/null _id values
      workspace.userActive = userDocs.filter(Boolean);
    }

    await workspace.save();
    return res.status(200).json(workspace);
  } catch (error) {
    console.error("Error editing workspace:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getProposal = async (req, res) => {
  const id = req.query.id;
  try {
    const proposal = await ProposalModel.findById(id).populate({
      path: "analytics",
      options: { sort: { createdAt: -1 } }, // Sort by newest first
    });

    if (!proposal) {
      return res.status(404).json({ message: "Proposal not found" });
    }

    return res.status(200).json(proposal);
  } catch (error) {
    console.error("Error fetching proposal:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const createDuplicate = async (req, res) => {
  const { id, user_id } = req.body;

  try {
    const proposal = await ProposalModel.findById(id);
    if (!proposal)
      return res.status(404).json({ message: "Original proposal not found" });

    const user = await UserModel.findById(user_id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const workspace = await WorkspaceModel.findById(proposal.workspaces[0]);
    if (!workspace)
      return res.status(404).json({ message: "Workspace not found" });

    const duplicate = new ProposalModel({
      proposalName: proposal.proposalName + " (Duplicate)",
      data: proposal.data,
      Users: proposal.Users,
      workspaces: proposal.workspaces,
      favorate: false,
      locked: false,
      settings: proposal.settings || {}, // fallback to empty if undefined
      status: "Draft",
      views: 0,
      lastUpdate: new Date(),
    });

    await duplicate.save();

    // Add duplicate proposal to user's proposals
    if (!user.proposals) {
      user.proposals = [];
    }
    user.proposals.push(duplicate._id);
    await user.save();

    // Add duplicate proposal to workspace
    if (!workspace.proposals) {
      workspace.proposals = [];
    }
    workspace.proposals.push(duplicate._id);
    await workspace.save();

    return res.status(201).json(duplicate);
  } catch (error) {
    console.error("Error creating proposal duplicate:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const proposalRename = async (req, res) => {
  const { id, name } = req.body;

  try {
    const proposal = await ProposalModel.findByIdAndUpdate(id, {
      proposalName: name,
    });

    await proposal.save();
    return res.status(201).json(proposal);
  } catch (error) {
    console.error("Error creating proposal:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteProposal = async (req, res) => {
  const { id, user_id } = req.body;

  try {
    const proposal = await ProposalModel.findById(id);
    if (!proposal) {
      return res.status(404).json({ message: "Proposal not found" });
    }

    const user = await UserModel.findById(user_id);
    const workspace = await WorkspaceModel.findById(proposal.workspaces[0]);

    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found" });
    }

    // Remove proposal from workspace
    workspace.proposals.pull(proposal._id);
    await workspace.save();

    proposal.recycle = true;
    await proposal.save();

    // Move proposal to recycle bin
    const recycle = new RecycleModel({
      user: user._id,
      proposals: proposal._id,
    });
    await recycle.save();

    return res
      .status(200)
      .json({ message: "Proposal deleted and moved to recycle bin" });
  } catch (error) {
    console.error("Error deleting proposal:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const proposalMove = async (req, res) => {
  const { id, workspace_id } = req.body;

  try {
    const proposal = await ProposalModel.findById(id);
    if (!proposal)
      return res.status(404).json({ message: "Proposal not found" });

    const currentWorkspaceId = proposal.workspaces[0];
    const workspace1 = await WorkspaceModel.findById(currentWorkspaceId);
    const workspace2 = await WorkspaceModel.findById(workspace_id);

    if (!workspace1 || !workspace2) {
      return res
        .status(404)
        .json({ message: "One or both workspaces not found" });
    }

    // Remove proposal from old workspace
    workspace1.proposals.pull(proposal._id);
    await workspace1.save();

    // Add proposal to new workspace
    workspace2.proposals.push(proposal._id);
    await workspace2.save();

    // Update proposal's workspace reference
    proposal.workspaces = [workspace2._id];
    await proposal.save();

    return res
      .status(200)
      .json({ message: "Proposal moved successfully", proposal });
  } catch (error) {
    console.error("Error moving proposal:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllRecycle = async (req, res) => {
  const { user_id } = req.query;
  try {
    const recycleProposals = await RecycleModel.find({ user: user_id })
      .populate({
        path: "proposals",
        model: "Proposal",
        populate: {
          path: "workspaces",
          model: "Workspaces", // make sure it's correctly registered
        },
      })
      .sort({ createdAt: -1 });

    return res.json(recycleProposals);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const deleteRecycle = async (req, res) => {
  const { proposal_id } = req.body;
  try {
    const temp = await RecycleModel.findById(proposal_id);
    const proposal = await ProposalModel.findByIdAndDelete(
      temp.proposals[0]._id
    );
    const deleted = await RecycleModel.findByIdAndDelete(proposal_id);
    return res.json({
      message: "The proposal has been deletd Permenantly",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const Restore = async (req, res) => {
  const { proposal_id } = req.body;
  try {
    const proposalr = await RecycleModel.findById(proposal_id).populate({
      path: "proposals",
      model: "Proposal",
      populate: {
        path: "workspaces",
        model: "Workspaces", // make sure it's correctly registered
      },
    });
    const workspace = await WorkspaceModel.findById(
      proposalr.proposals[0].workspaces[0]
    );
    const proposal = await ProposalModel.findById(proposalr.proposals[0]._id);
    proposal.recycle = false;
    await proposal.save();

    workspace.proposals.push(proposalr.proposals[0]._id);
    await workspace.save();
    await RecycleModel.findByIdAndDelete(proposal_id);
    return res.json({
      message: "Restored",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const getViews = async (req, res) => {
  const { user_id } = req.query;
  let avg = 0;
  let sum = 0;

  // ----- Today -----
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);

  // ----- Yesterday -----
  const startOfYesterday = new Date(startOfToday);
  startOfYesterday.setDate(startOfYesterday.getDate() - 1);

  const endOfYesterday = new Date(endOfToday);
  endOfYesterday.setDate(endOfYesterday.getDate() - 1);

  // ----- This Week -----
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 (Sun) to 6 (Sat)
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - dayOfWeek);
  startOfWeek.setHours(0, 0, 0, 0);

  // ----- Last Week -----
  const startOfLastWeek = new Date(startOfWeek);
  startOfLastWeek.setDate(startOfLastWeek.getDate() - 7);

  const endOfLastWeek = new Date(startOfWeek);
  endOfLastWeek.setMilliseconds(-1); // one ms before this week's start

  try {
    const [daily, yesterday, week, lastWeek, total] = await Promise.all([
      // Today
      ViewModel.find({
        user: user_id,
        createdAt: { $gte: startOfToday, $lte: endOfToday },
      }),
      // Yesterday
      ViewModel.find({
        user: user_id,
        createdAt: { $gte: startOfYesterday, $lte: endOfYesterday },
      }),
      // This week
      ViewModel.find({
        user: user_id,
        createdAt: { $gte: startOfWeek },
      }),
      // Last week
      ViewModel.find({
        user: user_id,
        createdAt: { $gte: startOfLastWeek, $lte: endOfLastWeek },
      }),
      // Total
      ViewModel.find({ user: user_id }),
    ]);

    // Average time spent
    total.forEach((item) => {
      sum += item.averageTime || 0;
    });
    avg = total.length > 0 ? sum / total.length : 0;

    // Calculate percentage change (safe divide)
    const calcChange = (current, prev) => {
      if (prev === 0) return current > 0 ? 100 : 0; // avoid /0
      return ((current - prev) / prev) * 100;
    };

    return res.json({
      dailyViews: daily.length,
      yesterdayViews: yesterday.length,
      dailyChange: calcChange(daily.length, yesterday.length),

      weekViews: week.length,
      lastWeekViews: lastWeek.length,
      weekChange: calcChange(week.length, lastWeek.length),

      totalViews: total.length,
      timespent: avg,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const getProfil = async (req, res) => {
  const { user_id } = req.query;

  try {
    const profile = await UserModel.findById(user_id);
    return res.json(profile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const changeAvatar = async (req, res) => {
  const { user_id, url } = req.body;

  try {
    const profile = await UserModel.findById(user_id);
    profile.avatar = url;
    await profile.save();
    return res.json({
      message: "Profile Update Succesfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const changeUsername = async (req, res) => {
  const { user_id, data } = req.body;

  try {
    const profile = await UserModel.findById(user_id);
    profile.fullName = data;
    await profile.save();
    return res.json({
      message: "Profile Update Succesfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const changeCountry = async (req, res) => {
  const { user_id, data } = req.body;

  try {
    const profile = await UserModel.findById(user_id);
    profile.country = data;
    await profile.save();
    return res.json({
      message: "Profile Update Succesfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const changePhone = async (req, res) => {
  const { user_id, data } = req.body;

  try {
    const profile = await UserModel.findById(user_id);
    profile.phoneNo = data;
    await profile.save();
    return res.json({
      message: "Profile Update Succesfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const changeAddress = async (req, res) => {
  const { user_id, data } = req.body;

  try {
    const profile = await UserModel.findById(user_id);
    profile.adress = data;
    await profile.save();
    return res.json({
      message: "Profile Update Succesfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const changeTime = async (req, res) => {
  const { value, user_id } = req.body;
  try {
    const profile = await UserModel.findById(user_id);
    profile.Time = value;
    await profile.save();
    return res.json({
      message: "profile has been updated",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};
const changeCurency = async (req, res) => {
  const { value, user_id } = req.body;
  try {
    const profile = await UserModel.findById(user_id);
    profile.Curency = value;
    await profile.save();
    return res.json({
      message: "profile has been updated",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};
const changeDataP = async (req, res) => {
  const { value, user_id } = req.body;
  try {
    const profile = await UserModel.findById(user_id);
    profile.DataP = value;
    await profile.save();
    return res.json({
      message: "profile has been updated",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};
const changeDataA = async (req, res) => {
  const { value, user_id } = req.body;
  try {
    const profile = await UserModel.findById(user_id);
    profile.DataA = value;
    await profile.save();
    return res.json({
      message: "profile has been updated",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};
const changeDataT = async (req, res) => {
  const { value, user_id } = req.body;
  try {
    const profile = await UserModel.findById(user_id);
    profile.DataT = value;
    await profile.save();
    return res.json({
      message: "profile has been updated",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};
const changeEmailN = async (req, res) => {
  const { value, user_id } = req.body;
  try {
    const profile = await UserModel.findById(user_id);
    profile.EmailN = value;
    await profile.save();
    return res.json({
      message: "profile has been updated",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};
const changePushN = async (req, res) => {
  const { value, user_id } = req.body;
  try {
    const profile = await UserModel.findById(user_id);
    profile.PushN = value;
    await profile.save();
    return res.json({
      message: "profile has been updated",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};
const changeWorkspaceN = async (req, res) => {
  const { value, user_id } = req.body;
  try {
    const profile = await UserModel.findById(user_id);
    profile.WorkspaceN = value;
    await profile.save();
    return res.json({
      message: "profile has been updated",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};
const changeProposalN = async (req, res) => {
  const { value, user_id } = req.body;
  try {
    const profile = await UserModel.findById(user_id);
    profile.ProposalN = value;
    await profile.save();
    return res.json({
      message: "profile has been updated",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const getAllUsers = async (req, res) => {
  const { user_id } = req.body;
  try {
    const profile = await UserModel.find({ _id: { $ne: user_id } });
    return res.json(profile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const AddTeamForAll = async (req, res) => {
  const { user_id, new_user_id } = req.body;

  try {
    const profile = await UserModel.findById(user_id);
    const workspaces = await WorkspaceModel.find({ owner: user_id });
    const workspaceIds = workspaces.map((workspace) => workspace._id);
    const collab = new CollabModel({
      admin: user_id,
      user: new_user_id,
      type: "full",
      workspaces: workspaceIds,
    });

    await collab.save();

    if (!profile.collab) {
      profile.collab = [];
    }
    // Add the new_user_id to each workspace's collabUser array
    for (const workspace of workspaces) {
      if (!workspace.collabUsers) {
        workspace.collabUsers = [];
      }

      // Avoid duplicating users
      if (!workspace.collabUsers.includes(new_user_id)) {
        workspace.collabUsers.push(new_user_id);
        await workspace.save();
      }
    }

    profile.collab.push(collab._id);
    await profile.save();

    return res.json(collab);
  } catch (error) {
    console.error("Error adding team member:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

const AddTeamForLimited = async (req, res) => {
  const { user_id, new_user_id, workspaceIds } = req.body;

  try {
    const profile = await UserModel.findById(user_id);
    const collab = new CollabModel({
      admin: user_id,
      user: new_user_id,
      type: "limited",
      workspaces: workspaceIds,
    });

    await collab.save();
    if (!profile.collab) {
      profile.collab = [];
    }

    profile.collab.push(collab._id);
    await profile.save();

    const workspaces = await WorkspaceModel.find({
      _id: { $in: workspaceIds },
    });
    for (const workspace of workspaces) {
      if (!workspace.collabUsers) {
        workspace.collabUsers = [];
      }

      // Avoid duplicates
      if (!workspace.collabUsers.includes(new_user_id)) {
        workspace.collabUsers.push(new_user_id);
        await workspace.save();
      }
    }

    return res.json(collab);
  } catch (error) {
    console.error("Error adding team member:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

const AddWorkspaceForExisting = async (req, res) => {
  const { collab_id, workspaceIds } = req.body;

  try {
    const collab = await CollabModel.findById(collab_id);

    if (!collab) {
      return res.status(404).json({ error: "Collaboration entry not found" });
    }

    const existingIds = new Set(collab.workspaces.map((id) => id.toString()));
    const newIds = workspaceIds.filter((id) => !existingIds.has(id.toString()));

    collab.workspaces.push(...newIds);
    await collab.save();

    return res.json({
      message: "New workspaces have been added successfully.",
    });
  } catch (error) {
    console.error("Error adding workspaces:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

const getTeamMembers = async (req, res) => {
  const { workspaceId, user_id } = req.body;

  try {
    // Populate the 'collab' field
    const profile = await UserModel.findById(user_id).populate({
      path: "collab",
      populate: {
        path: "user", // Populate user inside each collab
        model: "User", // Make sure this matches your User model name
      },
    });

    if (!profile) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find the collab object that contains the given workspaceId
    const matchingCollab = profile.collab.find((collab) =>
      collab.workspaces.some((wId) => wId.toString() === workspaceId.toString())
    );

    if (!matchingCollab) {
      return res
        .status(404)
        .json({ error: "No collaboration found for this workspace" });
    }

    return res.json({
      message: "Team member collaboration found.",
      collab: matchingCollab,
    });
  } catch (error) {
    console.error("Error getting team members:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

const getAllMembers = async (req, res) => {
  const { user_id } = req.query;

  try {
    const profile = await UserModel.findById(user_id).populate({
      path: "collab",
      populate: {
        path: "user",
        model: "User",
      },
    });

    if (!profile) {
      return res.status(404).json({ error: "User not found" });
    }

    const collaborations = profile.collab || [];

    return res.json({
      message: "Team member collaboration found.",
      collab: collaborations,
    });
  } catch (error) {
    console.error("Error getting team members:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

const addWorkspaceMember = async (req, res) => {
  const { collab_id, workspace_id } = req.body;

  try {
    // Fetch both documents
    const collab = await CollabModel.findById(collab_id);
    const workspace = await WorkspaceModel.findById(workspace_id);

    // Validate both
    if (!collab || !workspace) {
      return res
        .status(404)
        .json({ error: "Collab user or workspace not found" });
    }

    // Add workspace to collab (avoid duplicates)
    if (!collab.workspaces.includes(workspace_id)) {
      collab.workspaces.push(workspace_id);
    }

    // Add collab user to workspace (avoid duplicates)
    if (!workspace.collabUsers.includes(collab.user)) {
      workspace.collabUsers.push(collab.user);
    }

    // Save changes
    await Promise.all([collab.save(), workspace.save()]);

    return res.status(200).json({ message: "User added to workspace", collab });
  } catch (error) {
    console.error("Error adding team member:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

const DeleteUserToTheWorkspace = async (req, res) => {
  const { collab_id, workspace_id, user_id } = req.body;

  try {
    // Fetch both documents
    const collab = await CollabModel.findOne({
      admin: user_id,
      user: collab_id,
    });
    const workspace = await WorkspaceModel.findById(workspace_id);

    // Validate both
    if (!collab || !workspace) {
      return res
        .status(404)
        .json({ error: "Collab user or workspace not found" });
    }

    // Downgrade type if needed
    if (collab.type === "full") {
      collab.type = "limited";
    }

    // Remove workspace from collab workspaces array
    collab.workspaces.pull(workspace_id);

    // Remove collab user from workspace
    workspace.collabUsers.pull(collab.user);

    // Save changes
    await Promise.all([collab.save(), workspace.save()]);

    return res
      .status(200)
      .json({ message: "User removed from workspace", collab });
  } catch (error) {
    console.error("Error removing user from workspace:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

const getAllWorkspacesIncluded = async (req, res) => {
  const { user_id, sortw } = req.query;

  if (!user_id) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    // Step 1: Get owned and collab workspaces
    const ownedWorkspaces = await WorkspaceModel.find({
      owner: user_id,
    }).lean();

    const collabs = await CollabModel.find({ user: user_id }).populate(
      "workspaces"
    );
    let collabWorkspaces = [];
    collabs.forEach((item) => {
      collabWorkspaces = [
        ...collabWorkspaces,
        ...item.workspaces.map((ws) => ws.toObject()),
      ];
    });

    // Step 2: Combine and deduplicate
    const combinedWorkspaces = [...ownedWorkspaces, ...collabWorkspaces];
    const uniqueWorkspaces = Object.values(
      combinedWorkspaces.reduce((acc, ws) => {
        acc[ws._id.toString()] = ws;
        return acc;
      }, {})
    );

    // Step 3: Sort workspaces based on `sortw`
    const sortedWorkspaces = uniqueWorkspaces.sort((a, b) => {
      if (sortw === "alp") {
        return a.workspaceName.localeCompare(b.workspaceName);
      } else if (sortw === "recent") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else {
        // default or empty — favorite first, then A-Z
        const aFav = a.favorate ? 1 : 0;
        const bFav = b.favorate ? 1 : 0;
        if (aFav === bFav) {
          return a.workspaceName.localeCompare(b.workspaceName);
        }
        return bFav - aFav;
      }
    });

    // Step 4: Populate proposals and sort them
    const populatedWorkspaces = await Promise.all(
      sortedWorkspaces.map(async (ws) => {
        const fullWS = await WorkspaceModel.findById(ws._id)
          .populate("proposals")
          .lean();

        // Sort proposals: favorite first, then A–Z
        if (fullWS?.proposals?.length) {
          fullWS.proposals.sort((a, b) => {
            const aFav = a.favorate ? 1 : 0;
            const bFav = b.favorate ? 1 : 0;
            if (aFav === bFav) {
              return a.proposalName.localeCompare(b.proposalName);
            }
            return bFav - aFav;
          });
        }

        return fullWS;
      })
    );

    return res.status(200).json(populatedWorkspaces);
  } catch (error) {
    console.error("Error fetching workspaces:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const editCollab = async (req, res) => {
  const { collab_id, type, workspaceIds, user_id } = req.body;
  try {
    const collab = await CollabModel.findById(collab_id);
    if (type === true) {
      const workspaces = await WorkspaceModel.find({ owner: user_id });
      const workspaceIds = workspaces.map((workspace) => workspace._id);
      collab.workspaces = workspaceIds;
      for (const workspace of workspaces) {
        if (!workspace.collabUsers) {
          workspace.collabUsers = [];
        }

        // Avoid duplicating users
        if (!workspace.collabUsers.includes(collab.user)) {
          workspace.collabUsers.push(collab.userd);
          await workspace.save();
        }
      }

      collab.type = "full";
    } else {
      collab.workspaces = workspaceIds;
      collab.type = "limited";
      const workspaces = await WorkspaceModel.find({
        _id: { $in: workspaceIds },
      });
      for (const workspace of workspaces) {
        if (!workspace.collabUsers) {
          workspace.collabUsers = [];
        }

        // Avoid duplicates
        if (!workspace.collabUsers.includes(collab.user)) {
          workspace.collabUsers.push(collab.user);
          await workspace.save();
        }
      }
    }
    await collab.save();
    const result = await CollabModel.findById(collab_id).populate("user");
    return res.json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const deleteCollabUser = async (req, res) => {
  const { collab_id } = req.body;

  try {
    const collab = await CollabModel.findById(collab_id);
    if (!collab) {
      return res.status(404).json({ error: "Collab not found" });
    }

    // Loop over workspaces and update each one
    for (const workspaceId of collab.workspaces) {
      const workspace = await WorkspaceModel.findById(workspaceId);
      if (workspace) {
        workspace.collabUsers.pull(collab.user);
        await workspace.save();
      }
    }

    await CollabModel.findByIdAndDelete(collab_id);

    return res.json({
      message: "Collab has been Deleted",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const deleteProfile = async (req, res) => {
  const { user_id } = req.body;

  try {
    const user = await UserModel.findById(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Cancel subscription if exists
    if (user.subscriptionId) {
      try {
        await stripe.subscriptions.cancel(user.subscriptionId);
      } catch (stripeError) {
        console.error("Error canceling Stripe subscription:", stripeError);
        // Continue with deletion even if Stripe cancel fails
      }
    }

    // If user has shared subscriptions, cancel them
    if (
      Array.isArray(user.sharedSubscription) &&
      user.sharedSubscription.length > 0
    ) {
      await Promise.all(
        user.sharedSubscription.map(async (sharedUserId) => {
          const sharedUser = await UserModel.findById(sharedUserId);
          if (sharedUser) {
            sharedUser.subscription = "canceled";
            await sharedUser.save();
          }
        })
      );
    }

    // Remove from any admin's sharedSubscription
    const admins = await UserModel.find({ sharedSubscription: user_id });
    for (const admin of admins) {
      admin.sharedSubscription.pull(user_id);
      await admin.save();
    }

    await UserModel.findByIdAndDelete(user_id);
    return res.status(200).json({ message: "Profile deleted successfully" });
  } catch (error) {
    console.error("Error deleting profile:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAnalyticsData = async (req, res) => {
  const { user_id } = req.query;

  if (!user_id) {
    return res.status(400).json({ error: "user_id is required" });
  }

  try {
    const analytics = await AnalyticsModel.aggregate([
      {
        $lookup: {
          from: "proposals",
          localField: "proposal",
          foreignField: "_id",
          as: "proposalData",
        },
      },
      {
        $unwind: "$proposalData",
      },
      {
        $match: {
          "proposalData.Users": new mongoose.Types.ObjectId(user_id),
        },
      },
      {
        $group: {
          _id: "$country",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);

    const total = analytics.reduce((sum, item) => sum + item.count, 0);

    const colors = [
      "#4a4a4a",
      "#6b6b6b",
      "#8c8c8c",
      "#adadad",
      "#cecece",
      "#efefef",
    ];

    const data = analytics.map((item, index) => ({
      name: item._id || "Unknown",
      count: item.count,
      percent: Math.round((item.count / total) * 100), // integer percent
      color: colors[index % colors.length],
    }));

    res.json({ total, data });
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const GetRecyclebinByLimit = async (req, res) => {
  try {
    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);
    const user_id = req.query.user_id;

    if (!user_id) return res.status(400).json({ message: "user_id required" });

    const userObjectId = new mongoose.Types.ObjectId(user_id);

    const RecycleBinData = await RecycleModel.find({ user: userObjectId })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate({
        path: "proposals",
        populate: { path: "workspaces" },
      });

    res.status(200).json({
      proposals: RecycleBinData,
      count: RecycleBinData.length,
    });
  } catch (err) {
    console.error("Error fetching recycle bin:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

const getStripeSession = async (req, res) => {
  const { session_id } = req.query;
  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    res.json(session);
  } catch (err) {
    console.error("Error retrieving session:", err);
    res.status(500).json({ error: err.message });
  }
};

const cancelSubscription = async (req, res) => {
  const { user_id } = req.body;
  try {
    const user = await UserModel.findById(user_id);
    if (!user || !user.subscriptionId) {
      return res.status(400).json({ error: "No active subscription found" });
    }

    // Cancel the subscription in Stripe (cancel at period end)
    await stripe.subscriptions.update(user.subscriptionId, {
      cancel_at_period_end: true,
    });

    // Update local status to canceled
    user.subscription = "canceled";
    await user.save();

    res.json({ message: "Subscription canceled successfully" });
  } catch (err) {
    console.error("Error canceling subscription:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  workspaceCreate,
  workspaceDelete,
  workspaceGet,
  workspaceGetAll,
  workspaceUpdate,
  getfavorate,
  getProposals,
  workspaceEdit,
  temp,
  createAnalytics,
  getProposal,
  createDuplicate,
  proposalRename,
  deleteProposal,
  proposalMove,
  getAllRecycle,
  deleteRecycle,
  Restore,
  getfavorateW,
  getViews,
  getProfil,
  changeAvatar,
  changeUsername,
  changeCountry,
  changePhone,
  changeAddress,
  changeTime,
  changeCurency,
  changeDataA,
  changeDataP,
  changeDataT,
  changeEmailN,
  changePushN,
  changeProposalN,
  changeWorkspaceN,
  getAllUsers,
  AddTeamForAll,
  AddTeamForLimited,
  getAllMembers,
  addWorkspaceMember,
  DeleteUserToTheWorkspace,
  getAllWorkspacesIncluded,
  editCollab,
  deleteCollabUser,
  getNotifications,
  markNotificationsAsRead,
  deleteProfile,
  stripePaymentIntegration,
  getAnalyticsData,
  GetRecyclebinByLimit,
  getStripeSession,
  cancelSubscription,
};
