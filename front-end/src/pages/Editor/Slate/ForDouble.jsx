import React, { useRef, useEffect, useState } from "react";
import ImageAlter from "../../../assets/ImageAlter.png";
import image_slate from "../../../assets/image_slate.svg";
import { IoCloudUploadOutline } from "react-icons/io5";
import { AiOutlineColumnWidth } from "react-icons/ai";
import { FaAlignLeft, FaAlignCenter, FaAlignRight } from "react-icons/fa";
import image_alter from "../../../assets/ImageAlter.png";
import { TfiReload } from "react-icons/tfi";

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
            <select
              value={width} // Changed from `selected` to `width`
              onChange={(e) => onWidth(e.target.value)}
              className="p-1 bg-white outline-none border-[1px] border-gray-200 px-1 text-lvl_2_txt text-xs "
            >
              {/* <option value="" hidden></option> */}
              <option value="100">Container Width</option>
              <option value="50">50% Width</option>
              <option value="25">25% Width</option>
            </select>
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
