import React, { useContext, useState } from "react";
import logo from "../../assets/Web_logo.png";
import WebHeader from "../../components/WebHeader";
import { useNavigate, useParams } from "react-router-dom";
import { DatabaseContext } from "../../context/DatabaseContext";
import axios from "axios";
import { FaEye } from "react-icons/fa6";

const ChangePassword = () => {
  const { id } = useParams();
  const [pass1, setPass1] = useState(false);
  const [pass2, setPass2] = useState(false);
  const [cpassword, setCPassword] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { databaseUrl } = useContext(DatabaseContext);

  const handleSignupFirst = () => {
    if (password === "" || cpassword === "") {
      alert("passwords are empty");
      return;
    } else if (password !== cpassword) {
      alert("The password and confirm password is not same");
      return;
    } else {
      changePassword();
    }
  };

  const changePassword = async () => {
    try {
      const res = await axios.post(`${databaseUrl}/api/auth/changepass`, {
        id: id,
        password: password,
      });
      console.log(res.data);
      navigate(`/login`);
    } catch (error) {
      console.log(error);
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
              Almost there! Set your new password and continue your proposal
              journey with Simple Quest.
            </p>
          </div>
        </div>
        <div className="w-[50%] h-[90%] flex flex-col justify-center items-center">
          <div className="w-full flex items-center justify-center">
            <h1 className="text-2xl mb-10">Change Password</h1>
          </div>
          <div className="flex flex-col gap-3 items-center justify-center w-full">
            <div className="flex flex-col w-[80%] gap-1">
              <label className="text-gray-700 pl-1">Password</label>
              <div className="w-full  border border-gray-200 flex items-center justify-between pr-4 rounded-sm">
                <input
                  type={pass1 ? "text" : "password"}
                  className="w-[95%] p-2 outline-none "
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FaEye
                  onClick={() => setPass1(!pass1)}
                  className=" cursor-pointer"
                />
              </div>
            </div>
            <div className="flex flex-col w-[80%] gap-1">
              <label className="text-gray-700 pl-1">Confirm Password</label>
              <div className="w-full  border border-gray-200 flex items-center justify-between pr-4 rounded-sm">
                <input
                  type={pass2 ? "text" : "password"}
                  className="w-[95%] p-2 outline-none "
                  placeholder="Password"
                  value={cpassword}
                  onChange={(e) => setCPassword(e.target.value)}
                />
                <FaEye
                  onClick={() => setPass2(!pass2)}
                  className=" cursor-pointer"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-full mt-4">
            <button
              onClick={handleSignupFirst}
              className="pl-3 pr-3 pt-2 pb-2 mt-2 mb-2 w-[80%]  bg-graidient_bottom text-white rounded-md flex items-center justify-center"
            >
              Create New Password
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

export default ChangePassword;
