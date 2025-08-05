const mongoose = require("mongoose");

const { Schema } = mongoose;

const RecycleSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },

    proposals: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Proposal",
      },
    ],
  },
  { timestamps: true }
);

const RecycleModel = mongoose.model("Recycle", RecycleSchema);

module.exports = RecycleModel;
