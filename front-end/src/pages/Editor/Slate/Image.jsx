import React, { useRef, useEffect, useState } from "react";
import image_slate from "../../../assets/image_slate.svg";

import { IoCloudUploadOutline } from "react-icons/io5";
import { AiOutlineColumnWidth } from "react-icons/ai";
import { RxText } from "react-icons/rx";
import { PiAlignLeft } from "react-icons/pi";
import { PiAlignCenterHorizontalLight } from "react-icons/pi";
import { PiAlignRight } from "react-icons/pi";
import { MdOutlineZoomOutMap } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import image_alter from "../../../assets/ImageAlter.png";
import { TfiReload } from "react-icons/tfi";
import Select from "react-select";

import {
  FaBold,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
} from "react-icons/fa";

const Image = ({
  data,
  onUpdate,
  height,
  width,
  index,
  indexValue,
  setIndexValue,
  onHeight,
  onWidth,
  onAliegn,
  aliegn,
  captionH,
  discription,
  onCaption,
  preview,
  settings,
}) => {
  const divRef = useRef();
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState("");
  const [caption, setCaption] = useState(false);
  const [cHeading, setCHeading] = useState("");
  const [cDiscription, setCDisciption] = useState("");
  const [show, setShow] = useState(null);

  // Close menu when clicking outside
  const handleClickOutsideMenu = (event) => {
    if (divRef.current && !divRef.current.contains(event.target)) {
      setIndexValue(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideMenu);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideMenu);
    };
  }, []);

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
      onUpdate(photo.secure_url); // Call the onUpdate function with the URL
      console.log("Uploaded Image URL:", photo.secure_url);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  const widthOptions = [
    { value: "100", label: "Container width" },
    { value: "50", label: "50% width" },
    { value: "25", label: "25% width" },
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
      marginTop: 0,
      zIndex: 1000000000000,
    }),
    menuList: (base) => ({
      ...base,
      paddingTop: 0, // optional: tighter top padding
      paddingBottom: 0, // optional: tighter bottom padding
      zIndex: 1000000000000,
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
    menuPortal: (base) => ({
      ...base,
      zIndex: 9999, // or even 100000 if needed
    }),
  };

  return (
    <div
      ref={divRef}
      className={`w-full min-h-[100px] px-3 py-3 flex ${
        aliegn === "right" && width !== "100"
          ? "flex-row-reverse"
          : aliegn === "left" && width !== "100"
          ? "flex-row"
          : "flex-col"
      } ${
        aliegn === "left"
          ? "justify-between"
          : aliegn === "right"
          ? "justify-between"
          : "justify-center"
      } items-center relative `}
      onClick={() => {
        setIndexValue(index);
        setSelected(index);
      }}
    >
      {index === indexValue && preview !== true && (
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 px-3 h-10 bg-white border border-gray-100 shadow-md  flex flex-row items-center space-x-2 p-2 rounded text-sm">
          {/* Hidden file input */}
          <input
            id={`file-upload-${index}`}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={(e) => {
              handleUpload(e);
            }}
          />
          {/* Upload Image Label */}
          <label
            htmlFor={`file-upload-${index}`}
            className="px-1 py-1 flex items-center justify-center gap-2  text-center rounded cursor-pointer text-xs text-lvl_2_txt"
          >
            {data === "" ? (
              <IoCloudUploadOutline className="text-md" />
            ) : (
              <TfiReload className="text-md" />
            )}

            {data === "" ? "Upload Image" : "Change Image"}
          </label>
          <div className="w-[1px] h-7 bg-gray-300"></div>
          {/* Width Input */}
          <div className="relative w-fit">
            <Select
              options={widthOptions}
              value={widthOptions.find((opt) => opt.value === width)}
              onChange={(selected) => onWidth(selected.value)}
              isSearchable={false}
              menuPortalTarget={document.body} // optional: makes sure the dropdown isn't clipped by overflow:hidden
              menuPosition="absolute"
              styles={customStyles}
              className="w-[120px] text-xs mx-1"
            />
          </div>
          <div className="w-[1px] h-7 bg-gray-300"></div>
          <button
            onClick={() => {
              setCaption(true);
              setCHeading(captionH);
              setCDisciption(discription);
            }}
          >
            <RxText className="font-bold w-5 h-6" />
          </button>
          {width < 100 && <div className="w-[1px] h-7 bg-gray-300"></div>}
          {width < 100 && (
            <div className="flex items-center justify-center gap-3">
              <button className="ml-1" onClick={() => onAliegn("left")}>
                <PiAlignLeft
                  className={`text-lg ${
                    aliegn === "left" ? "text-black" : "text-lvl_2_txt"
                  }`}
                />
              </button>
              <button onClick={() => onAliegn("center")}>
                <PiAlignCenterHorizontalLight
                  className={`text-lg ${
                    aliegn === "center" ? "text-black" : "text-lvl_2_txt"
                  }`}
                />
              </button>
              <button onClick={() => onAliegn("right")}>
                <PiAlignRight
                  className={`text-lg ${
                    aliegn === "right" ? "text-black" : "text-lvl_2_txt"
                  }`}
                />
              </button>
              {data && (
                <button onClick={() => setShow(data)}>
                  <MdOutlineZoomOutMap
                    className={`text-lg ml-01 ${
                      aliegn === "right" ? "text-black" : "text-lvl_2_txt"
                    }`}
                  />
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Image Display */}
      {loading ? (
        <h1 className="text-lvl_2_txt">Uploading the Image...</h1>
      ) : (
        <img
          src={data ? data : image_alter}
          alt="Uploaded"
          style={{
            objectFit: "contain",
            width: `${width}%`,
          }}
          crossOrigin="anonymous"
        />
      )}
      <div
        style={{
          width: `${
            width === "100" ? width - 20 : width === "50" ? width : 75
          }%`,
        }}
        className={`${width === "100" ? "mt-4" : ""} flex flex-col font-${
          settings.body
        }`}
      >
        {captionH && <h1 className="text-center text-[1em]">{captionH}</h1>}

        {discription && (
          <div className="w-full flex items-center justify-center">
            <p className="text-center text-[1em] text-gray-500 max-w-[80%] break-words overflow-hidden">
              {discription}
            </p>
          </div>
        )}
      </div>

      {caption && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center p-4 z-[1000]">
          <div className="bg-white rounded-lg shadow-xl w-[40%] min-h-[45%] z-[5000] flex flex-col relative ">
            <div className="flex flex-col gap-2 items-center justify-center mt-4">
              <label
                className={`w-full flex items-start justify-start ml-16 font-semibold text-active_text `}
              >
                Image Caption
              </label>
              <input
                type="text"
                value={cHeading}
                onChange={(e) => setCHeading(e.target.value)}
                placeholder="Enter the caption"
                className="w-[90%] py-2 outline-none rounded-md px-3 border border-gray-300 focus:border-graidient_bottom text-active_text"
              />
            </div>
            <div className="flex flex-col gap-2 items-center justify-center mt-4">
              <label className="w-full flex items-start justify-start ml-16 font-semibold text-active_text ">
                Description
              </label>
              <textarea
                type="text"
                value={cDiscription}
                onChange={(e) => setCDisciption(e.target.value)}
                placeholder="Enter the Descripion"
                className="w-[90%] h-28 text-sm py-2 outline-none rounded-md px-3 border border-gray-300 focus:border-graidient_bottom text-active_text"
              />
            </div>
            <div className="w-full flex flex-row gap-4 items-end justify-end mb-3 mr-4 mt-4 pr-6">
              <button
                onClick={() => {
                  setCHeading("");
                  setCDisciption("");
                  setCaption(false);
                }}
                className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-md "
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onCaption(cHeading, cDiscription);
                  setCHeading("");
                  setCDisciption("");
                  setCaption(false);
                }}
                className="px-4 py-2 text-white bg-graidient_bottom hover:bg-opacity-90 rounded-md "
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      {show && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.8)", // Dim background
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <img
            src={show}
            alt="Centered Preview"
            style={{
              maxWidth: "70%",
              maxHeight: "70%",
              borderRadius: "10px",
              boxShadow: "0 0 20px rgba(255,255,255,0.2)",
            }}
          />

          <div
            className="text-xl p-2 rounded-[50%] text-white absolute top-3 right-3 cursor-pointer"
            onClick={() => setShow(null)}
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.8)",
            }}
          >
            <RxCross2 />
          </div>
        </div>
      )}
    </div>
  );
};

export default Image;
