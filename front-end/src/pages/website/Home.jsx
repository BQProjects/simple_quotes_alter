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
import home_1 from "../../assets/websitehome.png";
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
    <div className="bg-[#f9f9f9]">
      <div className="w-full be-vietnam-pro-regular">
        {/*First Body Part Including Header*/}
        <div className="w-full  ">
          <div className="w-full flex justify-center">
            <WebHeader />
          </div>
          <div className="w-[85%] mx-auto border border-[#e0e0e0] rounded-b-3xl">
            <div className="w-full flex flex-col items-center justify-center mt-[13%] text-gray-700 be-vietnam-pro-regular">
              <h1 className="text-5xl ">Maximize Your Time,</h1>
              <h1 className="text-5xl be-vietnam-pro-regular">
                Minimize Proposal Friction
              </h1>
              <h2 className="text-gray-500 mt-7">
                SimpleQuotes helps you take control of proposals with effortless
                creation,
              </h2>
              <h2 className="text-gray-500 ">
                smart tracking, and faster client approvals.
              </h2>
              <button
                onClick={() => navigate("/signup")}
                className=" bg-white text-botton_white_text border-[1px] border-botton_white_text flex text-center py-3 px-4 items-center justify-center gap-2 rounded-md mt-10 hover:bg-graidient_bottom hover:text-white "
              >
                Get Started Free
                <FaArrowRight />
              </button>
              <p className="mt-4 text-sm text-gray-400">
                14-day trial, no credit card required
              </p>
            </div>
            <div className="w-full mx-auto flex justify-center items-center">
              <div className="w-full h-[85vh] pt-14">
                <img
                  src={home_1}
                  alt=""
                  className="w-full h-full object-fill rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Third Body Part */}

      <div className="w-full mt-10 flex flex-col items-center ">
        <div className="flex flex-col gap-2 mt-10 text-center text-gray-700 be-vietnam-pro-light">
          <h1 className="text-5xl ">Smart proposal solution for</h1>
          <h1 className="text-5xl be-vietnam-pro-regular">
            seamless interactions.
          </h1>
        </div>
        <div className="relative w-full flex justify-center items-center mt-10 mb-10">
          <div className="flex flex-shrink-0 items-start gap-8 w-[1260px] h-[19.4375rem]">
            <div className="flex flex-col flex-shrink-0 items-start gap-14 p-8 w-[399px] h-[19.4375rem] rounded-2xl bg-[#f6f7f9]">
              <svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  width="64"
                  height="64"
                  rx="12"
                  fill="#FFCED8"
                  fill-opacity="0.2"
                />
                <g clip-path="url(#clip0_8411_5946)">
                  <path
                    d="M40.888 42.6693H21.3325V23.1137H33.0836L34.8614 21.3359H21.3325C20.861 21.3359 20.4088 21.5232 20.0754 21.8566C19.742 22.19 19.5547 22.6422 19.5547 23.1137V42.6693C19.5547 43.1408 19.742 43.593 20.0754 43.9264C20.4088 44.2597 20.861 44.4471 21.3325 44.4471H40.888C41.3595 44.4471 41.8117 44.2597 42.1451 43.9264C42.4785 43.593 42.6658 43.1408 42.6658 42.6693V29.3359L40.888 31.1137V42.6693Z"
                    fill="#1F1F1F"
                  />
                  <path
                    d="M45.8022 21.1895L42.8067 18.194C42.6737 18.0607 42.5158 17.9549 42.3419 17.8827C42.168 17.8106 41.9816 17.7734 41.7933 17.7734C41.6051 17.7734 41.4187 17.8106 41.2448 17.8827C41.0709 17.9549 40.913 18.0607 40.78 18.194L28.5933 30.4518L27.6067 34.7273C27.5646 34.9346 27.5691 35.1486 27.6196 35.3539C27.6702 35.5592 27.7656 35.7508 27.8991 35.9149C28.0325 36.0789 28.2007 36.2114 28.3914 36.3027C28.5822 36.394 28.7908 36.4418 29.0022 36.4429C29.1115 36.4548 29.2218 36.4548 29.3311 36.4429L33.6422 35.4918L45.8022 23.2162C45.9355 23.0833 46.0413 22.9253 46.1135 22.7514C46.1856 22.5776 46.2228 22.3911 46.2228 22.2029C46.2228 22.0146 46.1856 21.8282 46.1135 21.6543C46.0413 21.4804 45.9355 21.3225 45.8022 21.1895ZM32.7178 33.8473L29.4645 34.5673L30.22 31.3407L39.3933 22.1051L41.9 24.6118L32.7178 33.8473ZM42.9045 23.6073L40.3978 21.1007L41.7756 19.6962L44.3 22.2207L42.9045 23.6073Z"
                    fill="#1F1F1F"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_8411_5946">
                    <rect
                      width="32"
                      height="32"
                      fill="white"
                      transform="translate(16 16)"
                    />
                  </clipPath>
                </defs>
              </svg>

              <div className="flex flex-col flex-shrink-0 items-start gap-3 w-[20.875rem] h-[7.1875rem]">
                <div className="flex items-center text-[#111116] text-lg font-bold leading-7">
                  Customizable chat flows.
                </div>
                <div className="flex flex-col flex-shrink-0 items-start w-[20.875rem] h-[5.4375rem]">
                  <div className="text-[#3b3b3b] text-sm font-medium leading-7">
                    With an intuitive drag-and-drop interface or
                  </div>
                  <div className="text-[#3b3b3b] text-sm font-medium leading-7">
                    to code-based configuration, businesses can
                  </div>
                  <div className="text-[#3b3b3b] text-sm font-medium leading-7">
                    do design chat paths.
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col flex-shrink-0 items-start gap-14 p-8 w-[399px] h-[19.4375rem] rounded-2xl bg-[#f6f7f9]">
              <svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  width="64"
                  height="64"
                  rx="12"
                  fill="#FFCED8"
                  fill-opacity="0.2"
                />
                <path
                  d="M46.0011 22.0034C45.9979 20.9662 45.5912 19.9709 44.867 19.2283C44.1428 18.4857 43.158 18.0541 42.1211 18.025C41.0843 17.9959 40.0768 18.3715 39.3121 19.0723C38.5473 19.7731 38.0854 20.744 38.0241 21.7794L25.5871 24.2664C25.2963 23.6621 24.8578 23.1407 24.3122 22.7506C23.7667 22.3606 23.1315 22.1143 22.4656 22.0346C21.7997 21.9549 21.1244 22.0444 20.5022 22.2948C19.8799 22.5451 19.3309 22.9483 18.9057 23.467C18.4805 23.9857 18.193 24.6032 18.0696 25.2625C17.9463 25.9217 17.9911 26.6014 18.1999 27.2388C18.4088 27.8761 18.7749 28.4506 19.2645 28.909C19.7541 29.3674 20.3514 29.6949 21.0011 29.8614V38.1454C20.3187 38.3203 19.6947 38.6726 19.1925 39.1667C18.6903 39.6607 18.3278 40.2788 18.1417 40.9582C17.9557 41.6376 17.9528 42.3542 18.1332 43.0351C18.3137 43.7161 18.6711 44.3371 19.1692 44.8353C19.6673 45.3334 20.2884 45.6908 20.9693 45.8713C21.6503 46.0517 22.3669 46.0488 23.0463 45.8628C23.7257 45.6767 24.3438 45.3142 24.8378 44.812C25.3319 44.3098 25.6842 43.6858 25.8591 43.0034H34.1431C34.3093 43.6536 34.6368 44.2513 35.0952 44.7413C35.5536 45.2314 36.1283 45.5979 36.7659 45.807C37.4035 46.0161 38.0836 46.0611 38.7432 45.9378C39.4028 45.8144 40.0207 45.5268 40.5396 45.1014C41.0586 44.676 41.462 44.1266 41.7124 43.504C41.9628 42.8815 42.0522 42.2058 41.9723 41.5395C41.8924 40.8733 41.6457 40.2379 41.2552 39.6922C40.8647 39.1465 40.3429 38.7081 39.7381 38.4174L42.2251 25.9804C43.2431 25.9246 44.2012 25.4816 44.9032 24.7422C45.6052 24.0028 45.998 23.023 46.0011 22.0034ZM42.0011 20.0034C42.3966 20.0034 42.7833 20.1207 43.1122 20.3405C43.4411 20.5603 43.6974 20.8726 43.8488 21.2381C44.0002 21.6035 44.0398 22.0057 43.9626 22.3936C43.8855 22.7816 43.695 23.1379 43.4153 23.4177C43.1356 23.6974 42.7792 23.8878 42.3912 23.965C42.0033 24.0422 41.6011 24.0026 41.2357 23.8512C40.8702 23.6998 40.5579 23.4435 40.3381 23.1146C40.1183 22.7857 40.0011 22.399 40.0011 22.0034C40.0011 21.473 40.2118 20.9643 40.5868 20.5892C40.9619 20.2142 41.4706 20.0034 42.0011 20.0034ZM20.0011 26.0034C20.0011 25.6079 20.1183 25.2212 20.3381 24.8923C20.5579 24.5634 20.8702 24.3071 21.2357 24.1557C21.6011 24.0043 22.0033 23.9647 22.3912 24.0419C22.7792 24.119 23.1356 24.3095 23.4153 24.5892C23.695 24.8689 23.8855 25.2253 23.9626 25.6133C24.0398 26.0012 24.0002 26.4034 23.8488 26.7688C23.6974 27.1343 23.4411 27.4466 23.1122 27.6664C22.7833 27.8861 22.3966 28.0034 22.0011 28.0034C21.4706 28.0034 20.9619 27.7927 20.5868 27.4177C20.2118 27.0426 20.0011 26.5339 20.0011 26.0034ZM22.0011 44.0034C21.6055 44.0034 21.2188 43.8861 20.8899 43.6664C20.561 43.4466 20.3047 43.1343 20.1533 42.7688C20.0019 42.4034 19.9623 42.0012 20.0395 41.6133C20.1167 41.2253 20.3071 40.8689 20.5868 40.5892C20.8665 40.3095 21.2229 40.119 21.6109 40.0419C21.9988 39.9647 22.401 40.0043 22.7664 40.1557C23.1319 40.3071 23.4442 40.5634 23.664 40.8923C23.8838 41.2212 24.0011 41.6079 24.0011 42.0034C24.0011 42.5339 23.7903 43.0426 23.4153 43.4177C23.0402 43.7927 22.5315 44.0034 22.0011 44.0034ZM34.1431 41.0034H25.8591C25.6794 40.3162 25.3199 39.6892 24.8176 39.1869C24.3153 38.6846 23.6883 38.3251 23.0011 38.1454V29.8614C23.8179 29.6485 24.5461 29.182 25.081 28.529C25.616 27.876 25.93 27.0702 25.9781 26.2274L38.4151 23.7404C38.8067 24.5469 39.4578 25.1984 40.2641 25.5904L37.7771 38.0264C36.9343 38.0745 36.1285 38.3885 35.4755 38.9234C34.8225 39.4584 34.356 40.1866 34.1431 41.0034ZM38.0011 44.0034C37.6055 44.0034 37.2188 43.8861 36.8899 43.6664C36.561 43.4466 36.3047 43.1343 36.1533 42.7688C36.0019 42.4034 35.9623 42.0012 36.0395 41.6133C36.1167 41.2253 36.3071 40.8689 36.5868 40.5892C36.8665 40.3095 37.2229 40.119 37.6109 40.0419C37.9988 39.9647 38.401 40.0043 38.7664 40.1557C39.1319 40.3071 39.4442 40.5634 39.664 40.8923C39.8838 41.2212 40.0011 41.6079 40.0011 42.0034C40.0011 42.5339 39.7903 43.0426 39.4153 43.4177C39.0402 43.7927 38.5315 44.0034 38.0011 44.0034Z"
                  fill="#1F1F1F"
                />
              </svg>

              <div className="flex flex-col flex-shrink-0 items-start gap-3 w-[20.875rem] h-[7.1875rem]">
                <div className="flex items-center text-[#111116] text-lg font-bold leading-7">
                  Analytics and reporting.
                </div>
                <div className="flex flex-col flex-shrink-0 items-start w-[20.875rem] h-[5.4375rem]">
                  <div className="text-[#3b3b3b] text-sm font-medium leading-7">
                    Advanced analytics can identify trends,
                  </div>
                  <div className="text-[#3b3b3b] text-sm font-medium leading-7">
                    uncover common user queries, and highlight
                  </div>
                  <div className="text-[#3b3b3b] text-sm font-medium leading-7">
                    potential gaps in chatbot responses.
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col flex-shrink-0 items-start gap-14 p-8 w-[399px] h-[19.4375rem] rounded-2xl bg-[#f6f7f9]">
              <svg
                width="64"
                height="64"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  width="64"
                  height="64"
                  rx="12"
                  fill="#FFCED8"
                  fill-opacity="0.2"
                />
                <path
                  d="M45.707 35.293L42.707 32.293C42.5195 32.1055 42.2652 32.0002 42 32.0002C41.7348 32.0002 41.4805 32.1055 41.293 32.293L32 41.586V46H36.414L45.707 36.707C45.8945 36.5195 45.9998 36.2652 45.9998 36C45.9998 35.7348 45.8945 35.4805 45.707 35.293ZM35.586 44H34V42.414L39 37.414L40.586 39L35.586 44ZM42 37.586L40.414 36L42 34.414L43.586 36L42 37.586ZM46 20H39V22H42.586L35 29.586L30.707 25.293C30.5195 25.1055 30.2652 25.0002 30 25.0002C29.7348 25.0002 29.4805 25.1055 29.293 25.293L22 32.586L23.414 34L30 27.414L34.293 31.707C34.4805 31.8945 34.7348 31.9998 35 31.9998C35.2652 31.9998 35.5195 31.8945 35.707 31.707L44 23.414V27H46V20Z"
                  fill="#1F1F1F"
                />
                <path
                  d="M20 18H18V44C18 44.5304 18.2107 45.0391 18.5858 45.4142C18.9609 45.7893 19.4696 46 20 46H28V44H20V18Z"
                  fill="#1F1F1F"
                />
              </svg>

              <div className="flex flex-col flex-shrink-0 items-start gap-3 w-[20.875rem] h-[7.1875rem]">
                <div className="flex items-center text-[#111116] text-lg font-bold leading-7">
                  Multilingual AI models.
                </div>
                <div className="flex flex-col flex-shrink-0 items-start w-[20.875rem] h-[5.4375rem]">
                  <div className="text-[#3b3b3b] text-sm font-medium leading-7">
                    These models leverage advanced natural form
                  </div>
                  <div className="text-[#3b3b3b] text-sm font-medium leading-7">
                    language processing (NLP) algorithms into the
                  </div>
                  <div className="text-[#3b3b3b] text-sm font-medium leading-7">
                    understand, interpret.
                  </div>
                </div>
              </div>
            </div>
          </div>
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
