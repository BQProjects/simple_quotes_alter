export const exportLiveHTML = (dropCanvasRef, proposalName) => {
  if (dropCanvasRef.current) {
    // Function to clean and optimize elements for Word compatibility
    const optimizeForWord = (element) => {
      // Replace 'Page Break' text/divs with Word-compatible page break divs
      const insertPageBreaks = (el) => {
        // Replace any <div> or <p> with text 'Page Break' (case-insensitive)
        const allDivs = el.querySelectorAll("div, p");
        allDivs.forEach((node) => {
          if (
            node.textContent &&
            node.textContent.trim().toLowerCase() === "page break"
          ) {
            const pb = document.createElement("div");
            pb.className = "page-break";
            node.parentNode.replaceChild(pb, node);
          }
        });
      };
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
      // Convert side-by-side divs to tables for Word compatibility
      const preserveSideBySideLayout = (el) => {
        const allDivs = el.querySelectorAll("div");
        allDivs.forEach((div) => {
          const directChildDivs = Array.from(div.children).filter(
            (child) => child.tagName === "DIV"
          );
          if (directChildDivs.length === 2) {
            // Create a table with two columns
            const table = document.createElement("table");
            table.style.width = "100%";
            table.style.borderCollapse = "collapse";
            const tr = document.createElement("tr");
            directChildDivs.forEach((child) => {
              const td = document.createElement("td");
              td.style.verticalAlign = "top";
              td.style.border = "1px solid #ccc";
              td.style.padding = "8px";
              td.appendChild(child.cloneNode(true));
              tr.appendChild(td);
            });
            table.appendChild(tr);
            // Replace the div with the table
            div.parentNode.replaceChild(table, div);
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

      // Convert code blocks to <pre><code>...</code></pre>
      const convertCodeBlocks = (el) => {
        // Only convert divs or paragraphs with data-code-block="true" or class="code-block"
        const codeCandidates = el.querySelectorAll(
          'div[data-code-block="true"], p[data-code-block="true"], div.code-block, p.code-block'
        );
        codeCandidates.forEach((node) => {
          const text = node.textContent || "";
          const pre = document.createElement("pre");
          const code = document.createElement("code");
          code.textContent = text;
          pre.appendChild(code);
          node.parentNode.replaceChild(pre, node);
        });
        // Fallback: convert any div or p containing only a single <code> child
        const fallbackCandidates = el.querySelectorAll("div, p");
        fallbackCandidates.forEach((node) => {
          if (
            node.children.length === 1 &&
            node.firstElementChild.tagName === "CODE"
          ) {
            const pre = document.createElement("pre");
            pre.appendChild(node.firstElementChild.cloneNode(true));
            node.parentNode.replaceChild(pre, node);
          }
        });
        // Detect code blocks by content in leaf nodes only
        const contentCandidates = el.querySelectorAll("div, span, p");
        contentCandidates.forEach((node) => {
          const text = node.textContent?.trim();
          // Only convert if node has no children and text looks like code
          if (
            !node.children.length &&
            text &&
            (text.startsWith("const ") ||
              text.startsWith("let ") ||
              text.startsWith("function ") ||
              text.startsWith("class ") ||
              text.includes("new Document(") ||
              text.includes("new Paragraph(") ||
              text.includes("new TextRun("))
          ) {
            const pre = document.createElement("pre");
            const code = document.createElement("code");
            code.textContent = text;
            pre.appendChild(code);
            node.parentNode.replaceChild(pre, node);
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
      insertPageBreaks(clone);
      convertCodeBlocks(clone);
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
      border-spacing: 0 !important;
      width: 100% !important;
      margin: 24px 0 32px 0 !important;
      margin-bottom: 32px !important;
    }

    td, th {
      border: 1px solid #ccc !important;
      padding: 8px !important;
      vertical-align: top !important;
    }

    pre, code {
      display: block;
      margin-bottom: 24px !important;
      font-family: 'Consolas', 'Courier New', monospace !important;
      background: #f8f8f8 !important;
      border-radius: 4px !important;
      padding: 12px !important;
      font-size: 15px !important;
    }

    .page-break {
      page-break-before: always;
      break-before: page;
      height: 0;
      margin-bottom: 32px !important;
    }

    h1, h2, h3, h4, h5, h6, p, img, table, pre {
      margin-bottom: 24px !important;
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

    /* Remove flexbox for Word compatibility */

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

    .page-break {
      page-break-before: always;
      break-before: page;
      height: 0;
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
