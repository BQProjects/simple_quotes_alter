const mongoose = require("mongoose");

const { Schema } = mongoose;

const CollabSchema = new Schema(
  {
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    type: {
      type: String,
    },
    workspaces: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workspaces",
      },
    ],
  },
  { timestamps: true }
);

const CollabModel = mongoose.model("Collab", CollabSchema);

module.exports = CollabModel;
