const CoverPageModel = require("../models/CoverPageModel");

exports.getAllCoverPages = async (req, res) => {
  try {
    const coverPages = await CoverPageModel.find();
    res.status(200).json(coverPages);
  } catch (err) {
    console.error("Error fetching cover pages:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getCoverPagesByType = async (req, res) => {
  const { type } = req.query; // "half" or "full"
  try {
    if (!["half", "full"].includes(type)) {
      return res
        .status(400)
        .json({ message: "Invalid type. Must be 'half' or 'full'" });
    }
    const coverPages = await CoverPageModel.find({ type });
    res.status(200).json(coverPages);
  } catch (err) {
    console.error("Error fetching cover pages by type:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.createCoverPage = async (req, res) => {
  const { name, image, type, data } = req.body;
  try {
    if (!name || !image || !type || !data) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (!["half", "full"].includes(type)) {
      return res.status(400).json({ message: "Type must be 'half' or 'full'" });
    }
    const existing = await CoverPageModel.findOne({ name });
    if (existing) {
      return res
        .status(400)
        .json({ message: "Cover page name already exists" });
    }
    const coverPage = await CoverPageModel.create({ name, image, type, data });
    res
      .status(201)
      .json({ message: "Cover page created successfully", coverPage });
  } catch (err) {
    console.error("Error creating cover page:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updateCoverPage = async (req, res) => {
  const { id } = req.params;
  const { name, image, type, data } = req.body;
  try {
    const coverPage = await CoverPageModel.findById(id);
    if (!coverPage) {
      return res.status(404).json({ message: "Cover page not found" });
    }
    if (name) coverPage.name = name;
    if (image) coverPage.image = image;
    if (type && ["half", "full"].includes(type)) coverPage.type = type;
    if (data) coverPage.data = data;
    await coverPage.save();
    res
      .status(200)
      .json({ message: "Cover page updated successfully", coverPage });
  } catch (err) {
    console.error("Error updating cover page:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteCoverPage = async (req, res) => {
  const { id } = req.params;
  try {
    const coverPage = await CoverPageModel.findByIdAndDelete(id);
    if (!coverPage) {
      return res.status(404).json({ message: "Cover page not found" });
    }
    res.status(200).json({ message: "Cover page deleted successfully" });
  } catch (err) {
    console.error("Error deleting cover page:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
