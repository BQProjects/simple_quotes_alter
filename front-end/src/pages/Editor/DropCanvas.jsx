import React, { useState, useContext, useRef, useEffect } from "react";
import DropRow from "./DropRow";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import { DatabaseContext } from "../../context/DatabaseContext";
import { StateManageContext } from "../../context/StateManageContext";

const DropCanvas = ({
  rows,
  setRows,
  preview,
  dropCanvasRef,
  settings,
  addEmptyRow,
  addInputRow,
  addTextRow,
  addHeadingRow,
  addDoublePara,
  addImageAndParagraph,
  addImageRow,
  addBreakPoint,
  addTableRow,
  addCodeBlock,
  addLineSpace,
  addDoubleImage,
  height,
}) => {
  const [bookmark, setBookmark] = useState(null);
  const [snapshotLink, setSnapshotLink] = useState("");
  const [savedTitile, setSavedTitle] = useState("");
  const [savedLabel, setSavedLabel] = useState("");
  const { user, setUser } = useContext(UserContext);
  const { databaseUrl } = useContext(DatabaseContext);
  const [loading, setLoading] = useState(false);
  const rowRefs = useRef([]);
  const { scrollIndex, setScrollIndex } = useContext(StateManageContext);
  // Move row up
  const moveRowUp = (index) => {
    if (index > 0) {
      const updatedRows = [...rows];
      const [movedRow] = updatedRows.splice(index, 1);
      updatedRows.splice(index - 1, 0, movedRow);
      setRows(updatedRows);
      setScrollIndex(index - 1);
    }
  };

  // Move row down
  const moveRowDown = (index) => {
    if (index < rows.length - 1) {
      const updatedRows = [...rows];
      const [movedRow] = updatedRows.splice(index, 1);
      updatedRows.splice(index + 1, 0, movedRow);
      setRows(updatedRows);
      setScrollIndex(index + 1);
    }
  };

  // Delete row
  const deleteRow = (index) => {
    const updatedRows = rows.filter((_, rowIndex) => rowIndex !== index);
    setRows(updatedRows);
  };

  // Handle drop item (for adding text or input inside rows)
  const handleDropItem = (rowIndex, item) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex].content = item.content; // Set the content of the row
    setRows(updatedRows);
  };

  const handleScrollToIndex = (index) => {
    if (rowRefs.current[index] && dropCanvasRef.current) {
      const element = rowRefs.current[index];
      const container = dropCanvasRef.current; // Scroll within this container

      // Get the element's position relative to the container
      const offsetTop =
        element.getBoundingClientRect().top -
        container.getBoundingClientRect().top;

      // Scroll smoothly to the element
      container.scrollTo({
        top: container.scrollTop + offsetTop - 10, // Adjust for better alignment
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (scrollIndex === null) {
      handleScrollToIndex(0);
    } else {
      handleScrollToIndex(scrollIndex);
    }
  }, [scrollIndex]);

  const handleSavedModule = async () => {
    try {
      const temp = [...rows];
      temp[bookmark].bookmark = true;
      setRows(temp);
      await axios
        .post(`${databaseUrl}/api/editor/newgoal`, {
          user_id: user.id,
          name: savedTitile,
          data: temp[bookmark],
          link: snapshotLink,
        })
        .then((res) => {
          console.log(res);
          const temp = { ...user };
          const goals = [...user.goals, res.data];
          temp.goals = goals;
          setUser(temp);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`canvas ${
        height === true ? "mt-1" : " mt-10"
      } my mb-20 bg-white shadow-lg shadow-gray-300 h-fit py-10 px-12`}
      style={{ width: "1000px", minHeight: "230vh", position: "relative" }}
    >
      {/* Render rows */}
      {rows.map((row, index) => (
        <div key={index + 99978789} ref={(el) => (rowRefs.current[index] = el)}>
          <DropRow
            key={row.id || index}
            row={row}
            rows={rows}
            setRows={setRows}
            index={index}
            moveRowUp={moveRowUp}
            moveRowDown={moveRowDown}
            deleteRow={deleteRow}
            handleDropItem={handleDropItem}
            preview={preview}
            bookmark={bookmark}
            setBookmark={setBookmark}
            setSnapshotLink={setSnapshotLink}
            loading={loading}
            setLoading={setLoading}
            settings={settings}
            addEmptyRow={addEmptyRow}
            addInputRow={addInputRow}
            addTextRow={addTextRow}
            addHeadingRow={addHeadingRow}
            addDoublePara={addDoublePara}
            addImageAndParagraph={addImageAndParagraph}
            addImageRow={addImageRow}
            addBreakPoint={addBreakPoint}
            addTableRow={addTableRow}
            addCodeBlock={addCodeBlock}
            addLineSpace={addLineSpace}
            addDoubleImage={addDoubleImage}
          />
        </div>
      ))}
      {/* <button onClick={() => console.log(rows)}>Show data</button> */}
      {bookmark !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center p-4 z-[1000]">
          <div className="bg-white  rounded-lg shadow-xl w-[40%] min-h-[35%] flex flex-col relative pt-2">
            <div className="flex flex-col gap-2 items-center justify-center mt-4">
              <label
                className={`w-full flex items-start justify-start ml-16 font-semibold text-active_text `}
              >
                Content Title
              </label>
              <input
                type="text"
                value={savedTitile}
                onChange={(e) => setSavedTitle(e.target.value)}
                placeholder={`E.g. "Client Qoute", "Custom Staement" `}
                className="w-[90%] py-2 outline-none rounded-md px-3 border border-gray-300 hover:border-active_text focus:border-active_text text-sm"
              />
            </div>
            <div className="flex flex-col gap-2 items-center justify-center mt-4">
              <label
                className={`w-full flex items-start justify-start ml-16 font-semibold text-active_text `}
              >
                Content Discription
              </label>
              <textarea
                type="text"
                value={savedLabel}
                onChange={(e) => setSavedLabel(e.target.value)}
                placeholder="Briefly descibe the conetent block"
                className="w-[90%] h-28  text-sm py-2 outline-none rounded-md px-3 border border-gray-300 hover:border-active_text focus:border-active_text"
              />
            </div>
            <div className="w-full flex flex-row gap-4 items-end justify-end mb-3 mr-4 mt-4 pr-6">
              <button
                onClick={() => {
                  setBookmark(null);
                  setSavedTitle("");
                  setSavedLabel("");
                }}
                className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-md "
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleSavedModule();

                  setSavedTitle("");
                  setSavedLabel("");
                  setSnapshotLink("");
                  setBookmark(null);
                }}
                className="px-4 py-2 text-white bg-graidient_bottom hover:bg-opacity-90 rounded-md "
                disabled={loading}
              >
                {loading ? "please Wait" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropCanvas;
