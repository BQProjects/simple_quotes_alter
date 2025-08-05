import React from "react";
import Arrow from "../assets/arraw.png";
import Logo from "../assets/Web_logo.png";

const Footer = () => {
  return (
    <div className="w-full h-[30vh] flex flex-col justify-between px-10 py-7">
      <div className="w-full flex justify-center ">
        <div className="w-[45%] px-6 flex flex-col gap-3 ">
          <img src={Logo} alt="" className="w-36 -ml-5" />
          <p className="text-gray-500 text-sm">
            Simplify Proposals. Amplify Results.
          </p>
        </div>
        <div className="w-[45%] flex justify-between items-start ">
          <div className="flex flex-col gap-2">
            <h1>Legal </h1>
            <a className="mt-3 text-gray-500 text-sm">Privacy </a>
            <a className="text-gray-500 text-sm">Terms </a>
          </div>
          <div className="flex flex-col gap-2">
            <h1>Company</h1>
            <a className="mt-3 text-gray-500 text-sm">About us</a>
            <a className="text-gray-500 text-sm"> Contact us </a>
          </div>
          <div className="flex flex-col gap-2">
            <h1>Product</h1>
            <a className="mt-3 text-gray-500 text-sm">Pricing </a>
            <a className="text-gray-500 text-sm">Templates</a>
          </div>
          <div className="flex flex-col gap-2">
            <h1>Socials</h1>
            <a className="mt-3 text-gray-500 text-sm">Instagram </a>
            <a className="text-gray-500 text-sm">LinkedIn</a>
          </div>
        </div>
      </div>
      <div className="flex gap-6 text-sm">
        <p>© 2025 Simple Quest</p>
        <p>All rights reserved</p>
      </div>
    </div>
  );
};

export default Footer;
