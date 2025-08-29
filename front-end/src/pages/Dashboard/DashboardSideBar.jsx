import React, { useContext, useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { StateManageContext } from "../../context/StateManageContext";
import { GoHome } from "react-icons/go";
import { GoFileDirectory } from "react-icons/go";
import { FaRegFileLines } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiCirclePlus } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
import { UserContext } from "../../context/UserContext";
import Profile from "../../assets/profile.png";
import { FaUsers } from "react-icons/fa";
import { RiBillFill } from "react-icons/ri";
import { IoMdInformationCircle } from "react-icons/io";
import { IoLogOut } from "react-icons/io5";
import { FiPlusCircle } from "react-icons/fi";

const DashboardSideBar = ({ setBody }) => {
  const location = useLocation();

  const navigate = useNavigate();
  const isActive = (path) => location.pathname === path;
  const { newProposal, setNewProposal } = useContext(StateManageContext);
  const { user } = useContext(UserContext);
  const [settings, setSettings] = useState(false);
  const buttonRef = useRef();
  const blockRef = useRef();
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const Logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleClickOutside = (event) => {
    if (
      buttonRef.current &&
      !buttonRef.current.contains(event.target) &&
      blockRef.current &&
      !blockRef.current.contains(event.target)
    ) {
      setSettings(false);
    }
  };
  return (
    <div
      style={{
        boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.2)",
      }}
      className="h-[93vh] w-[210px] bg-white flex items-center justify-start flex-col relative"
    >
      <button
        onClick={() => setNewProposal(true)}
        className="bg-graidient_bottom text-white mb-42 mt-7 mx-2 w-[85%]  py-2.5 rounded-md flex shadow-lg  gap-2 items-center justify-center text-sm hover:bg-graidient_middle active:bg-gradient_darker "
      >
        <FiPlusCircle className="text-lg" /> New Proposal
      </button>
      <div className="flex flex-col gap-2 mt-4 items-center justify-center w-[85%] text-gray-500">
        <button
          onClick={() => navigate("/home")}
          className={`flex items-center justify-start py-2 px-3 rounded-md gap-3 text-start w-full
          hover:bg-gray-200 hover:text-active_text 
          ${isActive("/home") ? "bg-gray-200 text-active_text" : ""}`}
        >
          <span className="w-8 h-8 flex items-center justify-center bg-white shadow-md shadow-gray-300 rounded-lg">
            <GoHome className="w-5 h-5" />
          </span>
          Home
        </button>

        <button
          onClick={() => navigate("/workspaces")}
          className={`flex items-center justify-start py-2 px-3 rounded-md gap-3 text-start w-full
          hover:bg-gray-200 hover:text-active_text 
          ${isActive("/workspaces") ? "bg-gray-200 text-active_text" : ""}`}
        >
          <span className="w-8 h-8 flex items-center justify-center shadow-md shadow-gray-300 rounded-lg bg-white">
            <GoFileDirectory className="w-5 h-5" />
          </span>
          Workspaces
        </button>

        <button
          onClick={() => navigate("/proposals")}
          className={`flex items-center justify-start py-2 px-3 rounded-md gap-3 text-start w-full
          hover:bg-gray-200 hover:text-active_text 
          ${isActive("/proposals") ? "bg-gray-200 text-active_text" : ""}`}
        >
          <span className="w-8 h-8 flex items-center justify-center shadow-md shadow-gray-300 rounded-lg bg-white">
            <FaRegFileLines className="w-4 h-4" />
          </span>
          Proposals
        </button>

        <button
          onClick={() => navigate("/recycle")}
          className={`flex items-center justify-start py-2 px-3 rounded-md gap-3 text-start w-full
          hover:bg-gray-200 hover:text-active_text 
          ${isActive("/recycle") ? "bg-gray-200 text-active_text" : ""}`}
        >
          <span className="w-8 h-8 flex items-center justify-center shadow-md shadow-gray-300 rounded-lg bg-white">
            <RiDeleteBin6Line className="w-5 h-5" />
          </span>
          Recycle Bin
        </button>
      </div>

      <div className="flex flex-col gap-2 absolute bottom-5 w-full items-center">
        <button
          ref={buttonRef}
          onClick={() => setSettings(true)}
          className={`flex items-center justify-start py-2   gap-4 text-start w-[85%] hover:bg-gray-200 px-3 rounded-md ${
            settings === true ? "bg-gray-200" : "none"
          }`}
        >
          <span className="w-8 h-8 flex items-center justify-center  shadow-md shadow-gray-300 rounded-lg bg-white">
            <IoSettingsOutline className="w-4 h-5 " />
          </span>
          Settings
        </button>
        <button
          onClick={() => navigate("/profile")}
          className="flex items-center justify-start py-2 pl-7 gap-4 pr-2 text-start w-full "
        >
          <span
            className={`w-8 h-8 flex items-center justify-center  shadow-md shadow-gray-300 rounded-md`}
          >
            <img
              src={user.avatar ? user.avatar : Profile}
              className="w-7 h-7 rounded-[50%] text-gray-500 "
            />
          </span>
          <span className="w-[80%] overflow-hidden text-sm ">
            {user?.username}
          </span>
        </button>
      </div>
      {settings && (
        <div
          ref={blockRef}
          className="flex flex-col text-gray-500  absolute bottom-5 left-[99%] w-[85%] bg-white  rounded-md z-[50000] shadow-lg shadow-gray-200 text-xs"
        >
          <button
            onClick={() => navigate("/manage")}
            className="flex items-center justify-start py-2 pl-3 mt-2   text-start w-full hover:bg-gray-50 "
          >
            <span className="w-7 h-7 flex items-center justify-center  rounded-md">
              <FaUsers className="w-4 h-4 text-gray-600" />
            </span>
            Manage Users
          </button>
          <button
            onClick={() => navigate("/subscription")}
            className="flex items-center justify-start py-2 pl-3  text-start w-full hover:bg-gray-50 "
          >
            <span className="w-7 h-7 flex items-center justify-center  rounded-md">
              <RiBillFill className="w-4 h-4 text-gray-600" />
            </span>
            Subscription Details
          </button>
          <button
            onClick={() => navigate("/settings")}
            className="flex items-center justify-start py-2 pl-3   text-start w-full hover:bg-gray-50 "
          >
            <span className="w-7 h-7 flex items-center justify-center  rounded-md">
              <IoMdInformationCircle className="w-4 h-4 text-gray-600" />
            </span>
            General Settings
          </button>
          <button
            onClick={() => Logout()}
            className="flex items-center justify-start py-2 pl-3  text-start w-full  hover:bg-gray-50  mb-2"
          >
            <span className="w-7 h-7 flex items-center justify-center  rounded-md">
              <IoLogOut className="w-4 h-4 text-gray-600" />
            </span>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default DashboardSideBar;
