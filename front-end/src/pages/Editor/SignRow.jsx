import React, { useContext, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { StateManageContext } from "../../context/StateManageContext";

const SignRow = ({
  index,
  rows,
  content,
  onChange,
  selected,
  preview,
  view,
}) => {
  const { setSignEdit, setSign } = useContext(StateManageContext);
  const [showSignModal, setShowSignModal] = useState(false);
  const [clientName, setClientName] = useState("");

  const handleSignClient = () => {
    if (clientName.trim()) {
      const updatedData = [...content];
      updatedData[1].acceptedName = clientName;
      updatedData[1].signed = true;
      onChange(updatedData);
      setShowSignModal(false);
      setClientName("");
    }
  };

  return (
    <div
      className={`w-full ${view === false ? "h-auto" : "h-[150px]"} ${
        view === false ? "grid-cols-1" : "grid-cols-3"
      } grid gap-0 items-center text-center p-3 rounded-lg mt-10 relative`}
    >
      {selected !== null && preview !== true && (
        <button
          onClick={() => {
            setSign(true);
            setSignEdit(index);
          }}
          className="absolute top-0 right-4 hover:text-graidient_bottom"
        >
          <FaEdit />
        </button>
      )}

      {/* Left Column */}
      {view !== false && (
        <div>
          <h3 className="text-lg  text-active_text text-left px-3">
            Signatures
          </h3>
        </div>
      )}

      {/* Mobile: Title at top */}
      {view === false && (
        <div className="mb-2">
          <h3 className="text-sm font-semibold text-active_text text-left px-3">
            Signatures
          </h3>
        </div>
      )}

      {/* Middle Column */}
      <div
        className={`border ${
          view === false ? "border" : "border-l border-y"
        } border-border_clr ${
          view === false ? "h-auto py-4 mb-3" : "h-32"
        } flex flex-col items-center justify-center ${
          preview && content[1].signed ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        <div
          className={`${
            view === false ? "h-auto py-2" : "h-20 pb-4"
          } flex items-end justify-center`}
        >
          {content[0].signed ? (
            <p
              className={`${
                view === false ? "text-sm" : "text-lg"
              } text-active_text ${
                view === false ? "h-auto py-2" : "h-20 pb-4"
              } flex items-end justify-center`}
            >
              {content[0]?.proposedName}
            </p>
          ) : (
            <button
              onClick={() => {
                if (!(preview && content[1].signed)) {
                  const updatedData = [...content];
                  updatedData[0].signed = true;
                  onChange(updatedData);
                }
              }}
              disabled={preview && content[1].signed}
              className={`${
                view === false ? "px-4 py-1.5 text-xs" : "px-6 py-2"
              } text-white rounded-md bg-graidient_bottom ${
                preview && content[1].signed
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              Sign Proposal
            </button>
          )}
        </div>
        <div className="border-t border-border_clr w-full  "></div>
        <h3
          className={`text-non_active_text ${
            view === false ? "h-8 text-xs" : "h-12"
          } flex items-center justify-center`}
        >
          {content[0]?.proposedName}
        </h3>
      </div>

      {/* Right Column */}
      <div
        className={`border border-border_clr ${
          view === false ? "h-auto py-4" : "h-32"
        } flex flex-col items-center justify-center ${
          preview && content[1].signed ? "opacity-50" : ""
        }`}
      >
        <div
          className={`${
            view === false ? "h-auto py-2" : "h-20 pb-4"
          } flex items-end justify-center`}
        >
          {content[1].signed && content[1].acceptedName ? (
            <div className="flex flex-col items-center">
              <p
                className={`${
                  view === false ? "text-sm" : "text-lg"
                } text-active_text ${
                  view === false ? "h-auto py-2" : "h-20 pb-4"
                } flex items-end justify-center`}
              >
                {content[1]?.acceptedName}
              </p>
              {preview && (
                <p
                  className={`${
                    view === false ? "text-[10px]" : "text-xs"
                  } text-green-600 font-semibold`}
                >
                  ✓ Signed
                </p>
              )}
            </div>
          ) : preview && !content[1].acceptedName && !content[1].signed ? (
            <button
              onClick={() => setShowSignModal(true)}
              className={`${
                view === false ? "px-4 py-1.5 text-xs" : "px-6 py-2"
              } text-white rounded-md bg-graidient_bottom`}
            >
              Sign
            </button>
          ) : !content[1].signed ? (
            <button
              onClick={() => {
                const updatedData = [...content];
                updatedData[1].signed = true;
                onChange(updatedData);
              }}
              className={`${
                view === false ? "px-4 py-1.5 text-xs" : "px-6 py-2"
              } text-white rounded-md bg-graidient_bottom`}
            >
              Sign Proposal
            </button>
          ) : (
            <p
              className={`${
                view === false ? "text-xs" : "text-sm"
              } text-gray-500`}
            >
              {preview ? "Signed" : content[1]?.acceptedName}
            </p>
          )}
        </div>
        <div className="border-t border-border_clr w-full  "></div>
        <h3
          className={`text-non_active_text ${
            view === false ? "h-8 text-xs" : "h-12"
          } flex items-center justify-center`}
        >
          {content[1]?.acceptedName ||
            (preview ? "Client Name" : content[1]?.acceptedName)}
        </h3>
      </div>

      {/* Sign Modal - Only shows in preview mode and when not signed */}
      {showSignModal && preview && !content[1].signed && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[1000]">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
            <div className="mb-6 text-center">
              <h2 className="text-lg font-bold text-active_text mb-2">
                Do you want to sign this?
              </h2>
              <p className="text-sm text-non_active_text">
                Please enter your name to electronically sign this proposal.
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-active_text mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg text-active_text shadow-sm outline-none text-sm hover:border-active_text focus:border-active_text"
                placeholder="Enter your full name"
                autoFocus
              />
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setShowSignModal(false);
                  setClientName("");
                }}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-300 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSignClient}
                disabled={!clientName.trim()}
                className="px-4 py-2 bg-graidient_bottom text-white rounded-md hover:bg-gradient_darker text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Sign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignRow;
