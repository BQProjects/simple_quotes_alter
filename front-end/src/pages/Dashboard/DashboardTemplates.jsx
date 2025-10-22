import React, { useState, useEffect, useContext } from "react";
import { HiTemplate } from "react-icons/hi";
import { FaRegFolder } from "react-icons/fa";
import { DatabaseContext } from "../../context/DatabaseContext";
import { StateManageContext } from "../../context/StateManageContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const DashboardTemplates = () => {
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [popup, setPopup] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState(null);

    const navigate = useNavigate();
    const { databaseUrl } = useContext(DatabaseContext);
    const { workspaces } = useContext(StateManageContext);

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const res = await axios.get(`${databaseUrl}/api/template/all-templates`);

                let templateList = [];
                if (Array.isArray(res.data.templates)) templateList = res.data.templates;
                else if (Array.isArray(res.data)) templateList = res.data;
                else if (res.data?.data && Array.isArray(res.data.data)) templateList = res.data.data;

                setTemplates(templateList);
            } catch (err) {
                console.error("Error fetching templates:", err);
                setError("Unable to load templates. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchTemplates();
    }, [databaseUrl]);

    const handleTemplateClick = (template) => {
        setSelectedTemplate(template);
        setPopup(true);
    };

    const handleWorkspaceSelect = (workspaceId) => {
        setPopup(false);
        if (selectedTemplate?._id) {
            navigate(`/editor/${selectedTemplate._id}?workspace=${workspaceId}`);
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
                        <h2 className="text-xl font-semibold text-gray-700">Select Workspace</h2>
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
                                    className={`mt-3 h-14 px-3 py-2 border ${selected === item._id ? "bg-gray-200" : "border-gray-100"
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
                                        <p className="text-xs text-gray-400">{item.proposals.length} Proposals</p>
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

    return (
        <div className="w-full bg-white min-h-[85vh] px-10 pt-6 shadow-lg shadow-gray-300">
            <div className="text-xl text-gray-500 flex items-center justify-start gap-3 mt-4">
                <HiTemplate size={26} />
                <h1>Templates</h1>
            </div>

            <div className="h-[74vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-400"></div>
                        <p className="text-gray-500 mt-4">Loading templates...</p>
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <HiTemplate className="text-4xl text-red-400 mb-4" />
                        <p className="text-red-500 font-medium">{error}</p>
                    </div>
                ) : templates.length > 0 ? (
                    <>
                        <div className="mt-6 text-gray-500 text-lg mb-2">
                            <h1>Available Templates</h1>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-4">
                            {templates.map((template, index) => (
                                <div
                                    key={template._id || index}
                                    className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white cursor-pointer"
                                    onClick={() => handleTemplateClick(template)}
                                >
                                    <img
                                        src={template.TemplateImage}
                                        alt={template.TemplateName}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center py-16 px-4 mt-12">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                            <HiTemplate className="text-4xl text-gray-400" />
                        </div>
                        <h2 className="text-xl font-medium text-gray-700 mb-2">No Templates Available</h2>
                        <p className="text-gray-500 text-center max-w-md">
                            You don’t have any templates yet. Once you create or import templates,
                            they will appear here for you to view, edit, or manage.
                        </p>
                    </div>
                )}
            </div>

            {popup && <WorkSave setPopup={setPopup} onWorkspaceSelect={handleWorkspaceSelect} />}
        </div>
    );
};

export default DashboardTemplates;