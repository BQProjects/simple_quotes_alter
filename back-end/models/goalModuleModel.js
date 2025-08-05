const mongoose = require("mongoose");

const { Schema } = mongoose;

const GoalModuleSchema = new Schema(
  {
    goalModuleName: {
      type: String,
    },
    data: [
      {
        type: Object,
      },
    ],
    link: {
      type: String,
    },
    Users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const GoalModuleModel = mongoose.model("GoalModule", GoalModuleSchema);

module.exports = GoalModuleModel;
