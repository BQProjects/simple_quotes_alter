import React, { useContext, useEffect, useRef, useState } from "react";
import Dashboard from "./Dashboard";
import { UserContext } from "../../context/UserContext";
import { DatabaseContext } from "../../context/DatabaseContext";
import axios from "axios";
import { useAsyncError, useNavigate } from "react-router-dom";
import { FiEye } from "react-icons/fi";
import { GoLink } from "react-icons/go";
import { FaRegCopy } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import { SiSimpleanalytics } from "react-icons/si";
import { IoMdLock } from "react-icons/io";
import { FaRegFileLines } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { FaRegFolder } from "react-icons/fa";
import toast from "react-hot-toast";
import { StateManageContext } from "../../context/StateManageContext";
import { RiArrowUpDownLine } from "react-icons/ri";

const DashboardProposals = () => {
  const { user } = useContext(UserContext);
  const { databaseUrl } = useContext(DatabaseContext);
  const {
    workspaces,
    setWorkspaces,
    proposals,
    setProposals,
    sortP,
    setSortP,
  } = useContext(StateManageContext);
  const [selLocked, setSelLoacked] = useState([]);
  const [threeDots, setThreeDots] = useState(null);
  const [renameV, setRenameV] = useState("");
  const [rename, setRename] = useState(null);
  const popUpRef = useRef();
  const popRef = useRef();
  const [move, setMove] = useState(null);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  const handleMove = async () => {
    try {
      const res = await axios.post(`${databaseUrl}/api/workspace/move`, {
        id: move,
        workspace_id: selected,
      });
      setProposals(proposals.filter((item) => item._id !== id));
      toast.success("Proposal has been moved to another workspace");
    } catch (error) {
      console.log(error);
    } finally {
      setSearch("");
      setMove(null);
      setSelected(null);
      setThreeDots(null);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.post(`${databaseUrl}/api/workspace/delete`, {
        id: id,
        user_id: user.id,
      });
      setProposals(proposals.filter((item) => item._id !== id));
      toast.success("Proposal has been deleted");
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

  const handleRename = async (id, index) => {
    try {
      const res = await axios.post(`${databaseUrl}/api/workspace/rename`, {
        id: id,
        name: renameV,
      });
      const temp = [...proposals];
      temp[index].proposalName = renameV;
      setProposals(temp);
    } catch (error) {
      console.log(error);
    } finally {
      setRename(null);
      setRenameV("");
    }
  };

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

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

  const handleClickOutsideBlock = (event) => {
    if (
      popRef.current &&
      !popRef.current.contains(event.target) &&
      popUpRef.current &&
      !popUpRef.current.contains(event.target)
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
  const [openSort, setOpenSort] = useState(false);
  const sortButtonRef = useRef();
  const sortRef = useRef();
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
      <div className="w-full bg-white min-h-[85vh] px-10 pt-10 shadow-lg shadow-gray-300 ">
        <div className="flex items-center justify-start mb-6 gap-2 text-xl text-gray-600">
          <FaRegFileLines className="text-gray-600" />
          <h2>Proposals</h2>
          <span className="relative ml-1" ref={sortButtonRef}>
            <RiArrowUpDownLine onClick={() => setOpenSort(true)} />
            {openSort === true && (
              <div
                ref={sortRef}
                className="absolute -top-10 left-7 z-50 flex flex-col p-4 text-xs w-40 bg-white gap-3 shadow-md shadow-gray-300 rounded-md"
              >
                <button
                  onClick={() => setSortP("default")}
                  className="w-full flex items-center justify-center gap-3"
                >
                  All Proposals{" "}
                  <span> {sortP === "default" && <FaCheck />} </span>
                </button>
                <button
                  onClick={() => setSortP("alp")}
                  className="w-full flex items-center justify-center gap-3"
                >
                  Alphabetical <span> {sortP === "alp" && <FaCheck />}</span>
                </button>
                <button
                  onClick={() => setSortP("recent")}
                  className="w-full flex items-center justify-center gap-3"
                >
                  Reacently Created
                  <span> {sortP === "recent" && <FaCheck />}</span>
                </button>
              </div>
            )}
          </span>
        </div>
        <div className="w-full h-[75vh] overflow-y-auto scrollbar-hide relative overflow-x-hidden">
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
                      className="px-2 flex flex-col items-start justify-center  text-left pt-1"
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
                            onClick={() => handleRename(proposal._id, index)}
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
                        <div className="relative" ref={popRef}>
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
                          {threeDots !== null && threeDots === index && (
                            <div
                              ref={popUpRef}
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

export default DashboardProposals;
