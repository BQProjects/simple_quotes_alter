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

const ManageUsers = () => {
  const [addNew, setAddNew] = useState(false);
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState(null);
  const { user } = useContext(UserContext);
  const { databaseUrl } = useContext(DatabaseContext);
  const [workspaces, setWorkspaces] = useState([]);
  const [selectedW, setSelectedW] = useState([]);
  const [search, setSearch] = useState("");
  const [fullAccess, setFullAccess] = useState(false);
  const [collab, setCollab] = useState([]);
  const [edit, setEdit] = useState(null);

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
  }, []);

  useEffect(() => {
    getCollabUsers();
  }, []);

  const getCollabUsers = async () => {
    try {
      const res = await axios.get(
        `${databaseUrl}/api/workspace/getallmembers`,
        {
          params: { user_id: user.id },
        }
      );
      setCollab(res.data.collab);
    } catch (error) {
      console.error("Error fetching workspaces:", error);
    }
  };

  const CreateNewUser = async () => {
    try {
      if (fullAccess === true) {
        const res = await axios.post(
          `${databaseUrl}/api/workspace/createfull`,
          {
            user_id: user.id,
            new_user_id: selected,
          }
        );
        setCollab([...collab, res.data]);
      } else {
        const res = await axios.post(`${databaseUrl}/api/workspace/createlim`, {
          user_id: user.id,
          new_user_id: selected,
          workspaceIds: selectedW,
        });
        console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setFullAccess(false);
      setSelectedW([]);
      setSelected(null);
      setAddNew(false);
      toast.success("User has been added to collabration");
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
    }
  };

  const DeleteCollabUser = async (collab_id) => {
    try {
      const res = await axios.post(
        `${databaseUrl}/api/workspace/deletecollab`,
        {
          collab_id: collab_id,
        }
      );

      setCollab(collab.filter((item) => item._id !== collab_id));
      toast.success("User has been deleted from collabration");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="bg-white w-full h-[85vh] flex flex-col items-center overflow-y-auto relative">
        {addNew !== false && (
          <div className="fixed inset-0 bg-transparent bg-opacity-40 flex justify-center items-center z-50">
            {selected === null ? (
              <div className="w-[30%] h-[60%] bg-white px-4 py-3 flex flex-col shadow-lg shadow-gray-200">
                <h1 className="text-xl w-full text-center mt-4">Select User</h1>
                <p className="w-full text-xs  text-gray-500 text-center">
                  select a user that you want to add as team member
                </p>
                <input
                  type="text"
                  className="w-full py-2 px-2 outline-none border border-gray-200 rounded-lg mt-4"
                  placeholder="Search for User"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <div className="h-[65%] w-full overflow-auto">
                  {users
                    ?.filter((item) =>
                      item.fullName
                        .toLowerCase()
                        .includes(search?.toLowerCase() || "")
                    )
                    .filter(
                      (item) =>
                        !collab.some(
                          (entry) =>
                            entry.user._id?.toString() === item._id.toString()
                        )
                    )
                    .map((item) => (
                      <div
                        onClick={() => {
                          setSelected(item._id);
                          setSearch("");
                        }}
                        key={item._id}
                        className={` mt-3 mr-3 placeholder:w-[100%] h-14 px-3 py-2 border ${
                          selected === item._id
                            ? "border-graidient_bottom"
                            : "border-gray-100"
                        }  rounded-md flex items-center justify-start gap-2 cursor-pointer `}
                      >
                        <div
                          className={`h-10 w-12  p-2 flex items-center justify-center rounded-md shadow-md shadow-gray-300 `}
                        >
                          <img
                            src={item.avatar ? item.avatar : profile}
                            className="w-8 h-8 rounded-[50%]"
                          />
                        </div>
                        <div className="text-sm flex flex-col w-[90%] ">
                          <h2 className=" text-gray-600 font-semibold overflow-hidden whitespace-nowrap text-ellipsis flex items-center justify-start gap-1">
                            <span>{item.fullName}</span>
                          </h2>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="mt-2 w-full flex items-center justify-end gap-3">
                  <button
                    className="px-5 py-2  bg-gray-300 rounded-md"
                    onClick={() => {
                      setSearch("");
                      setAddNew(false);
                      setSelected(null);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="w-[30%] h-[60%] bg-white px-4 py-3 flex flex-col shadow-lg shadow-gray-200">
                <h1 className="text-xl w-full text-center mt-4">
                  Select Workspaces
                </h1>
                <p className="w-full text-xs  text-gray-500 text-center">
                  Select Workspaces that user get access to
                </p>
                <input
                  type="text"
                  className="w-full py-2 px-2 outline-none border border-gray-200 rounded-lg mt-4"
                  placeholder="Search for Workspace"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <div className="h-[65%] w-full overflow-auto">
                  {workspaces
                    ?.filter((item) =>
                      item.workspaceName
                        .toLowerCase()
                        .includes(search?.toLowerCase() || "")
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
                  <input
                    type="checkbox"
                    value={fullAccess}
                    onChange={(e) => {
                      setFullAccess(e.target.checked);
                      console.log(e.target.checked);
                    }}
                  />{" "}
                  <label>Give Full Access</label>
                </div>

                <div className="mt-2 w-full flex items-center justify-end gap-3">
                  <button
                    className="px-5 py-2  bg-gray-300 rounded-md"
                    onClick={() => {
                      setAddNew(false);
                      setSelected(null);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => CreateNewUser()}
                    className="px-6 py-3 bg-graidient_bottom text-white rounded-lg font-medium  hover:shadow-md transition-all"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {edit !== null && (
          <div className="fixed inset-0 bg-transparent bg-opacity-40 flex justify-center items-center z-50">
            <div className="w-[30%] h-[60%] bg-white px-4 py-3 flex flex-col shadow-lg shadow-gray-200">
              <h1 className="text-xl w-full text-center mt-4">
                Select Workspaces
              </h1>
              <p className="w-full text-xs  text-gray-500 text-center">
                Edit the Workspace Access
              </p>
              <input
                type="text"
                className="w-full py-2 px-2 outline-none border border-gray-200 rounded-lg mt-4"
                placeholder="Search for Workspace"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="h-[65%] w-full overflow-auto">
                {workspaces
                  ?.filter((item) =>
                    item.workspaceName
                      .toLowerCase()
                      .includes(search?.toLowerCase() || "")
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
                <input
                  type="checkbox"
                  value={fullAccess}
                  onChange={(e) => {
                    setFullAccess(e.target.checked);
                  }}
                />
                <label>Give Full Access</label>
              </div>

              <div className="mt-2 w-full flex items-center justify-end gap-3">
                <button
                  className="px-5 py-2  bg-gray-300 rounded-md"
                  onClick={() => {
                    setEdit(null);
                    setSelectedW([]);
                    setFullAccess(false);
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
        <h1 className="mb-4 flex items-center justify-start gap-2 text-xl mt-8 w-full pl-10 ">
          <FaUsers className=" mr-1" /> Manage Users
        </h1>
        <button
          onClick={() => setAddNew(true)}
          className="px-3 py-2 rounded-md bg-graidient_bottom text-white absolute top-6 right-10 flex items-center justify-center "
        >
          Add User
        </button>
        <table className="auto-table w-[90%] mt-6 ">
          <thead className="h-12 bg-gray-100 text-left text-gray-500  text-sm font-semibold sticky top-0">
            <tr>
              <th className="rounded-l-sm px-4 py-2 w-[30%]">Username</th>
              <th className="px-4 py-2 w-[25%]">No of Workspaces</th>
              <th className="rounded-r-sm pl-10 py-2 w-[25%]">Access</th>
              <th className="rounded-r-sm pl-10 py-2 w-[20%]">Quick Action</th>
            </tr>
          </thead>
          <tbody>
            {collab.map((item, _) => {
              return (
                <tr key={item._id}>
                  <td className="py-2 px-4">{item.user?.fullName}</td>
                  <td className="py-2 px-8">{item.workspaces.length}</td>
                  <td className="py-2 px-10">{item.type}</td>
                  <td className="py-2 px-12 flex gap-3 text-lg text-gray-600">
                    <button
                      onClick={() => {
                        setEdit(item._id);
                        setSelectedW(item.workspaces);
                      }}
                    >
                      <FaEdit />
                    </button>
                    <button onClick={() => DeleteCollabUser(item._id)}>
                      <RiDeleteBin5Line />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ManageUsers;
