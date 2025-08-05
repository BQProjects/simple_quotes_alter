import React, { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import { FiBookmark, FiPlus } from "react-icons/fi";
import { MdKeyboardArrowRight } from "react-icons/md";
import Sign_v from "../../assets/Sign_v.png";
import cost_v from "../../assets/cost_v.png";
import table_v_1 from "../../assets/table_v_1.png";
import table_v_2 from "../../assets/table_v_2.png";
import table_v_3 from "../../assets/table_v_3.png";
import table_v_4 from "../../assets/table_v_4.png";
import table_v_5 from "../../assets/table_v_5.png";
import sections_1 from "../../assets/sections_1.png";
import section_2 from "../../assets/section_2.png";
import page_1 from "../../assets/page_1.png";
import sections from "../../assets/sections.png";
import saved from "../../assets/saved.png";
import Elements from "../../assets/Elements.png";
import Outline from "../../assets/Outline.png";
import Layout from "../../assets/Layout.png";
import Layers from "../../assets/Layers.png";
import History from "../../assets/History.png";
import Themes from "../../assets/Themes.png";
import Content from "../../assets/Content.png";
import help from "../../assets/help.png";
import heading_one from "../../assets/heading_one.png";
import image_in from "../../assets/Image_in.png";
import image_paragraph from "../../assets/Image_paragraph.png";
import theme_0 from "../../assets/theme-0.png";
import theme_1 from "../../assets/theme-1.png";
import theme_2 from "../../assets/theme-2.png";
import theme_3 from "../../assets/theme-3.png";
import theme_4 from "../../assets/theme-4.png";
import theme_5 from "../../assets/theme-5.png";

import ContentSideBar from "./SideBarComponents/ContentSideBar";
import { FaAngleDoubleLeft } from "react-icons/fa";
import single_para from "../../assets/single_para.png";
import double_para from "../../assets/double_para.png";
import { StateManageContext } from "../../context/StateManageContext";
import { SketchPicker } from "react-color";
import { IoCloudUploadOutline } from "react-icons/io5";
import para from "../../assets/para.jpeg";
import image_insert from "../../assets/img.jpeg";
import double_para_2 from "../../assets/double_para.jpeg";
import img_para from "../../assets/Img_para.jpeg";
import { IoMdAddCircleOutline } from "react-icons/io";
import { AiOutlineBars } from "react-icons/ai";
import { LuLayoutPanelLeft } from "react-icons/lu";
import { HiOutlineDocumentChartBar } from "react-icons/hi2";
import { VscHistory } from "react-icons/vsc";
import { IoIosHelpCircleOutline } from "react-icons/io";
import profile from "../../assets/profile.png";
import { useNavigate, useParams } from "react-router-dom";
import cover_img_1 from "../../assets/cover_1.jpg";
import cover_img_2 from "../../assets/cover_img_2.jpg";
import cover_img_3 from "../../assets/cover_img_3.jpg";
import cover_img_4 from "../../assets/cover_img_4.jpg";
import cover_img_5 from "../../assets/cover_img_5.jpg";
import cost_lv2 from "../../assets/cost_lv2.svg";
import signn_lv2 from "../../assets/sign_lv2.svg";
import content_lv2 from "../../assets/content_lv2.svg";
import cover_lv2 from "../../assets/cover_lv2.svg";
import sections_lv2 from "../../assets/sections_lv2.svg";
import { FaAngleRight } from "react-icons/fa6";
import para_2 from "../../assets/para_lvl2_2.svg";
import double_2 from "../../assets/double_para_lv2.svg";
import image_2 from "../../assets/img_lvl2_2.svg";
import image_p_2 from "../../assets/img_para_lvl2_2.svg";
import double_img from "../../assets/double_img.svg";
import section_11 from "../../assets/section_11.png";
import section_12 from "../../assets/section_12.png";
import section_13 from "../../assets/section_13.png";
import section_14 from "../../assets/section_14.png";
import section_15 from "../../assets/section_15.jpg";
import s_1 from "../../assets/s_1.png";
import s_2 from "../../assets/s_2.png";
import s_3 from "../../assets/s_3.png";
import s_4 from "../../assets/s_4.png";
import s_5 from "../../assets/s_5.png";
import s_6 from "../../assets/s_6.png";
import s_7 from "../../assets/s_7.png";
import s_8 from "../../assets/s_8.png";
import s_9 from "../../assets/s_9.png";
import s_10 from "../../assets/s_10.png";
import s_11 from "../../assets/s_11.png";
import s_12 from "../../assets/s_12.png";
import cover_1_1 from "../../assets/cover_1_1.png";
import cover_1_2 from "../../assets/cover_1_2.png";
import cover_1_3 from "../../assets/cover_1_3.png";
import cover_1_4 from "../../assets/cover_1_4.png";
import cover_1_5 from "../../assets/cover_1_5.png";
import cover_1_6 from "../../assets/cover_1_6.png";
import cover_1_7 from "../../assets/cover_1_7.png";
import cover_1_8 from "../../assets/cover_1_8.png";
import cover_1_9 from "../../assets/cover_1_9.png";
import cover_1_10 from "../../assets/cover_1_10.png";
import cover_1_11 from "../../assets/cover_1_11.png";
import cover_1_12 from "../../assets/cover_1_12.png";

import cover_1_13 from "../../assets/cover_1_13.png";
import cover_1_14 from "../../assets/cover_1_14.png";
import cover_1_15 from "../../assets/cover_1_15.png";

import cover_1_16 from "../../assets/cover_1_16.png";
import cover_1_17 from "../../assets/cover_1_17.png";
import cover_1_18 from "../../assets/cover_1_18.png";
import cover_1_19 from "../../assets/cover_1_19.png";

import cover_1_20 from "../../assets/cover_1_20.png";
import cover_1_21 from "../../assets/cover_1_21.png";
import cover_1_22 from "../../assets/cover_1_22.png";

import cover_1_23 from "../../assets/cover_1_23.png";
import cover_1_24 from "../../assets/cover_1_24.png";
import cover_1_25 from "../../assets/cover_1_25.png";

import cover_1_26 from "../../assets/cover_1_26.png";
import cover_1_27 from "../../assets/cover_1_27.png";

import cover_1_28 from "../../assets/cover_1_28.png";
import cover_1_29 from "../../assets/cover_1_29.png";

import cover_1_30 from "../../assets/cover_1_30.png";
import cover_1_31 from "../../assets/cover_1_31.png";
import cover_1_32 from "../../assets/cover_1_32.png";
import cover_1_33 from "../../assets/cover_1_33.png";
import cover_1_34 from "../../assets/cover_1_34.png";
import cover_1_35 from "../../assets/cover_1_35.png";
import cover_1_36 from "../../assets/cover_1_36.png";
import cover_1_37 from "../../assets/cover_1_37.png";
import cover_1_38 from "../../assets/cover_1_38.png";
import cover_1_39 from "../../assets/cover_1_39.png";
import cover_1_40 from "../../assets/cover_1_40.png";
import { IoIosArrowDown } from "react-icons/io";
import { DatabaseContext } from "../../context/DatabaseContext";
import { FiFolder } from "react-icons/fi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { Icon } from "@iconify/react";

const Sidebar = ({
  selected,
  addInputRow,
  addHeadingRow,
  addDoublePara,
  addImageAndParagraph,
  addImageRow,
  addBreakPoint,
  addTableRow,
  addCodeBlock,
  active,
  setActive,
  rows,
  setRows,
  settings,
  setSettings,
  addCoverPage,
  preview,
  addDoubleImage,
}) => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [openCover, setOpenCover] = useState("half");
  const [designDoc, setDesignDoc] = useState("");
  const { user } = useContext(UserContext);
  const { databaseUrl } = useContext(DatabaseContext);
  const {
    workspaces,
    setWorkspaces,
    historyPreview,
    setHistoryPreview,
    count,
  } = useContext(StateManageContext);
  const [outline, setOutline] = useState(null);
  const [searchW, setSearchW] = useState("");
  const [openSections, setOpenSections] = useState("para");
  const [workspaceInclude, setWorkspaceInclude] = useState([]);
  const [version, setVersion] = useState();

  const formatDate = (dateInput) => {
    const date = new Date(dateInput);

    const options = {
      month: "short", // Aug
      day: "numeric", // 25
      hour: "numeric", // 3
      minute: "2-digit", // 45
      hour12: true, // PM
    };

    return date.toLocaleString("en-US", options);
  };
  useEffect(() => {
    getHistory();
  }, [active, count]);

  const getHistory = async () => {
    try {
      const res = await axios.get(`${databaseUrl}/api/editor/gethistory`, {
        params: { id: id },
      });
      console.log(res.data);
      setVersion(res.data);
    } catch (error) {
      console.error("Error fetching workspaces:", error);
    }
  };

  const handleFavorate = async (id, favorate) => {
    try {
      await axios.put(`${databaseUrl}/api/workspace/update`, {
        id: id,
        value: favorate,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user?.id && databaseUrl) {
      getWorkspaces();
    }
  }, [user?.id, databaseUrl]);

  const getWorkspaces = async () => {
    try {
      const res = await axios.get(`${databaseUrl}/api/workspace/getall`, {
        params: { user_id: user.id, sortw: "" },
      });
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching workspaces:", error);
      setError("Failed to fetch workspaces. Please try again later.");
    }
  };
  const section_3_row = [
    {
      id: "9e671f88-bd20-45e7-90e5-af5cea534dec",
      type: "heading",
      size: "heading-three",
      content: [
        {
          type: "heading-three",
          align: "left",
          children: [
            {
              text: "Board Meeting Notes",
              bold: true,
            },
          ],
        },
      ],
      bookmark: false,
    },
    {
      id: "f18b35c1-9d7e-4579-bdbf-6ecad4df90d7",
      type: "heading",
      size: "heading-six",
      content: [
        {
          type: "heading-five",
          align: "left",
          children: [
            {
              bold: true,
              text: "Company Name",
            },
          ],
        },
      ],
      bookmark: false,
    },
    {
      id: "901d6c68-dffd-4d9c-8cd6-9859f789171e",
      type: "table",
      design: "leftcol",
      content: [
        ["Date", "[Add Date]"],
        ["Time", "[Add Time]"],
        ["Location", "[Add Location]"],
        ["Audio / Video Replay", "[Add Link]"],
        ["Meeting Agenda", "[Add Link]"],
      ],
      boldAll: [
        [false, false],
        [false, false],
        [false, false],
        [false, false],
        [false, false],
      ],
      underlineAll: [
        [false, false],
        [false, false],
        [false, false],
        [false, false],
        [false, false],
      ],
      italicAll: [
        [false, false],
        [false, false],
        [false, false],
        [false, false],
        [false, false],
      ],
      textFormat: "left",
      bookmark: false,
    },
  ];

  const section_4_row = [
    {
      id: "c2bb1e50-20c1-41ca-abb5-2ce4dc33502b",
      type: "input",
      content: [
        {
          type: "heading-two",
          children: [
            {
              text: "Attendees",
              bold: true,
            },
          ],
        },
      ],
      bookmark: false,
    },
    {
      id: "8b780c9e-9bb0-493a-bcab-7482d41fab9c",
      type: "table",
      design: "alternativecol",
      content: [
        ["Role", "Name", "Role", "Name"],
        ["Founder & CEO", "[Add Name]", "VP of Operations", "[Add Name]"],
        ["Finance Director", "[Add Name]", "HR Director", "[Add Name]"],
        ["Product Lead", "[Add Name]", "Legal Advisor", "[Add Name]"],
        ["Marketing Head", "[Add Name]", "Head of Partnerships", "[Add Name]"],
        [
          "Technology Lead",
          "[Add Name]",
          "Sustainability Manager",
          "[Add Name]",
        ],
      ],
      boldAll: [
        [true, true, true, true],
        [false, false, false, false],
        [false, false, false, false],
        [false, false, false, false],
        [false, false, false, false],
        [false, false, false, false],
      ],
      underlineAll: [
        [false, false, false, false],
        [false, false, false, false],
        [false, false, false, false],
        [false, false, false, false],
        [false, false, false, false],
        [false, false, false, false],
      ],
      italicAll: [
        [false, false, false, false],
        [false, false, false, false],
        [false, false, false, false],
        [false, false, false, false],
        [false, false, false, false],
        [false, false, false, false],
      ],
      textFormat: "left",
      bookmark: true,
    },
  ];

  const section_5_row = [
    {
      id: "d60e5f1c-204e-4a77-8714-c834d037d2d1",
      type: "heading",
      size: "heading-three",
      content: [
        {
          type: "heading-three",
          align: "left",
          children: [
            {
              text: "Key Strategic Initiatives",
              bold: true,
            },
          ],
        },
      ],
      bookmark: false,
    },
    {
      id: "d5ba026f-6670-43a0-b267-94c8b640b381",
      type: "table",
      design: "normal",
      content: [
        ["Strategic Focus", "Status Update"],
        [
          "Entering New Regions",
          "The team recently expanded operations into two additional regions, receiving encouraging early feedback from local customers.\nHurdles: Stronger-than-expected competition has created extra demand for targeted marketing campaigns to build market share.",
        ],
        [
          "New Product Development",
          "Our innovation team is advancing a new product range, \nwith prototypes now in the final testing phase.\nHurdles: Supply chain issues for certain components have delayed the rollout timeline, requiring updates to the launch plan.",
        ],
        [
          "Efficiency & Cost Savings",
          "Multiple efficiency measures have been rolled out, resulting in significant reductions in operating costs.\nHurdles: Some staff have raised concerns about how these changes affect daily workflows, so ongoing communication and support are in place.",
        ],
      ],
      boldAll: [
        [true, true],
        [false, false],
        [false, false],
        [false, false],
      ],
      underlineAll: [
        [false, false],
        [false, false],
        [false, false],
        [false, false],
      ],
      italicAll: [
        [false, false],
        [false, false],
        [false, false],
        [false, false],
      ],
      textFormat: "left",
      bookmark: false,
    },
  ];

  const section_2_row = {
    id: "5864692a-4859-4b18-babe-7c4b866a60f1",
    type: "input",
    content: [
      {
        type: "heading-two",
        children: [
          {
            text: "Business Overview & Key Objectives",
            bold: true,
          },
        ],
      },
      {
        type: "paragrapgh",
        children: [
          {
            text: "Use this section to describe your industry and where your business fits in.",
          },
        ],
      },
      {
        type: "paragrapgh",
        children: [
          {
            text: "Include relevant market research, trends, and key stats to show the opportunity and potential growth in your space. Highlight any products, new developments, or shifts in the market that support your business plan.",
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
      {
        type: "paragrapgh",
        children: [
          {
            text: "Key Objectives",
          },
        ],
      },
      {
        type: "paragrapgh",
        children: [
          {
            text: "Break down your goals into short-term, mid-term, and long-term milestones. These might include:",
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
      {
        type: "bulleted-list",
        children: [
          {
            type: "list-item",
            children: [
              {
                text: "New product launches",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                text: "Customer growth targets",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                text: "Hiring plans",
              },
            ],
          },
          {
            type: "list-item",
            children: [
              {
                text: "Revenue projections",
              },
            ],
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
      {
        type: "paragrapgh",
        children: [
          {
            text: "Office expansion or entering new markets",
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
      {
        type: "paragrapgh",
        children: [
          {
            text: "👉 Tip: Clear goals make your plan stronger and more credible. For extra tips, check out the linked article below for practical advice and examples.",
          },
        ],
      },
    ],
    bookmark: false,
  };
  const section_1_row = {
    id: "081abde6-a028-401b-80cb-5db02c44a317",
    type: "input",
    content: [
      {
        type: "heading-two",
        children: [
          {
            text: "Executive Summary",
            bold: true,
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            text: "Your Executive Summary is the snapshot of your proposal or business plan.",
          },
        ],
      },
      {
        type: "paragraph",
        children: [
          {
            text: "Use it to clearly explain where your company is today, where you’re headed, and why you’ll succeed.",
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
            text: "Briefly describe the problem you’re solving and the need in your market. Support your points with key insights or data, and show exactly how your solution fits in and adds value.",
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
            text: "👉 Tip: Always keep your audience in mind — are you writing this for your team, a new client, or an investor? Focus on what they care about most.",
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
            text: "Use this section to grab attention, build confidence, and set the tone for everything that follows.",
          },
        ],
      },
    ],
    bookmark: false,
  };

  const section_6_row = [
    {
      id: "9dd6f157-1ab8-4c93-aa3c-486672903269",
      type: "heading",
      size: "heading-three",
      content: [
        {
          type: "heading-three",
          align: "left",
          children: [
            {
              bold: true,
              text: "Why Choose Us",
            },
          ],
        },
      ],
      bookmark: false,
    },
    {
      id: "38f7e5ae-4afd-4569-b610-2be1816bd8f9",
      type: "double-para",
      firstContent: [
        {
          type: "heading-four",
          children: [
            {
              text: "Proven Results",
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
              text: "We aim to shape a future where [industry] is smarter, more sustainable, and accessible to everyone. We believe in pushing boundaries and setting new standards for innovation. Our vision is to lead by example — inspiring progress through responsible practices, cutting-edge solutions, and a commitment to positive change for communities and the planet. By rethinking what’s possible today, we lay the foundation for a better tomorrow.",
            },
          ],
        },
      ],
      secondContent: [
        {
          type: "heading-four",
          children: [
            {
              text: "Trusted Partner",
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
              text: "Our mission is simple — to empower our clients with practical solutions that solve real problems, drive growth, and make a meaningful impact in their markets. We deliver results through collaboration, creativity, and a relentless focus on quality. Every project we take on is driven by our promise to add measurable value, build lasting partnerships, and help our clients stay ahead in a changing world. We exist to make your goals achievable and your vision a reality.",
            },
          ],
        },
      ],
      bookmark: false,
    },
    {
      id: "0da91996-daf8-4330-b53a-b788ef036d43",
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
              text: "Together, our vision and mission guide every decision we make and every project we deliver.",
              italic: true,
            },
          ],
        },
      ],
      bookmark: false,
      textColor: "text-gray-700",
    },
  ];

  const section_7_row = [
    {
      id: "89a097a7-bbe2-47c8-84f7-a8ca712eaa96",
      type: "image-para",
      content: [
        {
          type: "heading-three",
          children: [
            {
              text: "Our Leader",
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
              text: "Our president has 10 years' experience in this industry. He is dedicated to upholding our company values and delivering the greatest possible experience to our partners.",
            },
          ],
        },
      ],
      ImageLink:
        "https://res.cloudinary.com/dojwaepbj/image/upload/v1751524012/znj80secde9wcg1igvde.jpg",
      height: "",
      width: "50",
      align: "left",
      aliegn: "center",
      bookmark: true,
    },
  ];

  const section_8_row = [
    {
      id: "9547e1ed-51b8-4c41-b6f0-2516122ff976",
      type: "image-para",
      content: [
        {
          type: "heading-three",
          children: [
            {
              text: "Account Executive",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: "I am , and I will be your assigned point of contact at all times. I can be reached via phone or email at Link",
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
        "https://res.cloudinary.com/dojwaepbj/image/upload/v1751524250/ee17xmlv7thzvmgcesrz.jpg",
      height: "",
      width: "50",
      align: "right",
      aliegn: "center",
      bookmark: true,
    },
  ];

  const section_9_row = [
    {
      id: "f1bb13aa-7e22-4af7-ac4f-de119a8bee98",
      type: "image-para",
      content: [
        {
          type: "heading-four",
          children: [
            {
              text: "",
            },
          ],
        },
        {
          type: "heading-four",
          children: [
            {
              text: "",
            },
          ],
        },
        {
          type: "heading-four",
          children: [
            {
              text: "Bringing Ideas to Life",
            },
          ],
        },
        {
          type: "heading-four",
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
              text: "An image can say more than words — that’s why we pair our proposals with visuals that capture your vision, highlight your goals, and tell your story at a glance. Whether it’s a product photo, project snapshot, or team moment, we make sure every image supports what we stand for: clarity, impact, and real results.",
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
      ImageLink:
        "https://res.cloudinary.com/dojwaepbj/image/upload/v1751548925/wxgrms9rzfsmkvlnij0w.jpg",
      height: "",
      width: "100",
      align: "right",
      aliegn: "center",
      bookmark: false,
    },
  ];

  const section_10_row = [
    {
      id: "826b123b-c8c1-4347-b8cf-1c7b9ac4d205",
      type: "heading",
      size: "heading-three",
      content: [
        {
          type: "heading-three",
          align: "left",
          children: [
            {
              text: "",
              bold: true,
            },
          ],
        },
        {
          type: "heading-three",
          align: "left",
          children: [
            {
              bold: true,
              text: "",
            },
          ],
        },
        {
          type: "heading-three",
          align: "left",
          children: [
            {
              bold: true,
              text: "Costing ",
            },
          ],
        },
      ],
      bookmark: false,
    },
    {
      id: "16135c8d-4632-4246-ae8e-07821e16dd6d",
      type: "cost",
      content: [
        {
          deliverable: "Website Design",
          price: 1500,
          discount: 0,
          quantity: 1,
          paymentDuration: "Monthly",
          amount: 1500,
        },
        {
          deliverable: "Development & Integration",
          price: 2000,
          quantity: 1,
          amount: 2000,
        },
        {
          deliverable: "Monthly Hosting (12 months)",
          price: 50,
          quantity: 12,
          amount: 600,
        },
        {
          deliverable: "SEO Optimization",
          price: 300,
          quantity: 2,
          amount: 600,
        },
        {
          deliverable: "Maintenance & Support (6 mo.)",
          price: 200,
          quantity: 6,
          amount: 1200,
        },
      ],
      options: {
        discount: true,
        quantity: true,
        currency: true,
        tax: true,
      },
      bookmark: false,
      values: {
        discount: "5",
        tax: "12",
      },
    },
  ];

  const section_11_row = [
    {
      id: "759b7a24-a023-4469-a517-0cb845cd7de3",
      type: "heading",
      size: "heading-three",
      content: [
        {
          type: "heading-three",
          align: "left",
          children: [
            {
              bold: true,
              text: "",
            },
          ],
        },
        {
          type: "heading-three",
          align: "left",
          children: [
            {
              bold: true,
              text: "Price Terms 1",
            },
          ],
        },
      ],
      bookmark: false,
    },
    {
      id: "780bf7bb-f711-4cd7-9f05-2f9b28b7615b",
      type: "price",
      content: [
        {
          deliverable: "Project Planning & Research",
          percentage: 15,
          value: 1500,
        },
        {
          deliverable: "Design & Development",
          percentage: 40,
          value: 4000,
        },
        {
          deliverable: "Testing & Quality Assurance",
          percentage: 20,
          value: 2000,
        },
        {
          deliverable: "Deployment & Launch",
          percentage: 15,
          value: 1500,
        },
        {
          deliverable: "Project Management & Support",
          percentage: 10,
          value: 1000,
        },
      ],
      options: {
        percentage: true,
        value: true,
        currency: "$",
      },
      bookmark: false,
    },
  ];

  const section_12_row = [
    {
      id: "8936edc5-ba5d-4ce6-b18e-32b89b8ba6c0",
      type: "heading",
      size: "heading-three",
      content: [
        {
          type: "heading-three",
          align: "left",
          children: [
            {
              bold: true,
              text: "Price Terms 2",
            },
          ],
        },
      ],
      bookmark: false,
    },
    {
      id: "6256560e-34fe-4f57-95b8-391f8733a737",
      type: "price",
      content: [
        {
          deliverable: "Website Design",
          percentage: 50,
          value: 5000,
        },
        {
          deliverable: "SEO & Marketing",
          percentage: 30,
          value: 3000,
        },
        {
          deliverable: "Maintenance",
          percentage: 20,
          value: 2000,
        },
      ],
      options: {
        percentage: true,
        value: true,
        currency: "$",
      },
      bookmark: false,
    },
  ];

  const page_1_row = [
    {
      id: "5a5d11fd-4811-470b-91fb-8222b82734d3",
      type: "image",
      content:
        "https://res.cloudinary.com/dojwaepbj/image/upload/v1738236302/wdbs9fvjse52t5fiw7fd.jpg",
      height: "400",
      width: "100",
    },
    {
      id: "59144b23-895e-4ed9-bb47-701a9369f2cf",
      type: "heading",
      size: "heading-one",
      content: [
        {
          type: "heading-one",
          align: "center",
          children: [{ text: "HEADING", bold: true, underline: true }],
        },
      ],
    },
    {
      id: "63b74220-36a1-4670-8229-64ba7c2435a4",
      type: "double-para",
      firstContent: [
        { type: "heading-two", children: [{ text: "" }], align: "center" },
        { type: "heading-two", align: "center", children: [{ text: "" }] },
        { type: "heading-two", align: "center", children: [{ text: "" }] },
        { type: "heading-two", align: "center", children: [{ text: "" }] },
        { type: "heading-two", align: "center", children: [{ text: "" }] },
        {
          type: "heading-one",
          align: "center",
          children: [{ text: "Overview" }],
        },
        { type: "heading-two", align: "center", children: [{ text: "" }] },
        { type: "heading-two", align: "center", children: [{ text: "" }] },
        { type: "heading-two", align: "center", children: [{ text: "" }] },
        { type: "heading-two", align: "center", children: [{ text: "" }] },
        { type: "heading-two", align: "center", children: [{ text: "" }] },
        { type: "heading-two", align: "center", children: [{ text: "" }] },
      ],
      secondContent: [
        {
          type: "paragraph",
          children: [
            {
              text: "The stars don’t care about our little problems, yet we still look up and find comfort in them. Time moves strangely when you're lost in thought—minutes stretch, and hours vanish. A cup of coffee in the morning feels like a small reset button for the brain, while the sound of rain hitting the window at night becomes nature’s own lullaby. If trees could talk, they’d probably complain about humans breathing all their hard work. Somewhere in the universe, an alien might be staring at the night sky, wondering if we exist. ",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: "The internet connects billions of people, yet somehow, loneliness still lingers. Sometimes, the best ideas come when you’re not even trying to think, and a blank page can be either terrifying or exciting, depending on how you look at it. If dreams are just random brain signals, why do some feel more real than reality?",
            },
          ],
        },
      ],
    },
    {
      id: "ef8ba667-ce78-490a-b1a4-c2fcfbb39c07",
      type: "double-para",
      firstContent: [
        { type: "heading-three", children: [{ text: "" }], align: "center" },
        { type: "heading-three", align: "center", children: [{ text: "" }] },
        { type: "heading-three", align: "center", children: [{ text: "" }] },
        { type: "heading-three", align: "center", children: [{ text: "" }] },
        { type: "heading-three", align: "center", children: [{ text: "" }] },
        {
          type: "heading-one",
          align: "center",
          children: [{ text: "Terms & Conditions" }],
        },
        { type: "heading-three", align: "center", children: [{ text: "" }] },
        { type: "heading-three", align: "center", children: [{ text: "" }] },
        { type: "heading-three", align: "center", children: [{ text: "" }] },
        { type: "heading-three", align: "left", children: [{ text: "" }] },
        { type: "heading-three", align: "center", children: [{ text: "" }] },
      ],
      secondContent: [
        {
          type: "bulleted-list",
          children: [
            {
              type: "list-item",
              children: [
                {
                  text: "By using [Your Website/App Name], you agree to these terms.",
                },
              ],
            },
            {
              type: "list-item",
              children: [
                {
                  text: "If you do not agree, please do not use our services.",
                },
              ],
            },
            {
              type: "list-item",
              children: [
                {
                  text: "You must be 18 years or older (or meet the legal age in your country).",
                },
              ],
            },
            {
              type: "list-item",
              children: [
                {
                  text: "By using our services, you confirm that you meet these requirements.",
                },
              ],
            },
            {
              type: "list-item",
              children: [
                {
                  text: "You may need to create an account to access certain features.",
                },
              ],
            },
            {
              type: "list-item",
              children: [
                {
                  text: "You are responsible for keeping your login details secure.",
                },
              ],
            },
            {
              type: "list-item",
              children: [
                {
                  text: "We can suspend or terminate accounts at our discretion.",
                },
              ],
            },
            {
              type: "list-item",
              children: [
                { text: "Do not use our services for illegal activities." },
              ],
            },
            {
              type: "list-item",
              children: [
                { text: "Do not interfere with or disrupt our services." },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "b8172e74-be46-45aa-a360-8305c3e3da69",
      type: "brake",
      content: "",
    },
  ];

  const cover_1 = [
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
              text: "June 24, 2025",
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
              text: "Prepared For: John Wick",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: "Prepared By: Simple Quotes",
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
        "https://res.cloudinary.com/dojwaepbj/image/upload/v1750313419/ocwocu3grfgpfqz7gh8t.png",
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
  ];
  const cover_2 = [
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
              text: "June 24, 2025",
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
              text: "Prepared For: John Wick",
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
              text: "+1 123 456 7890",
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
              text: "123 Anywhere St., Any City",
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
        "https://res.cloudinary.com/dojwaepbj/image/upload/v1750314722/namwstjqzsxobc90jqfi.png",
      height: "",
      width: "",
      align: "left",
      aliegn: "center",
      bookmark: false,
    },
  ];
  const cover_3 = [
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
              text: "June 24, 2025",
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
              text: "Prepared For: John Wick",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: "Prepared By: Brain Quest",
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
              text: "+1 123 456 7890",
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
              text: "123 Anywhere St., Any City",
            },
          ],
        },
      ],
      ImageLink:
        "https://res.cloudinary.com/dojwaepbj/image/upload/v1750314722/namwstjqzsxobc90jqfi.png",
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
  ];

  const cover_4 = [
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
              text: "June 24, 2025",
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
              text: "Prepared For: John Wick",
            },
          ],
        },
        {
          type: "paragrapgh",
          children: [
            {
              text: "Prepared By: Brain Quest",
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
              text: "+91 0123456789",
            },
          ],
        },
        {
          type: "paragrapgh-two",
          children: [
            {
              text: "www.yourwebsite@gmail.com",
            },
          ],
        },
        {
          type: "paragrapgh-two",
          children: [
            {
              text: "yourname@gmail.com",
            },
          ],
        },
        {
          type: "paragrapgh-two",
          children: [
            {
              text: "123 xyz road street",
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
  ];
  const cover_5 = [
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
              text: "📞+91 0123456789",
            },
          ],
          align: "left",
        },
        {
          type: "paragraph",
          children: [
            {
              text: "🌐www.yourwebsite@gmail.com",
            },
          ],
          align: "left",
        },
        {
          type: "paragraph",
          children: [
            {
              text: "📨yourname@gmail.com",
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
        "https://res.cloudinary.com/dojwaepbj/image/upload/v1751873614/mpbhp70vndylnky8aji0.png",
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
  ];

  const cover_6 = [
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
              text: "24-06-2025",
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
              text: "Rimberio Co",
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
      id: "c0eaee86-4d9c-4117-8b27-8b2b783bd6c2",
      type: "line",
    },
    {
      id: "de1eb23f-36cc-4e82-b318-95532316fcf7",
      type: "line",
    },
  ];

  const cover_7 = [
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
              text: "June 13, 2025",
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
  ];

  const cover_8 = [
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
              text: "Olivia Wilson",
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
              text: "Great Client & Co.",
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
  ];
  const cover_9 = [
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
              text: "MRUNAL",
            },
          ],
        },
        {
          type: "heading-two",
          children: [
            {
              text: "2025",
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
  ];
  const cover_10 = [
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
              text: "MRUNAL",
            },
          ],
          align: "right",
        },
        {
          type: "heading-two",
          children: [
            {
              text: "2025",
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
  ];

  const cover_11 = [
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
              text: "MRUNAL",
            },
          ],
          align: "left",
        },
        {
          type: "heading-two",
          children: [
            {
              text: "2025",
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
              text: "+91 0123456789",
            },
          ],
        },
        {
          type: "paragrapgh",
          children: [
            {
              text: "www.yourwebsite@gmail.com",
            },
          ],
        },
        {
          type: "paragrapgh",
          children: [
            {
              text: "yourname@gmail.com",
            },
          ],
        },
        {
          type: "paragrapgh",
          children: [
            {
              text: "123 xyz road street",
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
        "https://res.cloudinary.com/dojwaepbj/image/upload/v1748856446/kanvds2uo6owbpw0wlec.png",
      height: "",
      width: "50",
      align: "left",
      aliegn: "center",
      bookmark: true,
      textColor: "text-gray-700",
    },
  ];

  const cover_12 = [
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
              text: "MRUNAL",
            },
          ],
          align: "right",
        },
        {
          type: "heading-two",
          children: [
            {
              text: "2025",
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
  ];
  const cover_13 = [
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
              text: "www.yourwebsite@gmail.com",
            },
          ],
        },
        {
          type: "heading-six",
          children: [
            {
              text: "123 xyz road street",
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
  ];
  const cover_14 = [
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
              text: "24-06-2025",
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
  ];

  const cover_15 = [
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
              text: "MRUNAL",
            },
          ],
        },
        {
          type: "heading-two",
          children: [
            {
              text: "2025",
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
              text: "+91 0123456789",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: "www.yourwebsite@gmail.com",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: "yourname@gmail.com",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: "123 xyz road street",
            },
          ],
        },
      ],
      ImageLink:
        "https://res.cloudinary.com/dojwaepbj/image/upload/v1748856446/kanvds2uo6owbpw0wlec.png",
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
  ];

  const cover_16 = [
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
              text: "+91 0123456789",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: "www.yourwebsite@gmail.com",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: "yourname@gmail.com",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: "123 xyz road street",
            },
          ],
        },
      ],
      ImageLink:
        "https://res.cloudinary.com/dojwaepbj/image/upload/v1748856446/kanvds2uo6owbpw0wlec.png",
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
              text: "MRUNAL",
            },
          ],
        },
        {
          type: "heading-two",
          children: [
            {
              text: "2025",
              bold: true,
            },
          ],
        },
      ],
      bookmark: true,
      textColor: "text-black",
    },
  ];
  const cover_17 = [
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
              text: "MRUNAL",
            },
          ],
        },
        {
          type: "heading-two",
          children: [
            {
              text: "2025",
              bold: true,
            },
          ],
        },
      ],
      ImageLink:
        "https://res.cloudinary.com/dojwaepbj/image/upload/v1751881348/un1rw5v1fhsrz0itdpl5.png",
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
              text: "+91 0123456789",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: "www.yourwebsite@gmail.com",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: "yourname@gmail.com",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: "123 xyz road street",
            },
          ],
        },
      ],
      ImageLink:
        "https://res.cloudinary.com/dojwaepbj/image/upload/v1748856446/kanvds2uo6owbpw0wlec.png",
      height: "",
      width: "50",
      align: "left",
      aliegn: "center",
      bookmark: true,
      textColor: "text-black",
    },
    {
      id: "1fabca18-03f0-492e-862e-122a12312025",
      type: "line",
    },
  ];
  const cover_18 = [
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
        "https://res.cloudinary.com/dojwaepbj/image/upload/v1751881662/weiqcvsnmq4dccpsv3vp.png",
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
              text: "+91 0123456789",
            },
          ],
          align: "right",
        },
        {
          type: "paragraph",
          children: [
            {
              text: "www.yourwebsite@gmail.com",
            },
          ],
          align: "right",
        },
        {
          type: "paragraph",
          children: [
            {
              text: "yourname@gmail.com",
            },
          ],
          align: "right",
        },
        {
          type: "paragraph",
          children: [
            {
              text: "123 xyz road street",
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
  ];
  const cover_19 = [
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
        "https://res.cloudinary.com/dojwaepbj/image/upload/v1751881662/weiqcvsnmq4dccpsv3vp.png",
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
              text: "+91 0123456789",
            },
          ],
          align: "center",
        },
        {
          type: "paragraph",
          children: [
            {
              text: "www.yourwebsite@gmail.com",
            },
          ],
          align: "center",
        },
        {
          type: "paragraph",
          children: [
            {
              text: "yourname@gmail.com",
            },
          ],
          align: "center",
        },
        {
          type: "paragraph",
          children: [
            {
              text: "123 xyz road street",
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
  ];

  const cover_20 = [
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
        "https://res.cloudinary.com/dojwaepbj/image/upload/v1751882746/o719phze17j7nvlhtkdq.png",
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
              text: "MRUNAL",
            },
          ],
          align: "right",
        },
        {
          type: "heading-two",
          children: [
            {
              text: "2025",
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
  ];

  const cover_21 = [
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
              text: "June 24, 2025",
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
              text: "Prepared For: John Wick",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: "Prepared By: Simple Quotes",
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
        "https://res.cloudinary.com/dojwaepbj/image/upload/v1750313419/ocwocu3grfgpfqz7gh8t.png",
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
  ];

  const cover_22 = [
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
              text: "June 24, 2025",
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
              text: "Prepared For: John Wick",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: "Prepared By: Simple Quotes",
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
              text: "+1 123 456 7890",
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
              text: "123 Anywhere St., Any City",
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
        "https://res.cloudinary.com/dojwaepbj/image/upload/v1750314722/namwstjqzsxobc90jqfi.png",
      height: "",
      width: "",
      align: "left",
      aliegn: "center",
      bookmark: false,
    },
  ];

  const cover_23 = [
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
              text: "June 24, 2025",
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
              text: "Prepared For: John Wick",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: "Prepared By: Brain Quest",
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
              text: "+1 123 456 7890",
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
              text: "123 Anywhere St., Any City",
            },
          ],
        },
      ],
      ImageLink:
        "https://res.cloudinary.com/dojwaepbj/image/upload/v1750314722/namwstjqzsxobc90jqfi.png",
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
  ];

  const cover_24 = [
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
              text: "June 24, 2025",
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
              text: "Prepared For: John Wick",
            },
          ],
        },
        {
          type: "paragrapgh",
          children: [
            {
              text: "Prepared By: Brain Quest",
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
              text: "+91 0123456789",
            },
          ],
        },
        {
          type: "paragrapgh-two",
          children: [
            {
              text: "www.yourwebsite@gmail.com",
            },
          ],
        },
        {
          type: "paragrapgh-two",
          children: [
            {
              text: "yourname@gmail.com",
            },
          ],
        },
        {
          type: "paragrapgh-two",
          children: [
            {
              text: "123 xyz road street",
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
  ];

  const cover_25 = [
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
              text: "📞+91 0123456789",
            },
          ],
          align: "left",
        },
        {
          type: "paragraph",
          children: [
            {
              text: "🌐www.yourwebsite@gmail.com",
            },
          ],
          align: "left",
        },
        {
          type: "paragraph",
          children: [
            {
              text: "📨yourname@gmail.com",
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
        "https://res.cloudinary.com/dojwaepbj/image/upload/v1751873614/mpbhp70vndylnky8aji0.png",
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
  ];
  const cover_26 = [
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
              text: "June 24, 2025",
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
              text: "Rimberio Co",
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
  ];

  const cover_27 = [
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
              text: "June 13, 2025",
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
  ];

  const cover_28 = [
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
  ];

  const cover_29 = [
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
              text: "MRUNAL",
            },
          ],
        },
        {
          type: "heading-two",
          children: [
            {
              text: "2025",
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
  ];

  const cover_30 = [
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
              text: "MRUNAL",
            },
          ],
          align: "right",
        },
        {
          type: "heading-two",
          children: [
            {
              text: "2025",
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
  ];

  const cover_31 = [
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
              text: "MRUNAL",
            },
          ],
          align: "right",
        },
        {
          type: "heading-two",
          children: [
            {
              text: "2025",
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
              text: "+91 0123456789",
            },
          ],
        },
        {
          type: "paragrapgh",
          children: [
            {
              text: "www.yourwebsite@gmail.com",
            },
          ],
        },
        {
          type: "paragrapgh",
          children: [
            {
              text: "yourname@gmail.com",
            },
          ],
        },
        {
          type: "paragrapgh",
          children: [
            {
              text: "123 xyz road street",
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
        "https://res.cloudinary.com/dojwaepbj/image/upload/v1748856446/kanvds2uo6owbpw0wlec.png",
      height: "",
      width: "50",
      align: "left",
      aliegn: "center",
      bookmark: true,
      textColor: "text-gray-700",
    },
  ];

  const cover_32 = [
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
              text: "MRUNAL",
            },
          ],
          align: "right",
        },
        {
          type: "heading-two",
          children: [
            {
              text: "2025",
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
  ];
  const cover_33 = [
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
              text: "www.yourwebsite@gmail.com",
            },
          ],
        },
        {
          type: "heading-six",
          children: [
            {
              text: "123 xyz road street",
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
  ];
  const cover_34 = [
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
              text: "24-06-2025",
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
  ];

  const cover_35 = [
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
              text: "MRUNAL",
            },
          ],
        },
        {
          type: "heading-two",
          children: [
            {
              text: "2025",
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
              text: "+91 0123456789",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: "www.yourwebsite@gmail.com",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: "yourname@gmail.com",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: "123 xyz road street",
            },
          ],
        },
      ],
      ImageLink:
        "https://res.cloudinary.com/dojwaepbj/image/upload/v1748856446/kanvds2uo6owbpw0wlec.png",
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
  ];

  const cover_36 = [
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
              text: "+91 0123456789",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: "www.yourwebsite@gmail.com",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: "yourname@gmail.com",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: "123 xyz road street",
            },
          ],
        },
      ],
      ImageLink:
        "https://res.cloudinary.com/dojwaepbj/image/upload/v1748856446/kanvds2uo6owbpw0wlec.png",
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
              text: "MRUNAL",
            },
          ],
        },
        {
          type: "heading-two",
          children: [
            {
              text: "2025",
              bold: true,
            },
          ],
        },
      ],
      bookmark: true,
      textColor: "text-black",
    },
  ];

  const cover_37 = [
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
              text: "MRUNAL",
            },
          ],
        },
        {
          type: "heading-two",
          children: [
            {
              text: "2025",
              bold: true,
            },
          ],
        },
      ],
      ImageLink:
        "https://res.cloudinary.com/dojwaepbj/image/upload/v1751881348/un1rw5v1fhsrz0itdpl5.png",
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
              text: "+91 0123456789",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: "www.yourwebsite@gmail.com",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: "yourname@gmail.com",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: "123 xyz road street",
            },
          ],
        },
      ],
      ImageLink:
        "https://res.cloudinary.com/dojwaepbj/image/upload/v1748856446/kanvds2uo6owbpw0wlec.png",
      height: "",
      width: "50",
      align: "left",
      aliegn: "center",
      bookmark: true,
      textColor: "text-black",
    },
    {
      id: "1fabca18-03f0-492e-862e-122a12312025as",
      type: "line",
    },
  ];

  const cover_38 = [
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
        "https://res.cloudinary.com/dojwaepbj/image/upload/v1751881662/weiqcvsnmq4dccpsv3vp.png",
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
              text: "+91 0123456789",
            },
          ],
          align: "right",
        },
        {
          type: "paragraph",
          children: [
            {
              text: "www.yourwebsite@gmail.com",
            },
          ],
          align: "right",
        },
        {
          type: "paragraph",
          children: [
            {
              text: "yourname@gmail.com",
            },
          ],
          align: "right",
        },
        {
          type: "paragraph",
          children: [
            {
              text: "123 xyz road street",
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
  ];

  const cover_39 = [
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
        "https://res.cloudinary.com/dojwaepbj/image/upload/v1751881662/weiqcvsnmq4dccpsv3vp.png",
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
              text: "+91 0123456789",
            },
          ],
        },
        {
          type: "paragraph",
          children: [
            {
              text: "www.yourwebsite@gmail.com",
            },
          ],
          align: "center",
        },
        {
          type: "paragraph",
          children: [
            {
              text: "yourname@gmail.com",
            },
          ],
          align: "center",
        },
        {
          type: "paragraph",
          children: [
            {
              text: "123 xyz road street",
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
  ];

  const cover_40 = [
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
        "https://res.cloudinary.com/dojwaepbj/image/upload/v1751882746/o719phze17j7nvlhtkdq.png",
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
              text: "MRUNAL",
            },
          ],
          align: "right",
        },
        {
          type: "heading-two",
          children: [
            {
              text: "2025",
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
  ];

  const [thirdLevel, setThirdLevel] = useState("");
  const headingRef = useRef(null);
  const [showPicker, setShowPicker] = useState(false);
  const [tool, setTool] = useState(null);
  const handleClickOutsideHeading = (event) => {
    if (headingRef.current && !headingRef.current.contains(event.target)) {
      setThirdLevel("");
    }
  };

  const {
    setSign,
    setPriceTerms,
    setCostModeule,
    scrollIndex,
    setScrollIndex,
  } = useContext(StateManageContext);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideHeading);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideHeading);
    };
  }, []);

  const colorRef = useRef();
  const colorButtonRef = useRef();

  const handleClickOutsideColor = (event) => {
    if (
      colorRef.current &&
      !colorRef.current.contains(event.target) &&
      colorButtonRef.current &&
      !colorButtonRef.current.contains(event.target)
    ) {
      setShowPicker(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideColor);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideColor);
    };
  }, []);
  const navigate = useNavigate();
  const renderHeadingLinks = (items, index, prefix = "") => {
    if (!Array.isArray(items)) return [];

    return items.flatMap((item, idx) => {
      if (typeof item !== "object" || item === null) return [];

      const isHeading =
        item.type === "heading-one" ||
        item.type === "heading-two" ||
        item.type === "heading-three";

      if (!isHeading || !Array.isArray(item.children)) return [];

      // Combine all child texts into a single string
      const combinedText = item.children
        .filter((child) => typeof child?.text === "string")
        .map((child) => child.text)
        .join(" ");

      if (!combinedText) return null;

      return (
        <div
          key={`${index}-${prefix}-${idx}`}
          className={`w-full text-ellipsis flex items-center justify-start px-1 pl-3 py-1.5 text-sm border-l ${
            outline === index ? "border-primary" : "border-border_clr"
          } hover:border-primary active:border-gradient_darker`}
        >
          <p
            onClick={() => {
              setScrollIndex(index);
              setOutline(index);
            }}
            className={`w-[98%] overflow-hidden text-ellipsis cursor-pointer ${
              outline === index ? "text-primary" : "text-non_active_text"
            } hover:text-primary active:text-gradient_darker whitespace-nowrap`}
          >
            {combinedText}
          </p>
        </div>
      );
    });
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      alert("Please select an image first!");
      return;
    }

    // Cloudinary details
    setLoading(true);
    const cloudName = "dojwaepbj"; // Replace with your Cloudinary cloud name
    const uploadPreset = "simple_quotes"; // Replace with your upload preset

    // Create FormData object
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      // Upload image to Cloudinary
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const photo = await response.json();
      // console.log(photo.secure_url);
      // console.log("Uploaded Image URL:", photo.secure_url);
      if (rows[0]?.type === "cover") {
        rows[0].content = photo.secure_url;
        console.log(photo.secure_url);
      } else {
        addCoverPage(photo.secure_url);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
      setThirdLevel("");
    }
  };

  const insertCoverPage = (value) => {
    setRows((prevRows) => {
      let updatedRows;

      if (prevRows.length === 0) {
        updatedRows = [...value];
      } else if (prevRows[0].type === "cover") {
        const digit = prevRows[0].template;

        // Ensure digit is a number and valid
        const removeCount = typeof digit === "number" && digit > 0 ? digit : 1;

        // Remove the first `digit` rows and prepend the new value
        const remainingRows = prevRows.slice(removeCount);
        updatedRows = [...value, ...remainingRows];
      } else {
        // If first row is not a cover, just prepend
        updatedRows = [...value, ...prevRows];
      }

      return updatedRows;
    });

    setThirdLevel("");
  };

  useEffect(() => {});
  return (
    <div className="flex flex-row">
      {preview === true ? (
        <div></div>
      ) : (
        <div className="flex flex-row be-vietnam-pro-regular">
          {" "}
          <div
            style={{ height: "calc(100vh - 65px)" }}
            className="w-20 relative flex flex-col border-r-[1px] gap-2 border-gray-100 shadow-md shadow-gray-300 pt-2 "
          >
            {tool === "Add Elements" && (
              <div className=" absolute left-[80%] w-24 top-5 px-1 text-center bg-gray-500 text-white z-[1000]  text-xs rounded-sm  ">
                {tool}
              </div>
            )}
            {tool === "View outline" && (
              <div className=" absolute left-[80%] w-24 top-[85px] px-1 text-center bg-gray-500 text-white z-[1000] text-xs rounded-sm  ">
                {tool}
              </div>
            )}
            {tool === "Design Document" && (
              <div className=" absolute left-[80%] w-28 top-[145px] px-1 text-center bg-gray-500 text-white z-[1000] text-xs rounded-sm  ">
                {tool}
              </div>
            )}

            {tool === "Track progress" && (
              <div className=" absolute left-[80%] w-24 top-[210px] px-1 text-center bg-gray-500 text-white z-[1000] text-xs rounded-sm  ">
                {tool}
              </div>
            )}
            {tool === "Version history" && (
              <div className=" absolute left-[80%] w-24 top-[210px] px-1 text-center bg-gray-500 text-white z-[1000] text-xs rounded-sm  ">
                {tool}
              </div>
            )}
            {tool === "View all workspace" && (
              <div className=" absolute left-[80%] w-32 top-[275px] px-1 text-center bg-gray-500 text-white z-[1000]   text-xs rounded-sm  ">
                {tool}
              </div>
            )}
            <div
              onClick={() => setActive("elements")}
              className="flex p-1 flex-col w-full h-14 text-[12px] text-gray-500 cursor-pointer items-center justify-center "
              onMouseEnter={() => setTool("Add Elements")}
              onMouseLeave={() => setTool(null)}
            >
              <div
                className={`p-1 rounded-md border hover:border-gray-200 ${
                  ["elements", "content-3", "table-3", "goal-3"].includes(
                    active
                  )
                    ? "border-gray-300 shadow-sm shadow-gray-200"
                    : "border-white"
                }`}
              >
                <IoMdAddCircleOutline
                  className={`w-5 h-5 ${
                    ["elements", "content-3", "table-3", "goal-3"].includes(
                      active
                    )
                      ? "text-[#df064e]"
                      : "text-gray-400"
                  } hover:text-gray-700`}
                />
              </div>

              <p className="text-gray-400">Elements</p>
            </div>

            <div
              onClick={() => setActive("outline")}
              className="flex p-1 flex-col w-full h-14 text-[12px] text-gray-500 cursor-pointer items-center justify-center"
              onMouseEnter={() => setTool("View outline")}
              onMouseLeave={() => setTool(null)}
            >
              <div
                className={`p-1 rounded-md border hover:border-gray-200 ${
                  active === "outline"
                    ? "border-gray-300 shadow-sm shadow-gray-200"
                    : "border-white"
                }`}
              >
                <AiOutlineBars
                  className={`w-5 h-5 ${
                    active === "outline" ? "text-[#df064e]" : "text-gray-400"
                  } hover:text-gray-700`}
                />
              </div>

              <p className="text-gray-400">Outline</p>
            </div>

            <div
              onClick={() => setActive("layout")}
              className="flex p-1 flex-col w-full h-14 text-[12px] text-gray-500 cursor-pointer items-center justify-center"
              onMouseEnter={() => setTool("Design Document")}
              onMouseLeave={() => setTool(null)}
            >
              <div
                className={`p-1 rounded-md border hover:border-gray-200 ${
                  active === "layout"
                    ? "border-gray-300 shadow-sm shadow-gray-200"
                    : "border-white"
                }`}
              >
                <LuLayoutPanelLeft
                  className={`w-5 h-5 ${
                    active === "layout" ? "text-[#df064e]" : "text-gray-400"
                  } hover:text-gray-700`}
                />
              </div>

              <p className="text-gray-400 ">Design Doc</p>
            </div>

            {/* <div
              onClick={() => setActive("tracking")}
              className="flex p-1 flex-col w-full h-14 text-[12px] text-gray-500 cursor-pointer items-center justify-center"
              onMouseEnter={() => setTool("Track progress")}
              onMouseLeave={() => setTool(null)}
            >
              <div
                className={`p-1 rounded-md border hover:border-gray-200 ${
                  active === "tracking"
                    ? "border-gray-300 shadow-sm shadow-gray-200"
                    : "border-white"
                }`}
              >
                <HiOutlineDocumentChartBar
                  className={`w-5 h-5 ${
                    active === "tracking" ? "text-[#df064e]" : "text-gray-400"
                  } hover:text-gray-700`}
                />
              </div>

              <p className="text-gray-400">Doc Track</p>
            </div> */}

            <div
              onClick={() => setActive("history")}
              className="flex p-1 flex-col w-full h-14 text-[12px] text-gray-500 cursor-pointer items-center justify-center"
              onMouseEnter={() => setTool("Version history")}
              onMouseLeave={() => setTool(null)}
            >
              <div
                className={`p-1 rounded-md border hover:border-gray-200 ${
                  active === "history"
                    ? "border-gray-300 shadow-sm shadow-gray-200"
                    : "border-white"
                }`}
              >
                <VscHistory
                  className={`w-5 h-5 ${
                    active === "history" ? "text-[#df064e]" : "text-gray-400"
                  } hover:text-gray-700`}
                />
              </div>

              <p className="text-gray-400">History</p>
            </div>

            <div
              onClick={() => setActive("workspace")}
              className="flex p-1 flex-col w-full h-14 text-[12px] text-gray-500 cursor-pointer items-center justify-center"
              onMouseEnter={() => setTool("View all workspace")}
              onMouseLeave={() => setTool(null)}
            >
              <div
                className={`p-1 rounded-md border hover:border-gray-200 ${
                  active === "workspace"
                    ? "border-gray-300 shadow-sm shadow-gray-200"
                    : "border-white"
                }`}
              >
                <FiFolder
                  className={`w-5 h-5 ${
                    active === "workspace" ? "text-[#df064e]" : "text-gray-400"
                  } hover:text-gray-700`}
                />
              </div>

              <p className="text-gray-400">Workspace</p>
            </div>

            <div className="w-full h-40 absolute bottom-10 pb-0 left-0 flex flex-col items-center justify-end">
              <div className="flex p-1  flex-col w-full h-14 text-[12px] text-gray-500 cursor-pointer items-center justify-center  ">
                <div className="p-1 rounded-md ">
                  <IoIosHelpCircleOutline className="w-5 h-5" />
                </div>

                <p>Help</p>
              </div>
              <div className="flex p-1  flex-col w-full h-14 text-[12px] text-gray-500 cursor-pointer items-center justify-center  ">
                <div
                  className="p-1 rounded-md  "
                  onClick={() => {
                    navigate("/profile");
                  }}
                >
                  <img
                    src={user.avatar ? user.avatar : profile}
                    className="w-6 h-6 z-50 rounded-[50%]"
                  />
                </div>
              </div>
            </div>
          </div>
          {active === "elements" ? (
            <div
              className="w-[220px] overflow-x-hidden  pr-4  overflow-auto pb-[16px] scrollbar-hide text-lvl_2_txt z-50  "
              style={{
                boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.2)",
                height: "calc(100vh - 65px)",
              }}
            >
              <button
                className=" p-2 w-full   mx-3  flex  items-center justify-between
           gap-2 "
              >
                <p className="text-sm text-lvl_2_hed font-semibold">Basics</p>
              </button>

              <div className="w-[220px]">
                <ContentSideBar
                  addHeadingRow={addHeadingRow}
                  addImageRow={addImageRow}
                  addInputRow={addInputRow}
                  addDoublePara={addDoublePara}
                  addImageAndParagraph={addImageAndParagraph}
                  selected={selected}
                  addBreakPoint={addBreakPoint}
                  addTableRow={addTableRow}
                  addCodeBlock={addCodeBlock}
                  setSign={setSign}
                  setThirdLevel={setThirdLevel}
                  thirdLevel={thirdLevel}
                />
              </div>
              <div className="w-full h-[1px] ml-2  bg-gray-300 mt-3"></div>
              <div className="w-[220px]">
                <button
                  className=" p-2 w-full   mx-3 my-1 flex  items-center justify-between
           gap-2 "
                >
                  <p className="text-sm text-lvl_2_hed font-semibold">Assets</p>
                </button>
                <div className="pr-2 w-[220px]">
                  <button
                    onClick={() => setThirdLevel("cover")}
                    className={` relative p-2 px-3 w-[95%] rounded-lg flex mx-3 hover:text-active_text  items-center  
                      gap-4 hover:bg-gray-100 active:bg-highlight ${
                        thirdLevel === "cover" && "bg-gray-100 text-active_text"
                      }`}
                  >
                    <img
                      src={cover_lv2}
                      className="w-8 h-8 rounded-md p-[4px] border border-gray-100 shadow-md shadow-gray-300"
                      alt="heading"
                    />
                    <p className="text-sm">Cover Page</p>
                    <FaAngleRight className="flex absolute right-4 text-xs  " />
                  </button>
                  <button
                    onClick={() => setThirdLevel("sections")}
                    className={` relative p-2 px-3 w-[95%] rounded-lg flex mx-3 hover:text-active_text  items-center  
                      gap-4 hover:bg-gray-100 active:bg-highlight ${
                        thirdLevel === "sections" &&
                        "bg-gray-100 text-active_text"
                      }`}
                  >
                    <img
                      src={sections_lv2}
                      className="w-8 h-8  rounded-md p-[4px] border border-gray-100 shadow-md shadow-gray-300"
                      alt="heading"
                    />
                    <p className="text-sm">Sections</p>
                    <FaAngleRight className="flex absolute right-4 text-xs  " />
                  </button>
                  <button
                    onClick={() => setThirdLevel("saved")}
                    className={` relative p-2 px-3 w-[95%] rounded-lg hover:text-active_text flex mx-3  items-center  
                      gap-4 hover:bg-gray-100 active:bg-highlight ${
                        thirdLevel === "saved" && "bg-gray-100 text-active_text"
                      }`}
                  >
                    <img
                      src={content_lv2}
                      className="w-8 h-8 rounded-md p-[4px] border border-gray-100 shadow-md shadow-gray-300"
                      alt="heading"
                    />
                    <p className="text-sm">My Content</p>
                    <FaAngleRight className="flex absolute right-4 text-xs  " />
                  </button>
                </div>
              </div>
              <div className="w-full h-[1px] ml-2  bg-gray-300 mt-3"></div>
              <div className="w-[220px]">
                <button
                  className=" p-2 w-full   mx-3 my-1 flex  items-center justify-between
           gap-2 "
                >
                  <p className="text-sm text-lvl_2_hed font-semibold">
                    Cost Module
                  </p>
                </button>
                <div className="pr-2 w-[220px]">
                  <button
                    onClick={() => setCostModeule(true)}
                    className=" relative p-2 px-3 w-[95%] rounded-lg flex hover:text-active_text  mx-3 items-center  
           gap-4 hover:bg-gray-100 "
                  >
                    <img
                      src={cost_lv2}
                      className="w-8 h-8 rounded-md p-[4px] border border-gray-100 shadow-md shadow-gray-300"
                      alt="heading"
                    />
                    <p className="text-sm">Costing</p>
                    <FiPlus className="flex absolute right-4 " />
                  </button>
                  <button
                    onClick={() => setPriceTerms(true)}
                    className=" relative p-2 px-3 w-[95%] hover:text-active_text rounded-lg flex  mx-3  items-center  
           gap-4 hover:bg-gray-100 "
                  >
                    <img
                      src={cost_lv2}
                      className="w-8 h-8 rounded-md p-[4px] border border-gray-100 shadow-md shadow-gray-300"
                      alt="heading"
                    />
                    <p className="text-sm">Price Terms</p>
                    <FiPlus className="flex absolute right-4 " />
                  </button>
                </div>
              </div>
              <div className="w-full h-[1px] ml-2  bg-gray-300 mt-3"></div>
              <div className="w-[220px]">
                <button
                  className=" p-2 w-full   mx-3 my-1 flex  items-center justify-between
           gap-2 "
                >
                  <p className="text-sm text-lvl_2_hed font-semibold">Legal</p>
                </button>
                <div className="pr-4 w-[220px]">
                  <button
                    onClick={() => setSign(true)}
                    className=" relative p-2 px-3 w-[95%] hover:text-active_text rounded-lg flex  mx-3  items-center  
           gap-4 hover:bg-gray-100 "
                  >
                    <img
                      src={signn_lv2}
                      className="w-8 h-8 rounded-md p-[4px] border border-gray-100 shadow-md shadow-gray-300"
                      alt="heading"
                    />
                    <p className="text-sm">Signiture</p>
                    <FiPlus className="flex absolute right-4 " />
                  </button>
                </div>
              </div>

              {/* <button
            onClick={() => setCostModeule(true)}
            className="h-20 w-[75%] m-3 flex flex-col items-center justify-center 
            bg-gradient-to-b from-editor_button_top to-editor_button_bot border-[1px] 
            border-sidebar_border gap-2 shadow-lg"
            style={{
              boxShadow: "1px 2px 4px gray",
            }}
          >
            <img src={currency} className="w-6" alt="heading" />
            <p className="text-xs ">Cost Module</p>
          </button>
          <button
            onClick={() => setActive("goal-3")}
            className="h-20 w-[75%] m-3 flex flex-col items-center justify-center 
            bg-gradient-to-b from-editor_button_top to-editor_button_bot border-[1px] 
            border-sidebar_border  shadow-lg"
            style={{
              boxShadow: "1px 2px 4px gray",
            }}
          >
            <img src={goal} className="w-10" alt="heading" />
            <p className="text-xs ">Goal Module</p>
          </button> */}
            </div>
          ) : active === "outline" ? (
            <div
              className="w-[220px] overflow-x-hidden  pr-2  overflow-auto pb-[16px] scrollbar-hide text-lvl_2_txt z-50  "
              style={{
                boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.2)",
                height: "calc(100vh - 65px)",
              }}
            >
              <p className="text-sm text-lvl_2_hed font-semibold mx-3 p-2 ">
                Content Outline
              </p>
              <div className="w-full  pl-4 scrollbar-thin flex flex-col overflow-y-auto gap-0  ">
                {rows?.map((row, index) => {
                  if (row.type === "heading") {
                    return renderHeadingLinks(row.content, index);
                  } else if (row.type === "input") {
                    return renderHeadingLinks(row.content, index);
                  } else if (row.type === "double-para") {
                    return [
                      ...renderHeadingLinks(row.firstContent, index, "first"),
                      ...renderHeadingLinks(row.secondContent, index, "second"),
                    ];
                  } else if (row.type === "image-para") {
                    return renderHeadingLinks(row.content, index);
                  }

                  return null;
                })}
              </div>
            </div>
          ) : active === "layout" ? (
            <div className="flex flex-row">
              <div
                style={{
                  boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.2)",
                  height: "calc(100vh - 65px)",
                }}
                className=" w-[220px] px-2.5  border-r-2 border-gray-200  pb-[16px]  flex flex-col overflow-y-auto overflow-x-hidden  "
              >
                <h3
                  onClick={() => {
                    if (designDoc === "color") {
                      setDesignDoc("");
                    } else {
                      setDesignDoc("color");
                    }
                  }}
                  className="text-sm text-lvl_2_hed pt-2 pb-3 pl-2 font-semibold "
                >
                  Design Style
                </h3>
                {/* <p className="text-[10px] mt-1 text-non_active_text w-[95%]">
                  Set your colors, fonts, and theme to match your brand
                </p> */}

                <h3
                  onClick={() => {
                    if (designDoc === "color") {
                      setDesignDoc("");
                    } else {
                      setDesignDoc("color");
                    }
                  }}
                  className={`text-sm  py-2 cursor-pointer -mx-3 h-[48px] flex items-center justify-between border-b border-border_clr hover:text-active_text px-4 hover:bg-highlight ${
                    designDoc === "color"
                      ? "bg-highlight text-active_text"
                      : "bg-white text-lvl_2_hed"
                  } `}
                >
                  <div className="flex items-center justify-start gap-3">
                    <div className="h-[32px] flex items-center justify-center  w-[32px] shadow-md shadow-gray-300 rounded-md">
                      <Icon icon="bxs:color" height={21} />
                    </div>
                    Color
                  </div>

                  <FaAngleRight
                    className={`${
                      designDoc === "color" ? "rotate-90" : "rotate-0"
                    }`}
                  />
                </h3>
                {designDoc === "color" && (
                  <div className="w-full transition-all duration-500 ease-out opacity-0 animate-fadeIn mb-7 mt-3 ">
                    {/* <h3 className="text-xs mt-1 text-active_text ">
                      Primary Color
                    </h3> */}
                    {/* <div
                      ref={colorButtonRef}
                      className="py-1.5 w-full mt-2 flex   items-center justify-between border border-border_clr rounded-[2px]"
                      onClick={() => setShowPicker(true)}
                    >
                      <p className="  text-non_active_text text-xs">
                        <span className="flex gap-1 px-2 items-center">
                          <div
                            className="w-3 h-3"
                            style={{ backgroundColor: settings.color }}
                          ></div>
                          {settings.color}
                        </span>
                      </p>
                    </div> */}
                    <div className="w-full flex items-center justify-center mt-3">
                      <SketchPicker
                        color={settings.color}
                        onChange={(updatedColor) => {
                          const temp = { ...settings };
                          temp.color = updatedColor.hex;
                          setSettings(temp);
                        }}
                        width="180px"
                      />
                    </div>
                  </div>
                )}

                {/* <div className="w-full h-1 bg-gray-300"></div> */}
                <h3
                  onClick={() => {
                    if (designDoc === "typo") {
                      setDesignDoc("");
                    } else {
                      setDesignDoc("typo");
                    }
                  }}
                  className={`text-sm  py-2 cursor-pointer -mx-3 h-[48px] flex items-center justify-between px-4 hover:bg-highlight hover:text-active_text border-b border-border_clr ${
                    designDoc === "typo"
                      ? "bg-highlight text-active_text"
                      : "bg-white text-lvl_2_hed"
                  } `}
                >
                  <div className="flex items-center justify-start gap-3">
                    <div className="h-[32px] flex items-center justify-center  w-[32px] shadow-md shadow-gray-300 rounded-md">
                      <Icon icon="tabler:typography" height={20} />
                    </div>
                    Font
                  </div>
                  <FaAngleRight
                    className={`${
                      designDoc === "typo" ? "rotate-90" : "rotate-0"
                    }`}
                  />
                </h3>
                {designDoc === "typo" && (
                  <div className="transition-all duration-500 ease-out opacity-0 animate-fadeIn mb-2 ">
                    <div className="mt-1 ">
                      <label className="text-xs text-active_text mb-2 ">
                        Heading Font
                      </label>
                      <div className="relative w-full mt-1">
                        <select
                          value={settings.heading}
                          onChange={(e) => {
                            const temp = { ...settings };
                            temp.heading = e.target.value;
                            setSettings(temp);
                          }}
                          className="w-full py-1.5 px-2 pr-8 outline-none border border-border_clr rounded-[2px] text-non_active_text text-xs appearance-none hover:border-active_text focus:border-active_text cursor-pointer"
                        >
                          <option value="arial">Arial</option>
                          <option value="helvetica">Helvetica</option>
                          <option value="poppins">Poppins</option>
                          <option value="montserrat">Montserrat</option>
                          <option value="roboto">Roboto</option>
                          <option value="times-new-roman">
                            Times New Roman
                          </option>
                          <option value="georgia">Georgia</option>
                          <option value="playfair-display">
                            Playfair Display
                          </option>
                          <option value="merriweather">Merriweather</option>
                          <option value="garamond">Garamond</option>
                          <option value="lobster">Lobster</option>
                          <option value="pacifico">Pacifico</option>
                          <option value="bebas-neue">Bebas Neue</option>
                          <option value="anton">Anton</option>
                          <option value="oswald">Oswald</option>
                        </select>
                        <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-non_active_text text-xs">
                          <IoIosArrowDown className="text-non_active_text" />
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 gap-1">
                      <label className="text-xs text-active_text mb-2">
                        Body Font
                      </label>
                      <div className="relative w-full mt-1">
                        <select
                          value={settings.body}
                          onChange={(e) => {
                            const temp = { ...settings };
                            temp.body = e.target.value;
                            setSettings(temp);
                          }}
                          className="w-full py-1.5 px-2 pr-8 outline-none border border-border_clr rounded-[2px] text-non_active_text text-xs appearance-none hover:border-active_text focus:border-active_text cursor-pointer
                     "
                        >
                          <option value="arial">Arial</option>
                          <option value="helvetica">Helvetica</option>
                          <option value="poppins">Poppins</option>
                          <option value="montserrat">Montserrat</option>
                          <option value="roboto">Roboto</option>
                          <option value="times-new-roman">
                            Times New Roman
                          </option>
                          <option value="georgia">Georgia</option>
                          <option value="playfair-display">
                            Playfair Display
                          </option>
                          <option value="merriweather">Merriweather</option>
                          <option value="garamond">Garamond</option>
                          <option value="lobster">Lobster</option>
                          <option value="pacifico">Pacifico</option>
                          <option value="bebas-neue">Bebas Neue</option>
                          <option value="anton">Anton</option>
                          <option value="oswald">Oswald</option>
                        </select>
                        <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-non_active_text text-xs">
                          <IoIosArrowDown className="text-non_active_text " />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* <div className="mt-3 flex items-center justify-between px-3 py-1 border border-gray-200 rounded-md text-xs text-gray-400 ">
                  <label>Header</label>
                  <input
                    className="accent-graidient_bottom "
                    checked={settings.header}
                    onChange={(e) => {
                      const temp = { ...settings };
                      temp.header = e.target.checked;
                      setSettings(temp);
                    }}
                    type="checkbox"
                  />
                </div>
                <div className="mt-3 flex items-center justify-between px-3 py-1 border border-gray-200 rounded-md text-xs text-gray-400 ">
                  <label>Footer</label>
                  <input
                    className="accent-graidient_bottom "
                    checked={settings.footer}
                    onChange={(e) => {
                      const temp = { ...settings };
                      temp.footer = e.target.checked;
                      setSettings(temp);
                    }}
                    type="checkbox"
                  />
                </div> */}

                <h3
                  onClick={() => {
                    if (designDoc === "theme") {
                      setDesignDoc("");
                    } else {
                      setDesignDoc("theme");
                    }
                  }}
                  className={`text-sm  py-2 cursor-pointer -mx-3 h-[48px] flex items-center justify-between borderr-b border-border_clr hover:text-active_text px-4 hover:bg-highlight ${
                    designDoc === "theme"
                      ? "bg-highlight text-active_text"
                      : "bg-white text-lvl_2_hed"
                  } `}
                >
                  <div className="flex items-center justify-start gap-3">
                    <div className="h-[32px] flex items-center justify-center  w-[32px] shadow-md shadow-gray-300 rounded-md">
                      <Icon icon="solar:documents-linear" height={20} />
                    </div>
                    Theme
                  </div>
                  <FaAngleRight
                    className={`${
                      designDoc === "theme" ? "rotate-90" : "rotate-0"
                    }`}
                  />
                </h3>
                {designDoc === "theme" && (
                  <div className="mt-4 transition-all duration-500 ease-out opacity-0 animate-fadeIn ">
                    {/* <p className="text-non_active_text text-[10px] ">
          Select a design style for your entire proposal.
        </p> */}
                    <div className=" w-full grid grid-cols-2 gap-4 mt-2">
                      <div className="flex flex-col items-center justify-center">
                        <img
                          onClick={() => {
                            const temp = { ...settings };
                            temp.theme = 0;
                            setSettings(temp);
                          }}
                          className={`h-28 w-[100%] hover:border hover:border-graidient_bottom ${
                            settings.theme === 0
                              ? "border border-gradient_darker"
                              : "none"
                          }`}
                          src={theme_0}
                          alt="sometthing"
                        />
                        <p className="text-xs text-non_active_text mt-1">
                          Classic
                        </p>
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <img
                          onClick={() => {
                            const temp = { ...settings };
                            temp.theme = 1;
                            setSettings(temp);
                          }}
                          className={`h-28 w-[100%] hover:border hover:border-graidient_bottom ${
                            settings.theme === 1
                              ? "border border-gradient_darker"
                              : "none"
                          }`}
                          src={theme_1}
                          alt="sometthing"
                        />
                        <p className="text-xs text-non_active_text mt-1">
                          Classic
                        </p>
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <img
                          onClick={() => {
                            const temp = { ...settings };
                            temp.theme = 2;
                            setSettings(temp);
                          }}
                          className={`h-28 w-[100%] hover:border hover:border-graidient_bottom ${
                            settings.theme === 2
                              ? "border border-gradient_darker"
                              : "none"
                          }`}
                          src={theme_2}
                          alt="sometthing"
                        />
                        <p className="text-xs text-non_active_text mt-1">
                          Classic
                        </p>
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <img
                          onClick={() => {
                            const temp = { ...settings };
                            temp.theme = 3;
                            setSettings(temp);
                          }}
                          className={`h-28 w-[100%] hover:border hover:border-graidient_bottom ${
                            settings.theme === 3
                              ? "border border-gradient_darker"
                              : "none"
                          }`}
                          src={theme_3}
                          alt="sometthing"
                        />
                        <p className="text-xs text-non_active_text mt-1">
                          Classic
                        </p>
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <img
                          onClick={() => {
                            const temp = { ...settings };
                            temp.theme = 4;
                            setSettings(temp);
                          }}
                          className={`h-28 w-[100%] hover:border hover:border-graidient_bottom ${
                            settings.theme === 4
                              ? "border border-gradient_darker"
                              : "none"
                          }`}
                          src={theme_4}
                          alt="sometthing"
                        />
                        <p className="text-xs text-non_active_text mt-1">
                          Classic
                        </p>
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <img
                          onClick={() => {
                            const temp = { ...settings };
                            temp.theme = 5;
                            setSettings(temp);
                          }}
                          className={`h-28 w-[100%] hover:border hover:border-graidient_bottom ${
                            settings.theme === 5
                              ? "border border-gradient_darker"
                              : "none"
                          }`}
                          src={theme_5}
                          alt="sometthing"
                        />
                        <p className="text-xs text-non_active_text mt-1">
                          Classic
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div
                style={{ height: "calc(100vh - 65px)" }}
                className="relative w-[1px]"
              >
                {showPicker && (
                  <div
                    ref={colorRef}
                    className="absolute top-[5%] -left-1 mt-2 shadow-lg z-50"
                  >
                    <SketchPicker
                      color={settings.color}
                      onChange={(updatedColor) => {
                        const temp = { ...settings };
                        temp.color = updatedColor.hex;
                        setSettings(temp);
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          ) : active === "workspace" ? (
            <div
              className="w-[220px] overflow-x-hidden  px-3  overflow-auto pb-[40px] text-lvl_2_txt z-50  "
              style={{
                boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.2)",
                height: "calc(100vh - 65px)",
              }}
            >
              <p className="text-sm text-lvl_2_hed py-2 px-1 font-semibold  ">
                Workspaces
              </p>
              <div className="w-full h-8 bg-backgrounds  flex items-center px-1 rounded border hover:border-active_text focus-within:border-active_text mb-2">
                <IoIosSearch className="text-non_active_text text-md" />
                <input
                  className="w-[90%] h-full outline-none  rounded text-sm bg-backgrounds px-2"
                  type="text"
                  placeholder="Search"
                  value={searchW}
                  onChange={(e) => setSearchW(e.target.value)}
                />
              </div>
              {workspaces
                .filter((item) => {
                  const name = item.workspaceName.toLowerCase();
                  const query = searchW.toLowerCase();
                  return query === "" ? true : name.startsWith(query);
                })
                .map((item, idx) => (
                  <div key={item._id} className="text-sm -mx-3 ">
                    {idx !== 0 && (
                      <div className="h-[1px] w-[120%] -mx-4 bg-border_clr "></div>
                    )}
                    <div
                      onClick={() => {
                        if (workspaceInclude.includes(item._id)) {
                          setWorkspaceInclude(
                            workspaceInclude.filter((id) => id !== item._id)
                          );
                        } else {
                          setWorkspaceInclude([...workspaceInclude, item._id]);
                        }
                      }}
                      className={`w-[100%] h-[48px] flex items-center justify-start  gap-2  cursor-pointer hover:text-black hover:bg-gray-200 px-3 ${
                        workspaceInclude.includes(item._id)
                          ? "text-active_text"
                          : "text-non_active_text "
                      }`}
                    >
                      <FiFolder className="text-graidient_bottom" />{" "}
                      <p
                        className={`text-sm  w-[80%] overflow-hidden whitespace-nowrap text-ellipsis  `}
                      >
                        {item.workspaceName}
                      </p>
                      {item.favorate === true ? (
                        <FaBookmark
                          onClick={() => {
                            handleFavorate(item._id, false);
                            const temp = [...workspaces];
                            temp[idx].favorate = false;
                            setWorkspaces(temp);
                          }}
                          className="text-sm text-primary mt-0.5 cursor-pointer"
                        />
                      ) : (
                        <FaRegBookmark
                          onClick={() => {
                            handleFavorate(item._id, true);
                            const temp = [...workspaces];
                            temp[idx].favorate = true;
                            setWorkspaces(temp);
                          }}
                          className="text-sm text-active_text mt-0.5  cursor-pointer hover:text-primary"
                        />
                      )}
                    </div>
                    {workspaceInclude.includes(item._id) &&
                      (item.proposals && item.proposals.length === 0 ? (
                        <div className="w-full ml-4 flex items-center justify-start gap-1 my-2 cursor-pointer text-non_active_text transition-all duration-500 ease-out opacity-0 animate-fadeIn ">
                          <p className="text-xs w-[88%] overflow-hidden text-ellipsis whitespace-nowrap pl-1">
                            No Proposals available
                          </p>
                        </div>
                      ) : (
                        item.proposals?.map((proposal, index) => (
                          <div
                            key={proposal._id || index}
                            className="w-full ml-4 flex items-center justify-start gap-1 my-2 cursor-pointer text-non_active_text hover:text-active_text transition-all duration-500 ease-out opacity-0 animate-fadeIn"
                          >
                            <IoDocumentTextOutline />
                            <p
                              onClick={() =>
                                navigate(`/editor/${proposal._id}`)
                              }
                              className="text-xs w-[84%] overflow-hidden text-ellipsis whitespace-nowrap pl-1"
                            >
                              {proposal.proposalName}
                            </p>
                          </div>
                        ))
                      ))}
                  </div>
                ))}
              <div className="h-[1px] w-[120%] -mx-4 bg-border_clr "></div>
            </div>
          ) : active === "history" ? (
            <div
              className="w-[220px] overflow-x-hidden  pr-0  overflow-auto pb-[16px] scrollbar-hide text-lvl_2_txt z-50  "
              style={{
                boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.2)",
                height: "calc(100vh - 65px)",
              }}
            >
              <p className="text-sm text-lvl_2_hed font-semibold mx-3 p-2 ">
                Version History
              </p>
              <div className="w-full flex flex-col-reverse items-start">
                {version?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => setHistoryPreview(item.data)}
                      className="w-full flex items-center justify-between gap-1  px-4  cursor-pointer text-lvl_2_txt hover:text-active_text transition-all duration-500 ease-out opacity-0 animate-fadeIn border-b border-border_clr hover:bg-gray-200 active:bg-highlight "
                    >
                      <div className="flex items-center justify-start h-[47px]">
                        <IoDocumentTextOutline />
                        <p className="text-sm  overflow-hidden text-ellipsis whitespace-nowrap pl-1">
                          {version.length - 1 === index
                            ? formatDate(item.updatedAt)
                            : formatDate(item.createdAt)}
                        </p>
                      </div>
                      <div>
                        <Icon icon="fluent:window-play-20-regular" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div> </div>
          )}
          <div
            style={{ height: "calc(100vh - 65px)" }}
            className="w-[1px]  bg-gray-100 relative "
          >
            {thirdLevel === "heading" ? (
              <div
                ref={headingRef}
                className=" absolute left-0 w-[220px] flex flex-col items-center pt-[16px] gap-[16px]  bg-white z-30 overflow-auto pb-[16px]   "
                style={{
                  boxShadow: "5px 0 10px rgba(0, 0, 0, 0.1)",
                  height: "calc(100vh - 65px)",
                }}
              >
                <div
                  onClick={() => {
                    addHeadingRow("heading-one");
                    setThirdLevel("");
                  }}
                  className="w-[88%]   py-[14px] bg-lvl_3_bg hover:bg-highlight cursor-pointer rounded-md flex flex-col  items-center justify-center gap-2 text-lvl_2_txt hover:text-active_text"
                >
                  {/* <img className="h-[85%] w-[70%] " src={heading_one} /> */}
                  <div
                    style={{ boxShadow: "1px 2px 8px 0px rgba(0, 0, 0, 0.2)" }}
                    className="text-[18px] text-lvl_3_img bg-white h-[60px] w-[100px] flex items-center justify-center rounded-md  "
                  >
                    Heading 1
                  </div>
                  <p className="text-xs font-semibold ">H1</p>
                </div>
                <div
                  onClick={() => {
                    addHeadingRow("heading-two");
                    setThirdLevel("");
                  }}
                  className="w-[88%]  py-[15px] bg-lvl_3_bg hover:bg-highlight cursor-pointer rounded-md flex flex-col  items-center justify-center gap-2 text-lvl_2_txt hover:text-active_text"
                >
                  <div
                    style={{ boxShadow: "1px 2px 8px 0px rgba(0, 0, 0, 0.2)" }}
                    className="text-[16px] text-lvl_3_img bg-white h-[57px] w-[98px] flex items-center justify-center rounded-md "
                  >
                    Heading 2
                  </div>
                  <p className="text-xs font-semibold ">H2</p>
                </div>
                <div
                  onClick={() => {
                    addHeadingRow("heading-three");
                    setThirdLevel("");
                  }}
                  className="w-[88%] h-28  py-[15px] bg-lvl_3_bg hover:bg-highlight cursor-pointer rounded-md flex flex-col  items-center justify-center gap-3 text-lvl_2_txt hover:text-active_text"
                >
                  <div
                    style={{ boxShadow: "1px 2px 8px 0px rgba(0, 0, 0, 0.2)" }}
                    className="text-[14px] text-lvl_3_img bg-white h-[56px] w-[89px] flex items-center justify-center rounded-md "
                  >
                    Heading 3
                  </div>
                  <p className="text-xs font-semibold ">H3</p>
                </div>
                <div
                  onClick={() => {
                    addHeadingRow("heading-four");
                    setThirdLevel("");
                  }}
                  className="w-[88%] h-28  py-[15px] gap-3.5 bg-lvl_3_bg hover:bg-highlight cursor-pointer rounded-md flex flex-col  items-center justify-center text-lvl_2_txt hover:text-active_text "
                >
                  <div
                    className="text-[12px] text-lvl_3_img bg-white h-[51px] w-[85px] flex items-center justify-center rounded-md "
                    style={{ boxShadow: "1px 2px 8px 0px rgba(0, 0, 0, 0.2)" }}
                  >
                    Heading 4
                  </div>
                  <p className="text-xs font-semibold ">H4</p>
                </div>

                <div
                  onClick={() => {
                    addHeadingRow("heading-five");
                    setThirdLevel("");
                  }}
                  className="w-[88%] h-28  py-[16px] gap-4 bg-lvl_3_bg hover:bg-highlight cursor-pointer rounded-md flex flex-col  items-center justify-center text-lvl_2_txt hover:text-active_text"
                >
                  <div
                    className="text-[10px] text-lvl_3_img bg-white h-[47px] w-[67px] flex items-center justify-center rounded-md "
                    style={{ boxShadow: "1px 2px 8px 0px rgba(0, 0, 0, 0.2)" }}
                  >
                    Heading 5
                  </div>
                  <p className="text-xs font-semibold ">H5</p>
                </div>
                <div
                  onClick={() => {
                    addHeadingRow("heading-six");
                    setThirdLevel("");
                  }}
                  className="w-[88%] h-40 py-[17px] gap-5 bg-lvl_3_bg hover:bg-highlight cursor-pointer rounded-md flex flex-col  items-center justify-center text-lvl_2_txt hover:text-active_text"
                >
                  <div
                    className="text-[8px] text-lvl_3_img bg-white h-[42px] w-[65px] flex items-center justify-center rounded-md "
                    style={{ boxShadow: "1px 2px 8px 0px rgba(0, 0, 0, 0.2)" }}
                  >
                    Heading 6
                  </div>
                  <p className="text-xs font-semibold ">H6</p>
                </div>
              </div>
            ) : thirdLevel === "paragraph" ? (
              <div
                ref={headingRef}
                className=" absolute left-0 w-[220px] flex flex-col items-center pt-[16px] gap-[16px]  bg-white z-30 overflow-auto pb-20 scrollbar-hide border-r border-gray-100    "
                style={{
                  boxShadow: "5px 0 10px rgba(0, 0, 0, 0.1)",
                  height: "calc(100vh - 65px)",
                }}
              >
                <div
                  onClick={() => {
                    addInputRow();
                    setThirdLevel("");
                  }}
                  className="w-full flex flex-col justify-center items-center gap-1 cursor-pointer"
                >
                  <div className="w-[88%] relative h-[112px] p-1 bg-lvl_3_bg hover:bg-highlight cursor-pointer rounded-md flex flex-col text-gray-500 items-center justify-center gap-2 text-lvl_2_txt hover:text-active_text ">
                    <img
                      style={{
                        boxShadow: "1px 2px 8px 0px rgba(0, 0, 0, 0.2)",
                      }}
                      className=" rounded-md "
                      src={para_2}
                    />
                    <p className="text-xs ">Paragraph</p>
                  </div>
                </div>
                <div
                  onClick={() => {
                    addDoublePara();
                    setThirdLevel("");
                  }}
                  className="w-full flex flex-col justify-center items-center gap-1 cursor-pointer"
                >
                  <div className="w-[88%] relative h-[112px] p-1 bg-lvl_3_bg hover:bg-highlight cursor-pointer rounded-md flex flex-col text-gray-500 items-center justify-center gap-2 text-lvl_2_txt hover:text-active_text ">
                    <img
                      style={{
                        boxShadow: "1px 2px 8px 0px rgba(0, 0, 0, 0.2)",
                      }}
                      className=" rounded-md "
                      src={double_2}
                    />
                    <p className="text-xs ">Double Paragraph</p>
                  </div>
                </div>
              </div>
            ) : thirdLevel === "image" ? (
              <div
                ref={headingRef}
                className=" absolute left-0 w-[220px] flex flex-col items-center pt-[16px] gap-[16px]  bg-white z-30 overflow-auto pb-[16px] scrollbar-hide border-r border-gray-100 "
                style={{
                  boxShadow: "5px 0 10px rgba(0, 0, 0, 0.1)",
                  height: "calc(100vh - 65px)",
                }}
              >
                <div
                  onClick={() => {
                    addImageRow();
                    setThirdLevel("");
                  }}
                  className="w-full flex flex-col justify-center items-center gap-1 cursor-pointer"
                >
                  <div className="w-[88%] relative h-[112px] p-1 bg-lvl_3_bg hover:bg-highlight cursor-pointer rounded-md flex flex-col text-gray-500 items-center justify-center gap-2 text-lvl_2_txt hover:text-active_text">
                    <img
                      style={{
                        boxShadow: "1px 2px 8px 0px rgba(0, 0, 0, 0.2)",
                      }}
                      className="rounded-md "
                      src={image_2}
                    />
                    <p className=" text-xs  ">Image</p>
                  </div>
                </div>
                <div
                  onClick={() => {
                    addImageAndParagraph();
                    setThirdLevel("");
                  }}
                  className="w-full flex flex-col justify-center items-center gap-1 cursor-pointer"
                >
                  <div className="w-[88%] relative h-[112px] p-1 bg-lvl_3_bg hover:bg-highlight cursor-pointer rounded-md flex flex-col text-gray-500 items-center justify-center gap-2 text-lvl_2_txt hover:text-active_text ">
                    <img
                      style={{
                        boxShadow: "1px 2px 8px 0px rgba(0, 0, 0, 0.2)",
                      }}
                      className=" rounded-md "
                      src={image_p_2}
                    />
                    <p className="text-xs">Image & Paragraph</p>
                  </div>
                </div>
                <div
                  onClick={() => {
                    addDoubleImage();
                    setThirdLevel("");
                  }}
                  className="w-full flex flex-col justify-center items-center gap-1 cursor-pointer"
                >
                  <div className="w-[88%] relative h-[112px] p-1 bg-lvl_3_bg hover:bg-highlight cursor-pointer rounded-md flex flex-col text-gray-500 items-center justify-center gap-2 text-lvl_2_txt hover:text-active_text ">
                    <img
                      style={{
                        boxShadow: "1px 2px 8px 0px rgba(0, 0, 0, 0.2)",
                      }}
                      className=" rounded-md "
                      src={double_img}
                    />
                    <p className="text-xs ">Double Image</p>
                  </div>
                </div>
              </div>
            ) : thirdLevel === "table" ? (
              <div
                ref={headingRef}
                style={{
                  boxShadow: "5px 0 10px rgba(0, 0, 0, 0.1)",
                  height: "calc(100vh - 65px)",
                }}
                className=" absolute left-0 w-[220px] flex flex-col items-center pt-[16px] gap-4  bg-white z-30 overflow-auto pb-[16px] border-r border-gray-100 "
              >
                <div
                  onClick={() => {
                    addTableRow("normal");
                    setThirdLevel("");
                  }}
                  className="w-[88%] h-[112px] p-2 bg-lvl_3_bg hover:bg-highlight cursor-pointer rounded-md flex flex-col  items-center justify-center text-lvl_2_txt hover:text-active_text "
                >
                  <img className="h-[75%] w-[53%]" src={table_v_1} />
                  <p className="text-xs">Basic</p>
                </div>
                <div
                  onClick={() => {
                    addTableRow("alternativerow");
                    setThirdLevel("");
                  }}
                  className="w-[88%] h-[112px] p-2 bg-lvl_3_bg hover:bg-highlight cursor-pointer rounded-md flex flex-col  items-center justify-center text-lvl_2_txt hover:text-active_text "
                >
                  <img className="h-[75%] w-[53%]" src={table_v_2} />
                  <p className=" text-xs ">Aleternative Row</p>
                </div>
                <div
                  onClick={() => {
                    addTableRow("alternativecol");
                    setThirdLevel("");
                  }}
                  className="w-[88%] h-[112px] p-2 bg-lvl_3_bg hover:bg-highlight cursor-pointer rounded-md flex flex-col  items-center justify-center "
                >
                  <img className="h-[75%] w-[53%]" src={table_v_3} />
                  <p className="text-lvl_2_txt text-xs hover:text-active_text">
                    Aleternative Coloumn
                  </p>
                </div>
                <div
                  onClick={() => {
                    addTableRow("toprow");
                    setThirdLevel("");
                  }}
                  className="w-[88%] h-[112px] p-2 bg-lvl_3_bg hover:bg-highlight cursor-pointer rounded-md flex flex-col  items-center justify-center text-lvl_2_txt hover:text-active_text "
                >
                  <img className="h-[75%] w-[53%]" src={table_v_4} />
                  <p className="text-xs">Top Row</p>
                </div>

                <div
                  onClick={() => {
                    addTableRow("leftcol");
                    setThirdLevel("");
                  }}
                  className="w-[88%] h-[112px] p-2 bg-lvl_3_bg hover:bg-highlight cursor-pointer rounded-md flex flex-col  items-center justify-center text-lvl_2_txt hover:text-active_text "
                >
                  <img className="h-[75%] w-[53%]" src={table_v_5} />
                  <p className=" text-xs ">Left Coloumn</p>
                </div>
              </div>
            ) : thirdLevel === "sections" ? (
              <div
                ref={headingRef}
                style={{
                  boxShadow: "5px 0 10px rgba(0, 0, 0, 0.1)",
                  height: "calc(100vh - 65px)",
                }}
                className=" absolute left-0 w-[220px] flex flex-col items-center pt-[16px] gap-[16px]  bg-white z-30 overflow-auto pb-[16px]  border-r border-gray-100    "
              >
                <p
                  onClick={() => {
                    if (openSections === "para") {
                      setOpenSections("");
                    } else {
                      setOpenSections("para");
                    }
                  }}
                  className={` w-full text-left text-sm px-[16px] cursor-pointer py-0.5 flex justify-between hover:text-active_text items-center ${
                    openSections === "para"
                      ? "text-active_text"
                      : "text-lvl_2_txt"
                  }`}
                >
                  Paragraph
                  <IoIosArrowDown />
                </p>

                {openSections === "para" && (
                  <div className="w-full flex flex-col items-center  gap-[16px] transition-all duration-500 ease-out opacity-0 animate-fadeIn ">
                    <div
                      onClick={() => {
                        setRows([...rows, section_1_row]);
                        setThirdLevel("");
                      }}
                      className="w-[88%]  bg-lvl_3_bg cursor-pointer hover:bg-highlight py-[16px] rounded-md flex flex-col text-gray-500 items-center justify-center gap-1 "
                    >
                      <img
                        className=" w-[85%] rounded-md"
                        src={s_1}
                        style={{
                          boxShadow: "1px 2px 8px 0px rgba(0, 0, 0, 0.2)",
                        }}
                      />
                    </div>
                    <div
                      onClick={() => {
                        setRows([...rows, section_2_row]);
                        setThirdLevel("");
                      }}
                      className="w-[88%]  bg-lvl_3_bg py-[16px] cursor-pointer hover:bg-highlight rounded-md flex flex-col text-gray-500 items-center justify-center gap-1 "
                    >
                      <img
                        className=" w-[85%] rounded-md"
                        src={s_2}
                        style={{
                          boxShadow: "1px 2px 8px 0px rgba(0, 0, 0, 0.2)",
                        }}
                      />
                    </div>
                    <div
                      onClick={() => {
                        setRows([...rows, ...section_6_row]);
                        setThirdLevel("");
                      }}
                      className="w-[88%]  bg-lvl_3_bg py-[16px] cursor-pointer hover:bg-highlight rounded-md flex flex-col text-gray-500 items-center justify-center gap-1 "
                    >
                      <img
                        className=" w-[85%] rounded-md"
                        src={s_6}
                        style={{
                          boxShadow: "1px 2px 8px 0px rgba(0, 0, 0, 0.2)",
                        }}
                      />
                    </div>
                  </div>
                )}

                <p
                  onClick={() => {
                    if (openSections === "tables") {
                      setOpenSections("");
                    } else {
                      setOpenSections("tables");
                    }
                  }}
                  className={` w-full text-left text-sm px-[16px] cursor-pointer py-0.5 flex justify-between hover:text-active_text items-center ${
                    openSections === "tables"
                      ? "text-active_text"
                      : "text-lvl_2_txt"
                  }`}
                >
                  Tables
                  <IoIosArrowDown />
                </p>

                {openSections === "tables" && (
                  <div className="w-full flex flex-col items-center  gap-[16px] transition-all duration-500 ease-out opacity-0 animate-fadeIn ">
                    <div
                      onClick={() => {
                        setRows([...rows, ...section_3_row]);
                        setThirdLevel("");
                      }}
                      className="w-[88%]  bg-lvl_3_bg cursor-pointer hover:bg-highlight py-[16px] rounded-md flex flex-col text-gray-500 items-center justify-center gap-1 "
                    >
                      <img
                        className=" w-[85%] rounded-md"
                        src={s_3}
                        style={{
                          boxShadow: "1px 2px 8px 0px rgba(0, 0, 0, 0.2)",
                        }}
                      />
                    </div>
                    <div
                      onClick={() => {
                        setRows([...rows, ...section_4_row]);
                        setThirdLevel("");
                      }}
                      className="w-[88%]  bg-lvl_3_bg py-[16px] cursor-pointer hover:bg-highlight rounded-md flex flex-col text-gray-500 items-center justify-center gap-1 "
                    >
                      <img
                        className=" w-[85%] rounded-md"
                        src={s_4}
                        style={{
                          boxShadow: "1px 2px 8px 0px rgba(0, 0, 0, 0.2)",
                        }}
                      />
                    </div>
                    <div
                      onClick={() => {
                        setRows([...rows, ...section_5_row]);
                        setThirdLevel("");
                      }}
                      className="w-[88%]  bg-lvl_3_bg py-[16px] cursor-pointer hover:bg-highlight rounded-md flex flex-col text-gray-500 items-center justify-center gap-1 "
                    >
                      <img
                        className=" w-[85%] rounded-md"
                        src={s_5}
                        style={{
                          boxShadow: "1px 2px 8px 0px rgba(0, 0, 0, 0.2)",
                        }}
                      />
                    </div>
                  </div>
                )}

                <p
                  onClick={() => {
                    if (openSections === "img") {
                      setOpenSections("");
                    } else {
                      setOpenSections("img");
                    }
                  }}
                  className={` w-full text-left text-sm px-[16px] cursor-pointer py-0.5 flex justify-between hover:text-active_text items-center ${
                    openSections === "img"
                      ? "text-active_text"
                      : "text-lvl_2_txt"
                  }`}
                >
                  Image & Content
                  <IoIosArrowDown />
                </p>
                {openSections === "img" && (
                  <div className="w-full flex flex-col items-center  gap-[16px] transition-all duration-500 ease-out opacity-0 animate-fadeIn ">
                    <div
                      onClick={() => {
                        setRows([...rows, ...section_7_row]);
                        setThirdLevel("");
                      }}
                      className="w-[88%]  bg-lvl_3_bg py-[16px] cursor-pointer hover:bg-highlight rounded-md flex flex-col text-gray-500 items-center justify-center gap-1 "
                    >
                      <img
                        className=" w-[85%] rounded-md"
                        src={s_7}
                        style={{
                          boxShadow: "1px 2px 8px 0px rgba(0, 0, 0, 0.2)",
                        }}
                      />
                    </div>
                    <div
                      onClick={() => {
                        setRows([...rows, ...section_8_row]);
                        setThirdLevel("");
                      }}
                      className="w-[88%]  bg-lvl_3_bg py-[16px] rounded-md cursor-pointer hover:bg-highlight flex flex-col text-gray-500 items-center justify-center gap-1 "
                    >
                      <img
                        className=" w-[85%] rounded-md"
                        src={s_8}
                        style={{
                          boxShadow: "1px 2px 8px 0px rgba(0, 0, 0, 0.2)",
                        }}
                      />
                    </div>
                    <div
                      onClick={() => {
                        setRows([...rows, ...section_9_row]);
                        setThirdLevel("");
                      }}
                      className="w-[88%]  bg-lvl_3_bg py-[16px] rounded-md cursor-pointer hover:bg-highlight flex flex-col text-gray-500 items-center justify-center gap-1 "
                    >
                      <img
                        className=" w-[85%] rounded-md"
                        src={s_9}
                        style={{
                          boxShadow: "1px 2px 8px 0px rgba(0, 0, 0, 0.2)",
                        }}
                      />
                    </div>
                  </div>
                )}

                <p
                  onClick={() => {
                    if (openSections === "cost") {
                      setOpenSections("");
                    } else {
                      setOpenSections("cost");
                    }
                  }}
                  className={` w-full text-left text-sm px-[16px] cursor-pointer py-0.5 flex justify-between hover:text-active_text items-center ${
                    openSections === "cost"
                      ? "text-active_text"
                      : "text-lvl_2_txt"
                  }`}
                >
                  Cost Module
                  <IoIosArrowDown />
                </p>
                {openSections === "cost" && (
                  <div className="w-full flex flex-col items-center  gap-[16px] transition-all duration-500 ease-out opacity-0 animate-fadeIn ">
                    <div
                      onClick={() => {
                        setRows([...rows, ...section_10_row]);
                        setThirdLevel("");
                      }}
                      className="w-[88%]  bg-lvl_3_bg py-[16px] cursor-pointer hover:bg-highlight rounded-md flex flex-col text-gray-500 items-center justify-center gap-1 "
                    >
                      <img
                        className=" w-[85%] rounded-md"
                        src={s_10}
                        style={{
                          boxShadow: "1px 2px 8px 0px rgba(0, 0, 0, 0.2)",
                        }}
                      />
                    </div>
                    <div
                      onClick={() => {
                        setRows([...rows, ...section_11_row]);
                        setThirdLevel("");
                      }}
                      className="w-[88%]  bg-lvl_3_bg py-[16px] cursor-pointer hover:bg-highlight rounded-md flex flex-col text-gray-500 items-center justify-center gap-1 "
                    >
                      <img
                        className=" w-[85%] rounded-md"
                        src={s_11}
                        style={{
                          boxShadow: "1px 2px 8px 0px rgba(0, 0, 0, 0.2)",
                        }}
                      />
                    </div>
                    <div
                      onClick={() => {
                        setRows([...rows, ...section_12_row]);
                        setThirdLevel("");
                      }}
                      className="w-[88%]  bg-lvl_3_bg py-[16px] cursor-pointer hover:bg-highlight rounded-md flex flex-col text-gray-500 items-center justify-center gap-1 "
                    >
                      <img
                        className=" w-[85%] rounded-md"
                        src={s_12}
                        style={{
                          boxShadow: "1px 2px 8px 0px rgba(0, 0, 0, 0.2)",
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ) : thirdLevel === "pages" ? (
              <div
                ref={headingRef}
                style={{
                  boxShadow: "5px 0 10px rgba(0, 0, 0, 0.1)",
                  height: "calc(100vh - 65px)",
                }}
                className=" scrollbar-thinabsolute left-0 w-[200px] flex flex-col items-center pt-10 gap-4 border-r border-gray-300 bg-white z-50 overflow-auto pb-20 text-xs text-gray-400 text-center  "
              >
                <div
                  onClick={() => {
                    setRows([...rows, ...page_1_row]);
                    setThirdLevel("");
                  }}
                  className="w-[80%] h-44  bg-gray-100 rounded-md flex flex-col text-gray-500 items-center justify-center "
                >
                  <img className="h-[100%] w-[100%]" src={page_1} />
                </div>
              </div>
            ) : thirdLevel === "saved" ? (
              <div
                ref={headingRef}
                style={{
                  boxShadow: "5px 0 10px rgba(0, 0, 0, 0.1)",
                  height: "calc(100vh - 65px)",
                }}
                className=" absolute left-0 w-[220px] flex flex-col items-center pt-[16px] gap-[16px] bg-white z-30 overflow-auto pb-20  border-r border-gray-100    "
              >
                {user?.goals ? (
                  user.goals?.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="w-[88%] bg-lvl_3_bg py-[15px] flex flex-col items-center justify-center gap-2 rounded-md"
                        onClick={() => {
                          setRows([...rows, ...item.data]);
                          setThirdLevel("");
                        }}
                      >
                        {item.link && (
                          <img
                            src={item.link}
                            alt="No Imahe"
                            style={{
                              boxShadow: "1px 2px 8px 0px rgba(0, 0, 0, 0.2)",
                            }}
                            className="w-[85%] rounded-md "
                          />
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div></div>
                )}
              </div>
            ) : thirdLevel === "cover" ? (
              <div
                ref={headingRef}
                style={{
                  boxShadow: "5px 0 10px rgba(0, 0, 0, 0.1)",
                  height: "calc(100vh - 65px)",
                }}
                className=" absolute left-0 w-[220px] flex flex-col items-center pt-[16px] gap-[16px] bg-white z-30 overflow-auto pb-[16px] border-r border-gray-100    "
              >
                {/* <input
                    id={`file-upload`}
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      handleUpload(e);
                    }}
                  /> */}
                {/* Upload Image Label */}
                {/* <label
                    htmlFor={`file-upload`}
                    className="w-[88%] py-2 flex items-center justify-center gap-2  text-center rounded cursor-pointer text-xs bg-graidient_bottom text-white hover:bg-gradient_darker"
                  >
                    <IoCloudUploadOutline className="text-sm" />
                    {loading ? "Loading..." : "Upload Cover Page"}
                  </label> */}
                <p
                  onClick={() => {
                    if (openCover === "half") {
                      setOpenCover("");
                    } else {
                      setOpenCover("half");
                    }
                  }}
                  className={` w-full text-left text-sm px-[16px] cursor-pointer py-0.5 flex justify-between hover:text-active_text items-center ${
                    openCover === "half" ? "text-active_text" : "text-lvl_2_txt"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon
                      icon="fluent:document-fit-20-regular"
                      width="20"
                      height="20"
                      className={` cursor-pointer`}
                    />
                    Half Page
                  </div>

                  <IoIosArrowDown />
                </p>
                {openCover === "half" && (
                  <div className="w-full flex flex-col items-center  gap-[16px] transition-all duration-500 ease-out opacity-0 animate-fadeIn ">
                    <img
                      src={cover_1_21}
                      onClick={() => insertCoverPage(cover_21)}
                      className="w-[88%] cursor-pointer rounded-md shadow-md shadow-gray-300"
                    />
                    <img
                      src={cover_1_22}
                      onClick={() => insertCoverPage(cover_22)}
                      className="w-[88%] cursor-pointer rounded-md shadow-md shadow-gray-300"
                    />
                    <img
                      src={cover_1_23}
                      onClick={() => insertCoverPage(cover_23)}
                      className="w-[88%] cursor-pointer rounded-md shadow-md shadow-gray-300"
                    />
                    <img
                      src={cover_1_24}
                      onClick={() => insertCoverPage(cover_24)}
                      className="w-[88%] cursor-pointer rounded-md shadow-md shadow-gray-300"
                    />
                    <img
                      src={cover_1_25}
                      onClick={() => insertCoverPage(cover_25)}
                      className="w-[88%] cursor-pointer rounded-md shadow-md shadow-gray-300"
                    />
                    <img
                      src={cover_1_26}
                      onClick={() => insertCoverPage(cover_26)}
                      className="w-[88%] cursor-pointer rounded-md shadow-md shadow-gray-300"
                    />
                    <img
                      src={cover_1_27}
                      onClick={() => insertCoverPage(cover_27)}
                      className="w-[88%] cursor-pointer rounded-md shadow-md shadow-gray-300"
                    />
                    <img
                      src={cover_1_28}
                      onClick={() => insertCoverPage(cover_28)}
                      className="w-[88%] cursor-pointer rounded-md shadow-md shadow-gray-300"
                    />

                    <img
                      src={cover_1_29}
                      onClick={() => insertCoverPage(cover_29)}
                      className="w-[88%] cursor-pointer rounded-md shadow-md shadow-gray-300"
                    />
                    <img
                      src={cover_1_30}
                      onClick={() => insertCoverPage(cover_30)}
                      className="w-[88%] cursor-pointer rounded-md shadow-md shadow-gray-300"
                    />
                    <img
                      src={cover_1_31}
                      onClick={() => insertCoverPage(cover_31)}
                      className="w-[88%] cursor-pointer rounded-md shadow-md shadow-gray-300"
                    />
                    <img
                      src={cover_1_32}
                      onClick={() => insertCoverPage(cover_32)}
                      className="w-[88%] cursor-pointer rounded-md shadow-md shadow-gray-300"
                    />
                    <img
                      src={cover_1_34}
                      onClick={() => insertCoverPage(cover_34)}
                      className="w-[88%] cursor-pointer rounded-md shadow-md shadow-gray-300"
                    />
                    <img
                      src={cover_1_35}
                      onClick={() => insertCoverPage(cover_35)}
                      className="w-[88%] cursor-pointer rounded-md shadow-md shadow-gray-300"
                    />
                    <img
                      src={cover_1_36}
                      onClick={() => insertCoverPage(cover_36)}
                      className="w-[88%] cursor-pointer rounded-md shadow-md shadow-gray-300"
                    />
                    <img
                      src={cover_1_37}
                      onClick={() => insertCoverPage(cover_37)}
                      className="w-[88%] cursor-pointer rounded-md shadow-md shadow-gray-300"
                    />
                    <img
                      src={cover_1_38}
                      onClick={() => insertCoverPage(cover_38)}
                      className="w-[88%] cursor-pointer rounded-md shadow-md shadow-gray-300"
                    />
                    <img
                      src={cover_1_39}
                      onClick={() => insertCoverPage(cover_39)}
                      className="w-[88%] cursor-pointer rounded-md shadow-md shadow-gray-300"
                    />
                    <img
                      src={cover_1_40}
                      onClick={() => insertCoverPage(cover_40)}
                      className="w-[88%] cursor-pointer rounded-md shadow-md shadow-gray-300"
                    />
                  </div>
                )}

                <p
                  onClick={() => {
                    if (openCover === "full") {
                      setOpenCover("");
                    } else {
                      setOpenCover("full");
                    }
                  }}
                  className={` w-full text-left text-sm px-[16px] cursor-pointer py-0.5 flex justify-between hover:text-active_text items-center ${
                    openCover === "full" ? "text-active_text" : "text-lvl_2_txt"
                  }`}
                >
                  <div className="flex items-center gap-2 ">
                    <Icon
                      icon="material-symbols-light:aspect-ratio-outline-rounded"
                      width="20"
                      height="20"
                      className={` cursor-pointer`}
                    />
                    Full Page
                  </div>

                  <IoIosArrowDown />
                </p>
                {openCover === "full" && (
                  <div className="w-full flex flex-col items-center  gap-[16px] transition-all duration-500 ease-out opacity-0 animate-fadeIn ">
                    <img
                      src={cover_1_1}
                      onClick={() => insertCoverPage(cover_1)}
                      className="w-[88%] cursor-pointer rounded-md shadow-md shadow-gray-300"
                    />
                    <img
                      src={cover_1_2}
                      onClick={() => insertCoverPage(cover_2)}
                      className="w-[88%] cursor-pointer rounded-md shadow-md shadow-gray-300"
                    />
                    <img
                      src={cover_1_3}
                      onClick={() => insertCoverPage(cover_3)}
                      className="w-[88%] cursor-pointer rounded-md shadow-md shadow-gray-300"
                    />
                    <img
                      src={cover_1_4}
                      onClick={() => insertCoverPage(cover_4)}
                      className="w-[88%] cursor-pointer rounded-md shadow-md shadow-gray-300"
                    />
                    <img
                      src={cover_1_5}
                      onClick={() => insertCoverPage(cover_5)}
                      className="w-[88%] cursor-pointer rounded-md shadow-md shadow-gray-300"
                    />
                    <img
                      src={cover_1_6}
                      onClick={() => insertCoverPage(cover_6)}
                      className="w-[88%] cursor-pointer rounded-md shadow-md shadow-gray-300"
                    />
                    <img
                      src={cover_1_7}
                      onClick={() => insertCoverPage(cover_7)}
                      className="w-[88%] cursor-pointer rounded-md shadow-md shadow-gray-300"
                    />
                    <img
                      src={cover_1_8}
                      onClick={() => insertCoverPage(cover_8)}
                      className="w-[88%] cursor-pointer rounded-md shadow-md shadow-gray-300"
                    />

                    <img
                      src={cover_1_9}
                      onClick={() => insertCoverPage(cover_9)}
                      className="w-[88%] cursor-pointer rounded-md shadow-md shadow-gray-300"
                    />
                    <img
                      src={cover_1_10}
                      onClick={() => insertCoverPage(cover_10)}
                      className="w-[88%] cursor-pointer rounded-md shadow-md shadow-gray-300"
                    />
                    <img
                      src={cover_1_11}
                      onClick={() => insertCoverPage(cover_11)}
                      className="w-[88%] cursor-pointer rounded-md shadow-md shadow-gray-300"
                    />
                    <img
                      src={cover_1_13}
                      onClick={() => insertCoverPage(cover_13)}
                      className="w-[88%] cursor-pointer rounded-md shadow-md shadow-gray-300"
                    />
                    <img
                      src={cover_1_14}
                      onClick={() => insertCoverPage(cover_14)}
                      className="w-[88%] cursor-pointer rounded-md shadow-md shadow-gray-300"
                    />
                    <img
                      src={cover_1_15}
                      onClick={() => insertCoverPage(cover_15)}
                      className="w-[88%] cursor-pointer rounded-md shadow-md shadow-gray-300"
                    />
                    <img
                      src={cover_1_16}
                      onClick={() => insertCoverPage(cover_16)}
                      className="w-[88%] cursor-pointer rounded-md shadow-md shadow-gray-300"
                    />
                    <img
                      src={cover_1_17}
                      onClick={() => insertCoverPage(cover_17)}
                      className="w-[88%] cursor-pointer rounded-md shadow-md shadow-gray-300"
                    />
                    <img
                      src={cover_1_18}
                      onClick={() => insertCoverPage(cover_18)}
                      className="w-[88%] cursor-pointer rounded-md shadow-md shadow-gray-300"
                    />
                    <img
                      src={cover_1_19}
                      onClick={() => insertCoverPage(cover_19)}
                      className="w-[88%] cursor-pointer rounded-md shadow-md shadow-gray-300"
                    />
                    <img
                      src={cover_1_20}
                      onClick={() => insertCoverPage(cover_20)}
                      className="w-[88%] cursor-pointer rounded-md shadow-md shadow-gray-300"
                    />
                  </div>
                )}
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
