import React, { useContext, useState } from "react";
import { MdOutlineDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { StateManageContext } from "../../context/StateManageContext";

const PriceTerms = ({ rows, addPriceTerms, setRows }) => {
  const [heading, setHeading] = useState("Cost Module");
  const { setPriceTerms, priceTermsEdit, setPriceTermsEdit } =
    useContext(StateManageContext);

  const [total, setTotal] = useState(null);

  const [temp, setTemp] = useState(
    priceTermsEdit !== null
      ? rows[priceTermsEdit].content
      : [
          {
            deliverable: "",
            percentage: null,
            value: null,
          },
        ]
  );
  const [percentage, setPercentage] = useState(
    priceTermsEdit !== null ? rows[priceTermsEdit].options.percentage : false
  );
  const [value, setValue] = useState(
    priceTermsEdit !== null ? rows[priceTermsEdit].options.value : false
  );
  const [currency, setCurrency] = useState(
    priceTermsEdit !== null ? rows[priceTermsEdit].options.currency : "$"
  );

  const handleAddRow = () => {
    setTemp([
      ...temp,
      {
        deliverable: "",
        percentage: null,
        value: null,
      },
    ]);
  };

  const handleInputChange = (index, key, value) => {
    const updatedTemp = [...temp];
    updatedTemp[index][key] = value;

    if (total == null) {
      setTemp(updatedTemp);
      return;
    }

    if (key === "percentage") {
      const numericPercentage = parseFloat(value) || 0;
      const calculatedValue = (numericPercentage / 100) * total;
      updatedTemp[index]["value"] = parseFloat(calculatedValue.toFixed(2));
    } else {
      const numericValue = parseFloat(value) || 0;
      const calculatedPercentage =
        total !== 0 ? (numericValue / total) * 100 : 0;
      updatedTemp[index]["percentage"] = parseFloat(
        calculatedPercentage.toFixed(2)
      );
    }

    setTemp(updatedTemp);
  };

  const [dropdown, setDropdown] = useState(null);
  const list = [
    // "UI/UX Design",
    // "Devlopment",
    // "Production",
    // "Full Stack",
    // "Manifacturing",
    // "Quality",
    // "Meterial",
    "Advance",
    "Milestone 1",
    "Milestone 2",
    "Milestone 3",
    "Milestone 4",
    "Milestone 5",
    "Full payment",
    "Devlopment phase",
    "Design phase",
  ];

  const handleDeleteRow = (index) => {
    setTemp(temp.filter((_, i) => i !== index));
  };

  const calculateTotalAmount = () => {
    return temp.reduce((total, row) => total + (row.amount || 0), 0);
  };

  const calculateDiscountedAmount = () => {
    const total = calculateTotalAmount();
    return total - total * 0.1 - 10; // Subtract 10% discount
  };

  const width =
    percentage && value ? "55%" : percentage || value ? "70%" : "90%";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center p-4 z-[1000]">
      <div className="bg-white rounded-lg shadow-lg  max-w-3xl w-full transition-all transform scale-105  duration-500 ease-out opacity-15 animate-fadeInforRow  ">
        <div className="w-full flex flex-col items-center justify-center mt-4 border-b-[1px] border-border_clr">
          <h1 className="text-md font-bold text-active_text">
            Add Price Terms
          </h1>
          <p className="text-sm text-non_active_text mb-4">
            Drag & Set your cost for your proposal
          </p>
        </div>
        <div className="mt-2 border-b-[1px] border-border_clr ">
          {/* Table */}
          <div className=" w-full ">
            {/* <div className="w-full px-6 mt-1 mb-2 ">
              <input
                type="text"
                placeholder="Title"
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
                className=" py-1 outline-none focus:border-b focus:border-gray-300 text-sm"
              />
            </div> */}
            <div className="flex items-center pb-3 pl-4 border-b-[1px] border-border_clr mb-2 gap-4">
              {/* Currency Dropdown */}

              <div className="flex items-center px-2 py-1 rounded-md  gap-2">
                <label
                  htmlFor="currency"
                  className="text-sm font-semibold  text-active_text "
                >
                  Currency:
                </label>
                <select
                  id="currency"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="border bg-backgrounds border-gray-100 rounded px-2 py-1 outline-none text-active_text text-sm cursor-pointer hover:bg-highlight "
                >
                  <option value="$">USD ($)</option>
                  <option value="€">EUR (€)</option>
                  <option value="£">GBP (£)</option>
                  <option value="₹">INR (₹)</option>
                </select>
              </div>

              {/* Checkboxes */}
              <div className="flex items-center gap-4 ">
                <label className="flex bg-backgrounds px-2 py-1 rounded items-center text-sm hover:bg-highlight cursor-pointer text-active_text ">
                  <input
                    type="checkbox"
                    checked={percentage}
                    onChange={() => setPercentage(!percentage)}
                    className="mr-2 p-1 accent-graidient_bottom"
                  />
                  Percentage
                </label>
                <label className="flex bg-backgrounds px-2 py-1 rounded items-center text-sm text-active_text hover:bg-highlight cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() => setValue(!value)}
                    className="mr-2 p-1 accent-graidient_bottom"
                  />
                  Value
                </label>
                <div className="flex justify-center items-center text-sm gap-2 ml-[170px]">
                  <label className="text-active_text font-semibold">
                    Total:{" "}
                  </label>
                  <input
                    type="number"
                    placeholder="Total"
                    min={0}
                    value={total}
                    onChange={(e) => setTotal(e.target.value)}
                    className="w-24 border border-gray-300 bg-backgrounds rounded px-2 py-1 font-normal text-sm outline-none no-spinner hover:border-active_text focus:border-active_text"
                  />
                </div>
              </div>
            </div>
            <table className="w-[96%] ml-4 text-xs border-collapse rounded-md  mt-3 block min-h-[150px] max-h-[250px] overflow-y-auto ">
              <thead className="sticky top-0  z-[10000] bg-white ">
                <tr>
                  <th className="  py-2  text-center  w-7"></th>
                  <th
                    className={` px-2 py-2 w-[${width}] text-left text-sm font-normal`}
                  >
                    Services/Products
                  </th>
                  {percentage && (
                    <th className="  py-2 text-center text-sm font-normal ">
                      Percentage
                    </th>
                  )}
                  {value && (
                    <th className=" px-2 py-2 text-center text-sm font-normal">
                      Value
                    </th>
                  )}

                  <th className="  text-center"></th>
                </tr>
              </thead>
              <tbody>
                {temp.map((row, index) => (
                  <tr key={index} className="  bg-white  ">
                    <td className="px-4"></td>
                    <td
                      className={` pr-8 px-2 py-1 w-[${width}] relative overflow-visible`}
                    >
                      <input
                        type="text"
                        value={row.deliverable}
                        onFocus={() => setDropdown(index)}
                        onBlur={() => setDropdown(null)} // Delay closing
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "deliverable",
                            e.target.value
                          )
                        }
                        className="w-full border-[1px] border-gray-300 bg-backgrounds rounded px-2 py-2 outline-none hover:border-active_text focus:border-active_text"
                        placeholder="Deliverable"
                      />
                      {dropdown !== null && index === dropdown && (
                        <div className="absolute top-[80%] z-50  left-2 w-[90%] bg-white border border-gray-300 rounded-md shadow-md max-h-16 overflow-y-auto scrollbar-thin">
                          {list
                            .filter((item) =>
                              item
                                .toLowerCase()
                                .includes(temp[index].deliverable.toLowerCase())
                            )
                            .map((item, i) => (
                              <div
                                key={i}
                                onMouseDown={() =>
                                  handleInputChange(index, "deliverable", item)
                                }
                                className="p-2 hover:bg-gray-100 cursor-pointer"
                              >
                                {item}
                              </div>
                            ))}
                        </div>
                      )}
                    </td>

                    {percentage && (
                      <td className=" px-2 py-2 w-32 ">
                        <input
                          type="number"
                          value={row.percentage}
                          placeholder="Percentage"
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              "percentage",
                              parseFloat(e.target.value)
                            )
                          }
                          min={0}
                          max={100}
                          className="w-full border-[1px] border-gray-300 bg-backgrounds rounded px-2 py-2 outline-none no-spinner hover:border-active_text focus:border-active_text text-center"
                        />
                      </td>
                    )}
                    {value && (
                      <td className=" px-2 py-2 flex flex-row items-center justify-center gap-1 font-bold w-32  text-md">
                        {/* {currency} */}
                        <input
                          type="number"
                          placeholder="Value "
                          min={0}
                          value={row.value}
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              "value",
                              parseInt(e.target.value)
                            )
                          }
                          className="w-full border-[1px] border-gray-300 bg-backgrounds rounded px-2 py-2 font-normal text-xs outline-none no-spinner hover:border-active_text focus:border-active_text text-center"
                        />
                      </td>
                    )}

                    <td className=" px-2 py-2 text-center">
                      <button
                        onClick={() => handleDeleteRow(index)}
                        className="px-2 py-2 rounded-md text-gray-500 hover:text-graidient_bottom"
                      >
                        <MdOutlineDelete className="text-lg" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="w-[95%] flex text-sm items-end justify-end  ml-2">
              <button
                onClick={handleAddRow}
                className=" flex felx-row items-center justify-center gap-2 px-4 py-2 text-graidient_bottom hover:text-gradient_darker   rounded-md mb-2 "
              >
                <FaPlus className="text-md  rounded-sm font-bold bg-graidient_bottom text-white p-[2px]" />
                Add More
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 mb-5 mr-5 flex justify-end gap-4">
          <button
            onClick={() => {
              setPriceTermsEdit(null);
              setPriceTerms(false);
            }}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-300 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (priceTermsEdit !== null) {
                const updated = [...rows];
                updated[priceTermsEdit].content = temp;
                updated[priceTermsEdit].options = {
                  percentage: percentage,
                  value: value,
                  currency: currency,
                };
                setRows(updated);
              } else {
                addPriceTerms(temp, {
                  percentage: percentage,
                  value: value,
                  currency: currency,
                });
              }
              setPriceTermsEdit(null);
              setPriceTerms(false);
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

export default PriceTerms;
