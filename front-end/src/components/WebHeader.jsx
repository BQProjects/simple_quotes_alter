import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import Logo from "../assets/Web_logo.png";
import Arrow from "../assets/arraw.png";

const WebHeader = () => {
  const navigate = useNavigate();
  return (
    <div className=" py-3 w-full px-20 border border-[#ee0e0e0] flex h-fit  items-center justify-between fixed top-0 bg-gray-50 z-[5000] ">
      <div className=" w-[20%]  ">
        <img className="w-[80%] ml-7" src={Logo} alt="Logo" />
      </div>
      <div className="w-[60%] items-center flex gap-6 text-gray-500  ">
        <NavLink className="hover:font-bold" to="/">
          Home
        </NavLink>

        <NavLink className="hover:font-bold" to="/pricing">
          Pricing
        </NavLink>
        <NavLink className="hover:font-bold" to="/template">
          Templates
        </NavLink>
        <NavLink className="hover:font-bold" to="/contact">
          Contact Us
        </NavLink>
      </div>
      <div className="flex gap-4 w-[20%] items-center justify-end  mr-10">
        <button
          onClick={() => navigate("/login")}
          className="pl-3 pr-3 hidden lg:block pt-2 pb-2 text-gray-500 hover:font-bold"
        >
          Login
        </button>
        <Link to="/signup">
          <button className=" bg-white text-botton_white_text border-[1px] border-botton_white_text flex text-center py-3 px-4 items-center justify-center gap-2 rounded-md hover:bg-graidient_bottom hover:text-white">
            Start for free
          </button>
        </Link>
      </div>
    </div>
  );
};

export default WebHeader;
