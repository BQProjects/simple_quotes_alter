import React, { useContext, useEffect, useRef } from "react";
import axios from "axios";
import { DatabaseContext } from "../context/DatabaseContext";

const ScrollSectionTracker = ({
  groupedData,
  setTimeStore,
  os,
  browser,
  country,
  sta,
  totalTime,
  id,
}) => {
  const sectionRefs = useRef({});
  const currentSection = useRef(null);
  const startTime = useRef(null);
  const containerRef = useRef(null);
  const temp = useRef({}); // persist timing info across renders
  const { databaseUrl } = useContext(DatabaseContext);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const now = Date.now();

        // Filter visible entries
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length === 0) return;

        // Pick the entry with the largest intersection ratio
        const mostVisibleEntry = visibleEntries.reduce((max, entry) =>
          entry.intersectionRatio > max.intersectionRatio ? entry : max
        );

        const heading = mostVisibleEntry.target.dataset.heading;

        if (currentSection.current !== heading) {
          // Save time for the previous section
          if (currentSection.current && startTime.current) {
            const duration = (now - startTime.current) / 1000;
            temp.current[currentSection.current] =
              (temp.current[currentSection.current] || 0) + duration;
          }
          currentSection.current = heading;
          startTime.current = now;
        }
      },
      {
        threshold: [0.1, 0.25, 0.5, 0.75, 1],
        rootMargin: "0px 0px -50% 0px",
      }
    );

    // Observe all section refs
    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      // Disconnect observer
      observer.disconnect();

      // Final timing for the last section
      if (currentSection.current && startTime.current) {
        const duration = (Date.now() - startTime.current) / 1000;
        temp.current[currentSection.current] =
          (temp.current[currentSection.current] || 0) + duration;

        // Send analytics data
        axios
          .post(`${databaseUrl}/api/workspace/analytics`, {
            temp: temp.current,
            os,
            browser,
            country,
            sta,
            timespent: (Date.now() - totalTime) / 1000,
            seen: totalTime,
            id,
          })
          .then((res) => console.log("Analytics sent:", res.data))
          .catch((err) => console.error("Analytics error:", err));
      }
    };
  }, [groupedData, os, browser, country, sta, totalTime, id, databaseUrl]);

  // useEffect(() => {
  //   const handleBeforeUnload = (e) => {
  //     e.preventDefault();
  //     e.returnValue = "Are you sure you want to leave?";
  //     return e.returnValue;
  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);
  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, []);

  window.onbeforeunload = (event) => {
    axios
      .post(`${databaseUrl}/api/workspace/analytics`, {
        temp: temp.current,
        os,
        browser,
        country,
        sta,
        timespent: (Date.now() - totalTime) / 1000,
        seen: totalTime,
        id,
      })
      .then((res) => console.log("Analytics sent:", res.data))
      .catch((err) => console.error("Analytics error:", err));
    return "";
  };

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      {groupedData.map((section, index) => (
        <div
          key={`${section.heading}-${index}`}
          data-heading={section.heading}
          ref={(el) =>
            (sectionRefs.current[`${section.heading}-${index}`] = el)
          }
          // Consider making these sections visible and part of normal flow
          style={{
            // You might want normal flow here to track visible sections properly
            // e.g., minHeight: "100px", marginBottom: "50px"
            minHeight: "100px",
            width: "100%",
          }}
        >
          {/* Optionally render content or a placeholder */}
        </div>
      ))}
    </div>
  );
};

export default ScrollSectionTracker;
