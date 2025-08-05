import React from "react";
import WebHeader from "../../components/WebHeader";
import Footer from "../../components/Footer";
import home_8 from "../../assets/home_8.jpg";
import { FaArrowRight } from "react-icons/fa";
import template_1 from "../../assets/template_1.png";
import { useNavigate } from "react-router-dom";

const Template = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="w-full  block overflow-y-scroll be-vietnam-pro-regular">
        <div className="w-full mt-5 flex justify-center">
          <WebHeader />
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-center mt-32 text-gray-700 be-vietnam-pro-regular">
        <h1 className="text-4xl ">READY-MADE</h1>
        <h1 className="text-4xl be-vietnam-pro-regular">PROPOSAL TEMPLATES</h1>
        <h2 className="text-gray-500 mt-7">
          Browse clean, professional templates to kickstart your proposal.
        </h2>
        <button
          onClick={() => navigate("/signup")}
          className=" bg-white text-botton_white_text border-[1px] border-botton_white_text flex text-center py-3 px-4 items-center justify-center gap-2 rounded-md mt-5 hover:bg-graidient_bottom hover:text-white "
        >
          Get Started for Free
          <FaArrowRight />
        </button>
        <p className="mt-2 text-sm text-gray-400">
          Experience 14 days free – no upfront payment
        </p>
      </div>
      <div className="w-full mt-14 flex flex-col items-center justify-center ">
        <img src={template_1} alt="" />
        <button className="mt-4 text-sm flex items-center justify-center cursor-pointer text-gray-600 gap-2 ">
          Load More <FaArrowRight />
        </button>
      </div>
      <div className="w-full mt-14 flex flex-col items-center ">
        <div className="relative w-[90%] h-[30vh] rounded-md flex items-center justify-center text-center overflow-hidden">
          {/* Background with opacity */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-50"
            style={{
              backgroundImage: `url(${home_8})`,
            }}
          ></div>

          {/* Content layer (fully opaque) */}
          <div className="relative z-10 flex flex-col gap-1 items-center justify-center">
            <h1 className=" text-xl w-[70%]">
              “We built this platform because we were tired of clunky proposals
              and scattered workflows. It’s time for something better.”
            </h1>
            <p className="-white"> [Your Founder’s Name], Founder & CEO</p>
          </div>
        </div>
      </div>
      <div className="w-full mt-20 flex flex-col items-center ">
        <div className="flex flex-col gap-2 mt-10 text-center text-gray-700 be-vietnam-pro-light items-center">
          <h1 className="text-4xl ">GET STARTED WITH</h1>
          <h1 className="text-4xl be-vietnam-pro-light">SIMPLE QUOTES TODAY</h1>
          <h2 className="text-gray-500 mt-5 text-sm w-[60%]">
            Start sending beautifully designed, error-free documents that
            inspire immediate trust with your clients. Automate tasks, track
            your deals, and always follow up at the right time.
          </h2>
          <div className="flex gap-4 mt-12 w-full justify-center mb-28">
            <button
              onClick={() => navigate("/signup")}
              className="flex items-center justify-center gap-2 w-[25%] text-graidient_bottom border border-graidient_bottom h-12 rounded-md text-sm hover:bg-graidient_bottom hover:text-white"
            >
              Start your 14-days free trial
              <FaArrowRight />
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="flex items-center justify-center gap-2 w-[25%] text-gray-500 border border-gray-500 h-12 rounded-md text-sm"
            >
              Talk to us
              <FaArrowRight />
            </button>
          </div>
        </div>
      </div>

      <div className="w-full ">
        <Footer />
      </div>
    </div>
  );
};

export default Template;
