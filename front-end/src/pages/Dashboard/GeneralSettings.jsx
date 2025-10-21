import React, { useCallback, useContext, useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import { CiSettings } from "react-icons/ci";
import { Switch, FormControlLabel } from "@mui/material";
import { UserContext } from "../../context/UserContext";
import { DatabaseContext } from "../../context/DatabaseContext";
import axios from "axios";
import Select from "react-select"; // Add this import for React Select

const GeneralSettings = () => {
  const [setting, setSetting] = useState("general");
  const { user } = useContext(UserContext);
  const { databaseUrl } = useContext(DatabaseContext);
  const [time, setTime] = useState("IST");
  const [curency, setCurency] = useState("USD"); // Changed default to match option value
  const [dataP, setDataP] = useState(false);
  const [dataA, setDataA] = useState(false);
  const [dataT, setDataT] = useState(false);
  const [emailN, setEmailN] = useState(false);
  const [pushN, setPushN] = useState(false);
  const [workspaceN, setWorkspaceN] = useState(false);
  const [proposalN, setProposalN] = useState(false);

  // Define Time Zone options for React Select
  const timeZoneOptions = [
    { value: "", label: "Select Time Zone" },
    { value: "IST", label: "IST (India Standard Time)" },
    { value: "EST", label: "EST (Eastern Standard Time)" },
    { value: "PST", label: "PST (Pacific Standard Time)" },
    { value: "CST", label: "CST (Central Standard Time)" },
    { value: "GMT", label: "GMT (Greenwich Mean Time)" },
    { value: "UTC", label: "UTC (Coordinated Universal Time)" },
    { value: "JST", label: "JST (Japan Standard Time)" },
    { value: "AEST", label: "AEST (Australia Eastern Standard Time)" },
    { value: "NST", label: "NST (Newfoundland Standard Time)" },
  ];

  // Define Currency options for React Select
  const currencyOptions = [
    { value: "", label: "Select Currency" },
    { value: "USD", label: "USD $ US Dollar" },
    { value: "EUR", label: "EUR € Euro" },
    { value: "INR", label: "INR ₹ Indian Rupee" },
    { value: "GBP", label: "GBP £ British Pound" },
    { value: "JPY", label: "JPY ¥ Japanese Yen" },
    { value: "AUD", label: "AUD $ Australian Dollar" },
    { value: "CAD", label: "CAD $ Canadian Dollar" },
    { value: "CNY", label: "CNY ¥ Chinese Yuan" },
  ];

  // Custom styles for React Select (same as in Profile.jsx)
  const customStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: "white",
      borderColor: state.isFocused ? "#6b7280" : "#d1d5db", // active vs default
      boxShadow: "none",
      borderRadius: "4px",
      padding: "",
      fontSize: "12px",
      cursor: "pointer",
      "&:hover": {
        borderColor: "#6b7280",
      },
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? "#e5e7eb" : "white", // grey on hover
      color: "#111827",
      fontSize: "12px",
      cursor: "pointer",
    }),
    menu: (base) => ({
      ...base,
      zIndex: 20,
      marginTop: 0,
    }),
    menuList: (base) => ({
      ...base,
      paddingTop: 0, // optional: tighter top padding
      paddingBottom: 0, // optional: tighter bottom padding
    }),
    dropdownIndicator: (base) => ({
      ...base,
      padding: 4,
      svg: {
        width: 13, // reduce width of arrow
        height: 13, // reduce height of arrow
      },
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
  };

  const getProfile = async () => {
    try {
      const res = await axios.get(`${databaseUrl}/api/workspace/profile`, {
        params: { user_id: user.id },
      });
      setTime(res.data.Time ? res.data.Time : "IST");
      setCurency(res.data.Curency ? res.data.Curency : "USD"); // Updated default to "USD"
      setDataA(res.data.DataA ? res.data.DataA : false);
      setDataP(res.data.DataP ? res.data.DataP : false);
      setDataT(res.data.DataT ? res.data.DataT : false);
      setEmailN(res.data.EmailN ? res.data.EmailN : false);
      setPushN(res.data.PushN ? res.data.PushN : false);
      setWorkspaceN(res.data.WorkspaceN ? res.data.WorkspaceN : false);
      setProposalN(res.data.ProposalN ? res.data.ProposalN : false);
    } catch (error) {
      console.error("Error fetching workspaces:", error);
    }
  };
  useEffect(() => {
    getProfile();
  }, []);
  const updateTime = async (value) => {
    try {
      const response = await axios.post(`${databaseUrl}/api/workspace/time`, {
        value: value,
        user_id: user.id,
      });
    } catch (error) {
      console.error("API Error:", error);
    }
  };
  const updateCurency = async (value) => {
    try {
      const response = await axios.post(
        `${databaseUrl}/api/workspace/curency`,
        { value: value, user_id: user.id }
      );
    } catch (error) {
      console.error("API Error:", error);
    }
  };
  const updateDataP = async (value) => {
    try {
      const response = await axios.post(`${databaseUrl}/api/workspace/datap`, {
        value: value,
        user_id: user.id,
      });
      console.log(!value);
      setDataP(value);
    } catch (error) {
      console.error("API Error:", error);
    }
  };
  const updateDataA = async (value) => {
    try {
      const response = await axios.post(`${databaseUrl}/api/workspace/dataa`, {
        value: value,
        user_id: user.id,
      });
      setDataA(value);
    } catch (error) {
      console.error("API Error:", error);
    }
  };
  const updateDataT = async (value) => {
    try {
      const response = await axios.post(`${databaseUrl}/api/workspace/datat`, {
        value: value,
        user_id: user.id,
      });
      setDataT(value);
    } catch (error) {
      console.error("API Error:", error);
    }
  };
  const updateEmailN = async (value) => {
    try {
      const response = await axios.post(`${databaseUrl}/api/workspace/emailn`, {
        value: value,
        user_id: user.id,
      });
      setEmailN(value);
    } catch (error) {
      console.error("API Error:", error);
    }
  };
  const updatePushN = async (value) => {
    try {
      const response = await axios.post(`${databaseUrl}/api/workspace/pushn`, {
        value: value,
        user_id: user.id,
      });
      setPushN(value);
    } catch (error) {
      console.error("API Error:", error);
    }
  };
  const updateWorkspaceN = async (value) => {
    try {
      const response = await axios.post(
        `${databaseUrl}/api/workspace/workspacen`,
        { value: value, user_id: user.id }
      );
      setWorkspaceN(value);
    } catch (error) {
      console.error("API Error:", error);
    }
  };
  const updateProposalN = async (value) => {
    try {
      const response = await axios.post(
        `${databaseUrl}/api/workspace/proposaln`,
        { value: value, user_id: user.id }
      );
      setProposalN(value);
    } catch (error) {
      console.error("API Error:", error);
    }
  };
  return (
    <>
      <div className="w-full bg-white min-h-[85vh] px-16 pt-8 shadow-lg shadow-gray-300 ">
        <div className="flex items-center justify-start gap-1 text-xl text-gray-500  ">
          <CiSettings className="text-2xl" /> <h2>Settings</h2>
        </div>
        <div className="w-[95%] flex mt-6 px-8 gap-14 text-gray-500 text-lg border-b border-gray-200 ">
          <button
            className={`px-2 py-1 ${
              setting === "general"
                ? "border-b-2 border-graidient_bottom"
                : "none"
            }`}
            onClick={() => setSetting("general")}
          >
            General
          </button>
          <button
            onClick={() => setSetting("privacy")}
            className={`px-2 py-1 ${
              setting === "privacy"
                ? "border-b-2 border-graidient_bottom"
                : "none"
            }`}
          >
            Privacy
          </button>
          <button
            onClick={() => setSetting("notification")}
            className={`px-2 py-1 ${
              setting === "notification"
                ? "border-b-2 border-graidient_bottom"
                : "none"
            }`}
          >
            Notifications
          </button>
        </div>
        {setting === "general" ? (
          <div className="w-[90%] px-6  mt-5 flex flex-col ">
            <div className="w-[70%] flex flex-col gap-1 ">
              <label className="text-gray-500 pl-2">Name</label>
              <input
                type="text"
                value={user.username}
                className="w-full border border-gray-200 px-2 py-2 rounded-md outline-none"
                readOnly={true}
              />
            </div>
            <div className="flex justify-between mt-4 w-[70%]">
              <div className="w-[48%] flex flex-col gap-1">
                <label className="text-gray-500 pl-2">Time Zone</label>
                {/* Replaced native select with React Select */}
                <Select
                  options={timeZoneOptions}
                  value={timeZoneOptions.find((opt) => opt.value === time)}
                  onChange={(selectedOption) => {
                    updateTime(selectedOption.value);
                    setTime(selectedOption.value);
                  }}
                  styles={customStyles}
                  className="text-xs"
                  isSearchable={false}
                />
              </div>

              <div className="w-[48%] flex flex-col gap-1">
                <label className="text-gray-500 pl-2">Currency</label>
                {/* Replaced native select with React Select */}
                <Select
                  options={currencyOptions}
                  value={currencyOptions.find((opt) => opt.value === curency)}
                  onChange={(selectedOption) => {
                    updateCurency(selectedOption.value);
                    setCurency(selectedOption.value);
                  }}
                  styles={customStyles}
                  className="text-xs"
                  isSearchable={false}
                />
              </div>
            </div>
            <div className="w-[70%] flex flex-col gap-1 mt-4 ">
              <label className="text-gray-500 pl-2">Email</label>
              <input
                type="text"
                value={user.email}
                className="w-full border border-gray-200 px-2 py-2 rounded-md outline-none bg-gray-100"
                readOnly={true}
              />
            </div>
            <div className="w-full py-4 px-2 flex items-center justify-between border border-gray-200 rounded-md mt-4">
              <div className="flex flex-col px-4">
                <h1 className="text-gray-600">Update your password</h1>
                <p className="text-xs text-gray-400">
                  {" "}
                  Choose a new password to sign in your account
                </p>
              </div>
              <button className="text-graidient_bottom text-sm">
                Update Password
              </button>
            </div>
            <div className="w-full py-4 px-2 flex items-center justify-between border border-gray-200 rounded-md mt-4">
              <div className="flex flex-col px-4">
                <h1 className="text-gray-600">Enable 2FA</h1>
                <p className="text-xs text-gray-400">
                  Secure your sign in with two-factor authentication.
                </p>
              </div>
              <button className="text-graidient_bottom text-sm">
                Enable 2FA
              </button>
            </div>
            <div className="w-full py-4 px-5 flex items-center justify-between rounded-md mt-4">
              <button className="text-graidient_bottom text-sm">log out</button>
              <button className="text-graidient_bottom text-sm">
                delete profile
              </button>
            </div>
          </div>
        ) : setting === "privacy" ? (
          <div className="w-[90%] px-6  mt-5 flex flex-col ">
            <div className="w-full py-4 px-2 flex items-center justify-between border border-gray-200 rounded-md mt-4">
              <div className="flex flex-col px-4">
                <h1 className="text-gray-600">Data Sharing</h1>
                <p className="text-xs text-gray-400">
                  By enabling you agree to share data to improve service
                  performance.
                </p>
              </div>
              <Switch
                checked={dataP}
                onChange={(e) => {
                  updateDataP(e.target.checked);
                }}
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: "#DF064E",
                  },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: "#DF064E",
                  },
                }}
              />
            </div>
            <div className="w-full py-4 px-2 flex items-center justify-between border border-gray-200 rounded-md mt-4">
              <div className="flex flex-col px-4">
                <h1 className="text-gray-600">Activity Logs</h1>
                <p className="text-xs text-gray-400">
                  By enabling you agree to share data to improve service
                  performance.
                </p>
              </div>
              <Switch
                checked={dataA}
                onChange={(e) => {
                  updateDataA(e.target.checked);
                }}
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: "#DF064E",
                  },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: "#DF064E",
                  },
                }}
              />
            </div>
            <div className="w-full py-4 px-2 flex items-center justify-between border border-gray-200 rounded-md mt-4">
              <div className="flex flex-col px-4">
                <h1 className="text-gray-600">Team members tracking logs</h1>
                <p className="text-xs text-gray-400">
                  By enabling you agree to share data to improve service
                  performance.
                </p>
              </div>
              <Switch
                onChange={(e) => {
                  updateDataT(e.target.checked);
                }}
                checked={dataT}
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: "#DF064E",
                  },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: "#DF064E",
                  },
                }}
              />
            </div>
          </div>
        ) : (
          <div className="w-[90%] px-6  mt-5 flex flex-col ">
            <div className="w-full py-1 px-2 flex items-center justify-between border border-gray-200 rounded-md mt-4">
              <div className="flex flex-col px-4">
                <h1 className="text-gray-600">Email Notification</h1>
              </div>
              <Switch
                onChange={(e) => {
                  updateEmailN(e.target.checked);
                }}
                checked={emailN}
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: "#DF064E",
                  },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: "#DF064E",
                  },
                }}
              />
            </div>
            <div className="w-full py-1 px-2 flex items-center justify-between border border-gray-200 rounded-md mt-4">
              <div className="flex flex-col px-4">
                <h1 className="text-gray-600">Push Notification</h1>
              </div>
              <Switch
                onChange={(e) => {
                  updatePushN(e.target.checked);
                }}
                checked={pushN}
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: "#DF064E",
                  },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: "#DF064E",
                  },
                }}
              />
            </div>
            <div className="w-full py-1 px-2 flex items-center justify-between border border-gray-200 rounded-md mt-4">
              <div className="flex flex-col px-4">
                <h1 className="text-gray-600">New Workspace Creation</h1>
              </div>
              <Switch
                onChange={(e) => {
                  updateWorkspaceN(e.target.checked);
                }}
                checked={workspaceN}
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: "#DF064E",
                  },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: "#DF064E",
                  },
                }}
              />
            </div>
            <div className="w-full py-1 px-2 flex items-center justify-between border border-gray-200 rounded-md mt-4">
              <div className="flex flex-col px-4">
                <h1 className="text-gray-600">New Proposal Creation</h1>
              </div>
              <Switch
                checked={proposalN}
                onChange={(e) => {
                  updateProposalN(e.target.checked);
                }}
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: "#DF064E",
                  },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: "#DF064E",
                  },
                }}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default GeneralSettings;
