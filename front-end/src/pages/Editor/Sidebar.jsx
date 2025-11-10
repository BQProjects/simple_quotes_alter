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
import th_1 from "../../assets/th_1.png";
import th_2 from "../../assets/th_2.png";
import th_3 from "../../assets/th_3.png";
import th_4 from "../../assets/th_4.png";

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
import Select from "react-select";
import c_s from "../../assets/c_s.svg";
import p_s from "../../assets/p_s.svg";
import t_s from "../../assets/t_s.svg";
import i_s from "../../assets/i_s.svg";

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
  const [coverPages, setCoverPages] = useState([]);
  const [coverPagesLoading, setCoverPagesLoading] = useState(false);
  const [thirdLevel, setThirdLevel] = useState("");

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
    const fetchCoverPages = async () => {
      try {
        setCoverPagesLoading(true);
        const res = await axios.get(`${databaseUrl}/api/cover-page/all`);
        setCoverPages(res.data);
      } catch (err) {
        console.error("Error fetching cover pages:", err);
      } finally {
        setCoverPagesLoading(false);
      }
    };

    if (thirdLevel === "cover") {
      fetchCoverPages();
    }
  }, [databaseUrl, thirdLevel]);

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

  const fontOptions = [
    { value: "arial", label: "Arial" },
    { value: "georgia", label: "Georgia" },
    { value: "ibm-plex-sans", label: "IBM Plex Sans" },
    { value: "lato", label: "Lato" },
    { value: "libre-baskerville", label: "Libre Baskerville" },
    { value: "lora", label: "Lora" },
    { value: "merriweather", label: "Merriweather" },
    { value: "montserrat", label: "Montserrat" },
    { value: "nunito", label: "Nunito" },
    { value: "open-sans", label: "Open Sans" },
    { value: "poppins", label: "Poppins" },
    { value: "pt-sans", label: "PT Sans" },
    { value: "raleway", label: "Raleway" },
    { value: "roboto", label: "Roboto" },
    { value: "source-sans-pro", label: "Source Sans Pro" },
    { value: "times-new-roman", label: "Times New Roman" },
    { value: "work-sans", label: "Work Sans" },
  ];

  const customStyles = {
    control: (base, state) => ({
      ...base,
      minHeight: "28px", // reduce height of control
      height: "28px",
      backgroundColor: "white",
      borderColor: state.isFocused ? "#6b7280" : "#d1d5db", // active vs default
      boxShadow: "none",
      borderRadius: "4px",
      padding: "",
      fontSize: "12px",
      cursor: "pointer",
      "&:hover": {
        borderColor: "#6b7280",
      },
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "#e5e7eb" : "white", // grey on hover
      color: "#111827",
      fontSize: "12px",
      cursor: "pointer",
    }),
    menu: (base) => ({
      ...base,
      zIndex: 20,
      marginTop: 0,
    }),
    menuList: (base) => ({
      ...base,
      paddingTop: 0, // optional: tighter top padding
      paddingBottom: 0, // optional: tighter bottom padding
    }),
    dropdownIndicator: (base) => ({
      ...base,
      padding: 4,
      svg: {
        width: 13, // reduce width of arrow
        height: 13, // reduce height of arrow
      },
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
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

              <p className="text-gray-400 ">Doc Style</p>
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
                  className={`text-sm  py-2 cursor-pointer  h-[48px] flex items-center justify-between border-b border-border_clr active:bg-highlight hover:text-active_text px-3 hover:bg-gray-100 rounded-md ${
                    designDoc === "color"
                      ? "bg-gray-100 text-active_text"
                      : "bg-white text-lvl_2_hed"
                  } `}
                >
                  <div className="flex items-center justify-start gap-3">
                    <div className="h-[32px] flex items-center justify-center text-cost_bg  w-[32px] shadow-md shadow-gray-300 rounded-md">
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
                          console.log(temp);
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
                  className={`text-sm  py-2 cursor-pointer  h-[48px] flex items-center active:bg-highlight justify-between px-3  rounded-md hover:bg-gray-100 hover:text-active_text border-b border-border_clr ${
                    designDoc === "typo"
                      ? "bg-gray-100 text-active_text"
                      : "bg-white text-lvl_2_hed"
                  } `}
                >
                  <div className="flex items-center justify-start gap-3">
                    <div className="h-[32px] flex items-center justify-center text-cost_bg  w-[32px] shadow-md shadow-gray-300 rounded-md">
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
                  <div className="transition-all duration-500 ease-out opacity-0 animate-fadeIn mb-4 z-50 px-3">
                    {/* Heading Font */}
                    <div className="mt-1">
                      <label className="text-xs text-active_text mb-2">
                        Heading Font
                      </label>
                      <div className="relative w-full mt-1 ">
                        <Select
                          options={fontOptions}
                          value={fontOptions.find(
                            (f) => f.value === settings.heading
                          )}
                          onChange={(selectedOption) => {
                            const temp = { ...settings };
                            temp.heading = selectedOption.value;
                            setSettings(temp);
                          }}
                          styles={customStyles}
                          className="text-xs "
                          isSearchable={false}
                          formatOptionLabel={(option) => (
                            <span style={{ fontFamily: option.label }}>
                              {option.label}
                            </span>
                          )}
                        />
                      </div>
                    </div>

                    {/* Body Font */}
                    <div className="mt-3 gap-1">
                      <label className="text-xs text-active_text mb-2">
                        Body Font
                      </label>
                      <div className="relative w-full mt-1">
                        <Select
                          options={fontOptions}
                          value={fontOptions.find(
                            (f) => f.value === settings.body
                          )}
                          onChange={(selectedOption) => {
                            const temp = { ...settings };
                            temp.body = selectedOption.value;
                            setSettings(temp);
                          }}
                          styles={customStyles}
                          className="text-xs"
                          isSearchable={false}
                          formatOptionLabel={(option) => (
                            <span style={{ fontFamily: option.label }}>
                              {option.label}
                            </span>
                          )}
                        />
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
                  className={`text-sm  py-2 cursor-pointer  h-[48px] flex items-center justify-between border-b border-border_clr hover:text-active_text px-3 rounded-md hover:bg-gray-100 active:bg-highlight ${
                    designDoc === "theme"
                      ? "bg-gray-100 text-active_text"
                      : "bg-white text-lvl_2_hed"
                  } `}
                >
                  <div className="flex items-center justify-start gap-3">
                    <div className="h-[32px] flex items-center justify-center text-cost_bg  w-[32px] shadow-md shadow-gray-300 rounded-md">
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
                          src={th_1}
                          alt="sometthing"
                        />
                        <p className="text-xs text-non_active_text mt-1">
                          Primary
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
                          src={th_3}
                          alt="sometthing"
                        />
                        <p className="text-xs text-non_active_text mt-1">
                          Pulse Line
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
                          src={th_4}
                          alt="sometthing"
                        />
                        <p className="text-xs text-non_active_text mt-1">
                          Orbit
                        </p>
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <img
                          onClick={() => {
                            const temp = { ...settings };
                            temp.theme = 3;
                            setSettings(temp);
                          }}
                          className={`h-28 w-[100%] hover:border hover:border-gray-400 ${
                            settings.theme === 3
                              ? "border border-gradient_darker"
                              : "none"
                          }`}
                          src={th_2}
                          alt="sometthing"
                        />
                        <p className="text-xs text-non_active_text mt-1">
                          Strata
                        </p>
                      </div>
                      {/* <div className="flex flex-col items-center justify-center">
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
                          src={th_4}
                          alt="sometthing"
                        />
                        <p className="text-xs text-non_active_text mt-1">
                          Classic
                        </p>
                      </div> */}
                      {/* <div className="flex flex-col items-center justify-center">
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
                          src={th_4}
                          alt="sometthing"
                        />
                        <p className="text-xs text-non_active_text mt-1">
                          Classic
                        </p>
                      </div> */}
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
                        <div className="w-full ml-8 flex items-center justify-start gap-1 my-2 cursor-pointer text-non_active_text transition-all duration-500 ease-out opacity-0 animate-fadeIn ">
                          <p className="text-xs w-[70%] overflow-hidden text-ellipsis whitespace-nowrap pl-1">
                            No Proposals available
                          </p>
                        </div>
                      ) : (
                        item.proposals?.map((proposal, index) => (
                          <div
                            key={proposal._id || index}
                            className="w-full ml-8 flex items-center justify-start gap-1 my-2 cursor-pointer text-non_active_text hover:text-active_text transition-all duration-500 ease-out opacity-0 animate-fadeIn"
                          >
                            <IoDocumentTextOutline />
                            <p
                              onClick={() =>
                                navigate(`/editor/${proposal._id}`)
                              }
                              className="text-xs w-[70%] overflow-hidden text-ellipsis whitespace-nowrap pl-1"
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
                  className={` w-full text-left text-sm px-[16px] cursor-pointer  flex justify-between hover:text-active_text items-center ${
                    openSections === "para"
                      ? "text-active_text"
                      : "text-lvl_2_txt"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <img src={p_s} />
                    Paragraph
                  </div>
                  {openSections === "para" ? (
                    <IoIosArrowDown />
                  ) : (
                    <IoIosArrowDown className=" -rotate-90" />
                  )}
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
                <div className="h-[1px] w-full -mx-4 bg-gray-300 -mt-1"></div>

                <p
                  onClick={() => {
                    if (openSections === "tables") {
                      setOpenSections("");
                    } else {
                      setOpenSections("tables");
                    }
                  }}
                  className={` w-full text-left text-sm px-[16px] cursor-pointer  flex justify-between hover:text-active_text items-center ${
                    openSections === "tables"
                      ? "text-active_text"
                      : "text-lvl_2_txt"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <img src={t_s} />
                    Tables
                  </div>
                  {openSections === "tables" ? (
                    <IoIosArrowDown />
                  ) : (
                    <IoIosArrowDown className=" -rotate-90" />
                  )}
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
                <div className="h-[1px] w-full -mx-4 bg-gray-300 -mt-1"></div>

                <p
                  onClick={() => {
                    if (openSections === "img") {
                      setOpenSections("");
                    } else {
                      setOpenSections("img");
                    }
                  }}
                  className={` w-full text-left text-sm px-[16px] cursor-pointer  flex justify-between hover:text-active_text items-center ${
                    openSections === "img"
                      ? "text-active_text"
                      : "text-lvl_2_txt"
                  }`}
                >
                  {" "}
                  <div className="flex items-center gap-2">
                    <img src={i_s} />
                    Image & Content{" "}
                  </div>
                  {openSections === "img" ? (
                    <IoIosArrowDown />
                  ) : (
                    <IoIosArrowDown className=" -rotate-90" />
                  )}
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
                <div className="h-[1px] w-full -mx-4 bg-gray-300 -mt-1"></div>

                <p
                  onClick={() => {
                    if (openSections === "cost") {
                      setOpenSections("");
                    } else {
                      setOpenSections("cost");
                    }
                  }}
                  className={` w-full text-left text-sm px-[16px] cursor-pointer  flex justify-between hover:text-active_text items-center ${
                    openSections === "cost"
                      ? "text-active_text"
                      : "text-lvl_2_txt"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <img src={c_s} />
                    Cost Module
                  </div>

                  {openSections === "cost" ? (
                    <IoIosArrowDown />
                  ) : (
                    <IoIosArrowDown className=" -rotate-90" />
                  )}
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
                <div className="h-[1px] w-full -mx-4 bg-gray-300 -mt-1"></div>
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
                        className="w-[88%] bg-lvl_3_bg hover:bg-highlight cursor-pointer py-[15px] flex flex-col items-center justify-center gap-2 rounded-md"
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
                  className={` w-full text-left text-sm px-[16px] cursor-pointer  flex justify-between hover:text-active_text  items-center ${
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

                  {openCover === "half" ? (
                    <IoIosArrowDown />
                  ) : (
                    <IoIosArrowDown className=" -rotate-90" />
                  )}
                </p>
                {openCover === "half" && (
                  <div className="w-full flex flex-col items-center  gap-[16px] transition-all duration-500 ease-out opacity-0 animate-fadeIn ">
                    {coverPagesLoading ? (
                      <div className="text-sm text-gray-500">Loading...</div>
                    ) : (
                      coverPages
                        .filter((cp) => cp.type === "half")
                        .map((cp) => (
                          <img
                            key={cp._id}
                            src={cp.image}
                            onClick={() => insertCoverPage(cp.data)}
                            className="w-[88%] cursor-pointer rounded-md shadow-md shadow-gray-300"
                          />
                        ))
                    )}
                  </div>
                )}
                <div className="h-[1px] w-full -mx-4 bg-gray-300 -mt-1"></div>

                <p
                  onClick={() => {
                    if (openCover === "full") {
                      setOpenCover("");
                    } else {
                      setOpenCover("full");
                    }
                  }}
                  className={` w-full text-left text-sm px-[16px] cursor-pointer  flex justify-between hover:text-active_text items-center ${
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

                  {openCover === "full" ? (
                    <IoIosArrowDown />
                  ) : (
                    <IoIosArrowDown className=" -rotate-90" />
                  )}
                </p>
                {openCover === "full" && (
                  <div className="w-full flex flex-col items-center  gap-[16px] transition-all duration-500 ease-out opacity-0 animate-fadeIn ">
                    {coverPagesLoading ? (
                      <div className="text-sm text-gray-500">Loading...</div>
                    ) : (
                      coverPages
                        .filter((cp) => cp.type === "full")
                        .map((cp) => (
                          <img
                            key={cp._id}
                            src={cp.image}
                            onClick={() => insertCoverPage(cp.data)}
                            className="w-[88%] cursor-pointer rounded-md shadow-md shadow-gray-300"
                          />
                        ))
                    )}
                  </div>
                )}
                <div className="h-[1px] w-full -mx-4 bg-gray-300 -mt-1"></div>
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
