import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard.jsx";
import DashboardHome from "../pages/Dashboard/DashboardHome.jsx";
import DashboardDrafts from "../pages/Dashboard/DashboardDrafts.jsx";
import DashboardRecycle from "../pages/Dashboard/DashboardRecycle.jsx";
import DashboardProposals from "../pages/Dashboard/DashboardProposals.jsx";
import DashboardAnalytics from "../pages/Dashboard/DashboardAnalytics.jsx";
import Profile from "../pages/Dashboard/Profile.jsx";
import Subscription from "../pages/Dashboard/Subscription.jsx";
import GeneralSettings from "../pages/Dashboard/GeneralSettings.jsx";
import ManageUsers from "../pages/Dashboard/ManageUsers.jsx";
import { UserContext } from "../context/UserContext.jsx";
import Redirect from "../pages/website/Redirect.jsx";
import Terms from "../pages/website/Terms.jsx";
import ChangePassword from "../pages/website/ChangePassword.jsx";
import ForgotPassWord from "../pages/website/ForgotPassWord.jsx";
const Home = React.lazy(() => import("../pages/website/Home"));
const Signup = React.lazy(() => import("../pages/website/Signup"));
const Pricing = React.lazy(() => import("../pages/website/Pricing"));
const Template = React.lazy(() => import("../pages/website/Template"));
const ContactUs = React.lazy(() => import("../pages/website/ContactUs"));
const Login = React.lazy(() => import("../pages/website/Login.jsx"));
const EditorDnD = React.lazy(() => import("../pages/Editor/EditorDnD.jsx"));
const DashboardFirst = React.lazy(() =>
  import("../pages/Dashboard/DashboardFirst.jsx")
);
const AllWorkspace = React.lazy(() =>
  import("../pages/Dashboard/AllWorkspace.jsx")
);
const Preview = React.lazy(() => import("../pages/Editor/Preview.jsx"));
const WebsiteRoute = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/template" element={<Template />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/changepass/:id" element={<ChangePassword />} />
        <Route path="/forgot" element={<ForgotPassWord />} />

        <Route
          path="/editor/:id"
          element={
            <div className="w-full h-screen flex flex-col ">
              <EditorDnD />
            </div>
          }
        />
        <Route
          path="/home"
          element={
            <Dashboard>
              {" "}
              <DashboardHome />{" "}
            </Dashboard>
          }
        />
        <Route
          path="/drafts"
          element={
            <Dashboard>
              <DashboardDrafts />
            </Dashboard>
          }
        />
        <Route
          path="/recycle"
          element={
            <Dashboard>
              <DashboardRecycle />
            </Dashboard>
          }
        />
        <Route
          path="/proposals"
          element={
            <Dashboard>
              <DashboardProposals />
            </Dashboard>
          }
        />
        <Route path="/view/:id" element={<Preview />} />
        <Route
          path="/workspaces"
          element={
            <Dashboard>
              <AllWorkspace />
            </Dashboard>
          }
        />

        <Route
          path="/workspace/:id"
          element={
            <Dashboard>
              <DashboardFirst />
            </Dashboard>
          }
        />
        <Route
          path="/analytics/:id"
          element={
            <Dashboard>
              <DashboardAnalytics />
            </Dashboard>
          }
        />
        <Route
          path="profile"
          element={
            <Dashboard>
              <Profile />
            </Dashboard>
          }
        />
        <Route
          path="subscription"
          element={
            <Dashboard>
              <Subscription />
            </Dashboard>
          }
        />
        <Route
          path="settings"
          element={
            <Dashboard>
              <GeneralSettings />
            </Dashboard>
          }
        />
        <Route
          path="manage"
          element={
            <Dashboard>
              <ManageUsers />
            </Dashboard>
          }
        />
        <Route path="/redirect" element={<Redirect />} />
        <Route
          path="*"
          element={
            user ? (
              <Navigate to="/home" replace state={{ from: location }} />
            ) : (
              <Navigate to="/login" replace state={{ from: location }} />
            )
          }
        />
      </Routes>
    </>
  );
};

export default WebsiteRoute;
