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
import { HiTemplate } from "react-icons/hi";

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
          onClick={() => navigate("/templates")}
          className={`flex items-center justify-start py-2 px-3 rounded-md gap-3 text-start w-full
          hover:bg-gray-200 hover:text-active_text 
          ${isActive("/templates") ? "bg-gray-200 text-active_text" : ""}`}
        >
          <span className="w-8 h-8 flex items-center justify-center shadow-md shadow-gray-300 rounded-lg bg-white">
            <HiTemplate className="w-4 h-4" />
          </span>
          Templates
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
          onClick={() => navigate("/Settings")}
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
    </div>
  );
};

export default DashboardSideBar;
