import React, { useRef, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import heading_side from "../../../assets/heading_side.png";
import paragraph_side_2 from "../../../assets/paragraph_side_2.png";
import table_side_2 from "../../../assets/table_side_2.png";
import image_side_2 from "../../../assets/Image_side_2.png";
import divide from "../../../assets/divide.png";
import code_side_2 from "../../../assets/code_side_1.png";
import heading_lv2 from "../../../assets/heading_lv2.svg";
import paragraph_lv2 from "../../../assets/paragraph_lv2.svg";
import table_lv2 from "../../../assets/table_lv2.svg";
import image_lv2 from "../../../assets/image_lv2.svg";
import devider_lv2 from "../../../assets/devider_lv2.svg";
import code_lv2 from "../../../assets/code_lv2.svg";
import { FaAngleRight } from "react-icons/fa6";

import { FiPlus } from "react-icons/fi";
const ContentSideBar = ({
  addBreakPoint,
  addCodeBlock,
  setThirdLevel,
  thirdLevel,
}) => {
  return (
    <div className=" w-[220px]  pr-2 text-lvl_2_txt  ">
      <button
        onClick={() => setThirdLevel("heading")}
        className={` relative p-2 px-3 w-[95%] rounded-lg flex mx-3 hover:text-active_text  items-center  
           gap-4 hover:bg-gray-100 active:bg-highlight ${
             thirdLevel === "heading" && "bg-gray-100 text-active_text"
           }`}
      >
        <img
          src={heading_lv2}
          className="w-8 rounded-md p-[6px]   shadow-md shadow-gray-300"
          alt="heading"
        />
        <p className="text-sm">Heading</p>
        <FaAngleRight className="flex absolute right-4 text-xs  " />
      </button>
      <button
        onClick={() => setThirdLevel("paragraph")}
        className={` relative p-2 px-3 w-[95%] rounded-lg flex mx-3  items-center  
          gap-4 hover:bg-gray-100 active:bg-highlight hover:text-active_text ${
            thirdLevel === "paragraph" && "bg-gray-100 text-active_text"
          }`}
      >
        <img
          src={paragraph_lv2}
          className="w-8 h-8 rounded-md p-[4px]   shadow-md shadow-gray-300"
          alt="heading"
        />
        <p className="text-sm">Paragraph</p>
        <FaAngleRight className="flex absolute right-4 text-xs  " />
      </button>
      {/* <button
        onClick={addDoublePara}
        className=" relative p-2 px-3 w-[95%] rounded-lg flex text-gray-500 m-3 items-center  
           gap-4 hover:bg-gray-100 "
      >
        <img
          src={heading_sidebar}
          className="w-8 rounded-md p-[6px] border border-gray-100 shadow-lg shadow-gray-300"
          alt="heading"
        />
        <p>Double Paragraph</p>
        <FiPlus className="flex absolute right-4 " />
      </button> */}
      {/* <button
        onClick={addImageAndParagraph}
        className="h-20 w-[75%] m-3 flex flex-col items-center justify-center 
            bg-gradient-to-b from-editor_button_top to-editor_button_bot border-[1px] 
            border-[rgba(152 , 152 , 152 , 1)] gap-2 shadow-lg"
        style={{
          border:
            selected === "image_para"
              ? "1px solid rgba(223, 6, 78, 0.3)"
              : "1px solid rgba(152 , 152 , 152 , 1)",
          boxShadow:
            selected === "image_para"
              ? "inset 0px 10px 20px rgba(223, 6, 78, 0.2)"
              : "1px 2px 4px gray",
        }}
      >
        <img src={image_para} className="w-8 h-4" alt="heading" />
        <p className="text-xs w-[60%] text-center">Image & Paragraph</p>
      </button> */}
      <button
        onClick={() => setThirdLevel("table")}
        className={` relative p-2 px-3 w-[95%] rounded-lg flex mx-3 hover:text-active_text  items-center  
          gap-4 hover:bg-gray-100 active:bg-highlight ${
            thirdLevel === "table" && "bg-gray-100 text-active_text"
          }`}
      >
        <img
          src={table_lv2}
          className="w-8 h-8 rounded-md p-[4px] shadow-md shadow-gray-300"
          alt="heading"
        />
        <p className="text-sm">Table</p>
        <FaAngleRight className="flex absolute right-4 text-xs  " />
      </button>
      <button
        onClick={() => setThirdLevel("image")}
        className={` relative p-2 px-3 w-[95%] rounded-lg flex mx-3 hover:text-active_text  items-center  
          gap-4 hover:bg-gray-100 active:bg-highlight ${
            thirdLevel === "image" && "bg-gray-100 text-active_text"
          }`}
      >
        <img
          src={image_lv2}
          className="w-8 h-8 rounded-md p-[4px]  shadow-md shadow-gray-300"
          alt="heading"
        />
        <p className="text-sm"> Image</p>
        <FaAngleRight className="flex absolute right-4 text-xs " />
      </button>
      <button
        onClick={addBreakPoint}
        className={` relative p-2 px-3 w-[95%] hover:text-active_text rounded-lg active:bg-highlight flex mx-3  items-center  
          gap-4 hover:bg-gray-100 `}
      >
        <img
          src={devider_lv2}
          className="w-8 h-8 rounded-md p-[5px] border border-gray-100 shadow-md shadow-gray-300"
          alt="heading"
        />
        <p className="text-sm">Divider</p>
        <FiPlus className="flex absolute right-4 " />
      </button>

      <button
        onClick={addCodeBlock}
        className={` relative p-2 px-3 w-[95%] active:bg-highlight hover:text-active_text rounded-lg flex mx-3  items-center  
          gap-4 hover:bg-gray-100`}
      >
        <img
          src={code_lv2}
          className="w-8 h-8 rounded-md p-[4px]  border border-gray-100 shadow-md shadow-gray-300"
          alt="heading"
        />
        <p className="text-sm">Code</p>
        <FiPlus className="flex absolute right-4 " />
      </button>
      {/* <button
        onClick={() => setSign(true)}
        className=" relative p-2 px-3 w-[95%] rounded-lg flex text-gray-500 mx-3 my-1 items-center  
           gap-4 hover:bg-gray-100 "
      >
        <img
          src={heading_sidebar}
          className="w-8 rounded-md p-[6px] border border-gray-100 shadow-lg shadow-gray-300"
          alt="heading"
        />
        <p>Signiture</p>
        <FiPlus className="flex absolute right-4 " />
      </button> */}
    </div>
  );
};

export default ContentSideBar;
