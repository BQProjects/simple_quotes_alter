const mongoose = require("mongoose");

const { Schema } = mongoose;

const ProposalSchema = new Schema(
  {
    proposalName: {
      type: String,
    },

    proposalStatus: {
      type: String,
    },
    data: [
      {
        type: Object,
      },
    ],
    workspaces: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workspaces",
      },
    ],
    readOnlyUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    Users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    AcceptedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    PendingUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    SignedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    locked: {
      type: Boolean,
    },
    favorate: {
      type: Boolean,
    },
    settings: {
      type: Object,
    },
    views: {
      type: Number,
    },
    Status: {
      type: String,
    },

    lastUpdate: {
      type: Date,
    },

    analytics: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Analytics",
      },
    ],

    sectionWise: {
      type: Object,
    },

    totalTime: {
      type: Number,
    },

    lastSeen: {
      type: Date,
    },
    recycle: {
      type: Boolean,
    },
    history: [
      {
        type: Object,
      },
    ],

    // activities: [
    //   {
    //     log: { type: String },
    //     timestamp: { type: Date },
    //   },
    // ],
  },
  { timestamps: true }
);

const ProposalModel = mongoose.model("Proposal", ProposalSchema);

module.exports = ProposalModel;
