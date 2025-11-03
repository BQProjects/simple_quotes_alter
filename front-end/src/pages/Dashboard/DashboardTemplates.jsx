import React, { useState, useEffect, useContext, useRef } from "react";
import { HiTemplate } from "react-icons/hi";
import { FaRegFolder } from "react-icons/fa";
import { DatabaseContext } from "../../context/DatabaseContext";
import { StateManageContext } from "../../context/StateManageContext";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import DropCanvas from "../Editor/DropCanvas";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const DashboardTemplates = () => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [popup, setPopup] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [changingImage, setChangingImage] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const navigate = useNavigate();
  const { databaseUrl } = useContext(DatabaseContext);
  const { workspaces } = useContext(StateManageContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await axios.get(
          `${databaseUrl}/api/template/all-templates`
        );

        let templateList = [];
        if (Array.isArray(res.data.templates))
          templateList = res.data.templates;
        else if (Array.isArray(res.data)) templateList = res.data;
        else if (res.data?.data && Array.isArray(res.data.data))
          templateList = res.data.data;

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
        // Create a new proposal based on the template
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

  const handleChangeImage = (template) => {
    setChangingImage(template);
  };

  const uploadImageToCloudinary = async (file) => {
    const cloudName = "dojwaepbj";
    const uploadPreset = "simple_quotes"; // Correct upload preset

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error("Failed to upload image");
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    setUploadingImage(true);
    try {
      const imageUrl = await uploadImageToCloudinary(file);

      // Update template image in database
      const response = await axios.put(
        `${databaseUrl}/api/template/update-template-image`,
        {
          id: changingImage._id,
          TemplateImage: imageUrl,
        }
      );

      if (response.status === 200) {
        // Update the template in the local state
        setTemplates((prevTemplates) =>
          prevTemplates.map((template) =>
            template._id === changingImage._id
              ? { ...template, TemplateImage: imageUrl }
              : template
          )
        );
        toast.success("Template image updated successfully!");
        setChangingImage(null);
      } else {
        toast.error("Failed to update template image");
      }
    } catch (error) {
      console.error("Error updating template image:", error);
      toast.error("Failed to update template image");
    } finally {
      setUploadingImage(false);
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
    <div className="w-full bg-white min-h-[85vh] px-10 pt-6 shadow-lg shadow-gray-300">
      <div className="text-xl text-gray-500 flex items-center justify-start gap-3 mt-4">
        <HiTemplate size={26} />
        <h1>Templates</h1>
      </div>

      <div className="h-[74vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
        {loading ? (
          <div className="mt-6">
            <div className="text-gray-500 text-lg mb-2">
              <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-4">
              {Array.from({ length: 15 }).map((_, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-xl overflow-hidden shadow-sm bg-gray-100 animate-pulse"
                >
                  <div className="w-full h-64 bg-gray-200 rounded-xl"></div>
                </div>
              ))}
            </div>
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
                  className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 bg-white relative group"
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
                        onClick={() => handleChangeImage(template)}
                        className="w-full px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm font-medium transition-colors"
                      >
                        Change Image
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
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-4 mt-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <HiTemplate className="text-4xl text-gray-400" />
            </div>
            <h2 className="text-xl font-medium text-gray-700 mb-2">
              No Templates Available
            </h2>
            <p className="text-gray-500 text-center max-w-md">
              You don’t have any templates yet. Once you create or import
              templates, they will appear here for you to view, edit, or manage.
            </p>
          </div>
        )}
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

      {changingImage && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md transition-all transform scale-105 be-vietnam-pro-regular">
            <div className="mb-6 text-center">
              <h2 className="text-xl font-semibold text-gray-700">
                Change Template Image
              </h2>
              <p className="text-sm text-gray-500 mt-2">
                Upload a new image for "{changingImage.TemplateName}"
              </p>
            </div>

            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploadingImage}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  {uploadingImage ? (
                    <>
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-2"></div>
                      <p className="text-sm text-gray-600">Uploading...</p>
                    </>
                  ) : (
                    <>
                      <div className="text-4xl text-gray-400 mb-2">📁</div>
                      <p className="text-sm text-gray-600 mb-1">
                        Click to select image
                      </p>
                      <p className="text-xs text-gray-400">
                        PNG, JPG up to 5MB
                      </p>
                    </>
                  )}
                </label>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => setChangingImage(null)}
                disabled={uploadingImage}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-300 hover:shadow-md transition-all disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardTemplates;
