import React from "react";
import WebHeader from "../../components/WebHeader";
import SignUpFIrst from "../../components/SignUpFIrst";

const Signup = () => {
  return (
    <div className="w-full h-screen  flex items-center justify-center">
      <div className="fixed top-0 left-0 right-0">
        <WebHeader />
      </div>
      <SignUpFIrst />
    </div>
  );
};

export default Signup;
