import React, { useContext } from "react";
import Logo from "../../assets/Web_logo.png";
import { CiSearch } from "react-icons/ci";
import { IoNotificationsOutline } from "react-icons/io5";
import { UserContext } from "../../context/UserContext";

const DashboardHeader = () => {
  const { user } = useContext(UserContext);
  return (
    <div className="h-[7vh] w-full flex items-center justify-between shadow-lg shadow-gray-200 border-b border-gray-200">
      <div className=" w-[15%]  ">
        <img className="w-[75%] ml-2" src={Logo} alt="Logo" />
      </div>
      <div className="w-[30%] flex items-center justify-center text-gray-600 ml-[15%]">
        <div className=" flex items-center border-[1px] rounded-lg border-gray-300 w-[90%] bg-gray-100">
          <CiSearch className="w-10 text-gray-600  " />
          <input
            type="text"
            placeholder="Search for proposal..."
            className="pr-6 py-1 bg-gray-100 text-sm  "
            style={{ outline: "none" }}
          />
        </div>
      </div>
      <div className="w-[30%] flex items-center justify-end gap-3 mr-10 ">
        {" "}
        <button className=" relative bg-gray-200  p-1 rounded-[50%] mr-1">
          <div className="h-[6px] w-[6px] bg-graidient_bottom absolute top-[4px] right-[4px] rounded-[50%]"></div>
          <IoNotificationsOutline className={`h-5 w-5  text-gray-500 `} />
        </button>
        <button className="bg-graidient_bottom bg-opacity-90 text-white px-2 py-1 rounded-[10%] hover:bg-opacity-100 text-sm mr-2">
          Upgrade
        </button>
        {/* <div className="flex items-center justify-center gap-2 text-gray-500">
          <div className="bg-gray-600 text-white p-1 px-2 rounded-[50%] text-xs border-2 border-green-500">
            {user?.username[0]}
          </div>
          {user.username}
        </div> */}
      </div>
    </div>
  );
};

export default DashboardHeader;
