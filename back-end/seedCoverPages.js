const mongoose = require("mongoose");
const CoverPage = require("./models/CoverPageModel"); // Adjust path if needed

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://teja29204:jgdwfvejgwfv@simplequotes.wx6ss.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const seedCoverPages = async () => {
  try {
    // Clear existing data (comment out if you want to preserve existing cover pages)
    // await CoverPage.deleteMany({});

    // Full-page cover data (from your existing arrays)
    const fullPageCovers = [
      {
        name: "CoverPageFull1",
        image:
          "https://res.cloudinary.com/dojwaepbj/image/upload/v1762773993/gedvwmnlgrtz6jpbxtk0.png",
        type: "full",
        data: [
          {
            id: "030bb67e-f6bb-416d-b9c4-6deea5e7755b1",
            type: "cover",
            content:
              "https://res.cloudinary.com/dojwaepbj/image/upload/v1751872797/c253gsdgxpuysb9xhjw8.png",
            bookmark: false,
            dark: 67,
            template: 8,
            height: 1380,
          },
          {
            id: "a67d170a-0f57-431a-9dbc-0d509e2bd2172e",
            type: "heading",
            size: "heading-one",
            content: [
              {
                type: "heading-one",
                align: "center",
                children: [
                  {
                    text: "Transforming Workflows with Smart Software",
                    bold: true,
                  },
                ],
              },
              {
                type: "heading-one",
                align: "center",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-white",
          },
          {
            id: "0b13f7f3-141a-4eea-96b9-8f6c5dac9ea222",
            type: "input",
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "A proposal to streamline operations using our SaaS platform",
                  },
                ],
                align: "center",
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-white",
          },
          {
            id: "c9ec8458-fa78-4b7a-90df-f59520dd9d846",
            type: "input",
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "June 24, [dd-mm-yyyy]",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-white",
          },
          {
            id: "2db5f891-cb49-4728-a011-ba4739ab1d245",
            type: "input",
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "Discover how our scalable software-as-a-service product helps you automate tasks, ",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "improve team collaboration, and deliver measurable results—fast.",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },

              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-white",
          },
          {
            id: "e74c1a65-9b1f-4898-9f90-3eaa01084f653",
            type: "line",
          },
          {
            id: "25384be1-8dad-4b9b-9f6e-d0b21a30fb544",
            type: "image-para",
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "Prepared For: [Client Name]",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "Prepared By: [Your Company Name]",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
            ],
            ImageLink:
              "https://res.cloudinary.com/dojwaepbj/image/upload/v1756098922/qvk32lpvvd0w0wexv4hp.png",
            height: "",
            width: "",
            align: "left",
            aliegn: "center",
            bookmark: false,
            textColor: "text-white",
          },
          {
            id: "75f4a95a-2336-436c-8578-88710c82c2eb3",
            type: "line",
          },
        ],
      },
      {
        name: "CoverPageFull2",
        image:
          "https://res.cloudinary.com/dojwaepbj/image/upload/v1762773994/dyneftq3baeoeijgqvkp.png",
        type: "full",
        data: [
          {
            id: "030bb67e-f6bb-416d-b9c4-6deea5e7755bewfe",
            type: "cover",
            content:
              "https://res.cloudinary.com/dojwaepbj/image/upload/v1751872990/mmanncgnhumy9tgwrphy.png",
            bookmark: false,
            template: 6,
            height: 1380,
          },
          {
            id: "a67d170a-0f57-431a-9dbc-0d509e2bd217e3qf3",
            type: "heading",
            size: "heading-one",
            content: [
              {
                type: "heading-one",
                align: "left",
                children: [
                  {
                    text: "",
                    bold: true,
                  },
                ],
              },
              {
                type: "heading-one",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-one",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-one",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-one",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-one",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "LET’S GROW YOUR ",
                  },
                ],
              },
              {
                type: "heading-one",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "BRAND TOGETHER",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-black",
          },
          {
            id: "0b13f7f3-141a-4eea-96b9-8f6c5dac9ea2ewqfe",
            type: "input",
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "Custom marketing strategies designed",
                  },
                ],
                align: "left",
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "to boost reach and results",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-black",
          },
          {
            id: "c9ec8458-fa78-4b7a-90df-f59520dd9d844331",
            type: "input",
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
                align: "center",
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "June 24, [dd-mm-yyyy]",
                    bold: true,
                  },
                ],
                align: "left",
              },
            ],
            bookmark: false,
            textColor: "text-black",
          },
          {
            id: "bda93768-1cf6-464c-b56e-8ab98989d4adw4r3",
            type: "input",
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "Prepared For: [Client Name]",
                  },
                ],
              },

              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
            ],
            bookmark: false,
          },
          {
            id: "618e4c72-b7ea-4699-8e18-60215765e10c23r2",
            type: "image-para",
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "+[Country Code] [Your Number]",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "www.yourwebsite.com",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "your.email@example.com",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "Your Company Address",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
            ],
            ImageLink:
              "https://res.cloudinary.com/dojwaepbj/image/upload/v1756098922/qvk32lpvvd0w0wexv4hp.png",
            height: "",
            width: "",
            align: "left",
            aliegn: "center",
            bookmark: false,
          },
        ],
      },
      {
        name: "CoverPageFull3",
        image:
          "https://res.cloudinary.com/dojwaepbj/image/upload/v1762773996/nt0ozcyym5q3ov94cgke.png",
        type: "full",
        data: [
          {
            id: "030bb67e-f6bb-416d-b9c4-6deea5e7755b",
            type: "cover",
            content:
              "https://res.cloudinary.com/dojwaepbj/image/upload/v1751873104/c97q37xiujkpkel1alj6.png",
            bookmark: false,
            template: 7,
            height: 1380,
          },
          {
            id: "a67d170a-0f57-431a-9dbc-0d509e2bd217",
            type: "heading",
            size: "heading-one",
            content: [
              {
                type: "heading-one",
                align: "center",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-one",
                align: "center",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-one",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-one",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "EMPOWERING MINDS THROUGH LEARNING",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-gray-700",
          },
          {
            id: "0b13f7f3-141a-4eea-96b9-8f6c5dac9ea2",
            type: "input",
            content: [
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "Proposal for Skill-Building and Developmental Training",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-gray-700",
          },
          {
            id: "c9ec8458-fa78-4b7a-90df-f59520dd9d84",
            type: "input",
            content: [
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },

              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "June 24, [dd-mm-yyyy]",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-gray-700",
          },
          {
            id: "bda93768-1cf6-464c-b56e-8ab98989d4ad",
            type: "input",
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "Prepared For: [Client Name]",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "Prepared By: [Your Company Name]",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },

              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-gray-700",
          },
          {
            id: "618e4c72-b7ea-4699-8e18-60215765e10c",
            type: "image-para",
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "+[Country Code] [Your Number]",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "www.yourcompany.com",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "info@yourcompany.com",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "Your Company Address",
                  },
                ],
              },
            ],
            ImageLink:
              "https://res.cloudinary.com/dojwaepbj/image/upload/v1756098922/qvk32lpvvd0w0wexv4hp.png",
            height: "",
            width: "",
            align: "left",
            aliegn: "center",
            bookmark: false,
            textColor: "text-gray-700",
          },
          {
            id: "52dd1843-5054-4466-9154-18cc461c5646",
            type: "line",
          },
        ],
      },
      {
        name: "CoverPageFull4",
        image:
          "https://res.cloudinary.com/dojwaepbj/image/upload/v1762774000/aqfucpvr4gnmcguwacar.png",
        type: "full",
        data: [
          {
            id: "030bb67e-f6bb-416d-b9c4-6deea5e7755b24323",
            type: "cover",
            content:
              "https://res.cloudinary.com/dojwaepbj/image/upload/v1751873357/u6ppoelyl2dtun4vs81r.png",
            bookmark: false,
            template: 8,
            height: 1380,
          },
          {
            id: "a67d170a-0f57-431a-9dbc-0d509e2bd21723423",
            type: "heading",
            size: "heading-one",
            content: [
              {
                type: "heading-one",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-one",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-one",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "Innovation That Scales",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-gray-700",
          },
          {
            id: "0b13f7f3-141a-4eea-96b9-8f6c5dac9ea223423",
            type: "input",
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
                align: "left",
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    text: "Proposal for Strategic Investment in Ohm",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-gray-700",
          },
          {
            id: "13312e6f-2028-48b3-999b-a001f1fd7da223423",
            type: "input",
            content: [
              {
                type: "paragrapgh-two",
                children: [
                  {
                    text: "We’re building a smarter, faster future. This proposal outlines ",
                  },
                ],
              },
              {
                type: "paragrapgh-two",
                children: [
                  {
                    text: "how our technology addresses real-world problems—",
                  },
                ],
              },
              {
                type: "paragrapgh-two",
                children: [
                  {
                    text: "and why we’re ready to scale.",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-gray-700",
          },
          {
            id: "c9ec8458-fa78-4b7a-90df-f59520dd9d8423423",
            type: "input",
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                    bold: true,
                  },
                ],
                align: "left",
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "June 24, [dd-mm-yyyy]",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-gray-700",
          },
          {
            id: "bda93768-1cf6-464c-b56e-8ab98989d4ad234234",
            type: "input",
            content: [
              {
                type: "paragrapgh",
                children: [
                  {
                    text: "Prepared For: [Client Name]",
                  },
                ],
              },
              {
                type: "paragrapgh",
                children: [
                  {
                    text: "Prepared By: [Your Company Name]",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-gray-700",
          },
          {
            id: "545b33cc-b403-4b69-8e29-b32b4adce8fb234234",
            type: "input",
            content: [
              {
                type: "paragrapgh-two",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragrapgh-two",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragrapgh-two",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragrapgh-two",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragrapgh-two",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragrapgh-two",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragrapgh-two",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragrapgh-two",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragrapgh-two",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragrapgh-two",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragrapgh-two",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragrapgh-two",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragrapgh-two",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragrapgh-two",
                children: [
                  {
                    text: "+[Country Code] [Your Number]",
                  },
                ],
              },
              {
                type: "paragrapgh-two",
                children: [
                  {
                    text: "www.yourcompany.com",
                  },
                ],
              },
              {
                type: "paragrapgh-two",
                children: [
                  {
                    text: "info@yourcompany.com",
                  },
                ],
              },
              {
                type: "paragrapgh-two",
                children: [
                  {
                    text: "Your Company Address",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-gray-700",
          },
          {
            id: "941764bc-4726-4d3a-85e2-517cee452b31234234",
            type: "line",
          },
        ],
      },
      {
        name: "CoverPageFull5",
        image:
          "https://res.cloudinary.com/dojwaepbj/image/upload/v1762774003/vhiecnv6lgwhmy4kxcum.png",
        type: "full",
        data: [
          {
            id: "27866411-41d4-4955-8024-4f7bce5d9578",
            type: "cover",
            content:
              "https://res.cloudinary.com/dojwaepbj/image/upload/v1751873497/ch4temyh5b0afjr1gfvv.png",
            bookmark: false,
            template: 5,
            height: 1380,
          },
          {
            id: "253d996f-c3b0-46b8-a321-15340ad39822",
            type: "heading",
            size: "heading-one",
            content: [
              {
                type: "heading-one",
                align: "left",
                children: [
                  {
                    text: "",
                    bold: true,
                  },
                ],
              },
              {
                type: "heading-one",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-one",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "DESIGN THAT SPEAKS ",
                  },
                ],
              },
              {
                type: "heading-one",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "FOR YOUR BRAND",
                  },
                ],
              },
            ],
            bookmark: false,
          },
          {
            id: "36aefd29-6057-40f2-9bbb-903c840fa4f7",
            type: "input",
            content: [
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "Freelance UI/UX Design Services",
                  },
                ],
              },

              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
            ],
            bookmark: false,
          },
          {
            id: "c2ca6651-dbeb-490a-a7db-3614b7fd4ddd",
            type: "image-para",
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "📞+[Country Code] [Your Number]",
                  },
                ],
                align: "left",
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "🌐www.yourcompany.com",
                  },
                ],
                align: "left",
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "📨info@yourcompany.com",
                  },
                ],
                align: "left",
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
            ],
            ImageLink:
              "https://res.cloudinary.com/dojwaepbj/image/upload/v1756098922/qvk32lpvvd0w0wexv4hp.png",
            height: "",
            width: "",
            align: "left",
            aliegn: "center",
            bookmark: false,
          },
          {
            id: "d729a98a-65f8-427f-b165-069aa54c99b2",
            type: "line",
          },
        ],
      },
      {
        name: "CoverPageFull6",
        image:
          "https://res.cloudinary.com/dojwaepbj/image/upload/v1762774005/demhxqwkstvz2sansjf9.png",
        type: "full",
        data: [
          {
            id: "dc08dd0f-a4d3-4064-b5da-f6b0a5bcbc64",
            type: "cover",
            content:
              "https://res.cloudinary.com/dojwaepbj/image/upload/v1751873669/nusfyiadsge3br0ko2rb.png",
            bookmark: false,
            bright: 1,
            dark: 4,
            template: 9,
            height: 1380,
          },
          {
            id: "8bfc05f3-3984-4747-908c-6694eabf947b",
            type: "heading",
            size: "heading-four",
            content: [
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    text: "Rimberio co",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-gray-700",
          },
          {
            id: "905e4a4b-8a53-4083-913a-8558b902f4dd",
            type: "heading",
            size: "heading-one",
            content: [
              {
                type: "heading-one",
                align: "left",
                children: [
                  {
                    text: "BUSINESS PLAN",
                    bold: true,
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-gray-700",
          },
          {
            id: "b61c8f06-6d9d-4e35-b4e3-84baa224702d",
            type: "heading",
            size: "heading-five",
            content: [
              {
                type: "heading-five",
                align: "left",
                children: [
                  {
                    text: "Empowering Success,",
                  },
                ],
              },
              {
                type: "heading-five",
                align: "left",
                children: [
                  {
                    text: "Igniting Innovation",
                  },
                ],
              },
            ],
            bookmark: false,
          },
          {
            id: "259453f3-3c97-404f-9788-5006034f3154",
            type: "input",
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
                align: "left",
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "24-06-[dd-mm-yyyy]",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-gray-700",
          },
          {
            id: "efdd0398-bf6d-4e8a-a098-7249835bc0d8",
            type: "double-para",
            firstContent: [
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "Prepared by",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "[Your Name]",
                  },
                ],
              },
            ],
            secondContent: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "[Your Company Name]",
                  },
                ],
                align: "right",
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "info@yourcompany.com",
                  },
                ],
                align: "right",
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "+91 98000 44000",
                  },
                ],
                align: "right",
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "www.pixelhuee.studio",
                  },
                ],
                align: "right",
              },
            ],
            bookmark: false,
            textColor: "text-gray-700",
          },
          {
            id: "c0eaee86-4d9c-4117-8b27-8b2b783bd6c2",
            type: "line",
          },
          {
            id: "de1eb23f-36cc-4e82-b318-95532316fcf7",
            type: "line",
          },
        ],
      },
      {
        name: "CoverPageFull7",
        image:
          "https://res.cloudinary.com/dojwaepbj/image/upload/v1762774006/azpd7as1hlie5yw5gdwz.png",
        type: "full",
        data: [
          {
            id: "030bb67e-f6bb-416d-b9c4-6deea5e7755b",
            type: "cover",
            template: 6,
            dark: 0,
            bright: 0,
            content:
              "https://res.cloudinary.com/dojwaepbj/image/upload/v1751874918/tk4xdnjpb76elmby2h6v.png",
            bookmark: false,
            height: 1380,
          },
          {
            id: "37570ee6-afa5-4115-955a-7a825b4f8242",
            type: "heading",
            size: "heading-one",
            content: [
              {
                type: "heading-one",
                align: "right",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-one",
                align: "right",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-one",
                align: "right",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-one",
                align: "right",
                children: [
                  {
                    bold: true,
                    text: "BUSINESS PROPOSAL",
                  },
                ],
              },
            ],
            bookmark: false,
          },
          {
            id: "8654bfb7-5db2-4891-8ac4-2b54dd68b78a",
            type: "heading",
            size: "heading-five",
            content: [
              {
                type: "heading-five",
                align: "right",
                children: [
                  {
                    text: "Smart Solar Street Lighting System",
                  },
                ],
              },
              {
                type: "heading-five",
                align: "right",
                children: [
                  {
                    text: "with IoT Integration",
                  },
                ],
              },
              {
                type: "heading-five",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-black",
          },
          {
            id: "3e48383c-148e-4f3a-a951-ed04c7e0738f",
            type: "input",
            content: [
              {
                type: "paragrapgh",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragrapgh",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragrapgh",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragrapgh",
                align: "right",
                children: [
                  {
                    text: "June 13, [dd-mm-yyyy]",
                  },
                ],
              },
              {
                type: "paragrapgh",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },

              {
                type: "paragrapgh",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragrapgh",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragrapgh",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragrapgh",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragrapgh",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragrapgh",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragrapgh",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragrapgh",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragrapgh",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragrapgh",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragrapgh",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragrapgh",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragrapgh",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragrapgh",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragrapgh",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragrapgh",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "heading-three",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "heading-three",
                children: [
                  {
                    text: "",
                  },
                ],
              },
            ],
            bookmark: false,
          },
          {
            id: "c5ca97f4-a7c6-4534-bf04-51af660b98f5",
            type: "double-para",
            firstContent: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
                align: "center",
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    text: "Prepared By",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "Project Development Team",
                  },
                ],
                align: "center",
              },
            ],
            secondContent: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
                align: "center",
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    text: "Prepared For:",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "GreenEdge Innovations Pvt. Ltd.",
                  },
                ],
                align: "center",
              },
            ],
            bookmark: false,
          },
          {
            id: "874c27cc-a765-4a0f-8d76-90d4b28f34aa",
            type: "line",
          },
        ],
      },
      {
        name: "CoverPageFull8",
        image:
          "https://res.cloudinary.com/dojwaepbj/image/upload/v1762774007/bhnli5w27ckifxj4y6a8.png",
        type: "full",
        data: [
          {
            id: "dc08dd0f-a4d3-4064-b5da-f6b0a5bcbc64",
            type: "cover",
            content:
              "https://res.cloudinary.com/dojwaepbj/image/upload/v1751875250/tqyl5mgvigojpj6kkcqz.png",
            bookmark: false,
            template: 8,
            height: 1380,
          },
          {
            id: "8bfc05f3-3984-4747-908c-6694eabf947b",
            type: "heading",
            size: "heading-four",
            content: [
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    text: "Rimberio co",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-white",
          },
          {
            id: "905e4a4b-8a53-4083-913a-8558b902f4dd",
            type: "heading",
            size: "heading-one",
            content: [
              {
                type: "heading-one",
                align: "center",
                children: [
                  {
                    text: "",
                    bold: true,
                  },
                ],
              },
              {
                type: "heading-one",
                align: "center",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-one",
                align: "center",
                children: [
                  {
                    bold: true,
                    text: "BUSINESS PLAN",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-white",
          },
          {
            id: "424a3b91-e6ae-46e8-9eed-daebccfaf71e",
            type: "heading",
            size: "heading-six",
            content: [
              {
                type: "heading-six",
                align: "center",
                children: [
                  {
                    text: "07 July 2015",
                    bold: true,
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-white",
          },
          {
            id: "259453f3-3c97-404f-9788-5006034f3154",
            type: "input",
            content: [
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "Prepared by :",
                    bold: true,
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "[Your Name]",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-white",
          },
          {
            id: "b91ba891-01f7-480e-8659-533268375de6",
            type: "input",
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "Prepared For: ",
                    bold: true,
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "[Client Name]",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-black",
          },
          {
            id: "9c4ab26e-0a04-44f7-8a2e-afec7c903dd6",
            type: "input",
            content: [
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "rimberio@pixelhuee.studio",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "+91 98000 44000",
                  },
                ],
                align: "left",
              },
            ],
            bookmark: false,
            textColor: "text-black",
          },
          {
            id: "6037680d-8f6a-4818-bbd3-e5398505cbdb",
            type: "line",
          },
        ],
      },
      {
        name: "CoverPageFull9",
        image:
          "https://res.cloudinary.com/dojwaepbj/image/upload/v1762774008/abiudcrlnu2zxkjjdxzm.png",
        type: "full",
        data: [
          {
            id: "86d7a226-431e-4197-8989-c45b765dba17",
            type: "cover",
            content:
              "https://res.cloudinary.com/dojwaepbj/image/upload/v1751876086/xgat9c8w1vktcxelx0ws.png",
            bookmark: false,
            template: 7,
            height: 1380,
          },
          {
            id: "3653ea9b-a146-4744-93be-a2a2db3c5786",
            type: "double-para",
            firstContent: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "Aura, Inc.",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
            ],
            secondContent: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                    link: true,
                  },
                ],
                align: "right",
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    link: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    link: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    link: true,
                    text: "Instagram",
                  },
                  {
                    text: " | ",
                  },
                  {
                    text: "LinkedIn ",
                    link: true,
                  },
                  {
                    text: " |  ",
                  },
                  {
                    text: "Facebook",
                    link: true,
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    link: true,
                    text: "",
                  },
                ],
              },
            ],
            bookmark: false,
          },
          {
            id: "d7c1809d-0eb9-40a1-9e5b-3ade7ae43fc8",
            type: "heading",
            size: "heading-one",
            content: [
              {
                type: "heading-one",
                align: "center",
                children: [
                  {
                    text: "",
                    bold: true,
                  },
                ],
              },

              {
                type: "heading-one",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-one",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-one",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-one",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "BUSINESS",
                  },
                ],
              },
            ],
            bookmark: false,
          },
          {
            id: "a85210c8-8cde-4b26-a6f5-4311ee798ece",
            type: "heading",
            size: "heading-one",
            content: [
              {
                type: "heading-one",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "PLAN",
                  },
                ],
              },
              {
                type: "heading-one",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-one",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-one",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-one",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-one",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-white",
          },
          {
            id: "027b2247-a612-4e1a-a903-711c2595d686",
            type: "double-para",
            firstContent: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "PREPARED BY",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "[Your Company Name]",
                  },
                ],
              },
              {
                type: "heading-two",
                children: [
                  {
                    text: "[dd-mm-yyyy]",
                    bold: true,
                  },
                ],
              },
            ],
            secondContent: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
                align: "right",
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "Email: johnnwickk@pixelhuee.studio",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "Phone: +91 900101 00007",
                  },
                ],
                align: "right",
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "Website: www.pixelhuee.studio",
                  },
                ],
                align: "right",
              },
            ],
            bookmark: false,
            textColor: "text-white",
          },
          {
            id: "fe35804f-3bc9-4e97-ade5-4c8fe6a682fe",
            type: "line",
          },
          {
            id: "06220a1e-0f92-4306-9040-5a56218856b5",
            type: "line",
          },
        ],
      },
      {
        name: "CoverPageFull10",
        image:
          "https://res.cloudinary.com/dojwaepbj/image/upload/v1762774008/k74v6b211khhnzzjjkkh.png",
        type: "full",
        data: [
          {
            id: "e4bafc5e-88db-4a18-a1c4-fc2e15bee1c8",
            type: "cover",
            content:
              "https://res.cloudinary.com/dojwaepbj/image/upload/v1751876325/eluuwarffz16oknz3j6w.png",
            bookmark: false,
            template: 5,
            height: 1380,
          },
          {
            id: "366454c5-de9a-4080-a4b3-6ccbbcb68e1f",
            type: "heading",
            size: "heading-one",
            content: [
              {
                type: "heading-two",
                align: "right",
                children: [
                  {
                    text: "",
                    bold: true,
                  },
                ],
              },
              {
                type: "heading-two",
                align: "right",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-two",
                align: "right",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-one",
                align: "right",
                children: [
                  {
                    bold: true,
                    text: "BUSINESS PROPOSAL",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-white",
          },
          {
            id: "205002e7-f09d-4eca-8041-8544ca5ae8d1",
            type: "heading",
            size: "heading-six",
            content: [
              {
                type: "heading-five",
                align: "right",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-six",
                align: "right",
                children: [
                  {
                    text: "Augmented Reality &Virtual Reality Solutions",
                  },
                ],
              },
              {
                type: "heading-five",
                align: "right",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-five",
                align: "right",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-white",
          },
          {
            id: "a09c6ee9-e34b-4e36-9594-ccd38be26df1",
            type: "input",
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
                align: "right",
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "PREPARED BY",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "[Your Company Name]",
                  },
                ],
                align: "right",
              },
              {
                type: "heading-two",
                children: [
                  {
                    text: "[dd-mm-yyyy]",
                    bold: true,
                  },
                ],
                align: "right",
              },
            ],
            bookmark: false,
            textColor: "text-white",
          },
          {
            id: "25501cd7-b773-4197-a76b-66d5e8d4fbf5",
            type: "input",
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
                align: "right",
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "LinkedIn | Instagram | Twitter/X | YouTube",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-white",
          },
        ],
      },
      {
        name: "CoverPageFull11",
        image:
          "https://res.cloudinary.com/dojwaepbj/image/upload/v1762774010/h4vzmb6wc9hl5ggkzpee.png",
        type: "full",
        data: [
          {
            id: "921f5fa7-d993-47f9-8bba-207361cb6662",
            type: "cover",
            content:
              "https://res.cloudinary.com/dojwaepbj/image/upload/v1751876511/aeq5tntiqcz1nmgk27im.png",
            bookmark: false,
            dark: 0,
            bright: 1,
            template: 6,
            height: 1380,
          },
          {
            id: "27c2cb15-9ec2-4171-874f-544b323a7bc1",
            type: "heading",
            size: "heading-five",
            content: [
              {
                type: "heading-five",
                align: "left",
                children: [
                  {
                    text: "",
                    bold: true,
                  },
                ],
              },
              {
                type: "heading-five",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "PROPOSAL FOR",
                  },
                ],
              },
              {
                type: "heading-five",
                align: "right",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-gray-700",
          },
          {
            id: "1884cd26-ad75-45c2-aa43-a219ca4234a1",
            type: "heading",
            size: "heading-one",
            content: [
              {
                type: "heading-one",
                align: "left",
                children: [
                  {
                    text: "24/7 SMART SUPPORT",
                    bold: true,
                  },
                ],
              },
              {
                type: "heading-one",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "POWERED BY AI",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-gray-700",
          },
          {
            id: "7fbc34fa-462a-45ae-af06-4c34b441a27b",
            type: "input",
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
                align: "right",
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "An AI chatbot solution tailored for e-commerce or service companies",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "to automate FAQs, order tracking, and live chat escalation.",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-gray-700",
          },
          {
            id: "d39ed1da-1cc9-4c36-9b2c-2948501a0b87",
            type: "input",
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
                align: "right",
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "PREPARED BY",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "[Your Company Name]",
                  },
                ],
                align: "left",
              },
              {
                type: "heading-two",
                children: [
                  {
                    text: "[dd-mm-yyyy]",
                    bold: true,
                  },
                ],
                align: "left",
              },
              {
                type: "heading-two",
                align: "right",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-two",
                align: "right",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-two",
                align: "right",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
            ],
            bookmark: true,
            textColor: "text-gray-700",
          },
          {
            id: "31beafc0-e659-4400-a060-9c0b584f83da",
            type: "image-para",
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragrapgh",
                children: [
                  {
                    text: "+[Country Code] [Your Number]",
                  },
                ],
              },
              {
                type: "paragrapgh",
                children: [
                  {
                    text: "www.yourcompany.com",
                  },
                ],
              },
              {
                type: "paragrapgh",
                children: [
                  {
                    text: "info@yourcompany.com",
                  },
                ],
              },
              {
                type: "paragrapgh",
                children: [
                  {
                    text: "Your Company Address",
                  },
                ],
              },
              {
                type: "paragrapgh",
                children: [
                  {
                    text: "",
                  },
                ],
              },
            ],
            ImageLink:
              "https://res.cloudinary.com/dojwaepbj/image/upload/v1756098922/qvk32lpvvd0w0wexv4hp.png",
            height: "",
            width: "50",
            align: "left",
            aliegn: "center",
            bookmark: true,
            textColor: "text-gray-700",
          },
        ],
      },
      {
        name: "CoverPageFull12",
        image:
          "https://res.cloudinary.com/dojwaepbj/image/upload/v1762774011/pokxqagxheybaxysf6z1.png",
        type: "full",
        data: [
          {
            id: "921f5fa7-d993-47f9-8bba-207361cb6662",
            type: "cover",
            content:
              "https://res.cloudinary.com/dojwaepbj/image/upload/v1751876544/ln9qhxzf6zjxp9ndwiht.png",
            bookmark: false,
            template: 6,
            height: 1380,
          },
          {
            id: "acc5f515-18dd-4b05-9013-ae51bc28a89b",
            type: "input",
            content: [
              {
                type: "heading-six",
                children: [
                  {
                    text: "Surya. co",
                  },
                ],
                align: "left",
              },
              {
                type: "heading-six",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "heading-six",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "heading-six",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-black",
          },
          {
            id: "27c2cb15-9ec2-4171-874f-544b323a7bc1",
            type: "heading",
            size: "heading-four",
            content: [
              {
                type: "heading-four",
                align: "right",
                children: [
                  {
                    bold: true,
                    text: "BUSINESS",
                  },
                ],
              },
              {
                type: "heading-one",
                align: "right",
                children: [
                  {
                    bold: true,
                    text: "PROPOSAL",
                  },
                ],
              },
              {
                type: "heading-one",
                align: "right",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-one",
                align: "right",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-black",
          },
          {
            id: "20411975-0215-48ff-8979-bc51427ef9fa",
            type: "heading",
            size: "heading-one",
            content: [
              {
                type: "heading-one",
                align: "right",
                children: [
                  {
                    text: "Precision Agriculture",
                    bold: true,
                  },
                ],
              },
              {
                type: "heading-one",
                align: "right",
                children: [
                  {
                    bold: true,
                    text: "for a Growing World",
                  },
                ],
              },
            ],
            bookmark: false,
          },
          {
            id: "d39ed1da-1cc9-4c36-9b2c-2948501a0b87",
            type: "input",
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
                align: "right",
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "PREPARED BY",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "[Your Company Name]",
                  },
                ],
                align: "right",
              },
              {
                type: "heading-two",
                children: [
                  {
                    text: "[dd-mm-yyyy]",
                    bold: true,
                  },
                ],
                align: "right",
              },
            ],
            bookmark: true,
          },
          {
            id: "8b026fca-3ff1-4df0-b186-58548762721d",
            type: "input",
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
                align: "center",
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "LinkedIn | Instagram | Twitter | YouTube",
                  },
                ],
              },
            ],
            bookmark: false,
          },
        ],
      },
      {
        name: "CoverPageFull13",
        image:
          "https://res.cloudinary.com/dojwaepbj/image/upload/v1762774012/xm8hikx2avlmc0tgypk2.png",
        type: "full",
        data: [
          {
            id: "921f5fa7-d993-47f9-8bba-207361cb6662",
            type: "cover",
            content:
              "https://res.cloudinary.com/dojwaepbj/image/upload/v1751876692/jrqikuuelz7ok5ofqyw4.png",
            bookmark: false,
            template: 4,
            height: 1380,
          },
          {
            id: "acc5f515-18dd-4b05-9013-ae51bc28a89b",
            type: "input",
            content: [
              {
                type: "heading-five",
                children: [
                  {
                    text: "Aura. co",
                  },
                ],
                align: "center",
              },
            ],
            bookmark: false,
            textColor: "text-black",
          },
          {
            id: "b296bea5-337b-414f-8173-3258ffe7bf34",
            type: "heading",
            size: "heading-one",
            content: [
              {
                type: "heading-one",
                align: "right",
                children: [
                  {
                    text: "",
                    bold: true,
                  },
                ],
              },
              {
                type: "heading-one",
                align: "right",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-one",
                align: "right",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-one",
                align: "right",
                children: [
                  {
                    bold: true,
                    text: "BUSINESS",
                  },
                ],
              },
              {
                type: "heading-one",
                align: "right",
                children: [
                  {
                    bold: true,
                    text: "PLAN",
                  },
                ],
              },
            ],
            bookmark: false,
          },
          {
            id: "e4246127-ad00-47e0-984a-2da3f89a7aa5",
            type: "input",
            content: [
              {
                type: "paragrapgh",
                children: [
                  {
                    text: "",
                  },
                ],
                align: "center",
              },
              {
                type: "paragrapgh",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragrapgh",
                children: [
                  {
                    text: "",
                  },
                ],
                align: "left",
              },
              {
                type: "paragrapgh",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragrapgh",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragrapgh",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragrapgh",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragrapgh",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragrapgh",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragrapgh",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragrapgh",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragrapgh",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragrapgh",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragrapgh",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragrapgh",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragrapgh",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragrapgh",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragrapgh",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragrapgh",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "heading-six",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "heading-six",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "heading-six",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "heading-six",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "heading-six",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "heading-six",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "heading-six",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "heading-six",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "heading-six",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "heading-six",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "heading-six",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "heading-six",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "heading-six",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "heading-six",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "heading-six",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "heading-six",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "heading-six",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "heading-six",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "heading-six",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "heading-six",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "heading-six",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "heading-six",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "heading-six",
                align: "left",
                children: [
                  {
                    text: "www.yourcompany.com",
                  },
                ],
              },
              {
                type: "heading-six",
                children: [
                  {
                    text: "Your Company Address",
                  },
                ],
                align: "left",
              },
              {
                type: "heading-six",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-black",
          },
        ],
      },
      {
        name: "CoverPageFull14",
        image:
          "https://res.cloudinary.com/dojwaepbj/image/upload/v1762774013/jmpkanu0cy2fhwmn6qke.png",
        type: "full",
        data: [
          {
            id: "dc08dd0f-a4d3-4064-b5da-f6b0a5bcbc64",
            type: "cover",
            template: 7,
            content:
              "https://res.cloudinary.com/dojwaepbj/image/upload/v1751876855/cxoheaxbbrp7cbiivnng.png",
            bookmark: false,
            bright: 1,
            dark: 0,
            height: 1380,
          },
          {
            id: "8bfc05f3-3984-4747-908c-6694eabf947b",
            type: "heading",
            size: "heading-four",
            content: [
              {
                type: "heading-four",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "center",
                children: [
                  {
                    text: "Rimberio co",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-black",
          },
          {
            id: "905e4a4b-8a53-4083-913a-8558b902f4dd",
            type: "heading",
            size: "heading-one",
            content: [
              {
                type: "heading-one",
                align: "center",
                children: [
                  {
                    text: "",
                    bold: true,
                  },
                ],
              },
              {
                type: "heading-one",
                align: "center",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-one",
                align: "center",
                children: [
                  {
                    bold: true,
                    text: "BUSINESS PLAN",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-black",
          },
          {
            id: "b61c8f06-6d9d-4e35-b4e3-84baa224702d",
            type: "heading",
            size: "heading-five",
            content: [
              {
                type: "heading-five",
                align: "center",
                children: [
                  {
                    text: "Empowering Success, Igniting Innovation",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-black",
          },
          {
            id: "259453f3-3c97-404f-9788-5006034f3154",
            type: "input",
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                    bold: true,
                  },
                ],
                align: "center",
              },
              {
                type: "paragraph",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
                align: "center",
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    bold: true,
                    text: "Prepared by",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    text: "Olivia Wilson",
                  },
                ],
              },
              {
                type: "heading-three",
                align: "center",
                children: [
                  {
                    bold: true,
                    text: "24-06-[dd-mm-yyyy]",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
                align: "center",
              },
              {
                type: "paragraph",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
            ],
            bookmark: false,
          },
          {
            id: "7eda6186-d1c8-4da8-8dc5-04f1b39c965a",
            type: "input",
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
                align: "center",
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    text: "rimberio@pixelhuee.studio",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "www.pixelhuee.studio",
                  },
                ],
                align: "center",
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
            ],
            bookmark: false,
          },
          {
            id: "29f0d292-7abd-408c-a5b1-53e1984e8ca9",
            type: "input",
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
                align: "center",
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    text: "LinkedIn | Instagram | Twitter | YouTube",
                  },
                ],
              },
            ],
            bookmark: false,
          },
        ],
      },
      {
        name: "CoverPageFull15",
        image:
          "https://res.cloudinary.com/dojwaepbj/image/upload/v1762774015/bn8qvv92t1xtvlwjancn.png",
        type: "full",
        data: [
          {
            id: "847a85e4-9e22-4d8a-be07-dd2abdeb3a70",
            type: "cover",
            content:
              "https://res.cloudinary.com/dojwaepbj/image/upload/v1751878368/gtxcvjubmlk8srbkfbjz.png",
            bookmark: false,
            dark: 0,
            bright: 0,
            template: 7,
            height: 1380,
          },
          {
            id: "5684e6f5-47f6-4bf1-9095-20402ec48154",
            type: "heading",
            size: "heading-four",
            content: [
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    text: "",
                    bold: true,
                  },
                ],
              },
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "UI/UX DESIGN",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-white",
          },
          {
            id: "22e4a9cc-6237-4ca5-b3aa-3be97a679c9c",
            type: "heading",
            size: "heading-one",
            content: [
              {
                type: "heading-one",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "BUSINESS PROPOSAL",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-white",
          },
          {
            id: "b2c09523-d5f2-4c12-8e54-0335b6ef5971",
            type: "input",
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "Designing Intuitive Experiences That Deive Business Growth.",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-white",
          },
          {
            id: "d39ed1da-1cc9-4c36-9b2c-2948501a0b87",
            type: "input",
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "PREPARED BY",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "[Your Company Name]",
                  },
                ],
              },
              {
                type: "heading-two",
                children: [
                  {
                    text: "[dd-mm-yyyy]",
                    bold: true,
                  },
                ],
              },
              {
                type: "heading-two",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-two",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-two",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-two",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-two",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-two",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-two",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-two",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-two",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
            ],
            bookmark: true,
            textColor: "text-white",
          },
          {
            id: "31beafc0-e659-4400-a060-9c0b584f83da",
            type: "image-para",
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "+[Country Code] [Your Number]",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "www.yourcompany.com",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "info@yourcompany.com",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "Your Company Address",
                  },
                ],
              },
            ],
            ImageLink:
              "https://res.cloudinary.com/dojwaepbj/image/upload/v1756098922/qvk32lpvvd0w0wexv4hp.png",
            height: "",
            width: "50",
            align: "left",
            aliegn: "center",
            bookmark: true,
            textColor: "text-white",
          },
          {
            id: "72a89d89-27af-4ec9-af65-3c7622935242",
            type: "line",
          },
        ],
      },
      {
        name: "CoverPageFull16",
        image:
          "https://res.cloudinary.com/dojwaepbj/image/upload/v1762774017/utfqd5x0i1dggghl0enp.png",
        type: "full",
        data: [
          {
            id: "f71db053-305c-4ca6-b395-526f6089d1fb",
            type: "cover",
            content:
              "https://res.cloudinary.com/dojwaepbj/image/upload/v1751881042/m7kmchxqquxzn8ca1gyy.png",
            bookmark: false,
            dark: 0,
            bright: 0,
            template: 6,
            height: 1380,
          },
          {
            id: "31beafc0-e659-4400-a060-9c0b584f83da",
            type: "image-para",
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "+[Country Code] [Your Number]",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "www.yourcompany.com",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "info@yourcompany.com",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "Your Company Address",
                  },
                ],
              },
            ],
            ImageLink:
              "https://res.cloudinary.com/dojwaepbj/image/upload/v1756098922/qvk32lpvvd0w0wexv4hp.png",
            height: "",
            width: "50",
            align: "left",
            aliegn: "center",
            bookmark: true,
            textColor: "text-black",
          },
          {
            id: "5684e6f5-47f6-4bf1-9095-20402ec48154",
            type: "heading",
            size: "heading-four",
            content: [
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "UI/UX DESIGN",
                  },
                ],
              },
            ],
            bookmark: true,
            textColor: "text-black",
          },
          {
            id: "827630fc-3162-4606-a537-c0f07884f82a",
            type: "heading",
            size: "heading-one",
            content: [
              {
                type: "heading-one",
                align: "left",
                children: [
                  {
                    text: "BUSINESS PROPOSAL",
                    bold: true,
                  },
                ],
              },
            ],
            bookmark: false,
          },
          {
            id: "b2c09523-d5f2-4c12-8e54-0335b6ef5971",
            type: "input",
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "Designing Intuitive Experiences That Deive Business Growth.",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
            ],
            bookmark: true,
            textColor: "text-black",
          },
          {
            id: "d39ed1da-1cc9-4c36-9b2c-2948501a0b87",
            type: "input",
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "PREPARED BY",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "[Your Company Name]",
                  },
                ],
              },
              {
                type: "heading-two",
                children: [
                  {
                    text: "[dd-mm-yyyy]",
                    bold: true,
                  },
                ],
              },
            ],
            bookmark: true,
            textColor: "text-black",
          },
        ],
      },
      {
        name: "CoverPageFull17",
        image:
          "https://res.cloudinary.com/dojwaepbj/image/upload/v1762774018/m4gy73zxphwdzec9j5hq.png",
        type: "full",
        data: [
          {
            id: "627fb7b3-18e0-4c44-8711-62b3c076b1a1",
            type: "cover",
            content:
              "https://res.cloudinary.com/dojwaepbj/image/upload/v1751881286/dohs525mnkzp8t8yxbbr.png",
            bookmark: false,
            dark: 0,
            bright: 0,
            template: 7,
            height: 1380,
          },
          {
            id: "747bcc60-4788-4b81-bdd4-4c486409eb8f",
            type: "image-para",
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "PREPARED BY",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "[Your Company Name]",
                  },
                ],
              },
              {
                type: "heading-two",
                children: [
                  {
                    text: "[dd-mm-yyyy]",
                    bold: true,
                  },
                ],
              },
            ],
            ImageLink:
              "https://res.cloudinary.com/dojwaepbj/image/upload/v1756098922/qvk32lpvvd0w0wexv4hp.png",
            height: "",
            width: "",
            align: "left",
            aliegn: "center",
            bookmark: false,
          },
          {
            id: "5684e6f5-47f6-4bf1-9095-20402ec48154",
            type: "heading",
            size: "heading-four",
            content: [
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "UI/UX DESIGN",
                  },
                ],
              },
            ],
            bookmark: true,
            textColor: "text-black",
          },
          {
            id: "355481b8-d21f-4a0a-83e8-53fa8dcb66a8",
            type: "heading",
            size: "heading-two",
            content: [
              {
                type: "heading-two",
                align: "left",
                children: [
                  {
                    text: "BUSINESS PROPOSAL",
                    bold: true,
                  },
                ],
              },
            ],
            bookmark: false,
          },
          {
            id: "b2c09523-d5f2-4c12-8e54-0335b6ef5971",
            type: "input",
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "Designing Intuitive Experiences That Deive Business Growth.",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
            ],
            bookmark: true,
            textColor: "text-black",
          },
          {
            id: "31beafc0-e659-4400-a060-9c0b584f83da",
            type: "image-para",
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "+[Country Code] [Your Number]",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "www.yourcompany.com",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "info@yourcompany.com",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "Your Company Address",
                  },
                ],
              },
            ],
            ImageLink:
              "https://res.cloudinary.com/dojwaepbj/image/upload/v1756098922/qvk32lpvvd0w0wexv4hp.png",
            height: "",
            width: "50",
            align: "left",
            aliegn: "center",
            bookmark: true,
            textColor: "text-black",
          },
          {
            id: "1fabca18-03f0-492e-862e-122a1231[dd-mm-yyyy]",
            type: "line",
          },
        ],
      },
      {
        name: "CoverPageFull18",
        image:
          "https://res.cloudinary.com/dojwaepbj/image/upload/v1762774019/sxudlfpzhffzotbvf6gm.png",
        type: "full",
        data: [
          {
            id: "60eadd8f-032b-46e6-ad55-7ed124a377e0",
            type: "cover",
            content:
              "https://res.cloudinary.com/dojwaepbj/image/upload/v1751881501/pz9rdomexzejjlueziwc.png",
            bookmark: false,
            dark: 0,
            bright: 0,
            template: 6,
            height: 1380,
          },
          {
            id: "d1b7d054-f8d2-4b20-935c-51addb322950",
            type: "image",
            content:
              "https://res.cloudinary.com/dojwaepbj/image/upload/v1756098922/qvk32lpvvd0w0wexv4hp.png",
            height: "200",
            width: "25",
            aliegn: "left",
            caption: "",
            discription: "",
            bookmark: false,
          },
          {
            id: "5684e6f5-47f6-4bf1-9095-20402ec48154",
            type: "heading",
            size: "heading-four",
            content: [
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "UI/UX DESIGN",
                  },
                ],
              },
            ],
            bookmark: true,
            textColor: "text-black",
          },
          {
            id: "dcc52475-2c9e-4c87-b332-a0a18532928a",
            type: "heading",
            size: "heading-one",
            content: [
              {
                type: "heading-one",
                align: "left",
                children: [
                  {
                    text: "BUSINESS PROPOSAL",
                    bold: true,
                  },
                ],
              },
            ],
            bookmark: true,
          },
          {
            id: "b2c09523-d5f2-4c12-8e54-0335b6ef5971",
            type: "input",
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "Designing Intuitive Experiences That Deive Business Growth.",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
            ],
            bookmark: true,
            textColor: "text-black",
          },
          {
            id: "4b58b932-9d69-4e25-8104-2e392b50b483",
            type: "input",
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
                align: "right",
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "+[Country Code] [Your Number]",
                  },
                ],
                align: "right",
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "www.yourcompany.com",
                  },
                ],
                align: "right",
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "info@yourcompany.com",
                  },
                ],
                align: "right",
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "Your Company Address",
                  },
                ],
                align: "right",
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
            ],
            bookmark: false,
          },
        ],
      },
      {
        name: "CoverPageFull19",
        image:
          "https://res.cloudinary.com/dojwaepbj/image/upload/v1762774020/nbltjiwtunnzlppeipik.png",
        type: "full",
        data: [
          {
            id: "60eadd8f-032b-46e6-ad55-7ed124a377e0",
            type: "cover",
            content:
              "https://res.cloudinary.com/dojwaepbj/image/upload/v1751881936/mipfzpmxryicxlxejugg.png",
            bookmark: false,
            dark: 18,
            bright: 0,
            template: 7,
            height: 1380,
          },
          {
            id: "d1b7d054-f8d2-4b20-935c-51addb322950",
            type: "image",
            content:
              "https://res.cloudinary.com/dojwaepbj/image/upload/v1756098922/qvk32lpvvd0w0wexv4hp.png",
            height: "200",
            width: "25",
            aliegn: "center",
            caption: "",
            discription: "",
            bookmark: false,
          },
          {
            id: "5684e6f5-47f6-4bf1-9095-20402ec48154",
            type: "heading",
            size: "heading-four",
            content: [
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "center",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "center",
                children: [
                  {
                    bold: true,
                    text: "UI/UX DESIGN",
                  },
                ],
              },
            ],
            bookmark: true,
            textColor: "text-white",
          },
          {
            id: "dcc52475-2c9e-4c87-b332-a0a18532928a",
            type: "heading",
            size: "heading-one",
            content: [
              {
                type: "heading-one",
                align: "center",
                children: [
                  {
                    text: "BUSINESS PROPOSAL",
                    bold: true,
                  },
                ],
              },
            ],
            bookmark: true,
            textColor: "text-white",
          },
          {
            id: "b2c09523-d5f2-4c12-8e54-0335b6ef5971",
            type: "input",
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "Designing Intuitive Experiences That Deive Business Growth.",
                  },
                ],
                align: "center",
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
            ],
            bookmark: true,
            textColor: "text-white",
          },
          {
            id: "4b58b932-9d69-4e25-8104-2e392b50b483",
            type: "input",
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
                align: "right",
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "+[Country Code] [Your Number]",
                  },
                ],
                align: "center",
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "www.yourcompany.com",
                  },
                ],
                align: "center",
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "info@yourcompany.com",
                  },
                ],
                align: "center",
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "Your Company Address",
                  },
                ],
                align: "center",
              },
            ],
            bookmark: false,
            textColor: "text-white",
          },
          {
            id: "cd04158e-b8af-4eb6-865e-749367808124",
            type: "line",
          },
        ],
      },
      {
        name: "CoverPageFull20",
        image:
          "https://res.cloudinary.com/dojwaepbj/image/upload/v1762774021/ebmritwr7adoftxejma2.png",
        type: "full",
        data: [
          {
            id: "214ce9b9-482a-4ef5-b168-8c7916786b6f",
            type: "cover",
            content:
              "https://res.cloudinary.com/dojwaepbj/image/upload/v1751882872/j1yfaetj5eam0nt6xoxb.png",
            bookmark: false,
            dark: 0,
            bright: 0,
            template: 7,
            height: 1380,
          },
          {
            id: "6c8006db-4963-4a91-aaaa-02ebdd93c512",
            type: "image",
            content:
              "https://res.cloudinary.com/dojwaepbj/image/upload/v1756098922/qvk32lpvvd0w0wexv4hp.png",
            height: "200",
            width: "25",
            aliegn: "left",
            caption: "",
            discription: "",
            bookmark: false,
          },
          {
            id: "5684e6f5-47f6-4bf1-9095-20402ec48154",
            type: "heading",
            size: "heading-four",
            content: [
              {
                type: "heading-four",
                align: "right",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "right",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "right",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "right",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "right",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "right",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "right",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "right",
                children: [
                  {
                    bold: true,
                    text: "UI/UX DESIGN",
                  },
                ],
              },
            ],
            bookmark: true,
            textColor: "text-gray-700",
          },
          {
            id: "dcc52475-2c9e-4c87-b332-a0a18532928a",
            type: "heading",
            size: "heading-one",
            content: [
              {
                type: "heading-one",
                align: "right",
                children: [
                  {
                    text: "BUSINESS PROPOSAL",
                    bold: true,
                  },
                ],
              },
            ],
            bookmark: true,
            textColor: "text-gray-700",
          },
          {
            id: "b2c09523-d5f2-4c12-8e54-0335b6ef5971",
            type: "input",
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "Designing Intuitive Experiences That Deive Business Growth.",
                  },
                ],
                align: "right",
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
            ],
            bookmark: true,
            textColor: "text-gray-700",
          },
          {
            id: "d39ed1da-1cc9-4c36-9b2c-2948501a0b87",
            type: "input",
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
                align: "right",
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
                align: "right",
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
                align: "right",
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
                align: "right",
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
                align: "right",
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "PREPARED BY",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "[Your Company Name]",
                  },
                ],
                align: "right",
              },
              {
                type: "heading-two",
                children: [
                  {
                    text: "[dd-mm-yyyy]",
                    bold: true,
                  },
                ],
                align: "right",
              },
            ],
            bookmark: true,
            textColor: "text-gray-700",
          },
          {
            id: "4cee8acd-ab6f-4f98-9e1f-7fa6e1f6a1fa",
            type: "line",
          },
        ],
      },
    ];

    // Half-page cover data (simple cover rows)
    const halfPageCovers = [
      {
        name: "CoverPageHalf1",
        image:
          "https://res.cloudinary.com/dojwaepbj/image/upload/v1762774022/ic0nwi3ov2fsiljzlcnr.png",
        type: "half",
        data: [
          {
            id: "030bb67e-f6bb-416d-b9c4-6deea5e7755bwedwe",
            type: "cover",
            content:
              "https://res.cloudinary.com/dojwaepbj/image/upload/v1751982569/edxgckrmuq35gefpkqjf.png",
            bookmark: false,
            dark: 67,
            template: 8,
            height: 690,
          },
          {
            id: "a67d170a-0f57-431a-9dbc-0d509e2bd217weqdqew",
            type: "heading",
            size: "heading-one",
            content: [
              {
                type: "heading-one",
                align: "center",
                children: [
                  {
                    bold: true,
                    text: "Transforming Workflows with",
                  },
                ],
              },
              {
                type: "heading-one",
                align: "center",
                children: [
                  {
                    bold: true,
                    text: "Smart Software",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-white",
          },
          {
            id: "0b13f7f3-141a-4eea-96b9-8f6c5dac9ea2edwq",
            type: "input",
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "A proposal to streamline operations using our SaaS platform",
                  },
                ],
                align: "center",
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-white",
          },
          {
            id: "c9ec8458-fa78-4b7a-90df-f59520dd9d84ewqqewd",
            type: "input",
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "June 24, [dd-mm-yyyy]",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-white",
          },
          {
            id: "2db5f891-cb49-4728-a011-ba4739ab1d24qwedqewe",
            type: "input",
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "Discover how our scalable software-as-a-service product helps you automate tasks, ",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "improve team collaboration, and deliver measurable results—fast.",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-white",
          },
          {
            id: "e74c1a65-9b1f-4898-9f90-3eaa01084f65qwdeq",
            type: "line",
          },
          {
            id: "25384be1-8dad-4b9b-9f6e-d0b21a30fb54qewdq",
            type: "image-para",
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "Prepared For: [Client Name]",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "Prepared By: [Your Company Name]",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
            ],
            ImageLink:
              "https://res.cloudinary.com/dojwaepbj/image/upload/v1756098922/qvk32lpvvd0w0wexv4hp.png",
            height: "",
            width: "",
            align: "left",
            aliegn: "center",
            bookmark: false,
            textColor: "text-white",
          },
          {
            id: "75f4a95a-2336-436c-8578-88710c82c2ebewdqwe",
            type: "line",
          },
        ],
      },
      {
        name: "CoverPageHalf2",
        image:
          "https://res.cloudinary.com/dojwaepbj/image/upload/v1762774023/smqsv31xmt8nwtzjvnmf.png",
        type: "half",
        data: [
          {
            id: "030bb67e-f6bb-416d-b9c4-6deea5e7755bweqdwqe",
            type: "cover",
            content:
              "https://res.cloudinary.com/dojwaepbj/image/upload/v1751983256/qkpncci2rl1syeqadm7n.png",
            bookmark: false,
            template: 6,
            height: 690,
          },
          {
            id: "a67d170a-0f57-431a-9dbc-0d509e2bd217ewqdqwe",
            type: "heading",
            size: "heading-one",
            content: [
              {
                type: "heading-one",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "LET’S GROW YOUR ",
                  },
                ],
              },
              {
                type: "heading-one",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "BRAND TOGETHER",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-black",
          },
          {
            id: "0b13f7f3-141a-4eea-96b9-8f6c5dac9ea2weqdqew",
            type: "input",
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "Custom marketing strategies designed",
                  },
                ],
                align: "left",
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "to boost reach and results",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-black",
          },
          {
            id: "c9ec8458-fa78-4b7a-90df-f59520dd9d84eqwdqwe",
            type: "input",
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "June 24, [dd-mm-yyyy]",
                    bold: true,
                  },
                ],
                align: "left",
              },
            ],
            bookmark: false,
            textColor: "text-black",
          },
          {
            id: "bda93768-1cf6-464c-b56e-8ab98989d4adqwdqdasc",
            type: "input",
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "Prepared For: [Client Name]",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "Prepared By: [Your Company Name]",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
            ],
            bookmark: false,
          },
          {
            id: "618e4c72-b7ea-4699-8e18-60215765e10cerwfwe",
            type: "image-para",
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "+[Country Code] [Your Number]",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "www.yourwebsite.com",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "your.email@example.com",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "Your Company Address",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
            ],
            ImageLink:
              "https://res.cloudinary.com/dojwaepbj/image/upload/v1756098922/qvk32lpvvd0w0wexv4hp.png",
            height: "",
            width: "",
            align: "left",
            aliegn: "center",
            bookmark: false,
          },
        ],
      },
      {
        name: "CoverPageHalf3",
        image:
          "https://res.cloudinary.com/dojwaepbj/image/upload/v1762774024/samo2e1p0yxnwsyxdiay.png",
        type: "half",
        data: [
          {
            id: "030bb67e-f6bb-416d-b9c4-6deea5e7755bwedqwefcdwec",
            type: "cover",
            content:
              "https://res.cloudinary.com/dojwaepbj/image/upload/v1751983340/n5jbrqor9f0vqzc5cmlb.png",
            bookmark: false,
            template: 7,
            height: 690,
          },
          {
            id: "a67d170a-0f57-431a-9dbc-0d509e2bd217dewcefv",
            type: "heading",
            size: "heading-one",
            content: [
              {
                type: "heading-one",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-one",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-one",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "EMPOWERING MINDS THROUGH LEARNING",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-gray-700",
          },
          {
            id: "0b13f7f3-141a-4eea-96b9-8f6c5dac9ea2ewdcwedcdcw",
            type: "input",
            content: [
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "Proposal for Skill-Building and Developmental Training",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-gray-700",
          },
          {
            id: "c9ec8458-fa78-4b7a-90df-f59520dd9d84wecwedceqc",
            type: "input",
            content: [
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "June 24, [dd-mm-yyyy]",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-gray-700",
          },
          {
            id: "bda93768-1cf6-464c-b56e-8ab98989d4adddcwdcdw",
            type: "input",
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "Prepared For: [Client Name]",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "Prepared By: [Your Company Name]",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-gray-700",
          },
          {
            id: "618e4c72-b7ea-4699-8e18-60215765e10cwcwdcwddwe",
            type: "image-para",
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "+[Country Code] [Your Number]",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "www.yourcompany.com",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "info@yourcompany.com",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "Your Company Address",
                  },
                ],
              },
            ],
            ImageLink:
              "https://res.cloudinary.com/dojwaepbj/image/upload/v1756098922/qvk32lpvvd0w0wexv4hp.png",
            height: "",
            width: "",
            align: "left",
            aliegn: "center",
            bookmark: false,
            textColor: "text-gray-700",
          },
          {
            id: "52dd1843-5054-4466-9154-18cc461c5646wecwedcwedcdc",
            type: "line",
          },
        ],
      },
      {
        name: "CoverPageHalf4",
        image:
          "https://res.cloudinary.com/dojwaepbj/image/upload/v1762774025/jhfusjrpthot1kcnd6qa.png",
        type: "half",
        data: [
          {
            id: "030bb67e-f6bb-416d-b9c4-6deea5e7755bwdecwec",
            type: "cover",
            content:
              "https://res.cloudinary.com/dojwaepbj/image/upload/v1751983476/r4uqxegysmapa0vxumza.png",
            bookmark: false,
            template: 8,
            height: 690,
          },
          {
            id: "a67d170a-0f57-431a-9dbc-0d509e2bd217dcewwedc",
            type: "heading",
            size: "heading-one",
            content: [
              {
                type: "heading-one",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-one",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-one",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "Innovation That Scales",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-gray-700",
          },
          {
            id: "0b13f7f3-141a-4eea-96b9-8f6c5dac9ea2giygbgdasc",
            type: "input",
            content: [
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    text: "Proposal for Strategic Investment in Ohm",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-gray-700",
          },
          {
            id: "13312e6f-2028-48b3-999b-a001f1fd7da2dsc sdvcsc",
            type: "input",
            content: [
              {
                type: "paragrapgh-two",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragrapgh-two",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragrapgh-two",
                children: [
                  {
                    text: "We’re building a smarter, faster future. This proposal outlines ",
                  },
                ],
              },
              {
                type: "paragrapgh-two",
                children: [
                  {
                    text: "how our technology addresses real-world problems—",
                  },
                ],
              },
              {
                type: "paragrapgh-two",
                children: [
                  {
                    text: "and why we’re ready to scale.",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-gray-700",
          },
          {
            id: "c9ec8458-fa78-4b7a-90df-f59520dd9d84sadcad",
            type: "input",
            content: [
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "June 24, [dd-mm-yyyy]",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-gray-700",
          },
          {
            id: "bda93768-1cf6-464c-b56e-8ab98989d4adsdcsadc",
            type: "input",
            content: [
              {
                type: "paragrapgh",
                children: [
                  {
                    text: "Prepared For: [Client Name]",
                  },
                ],
              },
              {
                type: "paragrapgh",
                children: [
                  {
                    text: "Prepared By: [Your Company Name]",
                  },
                ],
              },
              {
                type: "paragrapgh",
                children: [
                  {
                    text: "",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-gray-700",
          },
          {
            id: "545b33cc-b403-4b69-8e29-b32b4adce8fbsvsdvfsdv",
            type: "input",
            content: [
              {
                type: "paragrapgh-two",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragrapgh-two",
                children: [
                  {
                    text: "+[Country Code] [Your Number]",
                  },
                ],
              },
              {
                type: "paragrapgh-two",
                children: [
                  {
                    text: "www.yourcompany.com",
                  },
                ],
              },
              {
                type: "paragrapgh-two",
                children: [
                  {
                    text: "info@yourcompany.com",
                  },
                ],
              },
              {
                type: "paragrapgh-two",
                children: [
                  {
                    text: "Your Company Address",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-gray-700",
          },
          {
            id: "941764bc-4726-4d3a-85e2-517cee452b31sdfvcs",
            type: "line",
          },
        ],
      },
      {
        name: "CoverPageHalf5",
        image:
          "https://res.cloudinary.com/dojwaepbj/image/upload/v1762774026/b5nnzjnp3il24mfxpkfo.png",
        type: "half",
        data: [
          {
            id: "27866411-41d4-4955-8024-4f7bce5d9578wedcdwec",
            type: "cover",
            content:
              "https://res.cloudinary.com/dojwaepbj/image/upload/v1751983593/rn3djoook47omfpdxgqn.png",
            bookmark: false,
            template: 5,
            height: 690,
          },
          {
            id: "253d996f-c3b0-46b8-a321-15340ad39822dqcwadc",
            type: "heading",
            size: "heading-one",
            content: [
              {
                type: "heading-one",
                align: "left",
                children: [
                  {
                    text: "",
                    bold: true,
                  },
                ],
              },
              {
                type: "heading-one",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "DESIGN THAT SPEAKS ",
                  },
                ],
              },
              {
                type: "heading-one",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "FOR YOUR BRAND",
                  },
                ],
              },
            ],
            bookmark: false,
          },
          {
            id: "36aefd29-6057-40f2-9bbb-903c840fa4f7wdecwecd",
            type: "input",
            content: [
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "Freelance UI/UX Design Services",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
            ],
            bookmark: false,
          },
          {
            id: "c2ca6651-dbeb-490a-a7db-3614b7fd4dddcscwadssz",
            type: "image-para",
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "📞+[Country Code] [Your Number]",
                  },
                ],
                align: "left",
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "🌐www.yourcompany.com",
                  },
                ],
                align: "left",
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "📨info@yourcompany.com",
                  },
                ],
                align: "left",
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
            ],
            ImageLink:
              "https://res.cloudinary.com/dojwaepbj/image/upload/v1756098922/qvk32lpvvd0w0wexv4hp.png",
            height: "",
            width: "",
            align: "left",
            aliegn: "center",
            bookmark: false,
          },
          {
            id: "d729a98a-65f8-427f-b165-069aa54c99b2sdcsdf",
            type: "line",
          },
        ],
      },
      {
        name: "CoverPageHalf6",
        image:
          "https://res.cloudinary.com/dojwaepbj/image/upload/v1762774028/zfch54ee7nksr359i6gu.png",
        type: "half",
        data: [
          {
            id: "dc08dd0f-a4d3-4064-b5da-f6b0a5bcbc64wdcwecwdc",
            type: "cover",
            content:
              "https://res.cloudinary.com/dojwaepbj/image/upload/v1751983813/mqw2pjehckwoundrwxja.png",
            bookmark: false,
            bright: 1,
            dark: 4,
            template: 9,
            height: 690,
          },
          {
            id: "8bfc05f3-3984-4747-908c-6694eabf947bwcdwecwecd",
            type: "heading",
            size: "heading-four",
            content: [
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    text: "Rimberio co",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-gray-700",
          },
          {
            id: "905e4a4b-8a53-4083-913a-8558b902f4ddqcdwecwec",
            type: "heading",
            size: "heading-one",
            content: [
              {
                type: "heading-one",
                align: "left",
                children: [
                  {
                    text: "BUSINESS PLAN",
                    bold: true,
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-gray-700",
          },
          {
            id: "b61c8f06-6d9d-4e35-b4e3-84baa224702dwccwesd",
            type: "heading",
            size: "heading-five",
            content: [
              {
                type: "heading-five",
                align: "left",
                children: [
                  {
                    text: "Empowering Success,",
                  },
                ],
              },
              {
                type: "heading-five",
                align: "left",
                children: [
                  {
                    text: "Igniting Innovation",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-gray-700",
          },
          {
            id: "259453f3-3c97-404f-9788-5006034f3154decsadsadc",
            type: "input",
            content: [
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "June 24, [dd-mm-yyyy]",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-gray-700",
          },
          {
            id: "efdd0398-bf6d-4e8a-a098-7249835bc0d8edcsadcads",
            type: "double-para",
            firstContent: [
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "Prepared by",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "Olivia Wilson",
                  },
                ],
              },
            ],
            secondContent: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "[Your Company Name]",
                  },
                ],
                align: "right",
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "rimberio@pixelhuee.studio",
                  },
                ],
                align: "right",
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "+91 98000 44000",
                  },
                ],
                align: "right",
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "www.pixelhuee.studio",
                  },
                ],
                align: "right",
              },
            ],
            bookmark: false,
            textColor: "text-gray-700",
          },
          {
            id: "c0eaee86-4d9c-4117-8b27-8b2b783bd6c2dscwdc",
            type: "line",
          },
          {
            id: "de1eb23f-36cc-4e82-b318-95532316fcf7asdcssassdc",
            type: "line",
          },
          {
            id: "aad8d817-c3df-433a-94a1-4b97203bf11ddcsdc",
            type: "line",
          },
        ],
      },
      {
        name: "CoverPageHalf7",
        image:
          "https://res.cloudinary.com/dojwaepbj/image/upload/v1762774029/llflfwdvsxugc69ts2gi.png",
        type: "half",
        data: [
          {
            id: "030bb67e-f6bb-416d-b9c4-6deea5e7755bsdcwdsc",
            type: "cover",
            template: 6,
            dark: 0,
            bright: 0,
            content:
              "https://res.cloudinary.com/dojwaepbj/image/upload/v1751983875/usctxnou2svleh3qqwm9.png",
            bookmark: false,
            height: 690,
          },
          {
            id: "37570ee6-afa5-4115-955a-7a825b4f8242sdcsdc",
            type: "heading",
            size: "heading-one",
            content: [
              {
                type: "heading-one",
                align: "right",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-one",
                align: "right",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-one",
                align: "right",
                children: [
                  {
                    bold: true,
                    text: "BUSINESS PROPOSAL",
                  },
                ],
              },
            ],
            bookmark: false,
          },
          {
            id: "8654bfb7-5db2-4891-8ac4-2b54dd68b78asdcdssv",
            type: "heading",
            size: "heading-five",
            content: [
              {
                type: "heading-five",
                align: "right",
                children: [
                  {
                    text: "Smart Solar Street Lighting System",
                  },
                ],
              },
              {
                type: "heading-five",
                align: "right",
                children: [
                  {
                    text: "with IoT Integration",
                  },
                ],
              },
              {
                type: "heading-five",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-black",
          },
          {
            id: "3e48383c-148e-4f3a-a951-ed04c7e0738fsdvfs",
            type: "input",
            content: [
              {
                type: "paragrapgh",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragrapgh",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragrapgh",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragrapgh",
                align: "right",
                children: [
                  {
                    text: "June 13, [dd-mm-yyyy]",
                  },
                ],
              },
              {
                type: "paragrapgh",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragrapgh",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragrapgh",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "heading-three",
                children: [
                  {
                    text: "",
                  },
                ],
              },
            ],
            bookmark: false,
          },
          {
            id: "c5ca97f4-a7c6-4534-bf04-51af660b98f5svsvsv",
            type: "double-para",
            firstContent: [
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    text: "Prepared By",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "Project Development Team",
                  },
                ],
                align: "center",
              },
            ],
            secondContent: [
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    text: "Prepared For:",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "GreenEdge Innovations Pvt. Ltd.",
                  },
                ],
                align: "center",
              },
            ],
            bookmark: false,
          },
          {
            id: "874c27cc-a765-4a0f-8d76-90d4b28f34aasdcsdv",
            type: "line",
          },
        ],
      },
      {
        name: "CoverPageHalf8",
        image:
          "https://res.cloudinary.com/dojwaepbj/image/upload/v1762774030/urlzmb71gkqqjsit3ech.png",
        type: "half",
        data: [
          {
            id: "dc08dd0f-a4d3-4064-b5da-f6b0a5bcbc64sdvcs",
            type: "cover",
            content:
              "https://res.cloudinary.com/dojwaepbj/image/upload/v1751983989/dhfqu0kmay4nf5aqcjea.png",
            bookmark: false,
            template: 8,
            height: 690,
          },
          {
            id: "8bfc05f3-3984-4747-908c-6694eabf947bsvsfv",
            type: "heading",
            size: "heading-four",
            content: [
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    text: "Rimberio co",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-white",
          },
          {
            id: "905e4a4b-8a53-4083-913a-8558b902f4ddsvsdvsfvd",
            type: "heading",
            size: "heading-one",
            content: [
              {
                type: "heading-one",
                align: "center",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-one",
                align: "center",
                children: [
                  {
                    bold: true,
                    text: "BUSINESS PLAN",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-white",
          },
          {
            id: "424a3b91-e6ae-46e8-9eed-daebccfaf71esdfvsvf",
            type: "heading",
            size: "heading-six",
            content: [
              {
                type: "heading-six",
                align: "center",
                children: [
                  {
                    text: "07 July 2015",
                    bold: true,
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-white",
          },
          {
            id: "259453f3-3c97-404f-9788-5006034f3154fsvsdvcs",
            type: "input",
            content: [
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "Prepared by :",
                    bold: true,
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "Olivia Wilson",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-white",
          },
          {
            id: "b91ba891-01f7-480e-8659-533268375de6svsvsdfv",
            type: "input",
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                    bold: true,
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    bold: true,
                    text: "Prepared For: ",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "Great Client & Co.",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-black",
          },
          {
            id: "9c4ab26e-0a04-44f7-8a2e-afec7c903dd6sdvsfdvfsv",
            type: "input",
            content: [
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "rimberio@pixelhuee.studio",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "+91 98000 44000",
                  },
                ],
                align: "left",
              },
            ],
            bookmark: false,
            textColor: "text-black",
          },
          {
            id: "6037680d-8f6a-4818-bbd3-e5398505cbdbsvdfsdv",
            type: "line",
          },
        ],
      },
      {
        name: "CoverPageHalf9",
        image:
          "https://res.cloudinary.com/dojwaepbj/image/upload/v1762774030/rmnyuiy9z83k8r45mkia.png",
        type: "half",
        data: [
          {
            id: "86d7a226-431e-4197-8989-c45b765dba1sxws7",
            type: "cover",
            content:
              "https://res.cloudinary.com/dojwaepbj/image/upload/v1751984072/uy9muumxueknktmwkasa.png",
            bookmark: false,
            template: 7,
            height: 690,
          },
          {
            id: "3653ea9b-a146-4744-93be-a2a2db3asdcasdcc5786",
            type: "double-para",
            firstContent: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "Aura, Inc.",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
            ],
            secondContent: [
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    link: true,
                    text: "Instagram",
                  },
                  {
                    text: " | ",
                  },
                  {
                    text: "LinkedIn ",
                    link: true,
                  },
                  {
                    text: " |  ",
                  },
                  {
                    text: "Facebook",
                    link: true,
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    link: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    link: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    link: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    link: true,
                    text: "",
                  },
                ],
              },
            ],
            bookmark: false,
          },
          {
            id: "d7c1809d-0eb9-40a1-9e5b-3ade7aedacasdc43fc8",
            type: "heading",
            size: "heading-one",
            content: [
              {
                type: "heading-one",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-one",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-one",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "BUSINESS",
                  },
                ],
              },
            ],
            bookmark: false,
          },
          {
            id: "a85210c8-8cde-4b26-a6f5-4311ee79dscasd8ece",
            type: "heading",
            size: "heading-one",
            content: [
              {
                type: "heading-one",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "PLAN",
                  },
                ],
              },
              {
                type: "heading-one",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-white",
          },
          {
            id: "027b2247-a612-4e1a-a903-711c2sdacas595d686",
            type: "double-para",
            firstContent: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "PREPARED BY",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "[Your Company Name]",
                  },
                ],
              },
              {
                type: "heading-two",
                children: [
                  {
                    text: "[dd-mm-yyyy]",
                    bold: true,
                  },
                ],
              },
            ],
            secondContent: [
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "Email: johnnwickk@pixelhuee.studio",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "Phone: +91 900101 00007",
                  },
                ],
                align: "right",
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "Website: www.pixelhuee.studio",
                  },
                ],
                align: "right",
              },
            ],
            bookmark: false,
            textColor: "text-white",
          },
          {
            id: "fe35804f-3bc9-4e97-ade5-4c8fsadce6a682fe",
            type: "line",
          },
          {
            id: "06220a1e-0f92-4306-9040-5a56218aascd856b5",
            type: "line",
          },
        ],
      },
      {
        name: "CoverPageHalf10",
        image:
          "https://res.cloudinary.com/dojwaepbj/image/upload/v1762774031/iecuppaigl5uq4ergc03.png",
        type: "half",
        data: [
          {
            id: "e4bafc5e-88db-4a18-a1c4-fc2e15bee1c8dfvsfbv",
            type: "cover",
            content:
              "https://res.cloudinary.com/dojwaepbj/image/upload/v1751984191/la8s10a59wk7t0e36rfd.png",
            bookmark: false,
            template: 5,
            height: 690,
          },
          {
            id: "366454c5-de9a-4080-a4b3-6ccbbcb68e1fwfvfsds",
            type: "heading",
            size: "heading-one",
            content: [
              {
                type: "heading-two",
                align: "right",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-one",
                align: "right",
                children: [
                  {
                    bold: true,
                    text: "BUSINESS PROPOSAL",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-white",
          },
          {
            id: "205002e7-f09d-4eca-8041-8544ca5ae8d1efcewrvc",
            type: "heading",
            size: "heading-six",
            content: [
              {
                type: "heading-six",
                align: "right",
                children: [
                  {
                    text: "Augmented Reality & Virtual Reality Solutions",
                  },
                ],
              },
              {
                type: "heading-five",
                align: "right",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-five",
                align: "right",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-white",
          },
          {
            id: "a09c6ee9-e34b-4e36-9594-ccd38be26df1sedcsfvfdv",
            type: "input",
            content: [
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "PREPARED BY",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "[Your Company Name]",
                  },
                ],
                align: "right",
              },
              {
                type: "heading-two",
                children: [
                  {
                    text: "[dd-mm-yyyy]",
                    bold: true,
                  },
                ],
                align: "right",
              },
            ],
            bookmark: false,
            textColor: "text-white",
          },
          {
            id: "25501cd7-b773-4197-a76b-66d5e8d4fbf5ewfvewrv",
            type: "input",
            content: [
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "LinkedIn | Instagram | Twitter/X | YouTube",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-white",
          },
        ],
      },
      {
        name: "CoverPageHalf11",
        image:
          "https://res.cloudinary.com/dojwaepbj/image/upload/v1762774032/kfiyynw99ftaderuqo8b.png",
        type: "half",
        data: [
          {
            id: "921f5fa7-d993-47f9-8bba-207361cb6662sfdvsdvfc",
            type: "cover",
            content:
              "https://res.cloudinary.com/dojwaepbj/image/upload/v1751984884/u86w3mgaxjxekmlx04x3.png",
            bookmark: false,
            dark: 0,
            bright: 1,
            template: 6,
            height: 690,
          },
          {
            id: "27c2cb15-9ec2-4171-874f-544b323a7bc1sdvsdfvsdfv",
            type: "heading",
            size: "heading-five",
            content: [
              {
                type: "heading-five",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "PROPOSAL FOR",
                  },
                ],
              },
              {
                type: "heading-five",
                align: "right",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-gray-700",
          },
          {
            id: "1884cd26-ad75-45c2-aa43-a219ca4234a1qwefcfewv",
            type: "heading",
            size: "heading-one",
            content: [
              {
                type: "heading-one",
                align: "left",
                children: [
                  {
                    text: "24/7 SMART SUPPORT",
                    bold: true,
                  },
                ],
              },
              {
                type: "heading-one",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "POWERED BY AI",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-gray-700",
          },
          {
            id: "7fbc34fa-462a-45ae-af06-4c34b441a27befvdsfvccsd",
            type: "input",
            content: [
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "An AI chatbot solution tailored for e-commerce or service companies",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "to automate FAQs, order tracking, and live chat escalation.",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-gray-700",
          },
          {
            id: "d39ed1da-1cc9-4c36-9b2c-2948501a0b87dsfvsvvf",
            type: "input",
            content: [
              {
                type: "paragraph",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "PREPARED BY",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "[Your Company Name]",
                  },
                ],
                align: "right",
              },
              {
                type: "heading-two",
                children: [
                  {
                    text: "[dd-mm-yyyy]",
                    bold: true,
                  },
                ],
                align: "right",
              },
              {
                type: "heading-two",
                align: "right",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
            ],
            bookmark: true,
            textColor: "text-gray-700",
          },
          {
            id: "31beafc0-e659-4400-a060-9c0b584f83dafdsvsdvffvsfv",
            type: "image-para",
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragrapgh",
                children: [
                  {
                    text: "+[Country Code] [Your Number]",
                  },
                ],
              },
              {
                type: "paragrapgh",
                children: [
                  {
                    text: "www.yourcompany.com",
                  },
                ],
              },
              {
                type: "paragrapgh",
                children: [
                  {
                    text: "info@yourcompany.com",
                  },
                ],
              },
              {
                type: "paragrapgh",
                children: [
                  {
                    text: "Your Company Address",
                  },
                ],
              },
              {
                type: "paragrapgh",
                children: [
                  {
                    text: "",
                  },
                ],
              },
            ],
            ImageLink:
              "https://res.cloudinary.com/dojwaepbj/image/upload/v1756098922/qvk32lpvvd0w0wexv4hp.png",
            height: "",
            width: "50",
            align: "left",
            aliegn: "center",
            bookmark: true,
            textColor: "text-gray-700",
          },
        ],
      },
      {
        name: "CoverPageHalf12",
        image:
          "https://res.cloudinary.com/dojwaepbj/image/upload/v1762774033/w7ltryf6yougj18j64dt.png",
        type: "half",
        data: [
          {
            id: "921f5fa7-d993-47f9-8bba-207361cb6662dsvfsdv",
            type: "cover",
            content:
              "https://res.cloudinary.com/dojwaepbj/image/upload/v1751984978/tqqoiex2en0scdqtidjk.png",
            bookmark: false,
            template: 6,
            height: 690,
          },
          {
            id: "acc5f515-18dd-4b05-9013-ae51bc28a89bsdsfv",
            type: "input",
            content: [
              {
                type: "heading-six",
                children: [
                  {
                    text: "Surya. co",
                  },
                ],
                align: "left",
              },
              {
                type: "heading-six",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-black",
          },
          {
            id: "27c2cb15-9ec2-4171-874f-544b323a7bc1sdcsdfc",
            type: "heading",
            size: "heading-four",
            content: [
              {
                type: "heading-four",
                align: "right",
                children: [
                  {
                    bold: true,
                    text: "BUSINESS",
                  },
                ],
              },
              {
                type: "heading-one",
                align: "right",
                children: [
                  {
                    bold: true,
                    text: "PROPOSAL",
                  },
                ],
              },
              {
                type: "heading-one",
                align: "right",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-black",
          },
          {
            id: "20411975-0215-48ff-8979-bc51427ef9fasadcsd",
            type: "heading",
            size: "heading-one",
            content: [
              {
                type: "heading-one",
                align: "right",
                children: [
                  {
                    text: "Precision Agriculture",
                    bold: true,
                  },
                ],
              },
              {
                type: "heading-one",
                align: "right",
                children: [
                  {
                    bold: true,
                    text: "for a Growing World",
                  },
                ],
              },
            ],
            bookmark: false,
          },
          {
            id: "d39ed1da-1cc9-4c36-9b2c-2948501a0b87wfvwefvwre",
            type: "input",
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
                align: "right",
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "PREPARED BY",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "[Your Company Name]",
                  },
                ],
                align: "right",
              },
              {
                type: "heading-two",
                children: [
                  {
                    text: "[dd-mm-yyyy]",
                    bold: true,
                  },
                ],
                align: "right",
              },
            ],
            bookmark: true,
          },
          {
            id: "8b026fca-3ff1-4df0-b186-58548762721dsdcsc",
            type: "input",
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
                align: "center",
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "LinkedIn | Instagram | Twitter | YouTube",
                  },
                ],
              },
            ],
            bookmark: false,
          },
        ],
      },
      {
        name: "CoverPageHalf13",
        image:
          "https://res.cloudinary.com/dojwaepbj/image/upload/v1762774033/wl4fhhipcjq8ott4fpiz.png",
        type: "half",
        data: [
          {
            id: "921f5fa7-d993-47f9-8bba-207361cb6662",
            type: "cover",
            content:
              "https://res.cloudinary.com/dojwaepbj/image/upload/v1751985108/sgvvgfkibeutz5r6meem.png",
            bookmark: false,
            template: 4,
            height: 690,
          },
          {
            id: "acc5f515-18dd-4b05-9013-ae51bc28a89b",
            type: "input",
            content: [
              {
                type: "heading-five",
                children: [
                  {
                    text: "Aura. co",
                  },
                ],
                align: "center",
              },
            ],
            bookmark: false,
            textColor: "text-black",
          },
          {
            id: "b296bea5-337b-414f-8173-3258ffe7bf34",
            type: "heading",
            size: "heading-one",
            content: [
              {
                type: "heading-one",
                align: "right",
                children: [
                  {
                    bold: true,
                    text: "BUSINESS",
                  },
                ],
              },
              {
                type: "heading-one",
                align: "right",
                children: [
                  {
                    bold: true,
                    text: "PLAN",
                  },
                ],
              },
            ],
            bookmark: false,
          },
          {
            id: "e4246127-ad00-47e0-984a-2da3f89a7aa5",
            type: "input",
            content: [
              {
                type: "paragrapgh",
                children: [
                  {
                    text: "",
                  },
                ],
                align: "center",
              },
              {
                type: "paragrapgh",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragrapgh",
                children: [
                  {
                    text: "",
                  },
                ],
                align: "left",
              },
              {
                type: "paragrapgh",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragrapgh",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragrapgh",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragrapgh",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragrapgh",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragrapgh",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragrapgh",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragrapgh",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragrapgh",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "heading-six",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "heading-six",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "heading-six",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "heading-six",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "heading-six",
                align: "left",
                children: [
                  {
                    text: "www.yourcompany.com",
                  },
                ],
              },
              {
                type: "heading-six",
                children: [
                  {
                    text: "Your Company Address",
                  },
                ],
                align: "left",
              },
              {
                type: "heading-six",
                align: "left",
                children: [
                  {
                    text: "",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-black",
          },
        ],
      },
      {
        name: "CoverPageHalf14",
        image:
          "https://res.cloudinary.com/dojwaepbj/image/upload/v1762774035/wuxtqogaiobdqomn4gbp.png",
        type: "half",
        data: [
          {
            id: "dc08dd0f-a4d3-4064-b5da-f6b0a5bcbc64sdcsdvc",
            type: "cover",
            template: 7,
            content:
              "https://res.cloudinary.com/dojwaepbj/image/upload/v1751985266/taqbwso5o0uxuxebuc3d.png",
            bookmark: false,
            bright: 1,
            dark: 0,
            height: 690,
          },
          {
            id: "8bfc05f3-3984-4747-908c-6694eabf947bdfvsfv",
            type: "heading",
            size: "heading-four",
            content: [
              {
                type: "heading-four",
                align: "center",
                children: [
                  {
                    text: "Rimberio co",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-black",
          },
          {
            id: "905e4a4b-8a53-4083-913a-8558b902f4ddcdscvw",
            type: "heading",
            size: "heading-one",
            content: [
              {
                type: "heading-one",
                align: "center",
                children: [
                  {
                    bold: true,
                    text: "BUSINESS PLAN",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-black",
          },
          {
            id: "b61c8f06-6d9d-4e35-b4e3-84baa224702ddscsacds",
            type: "heading",
            size: "heading-five",
            content: [
              {
                type: "heading-five",
                align: "center",
                children: [
                  {
                    text: "Empowering Success, Igniting Innovation",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-black",
          },
          {
            id: "259453f3-3c97-404f-9788-5006034f3154retgf34",
            type: "input",
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                    bold: true,
                  },
                ],
                align: "center",
              },
              {
                type: "paragraph",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
                align: "center",
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    bold: true,
                    text: "Prepared by",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    text: "Olivia Wilson",
                  },
                ],
              },
              {
                type: "heading-three",
                align: "center",
                children: [
                  {
                    bold: true,
                    text: "24-06-[dd-mm-yyyy]",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
                align: "center",
              },
              {
                type: "paragraph",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
            ],
            bookmark: false,
          },
          {
            id: "7eda6186-d1c8-4da8-8dc5-04f1b39c965awfwew",
            type: "input",
            content: [
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    text: "rimberio@pixelhuee.studio",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "www.pixelhuee.studio",
                  },
                ],
                align: "center",
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
            ],
            bookmark: false,
          },
          {
            id: "29f0d292-7abd-408c-a5b1-53e1984e8ca9wr23",
            type: "input",
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
                align: "center",
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    text: "LinkedIn | Instagram | Twitter | YouTube",
                  },
                ],
              },
            ],
            bookmark: false,
          },
        ],
      },
      {
        name: "CoverPageHalf15",
        image:
          "https://res.cloudinary.com/dojwaepbj/image/upload/v1762774036/ueutufh9p2erysqyzbxk.png",
        type: "half",
        data: [
          {
            id: "847a85e4-9e22-4d8a-be07-dd2abdeb3a70defcwefc",
            type: "cover",
            content:
              "https://res.cloudinary.com/dojwaepbj/image/upload/v1751985523/zcxjia263qryco52slqt.png",
            bookmark: false,
            dark: 0,
            bright: 0,
            template: 7,
            height: 690,
          },
          {
            id: "5684e6f5-47f6-4bf1-9095-20402ec48154qdcewdc",
            type: "heading",
            size: "heading-four",
            content: [
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "UI/UX DESIGN",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-white",
          },
          {
            id: "22e4a9cc-6237-4ca5-b3aa-3be97a679c9cwcsdcs",
            type: "heading",
            size: "heading-one",
            content: [
              {
                type: "heading-one",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "BUSINESS PROPOSAL",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-white",
          },
          {
            id: "b2c09523-d5f2-4c12-8e54-0335b6ef5971kbhk",
            type: "input",
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "Designing Intuitive Experiences That Deive Business Growth.",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
            ],
            bookmark: false,
            textColor: "text-white",
          },
          {
            id: "d39ed1da-1cc9-4c36-9b2c-2948501a0b87kjsbdck",
            type: "input",
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "PREPARED BY",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "[Your Company Name]",
                  },
                ],
              },
              {
                type: "heading-two",
                children: [
                  {
                    text: "[dd-mm-yyyy]",
                    bold: true,
                  },
                ],
              },
              {
                type: "heading-two",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
            ],
            bookmark: true,
            textColor: "text-white",
          },
          {
            id: "31beafc0-e659-4400-a060-9c0b584f83dadcaszcdas",
            type: "image-para",
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "+[Country Code] [Your Number]",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "www.yourcompany.com",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "info@yourcompany.com",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "Your Company Address",
                  },
                ],
              },
            ],
            ImageLink:
              "https://res.cloudinary.com/dojwaepbj/image/upload/v1756098922/qvk32lpvvd0w0wexv4hp.png",
            height: "",
            width: "50",
            align: "left",
            aliegn: "center",
            bookmark: true,
            textColor: "text-white",
          },
          {
            id: "72a89d89-27af-4ec9-af65-3c7622935242asc",
            type: "line",
          },
        ],
      },
      {
        name: "CoverPageHalf16",
        image:
          "https://res.cloudinary.com/dojwaepbj/image/upload/v1762774037/loyeby95amidvkwnkjfd.png",
        type: "half",
        data: [
          {
            id: "f71db053-305c-4ca6-b395-526f6089d1fbdascda",
            type: "cover",
            content:
              "https://res.cloudinary.com/dojwaepbj/image/upload/v1751990502/xup6xpk9kkcakuuldudt.png",
            bookmark: false,
            dark: 0,
            bright: 0,
            template: 6,
            height: 690,
          },
          {
            id: "31beafc0-e659-4400-a060-9c0b584f83dawedcw",
            type: "image-para",
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "+[Country Code] [Your Number]",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "www.yourcompany.com",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "info@yourcompany.com",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "Your Company Address",
                  },
                ],
              },
            ],
            ImageLink:
              "https://res.cloudinary.com/dojwaepbj/image/upload/v1756098922/qvk32lpvvd0w0wexv4hp.png",
            height: "",
            width: "50",
            align: "left",
            aliegn: "center",
            bookmark: true,
            textColor: "text-black",
          },
          {
            id: "5684e6f5-47f6-4bf1-9095-20402ec48154dqwcdasca",
            type: "heading",
            size: "heading-four",
            content: [
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "UI/UX DESIGN",
                  },
                ],
              },
            ],
            bookmark: true,
            textColor: "text-black",
          },
          {
            id: "827630fc-3162-4606-a537-c0f07884f82adsacasdc",
            type: "heading",
            size: "heading-one",
            content: [
              {
                type: "heading-one",
                align: "left",
                children: [
                  {
                    text: "BUSINESS PROPOSAL",
                    bold: true,
                  },
                ],
              },
            ],
            bookmark: false,
          },
          {
            id: "b2c09523-d5f2-4c12-8e54-0335b6ef5971dscsadc",
            type: "input",
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "Designing Intuitive Experiences That Deliver Business Growth.",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
            ],
            bookmark: true,
            textColor: "text-black",
          },
          {
            id: "d39ed1da-1cc9-4c36-9b2c-2948501a0b87dascascasdc",
            type: "input",
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "PREPARED BY",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "[Your Company Name]",
                  },
                ],
              },
              {
                type: "heading-two",
                children: [
                  {
                    text: "[dd-mm-yyyy]",
                    bold: true,
                  },
                ],
              },
            ],
            bookmark: true,
            textColor: "text-black",
          },
        ],
      },
      {
        name: "CoverPageHalf17",
        image:
          "https://res.cloudinary.com/dojwaepbj/image/upload/v1762774038/pboixbq0nimhthypo2lu.png",
        type: "half",
        data: [
          {
            id: "627fb7b3-18e0-4c44-8711-62b3c076b1a1qwdcas",
            type: "cover",
            content:
              "https://res.cloudinary.com/dojwaepbj/image/upload/v1751990558/jpbugnmhvgdmkgap6wcl.png",
            bookmark: false,
            dark: 0,
            bright: 0,
            template: 7,
            height: 690,
          },
          {
            id: "747bcc60-4788-4b81-bdd4-4c486409eb8fascas",
            type: "image-para",
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "PREPARED BY",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "[Your Company Name]",
                  },
                ],
              },
              {
                type: "heading-two",
                children: [
                  {
                    text: "[dd-mm-yyyy]",
                    bold: true,
                  },
                ],
              },
            ],
            ImageLink:
              "https://res.cloudinary.com/dojwaepbj/image/upload/v1756098922/qvk32lpvvd0w0wexv4hp.png",
            height: "",
            width: "",
            align: "left",
            aliegn: "center",
            bookmark: false,
          },
          {
            id: "5684e6f5-47f6-4bf1-9095-20402ec48154ascasdcascd",
            type: "heading",
            size: "heading-four",
            content: [
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "UI/UX DESIGN",
                  },
                ],
              },
            ],
            bookmark: true,
            textColor: "text-black",
          },
          {
            id: "355481b8-d21f-4a0a-83e8-53fa8dcb66a8acasxzx",
            type: "heading",
            size: "heading-two",
            content: [
              {
                type: "heading-two",
                align: "left",
                children: [
                  {
                    text: "BUSINESS PROPOSAL",
                    bold: true,
                  },
                ],
              },
            ],
            bookmark: false,
          },
          {
            id: "b2c09523-d5f2-4c12-8e54-0335b6ef5971adcax",
            type: "input",
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "Designing Intuitive Experiences That Deive Business Growth.",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
            ],
            bookmark: true,
            textColor: "text-black",
          },
          {
            id: "31beafc0-e659-4400-a060-9c0b584f83dasadcas",
            type: "image-para",
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "+[Country Code] [Your Number]",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "www.yourcompany.com",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "info@yourcompany.com",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "Your Company Address",
                  },
                ],
              },
            ],
            ImageLink:
              "https://res.cloudinary.com/dojwaepbj/image/upload/v1756098922/qvk32lpvvd0w0wexv4hp.png",
            height: "",
            width: "50",
            align: "left",
            aliegn: "center",
            bookmark: true,
            textColor: "text-black",
          },
          {
            id: "1fabca18-03f0-492e-862e-122a1231[dd-mm-yyyy]as",
            type: "line",
          },
        ],
      },
      {
        name: "CoverPageHalf18",
        image:
          "https://res.cloudinary.com/dojwaepbj/image/upload/v1762774039/l3mopiedygqnqvaypxsw.png",
        type: "half",
        data: [
          {
            id: "60eadd8f-032b-46e6-ad55-7ed124a377e0adsczx",
            type: "cover",
            content:
              "https://res.cloudinary.com/dojwaepbj/image/upload/v1751990633/a7i5u41gwoliunzzsdda.png",
            bookmark: false,
            dark: 0,
            bright: 0,
            template: 6,
            height: 690,
          },
          {
            id: "d1b7d054-f8d2-4b20-935c-51addb322950asdcd",
            type: "image",
            content:
              "https://res.cloudinary.com/dojwaepbj/image/upload/v1756098922/qvk32lpvvd0w0wexv4hp.png",
            height: "200",
            width: "25",
            aliegn: "left",
            caption: "",
            discription: "",
            bookmark: false,
          },
          {
            id: "5684e6f5-47f6-4bf1-9095-20402ec48154bvfdcs",
            type: "heading",
            size: "heading-four",
            content: [
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "UI/UX DESIGN",
                  },
                ],
              },
            ],
            bookmark: true,
            textColor: "text-black",
          },
          {
            id: "dcc52475-2c9e-4c87-b332-a0a18532928adczxc",
            type: "heading",
            size: "heading-one",
            content: [
              {
                type: "heading-one",
                align: "left",
                children: [
                  {
                    text: "BUSINESS PROPOSAL",
                    bold: true,
                  },
                ],
              },
            ],
            bookmark: true,
          },
          {
            id: "b2c09523-d5f2-4c12-8e54-0335b6ef5971sdcasdc",
            type: "input",
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "Designing Intuitive Experiences That Deive Business Growth.",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
            ],
            bookmark: true,
            textColor: "text-black",
          },
          {
            id: "4b58b932-9d69-4e25-8104-2e392b50b483asxcaxs",
            type: "input",
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
                align: "right",
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "+[Country Code] [Your Number]",
                  },
                ],
                align: "right",
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "www.yourcompany.com",
                  },
                ],
                align: "right",
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "info@yourcompany.com",
                  },
                ],
                align: "right",
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "Your Company Address",
                  },
                ],
                align: "right",
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
            ],
            bookmark: false,
          },
        ],
      },
      {
        name: "CoverPageHalf19",
        image:
          "https://res.cloudinary.com/dojwaepbj/image/upload/v1762774040/brm8s9rmhhjqqxo0x4d8.png",
        type: "half",
        data: [
          {
            id: "60eadd8f-032b-46e6-ad55-7ed124a377easdca0",
            type: "cover",
            content:
              "https://res.cloudinary.com/dojwaepbj/image/upload/v1751990717/kqw1gmfe4iyd5vpbi5oa.png",
            bookmark: false,
            dark: 18,
            bright: 0,
            template: 7,
            height: 690,
          },
          {
            id: "d1b7d054-f8d2-4b20-935c-51addb32dsaca2950",
            type: "image",
            content:
              "https://res.cloudinary.com/dojwaepbj/image/upload/v1756098922/qvk32lpvvd0w0wexv4hp.png",
            height: "200",
            width: "25",
            aliegn: "center",
            caption: "",
            discription: "",
            bookmark: false,
          },
          {
            id: "5684e6f5-47f6-4bf1-9095-20402ec48adcax154",
            type: "heading",
            size: "heading-four",
            content: [
              {
                type: "heading-four",
                align: "left",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "center",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "center",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "center",
                children: [
                  {
                    bold: true,
                    text: "UI/UX DESIGN",
                  },
                ],
              },
            ],
            bookmark: true,
            textColor: "text-white",
          },
          {
            id: "dcc52475-2c9e-4c87-b332-a0a18aaxx532928a",
            type: "heading",
            size: "heading-one",
            content: [
              {
                type: "heading-one",
                align: "center",
                children: [
                  {
                    text: "BUSINESS PROPOSAL",
                    bold: true,
                  },
                ],
              },
            ],
            bookmark: true,
            textColor: "text-white",
          },
          {
            id: "b2c09523-d5f2-4c12-8e54-033dascadc5b6ef5971",
            type: "input",
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "Designing Intuitive Experiences That Deive Business Growth.",
                  },
                ],
                align: "center",
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
            ],
            bookmark: true,
            textColor: "text-white",
          },
          {
            id: "4b58b932-9d69asdcasd-4e25-8104-2e392b50b483",
            type: "input",
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
                align: "center",
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "center",
                children: [
                  {
                    text: "+[Country Code] [Your Number]",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "www.yourcompany.com",
                  },
                ],
                align: "center",
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "info@yourcompany.com",
                  },
                ],
                align: "center",
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "Your Company Address",
                  },
                ],
                align: "center",
              },
            ],
            bookmark: false,
            textColor: "text-white",
          },
          {
            id: "cd04158e-b8af-4ebadcadsc6-865e-749367808124",
            type: "line",
          },
        ],
      },
      {
        name: "CoverPageHalf20",
        image:
          "https://res.cloudinary.com/dojwaepbj/image/upload/v1762774041/pl9rh4xo1syed3cslogi.png",
        type: "half",
        data: [
          {
            id: "030bb67e-f6bb-416d-b9c4-6deea5e7755basdcsacx",
            type: "cover",
            content:
              "https://res.cloudinary.com/dojwaepbj/image/upload/v1751990779/xqe5dxcoca1plcrza0bo.png",
            bookmark: false,
            dark: 14,
            template: 7,
            height: 690,
          },
          {
            id: "6c8006db-4963-4a91-aaaa-02ebdd9casdc3c512",
            type: "image",
            content:
              "https://res.cloudinary.com/dojwaepbj/image/upload/v1756098922/qvk32lpvvd0w0wexv4hp.png",
            height: "200",
            width: "25",
            aliegn: "left",
            caption: "",
            discription: "",
            bookmark: false,
          },
          {
            id: "5684e6f5-47f6-4bf1-9095-20402ec4815dsacs4",
            type: "heading",
            size: "heading-four",
            content: [
              {
                type: "heading-four",
                align: "right",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "right",
                children: [
                  {
                    bold: true,
                    text: "",
                  },
                ],
              },
              {
                type: "heading-four",
                align: "right",
                children: [
                  {
                    bold: true,
                    text: "UI/UX DESIGN",
                  },
                ],
              },
            ],
            bookmark: true,
            textColor: "text-black",
          },
          {
            id: "dcc52475-2c9e-4c87-b332-svffdsa0a18532928a",
            type: "heading",
            size: "heading-one",
            content: [
              {
                type: "heading-one",
                align: "right",
                children: [
                  {
                    text: "BUSINESS PROPOSAL",
                    bold: true,
                  },
                ],
              },
            ],
            bookmark: true,
            textColor: "text-black",
          },
          {
            id: "b2c09523-d5f2-4c12-8e54-0335b6dfsvdsfef5971",
            type: "input",
            content: [
              {
                type: "paragraph",
                children: [
                  {
                    text: "Designing Intuitive Experiences That Deive Business Growth.",
                  },
                ],
                align: "right",
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "",
                  },
                ],
              },
            ],
            bookmark: true,
            textColor: "text-black",
          },
          {
            id: "d39ed1da-1cc9-4c36sdfvds-9b2c-2948501a0b87",
            type: "input",
            content: [
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "",
                  },
                ],
              },
              {
                type: "paragraph",
                align: "right",
                children: [
                  {
                    text: "PREPARED BY",
                  },
                ],
              },
              {
                type: "paragraph",
                children: [
                  {
                    text: "[Your Company Name]",
                  },
                ],
                align: "right",
              },
              {
                type: "heading-two",
                children: [
                  {
                    text: "[dd-mm-yyyy]",
                    bold: true,
                  },
                ],
                align: "right",
              },
            ],
            bookmark: true,
            textColor: "text-black",
          },
          {
            id: "4cee8acd-ab6f-4f98-9sdfve1f-7fa6e1f6a1fa",
            type: "line",
          },
        ],
      },
    ];

    const allCovers = [...fullPageCovers, ...halfPageCovers];

    await CoverPage.insertMany(allCovers);
    console.log("Cover pages seeded successfully");
    process.exit();
  } catch (error) {
    console.error("Error seeding cover pages:", error);
    process.exit(1);
  }
};

seedCoverPages();
