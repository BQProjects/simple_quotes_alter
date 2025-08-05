import React, { useState } from "react";

const GoalModuleSideBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");

  const generateRandomImages = (min, max) => {
    const count = Math.floor(Math.random() * (max - min + 1)) + min;
    return Array.from({ length: count }, (_, idx) => ({
      id: idx + 1,
      label: `Label ${idx + 1}`,
      src: `https://via.placeholder.com/64?text=${idx + 1}`,
    }));
  };

  const priceImages = generateRandomImages(6, 10); // More images for scrolling
  const goalsImages = generateRandomImages(6, 10);
  const myWorkImages = generateRandomImages(6, 10);

  const sections = {
    Price: priceImages,
    Goals: goalsImages,
    "My Work": myWorkImages,
  };

  // Filter images by search term
  const filteredImages = (images) =>
    images.filter((img) =>
      img.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="w-[240px] h-[65%]  p-4 rounded-lg shadow-lg flex flex-col gap-4 overflow-auto">
      {/* Search and Filter */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          Search & Filter
        </h3>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border border-gray-300 rounded px-2 py-1 mb-2"
          placeholder="Search images..."
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full border border-gray-300 rounded px-2 py-1"
        >
          <option value="All">All</option>
          <option value="Price">Price</option>
          <option value="Goals">Goals</option>
          <option value="My Work">My Work</option>
        </select>
      </div>

      {/* Sections */}
      {filter === "All" || filter === "Price" ? (
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-1">
            Price Section
          </h3>
          <div className="grid grid-cols-2 gap-2 h-28 overflow-auto">
            {filteredImages(priceImages).map((img) => (
              <div
                key={img.id}
                className="flex flex-col items-center border border-gray-300 rounded p-2"
              >
                <img
                  src={img.src}
                  alt={img.label}
                  className="w-16 h-15 object-cover rounded"
                />
                <p className="text-sm text-gray-600 mt-1">{img.label}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {filter === "All" || filter === "Goals" ? (
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-1">
            Goals Section
          </h3>
          <div className="grid grid-cols-2 gap-2 h-28 overflow-auto">
            {filteredImages(goalsImages).map((img) => (
              <div
                key={img.id}
                className="flex flex-col items-center border border-gray-300 rounded p-2"
              >
                <img
                  src={img.src}
                  alt={img.label}
                  className="w-16 h-16 object-cover rounded"
                />
                <p className="text-sm text-gray-600 mt-1">{img.label}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {filter === "All" || filter === "My Work" ? (
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-1">
            My Work Section
          </h3>
          <div className="grid grid-cols-2 gap-2 h-28 overflow-auto">
            {filteredImages(myWorkImages).map((img) => (
              <div
                key={img.id}
                className="flex flex-col items-center border border-gray-300 rounded p-2"
              >
                <img
                  src={img.src}
                  alt={img.label}
                  className="w-16 h-16 object-cover rounded"
                />
                <p className="text-sm text-gray-600 mt-1">{img.label}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default GoalModuleSideBar;
