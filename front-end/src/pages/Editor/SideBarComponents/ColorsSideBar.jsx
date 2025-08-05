import React, { useState } from "react";

const ThemeColorsSideBar = () => {
  const [selectedTheme, setSelectedTheme] = useState(null);

  // Theme colors with groups of three shades
  const themeColors = [
    { name: "Black", shades: ["#000000", "#4D4D4D", "#999999"] },
    { name: "Red", shades: ["#FF0000", "#FF4D4D", "#FF9999"] },
    { name: "Blue", shades: ["#0000FF", "#4D4DFF", "#9999FF"] },
    { name: "Green", shades: ["#008000", "#4DFF4D", "#99FF99"] },
    { name: "Yellow", shades: ["#FFFF00", "#FFFF4D", "#FFFF99"] },
    { name: "Purple", shades: ["#800080", "#B34DB3", "#D580D5"] },
    // Added Black theme
  ];

  return (
    <div className="w-[240px]  p-2 rounded-lg shadow-lg flex flex-col gap-2">
      <h3 className="text-lg font-semibold text-graidient_bottom mb-4 ">
        Theme Colors
      </h3>
      <div className="grid grid-cols-2 ">
        {themeColors.map((theme, index) => (
          <div
            key={index}
            onClick={() => setSelectedTheme(theme.name)}
            className={`flex flex-row gap-1 items-center cursor-pointer p-2 rounded ${
              selectedTheme === theme.name ? "ring-2 ring-black" : ""
            }`}
          >
            {theme.shades.map((shade, shadeIndex) => (
              <div
                key={shadeIndex}
                className="w-8 h-8 rounded"
                style={{ backgroundColor: shade }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThemeColorsSideBar;
