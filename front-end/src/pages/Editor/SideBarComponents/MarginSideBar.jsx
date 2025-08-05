import React, { useState } from "react";

const MarginSideBar = ({ style, setStyle }) => {
  const [margins, setMargins] = useState({
    top: '1"',
    bottom: '1"',
    left: '1"',
    right: '1"',
  });

  const handleMarginChange = (key, value) => {
    const UpdatedValue = { ...style };
    UpdatedValue[key] = value;
    setStyle(UpdatedValue);
  };

  return (
    <div className="w-[240px] h-auto  p-4 rounded-lg shadow-lg flex flex-col gap-6">
      {/* Arrangement Section */}
      <div>
        <h3 className="text-lg font-semibold text-graidient_bottom mb-4">
          Normal Margin
        </h3>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div>
            <span className="text-gray-600 text-sm">Top:</span>
            <span className="text-gray-900 text-sm ml-2">{margins.top}</span>
          </div>
          <div>
            <span className="text-gray-600 text-sm">Bottom:</span>
            <span className="text-gray-900 text-sm ml-2">{margins.bottom}</span>
          </div>
          <div>
            <span className="text-gray-600 text-sm">Left:</span>
            <span className="text-gray-900 text-sm ml-2">{margins.left}</span>
          </div>
          <div>
            <span className="text-gray-600 text-sm">Right:</span>
            <span className="text-gray-900 text-sm ml-2">{margins.right}</span>
          </div>
        </div>
      </div>

      {/* Customize Margin Section */}
      <div>
        <h3 className="text-lg font-semibold text-graidient_bottom mb-4">
          Customize Margin
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {["marginTop", "marginBottom", "marginLeft", "marginRight"].map(
            (side) => (
              <div key={side} className="flex flex-col">
                <label
                  htmlFor={side}
                  className="text-sm font-medium text-gray-600 capitalize"
                >
                  {side === "marginTop"
                    ? "Top"
                    : side === "marginBottom"
                    ? "Bottom"
                    : side === "marginLeft"
                    ? "Left"
                    : "Right"}
                  :
                </label>
                <input
                  type="text"
                  id={side}
                  value={style[side]}
                  onChange={(e) => handleMarginChange(side, e.target.value)}
                  className="border border-gray-300 rounded px-2 py-2"
                  placeholder="Enter value"
                />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default MarginSideBar;
