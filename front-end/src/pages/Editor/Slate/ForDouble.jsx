import React, { useRef, useEffect, useState } from "react";
import ImageAlter from "../../../assets/ImageAlter.png";
import image_slate from "../../../assets/image_slate.svg";
import { IoCloudUploadOutline } from "react-icons/io5";
import { AiOutlineColumnWidth } from "react-icons/ai";
import { FaAlignLeft, FaAlignCenter, FaAlignRight } from "react-icons/fa";
import image_alter from "../../../assets/ImageAlter.png";
import { TfiReload } from "react-icons/tfi";
import Select from "react-select";

const ForDouble = ({
  data,
  onUpdate,
  height,
  width,
  index,
  aliegn,
  onAliegn,
  onWidth,
  preview,
  selected,
  setSelected,
}) => {
  const divRef = useRef();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  // Close menu when clicking outside
  const handleClickOutsideMenu = (event) => {
    if (divRef.current && !divRef.current.contains(event.target)) {
      setShow(false);
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
      onClick={() => setSelected(index)}
      className={`w-full  px-4  min-h-[30px] flex ${
        aliegn === "left"
          ? "justify-start"
          : aliegn === "right"
          ? "justify-end"
          : "justify-center"
      } items-start relative`}
    >
      {/* Settings Panel */}
      {show && preview !== true && (
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 px-3 h-10 w-fit  bg-white border border-gray-100 shadow-lg shadow-gray-400 flex flex-row items-center justify-center space-x-2  rounded text-sm z-50">
          {/* Hidden file input */}
          <input
            id={`file-upload-${index}`}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleUpload}
          />
          {/* Upload Image Label */}
          <label
            htmlFor={`file-upload-${index}`}
            className="px-1 py-1 flex items-center justify-center gap-1 text-center rounded cursor-pointer text-xs text-lvl_2_txt w-28"
          >
            {data === "" ? (
              <IoCloudUploadOutline className="text-md" />
            ) : (
              <TfiReload className="text-md" />
            )}
            {data === "" ? "Upload Image" : "Change Image"}
          </label>
          <div className="w-[1px] h-7 bg-gray-300"></div>

          {/* Width Selector */}
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

          {/* Alignment Buttons */}
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
          onClick={() => setShow(true)} // Show menu when clicking the image
        />
      )}
    </div>
  );
};

export default ForDouble;
