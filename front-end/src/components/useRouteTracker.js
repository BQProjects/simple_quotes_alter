// useRouteTracker.js
import React from "react";
import { useEffect, useRef } from "react";
import { UAParser } from "ua-parser-js";

export const useRouteTracker = (
  routeName = "unknown-route",
  timeStore,
  setOS,
  setBrowser,
  setSta,
  setCountry,
  setTotalTime,
  onExit = () => {}
) => {
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    const parser = new UAParser();
    const uaResult = parser.getResult();

    const browser = uaResult.browser.name;
    const os = uaResult.os.name;

    // Fetch location data using IP-based geolocation API
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((location) => {
        const { country_name, region } = location;
        setOS(os);
        setBrowser(browser);
        setSta(country_name);
        setCountry(region);
        setTotalTime(startTimeRef.current);

        console.log("Route Access Info:", {
          route: routeName,
          browser,
          os,
          country: country_name,
          state: region,
        });
      })
      .catch((err) => console.error("IP Location fetch error", err));

    // On route exit
    return () => {
      const timeSpent = (Date.now() - startTimeRef.current) / 1000;
      console.log(`User spent ${timeSpent} seconds on ${routeName} `);
    };
  }, []);
};
