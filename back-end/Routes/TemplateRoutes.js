const express = require("express");
const router = express.Router();
const {
  StoreTemplateData,
  AllTemplates,
  CreateProposalforTemplate,
  getTemplateById,
  updateTemplateImage,
} = require("../Components/TemplateComponent");

router.post("/storeTemplates", StoreTemplateData);
router.get("/all-templates", AllTemplates);
router.post("/template-proposal", CreateProposalforTemplate);
router.get("/getting-Template", getTemplateById);
router.put("/update-template-image", updateTemplateImage);

module.exports = router;
