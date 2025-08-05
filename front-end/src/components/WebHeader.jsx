import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import Logo from "../assets/Web_logo.png";
import Arrow from "../assets/arraw.png";

const WebHeader = () => {
  const navigate = useNavigate();
  return (
    <div className=" py-3 w-[95%] rounded-md border border-gray-200 flex h-fit  items-center justify-between fixed top-10 bg-white z-[5000]  ">
      <div className=" w-[20%]  ">
        <img className="w-[80%] ml-7" src={Logo} alt="Logo" />
      </div>
      <div className="w-[60%] items-center justify-center flex gap-6 text-gray-500  ">
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
          className="pl-3 pr-3 hidden lg:block pt-2 pb-2 bg-white text-botton_white_text border-[1px] border-botton_white_text rounded-md"
        >
          Login
        </button>
        <Link to="/signup">
          <button className="pl-3 pr-3 pt-2 pb-2 bg-botton_white_text border-[1px] border-botton_white_text rounded-md flex text-white">
            Try it free
            <img src={Arrow} alt="no" className="w-5 m-[2px]" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default WebHeader;
