import React, { useEffect } from "react";

const CodeBlock = ({ content, onChange, preview }) => {
  // Inline styles for the editor container
  const containerStyles = {
    backgroundColor: "#E8E8E8", // Set grey background
    padding: "8px",
    borderRadius: "5px",
  };

  return (
    <div style={containerStyles} className="mx-4">
      <textarea
        className="w-full min-h-[20px] bg-gray-200 outline-none font-mono text-sm px-3 resize-none overflow-hidden break-words whitespace-pre-wrap"
        value={content}
        onChange={(e) => onChange(e.target.value)}
        onInput={(e) => {
          e.target.style.height = "auto"; // Reset height
          e.target.style.height = `${e.target.scrollHeight}px`; // Expand dynamically
        }}
        readOnly={preview}
      ></textarea>
    </div>
  );
};

export default CodeBlock;
