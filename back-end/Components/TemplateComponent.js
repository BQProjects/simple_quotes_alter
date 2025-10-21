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

exports.AllTemplates = async (req, res) => {
    try {
        const templates = await TemplateModel.find();
        res.status(200).json(templates);

    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
}

exports.CreateProposalforTemplate = async (req, res) => {
    const { email, template_id } = req.body;

    try {

    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
}