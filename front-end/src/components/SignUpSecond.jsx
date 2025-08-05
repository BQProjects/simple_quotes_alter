import React, { useState, useContext } from "react";
import logo from "../assets/Logo.png";
import Signup_logo from "../assets/Signup_logo.png";
import Signup_company from "../assets/signup_company.png";
import Arrow from "../assets/arraw.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DatabaseContext } from "../context/DatabaseContext";
import { FaRegFolder } from "react-icons/fa";
import toast from "react-hot-toast";

const SignUpSecond = ({ setNext, email, password }) => {
  const [fullname, setFullname] = useState("");
  const [companyName, setComapanyName] = useState("");
  const [teamName, setTeamName] = useState("");
  const [companySize, setComapnySize] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [workspace, setWorkspace] = useState("");
  const [color, setColor] = useState("green");
  const navigate = useNavigate();
  const { databaseUrl } = useContext(DatabaseContext);

  const handleGoback = () => {
    setNext(false);
  };

  const handleSubmit = async () => {
    try {
      await axios
        .post(`${databaseUrl}/api/auth/signup`, {
          fullName: fullname,
          email: email,
          password: password,
          companyName: companyName,
          companySize: companySize,
          teamName: teamName,
          teamSize: teamSize,
          workspaceName: workspace,
          workspaceColor: color,
          subscription: "trial",
        })
        .then((res) => console.log(res));
      toast.success("Successfully created account");
    } catch (error) {
      console.log(error);
    } finally {
      navigate("/login");
    }
  };
  return (
    <div className="w-[50%] h-[90%] flex flex-col justify-center items-center gap-4">
      <div className="w-full flex items-center justify-center">
        <h1 className="text-2xl mb-2">Create Workspace</h1>
      </div>
      <div className="flex flex-col gap-2 w-[80%]">
        <p className="pl-1">Sign Up With:</p>
        <input
          type="text"
          className="w-full  p-2 border border-gray-200 rounded-sm outline-none "
          placeholder="Fullname"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 w-[80%]">
        <p className="pl-1">Company & Team Details:</p>
        <div className="w-full flex items-center justify-center gap-2">
          <input
            type="text"
            className="w-[50%] p-2 border border-gray-200 "
            placeholder="Company Name"
            value={companyName}
            onChange={(e) => setComapanyName(e.target.value)}
          />
          <input
            type="text"
            className="w-[50%]   p-2 border border-gray-200 "
            placeholder="Company Size"
            value={companySize}
            onChange={(e) => setComapnySize(e.target.value)}
          />
        </div>
        <div className="w-full mt-2 flex items-center justify-center gap-2">
          <input
            type="text"
            className="w-[50%]  p-2 border border-gray-200 "
            placeholder="Team Name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
          <input
            type="text"
            className="w-[50%] p-2 border border-gray-200 "
            placeholder="Team Size"
            value={teamSize}
            onChange={(e) => setTeamSize(e.target.value)}
          />
        </div>
      </div>

      {/* This div is incomplete */}
      <div className="flex flex-col gap-2 w-[80%]">
        <p className="pl-1">Workspace:</p>
        <input
          type="text"
          className="w-full  p-2 border border-gray-200 rounded-sm outline-none "
          placeholder="Workspace Name"
          style={{
            borderColor: color,
          }}
          value={workspace}
          onChange={(e) => setWorkspace(e.target.value)}
        />
        <div className="flex flex-col  w-full ">
          <div className="flex flex-row gap-6 mt-2 ml-2">
            <div
              onClick={() => setColor("green")}
              className=" w-12 h-12 shadow-md shadow-gray-300 flex items-center justify-center text-green-700 rounded-lg"
            >
              <FaRegFolder className="text-2xl" />
            </div>
            <div
              onClick={() => setColor("red")}
              className=" w-12 h-12 shadow-md shadow-gray-300 flex items-center justify-center text-red-700 rounded-lg"
            >
              <FaRegFolder className="text-2xl" />
            </div>
            <div
              onClick={() => setColor("blue")}
              className=" w-12 h-12 shadow-md shadow-gray-300 flex items-center justify-center text-blue-700 rounded-lg"
            >
              <FaRegFolder className="text-2xl" />
            </div>
            <div
              onClick={() => setColor("orange")}
              className=" w-12 h-12 shadow-md shadow-gray-300 flex items-center justify-center text-orange-700 rounded-lg"
            >
              <FaRegFolder className="text-2xl" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3  items-center justify-center w-full mt-4">
        <button
          onClick={handleSubmit}
          className=" w-[80%] py-2 bg-botton_white_text border-[1px] border-botton_white_text rounded-md flex items-center justify-center text-white "
        >
          Get started
          <img src={Arrow} alt="no" className="w-5 m-[2px]" />
        </button>
      </div>
    </div>
  );
};

export default SignUpSecond;
