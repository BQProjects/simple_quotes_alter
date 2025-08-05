import React, { useContext, useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DropCanvas from "./DropCanvas";
import axios from "axios";
import { DatabaseContext } from "../../context/DatabaseContext";
import { useParams } from "react-router-dom";
import GeneratePDF from "./GeneratePDF";
import { useRouteTracker } from "../../components/useRouteTracker";
import ScrollSectionTracker from "../../components/ScrollSectionTracker";

const Preview = () => {
  const { databaseUrl } = useContext(DatabaseContext);
  const { id } = useParams();
  const [rows, setRows] = useState([]);
  const [data, setData] = useState([]);
  const [settings, setSettings] = useState(null);
  const [timeStore, setTimeStore] = useState({});
  const [os, setOS] = useState("");
  const [browser, setBrowser] = useState("");
  const [country, setCountry] = useState("");
  const [sta, setSta] = useState("");
  const [totalTime, setTotalTime] = useState(0);
  useRouteTracker(
    `/view/${id}`,
    timeStore,
    setOS,
    setBrowser,
    setCountry,
    setSta,
    setTotalTime,
    (timeSpent) => {
      setTotalTime(timeSpent); // this will now work safely
    }
  );

  const handleViews = async () => {
    try {
      await axios.put(`${databaseUrl}/api/editor/views`, {
        id: id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleViews();
  }, []);

  useEffect(() => {
    getProposal();
  }, []);

  const handleGeneratePdf = () => {
    GeneratePDF(data);
  };

  const getProposal = async () => {
    try {
      await axios
        .get(`${databaseUrl}/api/editor/getsingle`, {
          params: { id: id }, // Pass parameters correctly
        })
        .then((res) => {
          setRows(res.data.data);
          setData(res.data.data);
          setSettings(res.data.settings);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const groupDataByHeading = (data) => {
    const groups = [];
    let currentGroup = null;

    data.forEach((item) => {
      if (item.type === "heading") {
        if (currentGroup) groups.push(currentGroup);
        const headingText =
          item.content?.[0]?.children?.[0]?.text || "Untitled";
        currentGroup = { heading: headingText, items: [item] };
      } else {
        if (!currentGroup) {
          // If there's no heading yet, create a "default" group
          currentGroup = { heading: "Untitled Section", items: [] };
        }
        currentGroup.items.push(item);
      }
    });

    if (currentGroup) groups.push(currentGroup);
    return groups;
  };

  const grouped = groupDataByHeading(rows);

  return (
    <div className="w-full h-screen overflow-auto">
      <DndProvider backend={HTML5Backend}>
        <div className=" relative flex w-full justify-center  overflow-auto border-4 border-gray-300">
          <DropCanvas
            preview={true}
            rows={rows}
            settings={settings}
            setRows={setRows}
          />
          <div style={{ position: "relative", height: "100%" }}>
            <ScrollSectionTracker
              groupedData={grouped}
              setTimeStore={setTimeStore}
              os={os}
              browser={browser}
              country={country}
              sta={sta}
              totalTime={totalTime}
              id={id}
            />
          </div>
        </div>
        <button onClick={handleGeneratePdf}>Generate Pdf</button>
      </DndProvider>
    </div>
  );
};

export default Preview;
