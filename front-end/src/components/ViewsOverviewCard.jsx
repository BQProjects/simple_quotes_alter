import React from "react";
import { GoArrowUp, GoArrowDown, GoDash } from "react-icons/go";

const ViewsOverviewCard = ({ views }) => {
  {
    /* const generateDailyViewsPath = (
    dailyViews,
    dailyChange,
    historicalData = null
  ) => {
    const points = 8;
    const width = 100;
    const height = 25;
    const padding = 2;

    // If no historical data, simulate realistic daily pattern
    if (!historicalData) {
      const baseValue = Math.max(
        0,
        dailyViews - Math.abs((dailyChange * dailyViews) / 100)
      );
      const targetValue = dailyViews;

      let path = `M${padding} ${height - 2}`;

      for (let i = 1; i <= points; i++) {
        const progress = i / points;
        const x = padding + progress * width;

        // Create realistic daily progression with some variation
        const trendValue = baseValue + (targetValue - baseValue) * progress;
        const randomVariation =
          (Math.random() - 0.5) * Math.max(5, dailyViews * 0.1);
        const currentValue = Math.max(0, trendValue + randomVariation);

        // Convert to SVG y coordinate (higher values = lower y)
        const maxValue = Math.max(baseValue, targetValue) * 1.2;
        const y = height - 2 - (currentValue / maxValue) * (height - 6);

        path += `L${x} ${Math.max(2, Math.min(height - 2, y))}`;
      }

      return path;
    }

    // Use actual historical data if available
    return generatePathFromData(historicalData, width, height, padding);
  };

  const generateWeeklyViewsPath = (
    weekViews,
    weekChange,
    historicalData = null
  ) => {
    const points = 10; // More points for weekly data
    const width = 100;
    const height = 25;
    const padding = 2;

    if (!historicalData) {
      // Simulate 7 days of data leading to current week total
      const avgDailyViews = weekViews / 7;
      const weekStartViews = Math.max(
        0,
        avgDailyViews * (1 - weekChange / 100)
      );

      let path = `M${padding} ${height - 2}`;

      for (let i = 1; i <= points; i++) {
        const progress = i / points;
        const x = padding + progress * width;

        // Create weekly trend with weekend dips (realistic pattern)
        const dayOfWeek = (i - 1) % 7;
        const weekendMultiplier = dayOfWeek === 5 || dayOfWeek === 6 ? 0.6 : 1;

        const trendValue =
          weekStartViews + (avgDailyViews - weekStartViews) * progress;
        const dailyValue = trendValue * weekendMultiplier;
        const variation = (Math.random() - 0.5) * avgDailyViews * 0.3;
        const currentValue = Math.max(0, dailyValue + variation);

        const maxValue = avgDailyViews * 1.5;
        const y = height - 2 - (currentValue / maxValue) * (height - 6);

        path += `L${x} ${Math.max(2, Math.min(height - 2, y))}`;
      }

      return path;
    }

    return generatePathFromData(historicalData, width, height, padding);
  };

  const generateTotalViewsPath = (totalViews, growthData = null) => {
    const points = 12;
    const width = 100;
    const height = 25;
    const padding = 2;

    if (!growthData) {
      // Simulate growth curve - starts low and grows to current total
      const startValue = Math.max(1, totalViews * 0.1);

      let path = `M${padding} ${height - 2}`;

      for (let i = 1; i <= points; i++) {
        const progress = i / points;
        const x = padding + progress * width;

        // Exponential growth curve with some variation
        const growthFactor = Math.pow(progress, 1.5); // Exponential curve
        const currentValue =
          startValue + (totalViews - startValue) * growthFactor;
        const variation = (Math.random() - 0.5) * totalViews * 0.05;
        const adjustedValue = Math.max(startValue, currentValue + variation);

        const y =
          height - 2 - (adjustedValue / (totalViews * 1.1)) * (height - 6);

        path += `L${x} ${Math.max(2, Math.min(height - 2, y))}`;
      }

      return path;
    }

    return generatePathFromData(growthData, width, height, padding);
  };

  const generateTimeSpentPath = (timeSpent, sessionData = null) => {
    const points = 8;
    const width = 100;
    const height = 25;
    const padding = 2;

    if (!sessionData) {
      // Simulate time spent variation throughout sessions
      const avgTime = timeSpent;
      const minTime = Math.max(0, avgTime * 0.3);
      const maxTime = avgTime * 1.8;

      let path = `M${padding} ${height - 2}`;

      for (let i = 1; i <= points; i++) {
        const progress = i / points;
        const x = padding + progress * width;

        // Create realistic time spent pattern (some sessions short, some long)
        const baseVariation = Math.sin(progress * Math.PI * 2) * 0.3;
        const randomVariation = (Math.random() - 0.5) * 0.4;
        const sessionMultiplier = 0.8 + baseVariation + randomVariation;

        const currentTime = Math.max(
          minTime,
          Math.min(maxTime, avgTime * sessionMultiplier)
        );
        const y = height - 2 - (currentTime / maxTime) * (height - 6);

        path += `L${x} ${Math.max(2, Math.min(height - 2, y))}`;
      }

      return path;
    }

    return generatePathFromData(sessionData, width, height, padding);
  };

  // Helper function to generate path from actual data arrays
  const generatePathFromData = (data, width, height, padding) => {
    if (!data || data.length === 0) return `M${padding} ${height - 2}`;

    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);
    const range = maxValue - minValue || 1;

    let path = `M${padding} ${height - 2}`;

    data.forEach((value, index) => {
      const x = padding + (index / (data.length - 1)) * (width - 2 * padding);
      const normalizedValue = (value - minValue) / range;
      const y = height - 2 - normalizedValue * (height - 6);

      if (index === 0) {
        path = `M${x} ${y}`;
      } else {
        path += `L${x} ${y}`;
      }
    });

    return path;
  }; */
  }

  return (
    <div className="bg-white h-[310px] w-full rounded-lg px-8 py-3">
      <div className="w-full text-left flex items-center justify-start gap-2 text-lg text-gray-700 pt-2">
        <h1>Views Overview</h1>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {/* Today */}
        <div className="mt-3 mr-3 h-[100px] px-3 py-2 border border-gray-100 rounded-md flex flex-col items-start justify-start gap-2 cursor-pointer">
          <h3 className="text-xs text-gray-400">Today</h3>
          <p className="text-2xl text-gray-600 pl-2 flex items-end">
            {views?.dailyViews || 0}
            <span
              className={`text-[10px] flex items-center mx-1 ${
                views?.dailyChange === 0
                  ? "text-gray-600"
                  : views?.dailyChange < 0
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              {views?.dailyChange === 0 ? (
                <GoDash />
              ) : views?.dailyChange < 0 ? (
                <GoArrowDown />
              ) : (
                <GoArrowUp />
              )}
              {views?.dailyChange !== 0 && (
                <>{Math.abs(views?.dailyChange || 0).toFixed(1)}%</>
              )}
            </span>
            <span className="text-sm text-graidient_bottom ml-1 mb-0.5">
              views
            </span>
          </p>
        </div>

        {/* This Week */}
        <div className="mt-3 mr-3 h-[100px] px-3 py-2 border border-gray-100 rounded-md flex flex-col items-start justify-start gap-2 cursor-pointer">
          <h3 className="text-xs text-gray-400">This Week</h3>
          <p className="text-2xl text-gray-600 pl-2 flex items-end">
            {views?.weekViews || 0}
            <span
              className={`text-[10px] flex items-center mx-1 ${
                views?.weekChange === 0
                  ? "text-gray-600"
                  : views?.weekChange < 0
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              {views?.weekChange === 0 ? (
                <GoDash />
              ) : views?.weekChange < 0 ? (
                <GoArrowDown />
              ) : (
                <GoArrowUp />
              )}
              {Math.abs(views?.weekChange || 0).toFixed(1)}%
            </span>
            <span className="text-sm text-graidient_bottom ml-1 mb-0.5">
              views
            </span>
          </p>
        </div>

        {/* Total Views */}
        <div className="mt-3 mr-3 h-[100px] px-3 py-2 border border-gray-100 rounded-md flex flex-col items-start justify-start gap-2 cursor-pointer">
          <h3 className="text-xs text-gray-400">Total Views</h3>
          <p className="text-2xl text-gray-600 pl-2">
            {views?.totalViews || 0}{" "}
            <span className="text-sm text-graidient_bottom">views</span>
          </p>
        </div>

        {/* Avg Time Spent */}
        <div className="mt-3 mr-3 h-[100px] px-3 py-2 border border-gray-100 rounded-md flex flex-col items-start justify-start gap-2 cursor-pointer">
          <h3 className="text-xs text-gray-400">Avg Time Spent</h3>
          {/* <p className="text-2xl text-gray-600 pl-2">
            {Math.floor(views?.timespent || 0)}{" "}
            <span className="text-sm text-graidient_bottom">sec</span>
          </p> */}
          <p className="text-2xl text-gray-600 pl-2">
            {(() => {
              const time = views?.timespent || 0;
              if (time < 60) {
                return `${Math.floor(time)} sec`;
              } else if (time < 3600) {
                return `${Math.floor(time / 60)} min`;
              } else {
                return `${Math.floor(time / 3600)} hr`;
              }
            })()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewsOverviewCard;
