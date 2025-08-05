import React, { useState } from "react";
import WebHeader from "../../components/WebHeader";
import Footer from "../../components/Footer";
import home_8 from "../../assets/home_8.jpg";
import { FaArrowRight } from "react-icons/fa";
import template_1 from "../../assets/template_1.png";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";

const ContactUs = () => {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+91 ");
  const [catagory, setCatagory] = useState("");
  const [company, setCompany] = useState("");
  const [size, setSize] = useState("");
  const [discription, setDiscription] = useState("");
  const navigate = useNavigate();

  return (
    <div>
      <div className="w-full  block overflow-y-scroll be-vietnam-pro-regular">
        <div className="w-full mt-5 flex justify-center">
          <WebHeader />
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-center mt-32 text-gray-700 be-vietnam-pro-regular">
        <h1 className="text-4xl ">REACH OUT -WE'D LOVE TO</h1>
        <h1 className="text-4xl be-vietnam-pro-regular">HEAR FROM YOU</h1>
        <h2 className="text-gray-500 mt-7">
          From product questions to feedback or partnership ideas, drop us a
          note — we’re listening
        </h2>
      </div>
      <div className="w-full mt-14 flex flex-col items-center justify-center h-fit ">
        <div className="w-[65%] flex flex-col gap-3 items-center py-10 border border-gray-200 rounded-md px-20 shadow-xl shadow-gray-300">
          <h1 className="text-2xl">Contact our Sales team</h1>
          <div className="w-full flex justify-between items-center px-6 mt-3">
            <div className="flex gap-2 flex-col items-start w-[47%]">
              <label className="px-1">First name</label>
              <input
                value={first}
                onChange={(e) => setFirst(e.target.value)}
                className="py-2 w-full border border-gray-200 outline-none rounded-md px-2"
                type="text"
              />
            </div>
            <div className="flex gap-2 flex-col items-start w-[47%]">
              <label className="px-1">Second name</label>
              <input
                value={last}
                onChange={(e) => setLast(e.target.value)}
                className="py-2 w-full border border-gray-200 outline-none rounded-md px-2"
                type="text"
              />
            </div>
          </div>
          <div className="w-full flex justify-between items-center px-6 mt-3">
            <div className="flex gap-2 flex-col items-start w-[47%]">
              <label className="px-1">Work Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="py-2 w-full border border-gray-200 outline-none rounded-md px-2"
                type="email"
                placeholder="name@company.com"
              />
            </div>
            <div className="flex gap-2 flex-col items-start w-[47%]">
              <label className="px-1">Phone No.</label>
              <input
                className="py-2 w-full border border-gray-200 outline-none rounded-md px-2"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full flex flex-col gap-1 px-6 ">
            <label className="px-1">
              What specific management objectives are you targeting?
            </label>
            <input
              type="text"
              value={catagory}
              onChange={(e) => setCatagory(e.target.value)}
              className="py-2 w-full border border-gray-100 outline-none rounded-md px-2"
              placeholder="Please select"
            />
          </div>
          <div className="w-full flex justify-between items-center px-6 mt-3">
            <div className="flex gap-2 flex-col items-start w-[47%]">
              <label className="px-1">Company Name</label>
              <input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="py-2 w-full border border-gray-200 outline-none rounded-md px-2"
                type="text"
              />
            </div>
            <div className="flex gap-2 flex-col items-start w-[47%]">
              <label className="px-1">Company size</label>
              <input
                onChange={(e) => setSize(e.target.value)}
                value={size}
                className="py-2 w-full border border-gray-200 outline-none rounded-md px-2"
                type="text"
              />
            </div>
          </div>
          <div className="w-full flex flex-col items-start px-6">
            <label className="px-1">How can our team help you?</label>
            <textarea
              value={discription}
              onChange={(e) => setDiscription(e.target.value)}
              className="py-2 w-full border border-gray-200 outline-none rounded-md px-2"
              type="text"
            />
          </div>
          <button className="flex items-center justify-center gap-2 text-graidient_bottom border border-graidient_bottom py-2 px-6 rounded-md mt-4">
            Submit <FaArrowRight />
          </button>
          <p className="text-sm">
            Simple Quotes{" "}
            <span className="text-graidient_bottom">Privacy Policy</span>{" "}
          </p>
        </div>
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

export default ContactUs;
