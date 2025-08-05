import React, { useContext, useEffect, useRef, useState } from "react";
import { FaRegFolder } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { DatabaseContext } from "../../context/DatabaseContext";
import NewWorkspace from "./NewWorkspace";
import Dashboard from "./Dashboard";
import { GoFileDirectoryFill } from "react-icons/go";
import { CiStar } from "react-icons/ci";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaPlus, FaStar, FaRegStar } from "react-icons/fa";
import Profile from "../../assets/profile.png";
import { RiArrowUpDownLine } from "react-icons/ri";
import { FaCheck } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import toast from "react-hot-toast";
import { StateManageContext } from "../../context/StateManageContext";

const AllWorkspace = () => {
  const { user } = useContext(UserContext);
  const { databaseUrl } = useContext(DatabaseContext);
  const { workspaces, setWorkspaces, sortW, setSortW } =
    useContext(StateManageContext);
  const navigate = useNavigate();
  // const [workspaces, setWorkspaces] = useState([]);
  const [error, setError] = useState(null);
  const [popup, setPopup] = useState(null);
  const [newW, setNewW] = useState(false);
  const [name, setName] = useState("");
  const addRef = useRef();
  const [threeDots, setThreeDots] = useState(null);
  const [deleteW, setDeleteW] = useState(null);
  const [conformD, setConformD] = useState(false);
  const blockRef = useRef();
  const buttonRef = useRef();
  // const [sortW, setSortW] = useState("default");
  const [openSort, setOpenSort] = useState(false);
  const sortButtonRef = useRef();
  const sortRef = useRef();

  const handleFavorate = async (id, favorate, e) => {
    e.stopPropagation();
    try {
      await axios.put(`${databaseUrl}/api/workspace/update`, {
        id: id,
        value: favorate,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   if (user?.id && databaseUrl) {
  //     getWorkspaces();
  //   }
  // }, [user?.id, databaseUrl, sortW]);

  function getRandomColor() {
    const colors = ["green", "red", "orange", "blue"];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }

  // const getWorkspaces = async () => {
  //   try {
  //     const res = await axios.get(
  //       `${databaseUrl}/api/workspace/getallworkspaces`,
  //       {
  //         params: { user_id: user.id, sortw: sortW },
  //       }
  //     );
  //     setWorkspaces(res.data);
  //   } catch (error) {
  //     console.error("Error fetching workspaces:", error);
  //     setError("Failed to fetch workspaces. Please try again later.");
  //   }
  // };

  const handleNewWorkspace = async (workspaceName, users) => {
    try {
      const res = await axios.post(`${databaseUrl}/api/workspace/new`, {
        user_id: user.id,
        workspaceName: workspaceName !== "" ? workspaceName : "Untitled",
        workspaceColor: getRandomColor(),
        users: users,
      });
      setWorkspaces([...workspaces, res.data]);
      toast.success("Workspace has been created");
    } catch (error) {
      console.error("Error creating workspace:", error);
      setError("Failed to create workspace. Please try again later.");
    } finally {
      setName("");
      setNewW(false);
    }
  };

  const handleClickOutsideBlock = (event) => {
    if (
      blockRef.current &&
      !blockRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setThreeDots(null);
    }
  };

  const handleDelete = async () => {
    if (conformD === false) {
      alert("Please click the checkbox");
    } else {
      try {
        await axios.delete(
          `${databaseUrl}/api/workspace/deletew/${workspaces[deleteW]._id}`
        );
        const temp = [...workspaces];
        temp.splice(deleteW, 1);
        setWorkspaces(temp);
        toast.success("Workspace has been deleted");
      } catch (error) {
        console.log(error);
      } finally {
        setConformD(false);
        setDeleteW(null);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideBlock);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideBlock);
    };
  }, []);

  const handleClickOutsideSort = (event) => {
    if (
      sortRef.current &&
      !sortRef.current.contains(event.target) &&
      sortButtonRef.current &&
      !sortButtonRef.current.contains(event.target)
    ) {
      setOpenSort(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideSort);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideSort);
    };
  }, []);

  return (
    <>
      <div className="relative w-full bg-white min-h-[85vh] px-10 pt-10 shadow-lg shadow-gray-300">
        <h1 className="mb-4 flex items-center justify-start gap-2 text-xl">
          <FaRegFolder className="text-gray-400 mr-1" /> Workspaces
          <span className="relative ml-1" ref={sortButtonRef}>
            <RiArrowUpDownLine onClick={() => setOpenSort(true)} />
            {openSort === true && (
              <div
                ref={sortRef}
                className="absolute -top-10 left-7 z-50 flex flex-col p-4 text-xs w-40 bg-white gap-3 shadow-md shadow-gray-300 rounded-md"
              >
                <button
                  onClick={() => setSortW("default")}
                  className="w-full flex items-center justify-center gap-3"
                >
                  All Workspaces{" "}
                  <span> {sortW === "default" && <FaCheck />} </span>
                </button>
                <button
                  onClick={() => setSortW("alp")}
                  className="w-full flex items-center justify-center gap-3"
                >
                  Alphabetical <span> {sortW === "alp" && <FaCheck />}</span>
                </button>
                <button
                  onClick={() => setSortW("recent")}
                  className="w-full flex items-center justify-center gap-3"
                >
                  Reacently Created
                  <span> {sortW === "recent" && <FaCheck />}</span>
                </button>
              </div>
            )}
          </span>
        </h1>
        {popup !== null && (
          <NewWorkspace
            handleNewWorkspace={handleNewWorkspace}
            popup={popup}
            workspaces={workspaces}
            setWorkspaces={setWorkspaces}
            setPopup={setPopup}
          />
        )}

        {deleteW !== null && (
          <div className="fixed inset-0 bg-transparent bg-opacity-40 flex justify-center items-center z-[1000]">
            <div className="relative bg-white rounded-2xl shadow-2xl py-6 px-7 w-[45%] min-h-[40%] transition-all ">
              <div className="w-full flex items-center justify-center flex-col gap-1">
                <h2 className="text-xl text-gray-600">Workspace Deleting</h2>
                <p className="text-gray-400">
                  {workspaces[deleteW].workspaceName}{" "}
                  <span className="ml-1">|</span>
                  <span className="ml-1">
                    {" "}
                    {workspaces[deleteW].proposals.length} Proposals
                  </span>
                </p>
              </div>
              <div className="mt-6 text-gray-500">
                <p>This action is irreversible!</p>
                <ul className="list-disc pl-6 mt-2">
                  <li>
                    Deleting this workspace will permanently remove all folders,
                    documents, subpages, and activity.
                  </li>
                  <li className="mt-2">
                    Any active users will lose access shortly
                  </li>
                </ul>
              </div>
              {workspaces[deleteW].proposals.length === 0 && (
                <div className="w-full flex items-center justify-start gap-3 mt-4">
                  <p className="text-lg">
                    Are you sure you want to permanently delete this workspace?
                  </p>
                  <input
                    type="checkbox"
                    value={conformD}
                    onChange={(e) => {
                      setConformD(e.target.value);
                    }}
                  />
                </div>
              )}

              {workspaces[deleteW].proposals.length !== 0 && (
                <p className=" w-full text-start text-gray-400 mt-3">
                  Note: You can only delete Workspace if there are no proposal's
                  in it
                </p>
              )}

              <div className="w-full flex items-center justify-end gap-4 px-4 mt-5">
                {workspaces[deleteW].proposals.length !== 0 ? (
                  <button
                    onClick={() => {
                      navigate(`/workspace/${workspaces[deleteW]._id}`);
                      setDeleteW(null);
                    }}
                    className={`px-3 py-2 bg-graidient_bottom text-white rounded-md `}
                  >
                    View Proposals
                  </button>
                ) : (
                  <button
                    onClick={() => handleDelete()}
                    className={`px-3 py-2 bg-graidient_bottom text-white rounded-md `}
                  >
                    Delete
                  </button>
                )}
                <button
                  className="absolute top-4 right-6"
                  onClick={() => {
                    setDeleteW(null);
                    setConformD(false);
                  }}
                >
                  X
                </button>
              </div>
            </div>
          </div>
        )}
        <button
          onClick={() => setNewW(true)}
          className="w-8 h-8 rounded-[50%] bg-graidient_bottom text-white absolute top-10 right-10 flex items-center justify-center text-xs"
        >
          <FaPlus />
        </button>

        <div className="p-2 grid grid-cols-3  ">
          {workspaces.map((workspace, index) => {
            return (
              <div
                key={index}
                className=" mt-4 mr-4 placeholder:w-[95%] h-16 px-3 py-2 border border-gray-300 rounded-md flex items-center justify-start gap-2 cursor-pointer "
              >
                <div
                  onClick={() => navigate(`/workspace/${workspace._id}`)}
                  className={`h-10 w-12  p-2 flex items-center justify-center rounded-md shadow-md shadow-gray-300 `}
                >
                  <FaRegFolder
                    style={{
                      color: workspace.workspaceColor,
                    }}
                    className=" h-5 w-5"
                  />
                </div>
                <div
                  className="text-sm flex flex-col w-[63%]  "
                  onClick={() => navigate(`/workspace/${workspace._id}`)}
                >
                  <h2 className=" text-gray-600 font-semibold overflow-hidden whitespace-nowrap text-ellipsis flex items-center justify-start gap-1">
                    <span>
                      {workspace.workspaceName
                        ? workspace.workspaceName
                        : "Workspace"}
                    </span>
                    <span className="z-10">
                      {workspace.favorate ? (
                        <FaStar
                          onClick={(e) => {
                            handleFavorate(workspace._id, false, e);
                            const temp = [...workspaces];
                            temp[index].favorate = false;
                            setWorkspaces(temp);
                          }}
                          className="text-graidient_bottom"
                        />
                      ) : (
                        <FaRegStar
                          onClick={(e) => {
                            handleFavorate(workspace._id, true, e);
                            const temp = [...workspaces];
                            temp[index].favorate = true;
                            setWorkspaces(temp);
                          }}
                          className="text-gray-500"
                        />
                      )}
                    </span>
                  </h2>
                  <p className="text-xs text-gray-400">
                    {workspace.proposals.length} Proposals
                  </p>
                </div>
                <div className="flex flex-row gap-1 items-center justify-end">
                  <div
                    className="relative h-8 w-8 rounded-[50%] "
                    style={{
                      marginRight:
                        workspace.collabUsers?.length >= 0 ? "20px" : 0,
                    }}
                  >
                    <img src={Profile} alt="aksjdch" />
                    {workspace.collabUsers?.length >= 0 && (
                      <div className="absolute h-8 w-8 bg-white top-0 left-[58%] rounded-[50%] text-gray-500 flex items-center justify-center shadow-md shadow-gray-300">
                        + {workspace.collabUsers?.length + 1}
                      </div>
                    )}
                  </div>
                  <div
                    onClick={() => setThreeDots(index)}
                    className="relative z-10"
                    ref={buttonRef}
                  >
                    <BsThreeDotsVertical className="h-4 w-4" />
                    {threeDots === index && (
                      <div
                        ref={blockRef}
                        className="absolute top-5 -left-20 flex flex-col z-20 bg-white px-2 py-2 w-40 items-center justify-center shadow-md shadow-gray-300 "
                      >
                        <p
                          onClick={() => {
                            setPopup(index);
                            setThreeDots(null);
                          }}
                          className="py-1 px-2 w-full hover:bg-gray-100 flex items-center justify-start gap-2 text-gray-600"
                        >
                          <span>
                            {" "}
                            <FaRegEdit />
                          </span>{" "}
                          Edit
                        </p>
                        <p
                          onClick={() => setDeleteW(index)}
                          className="py-1 px-2 w-full hover:bg-gray-100 flex items-center justify-start gap-2 text-gray-600"
                        >
                          <span>
                            <MdOutlineDelete />
                          </span>{" "}
                          Delete
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          {newW && (
            <div
              ref={addRef}
              className=" relative w-[95%] h-16 px-3 py-2 border border-gray-100 rounded-md flex items-center justify-start gap-2 cursor-pointer mt-4 "
            >
              <div
                className={`h-10 w-12  p-2 flex items-center justify-center rounded-md shadow-md shadow-gray-300 `}
              >
                <FaRegFolder className=" h-5 w-5 text-gray-300" />
              </div>
              <div className="text-sm flex items-center w-[63%] ">
                <input
                  type="text"
                  className="py-1  border-b-1 border-black outline-none"
                  placeholder="Workspace Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleNewWorkspace(name, "orange", []); // replace this with your actual function
                    }
                  }}
                />
                <FaCheck
                  onClick={() => handleNewWorkspace(name, "orange", [])}
                />
              </div>
              <div className="flex flex-row gap-1 items-center justify-end">
                <div className="relative h-8 w-8 rounded-[50%] ">
                  <img src={Profile} alt="aksjdch" />
                </div>
              </div>
              <button
                className="absolute top-1 right-1 p-1"
                onClick={() => {
                  setName("");
                  setNewW(false);
                }}
              >
                x
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AllWorkspace;
