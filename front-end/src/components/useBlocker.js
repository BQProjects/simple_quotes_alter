import { useEffect } from "react";
import { useBeforeUnload } from "react-router-dom";

/**
 * Runs a callback before user navigates away or closes tab.
 */
export function useBlocker(callback, when = true) {
  useBeforeUnload(
    (event) => {
      if (when) {
        callback();
      }
    },
    { capture: true }
  );

  useEffect(() => {
    if (!when) return;

    const handleBeforeUnload = (event) => {
      callback();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [callback, when]);
}
