import React, { Children, useContext, useState } from "react";
import DashboardHeader from "./DashboardHeader";
import DashboardSideBar from "./DashboardSideBar";
import { StateManageContext } from "../../context/StateManageContext";
import NewProposal from "./NewProposal";
import axios from "axios";
import { DatabaseContext } from "../../context/DatabaseContext";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ children }) => {
  const [body, setBody] = useState("home");
  const { newProposal, setNewProposal } = useContext(StateManageContext);
  const { databaseUrl } = useContext(DatabaseContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const handleCreateNewProposal = async (workspace) => {
    console.log(workspace);
    try {
      const response = await axios.post(
        `${databaseUrl}/api/editor/newproposal`,
        {
          email: user.email,
          id: user.id,
          workspace_id: workspace,
          name: "Untitled Proposal",
          settings: {
            heading: "Arieal",
            body: "Arieal",
            header: false,
            footer: false,
            color: "#9b9b9b",
            theme: 0,
          },
        }
      );
      setNewProposal(false);
      navigate(`/editor/${response.data._id}`);
    } catch (error) {
      console.error("Error creating proposal:", error);
    }
  };

  return (
    <div className="h-screen w-full overflow-hidden">
      <DashboardHeader />
      <div
        className="flex flex-row "
        style={{
          backgroundColor: "rgba(245, 245, 245, 1)",
        }}
      >
        <DashboardSideBar setBody={setBody} />
        {newProposal && (
          <NewProposal handleCreateNewProposal={handleCreateNewProposal} />
        )}
        <div className="px-10 pt-5 w-[85%] flex items-start justify-center rounded-lg">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
