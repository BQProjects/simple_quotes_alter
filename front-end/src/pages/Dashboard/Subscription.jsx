import React, { useContext, useState, useEffect } from "react";
import { BiReceipt } from "react-icons/bi";
import { CiCreditCard1 } from "react-icons/ci";
import { MdOutlinePeopleOutline } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { UserContext } from "../../context/UserContext";
import { DatabaseContext } from "../../context/DatabaseContext";
import axios from "axios";
import profile from "../../assets/profile.png";
import { RiDeleteBinLine } from "react-icons/ri";
import toast from "react-hot-toast";

const Subscription = () => {
  const [plan, setPlan] = useState("yearly");
  const { user } = useContext(UserContext);
  const { databaseUrl } = useContext(DatabaseContext);
  const [users, setUsers] = useState([]);
  const [popUp, setPopUp] = useState(false);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [members, setMembers] = useState([]);
  const getUsers = async () => {
    try {
      const res = await axios.get(`${databaseUrl}/api/workspace/getallusers`, {
        params: { user_id: user.id },
      });
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching workspaces:", error);
    }
  };

  const createSubscription = async () => {
    try {
      const res = await axios.post(
        `${databaseUrl}/api/auth/changeSubscription`,
        {
          subscription: plan,
          subscriptionDate: new Date(),
          user_id: user.id,
        }
      );
      console.log(res.data);
      toast.success(
        "Congratualations! for purchasing simple quotes membership"
      );
    } catch (error) {
      console.error("Error fetching workspaces:", error);
    }
  };

  const CancelSubscription = async () => {
    try {
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
  const addMember = async () => {
    try {
      const res = await axios.post(`${databaseUrl}/api/auth/addmem`, {
        user_id: user.id,
        new_user: selected,
      });
      setMembers([...members, res.data]);
    } catch (error) {
      console.error("Error fetching workspaces:", error);
    }
  };
  useEffect(() => {
    getMembers();
  }, []);
  useEffect(() => {
    getUsers();
  }, []);
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
                  ?.filter((item) =>
                    item.fullName
                      .toLowerCase()
                      .includes(search?.toLowerCase() || "")
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
                  className="px-5 py-2  bg-gray-300 rounded-md"
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
        <h1 className="mb-4 flex items-center justify-start gap-2 text-xl mt-8 w-full pl-10">
          <BiReceipt className=" mr-1" /> Subscription
        </h1>
        <div className="w-[90%] flex justify-center gap-10 mt-7">
          <div className="w-[46%] border border-gray-200 rounded-lg p-4 py-7">
            <div className="flex justify-between">
              <div className=" border border-gray-100 p-[3px]">
                <button
                  onClick={() => setPlan("yearly")}
                  className={`px-4 py-2 ${
                    plan === "yearly"
                      ? "bg-graidient_bottom text-white  "
                      : "none text-gray-700"
                  } rounded-lg`}
                >
                  Yearly
                </button>
                <button
                  onClick={() => setPlan("monthly")}
                  className={`px-4 py-1  ${
                    plan === "monthly"
                      ? "bg-graidient_bottom text-white  "
                      : "none text-gray-700"
                  } rounded-lg`}
                >
                  Monthly
                </button>
              </div>
              <div className="flex gap-2 items-center">
                <p className="text-gray-500 ">15$</p>
                <p className="text-gray-600 bg-gray-100 px-2 py-1 rounded-lg">
                  save 20%
                </p>
              </div>
            </div>
            <div className="flex mt-7 items-center justify-between">
              <h2 className="ml-2 flex items-center gap-2 text-gray-600 text-lg ">
                <CiCreditCard1 className="text-2xl" />
                Billing Plan
              </h2>
              <p className="text-2xl flex items-center text-gray-700">
                {10 * (members.length + 1)}$
                <span className="text-gary-500 text-sm mr-3">/month</span>
              </p>
            </div>
            <div className="flex mt-7 items-center justify-between">
              <h2 className="ml-2 flex items-center gap-2 text-gray-600 text-lg ">
                <MdOutlinePeopleOutline />
                Team Size
              </h2>
              <input
                type="number"
                className="w-12 px-1 py-1 border border-gray-200 outline-none rounded-md mr-3"
                value={members.length + 1}
                readOnly={true}
              />
            </div>

            <div className="w-full flex justify-center ">
              {user.subscription !== "monthly" &&
              user.subscription !== "yearly" &&
              user.subscription !== "shared" ? (
                <button
                  onClick={() => createSubscription()}
                  className="w-[90%] text-center py-2 border border-graidient_bottom rounded-md text-graidient_bottom mt-7 flex items-center gap-2 justify-center"
                >
                  Start New Plan <FaArrowRight />
                </button>
              ) : (
                <button
                  onClick={() => CancelSubscription()}
                  className="w-[90%] text-center py-2 border border-graidient_bottom rounded-sm text-graidient_bottom mt-7 flex items-center gap-2 justify-center"
                >
                  Cancel Plan
                </button>
              )}
            </div>
          </div>
          <div className="w-[46%] border border-gray-200 rounded-lg px-6 py-7 flex flex-col  gap-2">
            <h2 className="mt-2 mb-5 text-lg text-gray-700 w-full text-center">
              Everything You Need – One Plan, Full Access
            </h2>
            <p className="ml-3 text-gray-500 flex items-center gap-2">
              {" "}
              <FaCheck className="text-graidient_bottom" />
              Unlimited proposals
            </p>
            <p className="ml-3 text-gray-500 flex items-center gap-2">
              <FaCheck className="text-graidient_bottom" /> Real-time proposal
              analytics
            </p>
            <p className="ml-3 text-gray-500 flex items-center gap-2">
              <FaCheck className="text-graidient_bottom" />
              100+ professionally designed templates
            </p>
            <p className="ml-3 text-gray-500 flex items-center gap-2">
              <FaCheck className="text-graidient_bottom" />
              User roles & team collaboration
            </p>
            <p className="ml-3 text-gray-500 flex items-center gap-2">
              <FaCheck className="text-graidient_bottom" /> Shared access to
              proposals & assets
            </p>
          </div>
        </div>
        <div className="w-[87%] flex flex-col items-center mt-7 border border-gray-200 rounded-md p-6    ">
          <div className="text-lg flex items-center gap-4 text-gray-700 w-full justify-start">
            <CiCreditCard1 className="text-3xl text-graidient_bottom" /> Current
            Plan
          </div>
          <div className="flex mt-3 items-center justify-between w-[90%]">
            <h2 className="ml-2 flex items-center gap-2 text-gray-700 text-lg ">
              Price
            </h2>
            <p className="text-2xl flex items-center text-gray-700">
              {user.subscription === "trial" ? "10" : (members.length + 1) * 10}
              $<span className="text-gary-500 text-sm mr-3">/month</span>
            </p>
          </div>
          <div className="flex mt-3 w-[90%] items-center justify-between">
            <h2 className="ml-2 flex items-center gap-2 text-gray-600 text-lg  ">
              Billed
            </h2>
            <p className="text-xl flex items-center text-gray-700 mr-8 text-start">
              {user.subscription === "trial"
                ? "Trail"
                : user.subscription === "monthly"
                ? "Monthly"
                : user.subscription === "yearly"
                ? "Yearly"
                : user.subscription === "canceled"
                ? "Canceled"
                : user.subscription === "shared"
                ? "Shared"
                : "Expired"}
            </p>
          </div>
          <div className="flex mt-3 items-center justify-between w-[90%]">
            <h2 className="ml-2 flex items-center gap-2 text-gray-600 text-lg ">
              Start Date
            </h2>
            <p className="text-xl flex items-center text-gray-700 text-start">
              {new Date(user.subscriptionDate || Date.now()).toLocaleDateString(
                "en-US",
                {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }
              )}
            </p>
          </div>
          <div className="flex mt-3 items-center justify-between w-[90%]">
            <h2 className="ml-2 flex items-center gap-2 text-gray-600 text-lg ">
              End Date
            </h2>
            <p className="text-xl flex items-center text-gray-700 text-start">
              {user.subscription === "trial"
                ? new Date(
                    new Date(user.subscriptionDate).setDate(
                      new Date(user.subscriptionDate).getDate() + 14
                    )
                  ).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : new Date(
                    user.subscriptionEnd || Date.now()
                  ).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
            </p>
          </div>
          <div className="flex mt-3 items-center justify-between w-[90%]">
            <h2 className="ml-2 flex items-center gap-2 text-gray-600 text-lg ">
              Team Size
            </h2>
            <p className="text-xl flex items-center text-gray-700">
              {user.subscription === "trial" ? "1" : members.length + 1} Members
            </p>
          </div>
        </div>
        <div className="w-[87%] flex flex-col items-center mt-7 border border-gray-200 rounded-md p-6    ">
          <div className="text-lg flex items-center gap-4 text-gray-700 w-full justify-start">
            <CiCreditCard1 className="text-3xl text-graidient_bottom" />
            Invoices
          </div>
          <div className="flex mt-3 items-center justify-between w-[90%]">
            <h2 className="ml-2 flex items-center gap-2 text-gray-700 text-lg ">
              Invoice 1
            </h2>
            <button className="px-4 py-1 border border-graidient_bottom rounded-md text-graidient_bottom">
              Download
            </button>
          </div>
          <div className="flex mt-3 w-[90%] items-center justify-between">
            <h2 className="ml-2 flex items-center gap-2 text-gray-600 text-lg  ">
              Invoice 2
            </h2>
            <button className="px-4 py-1 border border-graidient_bottom rounded-md text-graidient_bottom">
              Download
            </button>
          </div>
        </div>
        {user.subscription !== "shared" && (
          <div className="w-[87%] flex flex-col items-center mt-5  rounded-md py-4   ">
            <div className="flex items-center justify-end w-[97%]">
              {user.subscription !== "monthly" &&
                user.subscription !== "yearly" && (
                  <button
                    onClick={() => setPopUp(true)}
                    className="px-4 py-1 border border-graidient_bottom rounded-md text-graidient_bottom"
                  >
                    Add Member
                  </button>
                )}
            </div>
            <table className="auto-table w-full mt-5 mb-20  ">
              <thead className="h-12 bg-gray-100 text-left text-gray-500  text-sm font-semibold sticky top-0 rounded-md">
                <tr>
                  <th className="text-center">Username</th>
                  <th className=" text-center">Gmail</th>
                  <th className=" text-center">Quick Actions</th>
                </tr>
              </thead>
              <tbody>
                {members.map((item, index) => {
                  return (
                    <tr key={item._id}>
                      <td className="pl-10">{item.fullName}</td>
                      <td className="text-center">{item.email}</td>
                      <td className="text-center flex justify-center">
                        <RiDeleteBinLine
                          onClick={() => deleteMember(item._id)}
                          className="text-gray-600 text-lg hover:text-graidient_bottom cursor-pointer"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default Subscription;
