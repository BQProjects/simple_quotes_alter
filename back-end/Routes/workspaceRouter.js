const express = require("express");
const cors = require("cors");
const {
  workspaceGetAll,
  workspaceGet,
  workspaceCreate,
  workspaceUpdate,
  workspaceDelete,
  getfavorate,
  getProposals,
  workspaceEdit,
  temp,
  createAnalytics,
  getProposal,
  createDuplicate,
  proposalRename,
  proposalMove,
  deleteProposal,
  getAllRecycle,
  deleteRecycle,
  Restore,
  getfavorateW,
  getViews,
  getProfil,
  changeAvatar,
  changeUsername,
  changeCountry,
  changePhone,
  changeAddress,
  changeTime,
  changeCurency,
  changeDataP,
  changeDataA,
  changeDataT,
  changeEmailN,
  changePushN,
  changeWorkspaceN,
  changeProposalN,
  getAllUsers,
  AddTeamForAll,
  AddTeamForLimited,
  getAllMembers,
  addWorkspaceMember,
  DeleteUserToTheWorkspace,
  getAllWorkspacesIncluded,
  editCollab,
  deleteCollabUser,
} = require("../Components/workspceComponent");

const workspace = express.Router();

workspace.use(cors());

workspace.get("/getall", workspaceGetAll);
workspace.get("/single", workspaceGet);
workspace.post("/new", workspaceCreate);
workspace.put("/update", workspaceUpdate);
workspace.get("/getfavorate", getfavorate);
workspace.get("/getproposals", getProposals);
workspace.delete("/deletew/:id", workspaceDelete);
workspace.put("/edit", workspaceEdit);
workspace.post("/temp", temp);
workspace.post("/analytics", createAnalytics);
workspace.get("/proposal", getProposal);
workspace.post("/duplicate", createDuplicate);
workspace.post("/rename", proposalRename);
workspace.post("/move", proposalMove);
workspace.post("/delete", deleteProposal);
workspace.get("/recycle", getAllRecycle);
workspace.post("/recycleDelete", deleteRecycle);
workspace.post("/restore", Restore);

workspace.get("/getfavoratew", getfavorateW);
workspace.get("/getviews", getViews);
workspace.get("/profile", getProfil);
workspace.post("/avatar", changeAvatar);
workspace.post("/username", changeUsername);
workspace.post("/country", changeCountry);
workspace.post("/phone", changePhone);
workspace.post("/address", changeAddress);
workspace.post("/time", changeTime);
workspace.post("/curency", changeCurency);
workspace.post("/datap", changeDataP);
workspace.post("/dataa", changeDataA);
workspace.post("/datat", changeDataT);
workspace.post("/emailn", changeEmailN);
workspace.post("/pushn", changePushN);
workspace.post("/workspacen", changeWorkspaceN);
workspace.post("/proposaln", changeProposalN);
workspace.get("/getallusers", getAllUsers);
workspace.post("/createfull", AddTeamForAll);
workspace.post("/createlim", AddTeamForLimited);
workspace.get("/getallmembers", getAllMembers);
workspace.post("/addusertocollab", addWorkspaceMember);
workspace.post("/removecollabuser", DeleteUserToTheWorkspace);
workspace.get("/getallworkspaces", getAllWorkspacesIncluded);
workspace.post("/editcollab", editCollab);
workspace.post("/deletecollab", deleteCollabUser);

module.exports = workspace;
