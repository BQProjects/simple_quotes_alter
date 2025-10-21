const express = require("express");
const router = express.Router();
const { StoreTemplateData, AllTemplates } = require("../Components/TemplateComponent");

router.post("/storeTemplates", StoreTemplateData);
router.get("/all-templates", AllTemplates);

module.exports = router;