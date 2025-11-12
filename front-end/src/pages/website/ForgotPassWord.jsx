import React, { useContext, useState } from "react";
import logo from "../../assets/Web_logo.png";
import WebHeader from "../../components/WebHeader";
import { useNavigate } from "react-router-dom";
import { DatabaseContext } from "../../context/DatabaseContext";
import axios from "axios";

const ForgotPassWord = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { databaseUrl } = useContext(DatabaseContext);

  const sendResetEmail = async () => {
    if (!email) {
      setMessage("Please enter your email address");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(`${databaseUrl}/api/auth/sendresetemail`, {
        email: email,
      });

      if (res.data.message) {
        setMessage(
          "Password reset email sent successfully! Please check your inbox."
        );
      }
    } catch (error) {
      console.log(error);
      if (error.response?.data?.error) {
        setMessage(error.response.data.error);
      } else {
        setMessage("Failed to send reset email. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center be-vietnam-pro-regular">
      <div className="fixed top-0 left-0 right-0">
        <WebHeader />
      </div>
      <div className="w-[70%] h-[75%] bg-white flex items-center shadow-xl shadow-gray-200 justify-between mt-16 border border-gray-100 rounded-xl  ">
        <div className="w-[50%] h-[100%] flex items-center justify-center  ">
          <div className="w-[85%] h-[85%] flex items-center justify-center text-center relative bg-gray-200 rounded-2xl">
            <div className="w-full h-14 flex justify-center items-center absolute top-1">
              <img src={logo} className="w-40" alt="" />
            </div>
            <p className="w-[70%] text-center">
              Lost your way? Simple Quest will help you get back on track.
            </p>
          </div>
        </div>
        <div className="w-[50%] h-[90%] flex flex-col justify-center items-center">
          <div className="w-full flex items-center justify-center">
            <h1 className="text-2xl mb-10">Forgot Password</h1>
          </div>
          <div className="flex flex-col gap-3 items-center justify-center w-full">
            <div className="flex flex-col w-[80%] gap-1">
              <label className="text-gray-700 pl-1">Email</label>
              <input
                type="text"
                className="w-full  p-2 border border-gray-300 rounded-sm outline-none "
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {message && (
              <div
                className={`w-[80%] p-2 rounded-sm text-center text-sm ${
                  message.includes("successfully")
                    ? "bg-green-100 text-green-700 border border-green-200"
                    : "bg-red-100 text-red-700 border border-red-200"
                }`}
              >
                {message}
              </div>
            )}
          </div>
          <div className="flex flex-col items-center justify-center w-full mt-4">
            <button
              onClick={sendResetEmail}
              disabled={loading}
              className="pl-3 pr-3 pt-2 pb-2 mt-2 mb-2 w-[80%] bg-graidient_bottom text-white rounded-md flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Send Reset Email"}
            </button>
          </div>
          <a className="text-gray-500 text-sm">
            Back to{" "}
            <span
              className="text-graidient_bottom"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassWord;
