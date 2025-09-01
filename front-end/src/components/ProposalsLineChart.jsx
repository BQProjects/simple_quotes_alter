import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ProposalsAreaChart = ({ proposals }) => {
  // Helper: format date
  const formatDate = (date) => date.toISOString().split("T")[0];

  // Build last 14 days (instead of 7)
  const today = new Date();
  const lastTwoWeeks = new Date();
  lastTwoWeeks.setDate(today.getDate() - 13); // 13 days back to include today = 14 days total

  const dataMap = {};

  // Initialize all dates in the last 14 days with 0
  for (let i = 0; i < 14; i++) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    const dateStr = formatDate(date);
    dataMap[dateStr] = 0;
  }

  // Count proposals for each date
  proposals.forEach((p) => {
    const date = formatDate(new Date(p.createdAt));
    if (dataMap[date] !== undefined) {
      dataMap[date] += 1;
    }
  });

  // Sort dates chronologically for correct X axis order
  const chartData = Object.keys(dataMap)
    .sort((a, b) => new Date(a) - new Date(b))
    .map((date) => ({
      date: new Date(date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
      }),
      count: dataMap[date],
    }));

  // Total proposals in the last 14 days
  const total = proposals.filter(
    (p) => new Date(p.createdAt) >= lastTwoWeeks
  ).length;

  return (
    <div className="w-full h-80 bg-white p-4 rounded-2xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">
          Total Proposals created
        </h2>
        <div className="text-right">
          <p className="text-sm text-gray-500">Total proposals</p>
          <p className="text-2xl font-bold">{total}</p>
        </div>
      </div>

      <ResponsiveContainer width="95%" height="80%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorProposals" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ff4d6d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#ff4d6d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" className="text-xs" />
          <YAxis allowDecimals={false} className="text-xs" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="count"
            stroke="#ff4d6d"
            fillOpacity={1}
            fill="url(#colorProposals)"
            strokeWidth={3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProposalsAreaChart;
