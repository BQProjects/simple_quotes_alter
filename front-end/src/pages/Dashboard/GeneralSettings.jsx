import React, { useCallback, useContext, useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import { CiSettings } from "react-icons/ci";
import { Switch, FormControlLabel } from "@mui/material";
import { UserContext } from "../../context/UserContext";
import { DatabaseContext } from "../../context/DatabaseContext";
import axios from "axios";

const GeneralSettings = () => {
  const [setting, setSetting] = useState("general");
  const { user } = useContext(UserContext);
  const { databaseUrl } = useContext(DatabaseContext);
  const [time, setTime] = useState("IST");
  const [curency, setCurency] = useState("$ USD");
  const [dataP, setDataP] = useState(false);
  const [dataA, setDataA] = useState(false);
  const [dataT, setDataT] = useState(false);
  const [emailN, setEmailN] = useState(false);
  const [pushN, setPushN] = useState(false);
  const [workspaceN, setWorkspaceN] = useState(false);
  const [proposalN, setProposalN] = useState(false);

  const getProfile = async () => {
    try {
      const res = await axios.get(`${databaseUrl}/api/workspace/profile`, {
        params: { user_id: user.id },
      });
      setTime(res.data.Time ? res.data.Time : "IST");
      setCurency(res.data.Curency ? res.data.Curency : "$ USD");
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
                <select
                  value={time}
                  onChange={(e) => {
                    updateTime(e.target.value);
                    setTime(e.target.value);
                  }}
                  className="w-full cursor-pointer border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-700 
                            focus:outline-none transition-all duration-150"
                >
                  <option value="">Select Time Zone</option>
                  <option value="IST">IST (India Standard Time)</option>
                  <option value="EST">EST (Eastern Standard Time)</option>
                  <option value="PST">PST (Pacific Standard Time)</option>
                  <option value="CST">CST (Central Standard Time)</option>
                  <option value="GMT">GMT (Greenwich Mean Time)</option>
                  <option value="UTC">UTC (Coordinated Universal Time)</option>
                  <option value="JST">JST (Japan Standard Time)</option>
                  <option value="AEST">
                    AEST (Australia Eastern Standard Time)
                  </option>
                  <option value="NST">NST (Newfoundland Standard Time)</option>
                </select>
              </div>

              <div className="w-[48%] flex flex-col gap-1">
                <label className="text-gray-500 pl-2">Currency</label>
                <select
                  value={curency}
                  onChange={(e) => {
                    updateCurency(e.target.value);
                    setCurency(e.target.value);
                  }}
                  className="w-full cursor-pointer border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-700 
                            focus:outline-none transition-all duration-150"
                >
                  <option value="">Select Currency</option>
                  <option value="USD">USD – US Dollar</option>
                  <option value="EUR">EUR – Euro</option>
                  <option value="INR">INR – Indian Rupee</option>
                  <option value="GBP">GBP – British Pound</option>
                  <option value="JPY">JPY – Japanese Yen</option>
                  <option value="AUD">AUD – Australian Dollar</option>
                  <option value="CAD">CAD – Canadian Dollar</option>
                  <option value="CNY">AED – United Arab Emirates Dirham</option>
                </select>
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
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default GeneralSettings;
