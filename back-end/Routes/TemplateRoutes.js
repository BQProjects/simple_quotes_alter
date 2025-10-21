const express = require("express");
const router = express.Router();
const { StoreTemplateData, AllTemplates, CreateProposalforTemplate } = require("../Components/TemplateComponent");

router.post("/storeTemplates", StoreTemplateData);
router.get("/all-templates", AllTemplates);
router.post("/template-proposal", CreateProposalforTemplate);

module.exports = router;