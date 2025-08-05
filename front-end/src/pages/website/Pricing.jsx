import React, { useState } from "react";
import WebHeader from "../../components/WebHeader";
import Footer from "../../components/Footer";
import home_8 from "../../assets/home_8.jpg";
import { FaArrowRight } from "react-icons/fa";
import { GoArrowUpRight } from "react-icons/go";
import { FaCheck } from "react-icons/fa6";
import { CiCreditCard1 } from "react-icons/ci";
import { MdOutlinePeopleOutline } from "react-icons/md";
import price_1 from "../../assets/price_1.png";
import price_2 from "../../assets/price_2.png";
import price_3 from "../../assets/price_3.png";
import price_4 from "../../assets/price_4.png";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
  const [plan, setPlan] = useState("monthly");
  const [team, setTeam] = useState(1);
  const navigate = useNavigate();
  return (
    <div>
      <div className="w-full  block overflow-y-scroll be-vietnam-pro-regular">
        <div className="w-full mt-5 flex justify-center">
          <WebHeader />
        </div>
        <div className="w-full mt-32 flex flex-col items-center ">
          <div className="flex flex-col gap-2 text-center text-gray-700 be-vietnam-pro-light items-center">
            <h1 className="text-4xl ">ONE SIMPLE PLAN. FULL</h1>
            <h1 className="text-4xl be-vietnam-pro-light">
              ACCESS. NO SURPRISES
            </h1>
            <h2 className="text-gray-500 mt-5 text-sm w-[60%]">
              Start with a 14-day free trial—no credit card required. After
              that, pick a monthly or yearly plan based on your team size. Every
              feature is included, always.
            </h2>
          </div>
          <div className="w-[70%] flex justify-center gap-10 mt-20 mb-10">
            <div className="w-[46%] border border-gray-200 rounded-lg p-4 py-7">
              <div className="flex justify-between">
                <div className=" border border-gray-100 p-[3px]">
                  <button
                    onClick={() => setPlan("yearly")}
                    className={`px-4 py-2 ${
                      plan === "yearly"
                        ? "bg-graidient_bottom text-white  "
                        : "none text-gray-700"
                    } rounded-lg`}
                  >
                    Yearly
                  </button>
                  <button
                    onClick={() => setPlan("monthly")}
                    className={`px-4 py-2  ${
                      plan === "monthly"
                        ? "bg-graidient_bottom text-white  "
                        : "none text-gray-700"
                    } rounded-lg`}
                  >
                    Monthly
                  </button>
                </div>
                <div className="flex gap-2 items-center">
                  <p className="text-gray-500 ">15$</p>
                  <p className="text-gray-600 bg-gray-100 px-2 py-1 rounded-lg">
                    save 20%
                  </p>
                </div>
              </div>
              <div className="flex mt-7 items-center justify-between">
                <h2 className="ml-2 flex items-center gap-2 text-gray-600 text-lg ">
                  <CiCreditCard1 className="text-2xl" />
                  Billing Plan
                </h2>
                <p className="text-2xl flex items-center text-gray-700">
                  {10 * team}$
                  <span className="text-gary-500 text-sm mr-3">/month</span>
                </p>
              </div>
              <div className="flex mt-7 items-center justify-between">
                <h2 className="ml-2 flex items-center gap-2 text-gray-600 text-lg ">
                  <MdOutlinePeopleOutline />
                  Team Size
                </h2>
                <input
                  type="number"
                  className="w-12 px-1 py-1 border border-gray-200 outline-none rounded-md mr-3"
                  value={team}
                  onChange={(e) => setTeam(team + 1)}
                />
              </div>

              <div className="w-full flex justify-center ">
                <button
                  onClick={() => navigate("/signup")}
                  className="w-[90%] text-center py-2 border border-graidient_bottom rounded-sm text-graidient_bottom mt-7 flex items-center gap-2 justify-center hover:bg-graidient_bottom hover:text-white"
                >
                  Start New Plan <FaArrowRight />
                </button>
              </div>
            </div>
            <div className="w-[46%] border border-gray-200 rounded-lg px-6 py-7 flex flex-col  gap-2">
              <h2 className="mt-2 mb-5 text-lg text-gray-700 w-full text-center">
                Everything You Need – One Plan, Full Access
              </h2>
              <p className="ml-3 text-gray-500 flex items-center gap-2">
                {" "}
                <FaCheck className="text-graidient_bottom" />
                Unlimited proposals
              </p>
              <p className="ml-3 text-gray-500 flex items-center gap-2">
                <FaCheck className="text-graidient_bottom" /> Real-time proposal
                analytics
              </p>
              <p className="ml-3 text-gray-500 flex items-center gap-2">
                <FaCheck className="text-graidient_bottom" />
                100+ professionally designed templates
              </p>
              <p className="ml-3 text-gray-500 flex items-center gap-2">
                <FaCheck className="text-graidient_bottom" />
                User roles & team collaboration
              </p>
              <p className="ml-3 text-gray-500 flex items-center gap-2">
                <FaCheck className="text-graidient_bottom" /> Shared access to
                proposals & assets
              </p>
            </div>
          </div>
        </div>
        {/* second Body Part */}

        <div className="w-full mt-20 flex flex-col items-center ">
          <div className="flex flex-col gap-2  text-center text-gray-700 be-vietnam-pro-light items-center">
            <h1 className="text-4xl ">GET STARTED WITH</h1>
            <h1 className="text-4xl be-vietnam-pro-light">
              SIMPLE QUOTES TODAY
            </h1>
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
        <div className="w-full mt-10 flex flex-col items-center mb-20 ">
          <div className="flex flex-col gap-2  text-center text-gray-700 be-vietnam-pro-light items-center">
            <h1 className="text-4xl ">FEATURES TO ENSURE</h1>
            <h1 className="text-4xl be-vietnam-pro-light">QUALITY CONTROL</h1>
          </div>
          <div className="w-[70%] grid grid-cols-2 gap-2 mt-10 justify-center  ">
            <div className="w-[120%] m-2 bg-gray-100 rounded-lg relative h-[200px] flex flex-col justify-end p-4">
              <h1 className="">Track every open, view, and signature</h1>
              <p className="text-sm text-gray-700 w-[65%] mt-2">
                Know exactly when your proposal is opened, viewed, or signed.
                Stay in control with real-time updates
              </p>
              <img src={price_1} className=" absolute top-1 right-1" alt="" />
            </div>
            <div className="w-[80%] m-2 bg-gray-100 rounded-lg relative  ml-[25%] h-[200px] flex flex-col justify-end p-4 ">
              <h1>Customized templates & cover page</h1>
              <p className="text-sm text-gray-700 w-[100%] mt-2">
                Create stunning proposals with reusable templates and cover
                pages tailored to your brand.
              </p>
              <img
                src={price_2}
                className=" absolute top-1 right-1 h-[100px]"
                alt=""
              />
            </div>
            <div className="w-[80%] m-2 bg-gray-100 rounded-lg relative h-[200px] flex flex-col justify-end p-4  ">
              <h1>Export your proposal, your way</h1>
              <p className="text-sm text-gray-700 w-[100%] mt-2">
                Download or share proposals in high-res PDF or web formats—ready
                for any client’s preference.
              </p>
              <img
                src={price_3}
                className=" absolute top-1 right-1 h-[100px]"
                alt=""
              />
            </div>
            <div className="w-[120%] m-2 bg-gray-100 rounded-lg relative  -ml-[15%] h-[200px] flex flex-col justify-end p-4 ">
              <h1>Collaborate with control</h1>
              <p className="text-sm text-gray-700 w-[80%] mt-2">
                Assign team roles or invite guests with defined permissions.
                Keep your workflow secure and organized.
              </p>
              <img
                src={price_4}
                className=" absolute top-1 right-1 h-[130 px]"
                alt=""
              />
            </div>
          </div>
        </div>
        {/* Third Body Part */}
        <div className="w-full mt-5 mb-10 flex flex-col items-center ">
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
                “We built this platform because we were tired of clunky
                proposals and scattered workflows. It’s time for something
                better.”
              </h1>
              <p className="-white"> [Your Founder’s Name], Founder & CEO</p>
            </div>
          </div>
        </div>

        <div className="w-full ">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Pricing;
