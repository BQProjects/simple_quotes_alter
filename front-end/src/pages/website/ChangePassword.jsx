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
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });
  const navigate = useNavigate();
  const { databaseUrl } = useContext(DatabaseContext);

  // Password strength indicator function
  const getPasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score++;

    if (score <= 2) return { label: "Weak", color: "#DF064E" };
    if (score === 3 || score === 4)
      return { label: "Medium", color: "#FFD600" };
    if (score === 5) return { label: "Strong", color: "#00C853" };
    return { label: "", color: "" };
  };

  // Password validation functions
  const validatePasswordStrength = (password) => {
    const strength = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    };
    setPasswordStrength(strength);
    return strength;
  };

  const validatePassword = (password, confirmPassword) => {
    const newErrors = {};

    if (!password) {
      newErrors.password = "Password is required";
    } else {
      const strength = validatePasswordStrength(password);
      const requirements = [];

      if (!strength.length) requirements.push("at least 8 characters");
      if (!strength.uppercase) requirements.push("one uppercase letter");
      if (!strength.lowercase) requirements.push("one lowercase letter");
      if (!strength.number) requirements.push("one number");
      if (!strength.special) requirements.push("one special character");

      if (requirements.length > 0) {
        newErrors.password = `Password must contain ${requirements.join(", ")}`;
      }
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePasswordStrength(newPassword);

    // Clear password error when user starts typing
    if (errors.password) {
      setErrors((prev) => ({ ...prev, password: "" }));
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setCPassword(newConfirmPassword);

    // Clear confirm password error when user starts typing
    if (errors.confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: "" }));
    }
  };

  const handleSignupFirst = () => {
    if (validatePassword(password, cpassword)) {
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
                  className="w-[85%] p-2 outline-none "
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                {/* Password strength indicator */}
                {password.length > 0 && (
                  <span
                    className="text-xs font-medium mr-2"
                    style={{ color: getPasswordStrength(password).color }}
                  >
                    {getPasswordStrength(password).label}
                  </span>
                )}
                <FaEye
                  onClick={() => setPass1(!pass1)}
                  className=" cursor-pointer"
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
            <div className="flex flex-col w-[80%] gap-1">
              <label className="text-gray-700 pl-1">Confirm Password</label>
              <div className="w-full  border border-gray-200 flex items-center justify-between pr-4 rounded-sm">
                <input
                  type={pass2 ? "text" : "password"}
                  className="w-[95%] p-2 outline-none "
                  placeholder="Password"
                  value={cpassword}
                  onChange={handleConfirmPasswordChange}
                />
                <FaEye
                  onClick={() => setPass2(!pass2)}
                  className=" cursor-pointer"
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
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
