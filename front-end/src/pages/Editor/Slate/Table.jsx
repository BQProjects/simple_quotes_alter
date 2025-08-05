import React, { useState, useRef, useEffect } from "react";
import {
  FaBold,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
} from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaItalic } from "react-icons/fa";
import { FaUnderline } from "react-icons/fa";
import table_add from "../../../assets/table_add.png";
import table_delete from "../../../assets/table_delete.png";
import tab_del from "../../../assets/tab_del.svg";
import tab_add from "../../../assets/tab_add.svg";
import { BsTextCenter } from "react-icons/bs";
import { BsTextRight } from "react-icons/bs";
import { BsTextLeft } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { HiOutlineTrash } from "react-icons/hi";
import { Icon } from "@iconify/react";

const Table = ({
  data,
  onUpdate,
  preview,
  textFormat,
  onUpdateTextFormat,
  design,
  index,
  setIndexValue,
  colAlign,
  onColAlign,
  boldAll,
  onBold,
  underlineAll,
  onUnderline,
  italicAll,
  onItalic,
  settings,
  selected,
}) => {
  const [show, setShow] = useState(false);

  const [rowIndexs, setRowIndex] = useState(null);
  const [colIndexs, setColIndex] = useState(null);
  const [col, setCol] = useState(null);
  const [row, setRow] = useState(null);
  const [alignH, setAlignH] = useState(false);
  const [rowH, setRowH] = useState(false);
  const [colH, setColH] = useState(false);
  const [alien, setAlign] = useState(textFormat);
  const [showAlign, setShowAlign] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const toolbarRef = useRef();
  const buttonRef = useRef();
  const alignRef = useRef();
  const deleteRef = useRef();

  const addRow = (index) => {
    const newRow = Array(data[0].length).fill("");
    const values = Array(data[0].length).fill(false);

    const newData = [...data.slice(0, index), newRow, ...data.slice(index)];

    const bolds = [...boldAll.slice(0, index), values, ...boldAll.slice(index)];
    const underlines = [
      ...underlineAll.slice(0, index),
      values,
      ...underlineAll.slice(index),
    ];
    const italics = [
      ...italicAll.slice(0, index),
      values,
      ...italicAll.slice(index),
    ];

    onUpdate(newData);
    onBold(bolds);
    onUnderline(underlines);
    onItalic(italics);
  };

  const handleClickOutsideMenu = (event) => {
    if (
      buttonRef.current &&
      !buttonRef.current.contains(event.target) &&
      toolbarRef.current &&
      !toolbarRef.current.contains(event.target)
    ) {
      setRowIndex(null);
      setColIndex(null);
      setShow(false);
    }
  };

  const handleClickOutsideAlign = (event) => {
    if (alignRef.current && !alignRef.current.contains(event.target)) {
      setShowAlign(false);
      setAlignH(false);
    }
  };
  const handleClickOutsideDelete = (event) => {
    if (deleteRef.current && !deleteRef.current.contains(event.target)) {
      setDeleteShow(false);
      setRowH(false);
      setColH(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideDelete);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideDelete);
    };
  }, []);
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideAlign);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideAlign);
    };
  }, []);
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideMenu);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideMenu);
    };
  }, []);

  const addColumn = (index) => {
    // Insert an empty column at the specified index for each row
    const newData = data.map((row) => [
      ...row.slice(0, index),
      "",
      ...row.slice(index),
    ]);

    // Insert a new column in each formatting array
    const bolds = boldAll.map((row) => [
      ...row.slice(0, index),
      false,
      ...row.slice(index),
    ]);

    const underlines = underlineAll.map((row) => [
      ...row.slice(0, index),
      false,
      ...row.slice(index),
    ]);

    const italics = italicAll.map((row) => [
      ...row.slice(0, index),
      false,
      ...row.slice(index),
    ]);

    // Update state
    onUpdate(newData);
    onBold(bolds);
    onUnderline(underlines);
    onItalic(italics);
  };

  const deleteRow = (rowIndex) => {
    const newData = data.filter((_, index) => index !== rowIndex);
    onUpdate(newData);
    //Need to do for bold and Italic
    const bold = boldAll.filter((_, index) => index !== rowIndex);
    onBold(bold);
    const underline = underlineAll.filter((_, index) => index !== rowIndex);
    onUnderline(underline);
    const italic = italicAll.filter((_, index) => index !== rowIndex);
    onItalic(italic);
  };

  const deleteColumn = (colIndex) => {
    // Remove the column from the data
    const newData = data.map((row) =>
      row.filter((_, index) => index !== colIndex)
    );
    onUpdate(newData);

    // Remove the column from boldAll, underlineAll, and italicAll
    const bold = boldAll.map((row) =>
      row.filter((_, index) => index !== colIndex)
    );
    onBold(bold);

    const underline = underlineAll.map((row) =>
      row.filter((_, index) => index !== colIndex)
    );
    onUnderline(underline);

    const italic = italicAll.map((row) =>
      row.filter((_, index) => index !== colIndex)
    );
    onItalic(italic);

    // Remove column alignment if it exists
    if (colAlign[colIndex] !== undefined) {
      const temp = [...colAlign]; // Create a copy to avoid mutation issues
      temp.splice(colIndex, 1); // Remove the colIndex entry
      onColAlign(temp);
    }
  };

  const getBackgroundColor = (value, colIndex, rowIndex) => {
    switch (value) {
      case "alternativerow":
        if (rowIndex % 2 === 0) {
          return "bg-gray-200";
        } else {
          return "bg-gray-100";
        }
      case "alternativecol":
        if (colIndex % 2 === 0) {
          return "bg-gray-200";
        } else {
          return "bg-gray-100";
        }
      case "toprow":
        if (rowIndex === 0) {
          return "bg-gray-200";
        } else {
          return "white";
        }
      case "leftcol":
        if (colIndex === 0) {
          return "bg-gray-200";
        } else {
          return "white";
        }
      default:
        return "white";
    }
  };

  return (
    <div
      className={` w-full flex items-center justify-center py-2 px-3   rounded-lg  font-${settings.body} `}
      style={{
        marginTop: selected === index ? "40px" : "10px",
      }}
      onFocus={() => {
        setIndexValue(index);
        setShow(true);
      }}
      onBlur={(e) => {
        // Prevent toolbar from hiding when interacting with the dropdowns
        if (
          toolbarRef.current &&
          toolbarRef.current.contains(e.relatedTarget)
        ) {
          e.preventDefault();
        } else {
          setIndexValue(null);
        }
      }}
    >
      {selected === index && preview !== true && (
        <div
          ref={toolbarRef}
          className="absolute top-0 left-[30%] flex gap-2 p-2 px-3 bg-white shadow-gray-300  shadow-lg rounded-md z-10"
        >
          <button onClick={() => addRow(row + 1)}>
            <Icon
              icon="ci:add-row"
              width="21"
              height="21"
              className="text-non_active_text rotate-180 ml-1"
            />
          </button>
          <button onClick={() => addRow(row)}>
            <Icon
              icon="ci:add-row"
              width="21"
              height="21"
              className="text-non_active_text ml-1"
            />
          </button>
          <div className="h-8 w-[1px]  bg-gray-300"></div>
          <button onClick={() => addColumn(col + 1)}>
            <Icon
              icon="ci:add-column"
              width="21"
              height="21"
              className="text-non_active_text rotate-180 ml-1"
            />
          </button>
          <button onClick={() => addColumn(col)}>
            <Icon
              icon="ci:add-column"
              width="21"
              height="21"
              className="text-non_active_text  ml-1"
            />
          </button>
          <div className="h-8 w-[1px]  bg-gray-300"></div>
          <button
            onClick={() => {
              const tempb = [...boldAll]; // Create a new array copy
              tempb[row] = [...tempb[row]]; // Create a new copy of the row
              tempb[row][col] = !tempb[row][col]; // Toggle the value
              onBold(tempb); // Update state
            }}
            className="px-1 py-1 text-sm"
          >
            <FaBold
              className={`${
                boldAll?.[row]?.[col] ? "text-black" : "text-non_active_text"
              }`}
            />
          </button>
          <button
            onClick={() => {
              const tempb = [...underlineAll]; // Create a new array copy
              tempb[row] = [...tempb[row]]; // Create a new copy of the row
              tempb[row][col] = !tempb[row][col]; // Toggle the value
              onUnderline(tempb);
            }}
            className="px-1 py-1 text-sm"
          >
            <FaUnderline
              className={`${
                underlineAll?.[row]?.[col]
                  ? "text-black "
                  : "text-non_active_text"
              } mt-[2px]`}
            />
          </button>
          <button
            onClick={() => {
              const tempb = [...italicAll]; // Create a new array copy
              tempb[row] = [...tempb[row]]; // Create a new copy of the row
              tempb[row][col] = !tempb[row][col]; // Toggle the value
              onItalic(tempb);
            }}
            className="px-1 py-1 text-sm"
          >
            <FaItalic
              className={`${
                italicAll?.[row]?.[col] ? "text-black" : "text-non_active_text"
              } `}
            />
          </button>
          <div className="h-8 w-[1px] bg-gray-300"></div>
          <div
            onClick={() => setShowAlign(!showAlign)}
            className="px-1 py-1 flex items-center justify-center relative"
          >
            <BsTextLeft className="text-lg" />
            <IoIosArrowDown className="text-xs " />
            {showAlign && (
              <div
                ref={alignRef}
                className="flex absolute top-10 px-2 py-1 rounded-sm flex-col  items-center justify-center gap-3 bg-white z-50 "
              >
                <button
                  onMouseEnter={() => setAlignH(true)}
                  onMouseLeave={() => setAlignH(false)}
                  onClick={() => {
                    if (col !== null) {
                      const temp = colAlign;
                      temp[col] = "left";
                      setAlignH(false);
                      onColAlign(temp);
                    } else {
                      setAlign("left");
                      onUpdateTextFormat("left");
                    }
                  }}
                  className={`px-1 py-1 text-xl  ${
                    colAlign[col] === undefined || colAlign[col] === "left"
                      ? "bg-gray-200"
                      : "bg-white"
                  }`}
                >
                  <BsTextLeft />
                </button>
                <button
                  onMouseEnter={() => setAlignH(true)}
                  onMouseLeave={() => setAlignH(false)}
                  onClick={() => {
                    if (col !== null) {
                      const temp = colAlign;
                      temp[col] = "center";
                      setAlignH(false);
                      onColAlign(temp);
                    } else {
                      setAlign("center");
                      onUpdateTextFormat("center");
                    }
                  }}
                  className={`px-1 py-1 text-xl  ${
                    colAlign[col] !== undefined && colAlign[col] === "center"
                      ? "bg-gray-200"
                      : "bg-white"
                  } `}
                >
                  <BsTextCenter />
                </button>
                <button
                  onMouseEnter={() => setAlignH(true)}
                  onMouseLeave={() => setAlignH(false)}
                  onClick={() => {
                    if (col !== null) {
                      const temp = colAlign;
                      temp[col] = "right";
                      setAlignH(false);
                      onColAlign(temp);
                    } else {
                      setAlign("right");
                      onUpdateTextFormat("right");
                    }
                  }}
                  className={`px-1 py-1 text-xl  ${
                    colAlign[col] !== undefined && colAlign[col] === "right"
                      ? "bg-gray-200"
                      : "bg-white"
                  } `}
                >
                  <BsTextRight />
                </button>
              </div>
            )}
          </div>
          <div className="relative flex items-center justify-center">
            {/* <button
              onClick={() => {
                // if (colIndexs) {
                //   deleteColumn(colIndexs - 1);
                // } else {
                //   deleteRow(rowIndexs);
                // }
                setDeleteShow(!deleteShow);
              }}
              className=" relative px-1 py-[1px] text-md "
            >
              <HiOutlineTrash className="text-gray-500" />
            </button> */}
            <div className="h-8 w-[1px]  bg-gray-300"></div>
            <button
              onMouseEnter={() => {
                setColH(true);
              }}
              onMouseLeave={() => {
                setColH(false);
              }}
              onClick={() => deleteColumn(col)}
            >
              <Icon
                icon="ci:delete-column"
                width="21"
                height="21"
                className="text-non_active_text  ml-1"
              />
            </button>
            <button
              onMouseEnter={() => {
                setRowH(true);
              }}
              onMouseLeave={() => {
                setRowH(false);
              }}
              onClick={() => deleteRow(row)}
            >
              <Icon
                icon="ci:delete-row"
                width="21"
                height="21"
                className="text-non_active_text  ml-1"
              />
            </button>
          </div>
        </div>
      )}

      <table
        className="w-[100%] border-collapse relative table-auto text-active_text "
        ref={buttonRef}
        onFocus={() => setShow(true)}
      >
        <thead>
          <tr>
            {data[0].map((_, colIndex) => (
              <td key={colIndex} className="relative text-center">
                {/* Delete Icon for Columns */}
                <div className="relative h-0">
                  <button
                    className={`absolute -top-6 left-1/2 transform -translate-x-1/2 hidden
                      text-red-500 bg-white shadow-gray-400 p-[4px] rounded-md shadow-md hover:bg-graidient_bottom hover:text-white`}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering parent click
                      deleteColumn(colIndex - 1);
                    }}
                  >
                    <RiDeleteBin6Line className="w-4 h-4" />
                  </button>
                </div>
                {/* Clickable Top Border */}
                {colIndex !== 0 && (
                  <div className=" rounded-t-md  cursor-pointer h-1" />
                )}
              </td>
            ))}
            {/* Extra Column Handling */}
            <td key={data[0].length} className="relative text-center">
              <div className="relative h-0">
                <button
                  className={`absolute -top-6 left-1/2 transform -translate-x-1/2 hidden text-red-500 bg-white shadow-gray-400 p-[4px] rounded-md shadow-md hover:bg-graidient_bottom hover:text-white`}
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteColumn(data[0].length - 1);
                  }}
                >
                  <RiDeleteBin6Line className="w-4 h-4" />
                </button>
              </div>
              <div className=" rounded-t-md cursor-pointer h-1" />
            </td>
          </tr>
        </thead>
        <tbody>
          {data.map((rows, rowIndex) => (
            <tr key={rowIndex}>
              <td className="relative">
                {/* Delete Icon for Rows */}
                <div className="relative w-0">
                  <button
                    className={`absolute -left-8 top-4 transform -translate-y-1/2 hidden text-red-500 bg-white shadow-gray-400 p-[4px] rounded-md shadow-md hover:bg-graidient_bottom hover:text-white`}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering parent click
                      deleteRow(rowIndex);
                    }}
                  >
                    <RiDeleteBin6Line className="w-4 h-4" />
                  </button>
                </div>
                {/* Clickable Left Border */}
                <div
                  className=" rounded-l-md  cursor-pointer w-0 h-11 "
                  // Set row index
                />
              </td>
              {rows.map((cell, colIndex) => (
                <td
                  key={colIndex}
                  className={`text-center relative ${
                    rowIndex === rowIndexs ||
                    colIndex === colIndexs - 1 ||
                    (alignH === true && col === colIndex) ||
                    (rowH === true && row === rowIndex) ||
                    (colH === true && col === colIndex)
                      ? "bg-red-100"
                      : getBackgroundColor(design, colIndex, rowIndex)
                  } border-[2px] border-gray-400`}
                >
                  {preview ? (
                    <p>{cell}</p>
                  ) : (
                    <textarea
                      ref={(el) => {
                        if (el) {
                          el.style.height = "auto";
                          el.style.height = `${el.scrollHeight}px`;
                        }
                      }}
                      value={cell}
                      onFocus={() => {
                        setCol(colIndex);
                        setRow(rowIndex);
                      }}
                      onChange={(e) => {
                        const newData = [...data];
                        newData[rowIndex][colIndex] = e.target.value;
                        onUpdate(newData);
                      }}
                      className={`w-full resize-none p-1
                     ${
                       rowIndex === rowIndexs ||
                       colIndex === colIndexs - 1 ||
                       (alignH === true && col === colIndex) ||
                       (rowH === true && row === rowIndex) ||
                       (colH === true && col === colIndex)
                         ? "bg-red-100"
                         : getBackgroundColor(design, colIndex, rowIndex)
                     }
                     ${
                       colAlign[colIndex] === "center"
                         ? "text-center"
                         : colAlign[colIndex] === "right"
                         ? "text-end"
                         : "text-start"
                     }
                     ${
                       boldAll?.[rowIndex]?.[colIndex]
                         ? "font-extrabold"
                         : "font-normal"
                     }
                     ${italicAll?.[rowIndex]?.[colIndex] ? "italic" : ""}
                     ${underlineAll?.[rowIndex]?.[colIndex] ? "underline" : ""}
                     focus:outline-none overflow-hidden
                   `}
                      rows={1}
                      onInput={(e) => {
                        e.target.style.height = "auto";
                        e.target.style.height = `${e.target.scrollHeight}px`;
                      }}
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
