export const exportLiveHTML = (dropCanvasRef, proposalName) => {
  if (dropCanvasRef.current) {
    // Function to clean and optimize elements for Word compatibility
    const optimizeForWord = (element) => {
      const clone = element.cloneNode(true);

      const removeAttributes = (el) => {
        // Remove editor-specific attributes but preserve essential styling
        el.removeAttribute("class");
        el.removeAttribute("data-slate-node");
        el.removeAttribute("data-slate-void");
        el.removeAttribute("contenteditable");
        el.removeAttribute("role");
        el.removeAttribute("data-cy");
        el.removeAttribute("zindex");
        el.removeAttribute("aria-multiline");
        el.removeAttribute("data-slate-editor");

        // Remove problematic styles that create excessive wrappers
        if (el.style) {
          el.style.removeProperty("position");
          el.style.removeProperty("white-space");
          el.style.removeProperty("overflow-wrap");
          el.style.removeProperty("--tw-bg-opacity");
          el.style.removeProperty("background-color");
          el.style.removeProperty("width");
          el.style.removeProperty("min-height");
          el.style.removeProperty("margin");
          el.style.removeProperty("padding-bottom");
          el.style.removeProperty("border");
          el.style.removeProperty("text-align");
          el.style.removeProperty("display");
          el.style.removeProperty("justify-content");
          el.style.removeProperty("align-items");
          el.style.removeProperty("flex-direction");
        }

        Array.from(el.attributes).forEach((attr) => {
          if (attr.name.startsWith("on")) {
            el.removeAttribute(attr.name);
          }
          if (attr.name.startsWith("data-slate-")) {
            el.removeAttribute(attr.name);
          }
        });
      };

      const applyWordStyles = (el) => {
        const tagName = el.tagName?.toLowerCase();
        const computedStyle = window.getComputedStyle(el);
        let styles = [];

        const fontSize = computedStyle.fontSize;
        const fontWeight = computedStyle.fontWeight;
        const fontFamily = computedStyle.fontFamily;
        const color = computedStyle.color;
        const textAlign = computedStyle.textAlign;
        const backgroundColor = computedStyle.backgroundColor;
        const lineHeight = computedStyle.lineHeight;

        if (fontSize && fontSize !== "16px")
          styles.push(`font-size: ${fontSize}`);
        if (fontWeight && fontWeight !== "400")
          styles.push(`font-weight: ${fontWeight}`);
        if (fontFamily) styles.push(`font-family: ${fontFamily}`);
        if (color && color !== "rgb(0, 0, 0)") styles.push(`color: ${color}`);
        if (textAlign && textAlign !== "start")
          styles.push(`text-align: ${textAlign}`);
        if (backgroundColor && backgroundColor !== "rgba(0, 0, 0, 0)")
          styles.push(`background-color: ${backgroundColor}`);
        if (lineHeight && lineHeight !== "normal")
          styles.push(`line-height: ${lineHeight}`);

        const marginTop = computedStyle.marginTop;
        const marginBottom = computedStyle.marginBottom;
        const paddingTop = computedStyle.paddingTop;
        const paddingBottom = computedStyle.paddingBottom;

        if (marginTop && marginTop !== "0px")
          styles.push(`margin-top: ${marginTop}`);
        if (marginBottom && marginBottom !== "0px")
          styles.push(`margin-bottom: ${marginBottom}`);
        if (paddingTop && paddingTop !== "0px")
          styles.push(`padding-top: ${paddingTop}`);
        if (paddingBottom && paddingBottom !== "0px")
          styles.push(`padding-bottom: ${paddingBottom}`);

        if (tagName === "table") {
          styles = [
            "border-collapse: collapse",
            "width: 100%",
            "margin: 16px 0",
            "border: 1px solid #ccc",
          ];
        } else if (tagName === "td" || tagName === "th") {
          styles.push("border: 1px solid #ccc");
          styles.push("padding: 8px");
          styles.push("vertical-align: top");
        }

        if (styles.length > 0) {
          el.style.cssText = styles.join("; ");
        }
      };

      // Convert textareas to their text content
      const convertTextareas = (el) => {
        const textareas = el.querySelectorAll("textarea");
        textareas.forEach((textarea) => {
          const textValue = textarea.value || textarea.textContent || "";
          if (textValue.trim()) {
            const span = document.createElement("span");
            span.textContent = textValue;
            textarea.parentNode?.replaceChild(span, textarea);
          } else {
            textarea.remove();
          }
        });
      };

      // Detect and preserve side-by-side layouts
      const preserveSideBySideLayout = (el) => {
        // Look for containers with multiple divs (likely side-by-side content)
        const allDivs = el.querySelectorAll("div");
        allDivs.forEach((div) => {
          const directChildDivs = Array.from(div.children).filter(
            (child) => child.tagName === "DIV"
          );

          // If a div has exactly 2 child divs with meaningful content, make it flexbox
          if (directChildDivs.length === 2) {
            const hasContent = directChildDivs.every((child) => {
              const text = child.textContent?.trim();
              const hasImg = child.querySelector("img");
              const hasTable = child.querySelector("table");
              const hasEditor =
                child.querySelector("[data-slate-editor]") ||
                child.querySelector("[aria-multiline]");
              return text || hasImg || hasTable || hasEditor;
            });

            // Only apply flex if not already styled and content is meaningful
            if (hasContent && !div.style.display) {
              div.style.display = "flex";
              div.style.gap = "20px";
              div.style.alignItems = "flex-start";
              div.style.marginBottom = "16px";

              // Set flex properties for children
              directChildDivs.forEach((child) => {
                child.style.flex = "1";
                child.style.minWidth = "0";
                child.style.maxWidth = "48%";
              });
            }
          }
        });
      };

      // Remove excessive wrapper divs that don't add value
      const removeExcessiveWrappers = (el) => {
        const divs = el.querySelectorAll("div");
        divs.forEach((div) => {
          // If a div only has styling for centering/positioning and one child, unwrap it
          if (
            div.children.length === 1 &&
            div.style.cssText.includes("flex") &&
            div.style.cssText.includes("center") &&
            !div.textContent?.trim()
          ) {
            const parent = div.parentNode;
            const child = div.firstElementChild;
            if (parent && child) {
              parent.replaceChild(child, div);
            }
          }

          // Remove divs that are just wrappers with no content or meaningful styling
          if (
            div.children.length === 1 &&
            div.tagName === "DIV" &&
            div.firstElementChild?.tagName === "DIV" &&
            !div.textContent?.trim() &&
            !div.style.display?.includes("flex")
          ) {
            const parent = div.parentNode;
            const child = div.firstElementChild;
            if (parent && child) {
              parent.replaceChild(child, div);
            }
          }
        });
      };

      // Helper: check if a cell is truly empty
      const isCellEmpty = (cell) => {
        const text = cell.textContent?.trim();
        const hasImages = cell.querySelector("img");
        const hasTextareas = cell.querySelector("textarea");
        const hasSpans = cell.querySelector("span");
        return !text && !hasImages && !hasTextareas && !hasSpans;
      };

      // Clean up tables: remove empty rows/columns more carefully
      const cleanUpTables = (el) => {
        const tables = el.querySelectorAll("table");
        tables.forEach((table) => {
          // First convert textareas in table
          convertTextareas(table);

          let rows = Array.from(table.querySelectorAll("tr"));
          if (rows.length === 0) return;

          // Remove completely empty rows first
          rows = rows.filter((row) => {
            const cells = Array.from(row.querySelectorAll("td, th"));
            const hasContent = cells.some((cell) => !isCellEmpty(cell));
            if (!hasContent) {
              row.remove();
              return false;
            }
            return true;
          });

          // Refresh rows list
          rows = Array.from(table.querySelectorAll("tr"));

          // Check if first column is empty across all rows
          if (rows.length > 0) {
            const firstColumnEmpty = rows.every((row) => {
              const firstCell = row.querySelector(
                "td:first-child, th:first-child"
              );
              return firstCell && isCellEmpty(firstCell);
            });

            // Remove first column if completely empty
            if (firstColumnEmpty) {
              rows.forEach((row) => {
                const firstCell = row.querySelector(
                  "td:first-child, th:first-child"
                );
                if (firstCell) firstCell.remove();
              });
            }
          }

          // Remove table if no rows left
          if (table.querySelectorAll("tr").length === 0) {
            table.remove();
          }
        });
      };

      // Simplify span nesting
      const simplifySpans = (el) => {
        const spans = el.querySelectorAll("span");
        spans.forEach((span) => {
          // If span only contains nested spans with no meaningful attributes, flatten
          while (
            span.children.length === 1 &&
            span.firstElementChild.tagName === "SPAN" &&
            !span.firstElementChild.style.cssText &&
            !span.style.cssText
          ) {
            const child = span.firstElementChild;
            span.innerHTML = child.innerHTML;
          }
        });
      };

      const processElement = (el) => {
        removeAttributes(el);
        applyWordStyles(el);

        const unwantedTags = ["button", "svg", "path", "menu", "toolbar"];
        if (unwantedTags.includes(el.tagName?.toLowerCase())) {
          el.remove();
          return;
        }

        if (
          el.tagName?.toLowerCase() === "div" &&
          el.children.length === 1 &&
          el.firstElementChild?.tagName?.toLowerCase() === "button"
        ) {
          el.remove();
          return;
        }

        Array.from(el.children).forEach((child) => {
          processElement(child);
        });
      };

      // Apply all optimizations in correct order
      processElement(clone);
      convertTextareas(clone);
      removeExcessiveWrappers(clone);
      preserveSideBySideLayout(clone);
      cleanUpTables(clone);
      simplifySpans(clone);

      return clone;
    };

    const optimizedCanvas = optimizeForWord(dropCanvasRef.current);

    const styledHTML = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <title>${proposalName || "Web View Export"}</title>
  <style>
    body {
      margin: 0;
      padding: 40px;
      background-color: #F5F5F5;
      font-family: Arial, sans-serif;
      line-height: 1.6;
    }

    .document-container {
      max-width: 1000px;
      margin: 0 auto;
      background: white;
      padding: 40px 48px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    table {
      border-collapse: collapse !important;
      width: 100% !important;
      margin: 16px 0 !important;
    }

    td, th {
      border: 1px solid #ccc !important;
      padding: 8px !important;
      vertical-align: top !important;
    }

    h1, h2, h3, h4, h5, h6 {
      margin: 16px 0 8px 0;
      font-weight: bold;
    }

    p {
      margin: 8px 0;
    }

    img {
      max-width: 100%;
      height: auto;
      display: block;
      margin: 16px 0;
    }

    /* Preserve side-by-side layouts */
    div[style*="display: flex"], 
    div[style*="display:flex"] {
      display: flex !important;
      gap: 20px !important;
      align-items: flex-start !important;
      margin-bottom: 16px !important;
    }

    div[style*="flex: 1"] {
      flex: 1 !important;
      min-width: 0 !important;
      max-width: 48% !important;
    }

    /* Clean up empty elements and excessive wrappers */
    div:empty:not([style*="flex"]),
    span:empty {
      display: none;
    }

    /* Remove unnecessary wrapper styling */
    div[style*="width: 98%"],
    div[style*="min-height: 30px"],
    div[style*="justify-content: center"],
    div[style*="flex-direction: column"] {
      width: auto !important;
      min-height: auto !important;
      justify-content: flex-start !important;
      flex-direction: row !important;
      margin: 8px 0 !important;
      padding: 0 !important;
      border: none !important;
      text-align: left !important;
    }

    /* Ensure proper table structure */
    table tr {
      border: none;
    }

    table td:empty,
    table th:empty {
      min-height: 20px;
    }

    * {
      box-sizing: border-box;
    }
  </style>
</head>
<body>
  <div class="document-container">
    ${optimizedCanvas.innerHTML}
  </div>
</body>
</html>`;

    const blob = new Blob([styledHTML], { type: "text/html" });
    const fileName = proposalName
      ? `${proposalName}_webview.html`
      : "webview.html";
    import("file-saver").then(({ saveAs }) => {
      saveAs(blob, fileName);
    });
  } else {
    alert("Editor canvas not found.");
  }
};
