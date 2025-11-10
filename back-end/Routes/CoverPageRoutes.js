const express = require("express");
const router = express.Router();
const {
  getAllCoverPages,
  getCoverPagesByType,
  createCoverPage,
  updateCoverPage,
  deleteCoverPage,
} = require("../Components/CoverPageComponent");

router.get("/all", getAllCoverPages);
router.get("/by-type", getCoverPagesByType);
router.post("/create", createCoverPage);
router.put("/update/:id", updateCoverPage);
router.delete("/delete/:id", deleteCoverPage);

module.exports = router;
