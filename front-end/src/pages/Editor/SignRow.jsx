import React, { useContext } from "react";
import { FaEdit } from "react-icons/fa";
import { StateManageContext } from "../../context/StateManageContext";

const SignRow = ({ index, rows, content, onChange, selected }) => {
  const { setSignEdit, setSign } = useContext(StateManageContext);
  return (
    <div className="w-full h-[150px] grid grid-cols-3 gap-0 items-center text-center p-3  rounded-lg mt-10 relative ">
      {selected !== null && (
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
      <div>
        <h3 className="text-lg  text-active_text text-left px-3">Signatures</h3>
      </div>

      {/* Middle Column */}
      <div className="border-l border-y border-border_clr h-32 flex flex-col items-center justify-center">
        <div className="h-20 flex items-end pb-4 justify-center">
          {content[0].signed ? (
            <p className="text-lg  text-active_text h-20 flex items-end pb-4 justify-center">
              {content[0]?.proposedName}
            </p>
          ) : (
            <button
              onClick={() => {
                const updatedData = [...content];
                updatedData[0].signed = true;
                onChange(updatedData);
              }}
              className="px-6 py-2  text-white rounded-md bg-graidient_bottom "
            >
              Sign Proposal
            </button>
          )}
        </div>
        <div className="border-t border-border_clr w-full  "></div>
        <h3 className="text-non_active_text h-12 flex items-center justify-center">
          {content[0]?.proposedName}
        </h3>
      </div>

      {/* Right Column */}
      <div className="border border-border_clr h-32 flex flex-col items-center justify-center">
        <div className="h-20 flex items-end pb-4 justify-center">
          {content[1].signed ? (
            <p className="text-lg  text-active_text h-20 flex items-end pb-4 justify-center">
              {content[1]?.acceptedName}
            </p>
          ) : (
            <button
              onClick={() => {
                const updatedData = [...content];
                updatedData[1].signed = true;
                onChange(updatedData);
              }}
              className="px-6 py-2  text-white rounded-md bg-graidient_bottom  "
            >
              Sign Proposal
            </button>
          )}
        </div>
        <div className="border-t border-border_clr w-full  "></div>
        <h3 className="text-non_active_text h-12 flex items-center justify-center">
          {content[1]?.acceptedName}
        </h3>
      </div>
    </div>
  );
};

export default SignRow;
