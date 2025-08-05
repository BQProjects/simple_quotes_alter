import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  useEffect(() => {
    if (user) {
      getUserData();
    }
  }, []);

  const getUserData = async () => {
    try {
      const res = await axios.get(
        `https://simple-jet-eta.vercel.app/api/auth/getUser`,
        {
          params: { user_id: user.id },
        }
      );

      const userData = res.data;
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));

      if (userData.subscription === "trial") {
        const subscriptionStart = new Date(userData.subscriptionDate);
        const today = new Date();

        // Add 14 days to the subscription start date
        const trialEnd = new Date(subscriptionStart);
        trialEnd.setDate(trialEnd.getDate() + 14);

        // If trial has expired
        if (today >= trialEnd) {
          expired();
        }
      }
      if (userData.subscription === "canceled") {
        const subscriptionEnd = new Date(userData.subscriptionEnd);
        const today = new Date();

        // If trial has expired
        if (today >= subscriptionEnd) {
          expired();
        }
      }
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  const expired = async () => {
    try {
      const res = await axios.post(
        `https://simple-jet-eta.vercel.app/api/auth/changeSubscription`,
        {
          subscription: "expired",
          subscriptionDate: new Date(),
          user_id: user.id,
        }
      );
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
