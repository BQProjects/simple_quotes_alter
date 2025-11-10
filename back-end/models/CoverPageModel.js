const mongoose = require("mongoose");

const CoverPageModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true,
  },
  image: {
    type: String,
    required: true,
    index: true,
  },
  type: {
    type: String,
    enum: ["half", "full"],
    required: true,
    index: true,
  },
  data: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("CoverPageModel", CoverPageModel);
