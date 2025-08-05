import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";
import { DatabaseContext } from "./DatabaseContext";

export const StateManageContext = createContext({});

export function StateManageContextProvider({ children }) {
  const [costModule, setCostModeule] = useState(false);
  const [sign, setSign] = useState(false);
  const [priceTerms, setPriceTerms] = useState(false);
  const [signEdit, setSignEdit] = useState(null);
  const [costModuleEdit, setCostMouleEdit] = useState(null);
  const [priceTermsEdit, setPriceTermsEdit] = useState(null);
  const [scrollIndex, setScrollIndex] = useState(null);
  const [newProposal, setNewProposal] = useState(false);
  const [sortW, setSortW] = useState("default");
  const [workspaces, setWorkspaces] = useState([]);
  const { user } = useContext(UserContext);
  const { databaseUrl } = useContext(DatabaseContext);
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortP, setSortP] = useState("default");
  const [undo, setUndo] = useState([]);
  const [redo, setRedo] = useState([]);
  const [redoA, setRedoA] = useState(false);
  const [que, setQue] = useState([]);
  const [historyPreview, setHistoryPreview] = useState(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (user?.id && databaseUrl) {
      getWorkspaces();
    }
  }, [user?.id, databaseUrl, sortW]);

  const getWorkspaces = async () => {
    try {
      const res = await axios.get(
        `${databaseUrl}/api/workspace/getallworkspaces`,
        {
          params: { user_id: user.id, sortw: sortW },
        }
      );
      console.log(res.data);
      setWorkspaces(res.data);
    } catch (error) {
      console.error("Error fetching workspaces:", error);
      setError("Failed to fetch workspaces. Please try again later.");
    }
  };

  useEffect(() => {
    if (user?.id && databaseUrl) {
      getProposals();
    }
  }, [user?.id, databaseUrl, sortP]);

  const getProposals = async () => {
    try {
      const res = await axios.get(`${databaseUrl}/api/workspace/getproposals`, {
        params: { user_id: user.id, sort: sortP },
      });

      setProposals(res.data);
    } catch (error) {
      console.error("Error fetching workspaces:", error);
    }
  };
  return (
    <StateManageContext.Provider
      value={{
        costModule,
        setCostModeule,
        sign,
        setSign,
        priceTerms,
        setPriceTerms,
        signEdit,
        setSignEdit,
        costModuleEdit,
        setCostMouleEdit,
        priceTermsEdit,
        setPriceTermsEdit,
        scrollIndex,
        setScrollIndex,
        newProposal,
        setNewProposal,
        sortW,
        setSortW,
        workspaces,
        setWorkspaces,
        proposals,
        setProposals,
        sortP,
        setSortP,
        undo,
        setUndo,
        redo,
        setRedo,
        redoA,
        setRedoA,
        que,
        setQue,
        historyPreview,
        setHistoryPreview,
        count,
        setCount,
      }}
    >
      {children}
    </StateManageContext.Provider>
  );
}
