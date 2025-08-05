import React, { useContext } from "react";
import { StateManageContext } from "../../../context/StateManageContext";
import { FaEdit } from "react-icons/fa";

const PriceTermSlate = ({ index, rows, selected, settings, preview }) => {
  const calculateTotalPercentage = () => {
    let value = 0;
    rows.content.forEach((element) => {
      value += element.percentage;
    });
    return value;
  };
  const calculateTotalValue = () => {
    let value = 0;
    rows.content.forEach((element) => {
      value += element.value;
    });
    return value;
  };
  const { setPriceTerms, setPriceTermsEdit } = useContext(StateManageContext);

  return (
    <div
      className={`w-full flex flex-col min-h-[100px] p-3 font-${settings.body}`}
    >
      {/* <h1
        className={`w-full flex items-center justify-start text-[1.75em] font-${settings.heading} font-bold mb-4 pl-1 `}
      >
        Price Terms
      </h1> */}
      {selected !== null && preview !== true && (
        <button
          onClick={() => {
            setPriceTerms(true);
            setPriceTermsEdit(index);
          }}
          className="absolute top-2 right-4 hover:text-graidient_bottom"
        >
          <FaEdit />
        </button>
      )}
      <div className="w-full flex items-center justify-center">
        <table className="w-full">
          <thead className="text-active_text">
            <th className="w-[70%] bg-backgrounds py-2 font-normal text-left pl-4 border border-gray-300">
              Deliverables
            </th>
            {rows.options.percentage && (
              <th className="bg-backgrounds font-normal border border-gray-300 py-2">
                Percentage
              </th>
            )}
            {rows.options.value && (
              <th className=" bg-backgrounds font-normal border border-gray-300 py-2 text-right px-3">
                Value
              </th>
            )}
          </thead>
          <tbody>
            {rows.content.map((row, index) => {
              return (
                <tr className="text-heightlet_text">
                  <td className="w-[70%] border border-gray-300 py-2 bg-backgrounds_2 text-left pl-4  ">
                    {row.deliverable}
                  </td>
                  {rows.options.percentage && (
                    <td className="border border-gray-300 py-2">
                      {row.percentage}%
                    </td>
                  )}
                  {rows.options.value && (
                    <th className="border border-gray-300 py-2 font-normal text-right px-3">
                      ${row.value}
                    </th>
                  )}
                </tr>
              );
            })}

            <tr className="text-active_text">
              <td className=" border border-gray-300 py-2 bg-backgrounds_2 text-left pl-4  ">
                Total
              </td>

              {rows.options.percentage && (
                <td className="border border-gray-200 py-2 ">
                  {calculateTotalPercentage()}%
                </td>
              )}
              {rows.options.value && (
                <th className="border border-gray-200 py-2 font-normal  text-right px-3">
                  ${calculateTotalValue()}
                </th>
              )}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PriceTermSlate;
