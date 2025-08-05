import React, { useState } from "react";
import WebHeader from "../../components/WebHeader";
import Arrow from "../../assets/arraw.png";
import CreditCard from "../../assets/CreditCard.png";
import Calender from "../../assets/Calender.png";
import Home_back_image from "../../assets/Home_back_image.png";
import Home_image_1 from "../../assets/Home_image_1.png";
import Home_image_2 from "../../assets/Home_image_2.png";
import Red_tick from "../../assets/red_tick.png";
import Home_float_1 from "../../assets/Home_Float_1.png";
import Home_Float_2 from "../../assets/Home_Float_2.png";
import Home_Float_3 from "../../assets/Home_Float_3.png";
import Home_Float_4 from "../../assets/Home_Float_4.png";
import PaymentCard from "../../components/PaymentCard";
import Home_asset from "../../assets/Home_asset.png";
import Home_call from "../../assets/Home_call.png";
import Home_time from "../../assets/Home_time.png";
import Footer from "../../components/Footer";
import { FaArrowRight } from "react-icons/fa";
import { GoArrowUpRight } from "react-icons/go";
import home_1 from "../../assets/home_1.png";
import home_4 from "../../assets/home_4.png";
import home_5 from "../../assets/home_5.png";
import home_6 from "../../assets/home_6.png";
import home_7 from "../../assets/home_7.png";
import home_8 from "../../assets/home_8.jpg";
import home_2 from "../../assets/home_2.png";
import home_3 from "../../assets/home_3.png";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [section1, setSection1] = useState(1);
  const [section2, setSection2] = useState(1);
  const [thirdBody, setThirdBody] = useState(2);
  const navigate = useNavigate();
  return (
    <div>
      <div className="w-full  block overflow-y-scroll be-vietnam-pro-regular">
        {/*First Body Part Including Header*/}
        <div className="w-full  ">
          <div className="w-full mt-5 flex justify-center">
            <WebHeader />
          </div>

          <div className="w-full flex flex-col items-center justify-center mt-[13%] text-gray-700 be-vietnam-pro-regular">
            <h1 className="text-5xl ">CREATE PROPOSALS THAT WIN CREATE</h1>
            <h1 className="text-5xl be-vietnam-pro-regular">
              BUSINESS -EFFORTLESSLY
            </h1>
            <h2 className="text-gray-500 mt-7">
              Build polished, client-ready proposals in minutes—no design or
              writing skills needed.
            </h2>
            <button
              onClick={() => navigate("/signup")}
              className=" bg-white text-botton_white_text border-[1px] border-botton_white_text flex text-center py-3 px-4 items-center justify-center gap-2 rounded-md mt-10 hover:bg-graidient_bottom hover:text-white "
            >
              CREATE YOUR FIRST PROPOSAL
              <FaArrowRight />
            </button>
            <p className="mt-4 text-sm text-gray-400">
              Experience 14 days free – no upfront payment
            </p>
          </div>
        </div>
      </div>

      {/* Second body part*/}
      <div className="w-full  ">
        <div className="w-full flex flex-col items-center gap-1 mb-20">
          <div className="w-[50%] flex items-center justify-between text-gray-500 mt-32">
            <p
              onClick={() => setSection1(1)}
              className={`cursor-pointer ${
                section1 === 1 ? "border-b-2 border-graidient_bottom" : "none"
              }  px-3 py-1`}
            >
              Create
            </p>
            <p
              onClick={() => setSection1(2)}
              className={`cursor-pointer ${
                section1 === 2 ? "border-b-2 border-graidient_bottom" : "none"
              }  px-3 py-1`}
            >
              Customize
            </p>
            <p
              onClick={() => setSection1(3)}
              className={`cursor-pointer ${
                section1 === 3 ? "border-b-2 border-graidient_bottom" : "none"
              }  px-3 py-1`}
            >
              Collaborate
            </p>
            <p
              onClick={() => setSection1(4)}
              className={`cursor-pointer ${
                section1 === 4 ? "border-b-2 border-graidient_bottom" : "none"
              }  px-3 py-1`}
            >
              Deliver & Sign
            </p>
            <p
              onClick={() => setSection1(5)}
              className={`cursor-pointer ${
                section1 === 5 ? "border-b-2 border-graidient_bottom" : "none"
              }  px-3 py-1`}
            >
              Analyze
            </p>
          </div>
          <div className="w-[50%] h-[50vh] shadow-lg shadow-gray-500 mt-14"></div>
        </div>
      </div>

      {/* Third Body Part */}

      <div className="w-full mt-10 flex flex-col items-center ">
        <div className="flex flex-col gap-2 mt-10 text-center text-gray-700 be-vietnam-pro-light">
          <h1 className="text-4xl ">
            <span className="text-gray-500">EVERYTHING</span> YOU NEED TO KNOW
          </h1>
          <h1 className="text-4xl be-vietnam-pro-light">
            CLOSE ALL DEALS
            <span className="text-gray-500">-ALL IN ONE PLACE</span>
          </h1>
          <h2 className="text-gray-500 mt-5">
            Centralize your workflow with smart templates, real-time
            collaboration, and seamless tracking.
          </h2>
        </div>
        <div className="relative w-full flex justify-center items-center mt-10 mb-10">
          <button
            type="button"
            aria-label="Scroll left"
            onClick={() => {
              const el = document.getElementById("card-row");
              if (el)
                el.scrollBy({ left: -el.offsetWidth / 2, behavior: "smooth" });
            }}
            className="absolute left-0 z-10 h-full flex items-center px-2 bg-gradient-to-r from-gray-50 via-gray-50/80 to-transparent hover:from-gray-200 transition"
            style={{ top: 0, bottom: 0 }}
          >
            <svg
              width="32"
              height="32"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="text-blue-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <div
            id="card-row"
            className="flex gap-x-11 overflow-x-auto no-scrollbar w-[90vw] max-w-[1400px] mx-auto snap-x snap-mandatory"
            style={{ scrollBehavior: "smooth" }}
          >
            <div className="group overflow-hidden flex flex-col justify-between p-4 rounded-lg text-white w-[18vw] min-w-[240px] max-w-[290px] h-[35vh] bg-[#4e5ed3] transition-all duration-300 hover:shadow-2xl cursor-pointer snap-start">
              <h1 className="text-xl w-full whitespace-nowrap overflow-hidden text-ellipsis group-hover:whitespace-normal group-hover:overflow-visible transition-all duration-300">
                Marketing & Creative
              </h1>
              <p className="text-sm whitespace-nowrap overflow-hidden text-ellipsis group-hover:whitespace-normal group-hover:overflow-visible transition-all duration-300">
                Pitch compaingns that actually convert
              </p>
              <div className="w-full flex justify-start">
                <button className="border border-white px-2 h-7 flex items-center justify-center rounded-md text-sm transition-all duration-300 group-hover:w-[90px] group-hover:justify-center group-hover:text-white-700">
                  <span className="group-hover:inline hidden">Start Now</span>
                  <span className="group-hover:hidden block">
                    <GoArrowUpRight />
                  </span>
                </button>
              </div>
            </div>
            <div className="group overflow-hidden flex flex-col justify-between p-4 rounded-lg text-white w-[18vw] min-w-[240px] max-w-[290px] h-[35vh] bg-[#4e5ed3] transition-all duration-300 hover:shadow-2xl cursor-pointer snap-start">
              <h1 className="text-xl w-full whitespace-nowrap overflow-hidden text-ellipsis group-hover:whitespace-normal group-hover:overflow-visible transition-all duration-300">
                Marketing & Creative
              </h1>
              <p className="text-sm whitespace-nowrap overflow-hidden text-ellipsis group-hover:whitespace-normal group-hover:overflow-visible transition-all duration-300">
                Pitch compaingns that actually convert
              </p>
              <div className="w-full flex justify-start">
                <button className="border border-white px-2 h-7 flex items-center justify-center rounded-md text-sm transition-all duration-300 group-hover:w-[90px] group-hover:justify-center group-hover:text-white-700">
                  <span className="group-hover:inline hidden">Start Now</span>
                  <span className="group-hover:hidden block">
                    <GoArrowUpRight />
                  </span>
                </button>
              </div>
            </div>
            <div className="group overflow-hidden flex flex-col justify-between p-4 rounded-lg text-white w-[18vw] min-w-[240px] max-w-[290px] h-[35vh] bg-[#4e5ed3] transition-all duration-300 hover:shadow-2xl cursor-pointer snap-start">
              <h1 className="text-xl w-full whitespace-nowrap overflow-hidden text-ellipsis group-hover:whitespace-normal group-hover:overflow-visible transition-all duration-300">
                Marketing & Creative
              </h1>
              <p className="text-sm whitespace-nowrap overflow-hidden text-ellipsis group-hover:whitespace-normal group-hover:overflow-visible transition-all duration-300">
                Pitch compaingns that actually convert
              </p>
              <div className="w-full flex justify-start">
                <button className="border border-white px-2 h-7 flex items-center justify-center rounded-md text-sm transition-all duration-300 group-hover:w-[90px] group-hover:justify-center group-hover:text-white-700">
                  <span className="group-hover:inline hidden">Start Now</span>
                  <span className="group-hover:hidden block">
                    <GoArrowUpRight />
                  </span>
                </button>
              </div>
            </div>
            <div className="group overflow-hidden flex flex-col justify-between p-4 rounded-lg text-white w-[18vw] min-w-[240px] max-w-[290px] h-[35vh] bg-[#a033e9] transition-all duration-300 hover:shadow-2xl cursor-pointer snap-start">
              <h1 className="text-xl w-full whitespace-nowrap overflow-hidden text-ellipsis group-hover:whitespace-normal group-hover:overflow-visible transition-all duration-300">
                Consulting & Freelance
              </h1>
              <p className="text-sm whitespace-nowrap overflow-hidden text-ellipsis group-hover:whitespace-normal group-hover:overflow-visible transition-all duration-300">
                Make every proposal feel custom-built
              </p>
              <div className="w-full flex justify-start">
                <button className="border border-white px-2 h-7 flex items-center justify-center rounded-md text-sm transition-all duration-300 group-hover:w-[90px] group-hover:justify-center group-hover:text-white-700">
                  <span className="group-hover:inline hidden">Start Now</span>
                  <span className="group-hover:hidden block">
                    <GoArrowUpRight />
                  </span>
                </button>
              </div>
            </div>
            <div className="group overflow-hidden flex flex-col justify-between p-4 rounded-lg text-white w-[18vw] min-w-[240px] max-w-[290px] h-[35vh] bg-[#0076e4] transition-all duration-300 hover:shadow-2xl cursor-pointer snap-start">
              <h1 className="text-xl w-full whitespace-nowrap overflow-hidden text-ellipsis group-hover:whitespace-normal group-hover:overflow-visible transition-all duration-300">
                Startups & Founders
              </h1>
              <p className="text-sm whitespace-nowrap overflow-hidden text-ellipsis group-hover:whitespace-normal group-hover:overflow-visible transition-all duration-300">
                Raise capital with proposal that stand out
              </p>
              <div className="w-full flex justify-start">
                <button className="border border-white px-2 h-7 flex items-center justify-center rounded-md text-sm transition-all duration-300 group-hover:w-[90px] group-hover:justify-center group-hover:text-white-700">
                  <span className="group-hover:inline hidden">Start Now</span>
                  <span className="group-hover:hidden block">
                    <GoArrowUpRight />
                  </span>
                </button>
              </div>
            </div>
            <div className="group overflow-hidden flex flex-col justify-between p-4 rounded-lg text-white w-[18vw] min-w-[240px] max-w-[290px] h-[35vh] bg-[#ff4261] transition-all duration-300 hover:shadow-2xl cursor-pointer snap-start">
              <h1 className="text-xl w-full whitespace-nowrap overflow-hidden text-ellipsis group-hover:whitespace-normal group-hover:overflow-visible transition-all duration-300">
                HR & Operations
              </h1>
              <p className="text-sm whitespace-nowrap overflow-hidden text-ellipsis group-hover:whitespace-normal group-hover:overflow-visible transition-all duration-300">
                Streamline internal approvals
              </p>
              <div className="w-full flex justify-start">
                <button className="border border-white px-2 h-7 flex items-center justify-center rounded-md text-sm transition-all duration-300 group-hover:w-[90px] group-hover:justify-center group-hover:text-white-700">
                  <span className="group-hover:inline hidden">Start Now</span>
                  <span className="group-hover:hidden block">
                    <GoArrowUpRight />
                  </span>
                </button>
              </div>
            </div>
            <div className="group overflow-hidden flex flex-col justify-between p-4 rounded-lg text-white w-[18vw] min-w-[240px] max-w-[290px] h-[35vh] bg-[#a033e9] transition-all duration-300 hover:shadow-2xl cursor-pointer snap-start">
              <h1 className="text-xl w-full whitespace-nowrap overflow-hidden text-ellipsis group-hover:whitespace-normal group-hover:overflow-visible transition-all duration-300">
                Consulting & Freelance
              </h1>
              <p className="text-sm whitespace-nowrap overflow-hidden text-ellipsis group-hover:whitespace-normal group-hover:overflow-visible transition-all duration-300">
                Make every proposal feel custom-built
              </p>
              <div className="w-full flex justify-start">
                <button className="border border-white px-2 h-7 flex items-center justify-center rounded-md text-sm transition-all duration-300 group-hover:w-[90px] group-hover:justify-center group-hover:text-white-700">
                  <span className="group-hover:inline hidden">Start Now</span>
                  <span className="group-hover:hidden block">
                    <GoArrowUpRight />
                  </span>
                </button>
              </div>
            </div>
          </div>
          <button
            type="button"
            aria-label="Scroll right"
            onClick={() => {
              const el = document.getElementById("card-row");
              if (el)
                el.scrollBy({ left: el.offsetWidth / 2, behavior: "smooth" });
            }}
            className="absolute right-0 z-10 h-full flex items-center px-2 bg-gradient-to-l from-gray-50 via-gray-50/80 to-transparent hover:from-gray-200 transition"
            style={{ top: 0, bottom: 0 }}
          >
            <svg
              width="32"
              height="32"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="text-blue-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
          <style jsx global>{`
            .no-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .no-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>
        </div>
      </div>

      {/*fourth body part*/}
      <div className="w-full mt-16 flex flex-col items-center ">
        <div className="flex flex-col gap-2 mt-10 text-center text-gray-700 be-vietnam-pro-light">
          <h1 className="text-4xl ">THE SMART WAY TO SEND</h1>
          <h1 className="text-4xl be-vietnam-pro-light">PROPOSALS</h1>
          <h2 className="text-gray-500 mt-5">
            Save time, stay organized, and impress clients with intuitive,
            ready-to-send proposals.
          </h2>
        </div>
        <div className="w-[85%] flex items-center justify-between h-[60vh] mt-10  ">
          <div className=" flex flex-col justify-between w-[47%] h-[50vh] px-5 py-6">
            <h1 className="text-3xl w-[70%] text-gray-700">
              Pick a Template & Kickstart Fast
            </h1>
            <p className="w-[100%] text-gray-600">
              Choose from beautifully designed templates built for sales,
              services, or startups. Hit the ground running with pre-filled
              sections you can tweak in seconds.
            </p>
            <div className="flex gap-4">
              <p className="px-2 py-1 bg-gray-200 rounded-md">
                Professionally Designed
              </p>
              <p className="px-2 py-1 bg-gray-200 rounded-md">
                Industry-Specific
              </p>
              <p className="px-2 py-1 bg-gray-200 rounded-md">Quick Start</p>
            </div>
            <button
              onClick={() => navigate("/signup")}
              className="border border-graidient_bottom w-36  py-2 text-graidient_bottom flex items-center justify-center gap-2 rounded hover:bg-graidient_bottom hover:text-white"
            >
              Get Started
              <FaArrowRight />
            </button>
          </div>
          <div className="w-[47%] h-[50vh] ">
            <img
              src={home_1}
              className="w-full h-full p-5 bg-gray-100 rounded-md"
              alt=""
            />
          </div>
        </div>
        <div className="w-[85%] flex items-center justify-between h-[60vh] mt-10  ">
          <div className="w-[47%] h-[50vh] ">
            <img
              src={home_2}
              className="w-full h-full p-5 bg-gray-100 rounded-md"
              alt=""
            />
          </div>
          <div className=" flex flex-col justify-between w-[47%] h-[50vh] px-5 py-6">
            <h1 className="text-3xl w-[70%] text-gray-700">
              Customize, Collaborate & Build
            </h1>
            <p className="w-[100%] text-gray-600">
              Easily tailor your proposal with drag-and-drop sections, media
              blocks, and flexible pricing tables. Collaborate live with your
              team or client — no endless email threads.
            </p>
            <div className="flex gap-4">
              <p className="px-2 py-1 bg-gray-200 rounded-md">
                Real-Time Editing
              </p>
              <p className="px-2 py-1 bg-gray-200 rounded-md">
                Team Collaboration
              </p>
              <p className="px-2 py-1 bg-gray-200 rounded-md">
                Interactive Pricing
              </p>
            </div>
            <button
              onClick={() => navigate("/signup")}
              className="border border-graidient_bottom w-36  py-2 text-graidient_bottom flex items-center justify-center gap-2 rounded hover:bg-graidient_bottom hover:text-white"
            >
              Start Building
              <FaArrowRight />
            </button>
          </div>
        </div>
        <div className="w-[85%] flex items-center justify-between h-[60vh] mt-10  ">
          <div className=" flex flex-col justify-between w-[47%] h-[50vh] px-5 py-6">
            <h1 className="text-3xl w-[70%] text-gray-700">
              Share, Get Signed & Analyzed
            </h1>
            <p className="w-[100%] text-gray-600">
              Send a branded, trackable proposal link directly to your client.
              Get notified when they open it, see how they interact with your
              content, and close the deal faster with built-in e-signatures.
            </p>
            <div className="flex gap-4">
              <p className="px-2 py-1 bg-gray-200 rounded-md">
                Track Engagement
              </p>
              <p className="px-2 py-1 bg-gray-200 rounded-md">
                Built-in E-Signature
              </p>
              <p className="px-2 py-1 bg-gray-200 rounded-md">
                Proposal Analytics
              </p>
            </div>
            <button
              onClick={() => navigate("/signup")}
              className="border border-graidient_bottom w-36  py-2 text-graidient_bottom flex items-center justify-center gap-2 rounded hover:bg-graidient_bottom hover:text-white"
            >
              Start Analyzing
              <FaArrowRight />
            </button>
          </div>
          <div className="w-[47%] h-[50vh] ">
            <img
              src={home_3}
              className="w-full h-full p-5 bg-gray-100 rounded-md"
              alt=""
            />
          </div>
        </div>
      </div>
      {/*five Body Part*/}
      <div className="w-full mt-16 flex flex-col items-center ">
        <div className="flex flex-col gap-2 mt-10 text-center text-gray-700 be-vietnam-pro-light items-center">
          <h1 className="text-4xl ">TEMPLATES THAT BUILD TRUST</h1>
          <h1 className="text-4xl be-vietnam-pro-light">
            FROM THE FIRST CLICK
          </h1>
          <h2 className="text-gray-500 mt-5">
            First impressions matter—our templates help you start strong and
            stay ahead.
          </h2>
          <button
            onClick={() => navigate("/signup")}
            className="px-6 mt-7 py-2 flex items-center justify-center border border-graidient_bottom rounded-md text-graidient_bottom gap-2 hover:bg-graidient_bottom hover:text-white"
          >
            Try it for free <FaArrowRight />
          </button>
          <h2 className="text-gray-500 mt-2 text-sm">
            Experience 14 days free – no upfront payment
          </h2>
        </div>
        <div className="w-[75%] h-[55vh] mt-16 mb-12">
          <img src={home_4} alt="" className="w-full h-full" />
        </div>
      </div>

      {/*six Body Part*/}
      <div className="w-full mt-16 flex flex-col items-center ">
        <div className="flex flex-col gap-2 mt-10 text-center text-gray-700 be-vietnam-pro-light items-center">
          <h1 className="text-4xl ">WHERE POWERFUL FEATURES MEET</h1>
          <h1 className="text-4xl be-vietnam-pro-light">REAL WORLD IMPACT</h1>
          <h2 className="text-gray-500 mt-5">
            Packed with purpose: intuitive features that simplify your process
            and drive better outcomes.
          </h2>
        </div>
        <div className="w-[75%] h-[75vh] mt-12 bg-gray-100 rounded-md flex items-center justify-center gap-4 px-4 ">
          <div className="w-[38%] h-[65vh] bg-white flex flex-col gap-3 px-2 py-6 rounded-md text-gray-500 text-center">
            <div
              className={`${
                section2 === 1 ? "bg-gray-50" : "bg-white"
              } rounded-md`}
            >
              <p
                className="py-3 w-full flex items-center justify-between px-3"
                onClick={() => setSection2(1)}
              >
                Organize work in scalable workspaces
                {section2 === 1 ? <IoIosArrowForward /> : <IoIosArrowDown />}
              </p>
              {section2 === 1 && (
                <div className="w-full text-start px-4 py-3 flex flex-col gap-3">
                  <p className="text-xs">
                    Create spaces for clients, teams, or departments. Organize
                    proposals, manage access, and keep everything in one place.
                  </p>
                  <button
                    onClick={() => navigate("/signup")}
                    className="text-graidient_bottom py-1 w-40 text-sm rounded-md border border-gray-100 bg-white"
                  >
                    Explore Workspaces
                  </button>
                </div>
              )}
            </div>
            <div
              className={`${
                section2 === 2 ? "bg-gray-50" : "bg-white"
              } rounded-md`}
            >
              <p
                className="py-3 w-full flex items-center justify-between px-3"
                onClick={() => setSection2(2)}
              >
                Build stunning proposals with a editor
                {section2 === 2 ? <IoIosArrowForward /> : <IoIosArrowDown />}
              </p>
              {section2 === 2 && (
                <div className="w-full text-start px-4 py-3 flex flex-col gap-3">
                  <p className="text-xs">
                    Drag and drop your way to beautiful proposals. Add content
                    blocks, pricing, videos, and more — all in real-time.
                  </p>
                  <button
                    onClick={() => navigate("/signup")}
                    className="text-graidient_bottom py-1 w-40 text-sm rounded-md border border-gray-100 bg-white"
                  >
                    Start Building
                  </button>
                </div>
              )}
            </div>
            <div
              className={`${
                section2 === 3 ? "bg-gray-50" : "bg-white"
              } rounded-md`}
            >
              <p
                className="py-3 w-full flex items-center justify-between px-3"
                onClick={() => setSection2(3)}
              >
                Save time with ready-to-use content
                {section2 === 3 ? <IoIosArrowForward /> : <IoIosArrowDown />}
              </p>
              {section2 === 3 && (
                <div className="w-full text-start px-4 py-3 flex flex-col gap-3">
                  <p className="text-xs">
                    Use pre-built templates, cover pages, and reusable sections.
                    Keep your branding consistent and your team efficient.
                  </p>
                  <button
                    onClick={() => navigate("/template")}
                    className="text-graidient_bottom py-1 w-40 text-sm rounded-md border border-gray-100 bg-white"
                  >
                    Browse Templates
                  </button>
                </div>
              )}
            </div>
            <div
              className={`${
                section2 === 4 ? "bg-gray-50" : "bg-white"
              } rounded-md`}
            >
              <p
                className="py-3 w-full flex items-center justify-between px-3"
                onClick={() => setSection2(4)}
              >
                Add interactive pricing for faster sign-off
                {section2 === 4 ? <IoIosArrowForward /> : <IoIosArrowDown />}
              </p>
              {section2 === 4 && (
                <div className="w-full text-start px-4 py-3 flex flex-col gap-3">
                  <p className="text-xs">
                    Add flexible, interactive pricing tables that update totals
                    instantly. Empower clients to make choices without
                    back-and-forth.
                  </p>
                  <button
                    onClick={() => navigate("/signup")}
                    className="text-graidient_bottom py-1 w-40 text-sm rounded-md border border-gray-100 bg-white"
                  >
                    Try Pricing Tables
                  </button>
                </div>
              )}
            </div>
            <div
              className={`${
                section2 === 5 ? "bg-gray-50" : "bg-white"
              } rounded-md`}
            >
              <p
                className="py-3 w-full flex items-center justify-between px-3"
                onClick={() => setSection2(5)}
              >
                Track views and engagement in real time
                {section2 === 5 ? <IoIosArrowForward /> : <IoIosArrowDown />}
              </p>
              {section2 === 5 && (
                <div className="w-full text-start px-4 py-3 flex flex-col gap-3">
                  <p className="text-xs">
                    Track views, time spent, clicks, and engagement per section.
                    Know when to follow up and what’s working.
                  </p>
                  <button
                    onClick={() => navigate("/signup")}
                    className="text-graidient_bottom py-1 w-40 text-sm rounded-md border border-gray-100 bg-white"
                  >
                    View Analytics
                  </button>
                </div>
              )}
            </div>
            <div
              className={`${
                section2 === 6 ? "bg-gray-50" : "bg-white"
              } rounded-md`}
            >
              <p
                className="py-3 w-full flex items-center justify-between px-3"
                onClick={() => setSection2(6)}
              >
                Collaborate live with your team or clients
                {section2 === 6 ? <IoIosArrowForward /> : <IoIosArrowDown />}
              </p>
              {section2 === 6 && (
                <div className="w-full text-start px-4 py-3 flex flex-col gap-3">
                  <p className="text-xs">
                    Make it easy for clients to sign your proposals — no extra
                    tools, no hassle. Secure, fast, and legally binding.
                  </p>
                  <button
                    onClick={() => navigate("/signup")}
                    className="text-graidient_bottom py-1 w-40 text-sm rounded-md border border-gray-100 bg-white"
                  >
                    Send to Sign
                  </button>
                </div>
              )}
            </div>

            <p className="py-3" onClick={() => setSection2(6)}></p>
          </div>
          <div className="w-[50%] h-[60vh] flex items-center justify-center ml-16">
            <div className="relative h-[30vh] w-[80%]">
              <img src={home_5} alt="" />
              <img src={home_6} alt="" className="-top-8 -left-8 absolute" />
              <img
                src={home_7}
                alt=""
                className="-bottom-8 -right-8 absolute"
              />
            </div>
          </div>
        </div>
      </div>
      {/*Seventh Body Part*/}
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

export default Home;
