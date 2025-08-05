import React, { useContext, useState, useRef } from "react";
import { MdOutlineDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { StateManageContext } from "../../context/StateManageContext";

const CostModule = ({ addCostModule, rows, setRows }) => {
  const scrollableDivRef = useRef(null);
  const [heading, setHeading] = useState("Cost Module");

  const { setCostModeule, setCostMouleEdit, costModuleEdit } =
    useContext(StateManageContext);
  const [temp, setTemp] = useState(
    costModuleEdit !== null
      ? rows[costModuleEdit].content
      : [
          {
            deliverable: "",
            price: null,
            discount: null,
            quantity: null,
            paymentDuration: "Monthly",
            amount: null,
          },
        ]
  );
  const [discount, setDiscount] = useState(
    costModuleEdit !== null ? rows[costModuleEdit].options.discount : false
  );
  const [quantity, setQuantity] = useState(
    costModuleEdit !== null ? rows[costModuleEdit].options.quantity : false
  );
  const [dropdown, setDropdown] = useState(null);
  const list = [
    "UI/UX Design",
    "Devlopment",
    "Production",
    "Full Stack",
    "Manifacturing",
    "Quality",
    "Meterial",
  ];
  const [tax, setTax] = useState(
    costModuleEdit !== null ? rows[costModuleEdit].options.tax : false
  );
  const [currency, setCurrency] = useState(
    costModuleEdit !== null ? rows[costModuleEdit].options.discount : "$"
  );
  const [values, setvalues] = useState({
    discount:
      costModuleEdit !== null ? rows[costModuleEdit].values.discount : null,
    tax: costModuleEdit !== null ? rows[costModuleEdit].values.tax : null,
  });

  const handleAddRow = () => {
    setTemp([
      ...temp,
      {
        deliverable: "",
        price: null,
        quantity: null,
        amount: null,
      },
    ]);
    const div = scrollableDivRef.current;
    if (div) {
      div.scrollTop = div.scrollHeight; // Scroll to bottom
    }
  };

  const handleInputChange = (index, key, value) => {
    const updatedTemp = [...temp];
    updatedTemp[index][key] = value;

    if (key === "price" || key === "quantity" || key === "discount") {
      const price = updatedTemp[index].price || 0;
      const quantity = updatedTemp[index].quantity || 1;
      const discount = updatedTemp[index].discount || 0;
      updatedTemp[index].amount =
        price * quantity - (price * quantity * discount) / 100;
    }

    setTemp(updatedTemp);
  };

  const handleDeleteRow = (index) => {
    setTemp(temp.filter((_, i) => i !== index));
  };

  const calculateTotalAmount = () => {
    return temp.reduce((total, row) => total + (row.amount || 0), 0);
  };

  const calculateDiscountedAmount = () => {
    const total = calculateTotalAmount();
    return discount ? total * (values.discount / 100) : 0;
  };
  const calculateTaxAmount = () => {
    const total = calculateTotalAmount();
    return tax ? total * (values.tax / 100) : 0;
  };

  const calculateFinalAmount = () => {
    const total = calculateTotalAmount();
    return total - calculateDiscountedAmount() + calculateTaxAmount();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center p-4 z-[1000] be-vietnam-pro-regular">
      <div className="bg-white rounded-lg shadow-lg   max-w-6xl  w-full transition-all transform   duration-500 ease-out opacity-15 animate-fadeInforRow  ">
        <div className="w-full flex flex-col items-center justify-center mt-4 border-b-[1px] border-border_clr">
          <h1 className="text-md font-bold text-active_text">
            Add Cost Module
          </h1>
          <p className="text-sm text-non_active_text mb-4">
            Fill in the details of products and services for your proposal
          </p>
        </div>
        <div className="flex flex-row  border-b-[1px] border-border_clr  ">
          {/* Table */}
          <div className=" w-[75%]  ">
            {/* <div className="w-full px-6 py-2">
              <input
                type="text"
                placeholder="Title"
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
                className=" py-1 outline-none border-b border-b-300 focus:border-gray-400 text-sm"
              />
            </div> */}
            <div className="flex items-center pb-3 pl-4 border-b-[1px] border-border_clr mb-2 gap-4 relative pt-3">
              {/* Currency Dropdown */}
              <div className="flex items-center px-2 py-1 rounded-md  gap-2">
                <label
                  htmlFor="currency"
                  className="text-sm   text-active_text font-semibold"
                >
                  Currency:
                </label>
                <select
                  id="currency"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="border border-gray-100  bg-backgrounds rounded px-2 py-1 text-sm outline-none cursor-pointer hover:bg-highlight "
                >
                  <option value="$">USD ($)</option>
                  <option value="€">EUR (€)</option>
                  <option value="£">GBP (£)</option>
                  <option value="₹">INR (₹)</option>
                </select>
              </div>

              {/* Checkboxes */}
              <div className="flex items-center gap-4  ">
                <label className="flex bg-backgrounds px-3 py-1.5 rounded items-center text-sm  text-active_text cursor-pointer hover:bg-highlight">
                  <input
                    type="checkbox"
                    checked={discount}
                    onChange={() => setDiscount(!discount)}
                    className="mr-2 p-1 accent-graidient_bottom"
                  />
                  Discount
                </label>
                <label className="flex bg-backgrounds px-3 py-1.5 rounded items-center text-sm  text-active_text cursor-pointer hover:bg-highlight">
                  <input
                    type="checkbox"
                    checked={quantity}
                    onChange={() => setQuantity(!quantity)}
                    className="mr-2 p-1 accent-graidient_bottom"
                  />
                  Quantity
                </label>
                <label className="flex bg-backgrounds px-3 py-1.5 rounded items-center text-sm  text-active_text cursor-pointer hover:bg-highlight">
                  <input
                    type="checkbox"
                    checked={tax}
                    onChange={() => setTax(!tax)}
                    className="mr-2 p-1 accent-graidient_bottom"
                  />
                  Tax
                </label>
                <div className=" absolute top-5 right-4 text-active_text text-sm font-semibold">
                  <p>Total Services: {temp.length}</p>
                </div>
              </div>
            </div>
            <table
              ref={scrollableDivRef}
              className="w-[97%] ml-2 table-auto text-xs border-collapse rounded-md  mt-3 block   h-[230px] overflow-y-scroll pl-3 z-[100000] pb-1"
            >
              <thead
                className="sticky top-0 z-50  "
                style={{
                  backgroundColor: "#FFFFFF",
                }}
              >
                <tr className="w-[102%] z-50 ">
                  <th className=" px-4 py-2 w-80 text-left font-normal text-active_text text-sm">
                    Services/Products
                  </th>
                  {quantity && (
                    <th className=" px-2 py-2 text-center  font-normal  text-active_text text-sm">
                      Unit Price
                    </th>
                  )}

                  {quantity && (
                    <th className=" px-2 py-2 text-center  font-normal  text-active_text text-sm">
                      Quantity
                    </th>
                  )}
                  <th className=" px-2 py-2 text-center  font-normal  text-active_text text-sm">
                    Amount
                  </th>
                  <th className="  text-center"></th>
                </tr>
              </thead>
              <tbody>
                {temp.map((row, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 border-[1px] border-border_clr bg-white h-16 rounded-md   "
                  >
                    <td
                      className={`pr-8 px-2 py-1 relative ${
                        quantity ? "w-[55%]" : "w-[78%]"
                      } ${dropdown === index ? "pb-1" : "pb-1"}`}
                    >
                      <div className="relative">
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
                          className="w-full border-[1px] border-border_clr bg-backgrounds rounded px-2 py-2 outline-none text-active_text hover:border-active_text focus:border-active_text "
                          placeholder="Deliverable"
                        />
                        {dropdown !== null && index === dropdown && (
                          <div className="absolute top-full  left-0 w-full bg-white border border-gray-300 rounded-md shadow-md h-24 overflow-y-auto scrollbar-thin z-[100000]">
                            {list
                              .filter((item) =>
                                item
                                  .toLowerCase()
                                  .includes(
                                    temp[index].deliverable.toLowerCase()
                                  )
                              )
                              .map((item, i) => (
                                <div
                                  key={i}
                                  onMouseDown={() =>
                                    handleInputChange(
                                      index,
                                      "deliverable",
                                      item
                                    )
                                  }
                                  className="p-2 hover:bg-gray-100 cursor-pointer"
                                >
                                  {item}
                                </div>
                              ))}
                          </div>
                        )}
                      </div>
                    </td>
                    {quantity && (
                      <td className=" px-2 py-2 w-[13%]  ">
                        <input
                          type="number"
                          value={row.price}
                          placeholder="Price"
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              "price",
                              parseFloat(e.target.value)
                            )
                          }
                          className="w-full border-[1px] border-border_clr bg-backgrounds  rounded px-2 py-2 no-spinner outline-none text-center hover:border-active_text focus:border-active_text text-active_text "
                        />
                      </td>
                    )}

                    {quantity && (
                      <td className=" px-2 py-2 w-[13%] ">
                        <input
                          type="number"
                          value={row.quantity}
                          placeholder="Qnt"
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              "quantity",
                              parseInt(e.target.value)
                            )
                          }
                          className="w-full border-[1px] border-border_clr bg-backgrounds rounded px-2 py-2 no-spinner outline-none text-center focus:border-active_text hover:border-active_text text-active_text "
                        />
                      </td>
                    )}

                    <td className=" px-2 py-2 w-[15%] ">
                      <input
                        type="number"
                        value={row.amount}
                        placeholder="Amount"
                        onChange={(e) =>
                          handleInputChange(
                            index,
                            "amount",
                            parseInt(e.target.value)
                          )
                        }
                        readOnly={quantity}
                        className="w-full border-[1px] border-border_clr bg-backgrounds rounded px-2 py-2 no-spinner text-right outline-none focus:border-active_text hover:border-active_text text-active_text "
                      />
                    </td>
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
            <div className="w-[97%] flex text-sm items-end justify-end  ml-2 z-30">
              <button
                onClick={handleAddRow}
                className=" flex felx-row items-center justify-center gap-2 px-4 py-2 text-graidient_bottom hover:text-gradient_darker   rounded-md mb-2 "
              >
                <FaPlus className="text-md  rounded-sm font-bold bg-graidient_bottom text-white p-[2px]" />
                Add More
              </button>
            </div>
          </div>

          {/* Total */}
          <div className=" pl-7 pr-6 pt-5 w-[25%] border-l-[1px] border-border_clr ">
            <div className="flex flex-col justify-between ">
              <h3 className="text-sm text-active_text font-semibold">
                Cost Break Down
              </h3>
              <div className="flex flex-col w-full mt-11 gap-2">
                <div className="w-full flex flex-row justify-between">
                  <span className="text-sm text-non_active_text ">Total</span>
                  <span className="text-sm text-active_text">
                    {currency}
                    {calculateTotalAmount().toFixed(2)}
                  </span>
                </div>
                {discount && (
                  <div className="w-full flex flex-row justify-between">
                    <span className="text-sm text-non_active_text flex flex-row items-center justify-start w-14  ">
                      Discount{" "}
                    </span>
                    <div className=" flex flex-row items-center justify-center  rounded-md">
                      <input
                        className=" outline-none w-14 no-spinner px-1 py-1 mr-1 rounded text-center text-xs border border-border_clr text-heightlet_text hover:border-active_text focus:border-active_text "
                        value={values.discount}
                        min={0}
                        max={100}
                        type="number"
                        onChange={(e) =>
                          setvalues({ ...values, discount: e.target.value })
                        }
                      />
                      <span className="text-heightlet_text">%</span>
                    </div>
                    <span className="text-sm text-active_text">
                      {currency}
                      {Math.abs(calculateDiscountedAmount().toFixed(2))}
                    </span>
                  </div>
                )}

                {tax && (
                  <div className="w-full flex flex-row justify-between">
                    <span className="text-sm text-non_active_text flex flex-row items-center justify-start w-14">
                      Tax{" "}
                    </span>
                    <div className=" flex flex-row items-center justify-center  rounded-md">
                      <input
                        className=" outline-none w-14 no-spinner px-1 py-1 mr-1 rounded text-center text-xs border border-border_clr text-heightlet_text hover:border-active_text focus:border-active_text"
                        value={values.tax}
                        type="number"
                        onChange={(e) =>
                          setvalues({ ...values, tax: e.target.value })
                        }
                      />
                      <span className="text-heightlet_text">%</span>
                    </div>
                    <span className="text-sm text-active_text">
                      {currency}
                      {Math.abs(calculateTaxAmount().toFixed(2))}
                    </span>
                  </div>
                )}
                <div>
                  <div className="w-full flex flex-row justify-between">
                    <span className="text-sm text-non_active_text flex justify-start ">
                      Final Amount
                    </span>
                    <span className="text-sm text-active_text">
                      {currency}
                      {calculateFinalAmount().toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 mb-4 mr-6 flex justify-end gap-4">
          <button
            onClick={() => {
              setCostMouleEdit(null);
              setCostModeule(false);
            }}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-300 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (costModuleEdit !== null) {
                const updated = [...rows];
                updated[costModuleEdit].content = temp;
                updated[costModuleEdit].options = {
                  discount: discount,
                  quantity: quantity,
                  currency: currency,
                  tax: tax,
                };
                updated[costModuleEdit].values = values;
                setRows(updated);
              } else {
                addCostModule(
                  temp,
                  {
                    discount: discount,
                    quantity: quantity,
                    currency: currency,
                    tax: tax,
                  },
                  values,
                  heading
                );
              }
              setCostMouleEdit(null);
              setCostModeule(false);
            }}
            className="bg-footer_gradient_bot text-white px-4 rounded-md py-2 text-center text-sm flex gap-1 items-center justify-center hover:bg-hover_dark_btn active:bg-gradient_darker "
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CostModule;
