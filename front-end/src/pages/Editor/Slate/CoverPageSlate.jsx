import React, { useRef, useState, useEffect } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { TfiReload } from "react-icons/tfi";
import { Icon } from "@iconify/react";
import Slider from "@mui/material/Slider";

const CoverPageSlate = ({
  index,
  indexValue,
  setIndexValue,
  selected,
  url,

  onChange,
  preview,
  darkness,
  onChangeDark,
  bright,
  onChangeBright,
  onChangeHeight,
  height,
}) => {
  const [loading, setLoading] = useState(false);
  const buttonRef = useRef();
  const toolbarRef = useRef();
  const [temp, setTemp] = useState(0);
  const [value, setValue] = useState(50); // For single-value slider

  const handleChange = (val) => {
    setValue(val);
  };

  const [show, setShow] = useState(false);
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
      onChange(photo.secure_url);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClickOutsideShare = (event) => {
    if (
      buttonRef.current &&
      !buttonRef.current.contains(event.target) &&
      toolbarRef.current &&
      !toolbarRef.current.contains(event.target)
    ) {
      setShow(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideShare);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideShare);
    };
  }, []);

  return (
    <div className="w-full">
      <img
        src={url}
        style={{
          width: "100%",
          objectFit: "cover",
          position: "center",
          height: `${height}px`,
          ...(bright === 1
            ? {
                opacity: 1 - darkness * 0.01, // decrease opacity
              }
            : {
                filter: `brightness(${1 - darkness * 0.01})`, // decrease brightness
              }),
        }}
      />
      {index === selected && preview !== true && (
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 px-3 h-10 bg-white border border-gray-100 shadow-md  flex flex-row items-center space-x-2 p-2 rounded text-sm z-30">
          <div>
            <input
              id={`file-upload`}
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                handleUpload(e);
              }}
            />
            {/* Upload Image Label */}
            <label
              htmlFor={`file-upload`}
              className="px-1 py-1 flex items-center justify-center gap-2  text-center rounded cursor-pointer text-sm text-lvl_2_txt "
            >
              <Icon icon="hugeicons:exchange-01" width="17" height="17" />
              {loading ? "Loading ..." : "Change image"}
            </label>
          </div>
          <div className="h-7 w-[1px] bg-gray-300"></div>
          {/* <input
            type="number"
            className="appearance-none 
            [&::-webkit-outer-spin-button]:appearance-none 
            [&::-webkit-inner-spin-button]:appearance-none 
            [&::-webkit-inner-spin-button]:m-0
            focus:outline-none
            border border-gray-300 rounded-md px-2 py-1 w-12"
            value={darkness}
            onChange={(e) => onChangeDark(e.target.value)}
          /> */}

          <button
            ref={buttonRef}
            onClick={() => setShow(true)}
            className="relative"
          >
            <Icon icon="mdi:square-opacity" width="20" height="20" />
          </button>
          <Icon
            icon="fluent:document-fit-20-regular"
            width="20"
            height="20"
            onClick={() => onChangeHeight(1380)}
            className={`${
              height === 1380
                ? "text-black bg-gray-200 rounded-sm"
                : "text-lvl_2_txt"
            } cursor-pointer`}
          />
          <Icon
            icon="material-symbols-light:aspect-ratio-outline-rounded"
            width="20"
            height="20"
            onClick={() => onChangeHeight(690)}
            className={`${
              height === 690
                ? "text-black bg-gray-200 rounded-sm"
                : "text-lvl_2_txt"
            } cursor-pointer`}
          />

          {show && (
            <div
              ref={toolbarRef}
              className="w-fit h-8 bg-white border border-gray-100 shadow-md  flex flex-row items-center space-x-2 p-2 rounded text-sm absolute top-10 left-20 px-4 z-40 "
            >
              <Slider
                value={darkness}
                aria-label="Default"
                onChange={(e) => onChangeDark(e.target.value)}
                valueLabelDisplay="none"
                sx={{
                  width: 150,
                  color: "rgba(223, 6, 78, 1)",
                  "& .MuiSlider-thumb": {
                    backgroundColor: "rgba(223, 6, 78, 1)",
                    boxShadow: "none",
                    "&:hover, &.Mui-focusVisible, &.Mui-active": {
                      boxShadow: "none",
                    },
                  },
                  "& .MuiSlider-track": {
                    backgroundColor: "rgba(223, 6, 78, 1)",
                    border: "none", // removes default border
                  },
                  "& .MuiSlider-rail": {
                    backgroundColor: "#e0e0e0",
                  },
                }}
              />
              <div className="flex items-center justify-center bg-gray-50 border-gray-100">
                <input
                  type="text"
                  min="0"
                  max="100"
                  value={darkness}
                  onChange={(e) => onChangeDark(Number(e.target.value))}
                  className=" w-14 py-1 text-center outline-none appearance-none "
                />
              </div>
              <div className="-ml-1 flex gap-2 items-center">
                <div
                  className={`w-4 h-4 bg-black cursor-pointer ${
                    bright === 1
                      ? "border border-black"
                      : "border border-graidient_bottom"
                  }`}
                  onClick={() => onChangeBright(0)}
                ></div>
                <div
                  className={`w-4 h-4 bg-white cursor-pointer ${
                    bright !== 1
                      ? "border border-gray-300"
                      : "border border-graidient_bottom"
                  }`}
                  onClick={() => onChangeBright(1)}
                ></div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CoverPageSlate;
