import React, { useContext, useState } from "react";
import Signup_logo from "../../assets/Signup_logo.png";
import Google from "../../assets/Google.png";
import Linkedin from "../../assets/Linkedin.png";
import Yahoo from "../../assets/Yahoo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import WebHeader from "../../components/WebHeader";
import { DatabaseContext } from "../../context/DatabaseContext";
import { UserContext } from "../../context/UserContext";
import { FaEye } from "react-icons/fa6";
import logo from "../../assets/Web_logo.png";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { databaseUrl } = useContext(DatabaseContext);
  const { user, setUser } = useContext(UserContext);
  const [pass, setPass] = useState(false);
  const [errorL, setErrorL] = useState(null);
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const handleSignupFirst = () => {
    if (email === "" || password === "") {
      setError(true);
      console.log("error");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    try {
      if (handleSignupFirst() === false) {
        alert("error");
      } else {
        const res = await axios.post(`${databaseUrl}/api/auth/login`, {
          email,
          password,
        });
        if (res.data.error) {
          toast.error(res.data.error);
          console.log(res.data.error);
          if (res.data.error === "Password didn't match") {
            setErrorL("Wrong Password");
          }
          setError(true);
        } else {
          localStorage.setItem("user", JSON.stringify(res.data));
          setUser(res.data);
          toast.success("Login Successful");
          navigate("/home");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const signupwithgoogle = () => {
    window.open(`${databaseUrl}/auth/google/callback`, "_self");
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
              Welcome back to Simple Quotes — where great proposals begin
            </p>
          </div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault(); // Prevents page reload
            handleLogin();
          }}
          className="w-[50%] h-[90%] flex flex-col justify-center items-center"
        >
          <div className="w-full flex items-center justify-center">
            <h1 className="text-2xl mb-10">Welcome back!</h1>
          </div>
          <div className="flex flex-col gap-3 items-center justify-center w-full">
            <div className="flex flex-col w-[80%] gap-1">
              <label className="text-gray-700 pl-1">Email</label>
              <input
                type="text"
                className="w-full  p-2 border border-gray-300 rounded-sm outline-none "
                placeholder="Email Address"
                value={email}
                // style={{
                //   borderColor: error && "red",
                // }}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-[80%] gap-1">
              <label className="text-gray-700 pl-1">Password</label>
              <div className="relative w-full">
                <div
                  className={`w-full flex items-center justify-between pr-4 rounded-sm border ${
                    error ? "border-[#DF064E]" : "border-gray-300"
                  }`}
                >
                  <input
                    type={pass ? "text" : "password"}
                    className="w-[95%] p-2 outline-none "
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <FaEye
                    onClick={() => setPass(!pass)}
                    className=" cursor-pointer"
                  />
                </div>
                <div className="flex items-center justify-between w-full">
                  {error && (
                    <p className="text-xs text-[#DF064E]">Wrong Password</p>
                  )}
                  <p
                    onClick={() => navigate("/forgot")}
                    className="text-xs text-gray-500 cursor-pointer ml-auto"
                  >
                    Forgot Password
                  </p>
                </div>
              </div>
              {/* ✅ Error text below input */}
              {error && (
                <div className="mt-1">
                  <p className="text-sm text-[#DF064E] pl-1">{errorL}</p>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-full mt-4">
            {/* <a onClick={() => navigate("/signup")} className="mt-5">
              Create new Account?
            </a> */}
            <button
              type="submit"
              className="pl-3 pr-3 pt-2 pb-2 mt-2 mb-2 w-[80%]  bg-graidient_bottom text-white rounded-md flex items-center justify-center"
            >
              LOGIN
            </button>
          </div>
          <div className="w-full flex flez-row items-center justify-center p-6 gap-3 ">
            <div className=" w-[30%] h-[1px] bg-gray-400"></div>
            <p className="text-sm text-gray-700">Or Login with</p>
            <div className=" w-[30%] h-[1px] bg-gray-400"></div>
          </div>
          <div className="w-full">
            <div className="w-full flex items-center justify-evenly mt-4 mr-4">
              <button
                onClick={() => signupwithgoogle()}
                className="w-[80%] py-2 flex items-center justify-center bg-white rounded-sm border border-gray-300  gap-2 text-gray-600"
              >
                <img src={Google} alt="google" className="w-6" />
                Google
              </button>
            </div>
            <div className="w-full flex items-center justify-center mt-6 text-sm">
              <a className="text-gray-500">
                New to Simple?{" "}
                <span
                  className="text-graidient_bottom cursor-pointer"
                  onClick={() => navigate("/signup")}
                >
                  {" "}
                  Sign up for free
                </span>
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
