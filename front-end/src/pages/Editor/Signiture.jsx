import React, { useContext, useState } from "react";
import { StateManageContext } from "../../context/StateManageContext";
import { UserContext } from "../../context/UserContext";

const Signature = ({ addSign, rows, setRows }) => {
  const { setSign, signEdit, setSignEdit } = useContext(StateManageContext);
  const { user } = useContext(UserContext);
  const [temp, setTemp] = useState(
    signEdit !== null
      ? rows[signEdit].content
      : [
          {
            proposedName: user.username,
            signed: true,
          },
          {
            acceptedName: "",
            signed: false,
          },
        ]
  );

  const handleInputChange = (index, key, value) => {
    const updatedTemp = [...temp];
    updatedTemp[index][key] = value;
    setTemp(updatedTemp);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center p-4 z-[1000] be-vietnam-pro-regular ">
      {/* Popup Content */}
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg transition-all transform scale-105  duration-500 ease-out opacity-15 animate-fadeInforRow ">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-lg font-bold text-active_text">
            Add Signature Details
          </h2>
          <p className="text-xs text-non_active_text">
            Provide the names for proposal and acceptance.
          </p>
        </div>

        {/* Input Fields */}
        <div className="space-y-2">
          <div>
            <label
              htmlFor="proposedName"
              className="block text-sm font-normal text-active_text"
            >
              Your Name
            </label>
            <input
              type="text"
              id="proposedName"
              value={temp[0].proposedName}
              onChange={(e) =>
                handleInputChange(0, "proposedName", e.target.value)
              }
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg text-active_text shadow-sm outline-none text-sm hover:border-active_text focus:border-active_text"
              placeholder="E.g: Jhon"
            />
            <p className="text-[11px] p-2 text-active_text">
              By clicking <span className="text-graidient_bottom"> Save</span>,
              you agree to electronically sign this proposal and accept its
              terms. This signature is legally binding, just like a handwritten
              one.
            </p>
          </div>

          <div>
            <label
              htmlFor="acceptedName"
              className="block text-sm  text-active_text"
            >
              Client's Name
            </label>
            <input
              type="text"
              id="acceptedName"
              value={temp[1].acceptedName}
              onChange={(e) =>
                handleInputChange(1, "acceptedName", e.target.value)
              }
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg text-active_text shadow-sm outline-none text-sm hover:border-active_text focus:border-active_text"
              placeholder="E.g: Jhon"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex justify-end gap-4">
          <button
            onClick={() => {
              setSign(false);
              setSignEdit(null);
            }}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-300 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (signEdit !== null) {
                const updated = [...rows];
                updated[signEdit].content = temp;
                setRows(updated);
                setSignEdit(null);
              } else {
                addSign(temp);
              }
              setSign(false);
            }}
            className="px-4 py-2 bg-graidient_bottom text-white rounded-md hover:bg-gradient_darker text-sm"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signature;
