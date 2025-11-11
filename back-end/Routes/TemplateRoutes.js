const express = require("express");
const router = express.Router();
const {
  StoreTemplateData,
  AllTemplates,
  CreateProposalforTemplate,
  getTemplateById,
  updateTemplateImage,
  GetProposalByLimit,
} = require("../Components/TemplateComponent");

router.post("/storeTemplates", StoreTemplateData);
router.get("/all-templates", AllTemplates);
router.post("/template-proposal", CreateProposalforTemplate);
router.get("/getting-Template", getTemplateById);
router.put("/update-template-image", updateTemplateImage);
router.get("/getproposalbylimit", GetProposalByLimit);

module.exports = router;
