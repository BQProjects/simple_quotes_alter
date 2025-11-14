const GoalModuleModel = require("../models/goalModuleModel");
const ProposalModel = require("../models/proposeModel");
const RecycleModel = require("../models/RecycleBinModel");
const UserModel = require("../models/tempModel");
const WorkspaceModel = require("../models/workspaceModel");
const TemplateModel = require("../models/TemplateModel");

const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

const _ = require("lodash");
const createProposal = async (req, res) => {
  const { email, workspace_id, name, settings } = req.body;

  try {
    if (!email) {
      return res.status(400).json({ message: "No User Available" });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }

    const proposal = new ProposalModel({
      proposalName: name,
      Users: [user._id],
      workspaces: workspace_id,
      favorate: false,
      locked: false,
      settings: settings,
      status: "Draft",
      views: 0,
      lastUpdate: new Date(),
    });

    await proposal.save();

    // Initialize `proposals` if it doesn't exist
    if (!user.proposals) {
      user.proposals = [];
    }

    user.proposals.push(proposal._id);

    if (user.notifications === undefined) {
      user.notifications = [];
    }
    const temp = `${user.fullName} has successfully created a new proposal titled "${name}". You can review the details and track its progress in your dashboard.`;

    user.notifications.push({
      title: "Proposal created Successfully!",
      discription: temp,
      createdAt: new Date(),
    });

    await user.save();

    const workspace = await WorkspaceModel.findById(workspace_id);
    if (!workspace.proposals) {
      workspace.proposals = [];
    }
    workspace.proposals.push(proposal._id);
    await workspace.save();

    // Send email notification if enabled
    if (user.EmailN) {
      const { Resend } = require("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);

      try {
        await resend.emails.send({
          from: "noreply@updates.jashkumar.dev",
          to: user.email,
          subject: "New Proposal Created",
          html: `<p>Hi ${user.fullName},</p><p>You have successfully created a new proposal titled "${name}".</p><p>You can review the details and track its progress in your dashboard.</p>`,
        });
        console.log("Proposal creation email sent successfully");
      } catch (emailError) {
        console.error("Error sending proposal creation email:", emailError);
      }
    }

    return res.status(201).json(proposal);
  } catch (error) {
    console.error("Error creating proposal:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const createProposalFromTemplate = async (req, res) => {
  const { templateId, workspaceId, email } = req.body;

  try {
    // Find the user by email
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the template
    const template = await TemplateModel.findById(templateId);
    if (!template) {
      return res.status(404).json({ message: "Template not found" });
    }

    // Find the workspace
    const workspace = await WorkspaceModel.findById(workspaceId);
    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found" });
    }

    // Create new proposal with template data
    const proposal = new ProposalModel({
      proposalName: `${template.TemplateName} - Copy`,
      Users: [user._id],
      workspaces: workspaceId,
      data: template.data || [],
      settings: template.settings || {},
      favorate: false,
      locked: false,
      status: "Draft",
      views: 0,
      lastUpdate: new Date(),
    });

    await proposal.save();

    // Add proposal to user's proposals
    if (!user.proposals) {
      user.proposals = [];
    }
    user.proposals.push(proposal._id);

    // Add notification
    if (user.notifications === undefined) {
      user.notifications = [];
    }
    const temp = `${user.fullName} has successfully created a new proposal from template "${template.TemplateName}". You can review the details and track its progress in your dashboard.`;

    user.notifications.push({
      title: "Proposal created from template!",
      discription: temp,
      createdAt: new Date(),
    });

    await user.save();

    // Add proposal to workspace
    if (!workspace.proposals) {
      workspace.proposals = [];
    }
    workspace.proposals.push(proposal._id);
    await workspace.save();

    // Send email notification if enabled
    if (user.EmailN) {
      const { Resend } = require("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);

      try {
        await resend.emails.send({
          from: "noreply@updates.jashkumar.dev",
          to: user.email,
          subject: "New Proposal Created from Template",
          html: `<p>Hi ${user.fullName},</p><p>You have successfully created a new proposal titled "${proposal.proposalName}" from the template "${template.TemplateName}".</p><p>You can review the details and track its progress in your dashboard.</p>`,
        });
        console.log("Proposal from template creation email sent successfully");
      } catch (emailError) {
        console.error(
          "Error sending proposal from template creation email:",
          emailError
        );
      }
    }

    return res.status(201).json(proposal);
  } catch (error) {
    console.error("Error creating proposal from template:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateProposal = async (req, res) => {
  const { id, rows, settings, signedUserId } = req.body;

  console.log("updateProposal called with signedUserId:", signedUserId);

  try {
    const proposal = await ProposalModel.findById(id);

    if (!proposal) {
      return res.status(404).json({ message: "Proposal not found" });
    }

    // Initialize SignedUsers if not exists
    if (!proposal.SignedUsers) {
      proposal.SignedUsers = [];
    }

    // Track if a signature was added
    const signedSignatures = rows.some(
      (row) =>
        row.type === "sign" &&
        row.content &&
        row.content[1] &&
        row.content[1].signed
    );

    // Update main data and settings
    proposal.data = rows;
    proposal.settings = settings;

    if (signedUserId && !proposal.SignedUsers.includes(signedUserId)) {
      proposal.SignedUsers.push(signedUserId);
    }

    if (!proposal.history) {
      proposal.history = [];
    }

    const now = new Date();

    if (proposal.history.length === 0) {
      proposal.history.push({ data: rows, createdAt: now, updatedAt: now });
    } else {
      const lastEntryIndex = proposal.history.length - 1;
      const lastEntry = proposal.history[lastEntryIndex];
      const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);

      const isSameData = _.isEqual(lastEntry.data, rows); // ✅ deep comparison

      if (!isSameData) {
        if (new Date(lastEntry.createdAt) > oneHourAgo) {
          // Update in-place
          proposal.history[lastEntryIndex].data = rows;
          proposal.history[lastEntryIndex].updatedAt = now;
        } else {
          // Push new entry
          proposal.history.push({ data: rows, createdAt: now, updatedAt: now });
        }

        proposal.markModified("history");
      }
    }

    try {
      await proposal.save();

      // Send email if a signature was actually signed and signedUserId is provided
      if (signedUserId && signedSignatures) {
        console.log(
          "Sending email for signed document:",
          proposal.proposalName
        );
        const creator = await UserModel.findById(proposal.Users[0]); // First user is creator
        if (creator && creator.email && creator.EmailN) {
          await resend.emails.send({
            from: "noreply@updates.jashkumar.dev", // Replace with your verified sender
            to: creator.email,
            subject: "Document Signed Notification",
            html: `<p>Your document "${proposal.proposalName}" has been signed.</p>`,
          });
          console.log("Email sent successfully");
        } else {
          console.log(
            "Creator not found, no email, or email notifications disabled"
          );
        }
      } else {
        console.log("No signed signatures or no signedUserId");
      }

      return res.status(201).json(proposal);
    } catch (saveError) {
      if (saveError.name === "VersionError") {
        // Refetch the latest version and retry the update
        const latestProposal = await ProposalModel.findById(id);
        if (!latestProposal) {
          return res.status(404).json({ message: "Proposal not found" });
        }
        latestProposal.data = rows;
        latestProposal.settings = settings;
        // Re-apply history logic if needed, but for simplicity, just update data and settings
        await latestProposal.save();
        return res.status(201).json(latestProposal);
      } else {
        throw saveError;
      }
    }
  } catch (error) {
    console.error("Error updating proposal:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateFavorate = async (req, res) => {
  const { id, favorate } = req.body;
  try {
    const proposal = await ProposalModel.findByIdAndUpdate(id, {
      favorate: favorate,
    });
    if (!proposal) {
      return res.status(404).json({ message: "error" });
    }
    await proposal.save();
    return res.status(201).json(proposal);
  } catch (error) {
    console.error("Error creating proposal:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateLocked = async (req, res) => {
  const { id, preview } = req.body;
  try {
    const proposal = await ProposalModel.findByIdAndUpdate(id, {
      locked: preview,
    });
    if (!proposal) {
      return res.status(404).json({ message: "error" });
    }
    await proposal.save();
    return res.status(201).json(proposal);
  } catch (error) {
    console.error("Error creating proposal:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteProposal = async (req, res) => {
  const { proposalId, user_id } = req.body;

  try {
    // Find the proposal
    const proposal = await ProposalModel.findById(proposalId);
    if (!proposal) {
      return res.status(404).json({ message: "Proposal not found" });
    }

    // Find the workspace containing the proposal
    const workspace = await WorkspaceModel.findById(proposal.workspaces[0]);
    if (!workspace) {
      return res.status(404).json({ message: "Workspace not found" });
    }

    // Remove proposalId from workspace.proposals array
    workspace.proposals = workspace.proposals.filter(
      (item) => item.toString() !== proposalId
    );
    await workspace.save();

    // Find the user's recycle bin
    let recycle = await RecycleModel.findOne({ user: user_id });
    if (!recycle) {
      // Create a new recycle bin if not found
      recycle = new RecycleModel({ user: user_id, proposals: [] });
    }

    // Push the deleted proposal to the recycle bin
    recycle.proposals.push(proposalId);
    await recycle.save();

    return res
      .status(200)
      .json({ message: "Proposal deleted and moved to recycle bin" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getAllProposal = async (req, res) => {
  const { workspace_id } = req.query;

  if (!workspace_id) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const proposals = await ProposalModel.find({
      workspaces: workspace_id,
      $or: [{ recycle: false }, { recycle: { $exists: false } }],
    })
      .sort({ createdAt: -1 })
      .lean(); // Add `lean()` for plain objects

    if (!proposals || proposals.length === 0) {
      return res
        .status(404)
        .json({ message: "No workspaces found for this user" });
    }

    return res.status(200).json(proposals);
  } catch (error) {
    console.error("Error fetching workspaces:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getProposal = async (req, res) => {
  const id = req.query.id;
  try {
    const proposal = await ProposalModel.findById(id);
    if (!proposal) {
      return res.status(404).json({ message: "error" });
    }

    return res.status(201).json(proposal);
  } catch (error) {
    console.error("Error creating proposal:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
const createGoal = async (req, res) => {
  const { user_id, name, data, link } = req.body;
  try {
    // Fetch the user from the database
    const user = await UserModel.findById(user_id);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({
        error: "No User Found",
      });
    }
    const existingGoal = await GoalModuleModel.findOne({
      data: data,
      Users: user._id,
    });

    if (existingGoal) {
      return res.status(409).json({
        error: "Duplicate goal. This goal already exists for the user.",
      });
    }

    // Create a new goal
    const goal = new GoalModuleModel({
      goalModuleName: name,
      data: data,
      Users: user._id,
      link: link,
    });
    await goal.save();

    // Update user's goals array
    if (!user.goals) {
      user.goals = [];
    }
    user.goals.push(goal._id); // Use push instead of append
    await user.save(); // Save the updated user

    return res.status(201).json(goal);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "An error occurred while creating the goal",
    });
  }
};

const getGoal = async (req, res) => {};

const deleteGoal = (req, res) => {
  res.json({
    message: "something",
  });
};

const updateViews = async (req, res) => {
  const { id } = req.body;
  try {
    const proposal = await ProposalModel.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } }, // Increment views
      { new: true } // Return the updated document
    );

    if (!proposal) {
      return res.status(404).json({ message: "error" });
    }
    await proposal.save();
    return res.status(201).json(proposal);
  } catch (error) {
    console.error("Error creating proposal:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getProposalHistory = async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: "Proposal ID is required" });
  }

  try {
    const proposal = await ProposalModel.findById(id);

    if (!proposal) {
      return res.status(404).json({ message: "Proposal not found" });
    }

    return res.status(200).json(proposal.history || []);
  } catch (error) {
    console.error("Error fetching proposal history:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateLastseen = async (req, res) => {
  const { id } = req.body;
  try {
    const proposal = await ProposalModel.findByIdAndUpdate(id, {
      lastUpdate: new Date(),
      lastSeen: new Date(),
    });
    if (!proposal) {
      return res.status(404).json({ message: "error" });
    }
    await proposal.save();
    return res.status(201).json(proposal);
  } catch (error) {
    console.error("Error creating proposal:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const changeName = async (req, res) => {
  const { name, id } = req.body;
  try {
    const Proposal = await ProposalModel.findById(id);
    Proposal.proposalName = name;
    await Proposal.save();
    res.json({
      message: "Successfully changed the proposal name",
    });
  } catch (error) {
    console.error("Error creating proposal:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getDetails = async (req, res) => {
  const { id } = req.query;
  try {
    const proposal = await ProposalModel.findById(id).populate("Users");
    res.json(proposal);
  } catch (error) {
    console.error("Error creating proposal:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createGoal,
  createProposal,
  createProposalFromTemplate,
  getAllProposal,
  getGoal,
  getProposal,
  updateProposal,
  deleteGoal,
  deleteProposal,
  updateFavorate,
  updateLocked,
  updateViews,
  updateLastseen,
  changeName,
  getDetails,
  getProposalHistory,
};
