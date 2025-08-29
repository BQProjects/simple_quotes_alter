import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Dashboard from "./Dashboard";
import { DatabaseContext } from "../../context/DatabaseContext";
import axios from "axios";
import BarChartComponent from "../../components/BarChartComponent";
import { IoMdArrowRoundBack } from "react-icons/io";
import { SiGoogleanalytics } from "react-icons/si";
import { BsThreeDotsVertical } from "react-icons/bs";

const DashboardAnalytics = () => {
  const [data, setData] = useState({});
  const { id } = useParams();
  const [proposal, setProposal] = useState(null);
  const { databaseUrl } = useContext(DatabaseContext);
  const [slected, setSelected] = useState(null);
  const blockRef = useRef();
  const buttonRef = useRef();
  const [time, setTime] = useState(0);
  const navigate = useNavigate();
  const getProposal = async () => {
    try {
      const res = await axios.get(`${databaseUrl}/api/workspace/proposal`, {
        params: { id: id },
      });

      setProposal(res.data);
      let totalTime = 0;
      let tempData = {};

      res.data.analytics.forEach((item) => {
        if (item.totalTime < 20000) {
          totalTime += item.totalTime;
        }

        Object.entries(item.sectionWise).forEach(([key, value]) => {
          tempData[key] = (tempData[key] || 0) + value;
        });
      });

      setTime(totalTime);
      setData(tempData);

      console.log(res);
    } catch (error) {
      console.error("Error fetching workspaces:", error);
    }
  };
  useEffect(() => {
    getProposal();
  }, []);

  const formatDateTime = (date) => {
    const d = new Date(date);

    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
    const year = d.getFullYear();

    let hours = d.getHours();
    const minutes = String(d.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours === 0 ? 12 : hours; // Convert 0 to 12 for 12 AM/PM

    return (
      <div className="flex-col">
        <h2 className="text-xl text-graidient_bottom">
          {day}/{month}/{year}
        </h2>
        <p className="text-xs text-gray-400">
          {hours}:{minutes}
          {ampm}
        </p>
      </div>
    );
  };

  const formatReadableTime = (timeInSeconds) => {
    const seconds = Math.floor(timeInSeconds);

    if (seconds < 60) {
      return (
        <div className="flex gap-1 justify-start items-end text-xl text-graidient_bottom">
          <h2>{seconds}</h2>
          <p className=" text-graidient_bottom">secs</p>
        </div>
      );
    }

    const minutes = Math.floor(seconds / 60);
    const hours = seconds / 3600;

    if (hours < 1) {
      return (
        <div className="flex gap-1  justify-start items-end text-xl text-graidient_bottom">
          <h2>{minutes}</h2>
          <p className=" text-graidient_bottom">mins</p>
        </div>
      );
    } else {
      return (
        <div className="flex gap-1 justify-start items-end text-xl text-graidient_bottom">
          <h2>{hours.toFixed(1)}</h2>
          <p className=" text-graidient_bottom">hrs</p>
        </div>
      );
    }
  };

  const formatFullDateTime = (date) => {
    const d = new Date(date);

    const datePart = d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const timePart = d.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return (
      <div className="flex flex-col ">
        <h2 className="text-gray-700">{datePart}</h2>
        <p className="text-gray-500 text-xs">{timePart}</p>
      </div>
    );
  };

  const handleClickOutsideBlock = (event) => {
    if (
      blockRef.current &&
      !blockRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setSelected(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideBlock);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideBlock);
    };
  }, []);

  return (
    <>
      <div className="bg-white w-full h-[85vh] flex flex-col items-center overflow-y-auto relative">
        <div className="w-full pt-4 pb-4 px-6 flex gap-4  bg-white sticky top-0 z-50">
          <button className="text-xl" onClick={() => navigate(-1)}>
            <IoMdArrowRoundBack className="text-[#525252]" />
          </button>
          <button className="p-2 px-3 shadow-md shadow-gray-300 rounded-lg text-lg">
            <SiGoogleanalytics className="text-[#525252]" />
          </button>
          <div>
            <h2>Overview Analysis</h2>
            <p>{proposal?.proposalName}</p>
          </div>
        </div>
        <div className="w-[90%] grid grid-cols-4 mt-2">
          <div className="flex flex-col h-20 items-start justify-start border-r border-gray-200 p-3 px-6  ">
            <p className="text-gray-600">Last Viewed</p>
            {proposal?.lastSeen ? formatDateTime(proposal.lastSeen) : "-"}
          </div>
          <div className="flex flex-col h-20 items-start justify-start border-r border-gray-200 p-3 px-6 ">
            <p className="text-gray-600 ">Created</p>
            {proposal?.lastUpdate ? formatDateTime(proposal.createdAt) : "-"}
          </div>
          <div className="flex flex-col h-20 items-start justify-start border-r border-gray-200 p-3 px-6">
            <p className="text-gray-600">Views</p>
            <h2 className="text-xl text-graidient_bottom">{proposal?.views}</h2>
          </div>
          <div className="flex flex-col h-20 items-start justify-start  p-3  px-6">
            <p className="text-gray-600">Total Engagement</p>
            {formatReadableTime(time)}
          </div>
        </div>
        <div>
          <BarChartComponent rawData={data} />
        </div>
        <div className="w-full py-4 px-8 mt-2">
          <h2 className="text-gray-500 text-lg ">Recent Views</h2>
          <table className="table-auto w-full mt-4 ">
            <thead className="bg-gray-100 text-center h-12 rounded-full">
              <tr>
                <th>Opened At</th>
                <th>Time Spent</th>
                <th>Location</th>
                <th>Browser</th>
              </tr>
            </thead>
            <tbody>
              {proposal?.analytics.map(
                (item, idx) =>
                  item.totalTime < 20000 && (
                    <tr
                      key={idx}
                      className={`cursor-pointer ${
                        slected === idx
                          ? " border-2 border-graidient_bottom"
                          : idx % 2 === 1
                          ? "bg-gray-100 border-pink-400"
                          : ""
                      }`}
                      onClick={() => setSelected(idx)}
                    >
                      <td className="flex items-center justify-center h-16">
                        {formatFullDateTime(item.createdAt)}
                      </td>
                      <td className="text-center text-gray-600">
                        {Math.floor(item.totalTime)} sec
                      </td>
                      <td className="text-center text-gray-600">
                        {item.country} <span>|</span> {item.sta}
                      </td>
                      <td className="text-center text-gray-600">
                        {item.browser} <span>|</span> {item.os}
                      </td>
                    </tr>
                  )
              )}
              {/* Modal for section details */}
              {slected !== null && proposal?.analytics[slected] && (
                <div
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30"
                  onClick={() => setSelected(null)}
                >
                  <div
                    className="bg-white rounded-xl shadow-lg max-w-sm relative"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <table className="w-full table-fixed">
                      <thead className="sticky top-0 z-50 h-10 bg-gray-100 rounded-t-xl">
                        <tr className="rounded-t-xl overflow-hidden">
                          <th className="w-1/2 text-left pl-20 font-normal rounded-tl-xl bg-gray-100">
                            Section
                          </th>
                          <th className="w-1/2 text-center font-normal rounded-tr-xl bg-gray-100">
                            Time
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(
                          proposal.analytics[slected].sectionWise
                        ).map(([key, value]) => (
                          <tr key={key} className="h-10 text-gray-500 text-sm">
                            <td className="w-1/2 text-left pl-10">
                              <div className="max-w-28 mx-auto overflow-hidden text-ellipsis whitespace-nowrap">
                                {key}
                              </div>
                            </td>
                            <td className="w-1/2 text-center">
                              {value < 0.01 ? "00" : value.toFixed(2)} sec
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default DashboardAnalytics;
