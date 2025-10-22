const express = require("express");
const TemplateModel = require("../models/TemplateModel");
const ProposalModel = require("../models/proposeModel");
const UserModel = require("../models/tempModel");
const mongoose = require("mongoose");

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
    const { email, template_id, Name } = req.body;

    try {
        if (!email)
            return res.status(400).json({ message: "Email required" });

        const user = await UserModel.findOne({ email });
        if (!user)
            return res.status(404).json({ message: "No User Found" });

        if (!Name)
            return res.status(400).json({ message: "Proposal Name required" });

        if (template_id && !mongoose.Types.ObjectId.isValid(template_id)) {
            return res.status(400).json({ message: "Invalid template ID format" });
        }

        let template = null;

        if (template_id) {
            template = await TemplateModel.findById(template_id);
            if (!template)
                return res.status(404).json({ message: "Invalid Template..." });
        }

        const proposal = new ProposalModel({
            proposalName: Name,
            Users: [user._id],
            workspaces: template_id,
            favorate: false,
            locked: false,
            settings: settings,
            status: "Draft",
            views: 0,
            lastUpdate: new Date(),
        });

        await proposal.save();

        return res.status(201).json({
            message: "Proposal created successfully",
            proposal,
            template
        });
    } catch (err) {
        console.error("Error creating proposal:", err);
        return res.status(500).json({ message: "Server Error" });
    }
};

exports.getTemplateById = async (req, res) => {
    const id = req.query.id;

    try {
        const tempalate = await TemplateModel.findById(id);
        if (!tempalate) {
            return res.status(404).json({ message: "Template not found" });
        }
        return res.status(201).json(tempalate);
    }
    catch (err) {
        console.error("Error fetching template:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}