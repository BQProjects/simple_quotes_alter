const express = require("express");
const TemplateModel = require("../models/TemplateModel");

exports.StoreTemplateData = async (req, res) => {

    const { TemplateName, TemplateImage, data } = req.body;

    try {
        if (!TemplateName)
            return res.status(400).json({ message: "Template Name Required" });

        const ExistingName = await TemplateModel.findOne({ TemplateName });

        if (ExistingName)
            return res.status(400).json({ message: "Template Name Already Exists" });

        await TemplateModel.create({ TemplateName, TemplateImage, data });

        res.status(200).json({ message: "Template Created Successfully" })
    }
    catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
}