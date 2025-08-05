import React, { useContext, useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import { useDrop } from "react-dnd";
import RichTextExample from "./Slate/RichTextExample";
import MyRichTextEditor from "./Slate/HeadingTextArea";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import Table from "./Slate/Table";
import CodeBlock from "./Slate/CodeBlock";
import CostModuleSlate from "./Slate/CostModuleSlate";
import SignRow from "./SignRow";

import Image from "./Slate/Image";
import ForDouble from "./Slate/ForDouble";
import { CiBookmark } from "react-icons/ci";
import { LuArrowUpToLine } from "react-icons/lu";
import { LuArrowDownToLine } from "react-icons/lu";
import { MdOutlineDeleteForever } from "react-icons/md";
import { FaBookmark } from "react-icons/fa";
import PriceTermSlate from "./Slate/PriceTermSlate";
import { StateManageContext } from "../../context/StateManageContext";
import CoverPageSlate from "./Slate/CoverPageSlate";
import { FiPlus } from "react-icons/fi";
import { MdOutlineDelete } from "react-icons/md";
import t_1 from "../../assets/t_1.svg";
import t_2 from "../../assets/t_2.svg";
import t_3 from "../../assets/t_3.svg";
import t_4 from "../../assets/t_4.svg";
import t_5 from "../../assets/t_5.svg";
import i_11 from "../../assets/i_11.svg";
import i_12 from "../../assets/i_12.svg";
import i_13 from "../../assets/i_13.svg";
import p_1 from "../../assets/p_1.svg";
import p_2 from "../../assets/p_2.svg";
import l_1 from "../../assets/l_1.svg";
import d_1 from "../../assets/d_1.svg";
import c_1 from "../../assets/c_1.svg";
import h_m from "../../assets/h_m.svg";
import p_m from "../../assets/p_m.svg";
import i_m from "../../assets/i_m.svg";
import t_m from "../../assets/t_m.svg";
import { FaRegBookmark } from "react-icons/fa6";
import { ImCancelCircle } from "react-icons/im";
import { LuBookmark } from "react-icons/lu";

const DropRow = ({
  row,
  rows,
  setRows,
  index,
  moveRowUp,
  moveRowDown,
  deleteRow,
  handleDropItem,
  preview,
  setBookmark,
  setSnapshotLink,
  setLoading,
  loading,
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
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "TEXT", // Accepts draggable text items
    drop: (item) => handleDropItem(index, item),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const [indexValue, setIndexValue] = useState(null);
  const [switchButton, setSwitchButtons] = useState(null);
  const divRef = useRef();
  const sideRef = useRef();
  const buttonRef = useRef();
  const quickRef = useRef();
  const quickButtonRef = useRef();

  const { setSign, setPriceTerms } = useContext(StateManageContext);
  const handleClickOutsideMenu = (event) => {
    if (
      sideRef.current &&
      !sideRef.current.contains(event.target) &&
      divRef.current &&
      !divRef.current.contains(event.target)
    ) {
      setSelected(null);
      setQuickAdd(false);
      setQuicHeading(false);
      setQuickPara(false);
      setQuickImg(false);
      setQuickTable(false);
    }
  };
  const handleClickQuick = (event) => {
    if (
      quickRef.current &&
      !quickRef.current.contains(event.target) &&
      quickButtonRef.current &&
      !quickButtonRef.current.contains(event.target)
    ) {
      setQuickAdd(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickQuick);
    return () => {
      document.removeEventListener("mousedown", handleClickQuick);
    };
  }, []);
  const handleClickOutsideMenuB = (event) => {
    if (
      buttonRef.current &&
      !buttonRef.current.contains(event.target) &&
      divRef.current &&
      !divRef.current.contains(event.target)
    ) {
      setSwitchButtons(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideMenuB);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideMenuB);
    };
  }, []);
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideMenu);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideMenu);
    };
  }, []);
  const handleUpload = async (file) => {
    if (!file) {
      alert("Please select an image first!");
      return;
    }

    const cloudName = "dojwaepbj"; // Replace with your Cloudinary cloud name
    const uploadPreset = "simple_quotes"; // Replace with your upload preset

    // Create FormData object
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      setLoading(true);

      // Upload image to Cloudinary
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const photo = await response.json();
      setSnapshotLink(photo.secure_url);
      console.log("Uploaded Image URL:", photo.secure_url);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  const captureImage = async (value) => {
    if (!divRef.current) return;

    // Step 1: Wait for all <img> elements inside divRef to fully load
    const images = divRef.current.querySelectorAll("img");
    const loadPromises = Array.from(images).map((img) => {
      if (img.complete) return Promise.resolve();
      return new Promise((resolve) => {
        img.onload = img.onerror = resolve;
      });
    });

    await Promise.all(loadPromises);

    // Step 2: Capture the div using html2canvas with cross-origin support
    html2canvas(divRef.current, {
      useCORS: true,
      allowTaint: false,
      scrollY: -window.scrollY, // optional, to avoid scroll-based artifacts
      backgroundColor: null, // preserve transparency
    }).then((canvas) => {
      // Step 3: Define crop and padding values
      let cropTop = 20;
      let cropBottom = 20;

      if (value === "table") {
        cropTop = 65; // custom crop for table
      }

      const cropLeftRight = 20;
      const padding = 55;
      const paddingHeight = 30;

      const croppedWidth = canvas.width - cropLeftRight * 2;
      const croppedHeight = canvas.height - cropTop - cropBottom;

      // Step 4: Create final canvas with padding and background
      const finalCanvas = document.createElement("canvas");
      finalCanvas.width = croppedWidth + padding * 2;
      finalCanvas.height = croppedHeight + paddingHeight * 2;

      const ctx = finalCanvas.getContext("2d");

      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);

      // Step 5: Draw cropped portion of original canvas into final canvas
      ctx.drawImage(
        canvas,
        cropLeftRight,
        cropTop,
        croppedWidth,
        croppedHeight,
        padding,
        paddingHeight,
        croppedWidth,
        croppedHeight
      );

      // Step 6: Convert final canvas to Blob and upload
      finalCanvas.toBlob(
        (blob) => {
          if (blob) {
            const file = new File([blob], "snapshot.jpg", {
              type: "image/jpeg",
            });
            handleUpload(file); // your upload function
          }
        },
        "image/jpeg",
        1
      );
    });
  };
  const [selected, setSelected] = useState(null);
  const [quickAdd, setQuickAdd] = useState(false);
  const [quickHeading, setQuicHeading] = useState(false);
  const [quickPara, setQuickPara] = useState(false);
  const [quickImg, setQuickImg] = useState(false);
  const [quickTable, setQuickTable] = useState(false);
  const headingBtnRef = useRef();
  const headingDropRef = useRef();

  const paraBtnRef = useRef();
  const paraDropRef = useRef();
  const imgBtnRef = useRef();
  const imgDropRef = useRef();
  const tableBtnRef = useRef();
  const tableDropRef = useRef();

  const handleClickOutsideDrop1 = (event) => {
    if (
      headingBtnRef.current &&
      !headingBtnRef.current.contains(event.target) &&
      headingDropRef.current &&
      !headingDropRef.current.contains(event.target)
    ) {
      setQuicHeading(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideDrop1);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideDrop1);
    };
  }, []);

  const handleClickOutsideDrop2 = (event) => {
    if (
      paraBtnRef.current &&
      !paraBtnRef.current.contains(event.target) &&
      paraDropRef.current &&
      !paraDropRef.current.contains(event.target)
    ) {
      setQuickPara(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideDrop2);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideDrop2);
    };
  }, []);
  const handleClickOutsideDrop3 = (event) => {
    if (
      imgBtnRef.current &&
      !imgBtnRef.current.contains(event.target) &&
      imgDropRef.current &&
      !imgDropRef.current.contains(event.target)
    ) {
      setQuickImg(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideDrop3);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideDrop3);
    };
  }, []);
  const handleClickOutsideDrop4 = (event) => {
    if (
      tableBtnRef.current &&
      !tableBtnRef.current.contains(event.target) &&
      tableDropRef.current &&
      !tableDropRef.current.contains(event.target)
    ) {
      setQuickTable(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideDrop4);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideDrop4);
    };
  }, []);

  return (
    <div
      ref={divRef}
      style={{
        width: row.type === "brake" ? "108.9%" : "98%",
        minHeight: row.type !== "cover" ? "30px" : "30px",
        marginBottom: "4px",
        marginLeft: row.type === "brake" ? "-45px" : "1%",
        marginRight: row.type === "brake" ? "0px" : "1%",
        marginTop:
          selected === index &&
          index === 0 &&
          preview !== true &&
          row.type !== "cover"
            ? "30px"
            : "4px",
        paddingBottom: selected === index ? "25px" : "0px",

        border:
          selected === index && preview !== true
            ? "1px dashed rgba(223 , 6 , 78 , 1)"
            : "none",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
      className={` ${
        row.type === "cover" ? "absolute top-0 left-0 " : "relative"
      }  bg-transparent `}
    >
      {/* Render row's content */}
      <div className="w-full">
        {row.type === "text" ? (
          <div
            style={{
              padding: "8px",
              backgroundColor: "lightyellow",
              border: "1px solid black",
            }}
          >
            {row.content || "Drag text here"}
          </div>
        ) : row.type === "input" ? (
          <div
            className="w-full transition-all duration-500 ease-out opacity-0 animate-fadeInforRow z-0 "
            onClick={() => setSelected(index)}
          >
            <RichTextExample
              index={index}
              indexValue={indexValue}
              setIndexValue={setIndexValue}
              onChange={(newData) => {
                const updatedContent = [...rows];
                updatedContent[index].content = newData;
                setRows(updatedContent);
              }}
              onTextColor={(newData) => {
                const updatedData = [...rows];
                updatedData[index].textColor = newData;
                setRows(updatedData);
              }}
              textColor={row.textColor ? row.textColor : "text-active_text"}
              data={row.content}
              preview={preview}
              settings={settings}
              selected={selected}
              setSelected={setSelected}
            />
          </div>
        ) : row.type === "heading" ? (
          <div
            className="w-full transition-all duration-500 ease-out opacity-0 animate-fadeInforRow z-0  "
            onClick={() => setSelected(index)}
          >
            <MyRichTextEditor
              index={index}
              indexValue={indexValue}
              setIndexValue={setIndexValue}
              onChange={(newData) => {
                const updatedContent = [...rows];
                updatedContent[index].content = newData;
                setRows(updatedContent);
              }}
              onSizeChange={(newData) => {
                const updatedData = [...rows];
                updatedData[index].size = newData;
                setRows(updatedData);
              }}
              onTextColor={(newData) => {
                const updatedData = [...rows];
                updatedData[index].textColor = newData;
                setRows(updatedData);
              }}
              textColor={row.textColor ? row.textColor : "text-active_text"}
              size={row.size}
              data={row}
              preview={preview}
              moveRowUp={moveRowUp}
              moveRowDown={moveRowDown}
              deleteRow={deleteRow}
              settings={settings}
              selected={selected}
              setSelected={setSelected}
            />
          </div>
        ) : row.type === "double-para" ? (
          <div
            className="w-full flex flex-row gap-4 transition-all duration-500 ease-out opacity-0 animate-fadeInforRow z-0  "
            onClick={() => setSelected(index)}
          >
            <div className="w-[50%]">
              <RichTextExample
                right={false}
                index={index}
                indexValue={indexValue}
                setIndexValue={setIndexValue}
                onChange={(newData) => {
                  const updatedContent = [...rows];
                  updatedContent[index].firstContent = newData;
                  setRows(updatedContent);
                }}
                data={row.firstContent}
                preview={preview}
                settings={settings}
                onTextColor={(newData) => {
                  const updatedData = [...rows];
                  updatedData[index].textColor = newData;
                  setRows(updatedData);
                }}
                selected={selected}
                textColor={row.textColor ? row.textColor : "text-active_text"}
                setSelected={setSelected}
              />
            </div>
            <div className="w-[50%]">
              <RichTextExample
                right={true}
                index={index}
                indexValue={indexValue}
                setIndexValue={setIndexValue}
                onChange={(newData) => {
                  const updatedContent = [...rows];
                  updatedContent[index].secondContent = newData;
                  setRows(updatedContent);
                }}
                data={row.secondContent}
                preview={preview}
                settings={settings}
                onTextColor={(newData) => {
                  const updatedData = [...rows];
                  updatedData[index].textColor = newData;
                  setRows(updatedData);
                }}
                selected={selected}
                textColor={row.textColor ? row.textColor : "text-active_text"}
                setSelected={setSelected}
              />
            </div>
          </div>
        ) : row.type === "image-para" ? (
          <div
            className="w-full flex flex-row  items-center mx-3 transition-all duration-500 ease-out opacity-0 animate-fadeInforRow z-0 "
            onClick={() => {
              setSelected(index);
              setSwitchButtons(index);
            }}
          >
            {row.align === undefined || row.align === "left" ? (
              <div className="w-full flex items-center justify-between ">
                <div className="w-[50%] mr-3">
                  <RichTextExample
                    double={true}
                    index={index}
                    indexValue={indexValue}
                    setIndexValue={setIndexValue}
                    onChange={(newData) => {
                      const updatedContent = [...rows];
                      updatedContent[index].content = newData;
                      setRows(updatedContent);
                    }}
                    data={row.content}
                    preview={preview}
                    className="relative"
                    settings={settings}
                    onTextColor={(newData) => {
                      const updatedData = [...rows];
                      updatedData[index].textColor = newData;
                      setRows(updatedData);
                    }}
                    selected={selected}
                    textColor={
                      row.textColor ? row.textColor : "text-active_text"
                    }
                    setSelected={setSelected}
                  />
                </div>

                {switchButton === index && preview !== true && (
                  <div
                    className={`w-[3px]          ${
                      row.height ? `h-[${row.height}px]` : "h-[200px]"
                    }  border-r-[1px]  border-dashed border-red-400 ml-2 relative z-[5]`}
                  >
                    <button
                      ref={buttonRef}
                      onClick={() => {
                        setSelected(index);
                        const updatedContent = [...rows];
                        updatedContent[index].align =
                          updatedContent[index].align === "left"
                            ? "right"
                            : "left";
                        setRows(updatedContent);
                      }}
                      className="absolute -right-3 z-50 p-1 border border-dashed text-graidient_bottom
                       border-red-400 bg-white rounded-[50%] hover:bg-graidient_bottom hover:text-white top-[47%] "
                    >
                      <HiOutlineSwitchHorizontal />
                    </button>
                  </div>
                )}
                <div className="w-[50%] pr-2 ">
                  <ForDouble
                    onWidth={(newData) => {
                      const updatedContent = [...rows];
                      updatedContent[index].width = newData;
                      setRows(updatedContent);
                    }}
                    onAliegn={(newData) => {
                      const updatedContent = [...rows];
                      updatedContent[index].aliegn = newData;
                      setRows(updatedContent);
                    }}
                    aliegn={row.aliegn ? row.aliegn : "center"}
                    width={row.width ? row.width : "50"}
                    index={index}
                    indexValue={indexValue}
                    setIndexValue={setIndexValue}
                    preview={preview}
                    data={row.ImageLink}
                    selected={selected}
                    onUpdate={(newData) => {
                      const updatedContent = [...rows];
                      updatedContent[index].ImageLink = newData;
                      setRows(updatedContent);
                    }}
                    onHeight={(newData) => {
                      const updatedContent = [...rows];
                      updatedContent[index].height = newData;
                      setRows(updatedContent);
                    }}
                    height={row.height ? row.height : "200"}
                    setSelected={setSelected}
                  />
                </div>
              </div>
            ) : (
              <div className="w-full flex items-center justify-between">
                <div className="w-[50%] -ml-3">
                  <ForDouble
                    onWidth={(newData) => {
                      const updatedContent = [...rows];
                      updatedContent[index].width = newData;
                      setRows(updatedContent);
                    }}
                    onAliegn={(newData) => {
                      const updatedContent = [...rows];
                      updatedContent[index].aliegn = newData;
                      setRows(updatedContent);
                    }}
                    aliegn={row.aliegn ? row.aliegn : "center"}
                    width={row.width ? row.width : "50"}
                    index={index}
                    indexValue={indexValue}
                    setIndexValue={setIndexValue}
                    preview={preview}
                    data={row.ImageLink}
                    onUpdate={(newData) => {
                      const updatedContent = [...rows];
                      updatedContent[index].ImageLink = newData;
                      setRows(updatedContent);
                    }}
                    onHeight={(newData) => {
                      const updatedContent = [...rows];
                      updatedContent[index].height = newData;
                      setRows(updatedContent);
                    }}
                    height={row.height ? row.height : "200"}
                    selected={selected}
                    setSelected={setSelected}
                  />
                </div>

                {switchButton === index && preview !== true && (
                  <div
                    className={`w-[3px]          ${
                      row.height ? `h-[${row.height}px]` : "h-[200px]"
                    }  border-r-[1px]  border-dashed border-red-400 mr-1 relative z-[5]`}
                  >
                    <button
                      ref={buttonRef}
                      onClick={() => {
                        setSelected(index);
                        const updatedContent = [...rows];
                        updatedContent[index].align =
                          updatedContent[index].align === "left"
                            ? "right"
                            : "left";
                        setRows(updatedContent);
                      }}
                      className="absolute -right-3 z-50 p-1 border border-dashed text-graidient_bottom
                       border-red-400 bg-white rounded-[50%] hover:bg-graidient_bottom hover:text-white top-[47%] "
                    >
                      <HiOutlineSwitchHorizontal />
                    </button>
                  </div>
                )}
                <div className="w-[48%] flex justify-end">
                  <RichTextExample
                    right={true}
                    index={index}
                    indexValue={indexValue}
                    setIndexValue={setIndexValue}
                    onChange={(newData) => {
                      const updatedContent = [...rows];
                      updatedContent[index].content = newData;
                      setRows(updatedContent);
                    }}
                    onTextColor={(newData) => {
                      const updatedData = [...rows];
                      updatedData[index].textColor = newData;
                      setRows(updatedData);
                    }}
                    textColor={
                      row.textColor ? row.textColor : "text-active_text"
                    }
                    data={row.content}
                    preview={preview}
                    selected={selected}
                    className="relative"
                    settings={settings}
                    setSelected={setSelected}
                  />
                </div>
              </div>
            )}
          </div>
        ) : row.type === "image" ? (
          <div
            className="w-full transition-all duration-500 ease-out opacity-0 animate-fadeInforRow z-0"
            onClick={() => setSelected(index)}
          >
            <Image
              data={row.content}
              onUpdate={(newData) => {
                const updatedContent = [...rows];
                updatedContent[index].content = newData;
                setRows(updatedContent);
              }}
              onHeight={(newData) => {
                const updatedContent = [...rows];
                updatedContent[index].height = newData;
                setRows(updatedContent);
              }}
              onWidth={(newData) => {
                const updatedContent = [...rows];
                updatedContent[index].width = newData;
                setRows(updatedContent);
              }}
              onAliegn={(newData) => {
                const updatedContent = [...rows];
                updatedContent[index].aliegn = newData;
                setRows(updatedContent);
              }}
              aliegn={row.aliegn ? row.aliegn : "center"}
              height={row.height ? row.height : "200"}
              width={row.width ? row.width : "50"}
              captionH={row.caption ? row.caption : ""}
              discription={row.discription ? row.discription : ""}
              onCaption={(value1, value2) => {
                const updatedContent = [...rows];
                updatedContent[index].caption = value1;
                updatedContent[index].discription = value2;
                setRows(updatedContent);
              }}
              index={index}
              indexValue={indexValue}
              setIndexValue={setIndexValue}
              preview={preview}
              selected={selected}
              settings={settings}
            />
          </div>
        ) : row.type === "brake" ? (
          <div
            className="w-[100%]    h-10 flex items-center justify-center   "
            onClick={() => setSelected(index)}
          >
            <div className="w-full h-4 text-xs text-gray-400 border-b border-dashed border-gray-400 text-center ">
              Page Break
            </div>
          </div>
        ) : row.type === "table" ? (
          <div
            className="w-full transition-all duration-500 ease-out opacity-0 animate-fadeInforRow z-0   "
            onClick={() => setSelected(index)}
          >
            <Table
              settings={settings}
              data={row.content}
              design={row.design}
              onUpdate={(newData) => {
                setRows((prevRows) => {
                  const updatedRows = [...prevRows];
                  updatedRows[index] = {
                    ...updatedRows[index],
                    content: newData,
                  };
                  return updatedRows;
                });
              }}
              textFormat={row.textFormat ?? "left"}
              onUpdateTextFormat={(newData) => {
                setRows((prevRows) => {
                  const updatedRows = [...prevRows];
                  updatedRows[index] = {
                    ...updatedRows[index],
                    textFormat: newData,
                  };
                  return updatedRows;
                });
              }}
              colAlign={row.colAlign ?? {}}
              onColAlign={(newData) => {
                setRows((prevRows) => {
                  const updatedRows = [...prevRows];
                  updatedRows[index] = {
                    ...updatedRows[index],
                    colAlign: newData,
                  };
                  return updatedRows;
                });
              }}
              boldAll={row.boldAll}
              onBold={(newData) => {
                setRows((prevRows) => {
                  const updatedRows = [...prevRows];
                  updatedRows[index] = {
                    ...updatedRows[index],
                    boldAll: newData,
                  };
                  return updatedRows;
                });
              }}
              underlineAll={row.underlineAll}
              onUnderline={(newData) => {
                setRows((prevRows) => {
                  const updatedRows = [...prevRows];
                  updatedRows[index] = {
                    ...updatedRows[index],
                    underlineAll: newData,
                  };
                  return updatedRows;
                });
              }}
              italicAll={row.italicAll}
              onItalic={(newData) => {
                setRows((prevRows) => {
                  const updatedRows = [...prevRows];
                  updatedRows[index] = {
                    ...updatedRows[index],
                    italicAll: newData,
                  };
                  return updatedRows;
                });
              }}
              index={index}
              indexValue={indexValue}
              setIndexValue={setIndexValue}
              preview={preview}
              selected={selected}
            />
          </div>
        ) : row.type === "cost" ? (
          <div
            className="w-full transition-all duration-500 ease-out opacity-0 animate-fadeInforRow z-0  "
            onClick={() => setSelected(index)}
          >
            <CostModuleSlate
              settings={settings}
              index={index}
              rows={row}
              selected={selected}
              preview={preview}
            />
          </div>
        ) : row.type === "code" ? (
          <div
            className="w-full transition-all duration-500 ease-out opacity-0 animate-fadeInforRow z-0   "
            onClick={() => setSelected(index)}
          >
            <CodeBlock
              index={index}
              rows={row}
              content={row.content}
              onChange={(newData) => {
                const updatedContent = [...rows];
                updatedContent[index].content = newData;
                setRows(updatedContent);
              }}
              preview={preview}
            />
          </div>
        ) : row.type === "sign" ? (
          <div
            className="w-full transition-all duration-500 ease-out opacity-0 animate-fadeInforRow z-0  "
            onClick={() => setSelected(index)}
          >
            <SignRow
              index={index}
              rows={row}
              content={row.content}
              onChange={(newData) => {
                const updatedContent = [...rows];
                updatedContent[index].content = newData;
                setRows(updatedContent);
              }}
              selected={selected}
              setSign={setSign}
            />
          </div>
        ) : row.type === "price" ? (
          <div
            className="w-full transition-all duration-500 ease-out opacity-0 animate-fadeInforRow z-0  "
            onClick={() => setSelected(index)}
          >
            <PriceTermSlate
              settings={settings}
              index={index}
              rows={row}
              selected={selected}
              preview={preview}
              onChangeHeading={(newData) => {
                const updatedContent = [...rows];
                updatedContent[index].heading = newData;
                setRows(updatedContent);
              }}
            />
          </div>
        ) : row.type === "cover" ? (
          <div
            className="w-full transition-all duration-500 ease-out opacity-0 animate-fadeInforRow z-0   "
            onClick={() => {
              setSelected(index);
            }}
          >
            <CoverPageSlate
              index={index}
              indexValue={indexValue}
              setIndexValue={setIndexValue}
              selected={selected}
              url={row.content}
              onChange={(newData) => {
                const updatedContent = [...rows];
                updatedContent[0].content = newData;
                setRows(updatedContent);
              }}
              darkness={row.dark ? row.dark : 0}
              onChangeDark={(newData) => {
                const updatedContent = [...rows];
                updatedContent[0].dark = newData;
                setRows(updatedContent);
              }}
              bright={row.bright ? row.bright : 0}
              onChangeBright={(newData) => {
                const updatedContent = [...rows];
                updatedContent[0].bright = newData;
                setRows(updatedContent);
              }}
              preview={preview}
              height={row.height ? row.height : 690}
              onChangeHeight={(newData) => {
                const updatedContent = [...rows];
                updatedContent[0].height = newData;
                setRows(updatedContent);
              }}
            />
          </div>
        ) : row.type === "double-image" ? (
          <div className="w-full flex items-center justify-between px-3 transition-all duration-500 ease-out opacity-0 animate-fadeInforRow z-0 ">
            <div className="w-[48%]">
              <ForDouble
                onWidth={(newData) => {
                  const updatedContent = [...rows];
                  updatedContent[index].width1 = newData;
                  setRows(updatedContent);
                }}
                onAliegn={(newData) => {
                  const updatedContent = [...rows];
                  updatedContent[index].aliegn1 = newData;
                  setRows(updatedContent);
                }}
                aliegn={row.aliegn1 ? row.aliegn1 : "center"}
                width={row.width1 ? row.width1 : "50"}
                index={index}
                indexValue={indexValue}
                setIndexValue={setIndexValue}
                preview={preview}
                data={row.ImageLink1}
                onUpdate={(newData) => {
                  const updatedContent = [...rows];
                  updatedContent[index].ImageLink1 = newData;
                  setRows(updatedContent);
                }}
                onHeight={(newData) => {
                  const updatedContent = [...rows];
                  updatedContent[index].height1 = newData;
                  setRows(updatedContent);
                }}
                height={row.height1 ? row.height1 : "200"}
                selected={selected}
                setSelected={setSelected}
              />
            </div>
            <div className="w-[48%]">
              <ForDouble
                onWidth={(newData) => {
                  const updatedContent = [...rows];
                  updatedContent[index].width2 = newData;
                  setRows(updatedContent);
                }}
                onAliegn={(newData) => {
                  const updatedContent = [...rows];
                  updatedContent[index].aliegn2 = newData;
                  setRows(updatedContent);
                }}
                aliegn={row.aliegn2 ? row.aliegn2 : "center"}
                width={row.width2 ? row.width2 : "50"}
                index={index}
                indexValue={indexValue}
                setIndexValue={setIndexValue}
                preview={preview}
                data={row.ImageLink2}
                onUpdate={(newData) => {
                  const updatedContent = [...rows];
                  updatedContent[index].ImageLink2 = newData;
                  setRows(updatedContent);
                }}
                onHeight={(newData) => {
                  const updatedContent = [...rows];
                  updatedContent[index].height2 = newData;
                  setRows(updatedContent);
                }}
                height={row.height2 ? row.height2 : "200"}
                selected={selected}
                setSelected={setSelected}
              />
            </div>
          </div>
        ) : (
          <div
            onClick={() => setSelected(index)}
            className="w-full h-[60px] flex items-center justify-center text-xs text-gray-500"
          >
            {selected === index && "Line Space"}
          </div>
        )}
      </div>

      {/* Row management buttons */}
      {selected === index && preview !== true && (
        <div
          className={`absolute -top-12 right-0 bg-white flex  gap-1 shadow-md shadow-gray-300 border border-gray-100 py-1 px-1  rounded-md z-10`}
          ref={sideRef}
          onClick={() => setIndexValue(index)}
        >
          <button
            onClick={() => {
              captureImage(row.type);
              setBookmark(index);
            }}
            disabled={!!row.bookmark}
            className={` bg-white flex items-center rounded-md justify-center px-2 py-2 ${
              row.bookmark ? "none" : "hover:bg-highlight"
            }   `}
          >
            {row.bookmark ? (
              <FaBookmark className="text-graidient_bottom" />
            ) : (
              <LuBookmark />
            )}
          </button>
          <button
            onClick={() => {
              if (row.type !== "cover") {
                moveRowUp(index);
                setSelected(index - 1);
              }
            }}
            className="  bg-white flex items-center justify-center px-2 py-2 hover:bg-highlight rounded-md"
          >
            <LuArrowUpToLine />
          </button>
          <button
            onClick={() => {
              if (row.type !== "cover") {
                moveRowDown(index);
                setSelected(index + 1);
              }
            }}
            className="  bg-white flex items-center justify-center px-2 py-2 hover:bg-highlight rounded-md"
          >
            <LuArrowDownToLine />
          </button>
          <button
            onClick={() => {
              if (row.type === "cover") {
                setRows((prevRows) => {
                  let updatedRows;

                  const digit = prevRows[0].template;

                  // Ensure digit is a number and valid
                  const removeCount =
                    typeof digit === "number" && digit > 0 ? digit : 1;

                  // Remove the first `digit` rows and prepend the new value
                  const remainingRows = prevRows.slice(removeCount);
                  updatedRows = [...remainingRows];

                  return updatedRows;
                });
              } else {
                deleteRow(index);
              }
            }}
            className="  bg-white flex items-center justify-center px-2 py-2 hover:bg-highlight rounded-md"
          >
            <MdOutlineDelete />
          </button>
        </div>
      )}

      {selected === index &&
      preview !== true &&
      row.type !== "cover" &&
      quickAdd !== true ? (
        <div
          ref={quickButtonRef}
          onClick={() => setQuickAdd(true)}
          className={`absolute -bottom-3.5 left-1/2 transform -translate-x-1/2 bg-white flex   border shadow-md shadow-gray-300 text-non_active_text items-center justify-center px-2 py-1 cursor-pointer z-50 text-sm rounded-md  border-gray-300 hover:border-gray-400 gap-1   ${
            quickAdd === true
              ? "bg-primary text-white hover:text-white"
              : "hover:text-heightlet_text"
          } `}
        >
          <FiPlus /> <p>Add Element</p>
        </div>
      ) : (
        quickAdd === true &&
        preview !== true &&
        selected === index && (
          <div
            ref={quickRef}
            className={`absolute -bottom-[22px] transform -translate-x-1/2 bg-white flex border shadow-md shadow-gray-300 text-non_active_text items-center justify-center px-2 cursor-pointer z-50 text-sm rounded  py-1 animate-fadeInforAdd gap-1 `}
          >
            <div className="relative">
              <button
                ref={headingBtnRef}
                onClick={() => {
                  // addHeadingRow("heading-one", selected + 1);
                  // setSelected(selected + 1);
                  // setQuickAdd(false);
                  setQuicHeading(true);
                }}
                className={` px-2 py-1 mx-1 flex items-center text-md hover:bg-highlight ${
                  quickHeading === true ? "bg-highlight" : "bg-white"
                } text-start rounded`}
              >
                <img src={h_m} alt="" className="mix-blend-multiply h-6 w-6" />
              </button>

              {quickHeading === true && (
                <div
                  ref={headingDropRef}
                  className=" absolute top-[100%] -left-1 flex flex-col bg-white px-1 py-1 gap-1 justify-center items-center border-b border-x border-gray-200 shadow-md shadow-gray-300 rounded rounded-b-md z-50  "
                >
                  <button
                    onClick={() => {
                      addHeadingRow("heading-one", selected + 1);
                      setSelected(selected + 1);
                      setQuickAdd(false);
                    }}
                    className="px-3 py-1.5 hover:bg-highlight rounded-md"
                  >
                    H1
                  </button>
                  <button
                    onClick={() => {
                      addHeadingRow("heading-two", selected + 1);
                      setSelected(selected + 1);
                      setQuickAdd(false);
                    }}
                    className="px-3  py-1.5 hover:bg-highlight rounded-md"
                  >
                    H2
                  </button>
                  <button
                    onClick={() => {
                      addHeadingRow("heading-three", selected + 1);
                      setSelected(selected + 1);
                      setQuickAdd(false);
                    }}
                    className="px-3  py-1.5 hover:bg-highlight rounded-md "
                  >
                    H3
                  </button>
                  <button
                    onClick={() => {
                      addHeadingRow("heading-four", selected + 1);
                      setSelected(selected + 1);
                      setQuickAdd(false);
                    }}
                    className="px-3  py-1.5 hover:bg-highlight rounded-md"
                  >
                    H4
                  </button>
                  <button
                    onClick={() => {
                      addHeadingRow("heading-five", selected + 1);
                      setSelected(selected + 1);
                      setQuickAdd(false);
                    }}
                    className="px-3  py-1.5 hover:bg-highlight rounded-md"
                  >
                    H5
                  </button>
                  <button
                    onClick={() => {
                      addHeadingRow("heading-six", selected + 1);
                      setSelected(selected + 1);
                      setQuickAdd(false);
                    }}
                    className="px-3  py-1.5 hover:bg-highlight rounded-md"
                  >
                    H6
                  </button>
                </div>
              )}
            </div>
            <div className="h-10 -my-1 w-[1px] bg-gray-200"></div>
            <div className="relative">
              <button
                onClick={() => {
                  // addInputRow(selected + 1);
                  // setSelected(selected + 1);
                  // setQuickAdd(false);
                  setQuickPara(true);
                }}
                ref={paraBtnRef}
                className={` flex items-center mx-1 px-2 py-1  hover:bg-highlight ${
                  quickPara === true ? "bg-highlight" : "bg-white"
                } text-start rounded`}
              >
                <img src={p_m} alt="" className="mix-blend-multiply h-6 w-6" />
              </button>
              {quickPara === true && (
                <div
                  ref={paraDropRef}
                  className=" absolute top-[101%] -left-2.5 w-16 flex flex-col bg-white px-1 py-1 gap-1 justify-center items-center border-b border-x border-gray-200 shadow-md shadow-gray-300 rounded rounded-b-md z-50 "
                >
                  <button
                    onClick={() => {
                      addInputRow(selected + 1);
                      setSelected(selected + 1);
                      setQuickAdd(false);
                    }}
                    className=" hover:bg-highlight rounded-md whitespace-nowrap"
                  >
                    <img src={p_1} alt="" className=" mix-blend-multiply" />
                  </button>
                  <button
                    onClick={() => {
                      addDoublePara(selected + 1);
                      setSelected(selected + 1);
                      setQuickAdd(false);
                    }}
                    className=" hover:bg-highlight rounded-md whitespace-nowrap"
                  >
                    <img src={p_2} alt="" className=" mix-blend-multiply" />
                  </button>
                </div>
              )}
            </div>
            {/* <button
              onClick={() => {
                addDoublePara(selected + 1);
                setSelected(selected + 1);
                setQuickAdd(false);
              }}
              className="py-1.5 w-full px-3 hover:bg-gray-100 text-start rounded"
            >
              Doble-Para
            </button> */}
            <div className="h-10 -my-1 w-[1px] bg-gray-200"></div>
            <div className="relative">
              <button
                ref={imgBtnRef}
                onClick={() => {
                  // addImageRow(selected + 1);
                  // setSelected(selected + 1);
                  // setQuickAdd(false);
                  setQuickImg(true);
                }}
                className={` flex items-center mx-1 px-2 py-1 hover:bg-highlight ${
                  quickImg === true ? "bg-highlight" : "bg-white"
                } text-start rounded`}
              >
                <img src={i_m} alt="" className="mix-blend-multiply h-6 w-6" />
              </button>
              {quickImg === true && (
                <div
                  ref={imgDropRef}
                  className=" absolute top-[101%] w-16 -left-0 flex flex-col bg-white px-1 py-1 gap-1 justify-center items-center border-b border-x border-gray-200 shadow-sm shadow-gray-300 rounded rounded-b-md z-50 "
                >
                  <button
                    onClick={() => {
                      addImageRow(selected + 1);
                      setSelected(selected + 1);
                      setQuickAdd(false);
                    }}
                    className=" hover:bg-highlight rounded-md whitespace-nowrap w-full flex items-center justify-center"
                  >
                    <img src={i_11} alt="" className=" mix-blend-multiply" />
                  </button>
                  <button
                    onClick={() => {
                      addImageAndParagraph(selected + 1);
                      setSelected(selected + 1);
                      setQuickAdd(false);
                    }}
                    className=" hover:bg-highlight rounded-md whitespace-nowrap"
                  >
                    <img src={i_13} alt="" className="mix-blend-multiply" />
                  </button>
                  <button
                    onClick={() => {
                      addDoubleImage(selected + 1);
                      setSelected(selected + 1);
                      setQuickAdd(false);
                    }}
                    className=" hover:bg-highlight rounded-md whitespace-nowrap"
                  >
                    <img src={i_12} alt="" className="mix-blend-multiply " />
                  </button>
                </div>
              )}
            </div>
            <div className="h-10 -my-1 w-[1px] bg-gray-200"></div>
            <div className="relative">
              <button
                ref={tableBtnRef}
                onClick={() => {
                  // addImageRow(selected + 1);
                  // setSelected(selected + 1);
                  // setQuickAdd(false);
                  setQuickTable(true);
                }}
                className={`  hover:bg-highlight mx-1 px-2 py-1 flex items-center ${
                  quickTable === true ? "bg-highlight" : "bg-white"
                } text-start rounded`}
              >
                <img src={t_m} alt="" className="mix-blend-multiply h-6 w-6" />
              </button>
              {quickTable === true && (
                <div
                  ref={tableDropRef}
                  className=" absolute top-[100%] -left-0  w-12 flex flex-col bg-white px-1 py-1 gap-1 justify-center items-center border-b border-x border-gray-200 shadow-sm shadow-gray-300 rounded rounded-b-md z-50 "
                >
                  <button
                    onClick={() => {
                      addTableRow("normal", selected + 1);
                      setSelected(selected + 1);
                      setQuickAdd(false);
                    }}
                    className=" hover:bg-highlight rounded-md"
                  >
                    <img src={t_1} alt="" className="mix-blend-multiply" />
                  </button>
                  <button
                    onClick={() => {
                      addTableRow("alternativerow", selected + 1);
                      setSelected(selected + 1);
                      setQuickAdd(false);
                    }}
                    className=" hover:bg-highlight rounded-md"
                  >
                    <img src={t_2} alt="" className="mix-blend-multiply" />
                  </button>
                  <button
                    onClick={() => {
                      addTableRow("alternativecol", selected + 1);
                      setSelected(selected + 1);
                      setQuickAdd(false);
                    }}
                    className=" hover:bg-highlight rounded-md"
                  >
                    <img src={t_3} alt="" className="mix-blend-multiply" />
                  </button>
                  <button
                    onClick={() => {
                      addTableRow("toprow", selected + 1);
                      setSelected(selected + 1);
                      setQuickAdd(false);
                    }}
                    className=" hover:bg-highlight rounded-md"
                  >
                    <img src={t_4} alt="" className="mix-blend-multiply" />
                  </button>
                  <button
                    onClick={() => {
                      addTableRow("leftcol", selected + 1);
                      setSelected(selected + 1);
                      setQuickAdd(false);
                    }}
                    className=" hover:bg-highlight rounded-md"
                  >
                    <img src={t_5} alt="" className="mix-blend-multiply " />
                  </button>
                </div>
              )}
            </div>
            {/* <button
              onClick={() => {
                addImageAndParagraph(selected + 1);
                setSelected(selected + 1);
                setQuickAdd(false);
              }}
              className="py-1.5 w-full px-3 hover:bg-gray-100 text-start rounded"
            >
              Image-Para
            </button> */}
            <div className="h-10 -my-1 w-[1px] bg-gray-200"></div>
            <button
              onClick={() => {
                addCodeBlock(selected + 1);
                setSelected(selected + 1);
                setQuickAdd(false);
              }}
              className=" px-3 py-1.5 hover:bg-highlight text-start rounded whitespace-nowrap flex items-center justify-center"
            >
              <img src={c_1} alt="" className="mix-blend-multiply " />
              Code
            </button>
            <div className="h-10 -my-1 w-[1px] bg-gray-200"></div>
            <button
              onClick={() => {
                addBreakPoint(selected + 1);
                setSelected(selected + 1);
                setQuickAdd(false);
              }}
              className="px-3 py-1.5 hover:bg-highlight text-start rounded whitespace-nowrap flex items-center justify-center gap-1"
            >
              <img src={d_1} alt="" className="mix-blend-multiply " />
              Divider
            </button>
            <div className="h-10 -my-1 w-[1px] bg-gray-200"></div>
            <button
              onClick={() => {
                addLineSpace(selected + 1);
              }}
              className=" px-3 py-1.5 hover:bg-highlight text-start rounded whitespace-nowrap flex items-center justify-center gap-1 mr-2"
            >
              <img src={l_1} alt="" className="mix-blend-multiply " /> Line
              Space
            </button>

            <button
              onClick={() => {
                setQuickAdd(false);
              }}
              className=" absolute top-0.5 right-0.5 text-non_active_text   hover:text-active_text text-start rounded"
            >
              <ImCancelCircle />
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default DropRow;
