const mongoose = require("mongoose");

const { Schema } = mongoose;

const AnalyticsSchema = new Schema(
  {
    sectionWise: {
      type: Object,
    },

    proposal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Proposal",
    },
    os: {
      type: String,
    },
    browser: {
      type: String,
    },
    country: {
      type: String,
    },
    sta: {
      type: String,
    },
    totalTime: {
      type: Number,
    },
    seen: {
      type: Number,
    },
  },
  { timestamps: true }
);

const AnalyticsModel = mongoose.model("Analytics", AnalyticsSchema);

module.exports = AnalyticsModel;
