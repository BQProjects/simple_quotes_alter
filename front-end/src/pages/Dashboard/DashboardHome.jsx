import React, { useContext, useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import { UserContext } from "../../context/UserContext";
import { DatabaseContext } from "../../context/DatabaseContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaStar, FaRegStar } from "react-icons/fa";
import { FaRegFolder } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { FaRegFileLines } from "react-icons/fa6";
import { StateManageContext } from "../../context/StateManageContext";
import { GoArrowUp, GoArrowDown, GoDash } from "react-icons/go";
import ProposalsLineChart from "../../components/ProposalsLineChart";

const DashboardHome = () => {
  const { user } = useContext(UserContext);
  const { databaseUrl } = useContext(DatabaseContext);
  const { setNewProposal, proposals } = useContext(StateManageContext);

  const [favorate, setFavorate] = useState([]);
  const [favW, setFavW] = useState([]);
  const [views, setViews] = useState({
    dailyViews: 0,
    dailyChange: 0,
    weekViews: 0,
    weekChange: 0,
    totalViews: 0,
    timespent: 0,
  });
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const formatDate = (dateInput) => {
    if (!dateInput) return "Invalid Date";
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return "Invalid Date";
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const handleLocked = async (data, id) => {
    try {
      await axios.put(`${databaseUrl}/api/editor/locked`, {
        id: id,
        preview: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user?.id && databaseUrl) {
      getfavorate();
      getViews();
    }
  }, [user?.id, databaseUrl]);

  const getfavorate = async () => {
    try {
      const res = await axios.get(`${databaseUrl}/api/workspace/getfavorate`, {
        params: { user_id: user.id },
      });
      const res2 = await axios.get(
        `${databaseUrl}/api/workspace/getfavoratew`,
        {
          params: { user_id: user.id },
        }
      );

      setFavorate(res.data || []);
      setFavW(res2.data || []);
    } catch (error) {
      console.error("Error fetching workspaces:", error);
      setError("Failed to fetch workspaces. Please try again later.");
    }
  };

  const getViews = async () => {
    try {
      const res = await axios.get(`${databaseUrl}/api/workspace/getviews`, {
        params: { user_id: user.id },
      });
      setViews(res.data || {});
    } catch (error) {
      console.error("Error fetching views:", error);
      setError("Failed to fetch views. Please try again later.");
    }
  };

  return (
    <>
      <div className="w-[100%] bg-gray-100 min-h-[90vh]">
        <div className="w-full h-[88vh] overflow-auto scrollbar-hide">
          {/* Error Message */}
          {error && (
            <div className="bg-red-100 text-red-600 p-2 m-3 rounded-md">
              {error}
            </div>
          )}

          <h1 className="p-3 text-2xl flex items-start gap-2">
            Hello {user?.username || "Guest"}
          </h1>

          <div className="grid grid-cols-2 gap-5">
            {/* Workspaces */}
            <div className="bg-white h-[230px] w-full rounded-lg flex flex-col justify-between items-center p-3 relative ">
              <div className="w-full text-left flex items-center justify-start gap-2 text-lg text-gray-700 pl-6 pt-2">
                <FaRegFolder className="text-gray-500" />
                <h1>Workspaces</h1>
              </div>
              <div
                onClick={() => setNewProposal(true)}
                className="w-6 h-6 flex items-center justify-center bg-graidient_bottom rounded-[50%] absolute top-4 right-5 text-white cursor-pointer"
              >
                <FaPlus className="text-[8px]" />
              </div>
              <div className="grid grid-cols-2 w-full h-full">
                {favW.length === 0 ? (
                  <div className="w-full h-full flex items-center justify-center col-span-2 text-gray-500 ">
                    Create Workspace to See here
                  </div>
                ) : (
                  favW.map((workspace, index) => (
                    <div
                      key={index}
                      onClick={() =>
                        workspace?._id &&
                        navigate(`/workspace/${workspace._id}`)
                      }
                      className="mt-3 mr-3 placeholder:w-[100%] h-14 px-3 py-2 border border-gray-100 rounded-md flex items-center justify-start gap-2 cursor-pointer"
                    >
                      <div
                        className={`h-10 w-12 p-2 flex items-center justify-center rounded-md shadow-md shadow-gray-300`}
                      >
                        <FaRegFolder
                          style={{
                            color: workspace?.workspaceColor || "#888",
                          }}
                          className="h-5 w-5"
                        />
                      </div>
                      <div className="text-sm flex flex-col w-[90%] ">
                        <h2 className="text-gray-600 font-semibold overflow-hidden whitespace-nowrap text-ellipsis flex items-center justify-start gap-1">
                          <span>{workspace?.workspaceName}</span>
                          <span>
                            {workspace?.favorate ? (
                              <FaStar className="text-graidient_bottom" />
                            ) : (
                              <FaRegStar className="text-gray-500" />
                            )}
                          </span>
                        </h2>
                        <p className="text-xs text-gray-400">
                          {workspace?.proposals?.length || 0} Proposals
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="w-full flex items-center justify-end mt-3">
                <button
                  className="mr-2 text-gray-500 flex items-center justify-end gap-2 text-sm p-2"
                  onClick={() => navigate("/workspaces")}
                >
                  View More <FaArrowRight />
                </button>
              </div>
            </div>

            {/* Views Overview */}
            <div className="bg-white h-[310px] w-full rounded-lg px-8 py-3">
              <div className="w-full text-left flex items-center justify-start gap-2 text-lg text-gray-700 pt-2">
                <h1>Views Overview</h1>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {/* Today */}
                <div className="mt-3 mr-3 h-[100px] px-3 py-2 border border-gray-100 rounded-md flex flex-col items-start justify-start gap-2 cursor-pointer">
                  <h3 className="text-xs text-gray-400">Today</h3>
                  <p className="text-2xl text-gray-600 pl-2 flex items-end">
                    {views?.dailyViews || 0}
                    <span
                      className={`text-[10px] flex items-center mx-1 ${
                        views?.dailyChange === 0
                          ? "text-gray-600"
                          : views?.dailyChange < 0
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {views?.dailyChange === 0 ? (
                        <GoDash />
                      ) : views?.dailyChange < 0 ? (
                        <GoArrowDown />
                      ) : (
                        <GoArrowUp />
                      )}
                      {views?.dailyChange !== 0 && (
                        <>{Math.abs(views?.dailyChange || 0).toFixed(1)}%</>
                      )}
                    </span>
                    <span className="text-sm text-graidient_bottom ml-1 mb-0.5">
                      views
                    </span>
                  </p>
                </div>

                {/* This Week */}
                <div className="mt-3 mr-3 h-[100px] px-3 py-2 border border-gray-100 rounded-md flex flex-col items-start justify-start gap-2 cursor-pointer">
                  <h3 className="text-xs text-gray-400">This Week</h3>
                  <p className="text-2xl text-gray-600 pl-2 flex items-end">
                    {views?.weekViews || 0}
                    <span
                      className={`text-[10px] flex items-center mx-1 ${
                        views?.weekChange === 0
                          ? "text-gray-600"
                          : views?.weekChange < 0
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {views?.weekChange === 0 ? (
                        <GoDash />
                      ) : views?.weekChange < 0 ? (
                        <GoArrowDown />
                      ) : (
                        <GoArrowUp />
                      )}
                      {Math.abs(views?.weekChange || 0).toFixed(1)}%
                    </span>
                    <span className="text-sm text-graidient_bottom ml-1 mb-0.5">
                      views
                    </span>
                  </p>
                </div>

                {/* Total Views */}
                <div className="mt-3 mr-3 h-[100px] px-3 py-2 border border-gray-100 rounded-md flex flex-col items-start justify-start gap-2 cursor-pointer">
                  <h3 className="text-xs text-gray-400">Total Views</h3>
                  <p className="text-2xl text-gray-600 pl-2">
                    {views?.totalViews || 0}{" "}
                    <span className="text-sm text-graidient_bottom">views</span>
                  </p>
                </div>

                {/* Avg Time Spent */}
                <div className="mt-3 mr-3 h-[100px] px-3 py-2 border border-gray-100 rounded-md flex flex-col items-start justify-start gap-2 cursor-pointer">
                  <h3 className="text-xs text-gray-400">Avg Time Spent</h3>
                  <p className="text-2xl text-gray-600 pl-2">
                    {Math.floor(views?.timespent || 0)}{" "}
                    <span className="text-sm text-graidient_bottom">sec</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Proposals */}
            <div className="bg-white h-[530px] w-full rounded-lg -mt-[10vh] px-6 py-4 relative">
              <div className="w-full text-left flex items-center justify-start gap-2 text-lg text-gray-700 ">
                <FaRegFileLines className="text-gray-500" />
                <h1>Proposals</h1>
              </div>
              <div
                onClick={() => setNewProposal(true)}
                className="w-6 h-6 flex items-center justify-center bg-graidient_bottom rounded-[50%] absolute top-4 right-5 text-white cursor-pointer"
              >
                <FaPlus className="text-[8px]" />
              </div>
              <div className="flex flex-col items-start justify-start gap-3 w-full">
                {favorate.length === 0 ? (
                  <div className="w-full h-full flex items-center justify-center text-sm text-gray-500">
                    Create Proposals to see here
                  </div>
                ) : (
                  favorate.map((item, index) => (
                    <div
                      key={index}
                      onClick={() =>
                        item?._id && navigate(`/editor/${item._id}`)
                      }
                      className="mt-3 mr-3 w-[100%] h-16 px-3 py-2 border border-gray-100 rounded-md flex items-center justify-start gap-2 cursor-pointer"
                    >
                      <div className="h-10 w-12 p-2 flex items-center justify-center rounded-md shadow-md shadow-gray-300">
                        <FaRegFileLines className="h-5 w-5 text-gray-500" />
                      </div>
                      <div className="text-sm flex flex-col w-[90%] ml-2 ">
                        <h2 className="text-gray-600 font-semibold overflow-hidden whitespace-nowrap text-ellipsis flex items-center justify-start gap-1">
                          <span>{item?.proposalName}</span>
                          <span>
                            {item?.favorate ? (
                              <FaStar className="text-graidient_bottom" />
                            ) : (
                              <FaRegStar className="text-gray-500" />
                            )}
                          </span>
                        </h2>
                        <p className="text-xs text-gray-400">
                          <span className="text-xs text-gray-500">
                            Created on {formatDate(item?.createdAt)}
                          </span>
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="w-full flex items-center justify-end mt-3">
                <button
                  className="mr-2 text-gray-500 flex items-center justify-end gap-2 text-sm p-2"
                  onClick={() => navigate("/proposals")}
                >
                  View More <FaArrowRight />
                </button>
              </div>
            </div>

            {/* Templates */}
            <div className="bg-white h-[450px] w-full rounded-lg px-6 py-4">
              <div className="w-full text-left flex items-center justify-start gap-2 text-lg text-gray-700 ">
                <h1>Templates</h1>
              </div>
              <div className="w-full h-[50vh] flex items-center justify-center">
                <h1 className="text-gray-500">Templates Not Available Yet!</h1>
              </div>
            </div>
          </div>
          <div className="mt-6 mb-6">
            <ProposalsLineChart proposals={proposals} />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardHome;
