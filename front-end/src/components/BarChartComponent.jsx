import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const BarChartComponent = ({ rawData }) => {
  const chartData = rawData
    ? Object.entries(rawData).map(([key, value]) => ({
        name: key,
        value: Math.floor(value),
      }))
    : {};
  return (
    <div className="mt-6 ">
      <BarChart width={900} height={210} data={chartData} barCategoryGap="10%">
        <CartesianGrid strokeDasharray="1 1" />
        <XAxis
          dataKey="name"
          interval={0}
          padding={{ left: 10, right: 10 }}
          tick={{ angle: -25, textAnchor: "end", fontSize: 12 }}
          height={80}
        />
        <YAxis />
        <Tooltip cursor={false} />
        <Bar
          dataKey="value"
          fill="#8C8C8C"
          barSize={15}
          radius={[10, 10, 0, 0]}
          activeBar={{ fill: "#D33268" }}
        />
      </BarChart>
    </div>
  );
};

export default BarChartComponent;
