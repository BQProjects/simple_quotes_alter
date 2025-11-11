import React, { useContext, useEffect, useState, useRef } from "react";
import Dashboard from "./Dashboard";
import { DatabaseContext } from "../../context/DatabaseContext";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import { LiaEditSolid } from "react-icons/lia";
import { FaRegCopy } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdRestorePage } from "react-icons/md";
import toast from "react-hot-toast";

const DashboardRecycle = () => {
  const [proposals, setProposals] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { databaseUrl } = useContext(DatabaseContext);
  const { user } = useContext(UserContext);
  const [skip, setSkip] = useState(0);
  const limit = 20;
  const scrollContainerRef = useRef(null);

  const getRecycle = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${databaseUrl}/api/workspace/getrecyclebin`,
        {
          params: { user_id: user.id, skip, limit },
        }
      );
      setProposals(res.data.proposals || []);

      console.log("Recycle Bin Data:", res.data.proposals);

      // Check if initial load has less data than limit
      if (!res.data.proposals || res.data.proposals.length < limit) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching workspaces:", error);
      setProposals([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRecycle();
  }, []);

  const DeletePermently = async (id) => {
    try {
      const res = await axios.post(
        `${databaseUrl}/api/workspace/recycleDelete`,
        { proposal_id: id }
      );
      setProposals(proposals.filter((item) => item._id !== id));
      toast.success("Proposal has been deleted permenantly");
    } catch (error) {
      console.error("Error fetching workspaces:", error);
    }
  };

  const handleRestore = async (id) => {
    try {
      const res = await axios.post(`${databaseUrl}/api/workspace/restore`, {
        proposal_id: id,
      });
      setProposals(proposals.filter((item) => item._id !== id));
      toast.success("Proposal restored successfully");
    } catch (error) {
      console.error("Error fetching workspaces:", error);
    }
  };

  const handleLoad = async () => {
    if (loadingMore || !hasMore) return;

    try {
      setLoadingMore(true);
      const newSkip = skip + limit;

      const res = await axios.get(
        `${databaseUrl}/api/workspace/getrecyclebin`,
        {
          params: { skip: newSkip, limit, user_id: user.id },
        }
      );

      if (res.data.proposals && res.data.proposals.length > 0) {
        setProposals((prev) => [...prev, ...res.data.proposals]);
        setSkip(newSkip);

        // Check if we received less data than requested
        if (res.data.proposals.length < limit) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching more recycle bin data:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  const handleScroll = (e) => {
    const element = e.target;
    const bottom =
      Math.abs(
        element.scrollHeight - element.clientHeight - element.scrollTop
      ) < 1;

    if (bottom && !loadingMore && hasMore) {
      handleLoad();
    }
  };

  return (
    <>
      <div className="w-[100%] bg-gray-100 min-h-[90vh]">
        <div className="relative w-full h-[88vh] bg-white px-10 pt-10 flex flex-col ">
          <div className="text-xl text-gray-600 mb-6 flex items-center justify-start gap-3">
            <RiDeleteBin5Line />
            <h1>Recycle Bin</h1>
          </div>
          {/* <div className="mt-3 text-gray-500 text-lg mb-2">
            <h1>Proposals</h1>
          </div> */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="h-[74vh] overflow-y-auto scrollbar-hide"
          >
            {loading ? (
              <table className="w-full table-auto">
                <thead className="h-12 bg-gray-100 text-left text-gray-600 font-normal text-sm sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-2 w-[70%]">Proposal Name</th>
                    <th className="w-[15%]">Workspace Name</th>
                    <th className="pl-10 py-2 w-[15%]">Quick Action</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 6 }).map((_, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 mt-1 h-12"
                    >
                      <td className="px-4 py-3">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                      </td>
                      <td className="px-1">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
                      </td>
                      <td>
                        <div className="flex gap-2 ml-14">
                          <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                          <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : proposals &&
              proposals.length > 0 &&
              proposals.some(
                (item) =>
                  item?.proposals?.[0] && item?.proposals?.[0]?.workspaces?.[0]
              ) ? (
              <>
                <table className="w-full table-auto">
                  <thead className="h-12 bg-gray-100 text-left text-gray-600 font-normal text-sm sticky top-0 z-10">
                    <tr>
                      <th className="px-4 py-2 w-[70%]">Proposal Name</th>
                      <th className="w-[15%]">Workspace Name</th>
                      <th className="pl-10 py-2 w-[15%]">Quick Action</th>
                    </tr>
                  </thead>
                  <tbody className="">
                    {proposals?.map((item, index) => {
                      const proposal = item?.proposals?.[0];
                      const workspace = proposal?.workspaces?.[0];

                      if (!proposal || !workspace) return null;

                      return (
                        <tr
                          className="border-b border-gray-200 mt-1 text-gray-600 hover:bg-gray-50 cursor-pointer h-12"
                          key={index}
                        >
                          <td className="px-4 flex flex-col items-start justify-start py-3 text-left">
                            <span className="w-[90%] overflow-hidden text-ellipsis block ">
                              {proposal.proposalName}
                            </span>
                          </td>
                          <td className="px-1">{workspace.workspaceName}</td>
                          <td>
                            <div className="flex flex-row gap-2 text-md text-gray-500 ml-14 text-lg">
                              <MdRestorePage
                                onClick={() => handleRestore(item._id)}
                                className="cursor-pointer hover:text-green-600 transition-colors"
                                title="Restore Proposal"
                              />
                              <RiDeleteBin5Line
                                onClick={() => DeletePermently(item._id)}
                                className="cursor-pointer hover:text-red-600 transition-colors"
                                title="Delete Permanently"
                              />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {loadingMore && (
                  <div className="flex justify-center py-4">
                    <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                  </div>
                )}
                {!hasMore && !loadingMore && (
                  <div className="flex justify-center py-6">
                    <p className="text-gray-500 text-sm">
                      No more data to load
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 px-4">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <RiDeleteBin5Line className="text-4xl text-gray-400" />
                </div>
                <h2 className="text-xl font-medium text-gray-700 mb-2">
                  No Deleted Proposals
                </h2>
                <p className="text-gray-500 text-center max-w-md">
                  Your recycle bin is empty. Deleted proposals will appear here
                  and can be restored or permanently deleted.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardRecycle;
