import React, { useContext, useEffect, useState } from "react";
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
  const [proposals, setProposals] = useState([]);
  const { databaseUrl } = useContext(DatabaseContext);
  const { user } = useContext(UserContext);
  const getRecycle = async () => {
    try {
      const res = await axios.get(`${databaseUrl}/api/workspace/recycle`, {
        params: { user_id: user.id },
      });
      setProposals(res.data);
    } catch (error) {
      console.error("Error fetching workspaces:", error);
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
      toast.success("Proposal has been deleted perminently");
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

  return (
    <>
      <div className="w-full bg-white min-h-[85vh] px-10 pt-6 shadow-lg shadow-gray-300 ">
        <div className="text-xl text-gray-500 flex items-center justify-start gap-3">
          <RiDeleteBin5Line />
          <h1>Recycle Bin</h1>
        </div>
        <div className="mt-3 text-gray-500 text-lg mb-2">
          <h1>Proposals</h1>
        </div>
        <div>
          {proposals.length !== 0 ? (
            <table className="auto-table w-full ">
              <thead className="h-12 bg-gray-200 text-left text-gray-600 font-normal text-sm sticky top-0">
                <tr>
                  <th className="rounded-l-xl px-4 py-2 w-[40%]">
                    Proposal Name
                  </th>
                  <th>Workspace Name</th>
                  <th className="rounded-r-xl pl-10 py-2 w-[25%]">
                    Quick Action
                  </th>
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
                        <span className="w-[90%] overflow-hidden whitespace-nowrap text-ellipsis block ">
                          {proposal.proposalName}
                        </span>
                      </td>
                      <td className=" pr-3">{workspace.workspaceName}</td>
                      <td>
                        <div className="flex flex-row gap-2 text-md text-gray-500 ml-14 text-lg">
                          <MdRestorePage
                            onClick={() => handleRestore(item._id)}
                          />
                          <RiDeleteBin5Line
                            onClick={() => DeletePermently(item._id)}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <h1>No Deleted Proposals</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardRecycle;
