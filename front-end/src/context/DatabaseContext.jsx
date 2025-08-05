import React, { createContext, useContext } from "react";

export const DatabaseContext = createContext({});

export function DatabaseContextProvider({ children }) {
  const databaseUrl = "https://simple-jet-eta.vercel.app";
  // const databaseUrl = "http://localhost:9000";

  return (
    <DatabaseContext.Provider
      value={{
        databaseUrl,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
}
