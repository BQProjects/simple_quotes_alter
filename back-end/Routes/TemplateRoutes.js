const express = require("express");
const router = express.Router();
const { StoreTemplateData, AllTemplates, CreateProposalforTemplate, getTemplateById } = require("../Components/TemplateComponent");

router.post("/storeTemplates", StoreTemplateData);
router.get("/all-templates", AllTemplates);
router.post("/template-proposal", CreateProposalforTemplate);
router.get("/getting-Template", getTemplateById);

module.exports = router;