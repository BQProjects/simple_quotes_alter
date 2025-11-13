import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from "recharts";

const TrafficPieChart = ({
  data,
  title = "Traffic by Location",
  loading = false,
  totalViews = null,
}) => {
  const [activeIndex, setActiveIndex] = useState(null);
  // Accept multiple API shapes:
  // - data: Array -> use directly
  // - data: { total, data: Array } -> use data.data
  // - data: { /* key: count */ } -> convert to entries
  const chartData = React.useMemo(() => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (Array.isArray(data.data)) return data.data;
    // If object with numeric values (e.g., { US: 10, IN: 5 }), convert
    if (typeof data === "object") {
      const entries = Object.entries(data).filter(
        ([k, v]) => typeof v === "number"
      );
      if (entries.length > 0) {
        return entries.map(([k, v]) => ({ name: k, value: v }));
      }
    }
    return [];
  }, [data]);

  const renderActiveShape = (props) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } =
      props;
    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 8}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 10}
          outerRadius={outerRadius + 14}
          fill={fill}
          opacity={0.15}
        />
      </g>
    );
  };

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    payload,
  }) => {
    // Determine display percent: prefer normalizedPercent attached to payload (percentage like 92.1),
    // otherwise fall back to Recharts' percent (fraction 0-1).
    const displayPercent = payload?.payload?.normalizedPercent ?? percent * 100;
    if (displayPercent < 6) return null; // hide very small labels
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.55;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={11}
        fontWeight={700}
      >
        {`${displayPercent.toFixed(1)}%`}
      </text>
    );
  };

  const onPieEnter = (_, index) => setActiveIndex(index);
  const onPieLeave = () => setActiveIndex(null);
  const palette = [
    "#3b82f6",
    "#06b6d4",
    "#10b981",
    "#8b5cf6",
    "#f59e0b",
    "#f43f5e",
    "#84cc16",
    "#ec4899",
  ];

  // Normalize incoming API shapes and compute processed data (top 4 + Others).
  const { processedData, totalCount } = React.useMemo(() => {
    // Map to canonical shape
    const canonical = (chartData || []).map((item, i) => ({
      name: item.name || item.country || item.label || item.title || "Unknown",
      value:
        Number(item.value ?? item.count ?? item.views ?? item.hits ?? 0) || 0,
      color: item.color || palette[i % palette.length],
    }));

    const total =
      totalViews !== null
        ? totalViews
        : canonical.reduce((s, it) => s + (it.value || 0), 0);

    if (canonical.length === 0) return { processedData: [], totalCount: total };

    const sorted = [...canonical].sort((a, b) => b.value - a.value);
    const top = sorted.slice(0, 4);
    const rest = sorted.slice(4);
    if (rest.length > 0) {
      const othersSum = rest.reduce((s, it) => s + (it.value || 0), 0);
      if (othersSum > 0) {
        top.push({ name: "Others", value: othersSum, color: "#d3d3d3" });
      }
    }

    return { processedData: top, totalCount: total };
  }, [chartData, totalViews]);

  // Compute normalized percentages to 1 decimal using largest-remainder (to sum to 100.0)
  const processedWithPercents = React.useMemo(() => {
    if (!processedData || processedData.length === 0) return [];
    if (totalCount === 0)
      return processedData.map((d) => ({ ...d, normalizedPercent: 0 }));

    const scale = 10; // 1 decimal -> tenths
    const exact = processedData.map((d) => (d.value / totalCount) * 100);
    const floorTenths = exact.map((p) => Math.floor(p * scale));
    const remainders = exact.map((p, i) => p * scale - floorTenths[i]);
    const floorSum = floorTenths.reduce((s, v) => s + v, 0);
    let remainderTotal = 100 * scale - floorSum; // integer number of tenths to distribute

    // allocate remainder to largest remainders
    const indices = remainders
      .map((r, i) => ({ r, i }))
      .sort((a, b) => b.r - a.r);
    const alloc = new Array(processedData.length).fill(0);
    for (let k = 0; k < remainderTotal; k++) {
      alloc[indices[k % indices.length].i] += 1;
    }

    const normalizedTenths = floorTenths.map((t, i) => t + alloc[i]);
    const normalizedPercents = normalizedTenths.map((t) => t / scale);

    return processedData.map((d, i) => ({
      ...d,
      normalizedPercent: normalizedPercents[i] ?? 0,
    }));
  }, [processedData, totalCount]);

  return (
    <div
      className="flex flex-col gap-3 p-4 rounded-xl bg-white border border-gray-100 h-full"
      style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.06)" }}
    >
      <div className="flex items-center gap-2">
        <div className="w-1 h-6 bg-gray-600 rounded-full" />
        <h3 className="text-gray-800 text-lg font-semibold">{title}</h3>
      </div>

      <div className="flex flex-col gap-3 flex-1 min-h-0">
        {loading ? (
          <div className="flex items-center justify-center h-[220px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-300" />
          </div>
        ) : processedWithPercents.length === 0 ? (
          <div className="flex flex-col justify-center items-center flex-1 text-gray-400 gap-2">
            <p className="text-sm font-medium">No data available</p>
          </div>
        ) : (
          <>
            <div
              className="relative flex justify-center items-center"
              style={{ overflow: "visible" }}
            >
              <ResponsiveContainer width="95%" height={220}>
                <PieChart margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
                  <Pie
                    data={processedWithPercents}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                    label={renderCustomizedLabel}
                    labelLine={false}
                    isAnimationActive
                    animationDuration={600}
                    onMouseEnter={onPieEnter}
                    onMouseLeave={onPieLeave}
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                  >
                    {processedWithPercents.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        style={{
                          transition: "all 0.25s ease",
                          filter:
                            activeIndex === index ? "brightness(1.05)" : "none",
                        }}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <div className="text-2xl font-bold text-gray-800">
                  {totalCount}
                </div>
                <div className="text-[10px] text-gray-500 font-medium">
                  Total Views
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1 overflow-y-auto overflow-x-hidden max-h-[160px] scrollbar-thin">
              {processedWithPercents.map((item, index) => (
                <div
                  key={index}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                  className={`flex items-start justify-between gap-2 p-2 rounded-lg transition-all duration-150 cursor-pointer ${
                    activeIndex === index
                      ? "bg-gray-50 scale-[1.01]"
                      : "bg-white hover:bg-gray-50"
                  }`}
                  style={{
                    border: `1px solid ${
                      activeIndex === index
                        ? (item.color || "#000") + "22"
                        : "#f3f4f6"
                    }`,
                  }}
                >
                  <div className="flex items-start gap-2 min-w-0 flex-1">
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0 transition-transform duration-150 mt-1"
                      style={{
                        backgroundColor: item.color,
                        transform:
                          activeIndex === index ? "scale(1.15)" : "scale(1)",
                        boxShadow:
                          activeIndex === index
                            ? `0 0 8px ${item.color}55`
                            : "none",
                      }}
                    />
                    <div className="flex flex-col min-w-0">
                      <span
                        className={`text-sm leading-snug break-words ${
                          activeIndex === index
                            ? "text-gray-900 font-semibold"
                            : "text-gray-600 font-medium"
                        }`}
                      >
                        {item.name}
                      </span>
                      <span className="text-[11px] text-gray-500 mt-0.5">
                        {item.value} views • {item.normalizedPercent.toFixed(1)}
                        %
                      </span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 ml-2">
                    <span
                      className={`text-sm font-bold ${
                        activeIndex === index
                          ? "text-gray-900"
                          : "text-gray-700"
                      }`}
                    >
                      {item.normalizedPercent.toFixed(1)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TrafficPieChart;
