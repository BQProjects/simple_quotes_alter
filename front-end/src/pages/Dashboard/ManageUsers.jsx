import React, { useContext, useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import { FaUsers } from "react-icons/fa";
import { UserContext } from "../../context/UserContext";
import { DatabaseContext } from "../../context/DatabaseContext";
import axios from "axios";
import { FaRegFolder } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import profile from "../../assets/profile.png";
import toast from "react-hot-toast";
import { FaArrowDown } from "react-icons/fa";

const ManageUsers = () => {
  const [addNew, setAddNew] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const { user } = useContext(UserContext);
  const { databaseUrl } = useContext(DatabaseContext);
  const [workspaces, setWorkspaces] = useState([]);
  const [selectedW, setSelectedW] = useState([]);
  const [memberSearch, setMemberSearch] = useState("");
  const [workspaceSearch, setWorkspaceSearch] = useState("");
  const [editSearch, setEditSearch] = useState("");
  const [fullAccess, setFullAccess] = useState(false);
  const [collab, setCollab] = useState([]);
  const [edit, setEdit] = useState(null);
  const [showMembersDropdown, setShowMembersDropdown] = useState(false);
  const [showWorkspacesDropdown, setShowWorkspacesDropdown] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const getUsers = async () => {
    try {
      const res = await axios.get(`${databaseUrl}/api/workspace/getallusers`, {
        params: { user_id: user.id },
      });
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching workspaces:", error);
    }
  };
  const getWorkspaces = async () => {
    try {
      const res = await axios.get(`${databaseUrl}/api/workspace/getall`, {
        params: { user_id: user.id },
      });
      setWorkspaces(res.data);
    } catch (error) {
      console.error("Error fetching workspaces:", error);
    }
  };

  useEffect(() => {
    getUsers();
    getWorkspaces();
    getCollabUsers();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setShowMembersDropdown(false);
        setShowWorkspacesDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getCollabUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${databaseUrl}/api/workspace/getallmembers`,
        {
          params: { user_id: user.id },
        }
      );
      setCollab(res.data.collab);
    } catch (error) {
      console.error("Error fetching workspaces:", error);
    } finally {
      setLoading(false);
    }
  };

  const CreateNewUser = async () => {
    try {
      for (const userId of selectedUsers) {
        if (fullAccess === true) {
          const res = await axios.post(
            `${databaseUrl}/api/workspace/createfull`,
            {
              user_id: user.id,
              new_user_id: userId,
            }
          );
          setCollab((prev) => [...prev, res.data]);
        } else {
          const res = await axios.post(
            `${databaseUrl}/api/workspace/createlim`,
            {
              user_id: user.id,
              new_user_id: userId,
              workspaceIds: selectedW,
            }
          );
          console.log(res.data);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setFullAccess(false);
      setSelectedW([]);
      setSelectedUsers([]);
      setAddNew(false);
      toast.success("Users have been added to collaboration");
    }
  };

  const EditCollabUser = async () => {
    try {
      const res = await axios.post(`${databaseUrl}/api/workspace/editcollab`, {
        collab_id: edit,
        type: fullAccess,
        workspaceIds: selectedW,
        user_id: user.id,
      });

      console.log(res);

      // Update the matching collab in state
      setCollab((prev) =>
        prev.map((item) => (item._id === res.data._id ? res.data : item))
      );
      toast.success("Successfully saved the user");
    } catch (error) {
      console.log(error);
    } finally {
      setFullAccess(false);
      setSelectedW([]);
      setEdit(null);
      setEditSearch("");
    }
  };

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("desc");
    }
  };

  const sortedCollab = React.useMemo(() => {
    if (!sortBy) return collab;

    return [...collab].sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case "username":
          aValue = a.user?.fullName?.toLowerCase() || "";
          bValue = b.user?.fullName?.toLowerCase() || "";
          break;
        case "workspaceCount":
          aValue = a.workspaces?.length || 0;
          bValue = b.workspaces?.length || 0;
          break;
        case "access":
          aValue =
            a.type === "Full" || a.type === "full" || a.type === true ? 1 : 0;
          bValue =
            b.type === "Full" || b.type === "full" || b.type === true ? 1 : 0;
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [collab, sortBy, sortOrder]);

  return (
    <>
      <div className="bg-white w-full h-[85vh] rounded-lg flex-col items-start overflow-y-auto relative p-6 mx-auto">
        {addNew !== false && (
          <div className="fixed inset-0 border border-gray-200 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="inline-flex flex-col justify-center items-center gap-10 p-6 rounded-[1.25rem] bg-white">
              <div className="frame_1984079049 flex items-center self-stretch">
                <div className="send_invitation-1 w-[456px] text-[#1f1f1f] text-center font-semibold text-lg leading-[normal]">
                  Send Invitation
                </div>
                <svg
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="cursor-pointer"
                  onClick={() => {
                    setMemberSearch("");
                    setWorkspaceSearch("");
                    setAddNew(false);
                    setSelectedUsers([]);
                    setSelectedW([]);
                    setFullAccess(false);
                    setShowMembersDropdown(false);
                    setShowWorkspacesDropdown(false);
                  }}
                >
                  <path
                    d="M12.6654 4.27594L11.7254 3.33594L7.9987 7.0626L4.27203 3.33594L3.33203 4.27594L7.0587 8.0026L3.33203 11.7293L4.27203 12.6693L7.9987 8.9426L11.7254 12.6693L12.6654 11.7293L8.9387 8.0026L12.6654 4.27594Z"
                    fill="#ACACAC"
                  />
                </svg>
              </div>
              <div className="flex flex-col justify-center items-end gap-6 w-[467px]">
                <div className="flex flex-col items-center gap-4 self-stretch">
                  <div className=" self-stretch text-[#595959] font-medium leading-[normal]">
                    Invite your team members
                  </div>
                  <div className=" self-stretch text-[#595959] font-medium leading-[normal]">
                    Members
                  </div>
                  <div className="flex flex-col items-start gap-2 self-stretch">
                    <div
                      className="flex justify-between items-center self-stretch p-2 rounded-[0.3125rem] border-[0.8px] border-[#e0e0e0] cursor-pointer relative dropdown-container"
                      onClick={() => setShowMembersDropdown(true)}
                    >
                      <input
                        type="text"
                        className="flex-1 outline-none bg-transparent text-[#acacac] font-medium text-xs leading-[normal]"
                        placeholder="Search for members..."
                        value={memberSearch}
                        onChange={(e) => {
                          setMemberSearch(e.target.value);
                          setShowMembersDropdown(true);
                        }}
                        onFocus={() => setShowMembersDropdown(true)}
                      />
                      <svg
                        width={16}
                        height={16}
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.0013 9.9974L4.66797 6.66406H11.3346L8.0013 9.9974Z"
                          fill="#525252"
                        />
                      </svg>
                      {showMembersDropdown && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#e0e0e0] rounded-[0.3125rem] shadow-lg z-10 max-h-48 overflow-auto">
                          {users
                            ?.filter((item) =>
                              item.fullName
                                .toLowerCase()
                                .includes(memberSearch?.toLowerCase() || "")
                            )
                            .filter(
                              (item) =>
                                !collab.some(
                                  (entry) =>
                                    entry.user._id?.toString() ===
                                    item._id.toString()
                                ) && !selectedUsers.includes(item._id)
                            )
                            .map((item) => (
                              <div
                                key={item._id}
                                className="p-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedUsers((prev) => [
                                    ...prev,
                                    item._id,
                                  ]);
                                  setShowMembersDropdown(false);
                                }}
                              >
                                <div className="flex items-center gap-2">
                                  <img
                                    src={item.avatar ? item.avatar : profile}
                                    className="w-6 h-6 rounded-full"
                                  />
                                  <span className="text-sm text-gray-700">
                                    {item.fullName}
                                  </span>
                                </div>
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center self-stretch py-1 px-2 rounded-[0.3125rem]">
                      <div className="flex items-center gap-3 h-6 flex-wrap">
                        {selectedUsers.map((userId) => {
                          const user = users.find((u) => u._id === userId);
                          return user ? (
                            <div
                              key={userId}
                              className="flex justify-center items-center gap-2 py-1 px-2 opacity-[0.8] rounded-full bg-[#ffced8]/[.20]"
                            >
                              <div className="text-[#df064e] font-medium text-xs leading-[normal]">
                                {user.fullName}
                              </div>
                              <svg
                                width={16}
                                height={16}
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="cursor-pointer"
                                onClick={() => {
                                  setSelectedUsers((prev) =>
                                    prev.filter((id) => id !== userId)
                                  );
                                }}
                              >
                                <path
                                  d="M12.6654 4.27594L11.7254 3.33594L7.9987 7.0626L4.27203 3.33594L3.33203 4.27594L7.0587 8.0026L3.33203 11.7293L4.27203 12.6693L7.9987 8.9426L11.7254 12.6693L12.6654 11.7293L8.9387 8.0026L12.6654 4.27594Z"
                                  fill="#ACACAC"
                                />
                              </svg>
                            </div>
                          ) : null;
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center items-end gap-6 w-[467px]">
                <div className="flex flex-col items-center gap-4 self-stretch">
                  <div className=" self-stretch text-[#595959] font-medium leading-[normal]">
                    Choose the workspace you wish to invite your members to
                  </div>
                  <div className=" self-stretch text-[#595959] font-medium leading-[normal]">
                    Workspace
                  </div>
                  <div className="flex flex-col items-start gap-2 self-stretch">
                    <div
                      className="flex justify-between items-center self-stretch p-2 rounded-[0.3125rem] border-[0.8px] border-[#e0e0e0] cursor-pointer relative dropdown-container"
                      onClick={() => setShowWorkspacesDropdown(true)}
                    >
                      <input
                        type="text"
                        className="flex-1 outline-none bg-transparent text-[#acacac] font-medium text-xs leading-[normal]"
                        placeholder="Search for workspaces..."
                        value={workspaceSearch}
                        onChange={(e) => {
                          setWorkspaceSearch(e.target.value);
                          setShowWorkspacesDropdown(true);
                        }}
                        onFocus={() => setShowWorkspacesDropdown(true)}
                      />
                      <svg
                        width={16}
                        height={16}
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.0013 9.9974L4.66797 6.66406H11.3346L8.0013 9.9974Z"
                          fill="#525252"
                        />
                      </svg>
                      {showWorkspacesDropdown && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#e0e0e0] rounded-[0.3125rem] shadow-lg z-10 max-h-48 overflow-auto">
                          {workspaces
                            ?.filter((item) =>
                              item.workspaceName
                                .toLowerCase()
                                .includes(workspaceSearch?.toLowerCase() || "")
                            )
                            .map((item) => (
                              <div
                                key={item._id}
                                className="p-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedW((prev) =>
                                    prev.includes(item._id)
                                      ? prev.filter((id) => id !== item._id)
                                      : [...prev, item._id]
                                  );
                                }}
                              >
                                <div className="flex items-center gap-2">
                                  <FaRegFolder className="h-4 w-4 text-gray-500" />
                                  <span className="text-sm text-gray-700">
                                    {item.workspaceName}
                                  </span>
                                  {selectedW.includes(item._id) && (
                                    <svg
                                      width={16}
                                      height={16}
                                      viewBox="0 0 16 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="ml-auto"
                                    >
                                      <path
                                        d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 0 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"
                                        fill="#10B981"
                                      />
                                    </svg>
                                  )}
                                </div>
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center self-stretch py-1 px-2 rounded-[0.3125rem]">
                      <div className="flex items-center gap-3 h-6 flex-wrap">
                        {selectedW.map((workspaceId) => {
                          const workspace = workspaces.find(
                            (w) => w._id === workspaceId
                          );
                          return workspace ? (
                            <div
                              key={workspaceId}
                              className="flex justify-center items-center gap-2 py-1 px-2 opacity-[0.8] rounded-full bg-[#ffced8]/[.20]"
                            >
                              <div className="text-[#df064e] font-medium text-xs leading-[normal]">
                                {workspace.workspaceName}
                              </div>
                              <svg
                                width={16}
                                height={16}
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="cursor-pointer"
                                onClick={() => {
                                  setSelectedW((prev) =>
                                    prev.filter((id) => id !== workspaceId)
                                  );
                                }}
                              >
                                <path
                                  d="M12.6654 4.27594L11.7254 3.33594L7.9987 7.0626L4.27203 3.33594L3.33203 4.27594L7.0587 8.0026L3.33203 11.7293L4.27203 12.6693L7.9987 8.9426L11.7254 12.6693L12.6654 11.7293L8.9387 8.0026L12.6654 4.27594Z"
                                  fill="#ACACAC"
                                />
                              </svg>
                            </div>
                          ) : null;
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="flex justify-center items-center gap-3 py-2 px-4 rounded-[0.3125rem] bg-[#df064e] text-white font-medium text-sm leading-[normal] cursor-pointer hover:shadow-md transition-all"
                onClick={() => CreateNewUser()}
              >
                Send Invite
              </div>
            </div>
          </div>
        )}

        {edit !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="w-[30%] h-[60%] bg-white px-4 py-3 flex flex-col shadow-lg shadow-gray-200">
              <h1 className="text-xl w-full text-center mt-4">
                Edit Workspace Access
              </h1>
              <p className="w-full text-xs text-gray-500 text-center">
                {collab.find((item) => item._id === edit)?.user?.fullName}
              </p>
              <input
                type="text"
                className="w-full py-2 px-2 outline-none border border-gray-200 rounded-lg mt-4"
                placeholder="Search for Workspace"
                value={editSearch}
                onChange={(e) => setEditSearch(e.target.value)}
              />
              <div className="h-[65%] w-full overflow-auto">
                {workspaces
                  ?.filter((item) =>
                    item.workspaceName
                      .toLowerCase()
                      .includes(editSearch?.toLowerCase() || "")
                  )
                  .map((item) => {
                    const isSelected = selectedW.includes(item._id);
                    return (
                      <div
                        onClick={() => {
                          setSelectedW(
                            (prev) =>
                              isSelected
                                ? prev.filter((id) => id !== item._id) // Remove if already selected
                                : [...prev, item._id] // Add if not selected
                          );
                        }}
                        key={item._id}
                        className={`mt-3 mr-3 placeholder:w-[100%] h-14 px-3 py-2 border 
            ${
              isSelected || fullAccess
                ? "border-1 border-graidient_bottom "
                : "border border-gray-100"
            } 
            rounded-md flex items-center justify-start gap-2 cursor-pointer`}
                      >
                        <div className="h-10 w-12 p-2 flex items-center justify-center rounded-md shadow-md shadow-gray-300">
                          <FaRegFolder className="h-5 w-5" />
                        </div>
                        <div className="text-sm flex flex-col w-[90%]">
                          <h2 className="text-gray-600 font-semibold overflow-hidden whitespace-nowrap text-ellipsis flex items-center justify-start gap-1">
                            <span>{item.workspaceName}</span>
                          </h2>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div>
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="checkbox"
                    checked={fullAccess}
                    onChange={(e) => setFullAccess(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <label className="text-sm text-gray-600">
                    Give Full Access
                  </label>
                </div>
              </div>

              <div className="mt-2 w-full flex items-center justify-end gap-3">
                <button
                  className="px-5 py-2  bg-gray-300 rounded-md"
                  onClick={() => {
                    setEdit(null);
                    setSelectedW([]);
                    setFullAccess(false);
                    setEditSearch("");
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => EditCollabUser()}
                  className="px-6 py-3 bg-graidient_bottom text-white rounded-lg font-medium  hover:shadow-md transition-all"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="w-full flex items-center justify-between mb-4">
          <h1 className="flex items-center gap-3 text-[20px] font-normal">
            <div className="w-8 h-8 flex items-center justify-center rounded-md bg-gray-100">
              <FaUsers />
            </div>
            Manage Team
          </h1>
          <button
            onClick={() => setAddNew(true)}
            className="px-4 py-2 rounded-md bg-[#DF064E] text-white flex items-center gap-2 hover:shadow-md transition"
          >
            Add
          </button>
        </div>
        <div className="w-full mt-6 rounded-[0.625rem] border border-[#e0e0e0] bg-[#ede4dc]/30 overflow-hidden">
          {loading ? (
            <table className="w-full">
              <thead className="h-16 bg-[#eee] border-b border-[#e0e0e0] sticky top-0">
                <tr>
                  <th className="pl-3 pr-5 py-1 text-left">
                    <div className="flex items-center gap-2 w-[12.5rem]">
                      <span className="text-neutral-600 font-medium">
                        Username
                      </span>
                      <FaArrowDown className="w-3 h-3 text-neutral-600" />
                    </div>
                  </th>
                  <th className="px-2 py-1 text-left">
                    <div className="flex items-center gap-2 w-[10.875rem]">
                      <span className="text-neutral-600 font-medium">
                        Workspace count
                      </span>
                      <FaArrowDown className="w-3 h-3 text-neutral-600" />
                    </div>
                  </th>
                  <th className="px-2 py-1 text-left">
                    <div className="flex items-center gap-2 w-[6.25rem]">
                      <span className="text-neutral-600 font-medium">
                        Access
                      </span>
                      <FaArrowDown className="w-3 h-3 text-neutral-600" />
                    </div>
                  </th>
                  <th className="px-5 py-1 text-right">
                    <div className="flex items-center gap-4 justify-end p-2">
                      <div className="w-4 h-4" />
                      <div className="w-4 h-4" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[...Array(5)].map((_, index) => (
                  <tr
                    key={index}
                    className={`border-b border-b-[#e0e0e0] ${
                      index % 2 === 0 ? "bg-[#fefefe]" : "bg-[#f7f7f7]"
                    }`}
                  >
                    <td className="py-1 pl-3 pr-5">
                      <div className="flex items-center gap-2 w-[12.5rem]">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                      </div>
                    </td>
                    <td className="py-1 px-2">
                      <div className="flex items-center gap-0.5 w-[10.875rem]">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-8 mx-auto"></div>
                      </div>
                    </td>
                    <td className="py-1 px-2">
                      <div className="flex items-center gap-2 w-[6.25rem]">
                        <div className="w-2 h-2 bg-gray-200 rounded-full animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-12"></div>
                      </div>
                    </td>
                    <td className="py-1 px-5 text-right">
                      <div className="flex items-center gap-4 justify-end">
                        <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
                        <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table className="w-full">
              <thead className="h-16 bg-[#eee] border-b border-[#e0e0e0] sticky top-0">
                <tr>
                  <th className="pl-3 pr-5 py-1 text-left">
                    <div
                      className="flex items-center gap-2 w-[12.5rem] cursor-pointer"
                      onClick={() => handleSort("username")}
                    >
                      <span className="text-neutral-600 font-medium">
                        Username
                      </span>
                      {sortBy === "username" ? (
                        sortOrder === "asc" ? (
                          <FaArrowDown className="w-3 h-3 text-neutral-600" />
                        ) : (
                          <FaArrowDown className="w-3 h-3 text-neutral-600 transform rotate-180" />
                        )
                      ) : (
                        <FaArrowDown className="w-3 h-3 text-neutral-600 opacity-50" />
                      )}
                    </div>
                  </th>
                  <th className="px-2 py-1 text-left">
                    <div
                      className="flex items-center gap-2 w-[10.875rem] cursor-pointer"
                      onClick={() => handleSort("workspaceCount")}
                    >
                      <span className="text-neutral-600 font-medium">
                        Workspace count
                      </span>
                      {sortBy === "workspaceCount" ? (
                        sortOrder === "asc" ? (
                          <FaArrowDown className="w-3 h-3 text-neutral-600" />
                        ) : (
                          <FaArrowDown className="w-3 h-3 text-neutral-600 transform rotate-180" />
                        )
                      ) : (
                        <FaArrowDown className="w-3 h-3 text-neutral-600 opacity-50" />
                      )}
                    </div>
                  </th>
                  <th className="px-2 py-1 text-left">
                    <div
                      className="flex items-center gap-2 w-[6.25rem] cursor-pointer"
                      onClick={() => handleSort("access")}
                    >
                      <span className="text-neutral-600 font-medium">
                        Access
                      </span>
                      {sortBy === "access" ? (
                        sortOrder === "asc" ? (
                          <FaArrowDown className="w-3 h-3 text-neutral-600" />
                        ) : (
                          <FaArrowDown className="w-3 h-3 text-neutral-600 transform rotate-180" />
                        )
                      ) : (
                        <FaArrowDown className="w-3 h-3 text-neutral-600 opacity-50" />
                      )}
                    </div>
                  </th>
                  <th className="px-5 py-1 text-right">
                    <div className="flex items-center gap-4 justify-end p-2">
                      <div className="w-4 h-4" />
                      <div className="w-4 h-4" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedCollab.map((item, index) => {
                  const isFull =
                    item.type === "Full" ||
                    item.type === "full" ||
                    item.type === true;
                  return (
                    <tr
                      key={item._id}
                      className={`border-b border-b-[#e0e0e0] ${
                        index % 2 === 0 ? "bg-[#fefefe]" : "bg-[#f7f7f7]"
                      }`}
                    >
                      <td className="py-1 pl-3 pr-5">
                        <div className="flex items-center gap-2 w-[12.5rem]">
                          <div className="text-sm text-[#1f1f1f]">
                            {item.user?.fullName}
                          </div>
                        </div>
                      </td>

                      <td className="py-1 px-2">
                        <div className="flex items-center gap-0.5 w-[10.875rem]">
                          <div className="text-sm text-center text-[#1f1f1f]">
                            {item.workspaces.length}
                          </div>
                        </div>
                      </td>

                      <td className="py-1 px-2">
                        <div className="flex items-center gap-2 w-[6.25rem]">
                          <div
                            className={`${
                              isFull ? "bg-[#df064e]" : "bg-[#cbcbcb]"
                            } w-2 h-2 rounded-full`}
                          />
                          <div className="text-sm text-[#1f1f1f]">
                            {isFull ? "Full" : "limited"}
                          </div>
                        </div>
                      </td>

                      <td className="py-1 px-5 text-right">
                        <div className="flex items-center gap-4 justify-end">
                          <button
                            onClick={() => {
                              const collabItem = collab.find(
                                (item) => item._id === item._id
                              );
                              setEdit(item._id);
                              setSelectedW(item.workspaces);
                              setFullAccess(
                                item.type === "Full" ||
                                  item.type === "full" ||
                                  item.type === true
                              );
                            }}
                            className="p-2 hover:bg-gray-100 rounded-md"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => DeleteCollabUser(item._id)}
                            className="p-2 hover:bg-gray-100 rounded-md"
                          >
                            <RiDeleteBin5Line />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default ManageUsers;
