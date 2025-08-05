import React, { useContext, useEffect, useState, useRef } from "react";
import logo from "../../assets/Logo.png";
import Header_editor from "../../assets/Header_editor.png";
import { CiSearch } from "react-icons/ci";
import { BsThreeDotsVertical } from "react-icons/bs";
import axios from "axios";
import { DatabaseContext } from "../../context/DatabaseContext";
import { useNavigate } from "react-router-dom";
import { GrUndo, GrRedo } from "react-icons/gr";
import { MdOutlineHistory } from "react-icons/md";
import { IoNotificationsOutline } from "react-icons/io5";
import { CiMobile1 } from "react-icons/ci";
import { RiComputerLine } from "react-icons/ri";
import { FaRegShareSquare } from "react-icons/fa";
import { IoIosCloudDone } from "react-icons/io";
import { RiLink } from "react-icons/ri";
import word from "../../assets/Word.png";
import pdf from "../../assets/Pdf.png";
import { BsPinAngle } from "react-icons/bs";
import { FaRegStar } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { LuLockKeyholeOpen } from "react-icons/lu";
import { LuLockKeyhole } from "react-icons/lu";
import { CgFileDocument } from "react-icons/cg";
import { Link } from "react-router-dom";
import GeneratePDF from "./GeneratePDF";
import JsonToWord from "./GenerateWord";
import { AiOutlineDownload } from "react-icons/ai";
import { GrDownload } from "react-icons/gr";
import { LiaUndoSolid } from "react-icons/lia";
import { LiaRedoSolid } from "react-icons/lia";
import { FiUnlock } from "react-icons/fi";
import { FiLock } from "react-icons/fi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { HiOutlineDevicePhoneMobile } from "react-icons/hi2";
import header_menu from "../../assets/header_menu.png";
import toast from "react-hot-toast";
import { LuPin } from "react-icons/lu";
import { LockOpen1Icon } from "@radix-ui/react-icons";
import { LockClosedIcon } from "@radix-ui/react-icons";
import { Undo, Redo } from "iconoir-react";
import { Icon } from "@iconify/react";
import editor_logo from "../../assets/editor_logo.svg";
import { BsPin } from "react-icons/bs";
import { StarIcon } from "@radix-ui/react-icons";
import { IoMdCloudDone } from "react-icons/io";
import { StateManageContext } from "../../context/StateManageContext";

const EditorHeader = ({
  rows,
  id,
  proposalName,
  share,
  setShare,
  menu,
  setMenu,
  parentRef,
  setMove,
  setRows,
  setPreview,
  preview,
  favorate,
  setFavorate,
  settings,
  createdAt,
}) => {
  const [saving, setSaving] = useState(false);
  const [isDisabledL, setIsDisabledL] = useState(false);
  const [isDisabledF, setIsDisabledF] = useState(false);
  const [headerName, setHeaderName] = useState(proposalName);
  const [notifiacations, setNotification] = useState(false);
  const [lock, setLock] = useState(false);
  const { databaseUrl } = useContext(DatabaseContext);
  const [copySuccess, setCopySuccess] = useState("");
  const navigate = useNavigate();
  const lockRef = useRef(null);
  const menuRef = useRef(null);
  const bellRef = useRef(null);
  const shareRef = useRef(null);
  // const [que, setQue] = useState([]);
  const [name, setName] = useState("");
  const [created, setCreated] = useState("");
  const [changing, setChanging] = useState(false);
  const [view, setView] = useState(true);
  const [tool, setTool] = useState(null);
  const { que, setQue, count, setCount } = useContext(StateManageContext);
  const date = new Date(createdAt);

  const day = String(date.getDate()).padStart(2, "0");
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  const formattedDate = `${day} ${month}-${year}`;
  const undo = () => {
    if (rows.length > 0) {
      const lastItem = rows[rows.length - 1];
      setRows(rows.slice(0, -1));
      setQue([...que, lastItem]);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "z") {
        event.preventDefault(); // prevent default undo behavior
        undo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const getDetails = async () => {
    try {
      const res = await axios.get(`${databaseUrl}/api/editor/details`, {
        params: { id: id },
      });
      console.log(res.data);
      setName(res.data.proposalName);
      setCreated(res.data.Users[0].fullName);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDetails();
  }, [id]);

  const redo = () => {
    if (que.length > 0) {
      const firstItem = que[que.length - 1]; // Get first element
      setQue(que.slice(0, -1)); // Remove the first item from secondArray
      setRows([...rows, firstItem]); // Add the first item to firstArray
    }
  };

  const handleGeneratePdf = () => {
    GeneratePDF(rows, settings);
  };

  const handleGenerateWord = () => {
    JsonToWord(rows);
  };

  const handleFavorate = async () => {
    try {
      setIsDisabledF(true);
      await axios.put(`${databaseUrl}/api/editor/favorate`, {
        id: id,
        favorate: favorate === true ? false : true,
      });
      if (favorate === false) {
        toast.success("Pinned!");
      } else {
        toast.success("Unpinned!");
      }
      setFavorate(!favorate);
      setMenu(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsDisabledF(false);
    }
  };

  const handleLocked = async (data) => {
    try {
      setIsDisabledL(true);
      await axios.put(`${databaseUrl}/api/editor/locked`, {
        id: id,
        preview: data,
      });
      setPreview(data);
      setLock(false);
    } catch (error) {
      console.log(error);
    } finally {
      if (data === true) {
        toast.success("locked!");
      } else {
        toast.success("Unlocked!");
      }
      setIsDisabledL(false);
    }
  };

  const handleLastSeen = async () => {
    try {
      await axios.put(`${databaseUrl}/api/editor/lastseen`, {
        id: id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleLastSeen();
  }, []);

  const handleClickOutsideLock = (event) => {
    if (lockRef.current && !lockRef.current.contains(event.target)) {
      setLock(false);
    }
  };
  const handleClickOutsideMenu = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenu(false);
    }
  };
  const handleClickOutsideBell = (event) => {
    if (bellRef.current && !bellRef.current.contains(event.target)) {
      setNotification(false);
    }
  };
  const handleClickOutsideShare = (event) => {
    if (shareRef.current && !shareRef.current.contains(event.target)) {
      setShare(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideLock);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideLock);
    };
  }, []);
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideMenu);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideMenu);
    };
  }, []);
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideShare);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideShare);
    };
  }, []);
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideBell);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideBell);
    };
  }, []);

  const handleCopy = () => {
    const baseUrl = window.location.origin; // dynamically gets the base URL
    const fullUrl = `${baseUrl}/#/view/${id}`;

    navigator.clipboard
      .writeText(fullUrl)
      .then(() => {
        setCopySuccess("Copied");
        setTimeout(() => setCopySuccess(""), 3000);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
        setCopySuccess("Failed to copy");
      });
  };

  const changeRename = async (value) => {
    try {
      await axios.post(`${databaseUrl}/api/editor/name`, {
        name: value,
        id: id,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setName(value);
    }
  };

  const updateProposal = async () => {
    try {
      if (rows.length !== 0) {
        setSaving(true);
        await axios.put(`${databaseUrl}/api/editor/updateProposal`, {
          id: id,
          rows: rows,
          settings: settings,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSaving(false);
      setCount(count + 1);
    }
  };
  const updateTimeout = useRef(null);

  const spanRef = useRef(null);
  const [inputWidth, setInputWidth] = useState(50); // initial width

  useEffect(() => {
    if (spanRef.current) {
      const spanWidth = spanRef.current.offsetWidth;
      setInputWidth(spanWidth + 20); // Add padding/margin buffer
    }
  }, [name]);

  useEffect(() => {
    // Clear any existing timeout when dependencies change
    if (updateTimeout.current) {
      clearTimeout(updateTimeout.current);
    }

    // Set a new timeout to wait 5 seconds after the last change
    updateTimeout.current = setTimeout(() => {
      updateProposal(); // Execute only once after rows/settings stop changing
      updateTimeout.current = null; // Reset reference after execution
    }, 3000);

    // Cleanup timeout when component unmounts
    return () => {
      if (updateTimeout.current) {
        clearTimeout(updateTimeout.current);
      }
    };
  }, [rows, settings]);
  return (
    <div className="w-full flex items-center justify-evenly h-[64px] px-7 border-b-[1px] border-gray-200 shadow-sm shadow-gray-300 be-vietnam-pro-regular relative ">
      {tool === "Manage sharing proposal" && (
        <div className=" absolute left-[65%] -bottom-2 px-2 bg-gray-600 text-white z-50 text-xs rounded-sm ">
          {tool}
        </div>
      )}
      {tool === "Undo" && (
        <div className=" absolute left-[65%] -bottom-1 px-2 bg-gray-600 text-white z-50 text-xs rounded-sm ">
          {tool}
        </div>
      )}
      {tool === "Redo" && (
        <div className=" absolute left-[68%] -bottom-1 px-2 bg-gray-600 text-white z-50 text-xs rounded-sm ">
          {tool}
        </div>
      )}
      {tool === "Notifications" && (
        <div className=" absolute left-[75%] -bottom-2 px-2 bg-gray-600 text-white z-50 text-xs rounded-sm ">
          {tool}
        </div>
      )}
      {tool === "More actions" && (
        <div className=" absolute left-[76%] -bottom-2 px-2 bg-gray-600 text-white z-50 text-xs rounded-sm ">
          Pin Document
        </div>
      )}
      {tool === "Preview document" && (
        <div className=" absolute left-[81%] -bottom-1 px-2 bg-gray-600 text-white z-50 text-xs rounded-sm ">
          {tool}
        </div>
      )}
      {tool === "Mobile view" && (
        <div className=" absolute left-[87%] -bottom-1 px-2 bg-gray-600 text-white z-50 text-xs rounded-sm ">
          {tool}
        </div>
      )}
      <div className="flex flex-row w-[50%] items-center justify-start gap-1 relative">
        <img
          onClick={() => navigate("/home")}
          src={editor_logo}
          alt="logo"
          onMouseEnter={() => setTool("Go to Dashboard")}
          onMouseLeave={() => setTool(null)}
          className="w-[40px] h-[30px] cursor-pointer relative -ml-[6px]"
        />
        {tool === "Go to Dashboard" && (
          <div className=" absolute -bottom-4 px-2 bg-gray-600 text-white z-50 text-xs rounded-sm ">
            {tool}
          </div>
        )}

        <div className="h-16 w-[1px] bg-gray-200 ml-[13px] z-50"></div>
        {/* <img
          src={Header_editor}
          alt="something"
          className="w-7 ml-[8px] cursor-pointer opacity-85"
        /> */}
        {/* <div className="w-7 h-7 ml-[8px] cursor-pointer bg-gray-100 rounded-md hover:bg-gray-200 flex items-center justify-center ">
          <img src={header_menu} />
        </div> */}

        <div className="flex flex-col ml-2 gap-[1px]">
          <div className="text-sm flex items-center justify-start">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={65}
              onFocus={() => setChanging(true)}
              onBlur={() => {
                setChanging(false);
                changeRename(name);
              }}
              style={{ width: `${inputWidth - 15}px` }}
              className="text-sm outline-none focus:border-b-[2px] focus:border-graidient_bottom focus:bg-hover_btn text-gray-800 "
            />
            {/* Hidden span to measure width */}
            <span
              ref={spanRef}
              className="absolute top-[-9999px] left-[-9999px] whitespace-pre text-sm font-normal"
            >
              {name || " "}
            </span>

            {saving ? (
              <p className="text-[9px] mt-[3px] text-graidient_bottom ml-[3px] ">
                Saving...
              </p>
            ) : (
              <IoMdCloudDone className="text-graidient_bottom w-[22px] h-[18px] ml-[3px]" />
            )}
          </div>
          <p className="text-[10px]  text-gray-400 rounded-lg w-fit cursor-default">
            By {created} · {formattedDate}
          </p>
        </div>
      </div>

      <div className="w-[60%] flex items-center justify-end gap-3">
        <button
          onClick={undo}
          className={` p-[7px] rounded-md ${
            rows.length > 0
              ? "bg-gray-200 hover:bg-graidient_bottom hover:text-white active:bg-gradient_darker"
              : "text-gray-400"
          }`}
          onMouseEnter={() => setTool("Undo")}
          onMouseLeave={() => setTool(null)}
        >
          <Undo className={`h-[19px] w-[19px]    `} />
        </button>
        <button
          onClick={redo}
          onMouseEnter={() => setTool("Redo")}
          onMouseLeave={() => setTool(null)}
          className={` p-[7px] rounded-md -ml-1.5 ${
            que.length > 0
              ? "bg-gray-200 hover:bg-graidient_bottom hover:text-white active:bg-gradient_darker"
              : "text-gray-400"
          }`}
        >
          <Redo className={`h-[19px] w-[19px] `} />
        </button>
        <div className="h-16 w-[1px] bg-gray-200 z-20 "></div>
        {/* <button>
          <MdOutlineHistory className="h-6 w-6 text-gray-500" />
        </button> */}
        <div className=" relative">
          <button
            className={`p-[7px] rounded-md text-gray-500 flex items-center justify-center ${
              preview
                ? "bg-graidient_bottom text-white hover:bg-hover_dark_btn"
                : " hover:bg-graidient_bottom hover:text-white"
            } ${isDisabledL ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={() => handleLocked(!preview)}
            onMouseEnter={() => setTool("Manage sharing proposal")}
            onMouseLeave={() => setTool(null)}
            disabled={isDisabledL}
          >
            {preview === true ? (
              <LockClosedIcon
                className={`h-[19px] w-[19px] ${preview ? "text-white " : ""} `}
              />
            ) : (
              <LockOpen1Icon className={`h-[19px] w-[19px]  `} />
            )}
          </button>
          {lock && (
            <div
              ref={lockRef}
              className="bg-white border border-gray-300  w-32 absolute z-10 rounded-lg flex flex-col items-center justify-center gap-1 top-9 right-20 px-3     py-2 shadow-gray-400 shadow-lg"
              style={{
                left: "50%",
                transform: "translate(-50%)",
              }}
            >
              <button
                onClick={() => handleLocked(true)}
                className={`text-sm w-full  flex gap-2 items-center justify-start  px-2 rounded-md ${
                  preview ? "bg-graidient_bottom text-white " : "bg-gray-100"
                } `}
              >
                <p className=" h-7 flex items-center justify-center gap-2 ">
                  <FiLock />
                  Locked
                </p>
              </button>
              <button
                onClick={() => handleLocked(false)}
                className={`text-sm flex gap-2 w-full items-center justify-start  px-2 rounded-md ${
                  preview === false
                    ? "bg-graidient_bottom text-white"
                    : "bg-gray-100"
                }  `}
              >
                <p className=" h-7 flex items-center justify-center gap-2 ">
                  <FiUnlock />
                  Unlocked
                </p>
              </button>
            </div>
          )}
        </div>

        {/* <button onClick={() => setMove(true)}>
          <CgFileDocument className="w-5 h-5 text-gray-500" />
        </button> */}
        <div className="relative">
          <button
            className={`p-[7px] text-gray-500 rounded-md flex items-center justify-center -ml-1 -mr-1  relative active:bg-gradient_darker ${
              notifiacations === true
                ? "bg-graidient_bottom text-white"
                : " hover:bg-graidient_bottom hover:text-white"
            } `}
            onClick={() => setNotification(!notifiacations)}
            onMouseEnter={() => setTool("Notifications")}
            onMouseLeave={() => setTool(null)}
          >
            {/* <div className="h-[6px] w-[6px] bg-graidient_bottom absolute top-[10px] right-[4px] rounded-[50%]"></div> */}
            <Icon
              icon="famicons:notifications-outline"
              className={`h-[19px] w-[19px]    ${
                notifiacations ? "text-white" : "hover:text-white "
              }`}
            />
          </button>
          {notifiacations && (
            <div
              ref={bellRef}
              className="bg-white border border-gray-100 p-5 w-[450px] absolute z-[6000] rounded-lg flex flex-col items-center justify-center gap-1 top-12 right-20    px-2 py-3 shadow-gray-400 shadow-lg"
              style={{
                left: "50%",
                transform: "translate(-50%)",
              }}
            >
              <div className="w-full pt-1 ">
                <h2 className="ml-3 font-semibold text-gray-600">
                  Notifications
                </h2>
              </div>
              {[1, 2, 3].map((item) => {
                return (
                  <div className="flex justify-between w-full mt-3 py-2  rounded-md">
                    <div className="w-[10%]  h-full flex items-start justify-center">
                      <div className="mt-2 w-1.5 h-1.5 rounded-[50%] bg-graidient_bottom"></div>
                    </div>
                    <div className="w-[90%]">
                      <p className="font-semibold text-gray-600 text-sm flex justify-between pr-7">
                        Proposal Sent Successfully!
                        <span
                          className="text-xs font-normal"
                          style={{
                            color: "rgba(140, 140, 140, 1)",
                          }}
                        >
                          02:00 pm
                        </span>
                      </p>
                      <p
                        className="w-[90%] text-xs  mt-2"
                        style={{
                          color: "rgba(140, 140, 140, 1)",
                        }}
                      >
                         Introducing Prospero’s AI Writing Assistant! Streamline
                        proposal creation with smart, AI-driven.
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="relative">
          <button
            ref={parentRef}
            className={`p-[7px] rounded-md text-gray-500  flex items-center justify-center  ${
              favorate === true
                ? "bg-graidient_bottom text-white hover:bg-hover_dark_btn"
                : "hover:bg-graidient_bottom hover:text-white"
            } ${isDisabledF ? "opacity-50 cursor-not-allowed" : ""} `}
            onMouseEnter={() => setTool("More actions")}
            onMouseLeave={() => setTool(null)}
            onClick={handleFavorate}
            disabled={isDisabledF}
          >
            <StarIcon
              className={`h-[19px] w-[19px]  ${
                favorate ? "text-white" : " hover:text-white"
              }`}
            />
          </button>
          {menu && (
            <div
              ref={menuRef}
              className="bg-white border border-gray-300  w-40 absolute z-10 rounded-lg flex flex-col items-center justify-center gap-1 top-9 right-20     py-3 shadow-gray-400 shadow-lg"
              style={{
                left: "50%",
                transform: "translate(-50%)",
              }}
            >
              <button
                onClick={handleFavorate}
                className={`text-sm  flex gap-2 items-center justify-start w-[90%] px-2 rounded-md ${
                  favorate && "bg-graidient_bottom text-white"
                }  hover:bg-graidient_bottom hover:text-white`}
              >
                <FaRegStar className="hover:text-white" />
                <p className=" h-7 flex items-center justify-center hover:text-white">
                  {!favorate ? "Add to favorite" : "Remove favorate"}
                </p>
              </button>
              <button
                onClick={() => setMenu(false)}
                className="text-sm flex gap-2 items-center justify-start w-[90%] px-2 rounded-md hover:bg-graidient_bottom hover:text-white "
              >
                <BsPinAngle className="hover:text-white" />
                <p className=" h-7 flex items-center justify-center hover:text-white">
                  Pin Document
                </p>
              </button>
              <div className="w-full bg-gray-200 h-[1px] mb-[-2px] "></div>
              {/* <button
                onClick={() => setMenu(false)}
                className="text-sm  flex gap-2 items-center justify-start w-[90%] pl-1 rounded-sm hover:bg-graidient_bottom hover:text-white"
              >
                <RiDeleteBin6Line className="hover:text-white" />
                <p className=" h-7 flex items-center justify-center  hover:text-white">
                  Delete Document
                </p>
              </button> */}
            </div>
          )}
        </div>

        <div className="h-16 w-[1px] bg-gray-200  z-20 "></div>
        <p
          onMouseEnter={() => setTool("Preview document")}
          onMouseLeave={() => setTool(null)}
          className="text-gray-500 cursor-pointer text-sm"
        >
          Preview
        </p>
        <button
          onClick={() => setView(true)}
          className={`p-[7px] rounded-md active:bg-gradient_darker ${
            view === true
              ? "bg-graidient_bottom text-white"
              : "bg-gray-100  hover:bg-gray-200"
          }`}
        >
          <RiComputerLine className="w-4 h-4 " />
        </button>
        <button
          onClick={() => setView(false)}
          onMouseEnter={() => setTool("Mobile view")}
          onMouseLeave={() => setTool(null)}
          className={`p-[7px] rounded-md ml-[-3px] ${
            view === false
              ? "bg-graidient_bottom text-white active:bg-gradient_darker"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          <HiOutlineDevicePhoneMobile className="w-4 h-4 " />
        </button>
        <div className="relative">
          <button
            onClick={() => {
              setShare(!share);
              setMenu(false);
            }}
            className="bg-footer_gradient_bot text-white px-4 rounded-md py-2 text-center text-sm flex gap-1 items-center justify-center hover:bg-graidient_bottom active:bg-gradient_darker"
          >
            <FaRegShareSquare className="w-3 h-3" />
            Share
          </button>
          {share && (
            <div
              ref={shareRef}
              className="bg-white border border-gray-300 p-5 w-80 absolute top-10 z-[6000] right-0 rounded-lg flex flex-col items-center justify-center gap-1 "
            >
              <h2 className="text-md font-bold">
                Share & Download Your Proposal
              </h2>
              <p className="w-[85%] text-xs text-center text-gray-400">
                Easily share your proposal link or download it in your preferred
                format.
              </p>
              <div className="border-[1px] w-[90%] rounded-md border-gray-200 flex items-center justify-between pl-2  gap-2 mt-2">
                <Link to={`/view/${id}`}>
                  <p className="text-xs text-blue-600">
                    http://localhost:5173/view
                  </p>
                </Link>
                <button
                  onClick={handleCopy}
                  className="relative flex items-center justify-center gap-1 text-graidient_bottom h-full px-2 py-2 text-sm rounded-r-md"
                  style={{
                    backgroundColor: "rgba(247, 231, 237, 1)",
                  }}
                >
                  {copySuccess ? copySuccess : "Copy"}
                  <RiLink className="w-4 h-4" />
                </button>
              </div>
              <div
                onClick={handleGenerateWord}
                className="relative border-[1px] rounded-md w-[90%] py-2 border-gray-200 flex items-center justify-start pl-2 cursor-pointer  gap-3 mt-2"
              >
                <img src={word} alt="no" />
                <a className="text-sm text-gray-500 ">Word Document</a>
                <GrDownload className=" absolute right-3 text-gray-400" />
              </div>
              <div
                onClick={handleGeneratePdf}
                className="relative border-[1px] rounded-md w-[90%] py-2 border-gray-200 flex items-center justify-start pl-2  gap-3 mt-2 cursor-pointer"
              >
                <img src={pdf} alt="no" />
                <a className="text-sm text-gray-500 ">PDF Document</a>
                <GrDownload className=" absolute right-3 text-gray-400" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditorHeader;
