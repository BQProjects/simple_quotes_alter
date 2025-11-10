import React, { useContext, useState, useEffect } from "react";
import { BiReceipt } from "react-icons/bi";
import { CiCreditCard1 } from "react-icons/ci";
import { MdOutlinePeopleOutline } from "react-icons/md";
import { FaArrowRight, FaArrowDown, FaArrowLeft } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { UserContext } from "../../context/UserContext";
import { DatabaseContext } from "../../context/DatabaseContext";
import axios from "axios";
import profile from "../../assets/profile.png";
import { RiDeleteBinLine } from "react-icons/ri";
import toast from "react-hot-toast";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation, useNavigate } from "react-router-dom";

const Subscription = () => {
  const [plan, setPlan] = useState("yearly");
  const location = useLocation();
  const { user } = useContext(UserContext);
  const { databaseUrl } = useContext(DatabaseContext);
  const [users, setUsers] = useState([]);
  const [popUp, setPopUp] = useState(false);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [members, setMembers] = useState([]);
  const [subscribeModal, setSubscribeModal] = useState(false);
  const [subscribePlan, setSubscribePlan] = useState("monthly");
  const [subscribeTeamSize, setSubscribeTeamSize] = useState(1);
  const navigate = useNavigate();
  const [billingHistory, setBillingHistory] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const sortedMembers = React.useMemo(() => {
    if (!sortBy) return members;
    return [...members].sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      if (sortBy === "fullName") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      } else if (sortBy === "email") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [members, sortBy, sortOrder]);

  const handleBillingSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedBillingHistory = [...billingHistory].sort((a, b) => {
    if (!sortColumn) return 0;
    let aValue = a[sortColumn];
    let bValue = b[sortColumn];

    if (sortColumn === "billingDate" || sortColumn === "endDate") {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    } else if (sortColumn === "amount") {
      aValue = parseFloat(aValue.replace("$", "").replace(",", ""));
      bValue = parseFloat(bValue.replace("$", "").replace(",", ""));
    } else if (sortColumn === "users") {
      aValue = parseInt(aValue);
      bValue = parseInt(bValue);
    }

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  ////
  ////
  ////
  ////
  //// STIPE INTGRATIPN
  ////
  ////
  ////
  ////
  ////
  useEffect(() => {
    const handleSubscription = async () => {
      const query = new URLSearchParams(location.search);
      const success = query.get("success");
      const canceled = query.get("canceled");
      const plan = query.get("plan");
      const userId = query.get("user");
      const teamSize = query.get("teamSize");

      // ✅ Prevent re-execution if already handled
      if (sessionStorage.getItem("subscriptionHandled")) return;

      try {
        if (success) {
          const startDate = new Date();
          let endDate = new Date();

          if (plan === "monthly") {
            endDate.setMonth(endDate.getMonth() + 1);
          } else if (plan === "yearly") {
            endDate.setFullYear(endDate.getFullYear() + 1);
          }

          // 🔹 Update backend with new subscription details
          const res = await axios.post(
            `${databaseUrl}/api/auth/changeSubscription`,
            {
              subscription: plan,
              subscriptionDate: startDate,
              user_id: userId,
              teamSize: parseInt(teamSize),
            }
          );

          console.log("Response from backend:", res.data);
          toast.success(
            "🎉 Congratulations! Your subscription has been activated."
          );

          // 🔹 Fetch updated user details
          const updatedUser = await axios.get(
            `${databaseUrl}/api/auth/getUser`,
            {
              params: { user_id: userId },
            }
          );

          if (updatedUser.data) {
            // Team size updated in user context
          }

          // Refresh the page to show updated subscription
          setTimeout(() => {
            window.location.href = window.location.pathname;
          }, 1500);
        } else if (canceled) {
          toast.error("❌ Payment was canceled or failed.");
        }

        // ✅ Mark as handled (even if success or canceled)
        sessionStorage.setItem("subscriptionHandled", "true");
      } catch (error) {
        console.error("Error handling subscription:", error);
        toast.error("Something went wrong while updating your subscription.");
      }
    };

    handleSubscription();
  }, [location.search, databaseUrl]);

  const createSubscription = async (overridePlan = null, teamSize = null) => {
    try {
      sessionStorage.removeItem("subscriptionHandled");

      const currentPlan = overridePlan || user.subscription;
      const finalTeamSize = teamSize || 1;

      console.log("Sending to backend:", {
        subscription: currentPlan,
        subscriptionDate: new Date(),
        user_id: user.id,
        teamSize: finalTeamSize,
      });

      const stripe_res = await axios.post(
        `${databaseUrl}/api/workspace/payment-integration`,
        {
          amount: finalTeamSize * 10 * 100, // convert to cents
          user_id: user.id,
          plan: currentPlan,
          teamSize: finalTeamSize,
        }
      );

      window.location.href = stripe_res.data.url;
    } catch (error) {
      console.error("Error updating subscription:", error);
      toast.error("Failed to process subscription");
    }
  };

  const handleNewSubscription = (plan) => {
    setSubscribePlan(plan);
    setSubscribeModal(true);
  };

  const confirmSubscription = () => {
    if (subscribeTeamSize < 1) {
      toast.error("Team size must be at least 1");
      return;
    }
    setSubscribeModal(false);
    createSubscription(subscribePlan, subscribeTeamSize);
  };

  const CancelSubscription = async () => {
    try {
      sessionStorage.removeItem("subscriptionHandled");
      const res = await axios.post(
        `${databaseUrl}/api/auth/changeSubscription`,
        {
          subscription: "canceled",
          subscriptionDate: new Date(),
          user_id: user.id,
        }
      );
      toast.success("Subscription has been cancelled");
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching workspaces:", error);
    }
  };

  ////
  ////
  ////
  ////
  ////
  ////
  ////
  ////
  ////
  ////

  const deleteMember = async (id) => {
    try {
      const res = await axios.post(`${databaseUrl}/api/auth/removemem`, {
        user_id: user.id,
        new_user: id,
      });
      console.log(res.data);
      setMembers(members.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error fetching workspaces:", error);
    }
  };
  const getMembers = async () => {
    try {
      const res = await axios.get(`${databaseUrl}/api/auth/getshared`, {
        params: { user_id: user.id },
      });
      setMembers(res.data);
    } catch (error) {
      console.error("Error fetching workspaces:", error);
    }
  };
  const getAllUsers = async () => {
    try {
      const res = await axios.get(`${databaseUrl}/api/auth/getallusers`);
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  const addMember = async () => {
    try {
      if (members.length >= user.teamSize) {
        toast.error("Cannot add more members. Team size limit reached.");
        return;
      }
      const res = await axios.post(`${databaseUrl}/api/auth/addmem`, {
        user_id: user.id,
        new_user: selected,
      });
      setMembers([...members, res.data]);
    } catch (error) {
      console.error("Error adding member:", error);
    }
  };
  const handlePlanSwitch = (newPlan) => {
    setPlan(newPlan);
    createSubscription(newPlan);
  };
  useEffect(() => {
    getMembers();
    console.log("User data fetched from database:", user);
  }, []);
  useEffect(() => {
    if (user.subscriptionDate) {
      const start = new Date(user.subscriptionDate);
      const history = [];
      for (let i = 0; i < 3; i++) {
        const billDate = new Date(start);
        billDate.setMonth(billDate.getMonth() - i);
        const endDate = new Date(billDate);
        if (user.subscription === "monthly") {
          endDate.setMonth(endDate.getMonth() + 1);
        } else {
          endDate.setFullYear(endDate.getFullYear() + 1);
        }
        history.push({
          invoice: `Invoice_${billDate.toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
          })}`,
          billingDate: billDate.toLocaleDateString(),
          endDate: endDate.toLocaleDateString(),
          plan: user.subscription === "yearly" ? "Yearly plan" : "Monthly plan",
          amount: user.subscription === "yearly" ? "$ 120,00" : "$ 12,00",
          users: "1",
        });
      }
      setBillingHistory(user.invoices ? user.invoices : []);
      // console.log(user.invoices);
    }
  }, [user]);
  return (
    <>
      <div className="bg-white w-full h-[85vh] flex flex-col items-center overflow-y-auto relative">
        {popUp && (
          <div className="fixed inset-0 bg-transparent bg-opacity-40 flex justify-center items-center z-50">
            <div className="w-[30%] h-[60%] bg-white px-4 py-3 flex flex-col shadow-lg shadow-gray-200">
              <h1 className="text-xl w-full text-center mt-4">Select User</h1>
              <p className="w-full text-xs  text-gray-500 text-center">
                select a user that you want to add Subscription
              </p>
              <input
                type="text"
                className="w-full py-2 px-2 outline-none border border-gray-200 rounded-lg mt-4"
                placeholder="Search for User"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="h-[65%] w-full overflow-auto">
                {users
                  ?.filter(
                    (item) =>
                      item.fullName
                        .toLowerCase()
                        .includes(search?.toLowerCase() || "") &&
                      item._id !== user.id &&
                      !members.some((member) => member._id === item._id)
                  )
                  .map((item) => (
                    <div
                      onClick={() => {
                        setSelected(item._id);
                      }}
                      key={item._id}
                      className={` mt-3 mr-3 placeholder:w-[100%] h-14 px-3 py-2 border ${
                        selected === item._id
                          ? "border-graidient_bottom"
                          : "border-gray-100"
                      }  rounded-md flex items-center justify-start gap-2 cursor-pointer `}
                    >
                      <div
                        className={`h-10 w-12  p-2 flex items-center justify-center rounded-md shadow-md shadow-gray-300 `}
                      >
                        <img
                          src={item.avatar ? item.avatar : profile}
                          className="w-8 h-8 rounded-[50%]"
                        />
                      </div>
                      <div className="text-sm flex flex-col w-[90%] ">
                        <h2 className=" text-gray-600 font-semibold overflow-hidden whitespace-nowrap text-ellipsis flex items-center justify-start gap-1">
                          <span>{item.fullName}</span>
                        </h2>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="mt-2 w-full flex items-center justify-end gap-3">
                <button
                  className="px-5 py-2 bg-gray-300 rounded-md"
                  onClick={() => {
                    setSearch("");
                    setSelected(null);
                    setPopUp(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="px-5 py-2  bg-graidient_bottom text-white rounded-md"
                  onClick={() => {
                    addMember();
                    setSearch("");
                    setPopUp(false);
                    setSelected(null);
                  }}
                >
                  Add Member
                </button>
              </div>
            </div>
          </div>
        )}
        {subscribeModal && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-40 flex justify-center items-center z-50">
            <div className="inline-flex justify-center items-center p-10 rounded-[0.9375rem] bg-white border border-gray-300">
              <div className="flex flex-col justify-center items-center gap-10">
                <div className="flex flex-col items-start gap-6">
                  <div className="text-[#1f1f1f] text-xl font-semibold">
                    Subscribe to{" "}
                    {subscribePlan === "monthly" ? "Monthly" : "Yearly"} Plan
                  </div>

                  <div className="flex flex-col gap-4 w-[400px]">
                    <div className="flex justify-between items-center">
                      <div className="text-[#8c8c8c]">Plan</div>
                      <div className="text-[#1f1f1f] font-medium">
                        {subscribePlan === "monthly" ? "Monthly" : "Yearly"}
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="text-[#8c8c8c]">Price per user</div>
                      <div className="text-[#1f1f1f] font-medium">
                        ${subscribePlan === "monthly" ? "10/month" : "120/year"}
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-2">
                        <svg
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M15.6364 19V17.5556C15.6364 16.7894 15.3299 16.0546 14.7843 15.5128C14.2388 14.971 13.4988 14.6667 12.7273 14.6667H6.90909C6.13755 14.6667 5.39761 14.971 4.85205 15.5128C4.30649 16.0546 4 16.7894 4 17.5556V19M20 19V17.5556C19.9995 16.9155 19.785 16.2937 19.3901 15.7878C18.9952 15.2819 18.4423 14.9206 17.8182 14.7606M14.9091 6.09389C15.5348 6.253 16.0895 6.6144 16.4856 7.12111C16.8816 7.62783 17.0966 8.25104 17.0966 8.8925C17.0966 9.53396 16.8816 10.1572 16.4856 10.6639C16.0895 11.1706 15.5348 11.532 14.9091 11.6911M12.7273 8.88889C12.7273 10.4844 11.4248 11.7778 9.81818 11.7778C8.21154 11.7778 6.90909 10.4844 6.90909 8.88889C6.90909 7.2934 8.21154 6 9.81818 6C11.4248 6 12.7273 7.2934 12.7273 8.88889Z"
                            stroke="#8C8C8C"
                            strokeWidth="1.7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="text-[#8c8c8c]">Team Size</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          className="p-2 rounded-md hover:bg-gray-100"
                          onClick={() =>
                            setSubscribeTeamSize(
                              Math.max(1, subscribeTeamSize - 1)
                            )
                          }
                        >
                          <svg
                            width={20}
                            height={20}
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5 10H15"
                              stroke="#525252"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </button>
                        <div className="w-12 text-center text-[#1f1f1f] font-medium">
                          {subscribeTeamSize}
                        </div>
                        <button
                          className="p-2 rounded-md hover:bg-gray-100"
                          onClick={() =>
                            setSubscribeTeamSize(subscribeTeamSize + 1)
                          }
                        >
                          <svg
                            width={20}
                            height={20}
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10 5V15M5 10H15"
                              stroke="#525252"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                      <div className="text-[#1f1f1f] font-semibold">Total</div>
                      <div className="text-[#df064e] text-2xl font-bold">
                        $
                        {(subscribePlan === "monthly" ? 10 : 120) *
                          subscribeTeamSize}
                        <span className="text-sm text-[#8c8c8c] font-normal">
                          /{subscribePlan === "monthly" ? "month" : "year"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center items-center gap-4">
                  <button
                    className="px-5 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                    onClick={() => {
                      setSubscribeModal(false);
                      setSubscribeTeamSize(1);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-5 py-2 bg-[#df064e] text-white rounded-md hover:bg-[#c0054a]"
                    onClick={confirmSubscription}
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-start gap-4 text-xl w-full px-6 mt-8 mb-4">
          <button onClick={() => navigate(-1)} className="flex items-center">
            <FaArrowLeft className="w-4 h-4" />
          </button>
          <h1 className="flex items-center gap-2">
            <BiReceipt className=" mr-1" /> Subscription
          </h1>
        </div>
        <div className="w-full px-6 flex justify-center gap-10 mt-7">
          {/* Monthly Plan */}
          <div
            className={`flex flex-col justify-center items-center gap-10 p-10 w-full rounded-[0.9375rem] border-[0.8px] bg-white transition-all duration-200 ${
              user.subscription === "monthly"
                ? "border-[#df064e] shadow-md shadow-pink-100"
                : "border-gray-200"
            }`}
          >
            <div className="flex justify-between items-start w-full">
              <div className="flex flex-col flex-shrink-0 items-start gap-2">
                <div className="text-[#1f1f1f] text-xl font-medium leading-[normal]">
                  Monthly Plan
                </div>
                <div className="text-[#717171] text-sm leading-[normal]">
                  30 days validity
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="text-[#8c8c8c] text-sm leading-[normal]">
                  $10 per user/month
                </div>
                {user.subscription === "monthly" && (
                  <div className="text-[#df064e] text-lg font-semibold">
                    ${10 * (user.teamSize || 1)}/month total
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4 w-full">
              {user.subscription === "monthly" ? (
                <button
                  onClick={CancelSubscription}
                  className="h-[34px] flex justify-center items-center gap-2 px-4 rounded-[0.3125rem] border-[0.5px] border-[#df064e] bg-white text-[#df064e] text-sm font-medium leading-[normal] cursor-pointer"
                >
                  Cancel Subscription
                </button>
              ) : (
                <div
                  onClick={() => handleNewSubscription("monthly")}
                  className="flex justify-center items-center gap-2 py-2 px-4 rounded-[0.3125rem] bg-[#df064e] text-white text-sm font-medium leading-[normal] cursor-pointer"
                >
                  {user.subscription === "yearly"
                    ? "Switch to Monthly"
                    : "Subscribe Monthly"}
                </div>
              )}
            </div>
          </div>

          {/* Yearly Plan */}
          <div
            className={`flex flex-col justify-center items-center gap-10 p-10 w-full rounded-[0.9375rem] border-[0.8px] bg-white transition-all duration-200 ${
              user.subscription === "yearly"
                ? "border-[#df064e] shadow-md shadow-pink-100"
                : "border-gray-200"
            }`}
          >
            <div className="flex justify-between items-start w-full">
              <div className="flex flex-col flex-shrink-0 items-start gap-2">
                <div className="text-[#1f1f1f] text-xl font-medium leading-[normal]">
                  Yearly Plan
                </div>
                <div className="text-[#717171] text-sm leading-[normal]">
                  365 days validity
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="text-[#8c8c8c] text-sm leading-[normal]">
                  $120 per user/year
                </div>
                {user.subscription === "yearly" && (
                  <div className="text-[#df064e] text-lg font-semibold">
                    ${120 * (user.teamSize || 1)}/year total
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4 w-full">
              {user.subscription === "yearly" ? (
                <button
                  onClick={CancelSubscription}
                  className="h-[34px] flex justify-center items-center gap-2 px-4 rounded-[0.3125rem] border-[0.5px] border-[#df064e] bg-white text-[#df064e] text-sm font-medium leading-[normal] cursor-pointer"
                >
                  Cancel Subscription
                </button>
              ) : (
                <div
                  onClick={() => handleNewSubscription("yearly")}
                  className="flex justify-center items-center gap-2 py-2 px-4 rounded-[0.3125rem] bg-[#df064e] text-white text-sm font-medium leading-[normal] cursor-pointer"
                >
                  {user.subscription === "monthly"
                    ? "Switch to Yearly"
                    : "Subscribe Yearly"}
                </div>
              )}
            </div>
          </div>
        </div>

        {(user.subscription === "monthly" ||
          user.subscription === "yearly") && (
          <div className="w-full px-6 mt-5">
            <div className="w-full flex items-center justify-between mb-4">
              <h1 className="flex items-center gap-3 text-[20px] font-normal">
                <div className="w-8 h-8 flex items-center justify-center rounded-md">
                  <FaUsers />
                </div>
                Manage Team ({members.length + 1}/{user.teamSize || 1})
              </h1>
              {members.length < (user.teamSize || 1) - 1 && (
                <button
                  onClick={() => {
                    getAllUsers();
                    setPopUp(true);
                  }}
                  className="px-4 py-1 border border-graidient_bottom rounded-md text-graidient_bottom"
                >
                  Add Member
                </button>
              )}
            </div>
            <div className="w-full rounded-[0.625rem] border border-[#e0e0e0] bg-[#ede4dc]/30 overflow-hidden">
              <table className="w-full">
                <thead className="h-16 bg-[#eee] border-b border-[#e0e0e0] sticky top-0">
                  <tr>
                    <th className="pl-3 pr-5 py-1 text-left">
                      <div
                        className="flex items-center gap-2 w-[12.5rem] cursor-pointer"
                        onClick={() => handleSort("fullName")}
                      >
                        <span className="text-neutral-600 font-medium">
                          Username
                        </span>
                        {sortBy === "fullName" ? (
                          sortOrder === "asc" ? (
                            <FaArrowDown className="w-3 h-3 text-neutral-600" />
                          ) : (
                            <FaArrowDown className="w-3 h-3 text-neutral-600 transform rotate-180" />
                          )
                        ) : (
                          <FaArrowDown className="w-3 h-3 text-neutral-600 opacity-50" />
                        )}
                      </div>
                    </th>
                    <th className="px-2 py-1 text-left">
                      <div
                        className="flex items-center gap-2 w-[10.875rem] cursor-pointer"
                        onClick={() => handleSort("email")}
                      >
                        <span className="text-neutral-600 font-medium">
                          Gmail
                        </span>
                        {sortBy === "email" ? (
                          sortOrder === "asc" ? (
                            <FaArrowDown className="w-3 h-3 text-neutral-600" />
                          ) : (
                            <FaArrowDown className="w-3 h-3 text-neutral-600 transform rotate-180" />
                          )
                        ) : (
                          <FaArrowDown className="w-3 h-3 text-neutral-600 opacity-50" />
                        )}
                      </div>
                    </th>
                    <th className="px-5 py-1 text-right">
                      <div className="flex items-center gap-4 justify-end p-2">
                        <div className="w-4 h-4" />
                        <div className="w-4 h-4" />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedMembers.map((item, index) => (
                    <tr
                      key={item._id}
                      className={`border-b border-b-[#e0e0e0] ${
                        index % 2 === 0 ? "bg-[#fefefe]" : "bg-[#f7f7f7]"
                      }`}
                    >
                      <td className="py-1 pl-3 pr-5">
                        <div className="flex items-center gap-2 w-[12.5rem]">
                          <span className="text-sm text-gray-700">
                            {item.fullName}
                          </span>
                        </div>
                      </td>
                      <td className="py-1 px-2">
                        <div className="flex items-center gap-0.5 w-[10.875rem]">
                          <span className="text-sm text-gray-700">
                            {item.email}
                          </span>
                        </div>
                      </td>
                      <td className="py-1 px-5 text-right">
                        <div className="flex items-center gap-4 justify-end">
                          <RiDeleteBinLine
                            onClick={() => deleteMember(item._id)}
                            className="text-gray-600 text-lg hover:text-graidient_bottom cursor-pointer"
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <h1 className="mb-4 flex items-center justify-start gap-2 text-xl mt-8 w-full px-6">
          <BiReceipt className=" mr-1" /> Billing history
        </h1>
        {/* Billing history table */}
        <div className="w-full px-6 mb-10">
          <div className="w-full mt-4 rounded-[0.625rem] border border-[#e0e0e0] bg-[#ede4dc]/30 overflow-hidden">
            <table className="w-full">
              <thead className="h-16 bg-[#eee] border-b border-[#e0e0e0] sticky top-0">
                <tr>
                  <th className="pl-3 pr-5 py-1 text-left">
                    <div
                      className="flex items-center gap-2 w-[12.5rem] cursor-pointer"
                      onClick={() => handleBillingSort("invoice")}
                    >
                      <span className="text-neutral-600 font-medium">
                        Invoice
                      </span>
                      {sortColumn === "invoice" ? (
                        sortDirection === "asc" ? (
                          <FaArrowDown className="w-3 h-3 text-neutral-600" />
                        ) : (
                          <FaArrowDown className="w-3 h-3 text-neutral-600 transform rotate-180" />
                        )
                      ) : (
                        <FaArrowDown className="w-3 h-3 text-neutral-600 opacity-50" />
                      )}
                    </div>
                  </th>
                  <th className="px-2 py-1 text-left">
                    <div
                      className="flex items-center gap-2 w-[9.25rem] cursor-pointer"
                      onClick={() => handleBillingSort("billingDate")}
                    >
                      <span className="text-neutral-600 font-medium">
                        Billing date
                      </span>
                      {sortColumn === "billingDate" ? (
                        sortDirection === "asc" ? (
                          <FaArrowDown className="w-3 h-3 text-neutral-600" />
                        ) : (
                          <FaArrowDown className="w-3 h-3 text-neutral-600 transform rotate-180" />
                        )
                      ) : (
                        <FaArrowDown className="w-3 h-3 text-neutral-600 opacity-50" />
                      )}
                    </div>
                  </th>
                  <th className="px-2 py-1 text-left">
                    <div
                      className="flex items-center gap-2 w-[9.25rem] cursor-pointer"
                      onClick={() => handleBillingSort("endDate")}
                    >
                      <span className="text-neutral-600 font-medium">
                        End date
                      </span>
                      {sortColumn === "endDate" ? (
                        sortDirection === "asc" ? (
                          <FaArrowDown className="w-3 h-3 text-neutral-600" />
                        ) : (
                          <FaArrowDown className="w-3 h-3 text-neutral-600 transform rotate-180" />
                        )
                      ) : (
                        <FaArrowDown className="w-3 h-3 text-neutral-600 opacity-50" />
                      )}
                    </div>
                  </th>
                  <th className="px-2 py-1 text-left">
                    <div
                      className="flex items-center gap-2 w-[8.25rem] cursor-pointer"
                      onClick={() => handleBillingSort("plan")}
                    >
                      <span className="text-neutral-600 font-medium">Plan</span>
                      {sortColumn === "plan" ? (
                        sortDirection === "asc" ? (
                          <FaArrowDown className="w-3 h-3 text-neutral-600" />
                        ) : (
                          <FaArrowDown className="w-3 h-3 text-neutral-600 transform rotate-180" />
                        )
                      ) : (
                        <FaArrowDown className="w-3 h-3 text-neutral-600 opacity-50" />
                      )}
                    </div>
                  </th>
                  <th className="px-2 py-1 text-left">
                    <div
                      className="flex items-center gap-2 w-[6.25rem] cursor-pointer"
                      onClick={() => handleBillingSort("amount")}
                    >
                      <span className="text-neutral-600 font-medium">
                        Amount
                      </span>
                      {sortColumn === "amount" ? (
                        sortDirection === "asc" ? (
                          <FaArrowDown className="w-3 h-3 text-neutral-600" />
                        ) : (
                          <FaArrowDown className="w-3 h-3 text-neutral-600 transform rotate-180" />
                        )
                      ) : (
                        <FaArrowDown className="w-3 h-3 text-neutral-600 opacity-50" />
                      )}
                    </div>
                  </th>
                  <th className="px-2 py-1 text-left">
                    <div
                      className="flex items-center gap-2 w-[6.25rem] cursor-pointer"
                      onClick={() => handleBillingSort("users")}
                    >
                      <span className="text-neutral-600 font-medium">
                        Users
                      </span>
                      {sortColumn === "users" ? (
                        sortDirection === "asc" ? (
                          <FaArrowDown className="w-3 h-3 text-neutral-600" />
                        ) : (
                          <FaArrowDown className="w-3 h-3 text-neutral-600 transform rotate-180" />
                        )
                      ) : (
                        <FaArrowDown className="w-3 h-3 text-neutral-600 opacity-50" />
                      )}
                    </div>
                  </th>
                  <th className="px-5 py-1 text-right">
                    <div className="flex items-center gap-4 justify-end p-2">
                      <div className="w-4 h-4" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedBillingHistory.map((item, index) =>
                  item === null ? (
                    <></>
                  ) : (
                    <tr
                      key={index}
                      className={`border-b border-b-[#e0e0e0] ${
                        index % 2 === 0 ? "bg-[#fefefe]" : "bg-[#f7f7f7]"
                      }`}
                    >
                      <td className="py-1 pl-3 pr-5">
                        <div className="flex items-center gap-2 w-[12.5rem]">
                          <span className="text-sm text-[#1f1f1f]">
                            {item.invoice}
                          </span>
                        </div>
                      </td>
                      <td className="py-1 px-2">
                        <div className="flex items-center gap-0.5 w-[9.25rem]">
                          <span className="text-sm text-[#1f1f1f]">
                            {new Date(item.billingDate).toLocaleDateString()}
                          </span>
                        </div>
                      </td>
                      <td className="py-1 px-2">
                        <div className="flex items-center gap-0.5 w-[9.25rem]">
                          <span className="text-sm text-[#1f1f1f]">
                            {new Date(item.endDate).toLocaleDateString()}
                          </span>
                        </div>
                      </td>
                      <td className="py-1 px-2">
                        <div className="flex items-center gap-0.5 w-[8.25rem]">
                          <span className="text-sm text-[#1f1f1f]">
                            {item.plan}
                          </span>
                        </div>
                      </td>
                      <td className="py-1 px-2">
                        <div className="flex items-center gap-0.5 w-[6.25rem]">
                          <span className="text-sm text-[#1f1f1f]">
                            {item.amount}
                          </span>
                        </div>
                      </td>
                      <td className="py-1 px-2">
                        <div className="flex items-center gap-0.5 w-[6.25rem]">
                          <span className="text-sm text-[#1f1f1f]">
                            {item.users}
                          </span>
                        </div>
                      </td>
                      <td className="py-1 px-5 text-right">
                        <div className="flex items-center gap-4 justify-end">
                          <svg
                            width={16}
                            height={16}
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M15 9V8H12V13H13V11H14.5V10H13V9H15ZM9.5 13H7.5V8H9.5C9.8977 8.0004 10.279 8.15856 10.5602 8.43978C10.8414 8.721 10.9996 9.1023 11 9.5V11.5C10.9996 11.8977 10.8414 12.279 10.5602 12.5602C10.279 12.8414 9.8977 12.9996 9.5 13ZM8.5 12H9.5C9.63261 12 9.75979 11.9473 9.85355 11.8536C9.94732 11.7598 10 11.6326 10 11.5V9.5C10 9.36739 9.94732 9.24021 9.85355 9.14645C9.75979 9.05268 9.63261 9 9.5 9H8.5V12ZM5.5 8H3V13H4V11.5H5.5C5.76509 11.4996 6.01922 11.3941 6.20667 11.2067C6.39412 11.0192 6.4996 10.7651 6.5 10.5V9C6.5 8.73478 6.39464 8.48043 6.20711 8.29289C6.01957 8.10536 5.76522 8 5.5 8ZM4 10.5V9H5.5L5.5005 10.5H4Z"
                              fill="#525252"
                            />
                            <path
                              d="M11 7.00023V5.00023C11.0018 4.93452 10.9893 4.8692 10.9634 4.80878C10.9375 4.74836 10.8988 4.69427 10.85 4.65023L7.35 1.15023C7.30617 1.10116 7.25212 1.0623 7.19165 1.03638C7.13118 1.01047 7.06576 0.998127 7 1.00023H2C1.73503 1.00102 1.48113 1.10663 1.29377 1.294C1.1064 1.48136 1.00079 1.73526 1 2.00023V14.0002C1 14.2654 1.10536 14.5198 1.29289 14.7073C1.48043 14.8949 1.73478 15.0002 2 15.0002H10V14.0002H2V2.00023H6V5.00023C6.00079 5.2652 6.1064 5.5191 6.29377 5.70646C6.48113 5.89383 6.73503 5.99944 7 6.00023H10V7.00023H11ZM7 5.00023V2.20023L9.8 5.00023H7Z"
                              fill="#525252"
                            />
                          </svg>
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Subscription;
