import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { HashRouter } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DatabaseContextProvider } from "./context/DatabaseContext.jsx";
import { UserContext, UserContextProvider } from "./context/UserContext.jsx";
import { StateManageContextProvider } from "./context/StateManageContext.jsx";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <>
    <UserContextProvider>
      <DatabaseContextProvider>
        <StateManageContextProvider>
          <HashRouter>
            <Toaster
              position="top-center"
              reverseOrder={false}
              toastOptions={{
                // Define default options
                className: "",
                duration: 2000,

                // Default options for specific types
                success: {
                  duration: 2000,
                  iconTheme: {
                    primary: "green",
                  },
                },
              }}
            />
            <App />
          </HashRouter>
        </StateManageContextProvider>
      </DatabaseContextProvider>
    </UserContextProvider>
  </>
);
