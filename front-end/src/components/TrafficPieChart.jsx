import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const TrafficPieChart = ({
  data,
  title = "Traffic by Location",
}) => {
  // Default data if none provided
  const defaultData = [
    { name: "UAE", value: 52.1, color: "#ACACAC" },
    { name: "India", value: 22.8, color: "#8C8C8C" },
    { name: "Canada", value: 13.9, color: "#525252" },
    { name: "Other", value: 11.35, color: "#1F1F1F" },
  ];

  const chartData = data || defaultData;

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    if (percent < 0.08) return null; // Don't show labels for very small slices

    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.6; // Position text closer to outer edge
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="12"
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div
      className="flex flex-col justify-start items-center gap-3 pt-4 pb-4 pl-4 pr-4 rounded-2xl bg-white"
      style={{
        boxShadow: "0 0 4px 0 rgba(0, 0, 0, 0.10)",
      }}
    >
      {/* Title */}
      <div className="flex justify-start items-start gap-2 text-black text-xl font-medium leading-normal w-full">
        {title}
      </div>

      {/* Chart and Legend Container */}
      <div className="flex flex-col justify-center items-center gap-2 w-full flex-1 min-h-0">
        {/* Pie Chart */}
        <div className="relative flex justify-center">
          <ResponsiveContainer width={220} height={220}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={100}
                paddingAngle={1}
                dataKey="value"
                label={renderCustomizedLabel}
                labelLine={false}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex flex-col justify-center gap-2 w-full max-w-[280px] px-4">
          {chartData.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span
                  className="text-sm text-gray-600 leading-tight truncate"
                  style={{ letterSpacing: "0.12px" }}
                >
                  {item.name}
                </span>
              </div>
              <span
                className="text-sm text-gray-800 font-medium flex-shrink-0"
                style={{ letterSpacing: "0.12px" }}
              >
                {item.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrafficPieChart;
