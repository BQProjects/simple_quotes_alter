const mongoose = require("mongoose");

const { Schema } = mongoose;

const ViewSchema = new Schema(
  {
    averageTime: {
      type: Number,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  { timestamps: true }
);

const ViewModel = mongoose.model("Views", ViewSchema);

module.exports = ViewModel;
