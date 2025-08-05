import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import { DatabaseContext } from "../../context/DatabaseContext";
import NewProposal from "./NewProposal";
import Dashboard from "./Dashboard";
import { FiEye } from "react-icons/fi";
import { GoLink } from "react-icons/go";
import { CiLock } from "react-icons/ci";
import { LiaEditSolid } from "react-icons/lia";
import { FaRegCopy } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import { SiSimpleanalytics } from "react-icons/si";
import { IoMdLock } from "react-icons/io";
import { FaRegFileLines } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import { FaRegFolder } from "react-icons/fa";
import { FiArrowLeft } from "react-icons/fi";
import { FaCheck } from "react-icons/fa";
import toast from "react-hot-toast";
import { StateManageContext } from "../../context/StateManageContext";

const DashboardFirst = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [popup, setPopup] = useState(false);
  const { workspaces, setWorkspaces } = useContext(StateManageContext);
  const { databaseUrl } = useContext(DatabaseContext);
  const { id } = useParams();
  const [selLocked, setSelLoacked] = useState([]);
  const blockRef = useRef();
  const buttonRef = useRef();
  const [threeDots, setThreeDots] = useState(null);
  const [workspace, setWorkspace] = useState(null);

  const [errorMessage, setErrorMessage] = useState("");
  const [proposals, setProposals] = useState([]);
  const [renameV, setRenameV] = useState("");
  const [rename, setRename] = useState(null);
  const [move, setMove] = useState(null);
  // const [workspaces, setWorkspaces] = useState([]);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  const handleMove = async () => {
    try {
      const res = await axios.post(`${databaseUrl}/api/workspace/move`, {
        id: move,
        workspace_id: selected,
      });
      setProposals(proposals.filter((item) => item._id !== move));
      toast.success("Workspace has been moved");
    } catch (error) {
      console.log(error);
    } finally {
      setSearch("");
      setMove(null);
      setSelected(null);
      setThreeDots(null);
    }
  };

  const handleRename = async (id, index) => {
    try {
      const res = await axios.post(`${databaseUrl}/api/workspace/rename`, {
        id: id,
        name: renameV,
      });
      const temp = [...proposals];
      temp[index].proposalName = renameV;
      setProposals(temp);
      toast.success("Proposal name has been changed");
    } catch (error) {
      console.log(error);
    } finally {
      setRename(null);
      setRenameV("");
    }
  };

  const getLastSeen = (date) => {
    if (!date) return "No data";

    const now = new Date();
    const lastSeenDate = new Date(date);
    const diffInSeconds = Math.floor((now - lastSeenDate) / 1000);

    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    } else if (diffInSeconds < 86400) {
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    } else {
      return `${Math.floor(diffInSeconds / 86400)} days ago`;
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.post(`${databaseUrl}/api/workspace/delete`, {
        id: id,
        user_id: user.id,
      });

      console.log(res);
      setProposals(proposals.filter((item) => item._id !== id));
      toast.success("Successfully deleted proposal");
    } catch (error) {
      console.log(error);
    } finally {
      setThreeDots(null);
    }
  };
  const handleDuplicate = async (id) => {
    try {
      const res = await axios.post(`${databaseUrl}/api/workspace/duplicate`, {
        id: id,
        user_id: user.id,
      });

      setProposals([res.data, ...proposals]);
      toast.success("Duplicate Proposal has been created");
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (dateInput) => {
    if (!dateInput) return "Invalid Date";

    const date = new Date(dateInput);

    if (isNaN(date.getTime())) return "Invalid Date"; // Handle invalid dates

    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" }); // Get short month name (e.g., "Jan")
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

  const handleCreateNewProposal = async (name) => {
    try {
      const response = await axios.post(
        `${databaseUrl}/api/editor/newproposal`,
        {
          email: user.email,
          id: user.id,
          workspace_id: id,
          name: name,
          settings: {
            heading: "Arieal",
            body: "Arieal",
            header: false,
            footer: false,
            color: "#9b9b9b",
            theme: 0,
          },
        }
      );
      navigate(`/editor/${response.data._id}`);
    } catch (error) {
      console.error("Error creating proposal:", error);
      setErrorMessage("Failed to create a new proposal. Please try again.");
    }
  };

  useEffect(() => {
    getAllProposals();
  }, [id]); // Re-run if `id` changes

  const getAllProposals = async () => {
    try {
      const response = await axios.get(
        `${databaseUrl}/api/editor/getproposal`,
        {
          params: { workspace_id: id },
        }
      );
      console.log(response);
      setProposals(response.data);
    } catch (error) {
      console.error("Error fetching proposals:", error);
      setErrorMessage("Failed to fetch proposals. Please try again.");
    }
  };

  useEffect(() => {
    getWorkspace();
  }, [id]); // Re-run if `id` changes

  const getWorkspace = async () => {
    try {
      const response = await axios.get(`${databaseUrl}/api/workspace/single`, {
        params: { workspace_id: id },
      });
      console.log(response);
      setWorkspace(response.data);
    } catch (error) {
      console.error("Error fetching proposals:", error);
      setErrorMessage("Failed to fetch proposals. Please try again.");
    }
  };
  const getBaseUrl = () => {
    const url = window.location.origin; // Gets up to .com, .net, etc.
    return url;
  };

  const copyToClipboard = (id) => {
    const domain = getBaseUrl();
    navigator.clipboard
      .writeText(`${domain}/#/view/${id}`)
      .then(() => {
        toast.success("Copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy:", err);
      });
  };

  const handleFavorate = async (favorate, id) => {
    try {
      await axios.put(`${databaseUrl}/api/editor/favorate`, {
        id: id,
        favorate: favorate,
      });
    } catch (error) {
      console.log(error);
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

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideBlock);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideBlock);
    };
  }, []);

  const getProposal = async (id) => {
    try {
      const res = await axios.get(`${databaseUrl}/api/workspace/proposal`, {
        params: { id: id },
      });

      console.log(res.data);
    } catch (error) {
      console.error("Error fetching workspaces:", error);
    }
  };

  return (
    <>
      {move !== null && (
        <div className="fixed inset-0 bg-transparent bg-opacity-40 flex justify-center items-center z-50">
          <div className="w-[30%] h-[60%] bg-white px-4 py-3 flex flex-col shadow-lg shadow-gray-200">
            <h1 className="text-xl w-full text-center mt-4">Move To</h1>
            <p className="w-full text-xs  text-gray-500 text-center">
              select a workspace for the proposal to move
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
                .map((item) => (
                  <div
                    onClick={() => setSelected(item._id)}
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
                      <FaRegFolder
                        style={{
                          color: item.workspaceColor,
                        }}
                        className=" h-5 w-5"
                      />
                    </div>
                    <div className="text-sm flex flex-col w-[90%] ">
                      <h2 className=" text-gray-600 font-semibold overflow-hidden whitespace-nowrap text-ellipsis flex items-center justify-start gap-1">
                        <span>{item.workspaceName}</span>
                      </h2>
                    </div>
                  </div>
                ))}
            </div>
            <div className="mt-2 w-full flex items-center justify-end gap-3">
              <button
                className="px-5 py-2  bg-gray-300 rounded-md"
                onClick={() => {
                  setSelected(null);
                  setMove(null);
                  setSearch("");
                }}
              >
                Cancel
              </button>
              <button
                className="px-5 py-2 text-white bg-footer_gradient_bot rounded-md"
                onClick={() => handleMove()}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="w-full bg-white min-h-[85vh] px-10 pt-4 shadow-lg shadow-gray-300 ">
        <div className="flex  items-center justify-start text-xl mt-3 mb-6 mx-2">
          <button
            onClick={() => {
              navigate("/workspaces");
            }}
            className="text-gray-500  hover:bg-gray-100 p-1 rounded-xl mr-3"
          >
            <FiArrowLeft />
          </button>
          <div className="p-2 text-lg shadow-md shadow-gray-300 rounded-md mr-3">
            <FaRegFolder
              style={{
                color: workspace ? workspace.workspaceColor : "red",
              }}
            />
          </div>
          <h3>{workspace ? workspace.workspaceName : "jlsbdvljs"}</h3>
        </div>
        <div className="w-full h-[75vh] overflow-y-auto scrollbar-hide relative">
          <table className="auto-table w-full ">
            <thead className="h-12 bg-gray-100 text-left text-gray-500  text-sm font-semibold sticky top-0">
              <tr>
                <th className="rounded-l-sm px-4 py-2 w-[45%]">
                  Proposal Name
                </th>
                <th className="px-4 py-2 w-[25%]">Views</th>
                <th className="rounded-r-sm pl-10 py-2 w-[20%]">
                  Quick Action
                </th>
              </tr>
            </thead>
            <tbody className="">
              {proposals.map((proposal, index) => {
                return (
                  <tr
                    className="border-b border-gray-100 mt-1 text-gray-600 hover:bg-gray-50 cursor-pointer h-14 "
                    key={index}
                  >
                    <td
                      key={proposal._id}
                      className="px-4 flex flex-col items-start justify-center  text-left pt-1"
                    >
                      <span className="flex items-center gap-2 w-full">
                        {proposal.favorate ? (
                          <FaStar
                            onClick={() => {
                              handleFavorate(false, proposal._id);
                              const temp = [...proposals];
                              temp[index].favorate = false;
                              setProposals(temp);
                            }}
                            className="text-graidient_bottom"
                          />
                        ) : (
                          <FaRegStar
                            onClick={() => {
                              handleFavorate(true, proposal._id);
                              const temp = [...proposals];
                              temp[index].favorate = true;
                              setProposals(temp);
                            }}
                            className="text-gray-500"
                          />
                        )}

                        <input
                          onClick={() => {
                            if (rename === null) {
                              navigate(`/editor/${proposal._id}`);
                            }
                          }}
                          value={
                            rename === proposal._id
                              ? renameV
                              : proposal.proposalName
                          }
                          className={`w-[70%] overflow-hidden whitespace-nowrap text-ellipsis outline-none ${
                            rename === proposal._id
                              ? "border-b border-gray-800"
                              : "none"
                          } `}
                          onChange={(e) => setRenameV(e.target.value)}
                          readOnly={rename === proposal._id ? false : true}
                        />
                        {rename === proposal._id && (
                          <button
                            onClick={() => {
                              handleRename(proposal._id, index);
                            }}
                          >
                            <FaCheck />
                          </button>
                        )}
                      </span>
                      <span className="text-xs text-gray-500 ml-7 ">
                        Created on {formatDate(proposal.createdAt)}
                      </span>
                    </td>
                    <td className="pl-5 pr-3">
                      {proposal.views ? (
                        <span className="flex flex-col  items-start justify-center">
                          <span className="flex items-center justify-start gap-2">
                            <FiEye />
                            {proposal.views}
                          </span>
                          <span className=" text-xs text-gray-500">
                            Last vist {getLastSeen(proposal.lastUpdate)}
                          </span>
                        </span>
                      ) : (
                        <span className="flex flex-row gap-1 items-center justify-start">
                          <FiEye />0
                        </span>
                      )}
                    </td>
                    <td>
                      <div className="flex flex-row gap-4  ml-8 ">
                        <GoLink
                          onClick={() => {
                            copyToClipboard(proposal._id);
                          }}
                          className="w-4 h-4 text-gray-600 "
                        />
                        <SiSimpleanalytics
                          onClick={() => navigate(`/analytics/${proposal._id}`)}
                          className="w-4 h-4 text-gray-600 "
                        />
                        <IoMdLock
                          className={`${
                            proposal.locked || selLocked.includes(proposal._id)
                              ? "text-graidient_bottom"
                              : "text-gray-500"
                          } w-5 h-4 text-gray-600 `}
                          onClick={() => {
                            handleLocked(!proposal.locked, proposal._id);
                            const temp = [...proposals];
                            temp[index].locked = !proposal.locked;
                            setProposals(temp);
                          }}
                        />

                        <FaRegCopy
                          onClick={() => handleDuplicate(proposal._id)}
                        />
                        <div className="relative" ref={buttonRef}>
                          <BsThreeDotsVertical
                            onClick={() => {
                              if (threeDots !== null) {
                                setThreeDots(null);
                              } else {
                                setThreeDots(index);
                              }
                            }}
                            className={`${
                              threeDots === index
                                ? "text-graidient_bottom"
                                : "text-gray-600"
                            }`}
                          />
                          {threeDots === index && (
                            <div
                              ref={blockRef}
                              className="absolute top-5 -left-20 flex flex-col z-50 bg-white px-2 py-2 w-40 items-center justify-center shadow-md shadow-gray-300"
                            >
                              <p
                                onClick={() => {
                                  setRename(proposal._id);
                                  setRenameV(proposal.proposalName);
                                  setThreeDots(null);
                                }}
                                className="py-1 px-1 w-full hover:bg-gray-100"
                              >
                                Rename
                              </p>
                              <p
                                onClick={() => {
                                  setMove(proposal._id);
                                  setThreeDots(null);
                                }}
                                className="py-1 px-1 w-full hover:bg-gray-100"
                              >
                                Move To
                              </p>
                              <p
                                onClick={() => {
                                  handleDelete(proposal._id);
                                  setThreeDots(null);
                                }}
                                className="py-1 px-1 w-full hover:bg-gray-100"
                              >
                                Delete
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default DashboardFirst;
