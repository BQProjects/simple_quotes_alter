import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Paymentverification = () => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl text-center relative animate-[fadeIn_.3s_ease]">
        <DotLottieReact
          src="https://lottie.host/be23523b-e7b2-4eaf-ba64-11dff0b9eaba/mjqGtY7pIY.lottie"
          autoplay
          loop={false}
          className="w-40 mx-auto"
        />

        <h2 className="text-xl font-semibold mt-4">
          Payment Done Successfully
        </h2>
        <p className="text-gray-600 mt-2">Thank You</p>
      </div>
    </div>
  );
};

export default Paymentverification;
