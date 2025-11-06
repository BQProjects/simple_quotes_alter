import React, { useContext, useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import { DatabaseContext } from "../../context/DatabaseContext";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import { LiaEditSolid } from "react-icons/lia";
import { FaRegCopy } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdRestorePage } from "react-icons/md";
import { Switch } from "@mui/material";
import { IoSettingsOutline, IoChevronForward } from "react-icons/io5";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const DashboardSettings = () => {
  const [dataP, setDataP] = useState(true);
  const [dataA, setDataA] = useState(true);
  const [dataT, setDataT] = useState(true);
  const [emailN, setEmailN] = useState(true);
  const [pushN, setPushN] = useState(true);
  const [workspaceN, setWorkspaceN] = useState(true);
  const [proposalN, setProposalN] = useState(true);
  const { user } = useContext(UserContext);
  const { databaseUrl } = useContext(DatabaseContext);
  const navigate = useNavigate();

  const getProfile = async () => {
    try {
      const res = await axios.get(`${databaseUrl}/api/workspace/profile`, {
        params: { user_id: user.id },
      });
      setDataA(res.data.DataA !== undefined ? res.data.DataA : true);
      setDataP(res.data.DataP !== undefined ? res.data.DataP : true);
      setDataT(res.data.DataT !== undefined ? res.data.DataT : true);
      setEmailN(res.data.EmailN !== undefined ? res.data.EmailN : true);
      setPushN(res.data.PushN !== undefined ? res.data.PushN : true);
      setWorkspaceN(
        res.data.WorkspaceN !== undefined ? res.data.WorkspaceN : true
      );
      setProposalN(
        res.data.ProposalN !== undefined ? res.data.ProposalN : true
      );
    } catch (error) {
      console.error("Error fetching workspaces:", error);
    }
  };
  useEffect(() => {
    getProfile();
  }, []);
  const updateDataP = async (value) => {
    try {
      const response = await axios.post(`${databaseUrl}/api/workspace/datap`, {
        value: value,
        user_id: user.id,
      });
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
      <div className="w-[100%] bg-gray-100 min-h-[90vh]">
        <div className="relative w-full h-[88vh] bg-white px-10 pt-10 flex flex-col ">
          <div className="text-xl font-semibold text-gray-600 mb-6 flex items-center justify-start gap-3">
            <IoSettingsOutline className="w-6 h-6 " />
            <h1>Settings</h1>
          </div>
          <div className="h-[74vh] overflow-y-auto scrollbar-hide">
            {/* Manage team row/card per design */}
            <div
              className="flex justify-between items-start border border-gray-200 self-stretch py-4 px-6 rounded-[0.4375rem] bg-white mb-6"
              onClick={() => navigate("/manage")}
            >
              <div className="flex flex-col items-start gap-2 self-stretch">
                <h3 className="text-xl font-medium text-neutral-600">
                  Manage team
                </h3>
                <p className="text-[.9375rem] leading-normal text-[#8c8c8c] self-stretch">
                  Add, remove, or edit members in your workspace. Assign roles
                  and <br /> permissions to control who can , edit, and send
                  proposals.
                </p>
              </div>

              <IoChevronForward className="w-5 h-5 text-gray-500" />
            </div>

            {/* Subscription details row/card per design */}
            <div
              className="flex justify-between items-start border border-gray-200 self-stretch py-4 px-6 rounded-[0.4375rem] bg-white mb-6"
              onClick={() => navigate("/subscription")}
            >
              <div className="flex flex-col items-start gap-6 w-[837px]">
                <div className="flex flex-col items-start gap-2 self-stretch">
                  <div className="text-xl font-medium text-neutral-600 self-stretch leading-normal">
                    Subscription details
                  </div>
                  <div className="text-[.9375rem] leading-normal text-[#8c8c8c] self-stretch">
                    View and manage your current plan details, billing period,
                    and renewal <br /> dates. Stay updated on your subscription
                    status and usage.
                  </div>
                </div>
                <div className="flex mt-3 items-center justify-between w-[50%]">
                  <h2 className="ml-2 flex items-center gap-2 text-gray-600 text-lg ">
                    Start Date
                  </h2>
                  <p className="text-xl flex items-center text-gray-700 text-start">
                    {new Date(
                      user.subscriptionDate || Date.now()
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex mt-3 items-center justify-between w-[50%]">
                  <h2 className="ml-2 flex items-center gap-2 text-gray-600 text-lg ">
                    End Date
                  </h2>
                  <p className="text-xl flex items-center text-gray-700 text-start">
                    {user.subscription === "trial"
                      ? new Date(
                          new Date(user.subscriptionDate).setDate(
                            new Date(user.subscriptionDate).getDate() + 14
                          )
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : new Date(
                          user.subscriptionEnd || Date.now()
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                  </p>
                </div>
              </div>

              <IoChevronForward className="w-5 h-5 text-gray-500" />
            </div>

            {/* Privacy settings card */}

            <div className=" flex flex-col items-start border border-gray-200 mb-6 gap-6 self-stretch py-4 px-6 rounded-[0.4375rem] bg-white">
              <div className="flex flex-col items-start gap-2 self-stretch">
                <div className="text-xl font-medium text-neutral-600 self-stretch leading-normal">
                  Privacy
                </div>
              </div>
              <div className="flex flex-col items-start gap-2 self-stretch">
                <div className="flex justify-between items-center self-stretch py-2 px-6 h-[4.5rem] rounded-[0.4375rem] bg-[#f7f7f7]">
                  <div className="w-[642px] text-[.9375rem] leading-normal">
                    <span className="text-[#525252]">Data Sharing</span>
                    <br />
                    <span className="text-[#8c8c8c]">
                      By enabling you agree to share data to improve service
                      performance.
                    </span>
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
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                        {
                          backgroundColor: "#DF064E",
                        },
                    }}
                  />
                </div>
                <div className="flex justify-between items-center self-stretch py-2 px-6 h-[4.5rem] rounded-[0.4375rem] bg-[#f7f7f7]">
                  <div className="w-[642px] text-[.9375rem] leading-normal">
                    <span className="text-[#525252]">Activity Logs</span>
                    <br />
                    <span className="text-[#8c8c8c]">
                      By enabling you agree to share data to improve service
                      performance.
                    </span>
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
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                        {
                          backgroundColor: "#DF064E",
                        },
                    }}
                  />
                </div>
                <div className="flex justify-between items-center self-stretch py-2 px-6 h-[4.5rem] rounded-[0.4375rem] bg-[#f7f7f7]">
                  <div className="w-[642px] text-[.9375rem] leading-normal">
                    <span className="text-[#525252]">
                      Team members tracking logs
                    </span>
                    <br />
                    <span className="text-[#8c8c8c]">
                      By enabling you agree to share data to improve service
                      performance.
                    </span>
                  </div>
                  <Switch
                    checked={dataT}
                    onChange={(e) => {
                      updateDataT(e.target.checked);
                    }}
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked": {
                        color: "#DF064E",
                      },
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                        {
                          backgroundColor: "#DF064E",
                        },
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Notification settings card */}

            <div className=" flex flex-col items-start border border-gray-200 gap-6 self-stretch py-4 px-6 rounded-[0.4375rem] bg-white">
              <div className="flex flex-col items-start gap-2 self-stretch">
                <div className="text-xl font-medium text-neutral-600 self-stretch leading-normal">
                  Notifications
                </div>
              </div>
              <div className="flex flex-col items-start gap-2 self-stretch">
                <div className="flex justify-between items-center self-stretch py-2 px-6 h-[4.5rem] rounded-[0.4375rem] bg-[#f7f7f7]">
                  <div className="w-[642px] text-[.9375rem] leading-normal">
                    <span className="text-[#525252]">Email Notification</span>
                  </div>
                  <Switch
                    checked={emailN}
                    onChange={(e) => {
                      updateEmailN(e.target.checked);
                    }}
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked": {
                        color: "#DF064E",
                      },
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                        {
                          backgroundColor: "#DF064E",
                        },
                    }}
                  />
                </div>
                <div className="flex justify-between items-center self-stretch py-2 px-6 h-[4.5rem] rounded-[0.4375rem] bg-[#f7f7f7]">
                  <div className="w-[642px] text-[.9375rem] leading-normal">
                    <span className="text-[#525252]">Push Notification</span>
                  </div>
                  <Switch
                    checked={pushN}
                    onChange={(e) => {
                      updatePushN(e.target.checked);
                    }}
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked": {
                        color: "#DF064E",
                      },
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                        {
                          backgroundColor: "#DF064E",
                        },
                    }}
                  />
                </div>
                <div className="flex justify-between items-center self-stretch py-2 px-6 h-[4.5rem] rounded-[0.4375rem] bg-[#f7f7f7]">
                  <div className="w-[642px] text-[.9375rem] leading-normal">
                    <span className="text-[#525252]">
                      New Workspace Creation
                    </span>
                  </div>
                  <Switch
                    checked={workspaceN}
                    onChange={(e) => {
                      updateWorkspaceN(e.target.checked);
                    }}
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked": {
                        color: "#DF064E",
                      },
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                        {
                          backgroundColor: "#DF064E",
                        },
                    }}
                  />
                </div>
                <div className="flex justify-between items-center self-stretch py-2 px-6 h-[4.5rem] rounded-[0.4375rem] bg-[#f7f7f7]">
                  <div className="w-[642px] text-[.9375rem] leading-normal">
                    <span className="text-[#525252]">
                      New Proposal Creation
                    </span>
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
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                        {
                          backgroundColor: "#DF064E",
                        },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardSettings;
