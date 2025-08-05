const mongoose = require("mongoose");

const { Schema } = mongoose;

const WorkspaceSchema = new Schema(
  {
    workspaceName: {
      type: String,
    },
    workspaceColor: {
      type: String,
    },
    proposals: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Proposal",
      },
    ],
    owner: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    userActive: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    userPending: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    activities: [
      {
        type: String,
      },
    ],
    favorate: {
      type: Boolean,
    },
    collabUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const WorkspaceModel = mongoose.model("Workspaces", WorkspaceSchema);

module.exports = WorkspaceModel;
