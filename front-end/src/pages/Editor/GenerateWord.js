import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";
import React from "react";

const JsonToWord = async (data) => {
  const doc = new Document({
    creator: "JsonToWord App",
    description: "Generated Word Document",
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun("Hello, world!"),
              new TextRun({
                text: "This is a test document.",
                bold: true,
              }),
            ],
          }),
        ],
      },
    ],
  });
  if (!doc.sections) {
    doc.sections = [];
  }

  data.forEach((item) => {
    // if (item.type !== "image" && item.type !== "brake") {
    //   if (!item.content) {
    //     console.warn(`Content for type '${item.type}' is missing or invalid:`);
    //     return;
    //   }
    // }

    switch (item.type) {
      case "heading":
        doc.sections.push({
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun("Heading: "),
                new TextRun({
                  text: item.content || "Default Heading",
                  bold: true,
                }),
              ],
            }),
          ],
        });
        break;
      default:
        console.warn(`Unhandled type '${item.type}':`);
    }
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, "GeneratedDocument.docx");
};

export default JsonToWord;
