import React, { useState } from "react";
import Credit_card_payment from "../assets/Credit_card_payment.png";
import Account_group_payment from "../assets/Account_group_payment.png";
import Arrow from "../assets/arraw.png";
import Red_tick from "../assets/red_tick.png";

const PaymentCard = () => {
  const [toggleButton, setToggleButton] = useState("Yearly");
  const [teamSize, setTeamSize] = useState(6);
  return (
    <div className="w-full h-[400px] flex flex-row items-center justify-center relative border border-graidient_bottom bg-white shadow-2xl rounded-xl">
      <div className="w-1/2  flex flex-col  items-center justify-center ml-5 mt-10">
        <div className="flex flex-row  absolute left-10 top-10 ">
          <button
            className="pt-2 pb-2 pr-3 pl-3 rounded-l-2xl  "
            style={{
              backgroundColor:
                toggleButton === "Yearly"
                  ? "#DF064E"
                  : "rgba(217, 217, 217, 1)",
              color: toggleButton === "Yearly" ? "white" : "black",
            }}
            onClick={() => setToggleButton("Yearly")}
          >
            YEARLY
          </button>
          <button
            className="pt-2 pb-2 pr-3 pl-3 rounded-r-2xl  "
            style={{
              backgroundColor:
                toggleButton === "Monthly"
                  ? "#DF064E"
                  : "rgba(217, 217, 217, 1)",
              color: toggleButton === "Monthly" ? "white" : "black",
            }}
            onClick={() => setToggleButton("Monthly")}
          >
            MONTHLY
          </button>
        </div>
        <div>
          <div className="w-full flex flex-row gap-14 ">
            <div className="flex flex-row gap-2 items-center justify-center">
              <img
                src={Credit_card_payment}
                alt="payment"
                className="w-[20px] h-[20px]"
              />
              <p className="font-semibold text-[10px] lg:text-[14px]">
                Payable Amount:
              </p>
            </div>
            <div className="flex flex-row  items-center justify-end">
              <h2 className=" text-[18px] lg:text-[25px] font-bold text-graidient_bottom ">
                $20
              </h2>
              <p className="text-[8px] lg:text-[12px] text-gray-600 pt-3">
                /14 Days
              </p>
            </div>
          </div>
          <div className="w-full flex flex-row gap-14 mt-5">
            <div className="flex flex-row gap-2 items-center justify-center">
              <img
                src={Account_group_payment}
                alt="payment"
                className="w-[20px] h-[20px]"
              />
              <p className="font-semibold text-[10px] lg:text-[14px]">
                Your Team size:
              </p>
            </div>
            <div
              className=" h-10 lg:h-13 bg-overlap w-[120px] border border-graidient_bottom flex items-stretch justify-evenly "
              style={{
                color: "#DF064E",
              }}
            >
              <button
                onClick={() => setTeamSize(teamSize - 1)}
                className="text-[20px] font-bold"
              >
                -
              </button>
              <input
                type="number"
                value={teamSize}
                className="w-16 p-2 pl-5 bg-overlap"
              />
              <button
                onClick={() => setTeamSize(teamSize - 1)}
                className="text-[20px] font-bold"
              >
                +
              </button>
            </div>
          </div>
        </div>
        <button className="w-[90%] pt-1 pb-1  text-white bg-botton_white_text border-[1px] border-botton_white_text rounded-sm flex items-center justify-center mt-5 shadow-sm shadow-shadow_Bottom hover:shadow-md hover:shadow-shadow_Bottom">
          Try it free
          <img src={Arrow} alt="no" className="w-5 m-[2px]" />
        </button>
        <div className="w-[70%] flex flex-col items-center gap-1 mt-5">
          <h1 className=" text-[12px] lg:text-[15px]">
            Register for 14 days free trial{" "}
          </h1>
          <p className=" text-[10px] text-center text-gray-600">
            Best for individual freelancers. No credit card required. Cancel
            anytime.
          </p>
        </div>
      </div>
      <div className="h-2/3 w-[1px] bg-graidient_bottom ml-7"></div>
      <div className="w-1/2 flex flex-col items-start ml-16 justify-start mt-0 ">
        <h2 className="text-[20px] text-graidient_bottom">What’s included</h2>
        <div className=" mt-2 flex flex-col gap-2">
          <div className="flex gap-2 ">
            <img src={Red_tick} alt="symbol" className="w-4 h-4" />
            <p className="text-[12px]">Unlimited proposals</p>
          </div>
          <div className="flex gap-2 ">
            <img src={Red_tick} alt="symbol" className="w-4 h-4" />
            <p className="text-[12px]">Proposal analytics</p>
          </div>
          <div className="flex gap-2 ">
            <img src={Red_tick} alt="symbol" className="w-4 h-4" />
            <p className="text-[12px]">200+ Templates </p>
          </div>
          <div className="flex gap-2 ">
            <img src={Red_tick} alt="symbol" className="w-4 h-4" />
            <p className="text-[12px]">Content Library</p>
          </div>
          <div className="flex gap-2 ">
            <img src={Red_tick} alt="symbol" className="w-4 h-4" />
            <p className="text-[12px]">Live chat support</p>
          </div>
          <div className="flex gap-2 ">
            <img src={Red_tick} alt="symbol" className="w-4 h-4" />
            <p className="text-[12px]">Users' roles</p>
          </div>
          <div className="flex gap-2 ">
            <img src={Red_tick} alt="symbol" className="w-4 h-4" />
            <p className="text-[12px]">Shared content & proposals</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCard;
