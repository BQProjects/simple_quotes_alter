import React, { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/Web_logo.png";
import sq_logo from "../../assets/sq_logo.svg";
import { CiSearch } from "react-icons/ci";
import { IoNotificationsOutline } from "react-icons/io5";
import { UserContext } from "../../context/UserContext";
import { StateManageContext } from "../../context/StateManageContext";
import axios from "axios";
import { FaChevronRight } from "react-icons/fa";

const DashboardHeader = () => {
  const { user } = useContext(UserContext);
  const { workspaces, proposals, notifications, notifi, setNotifi } =
    useContext(StateManageContext);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [allItems, setAllItems] = useState([]);
  const [sortP, setSortP] = useState("default");
  const bellRef = useRef(null);
  const notificationRef = useRef(null);
  const searchRef = useRef(null);

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // const notifications = [
  //   {
  //     id: 1,
  //     type: "trial",
  //     title: "Free Trial",
  //     message:
  //       "You have 7 days remaining in your free trial and 3 documents left to create. Upgrade now to unlock unlimited features!...",
  //     actionText: "Upgrade Plan Now",
  //     actionLink: "/subscription",
  //     time: "02:00 pm",
  //     read: false,
  //   },
  //   {
  //     id: 2,
  //     type: "subscription",
  //     title: "Thank you for subscribing!",
  //     message:
  //       "We're thrilled to let you know that your subscription has unlocked unlimited creations and access to all premium features to help you achieve more with ease!",
  //     time: "03:00 pm",
  //     read: false,
  //   },
  //   {
  //     id: 3,
  //     type: "news",
  //     title: "Exciting News! 🚀 New Templates are added!",
  //     message:
  //       "You can upload your own custom font and set a default font for all your new proposals created from scratch.",
  //     time: "04:10 pm",
  //     read: false,
  //   },
  // ];

  // Combine proposals and workspaces on component mount
  useEffect(() => {
    console.log("Proposals:", proposals);
    console.log("Workspaces:", workspaces);

    if (proposals.length > 0 || workspaces.length > 0) {
      const proposalItems = proposals.map((p) => ({
        ...p,
        type: "proposal",
      }));

      const workspaceItems = workspaces.map((w) => ({
        ...w,
        type: "workspace",
      }));

      const combined = [...proposalItems, ...workspaceItems];
      console.log("Combined items:", combined);
      setAllItems(combined);

      // If search is active, update search results with all items
      if (showResults && !searchQuery) {
        setSearchResults(combined);
      }
    }
  }, [proposals, workspaces]);

  // Handle search input changes
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 0) {
      setLoading(true);
      filterResults(query);
    } else {
      // When input is empty, show all items
      setSearchResults(allItems);
      setLoading(false);
    }
  };

  // Filter results based on query
  const filterResults = (query) => {
    try {
      const filteredResults = allItems.filter((item) => {
        // Check different possible name properties
        const itemName =
          item.title ||
          item.name ||
          item.workspaceName ||
          item.proposalName ||
          "";
        return itemName.toLowerCase().includes(query.toLowerCase());
      });

      console.log("Filtered results:", filteredResults);
      setSearchResults(filteredResults);
    } catch (error) {
      console.error("Error filtering results:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleNotifications = () => {
    setNotifi(!notifi);
  };

  // Navigate to action link when notification action is clicked
  const handleNotificationAction = (actionLink) => {
    if (actionLink) {
      navigate(actionLink);
      setShowNotifications(false);
    }
  };

  // Handle clicking outside to close results
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target)
      ) {
        setNotifi(false);
      }

      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Navigate to item when selected
  const handleSelectItem = (item) => {
    if (item.type === "proposal") {
      navigate(`/editor/${item._id}`);
    } else if (item.type === "workspace") {
      navigate(`/workspace/${item._id || item.id}`);
    }

    // Save to recent searches (limit to 5)
    const searchItem = {
      id: item._id || item.id,
      title: item.title || item.name || item.workspaceName || item.proposalName,
      type: item.type,
      timestamp: new Date().toISOString(),
    };

    setRecentSearches((prev) => {
      // Remove duplicates
      const filtered = prev.filter((s) => s.id !== searchItem.id);
      // Add to beginning, limit to 5 items
      return [searchItem, ...filtered].slice(0, 5);
    });

    // Save to localStorage for persistence
    localStorage.setItem(
      "recentSearches",
      JSON.stringify([searchItem, ...recentSearches].slice(0, 5))
    );

    setShowResults(false);
    setSearchQuery("");
  };

  // Load recent searches from localStorage on component mount
  useEffect(() => {
    const savedSearches = localStorage.getItem("recentSearches");
    if (savedSearches) {
      try {
        setRecentSearches(JSON.parse(savedSearches));
      } catch (error) {
        console.error("Error parsing recent searches:", error);
      }
    }
  }, []);

  // show recent searches instead of all items
  const handleSearchFocus = () => {
    setShowResults(true);
    // Show recent searches if available, otherwise show all items
    if (recentSearches.length > 0) {
      setSearchResults([]); // Clear current results
      setLoading(false);
    } else {
      setSearchResults(allItems);
    }
  };

  const handleClickOutsideBell = (event) => {
    if (bellRef.current && !bellRef.current.contains(event.target)) {
      setNotification(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideBell);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideBell);
    };
  }, []);

  return (
    <div className="h-[8vh] w-full flex items-center justify-between shadow-lg shadow-gray-200 border-b border-gray-200">
      <div className="w-[15%] flex items-center">
        <img
          className="w-[120px] h-[52px] object-contain ml-9"
          src={sq_logo}
          alt="Logo"
          style={{ opacity: 1 }}
        />
      </div>
      <div
        className="w-[30%] flex items-center justify-center text-gray-600 ml-[15%] relative"
        ref={searchRef}
      >
        <div className="flex items-center border-[1px] rounded-md border-gray-200 w-[90%] hover:border-active_text focus-within:border-active_text ">
          <CiSearch className="w-10 text-gray-600" />
          <input
            type="text"
            placeholder="Search for workspaces and proposals..."
            className="pr-5 py-1.5  text-sm w-full"
            style={{ outline: "none" }}
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={handleSearchFocus}
          />
        </div>

        {/* Search Results Dropdown */}
        {showResults && (
          <div className="absolute top-full left-[5%] w-[90%] mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-[400px] overflow-y-auto">
            {loading ? (
              <div className="p-3 text-center text-gray-500">Searching...</div>
            ) : searchQuery.length > 0 && searchResults.length > 0 ? (
              <>
                <div className="sticky top-0 bg-gray-50 p-2 border-b border-gray-200">
                  <p className="text-sm text-gray-500 font-medium">
                    Found {searchResults.length} items
                  </p>
                </div>
                {searchResults.map((item, index) => (
                  <div
                    key={item._id || `item-${index}`}
                    className="p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 flex items-center"
                    onClick={() => handleSelectItem(item)}
                  >
                    <div
                      className={`w-2 h-2 ${
                        item.type === "proposal"
                          ? "bg-graidient_bottom"
                          : "bg-green-500"
                      } rounded-full mr-2`}
                    ></div>
                    <div className="flex-1 w-full">
                      <div className="flex justify-between ">
                        <div className="flex ">
                          <p className="text-gray-700 font-medium text-sm w-[60%] whitespace-nowrap text-ellipsis overflow-hidden">
                            {item.title ||
                              item.name ||
                              item.workspaceName ||
                              item.proposalName ||
                              "Unnamed Item"}
                          </p>
                        </div>
                        <span className="text-xs text-gray-500 ml-2">
                          {item.type === "proposal" ? "Proposal" : "Workspace"}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">
                        {item.createdAt
                          ? new Date(item.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )
                          : "No date"}
                      </p>
                    </div>
                  </div>
                ))}
              </>
            ) : searchQuery.length === 0 && recentSearches.length > 0 ? (
              <>
                <div className="sticky top-0 bg-gray-50 p-2 border-b border-gray-200">
                  <p className="text-sm text-gray-500 font-medium">
                    Recent Searches
                  </p>
                </div>
                {recentSearches.map((item, index) => (
                  <div
                    key={item.id || `recent-${index}`}
                    className="p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 flex items-center"
                    onClick={() => {
                      // Find the original item to get all properties
                      const originalItem = allItems.find(
                        (i) => i._id === item.id || i.id === item.id
                      );
                      if (originalItem) {
                        handleSelectItem(originalItem);
                      } else {
                        // Fallback if original item not found
                        if (item.type === "proposal") {
                          navigate(`/editor/${item._id}`);
                        } else if (item.type === "workspace") {
                          navigate(`/workspace/${item.id}`);
                        }
                      }
                    }}
                  >
                    <div
                      className={`w-2 h-2 ${
                        item.type === "proposal"
                          ? "bg-graidient_bottom"
                          : "bg-green-500"
                      } rounded-full mr-2`}
                    ></div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="text-gray-700 font-medium text-sm">
                          {item.title || "Unnamed Item"}
                        </p>
                        <span className="text-xs text-gray-500 ml-2">
                          {item.type === "proposal" ? "Proposal" : "Workspace"}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">
                        {item.timestamp
                          ? new Date(item.timestamp).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )
                          : "No date"}
                      </p>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="p-3 text-center text-gray-500">
                No items found
              </div>
            )}
          </div>
        )}
      </div>

      <div className="w-[30%] relative flex items-center justify-end gap-4 mr-16">
        {/* Notification button with dropdown */}
        <div className="" ref={notificationRef}>
          <button
            className={`relative  hover:bg-gray-200 p-2 rounded-[50%] mr-1 cursor-pointer ${
              showNotifications ? "bg-gray-200" : "bg-gray-100"
            }`}
            onClick={toggleNotifications}
          >
            <div className="h-[6px] w-[6px] bg-graidient_bottom absolute top-[8px] right-[8px] rounded-[50%]"></div>
            <IoNotificationsOutline className="h-5 w-5 text-gray-500" />
          </button>

          {/* Notification dropdown */}
          {/* {showNotifications && (
            <div className="absolute right-0 mt-2 w-[380px] bg-white rounded-lg shadow-lg z-20 border border-gray-100 overflow-hidden">
              <div className="p-4 border-b border-gray-100">
                <h3 className="text-xl font-medium text-gray-800">
                  Notification
                </h3>
              </div>

              <div className="max-h-[400px] overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="p-4 border-b border-gray-100"
                  >
                    <div className="flex items-start">
                      <div className="mt-1 mr-3">
                        <div
                          className={`h-2 w-2 rounded-full ${
                            notification.type === "trial"
                              ? "bg-pink-500"
                              : notification.type === "subscription"
                              ? "bg-pink-500"
                              : "bg-pink-500"
                          }`}
                        ></div>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium text-gray-800">
                            {notification.title}
                          </h4>
                          <span className="text-sm text-gray-400">
                            {notification.time}
                          </span>
                        </div>
                        <p className="text-gray-500 mt-1 text-sm">
                          {notification.message}
                        </p>
                        {notification.actionText && (
                          <button
                            onClick={() =>
                              handleNotificationAction(notification.actionLink)
                            }
                            className="text-graidient_bottom hover:underline mt-1 text-sm font-medium"
                          >
                            {notification.actionText}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 flex justify-end border-t border-gray-100">
                <button className="text-graidient_bottom flex items-center text-sm hover:underline">
                  View all notifications{" "}
                  <FaChevronRight className="ml-1 text-xs" />
                </button>
              </div>
            </div>
          )} */}
          {notifi && (
            <div
              ref={bellRef}
              className="bg-white border border-gray-100 p-5 w-[450px] absolute z-[6000] rounded-lg flex flex-col items-center justify-center gap-1 top-12 right-20   px-2 py-3 shadow-gray-400 shadow-lg"
              style={{
                left: "50%",
                transform: "translate(-50%)",
              }}
            >
              <div className="w-full pt-1 ">
                <h2 className="ml-3 font-semibold text-gray-600">
                  Notifications
                </h2>
              </div>
              {!notifications ? (
                <div className="w-full py-3 text-non_active_text flex items-start justify-center text-sm">
                  No Notifications are there
                </div>
              ) : (
                [...notifications]
                  .reverse()
                  .slice(0, 4)
                  .map((item) => {
                    return (
                      <div className="flex justify-between w-full mt-3 py-2  rounded-md">
                        <div className="w-[10%]  h-full flex items-start justify-center">
                          <div className="mt-2 w-1.5 h-1.5 rounded-[50%] bg-graidient_bottom"></div>
                        </div>
                        <div className="w-[90%]">
                          <p className="font-semibold text-gray-600 text-sm flex justify-between pr-7">
                            {item.title}
                            <span
                              className="text-xs font-normal"
                              style={{
                                color: "rgba(140, 140, 140, 1)",
                              }}
                            >
                              {formatTime(item.createdAt)}
                            </span>
                          </p>
                          <p
                            className="w-[90%] text-xs  mt-2"
                            style={{
                              color: "rgba(140, 140, 140, 1)",
                            }}
                          >
                            {item.discription}
                          </p>
                        </div>
                      </div>
                    );
                  })
              )}
            </div>
          )}
        </div>
        <button
          onClick={() => navigate("/subscription")}
          className="text-center py-2 px-2 border border-gray-300 rounded-md text-graidient_bottom 
          flex items-center gap-2 justify-center hover:bg-graidient_bottom hover:text-white transition-colors text-sm"
        >
          Upgrade
        </button>
        {/* <div className="flex items-center justify-center gap-2 text-gray-500">
          <div className="bg-gray-600 text-white p-1 px-2 rounded-[50%] text-xs border-2 border-green-500">
            {user?.username[0]}
          </div>
          {user.username}
        </div> */}
      </div>
    </div>
  );
};

export default DashboardHeader;
