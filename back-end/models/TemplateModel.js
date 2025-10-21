const mongoose = require("mongoose");

const TemplateModel = new mongoose.Schema({
    TemplateName: {
        type:String,
        required: true,
    },
    TemplateImage: {
        type:String,
        required:true,
    },
    data: {
        type:Object
    }
});

module.exports = mongoose.model("TemplateModel", TemplateModel);