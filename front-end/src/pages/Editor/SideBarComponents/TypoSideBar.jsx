import React, { useState } from "react";

const TypoSideBar = ({ style, setStyle }) => {
  const fontOptions = [
    "Arial",
    "Verdana",
    "Helvetica",
    "Times New Roman",
    "Georgia",
    "Courier New",
    "Trebuchet MS",
  ];

  const handleInputChange = (key, value) => {
    const updatedValue = { ...style };
    updatedValue[key] = value;
    setStyle(updatedValue);
  };

  return (
    <div className="w-[240px]  p-4 rounded-lg  flex flex-col gap-6">
      {/* Heading Typography Section */}
      <div>
        <h3 className="text-lg font-semibold text-graidient_bottom mb-4">
          Customize Typography
        </h3>
        <label
          htmlFor="headingFont"
          className="text-sm font-medium text-gray-600 block mb-2"
        >
          Heading Font:
        </label>
        <select
          id="headingFont"
          value={style.headingTypography}
          onChange={(e) =>
            handleInputChange("headingTypography", e.target.value)
          }
          className="border border-gray-300 rounded px-2 py-2 w-full"
        >
          {fontOptions.map((font, index) => (
            <option key={index} value={font}>
              {font}
            </option>
          ))}
        </select>
      </div>

      {/* Paragraph Typography Section */}
      <div>
        <label
          htmlFor="paragraphFont"
          className="text-sm font-medium text-gray-600 block mb-2"
        >
          Paragraph Font:
        </label>
        <select
          id="paragraphFont"
          value={style.paragrapghTypography}
          onChange={(e) =>
            handleInputChange("paragrapghTypography", e.target.value)
          }
          className="border border-gray-300 rounded px-2 py-2 w-full"
        >
          {fontOptions.map((font, index) => (
            <option key={index} value={font}>
              {font}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TypoSideBar;
