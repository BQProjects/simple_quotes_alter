import React, { useContext, useState, useEffect } from "react";
import { StateManageContext } from "../../context/StateManageContext";
import { UserContext } from "../../context/UserContext";
import { DatabaseContext } from "../../context/DatabaseContext";
import { FaRegFolder } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";

const NewProposal = ({ handleCreateNewProposal, setPopup }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const { setNewProposal, workspaces, setWorkspaces } =
    useContext(StateManageContext);
  const { user } = useContext(UserContext);
  const { databaseUrl } = useContext(DatabaseContext);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  const handleOnclick = () => {
    if (selected === null) {
      toast.error("Please select a workpsace to continue");
      setError(true);
    } else {
      handleCreateNewProposal(selected);
    }
  };

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-40 flex justify-center items-center z-50">
      {/* Popup Content */}
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-lg transition-all transform scale-105 be-vietnam-pro-regular">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-xl font-semibold text-gray-700">
            Select Workspace for New Proposal
          </h2>
          <p className="text-sm text-gray-500">
            Organize your proposals by workspace. Select one to continue
          </p>
        </div>

        {/* Input Fields */}
        <div className="space-y-3">
          {/* <div>
            <label
              htmlFor="proposedName"
              className="block text-sm font-medium text-gray-600"
            >
              Enter Propoals Name
            </label>
            <input
              type="text"
              id="Proposal Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="mt-2 w-full px-2 py-2 border border-gray-200 rounded-lg text-gray-800 shadow-sm 0"
              placeholder="Enter Proposal Name"
            />
          </div> */}
          <div className="mt-3">
            <input
              type="text"
              className="w-full py-2 px-2 outline-none border border-gray-200 rounded-lg "
              placeholder="Search for Workspace"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="h-[35vh] w-full overflow-auto">
              {(() => {
                const filteredWorkspaces = workspaces?.filter((item) =>
                  item.workspaceName
                    .toLowerCase()
                    .includes(search?.toLowerCase() || "")
                );

                if (!filteredWorkspaces || filteredWorkspaces.length === 0) {
                  return (
                    <div className="text-gray-500 text-sm mt-4 flex justify-center">
                      No workspace found
                    </div>
                  );
                }

                return filteredWorkspaces.map((item) => (
                  <div
                    onClick={() => setSelected(item._id)}
                    key={item._id}
                    className={` mt-3 mr-3 placeholder:w-[100%] h-14 px-3 py-2 border ${
                      selected === item._id ? "bg-gray-200" : "border-gray-100"
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
                      <p className="text-xs text-gray-400">
                        {item.proposals.length} Proposals
                      </p>
                    </div>
                  </div>
                ));
              })()}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-5 flex justify-end gap-4">
          <button
            onClick={() => setNewProposal(false)}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-300 hover:shadow-md transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleOnclick}
            className="px-4 py-2 bg-graidient_bottom text-white rounded-lg font-medium  hover:shadow-md transition-all"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewProposal;
