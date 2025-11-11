import React, { useContext, useEffect, useState, useRef } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DropCanvas from "./DropCanvas";
import axios from "axios";
import { DatabaseContext } from "../../context/DatabaseContext";
import { useParams } from "react-router-dom";
import GeneratePDF from "./GeneratePDF";
import JsonToWord from "./GenerateWord";
import { useRouteTracker } from "../../components/useRouteTracker";
import ScrollSectionTracker from "../../components/ScrollSectionTracker";
import { StateManageContext } from "../../context/StateManageContext";
import Signiture from "./Signiture";
import { v4 as uuidv4 } from "uuid";
import { UserContext } from "../../context/UserContext";

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
  const { sign, setSign, signEdit, setSignEdit } =
    useContext(StateManageContext);
  const { user } = useContext(UserContext);
  const handleSetRows = (newRows, signedUserId = null) => {
    setRows(newRows);
    updateProposal(newRows, signedUserId);
  };
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
    GeneratePDF(rows, settings);
  };

  const handleGenerateWord = () => {
    JsonToWord(rows, settings);
  };

  const addSign = (data) => {
    const newRows = [
      ...rows,
      { id: uuidv4(), type: "sign", content: data, bookmark: false },
    ];
    handleSetRows(newRows);
    setSign(false);
  };

  const updateProposal = async (updatedRows, signedUserId = null) => {
    try {
      const rowsToUpdate = updatedRows || rows;
      if (rowsToUpdate.length !== 0) {
        const sanitizedRows = JSON.parse(JSON.stringify(rowsToUpdate));
        await axios.put(`${databaseUrl}/api/editor/updateProposal`, {
          id: id,
          rows: sanitizedRows,
          settings: settings,
          signedUserId: signedUserId,
        });
        console.log("Proposal updated successfully");
      }
    } catch (error) {
      console.error("Error updating proposal:", error);
    }
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
          // Add a signature row if not present
          if (!res.data.data.some((row) => row.type === "sign")) {
            const newRows = [
              ...res.data.data,
              {
                id: uuidv4(),
                type: "sign",
                content: [
                  {
                    proposedName: user?.username || "",
                    signed: true,
                  },
                  {
                    acceptedName: "",
                    signed: false,
                  },
                ],
                bookmark: false,
              },
            ];
            handleSetRows(newRows);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const extractHeadingText = (content) => {
    if (!content) return "Untitled";
    if (typeof content === "string") return content;
    if (Array.isArray(content)) {
      // Slate editor format: extract text from children
      return (
        content
          .map((node) => {
            if (node.text) return node.text;
            if (node.children) {
              return node.children.map((child) => child.text || "").join("");
            }
            return "";
          })
          .join("")
          .trim() || "Untitled"
      );
    }
    if (content.text) return content.text;
    return "Untitled";
  };

  const groupDataByHeading = (data) => {
    const groups = [];
    let currentGroup = null;

    data.forEach((item) => {
      if (item.type === "heading") {
        if (currentGroup) groups.push(currentGroup);
        const headingText = extractHeadingText(item.content);
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
            setRows={handleSetRows}
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
        {/* <button
          className="fixed bottom-5 left-4 text-white shadow-sm bg-emerald-600 rounded-md p-1"
          onClick={handleGeneratePdf}
        >
          Generate Pdf
        </button>
        <button
          className="fixed bottom-5 right-4 text-white shadow-sm bg-cyan-600 rounded-md p-1"
          onClick={handleGenerateWord}
        >
          Generate Word
        </button> */}
      </DndProvider>
      {sign && (
        <Signiture
          addSign={addSign}
          rows={rows}
          setRows={handleSetRows}
          signEdit={signEdit}
          setSignEdit={setSignEdit}
          preview={true}
          user={user}
        />
      )}
    </div>
  );
};

export default Preview;
