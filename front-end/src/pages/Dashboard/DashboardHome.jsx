import React, { useContext, useEffect, useState, useRef } from "react";
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
import ProposalsLineChart from "../../components/ProposalsLineChart";
import ViewsOverviewCard from "../../components/ViewsOverviewCard";
import TrafficPieChart from "../../components/TrafficPieChart";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DropCanvas from "../Editor/DropCanvas";
import toast from "react-hot-toast";

const DashboardHome = () => {
  const { user } = useContext(UserContext);
  const { databaseUrl } = useContext(DatabaseContext);
  const { setNewProposal, proposals, workspaces } =
    useContext(StateManageContext);

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
  const [trafficData, setTrafficData] = useState([]);
  const [trafficLoading, setTrafficLoading] = useState(true);
  const [error, setError] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [templateLoading, setTemplateLoading] = useState(true);
  const [templateError, setTemplateError] = useState(null);
  const [popup, setPopup] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [previewTemplate, setPreviewTemplate] = useState(null);

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

  const handleUseTemplate = (template) => {
    setSelectedTemplate(template);
    setPopup(true);
  };

  const handlePreviewTemplate = (template) => {
    setPreviewTemplate(template);
  };

  const handleWorkspaceSelect = async (workspaceId) => {
    setPopup(false);
    if (selectedTemplate?._id && user?.email) {
      try {
        const response = await axios.post(
          `${databaseUrl}/api/editor/create-from-template`,
          {
            templateId: selectedTemplate._id,
            workspaceId: workspaceId,
            email: user.email,
          }
        );
        if (response.data && response.data._id) {
          navigate(`/editor/${response.data._id}`);
          toast.success("Template loaded successfully!");
        } else {
          toast.error("Failed to create proposal from template");
        }
      } catch (error) {
        console.error("Error creating proposal from template:", error);
        toast.error("Failed to load template. Please try again.");
      }
    } else {
      toast.error("User not authenticated");
    }
  };

  useEffect(() => {
    if (user?.id && databaseUrl) {
      getfavorate();
      getViews();
      fetchTemplates();
      fetchTrafficData();
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

  const fetchTrafficData = async () => {
    setTrafficLoading(true);
    try {
      const res = await axios.get(
        `${databaseUrl}/api/workspace/analytics-data`
      );
      setTrafficData(res.data || []);
    } catch (error) {
      console.error("Error fetching traffic data:", error);
      setTrafficData([]);
    } finally {
      setTrafficLoading(false);
    }
  };

  const fetchTemplates = async () => {
    try {
      const res = await axios.get(`${databaseUrl}/api/template/all-templates`);
      let templateList = [];
      if (Array.isArray(res.data.templates)) templateList = res.data.templates;
      else if (Array.isArray(res.data)) templateList = res.data;
      else if (res.data?.data && Array.isArray(res.data.data))
        templateList = res.data.data;
      setTemplates(templateList);
    } catch (err) {
      console.error("Error fetching templates:", err);
      setTemplateError("Unable to load templates.");
    } finally {
      setTemplateLoading(false);
    }
  };

  const WorkSave = ({ setPopup, onWorkspaceSelect }) => {
    const [selected, setSelected] = useState(null);
    const [search, setSearch] = useState("");

    const handleSelect = () => {
      if (!selected) {
        toast.error("Please select a workspace to continue");
        return;
      }
      onWorkspaceSelect(selected);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
        <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-lg transition-all transform scale-105 be-vietnam-pro-regular">
          <div className="mb-8 text-center">
            <h2 className="text-xl font-semibold text-gray-700">
              Select Workspace
            </h2>
            <p className="text-sm text-gray-500">
              Choose a workspace to save and open this template.
            </p>
          </div>

          <div className="mb-4">
            <input
              type="text"
              className="w-full py-2 px-2 outline-none border border-gray-200 rounded-lg"
              placeholder="Search for workspace"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="h-[35vh] w-full overflow-auto">
            {(() => {
              const filtered = workspaces?.filter((item) =>
                item.workspaceName.toLowerCase().includes(search.toLowerCase())
              );

              if (!filtered || filtered.length === 0) {
                return (
                  <div className="text-gray-500 text-sm mt-4 flex justify-center">
                    No workspace found
                  </div>
                );
              }

              return filtered.map((item) => (
                <div
                  onClick={() => setSelected(item._id)}
                  key={item._id}
                  className={`mt-3 h-14 px-3 py-2 border ${
                    selected === item._id ? "bg-gray-200" : "border-gray-100"
                  } rounded-md flex items-center justify-start gap-2 cursor-pointer`}
                >
                  <div className="h-10 w-12 p-2 flex items-center justify-center rounded-md shadow-md shadow-gray-300">
                    <FaRegFolder
                      style={{ color: item.workspaceColor }}
                      className="h-5 w-5"
                    />
                  </div>
                  <div className="text-sm flex flex-col w-[90%]">
                    <h2 className="text-gray-600 font-semibold overflow-hidden whitespace-nowrap text-ellipsis">
                      {item.workspaceName}
                    </h2>
                    <p className="text-xs text-gray-400">
                      {item.proposals.length} Proposals
                    </p>
                  </div>
                </div>
              ));
            })()}
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <button
              onClick={() => setPopup(false)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-300 hover:shadow-md transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSelect}
              className="px-4 py-2 bg-graidient_bottom text-white rounded-lg font-medium hover:shadow-md transition-all"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  };

  const TemplatePreview = ({ template, onClose }) => {
    const dropCanvasRef = useRef(null);
    const [previewRows, setPreviewRows] = useState(template.data || []);
    const [previewSettings, setPreviewSettings] = useState({
      heading: "roboto",
      body: "roboto",
      header: false,
      footer: false,
      color: "#9b9b9b",
      theme: 0,
      ...template.settings,
    });

    const handleSetRows = (newRows) => {
      setPreviewRows(newRows);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-[10000000]">
        <div className="w-fit h-fit bg-white px-4 py-4 rounded-md transition-all duration-500 ease-out opacity-15 animate-fadeInforRow">
          <div className="px-3 py-2 text-non_active_text">
            <p>Template Preview - {template.TemplateName}</p>
          </div>
          <div
            className="flex justify-center overflow-y-auto h-[68vh] bg-white"
            style={{
              flex: 1,
              overflow: "auto",
            }}
            ref={dropCanvasRef}
          >
            <DndProvider backend={HTML5Backend}>
              <DropCanvas
                rows={previewRows}
                settings={previewSettings}
                setRows={handleSetRows}
                preview={true}
                dropCanvasRef={dropCanvasRef}
              />
            </DndProvider>
          </div>

          <div className="mt-4 mb-1 mr-2 flex justify-end gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-300 text-sm"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                handleUseTemplate(template);
              }}
              className="bg-footer_gradient_bot text-white px-4 rounded-md py-2 text-center text-sm flex gap-1 items-center justify-center hover:bg-hover_dark_btn active:bg-gradient_darker"
            >
              Use this template
            </button>
          </div>
        </div>
      </div>
    );
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
                      className="mt-3 mr-3 placeholder:w-[100%] h-14 px-3 py-2 border border-gray-100 rounded-md flex items-center justify-start gap-2 cursor-pointer hover:border-gray-300"
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
                        <h2 className="text-gray-600 font-semibold overflow-hidden whitespace-nowrap text-non-active-text flex items-center justify-start gap-1">
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
            <ViewsOverviewCard views={views} />

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
                      className="mt-3 mr-3 w-[100%] h-16 px-3 py-2 border border-gray-100 rounded-md flex items-center justify-start gap-2 cursor-pointer hover:border-gray-300"
                    >
                      <div className="h-10 w-12 p-2 flex items-center justify-center rounded-md shadow-md shadow-gray-300">
                        <FaRegFileLines className="h-5 w-5 text-gray-500" />
                      </div>
                      <div className="text-sm flex flex-col w-[90%] ml-2 ">
                        <h2 className="text-gray-600 font-semibold overflow-hidden whitespace-nowrap text-non-active-text flex items-center justify-start gap-1">
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
              <div className="w-full h-[calc(100%-60px)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                {templateLoading ? (
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {Array.from({ length: 8 }).map((_, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-white animate-pulse"
                      >
                        <div className="w-full h-32 bg-gray-300"></div>
                      </div>
                    ))}
                  </div>
                ) : templateError ? (
                  <div className="flex flex-col items-center justify-center py-20">
                    <p className="text-red-500 font-medium">{templateError}</p>
                  </div>
                ) : templates.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {templates.map((template, index) => (
                      <div
                        key={template._id || index}
                        className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 bg-white relative group "
                      >
                        <img
                          src={template.TemplateImage}
                          alt={template.TemplateName}
                          className="w-full h-full object-cover"
                        />
                        {/* Hover overlay with buttons */}
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <div className="flex flex-col justify-center items-center gap-2">
                            <button
                              onClick={() => handlePreviewTemplate(template)}
                              className="w-full px-3 py-2 bg-white text-gray-800 rounded-md hover:bg-gray-100 text-sm font-medium transition-colors"
                            >
                              Preview
                            </button>
                            <button
                              onClick={() => handleUseTemplate(template)}
                              className="w-full px-3 py-2 bg-graidient_bottom text-white rounded-md hover:bg-hover_dark_btn text-sm font-medium transition-colors"
                            >
                              Use this template
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <h1 className="text-gray-500">
                      No Templates Available Yet!
                    </h1>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* <div className="mt-6 mb-6">
            <ProposalsLineChart proposals={proposals} />
          </div> */}
          <div className="mt-6 mb-6 flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:flex-1 lg:w-auto">
              <ProposalsLineChart proposals={proposals} />
            </div>
            <div className="w-full lg:w-auto lg:max-w-sm">
              <TrafficPieChart
                data={trafficData}
                title="Traffic by Location"
                loading={trafficLoading}
              />
            </div>
          </div>
        </div>
      </div>

      {popup && (
        <WorkSave
          setPopup={setPopup}
          onWorkspaceSelect={handleWorkspaceSelect}
        />
      )}

      {previewTemplate && (
        <TemplatePreview
          template={previewTemplate}
          onClose={() => setPreviewTemplate(null)}
        />
      )}
    </>
  );
};

export default DashboardHome;
