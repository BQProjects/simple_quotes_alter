const express = require("express");
const router = express.Router();
const { StoreTemplateData } = require("../Components/TemplateComponent");

router.post("/storeTemplates", StoreTemplateData);

module.exports = router;