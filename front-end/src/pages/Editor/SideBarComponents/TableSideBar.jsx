import React, { useState } from "react";
import Table_1 from "../../../assets/Table-1.png";
import Table_2 from "../../../assets/Table-2.png";
import Table_3 from "../../../assets/Table-3.png";
import Table_4 from "../../../assets/Table-4.png";
import Table_5 from "../../../assets/Table-5.png";
import Table_6 from "../../../assets/Table-6.png";
import Table_7 from "../../../assets/Table-7.png";
import Table_8 from "../../../assets/Table-8.png";

const TableSideBar = () => {
  const [rows, setRows] = useState(4);
  const [columns, setColumns] = useState(4);
  const [thickness, setThickness] = useState(5);

  return (
    <div className="w-[240px] h-[65%]  p-4  flex flex-col gap-6">
      <h3 className="text-lg font-semibold text-graidient_bottom mb-1">
        Customize Table
      </h3>
      {/* Section 1 */}
      <div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-col w-[45%] items-start justify-between">
            <label className="text-gray-600">Rows</label>
            <input
              type="number"
              value={rows}
              onChange={(e) => setRows(Number(e.target.value))}
              className="w-20 border border-gray-300 rounded px-2 py-1 text-sm"
              min={1}
            />
          </div>
          <div className="flex flex-col w-[45%] items-start justify-between">
            <label className="text-gray-600">Columns</label>
            <input
              type="number"
              value={columns}
              onChange={(e) => setColumns(Number(e.target.value))}
              className="w-20 border border-gray-300 rounded px-2 py-1 text-sm"
              min={1}
            />
          </div>
        </div>
      </div>

      <hr className="border-gray-300" />

      {/* Section 2 */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Border Thickness
        </h3>
        <div className="flex flex-row items-center justify-between">
          <input
            type="range"
            min="1"
            max="10"
            value={thickness}
            onChange={(e) => setThickness(Number(e.target.value))}
            className="w-26"
          />

          <select
            value={thickness}
            onChange={(e) => setThickness(Number(e.target.value))}
            className="w-16 border border-gray-300 rounded px-2 py-1 text-sm"
          >
            {[...Array(10).keys()].map((n) => (
              <option key={n + 1} value={n + 1}>
                {n + 1}
              </option>
            ))}
          </select>
        </div>
      </div>

      <hr className="border-gray-300" />

      {/* Section 3 */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Arrangement
        </h3>
        <div className="grid grid-cols-3 gap-2">
          <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
            <img
              src={Table_1}
              alt="table"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
            <img
              src={Table_2}
              alt="table"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
            <img
              src={Table_3}
              alt="table"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
            <img
              src={Table_4}
              alt="table"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
            <img
              src={Table_5}
              alt="table"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
            <img
              src={Table_6}
              alt="table"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
            <img
              src={Table_7}
              alt="table"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
            <img
              src={Table_8}
              alt="table"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableSideBar;
