import React from "react";
import { useDrag } from "react-dnd";

const DraggableText = () => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TEXT",
    item: { type: "text", content: "TEXT" },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
        padding: "8px",
        backgroundColor: "lightblue",
        border: "1px solid blue",
        marginBottom: "5px",
        textAlign: "center",
        borderRadius: "4px",
      }}
    >
      Drag me to create an input field
    </div>
  );
};

export default DraggableText;
