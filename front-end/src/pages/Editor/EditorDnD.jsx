import React, { useContext, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DropCanvas from "./DropCanvas";
import Sidebar from "./Sidebar";
import CostModule from "./CostModule";
import Signiture from "./Signiture";
import EditorHeader from "./EditorHeader";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { DatabaseContext } from "../../context/DatabaseContext";

import { RxCross2 } from "react-icons/rx";
import { FaAngleDown } from "react-icons/fa";
import copyPop from "../../assets/copyPop.png";
import PriceTerms from "./PriceTerms";
import { StateManageContext } from "../../context/StateManageContext";

const EditorDnD = () => {
  const { id } = useParams();
  const [rows, setRows] = useState([]);
  const [preview, setPreview] = useState(false);
  const [favorate, setFavorate] = useState(false);
  const [signEdit, setSignEdit] = useState(null);
  const [createdAt, setCreatedAt] = useState(null);
  const elementRef = useRef();
  const parentRef = useRef();
  const [selected, setSelected] = useState(null);
  const { databaseUrl } = useContext(DatabaseContext);
  const [dropCopy, setDropCopy] = useState(false);
  const [proposalName, setProposalName] = useState("");
  const [move, setMove] = useState(false);
  const [share, setShare] = useState(false);
  const [menu, setMenu] = useState(false);
  const [style, setStyle] = useState({
    headingTypography: "Ariel",
    paragrapghTypography: "Ariel",
    headingBorder: "none",
    codeTypography: "mono",
    codeBorder: "1px",
    marginTop: 1,
    marginBottom: 1,
    marginRight: 1,
    marginLeft: 1,
    pageColor: "white",
    TextColor: "black",
    BorderColor: "gray",
    tableStyle: "header_highlight",
    tableBorderThickness: 1,
  });
  const [settings, setSettings] = useState({
    heading: "arial",
    body: "arial",
    header: false,
    footer: false,
    color: "#9b9b9b",
    theme: 0,
  });
  const [active, setActive] = useState("elements");
  const {
    sign,
    setSign,
    priceTerms,
    setPriceTerms,
    costModule,
    setCostModeule,
    setUndo,
    setQue,
    historyPreview,
    setHistoryPreview,
  } = useContext(StateManageContext);

  useEffect(() => {
    getProposal();
  }, [id]);

  const getProposal = async () => {
    try {
      await axios
        .get(`${databaseUrl}/api/editor/getsingle`, {
          params: { id: id }, // Pass parameters correctly
        })
        .then((res) => {
          setProposalName(res.data.proposalName);
          console.log(res.data);
          setRows(res.data.data);
          setSettings(res.data.settings || settings);
          setFavorate(res.data.favorate);
          setPreview(res.data.locked);
          setCreatedAt(res.data.createdAt);

          setUndo((prevUndo) => [res.data.data]);
        });
    } catch (error) {
      console.log(error);
    }
  };

  // Add a row with text content
  const addTextRow = () => {
    setRows((prevRows) => [
      ...prevRows,
      { id: uuidv4(), type: "text", content: "", bookmark: false },
    ]);
  };
  const addHeadingRow = (value, index = null) => {
    if (index !== null && index >= 0 && index <= rows.length) {
      // Add at the specified index
      setRows((prevRows) => [
        ...prevRows.slice(0, index), // Rows before the index
        {
          id: uuidv4(),
          type: "heading",
          size: value,
          content: "",
          bookmark: false,
        },
        ...prevRows.slice(index), // Rows after the index
      ]);
    } else {
      // Add at the end
      setRows((prevRows) => [
        ...prevRows,
        {
          id: uuidv4(),
          type: "heading",
          size: value,
          content: "",
          bookmark: false,
        },
      ]);
    }
    setQue([]);
    setSelected("heading");
  };

  const addDoublePara = (index = null) => {
    if (index !== null && index >= 0 && index <= rows.length) {
      // Add at the specified index
      setRows((prevRows) => [
        ...prevRows.slice(0, index), // Rows before the index
        {
          id: uuidv4(),
          type: "double-para",
          firstContent: "",
          secondContent: "",
          bookmark: false,
        },
        ...prevRows.slice(index), // Rows after the index
      ]);
    } else {
      setRows((prevRows) => [
        ...prevRows,
        {
          id: uuidv4(),
          type: "double-para",
          firstContent: "",
          secondContent: "",
          bookmark: false,
        },
      ]);
    }
    setQue([]);
    setSelected("double");
  };
  const addImageAndParagraph = (index = null) => {
    if (index !== null && index >= 0 && index <= rows.length) {
      // Add at the specified index
      setRows((prevRows) => [
        ...prevRows.slice(0, index), // Rows before the index
        {
          id: uuidv4(),
          type: "image-para",
          content: "",
          ImageLink: "",
          height: "",
          width: "",
          align: "left",
          aliegn: "center",
          bookmark: false,
        },
        ...prevRows.slice(index), // Rows after the index
      ]);
    } else {
      setRows((prevRows) => [
        ...prevRows,
        {
          id: uuidv4(),
          type: "image-para",
          content: "",
          ImageLink: "",
          height: "",
          width: "",
          align: "left",
          aliegn: "center",
          bookmark: false,
        },
      ]);
    }
    setQue([]);
    setSelected("image_para");
  };

  const addDoubleImage = (index = null) => {
    if (index !== null && index >= 0 && index <= rows.length) {
      // Add at the specified index
      setRows((prevRows) => [
        ...prevRows.slice(0, index), // Rows before the index
        {
          id: uuidv4(),
          type: "double-image",
          ImageLink1: "",
          height1: "",
          width1: "",
          align1: "left",
          aliegn1: "center",
          ImageLink2: "",
          height2: "",
          width2: "",
          align2: "left",
          aliegn2: "center",
          bookmark: false,
        },
        ...prevRows.slice(index), // Rows after the index
      ]);
    } else {
      setRows((prevRows) => [
        ...prevRows,
        {
          id: uuidv4(),
          type: "double-image",
          ImageLink1: "",
          height1: "",
          width1: "",
          align1: "left",
          aliegn1: "center",
          ImageLink2: "",
          height2: "",
          width2: "",
          align2: "left",
          aliegn2: "center",
          bookmark: false,
        },
      ]);
    }
    setQue([]);
    setSelected("image_para");
  };

  // Add a row with input field
  const addInputRow = (index = null) => {
    if (index !== null && index >= 0 && index <= rows.length) {
      // Add at the specified index
      setRows((prevRows) => [
        ...prevRows.slice(0, index), // Rows before the index
        { id: uuidv4(), type: "input", content: "", bookmark: false },
        ...prevRows.slice(index), // Rows after the index
      ]);
    } else {
      setRows((prevRows) => [
        ...prevRows,
        { id: uuidv4(), type: "input", content: "", bookmark: false },
      ]);
    }
    setQue([]);
    setSelected("input");
  };
  const addImageRow = (index = null) => {
    if (index !== null && index >= 0 && index <= rows.length) {
      // Add at the specified index
      setRows((prevRows) => [
        ...prevRows.slice(0, index), // Rows before the index
        {
          id: uuidv4(),
          type: "image",
          content: "",
          height: "200",
          width: "50",
          aliegn: "center",
          caption: "",
          discription: "",
          bookmark: false,
        },
        ...prevRows.slice(index), // Rows after the index
      ]);
    } else {
      setRows((prevRows) => [
        ...prevRows,
        {
          id: uuidv4(),
          type: "image",
          content: "",
          height: "200",
          width: "50",
          aliegn: "center",
          caption: "",
          discription: "",
          bookmark: false,
        },
      ]);
    }
    setQue([]);
    setSelected("image");
  };

  const addCoverPage = (url) => {
    setRows((prevRows) => [
      {
        id: uuidv4(),
        type: "cover",
        content: url,
        bookmark: false,
        dark: 0,
        bright: 0,
        height: 690,
      },
      ...prevRows,
    ]);
    setSelected("cover");
  };
  const addLineSpace = (index) => {
    setRows((prevRows) => [
      ...prevRows.slice(0, index), // Rows before the index
      {
        id: uuidv4(),
        type: "line",
      },
      ...prevRows.slice(index), // Rows after the index
    ]);
    setQue([]);
  };

  const addBreakPoint = (index = null) => {
    if (index !== null && index >= 0 && index <= rows.length) {
      // Add at the specified index
      setRows((prevRows) => [
        ...prevRows.slice(0, index), // Rows before the index
        { id: uuidv4(), type: "brake", content: "", bookmark: false },
        ...prevRows.slice(index), // Rows after the index
      ]);
    } else {
      setRows((prevRows) => [
        ...prevRows,
        { id: uuidv4(), type: "brake", content: "", bookmark: false },
      ]);
    }
    setQue([]);
    setSelected("break");
  };

  // Add an empty row
  const addEmptyRow = () => {
    setRows((prevRows) => [
      ...prevRows,
      { id: uuidv4(), type: "empty", content: [], bookmark: false },
    ]);
  };

  const addTableRow = (design, index = null) => {
    const initialTable = Array.from({ length: 4 }, () =>
      Array.from({ length: 4 }, () => "")
    );
    const initialValues = Array.from({ length: 4 }, () =>
      Array.from({ length: 4 }, () => false)
    );

    if (index !== null && index >= 0 && index <= rows.length) {
      // Add at the specified index
      setRows((prevRows) => [
        ...prevRows.slice(0, index), // Rows before the index
        {
          id: uuidv4(),
          type: "table",
          design: design,
          content: initialTable,
          colAlign: {},
          boldAll: initialValues,
          underlineAll: initialValues,
          italicAll: initialValues,
          textFormat: "left",
          bookmark: false,
        },
        ...prevRows.slice(index), // Rows after the index
      ]);
    } else {
      setRows((prevRows) => [
        ...prevRows,
        {
          id: uuidv4(),
          type: "table",
          design: design,
          content: initialTable,
          colAlign: {},
          boldAll: initialValues,
          underlineAll: initialValues,
          italicAll: initialValues,
          textFormat: "left",
          bookmark: false,
        },
      ]);
    }
    setQue([]);
    setSelected("table");
  };

  const addCodeBlock = (index = null) => {
    if (index !== null && index >= 0 && index <= rows.length) {
      // Add at the specified index
      setRows((prevRows) => [
        ...prevRows.slice(0, index), // Rows before the index
        { id: uuidv4(), type: "code", content: "", bookmark: false },
        ...prevRows.slice(index), // Rows after the index
      ]);
    } else {
      setRows((prevRows) => [
        ...prevRows,
        { id: uuidv4(), type: "code", content: "", bookmark: false },
      ]);
    }
    setQue([]);
    setSelected("code");
  };
  const addSign = (data) => {
    setRows((prevRows) => [
      ...prevRows,
      { id: uuidv4(), type: "sign", content: data, bookmark: false },
    ]);
    setSign(false);
  };
  const addCostModule = (arr, options, values, heading) => {
    setRows((prevRows) => [
      ...prevRows,
      {
        id: "b66c7cdd-9b53-4eb5-a0e3-de7531e4c9cfesfewrf",
        type: "heading",
        size: "heading-two",
        content: [
          {
            type: "heading-two",
            align: "left",
            children: [
              {
                text: "Cost Module",
                bold: false,
              },
            ],
          },
        ],
        bookmark: false,
      },
      {
        id: uuidv4(),
        type: "cost",
        content: arr,
        options: options,
        bookmark: false,
        values: values,
        heading: heading,
      },
    ]);
    setQue([]);
    setCostModeule(false);
  };
  const addPriceTerms = (arr, options, heading) => {
    setRows((prevRows) => [
      ...prevRows,
      {
        id: "b66c7cdd-9b53-4eb5-a0e3-de7531e4c9cfwekjfhuw",
        type: "heading",
        size: "heading-two",
        content: [
          {
            type: "heading-two",
            align: "left",
            children: [
              {
                text: "Price Terms",
                bold: false,
              },
            ],
          },
        ],
        bookmark: false,
      },

      {
        id: uuidv4(),
        type: "price",
        content: arr,
        options: options,
        bookmark: false,
        heading: heading,
      },
    ]);
    setQue([]);
    setPriceTerms(false);
  };
  const dropCanvasRef = useRef(null);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-full  ">
        <EditorHeader
          share={share}
          setShare={setShare}
          rows={rows}
          id={id}
          proposalName={proposalName}
          menu={menu}
          setMenu={setMenu}
          parentRef={parentRef}
          setMove={setMove}
          move={move}
          setRows={setRows}
          setPreview={setPreview}
          preview={preview}
          setFavorate={setFavorate}
          favorate={favorate}
          settings={settings}
          createdAt={createdAt}
        />
      </div>

      <div
        className="bg-canvas_bg relative  "
        style={{ display: "flex", height: "calc(100vh - 65px)" }}
      >
        {move && (
          <div className="fixed inset-0 bg-opacity-40 flex justify-center bg-black items-center z-50">
            <div className="bg-white rounded-md border border-gray-300 w-[40%] relative flex flex-col ">
              <div className="w-full h-16 flex items-center justify-center ">
                <p className="font-bold">Move or Copy the Document</p>
                <div
                  onClick={() => setMove(false)}
                  className="absolute top-5 right-4  cursor-pointer"
                >
                  <RxCross2 className="font-bold w-6 h-6" />
                </div>
              </div>
              <div className="w-full flex items-center justify-center border-t  border-b border-gray-200 py-7 ">
                <div className="w-[70%] relative flex flex-col  ">
                  <p className="text-gray-500">Select Destination</p>
                  <div className="w-full flex items-center justify-between p-2 border border-gray-300 rounded-md mt-1 ml-[-3px] relative">
                    <img src={copyPop} alt="no" className="mx-2" />
                    <p className="w-full">Select The Destination</p>
                    <button
                      onClick={() => setDropCopy(!dropCopy)}
                      className=" p-1 rounded-[50%] bg-graidient_bottom text-white"
                    >
                      <FaAngleDown />
                    </button>

                    <div></div>
                  </div>
                  {dropCopy && (
                    <div className="w-full ml-[-2px] rounded-b-md flex flex-col   h-20 border border-gray-30 overflow-auto  ">
                      {[1, 2, 3, 4].map((item) => {
                        return (
                          <div className=" w-full px-3 py-2 border-b border-200 ">
                            <h1 className="text-black">Something</h1>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  <div className="mt-3 flex flex-row items-center justify-center w-[35%] gap-2 ">
                    <input type="checkbox" />
                    <p>Create a Copy</p>
                  </div>
                </div>
              </div>

              <div>
                <div className="mt-6 mb-5 mr-5 flex justify-end gap-4">
                  <button
                    onClick={() => setMove(false)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button className="px-4 py-2 bg-graidient_bottom text-white rounded-md hover:bg-shadow_Bottom">
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {costModule && (
          <CostModule
            addCostModule={addCostModule}
            rows={rows}
            setRows={setRows}
          />
        )}
        {priceTerms && (
          <PriceTerms
            addPriceTerms={addPriceTerms}
            setPriceTerms={setPriceTerms}
            rows={rows}
            setRows={setRows}
          />
        )}
        {sign && (
          <Signiture
            addSign={addSign}
            rows={rows}
            setRows={setRows}
            signEdit={signEdit}
            setSignEdit={setSignEdit}
          />
        )}

        {historyPreview !== null && (
          <div className="fixed inset-0 bg-opacity-40 flex justify-center bg-black items-center z-[10000000]">
            <div className="w-fit h-fit bg-white px-4 py-4 rounded-md transition-all duration-500 ease-out opacity-15 animate-fadeInforRow ">
              <div className="px-3 py-2 text-non_active_text">
                <p>History Preview</p>
              </div>
              <div
                className="flex justify-center overflow-y-auto h-[68vh] bg-white"
                style={{
                  flex: 1,
                  overflow: "auto",
                }}
                ref={dropCanvasRef}
              >
                <DropCanvas
                  rows={historyPreview}
                  settings={settings}
                  setRows={setHistoryPreview}
                  preview={true}
                  setSignEdit={setSignEdit}
                  dropCanvasRef={dropCanvasRef}
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
                  height={true}
                />
              </div>

              <div className="mt-4 mb-1 mr-2 flex justify-end gap-4">
                <button
                  onClick={() => setHistoryPreview(null)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-300 text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setRows(historyPreview);
                    setHistoryPreview(null);
                  }}
                  className="bg-footer_gradient_bot text-white px-4 rounded-md py-2 text-center text-sm flex gap-1 items-center justify-center hover:bg-hover_dark_btn active:bg-gradient_darker "
                >
                  Restore this version
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Sidebar with buttons */}
        <div
          style={{
            maxWidth: "400px",
            background: "rgba(255, 255, 255, 1)",
          }}
        >
          <Sidebar
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
            selected={selected}
            active={active}
            setActive={setActive}
            style={style}
            setStyle={setStyle}
            rows={rows}
            setRows={setRows}
            settings={settings}
            setSettings={setSettings}
            addCoverPage={addCoverPage}
            preview={preview}
            addDoubleImage={addDoubleImage}
          />
        </div>

        {/* Canvas Section */}
        <div
          className="flex justify-center overflow-y-auto"
          style={{
            flex: 1,
            overflow: "auto",
          }}
          ref={dropCanvasRef}
        >
          <DropCanvas
            rows={rows}
            settings={settings}
            setRows={setRows}
            preview={preview}
            setSignEdit={setSignEdit}
            dropCanvasRef={dropCanvasRef}
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
            height={false}
          />
        </div>
      </div>
    </DndProvider>
  );
};

export default EditorDnD;
