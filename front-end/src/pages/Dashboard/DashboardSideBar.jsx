import React, { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
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

const DashboardSideBar = ({ setBody }) => {
  const navigate = useNavigate();
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
    <div className="h-[93vh] w-[220px] bg-white flex items-center justify-start flex-col relative">
      <button
        onClick={() => setNewProposal(true)}
        className="bg-graidient_bottom text-white mb-42 mt-7 mx-2 w-[75%]  py-2 rounded-md flex shadow-lg  gap-1 items-center justify-center"
      >
        <CiCirclePlus /> New Proposal
      </button>
      <div className=" flex flex-col gap-2 mt-4 items-start justify-start w-[90%] text-gray-500">
        <button
          onClick={() => navigate("/home")}
          className="flex items-center justify-start py-2 px-5 gap-4 text-start w-full hover:bg-gray-200"
        >
          <span className="w-7 h-7 flex items-center justify-center  shadow-md shadow-gray-300 rounded-md">
            <GoHome className="w-5 h-5 text-gray-500" />
          </span>
          Home
        </button>
        <button
          onClick={() => navigate("/workspaces")}
          className="flex items-center justify-start py-2 px-5 gap-4 text-start w-full hover:bg-gray-200"
        >
          <span className="w-7 h-7 flex items-center justify-center  shadow-md shadow-gray-300 rounded-md">
            <GoFileDirectory className="w-4 h-4 text-gray-500" />
          </span>
          Workspaces
        </button>
        <button
          onClick={() => navigate("/proposals")}
          className="flex items-center justify-start py-2 px-5 gap-4 text-start w-full hover:bg-gray-200"
        >
          <span className="w-7 h-7 flex items-center justify-center  shadow-md shadow-gray-300 rounded-md">
            <FaRegFileLines className="w-4 h-4 text-gray-500" />
          </span>
          Proposals
        </button>

        <button
          onClick={() => navigate("/recycle")}
          className="flex items-center justify-start py-2 px-5 gap-4 text-start w-full hover:bg-gray-200"
        >
          <span className="w-7 h-7 flex items-center justify-center  shadow-md shadow-gray-300 rounded-md">
            <RiDeleteBin6Line className="w-4 h-5 text-gray-500" />
          </span>
          Recycle Bin
        </button>
      </div>

      <div className="flex flex-col gap-2 absolute bottom-5 w-full">
        <button
          ref={buttonRef}
          onClick={() => setSettings(true)}
          className="flex items-center justify-start py-2 pl-8  gap-4 text-start w-full "
        >
          <span className="w-7 h-7 flex items-center justify-center  shadow-md shadow-gray-300 rounded-md">
            <IoSettingsOutline className="w-4 h-5 text-gray-600" />
          </span>
          Settings
        </button>
        <button
          onClick={() => navigate("/profile")}
          className="flex items-center justify-start py-2 pl-8 gap-4 pr-2 text-start w-full "
        >
          <span className="w-8 h-8 flex items-center justify-center  shadow-md shadow-gray-300 rounded-md">
            <img
              src={user.avatar ? user.avatar : Profile}
              className="w-7 h-7 rounded-[50%] text-gray-500 "
            />
          </span>
          <span className="w-[80%] overflow-hidden">{user?.username}</span>
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
