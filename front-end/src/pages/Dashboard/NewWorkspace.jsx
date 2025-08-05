import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { DatabaseContext } from "../../context/DatabaseContext";
import { FaRegFolder } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { UserContext } from "../../context/UserContext";
import profile from "../../assets/profile.png";
import toast from "react-hot-toast";

const NewWorkspace = ({
  handleNewWorkspace,
  setPopup,
  popup,
  workspaces,
  setWorkspaces,
}) => {
  const { databaseUrl } = useContext(DatabaseContext);
  const { user } = useContext(UserContext);
  const [color, setColor] = useState("black");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [collab, setCollab] = useState([]);
  const [workspace, setWorkspace] = useState([]);

  const getWorkspace = async () => {
    try {
      const response = await axios.get(`${databaseUrl}/api/workspace/single`, {
        params: { workspace_id: workspaces[popup]._id },
      });
      setName(response.data.workspaceName);
      setColor(response.data.workspaceColor);
      setUsers(response.data.userActive);
      setWorkspace(response.data.collabUsers ? response.data.collabUsers : []);
      console.log(response.data.collabUsers);
    } catch (error) {
      console.error("Error fetching proposals:", error);
      setErrorMessage("Failed to fetch proposals. Please try again.");
    }
  };

  const editWorkspace = async () => {
    try {
      const response = await axios.put(`${databaseUrl}/api/workspace/edit`, {
        id: workspaces[popup]._id,
        name,
        color,
        users,
      });

      const temp = [...workspaces];
      temp[popup] = response.data;
      setWorkspaces(temp);
    } catch (error) {
      console.error("Error updating workspace:", error);
      setErrorMessage("Failed to update workspace. Please try again.");
    } finally {
      toast.success("Workspace has been saved");
      setName("");
      setColor("");
      setUsers([]);
      setPopup(null);
    }
  };

  const handleOnclick = () => {
    if (name === "") {
      alert("Please enter all the details");
      setError(true);
    } else {
      handleNewWorkspace(name, color, users);
    }
  };
  useEffect(() => {
    getWorkspace();
  }, []);

  const getCollabUsers = async () => {
    try {
      const res = await axios.get(
        `${databaseUrl}/api/workspace/getallmembers`,
        {
          params: { user_id: user.id },
        }
      );
      setCollab(res.data.collab.filter((item) => item.type !== "full"));
    } catch (error) {
      console.error("Error fetching workspaces:", error);
    }
  };

  const handleNewMember = async (workspaceId, collabId, userName) => {
    try {
      const response = await axios.post(
        `${databaseUrl}/api/workspace/addusertocollab`,
        {
          collab_id: collabId,
          workspace_id: workspaceId,
        }
      );

      const newMember = {
        _id: response.data.id,
        fullName: userName,
      };

      setWorkspace((prevMembers) => [...prevMembers, newMember]);
    } catch (error) {
      console.error("Error adding new member:", error);
      setError("Failed to add member. Please try again later.");
    }
  };

  const handleDeleteMember = async (workspaceId, collabId, userName) => {
    try {
      const response = await axios.post(
        `${databaseUrl}/api/workspace/removecollabuser`,
        {
          collab_id: collabId,
          workspace_id: workspaceId,
          user_id: user.id,
        }
      );
      console.log(workspace);

      setWorkspace(workspace.filter((item) => item.fullName !== userName));
    } catch (error) {
      console.error("Error adding new member:", error);
      setError("Failed to add member. Please try again later.");
    }
  };

  useEffect(() => {
    getCollabUsers();
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center z-[1000]">
      {/* Popup Content */}
      <div
        style={{
          border: error ? "1px red solid" : "none",
        }}
        className="relative bg-white rounded-2xl shadow-2xl py-6 px-7 w-[40%] min-h-[60%] transition-all "
      >
        {/* Header */}
        <div className="mb-6 text-center">
          <h2 className="text-xl  text-gray-600">Customize Your Workspace</h2>
          <p className="text-xs text-gray-400 mt-2">
            Make this workspace your own! Update the name, choose a folder icon,
            and manage team access. Invite new members or change permissions
            easily
          </p>
        </div>

        {/* Input Fields */}
        <div className="space-y-4">
          <div>
            <input
              type="text"
              id="Workspace Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="mt-2 w-full px-2 py-2 border border-gray-300 rounded-lg text-gray-600 shadow-sm bg-gray-50 outline-none focus:border-gray-400 "
              placeholder="Workspace Name"
            />
          </div>

          <div className="flex flex-row gap-4 mt-2 ml-2">
            <div
              onClick={() => setColor("green")}
              className={` w-10 h-10 flex items-center justify-center p-1 shadow-md ${
                color === "green" ? "shadow-green-300" : "shadow-gray-300"
              }  rounded-md`}
            >
              <FaRegFolder
                className="w-6 h-6"
                style={{
                  color: "green",
                }}
              />
            </div>
            <div
              onClick={() => setColor("red")}
              className={` w-10 h-10 flex items-center justify-center p-1 shadow-md ${
                color === "red" ? "shadow-red-300" : "shadow-gray-300"
              }  rounded-md`}
            >
              <FaRegFolder
                className="w-6 h-6"
                style={{
                  color: "red",
                }}
              />
            </div>
            <div
              onClick={() => setColor("blue")}
              className={` w-10 h-10 flex items-center justify-center p-1 shadow-md ${
                color === "blue" ? "shadow-blue-300" : "shadow-gray-300"
              }  rounded-md`}
            >
              <FaRegFolder
                className="w-6 h-6"
                style={{
                  color: "blue",
                }}
              />
            </div>
            <div
              onClick={() => setColor("orange")}
              className={` w-10 h-10 flex items-center justify-center p-1 shadow-md ${
                color === "orange" ? "shadow-orange-300" : "shadow-gray-300"
              }  rounded-md`}
            >
              <FaRegFolder
                className="w-6 h-6"
                style={{
                  color: "orange",
                }}
              />
            </div>
          </div>

          <div className="mt-3">
            <label
              htmlFor="acceptedName"
              className="block text-md font-medium text-gray-500  mb-1  "
            >
              Who has access
            </label>
            <div className="w-full flex flex-wrap gap-3 mb-3 mt-2">
              {workspace.map((item) => {
                return (
                  <div className="px-2 py-1 bg-gray-200 rounded-xl flex items-center justify-between gap-2 ">
                    {item.fullName}
                    <div
                      onClick={() =>
                        handleDeleteMember(
                          workspaces[popup]._id,
                          item._id,
                          item.fullName
                        )
                      }
                      className="text-gray-500 text-sm cursor-pointer"
                    >
                      X
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-start border border-gray-300 bg-gray-100 rounded-md ">
              <div className="px-2 py-1">
                {" "}
                <IoSearch className="w-5 h-5 " />
              </div>

              <input
                type="text"
                id="acceptedName"
                className=" w-[80%]  py-2 px-2 outline-none bg-gray-100"
                placeholder="Search User"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="h-[15vh] w-full overflow-auto">
            {collab
              ?.filter((item) =>
                item.user.fullName
                  .toLowerCase()
                  .includes(search?.toLowerCase() || "")
              )
              .map((item) => (
                <div
                  onClick={() =>
                    handleNewMember(
                      workspaces[popup]._id,
                      item._id,
                      item.user.fullName
                    )
                  }
                  key={item._id}
                  className={` mt-3 mr-3 placeholder:w-[100%] h-14 px-3 py-2 border   rounded-md flex items-center justify-start gap-2 cursor-pointer `}
                >
                  <div
                    className={`h-10 w-12  p-2 flex items-center justify-center rounded-md shadow-md shadow-gray-300 `}
                  >
                    <img
                      src={item.user.avatar ? item.user.avatar : profile}
                      className="w-8 h-8 rounded-[50%]"
                    />
                  </div>
                  <div className="text-sm flex flex-col w-[90%] ">
                    <h2 className=" text-gray-600 font-semibold overflow-hidden whitespace-nowrap text-ellipsis flex items-center justify-start gap-1 px-2">
                      <span>{item.user.fullName}</span>
                    </h2>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex justify-end gap-4">
          <button
            onClick={() => {
              setPopup(null);
              setName("");
              setColor("");
              setUsers([]);
            }}
            className=" absolute top-5 right-5 text-gray-700 rounded-lg font-medium "
          >
            X
          </button>
          <button
            onClick={() => {
              editWorkspace();
            }}
            className="px-6 py-3 bg-graidient_bottom text-white rounded-lg font-medium  hover:shadow-md transition-all"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewWorkspace;
