import jsPDF from "jspdf";
import React from "react";
import autoTable from "jspdf-autotable";
import ImageAlter from "../../assets/ImageAlter.png";
import { BsFileLock } from "react-icons/bs";

const GeneratePDF = async (jsonData, settings) => {
  const data = jsonData.data || jsonData;
  const documentSettings = jsonData.settings || settings || {};

  const doc = new jsPDF();
  let currentY = 10;
  const pageHeight = doc.internal.pageSize.height;
  const pageWidth = doc.internal.pageSize.width;
  const availableWidth = pageWidth - 20; // 10px margins on each side

  // Document-level settings that match Word typography
  const defaultFont = "Arial";
  const headingFont = "Arial";
  const codeFont = "Arial";
  const defaultColor = documentSettings.color || "#212529";
  const theme = documentSettings.theme || 0;

  // Set default font
  doc.setFont(defaultFont, "normal");

  // Color conversion helper - matches Word export logic exactly
  const convertToHex = (colorValue) => {
    if (!colorValue) return defaultColor.replace("#", "");

    if (typeof colorValue === "string" && /^[0-9A-Fa-f]{6}$/.test(colorValue)) {
      return colorValue;
    }

    if (typeof colorValue === "string" && colorValue.startsWith("#")) {
      const hex = colorValue.slice(1);
      if (/^[0-9A-Fa-f]{6}$/.test(hex)) {
        return hex;
      }
    }

    const colorMap = {
      black: "000000",
      white: "FFFFFF",
      red: "FF0000",
      green: "008000",
      blue: "0000FF",
      yellow: "FFFF00",
      cyan: "00FFFF",
      magenta: "FF00FF",
      gray: "808080",
      grey: "808080",
      dark: "333333",
      light: "F5F5F5",
    };

    if (typeof colorValue === "string") {
      const lowerColor = colorValue
        .toLowerCase()
        .replace("text-", "")
        .replace("#", "");
      if (colorMap[lowerColor]) {
        return colorMap[lowerColor];
      }

      if (/^[0-9A-Fa-f]{3}$/.test(lowerColor)) {
        return lowerColor
          .split("")
          .map((char) => char + char)
          .join("");
      }
    }

    return defaultColor.replace("#", "");
  };

  // Convert Tailwind CSS text color classes to hex values - matches Word export
  const convertTailwindTextColor = (textColor) => {
    if (!textColor || typeof textColor !== "string") {
      return convertToHex(defaultColor);
    }

    const colorMap = {
      "text-black": "000000",
      "text-white": "FFFFFF",
      "text-gray-700": "374151",
      "text-gray-600": "4B5563",
      "text-gray-500": "6B7280",
      "text-gray-400": "9CA3AF",
      "text-gray-300": "D1D5DB",
      "text-red-500": "EF4444",
      "text-blue-500": "3B82F6",
      "text-green-500": "10B981",
      "text-yellow-500": "F59E0B",
      "text-purple-500": "8B5CF6",
      "text-indigo-500": "6366F1",
    };

    if (colorMap[textColor]) {
      return colorMap[textColor];
    }

    if (textColor.startsWith("#")) {
      return convertToHex(textColor);
    }

    const match = textColor.match(/text-(\w+)-?(\d+)?/);
    if (match) {
      const [, color, shade] = match;
      const key = shade ? `text-${color}-${shade}` : `text-${color}`;
      if (colorMap[key]) {
        return colorMap[key];
      }
    }

    console.warn(`Unknown textColor: ${textColor}, using default`);
    return convertToHex(defaultColor);
  };

  // Convert hex color to RGB values for jsPDF
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 33, g: 37, b: 41 }; // Default color
  };

  // Set color from hex string
  const setColorFromHex = (hexColor) => {
    const rgb = hexToRgb(`#${hexColor}`);
    doc.setTextColor(rgb.r, rgb.g, rgb.b);
  };

  // Set fill color from hex string
  const setFillColorFromHex = (hexColor) => {
    const rgb = hexToRgb(`#${hexColor}`);
    doc.setFillColor(rgb.r, rgb.g, rgb.b);
  };

  // Enhanced image fetching with better error handling
  const fetchImageAsArrayBuffer = async (url) => {
    try {
      const response = await fetch(url, {
        mode: "cors",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.startsWith("image/")) {
        throw new Error("Invalid content type");
      }

      return await response.arrayBuffer();
    } catch (error) {
      console.error("Error fetching image:", error);
      return null;
    }
  };

  // Improved image dimensions to maintain proper aspect ratios
  const getImageDimensions = (
    width,
    height,
    maxWidth = 80,
    maxHeight = 60,
    context = "normal"
  ) => {
    let w = parseInt(width) || maxWidth;
    let h = parseInt(height) || maxHeight;

    // Context-specific sizing to match web layout exactly
    switch (context) {
      case "cover":
        maxWidth = 100;
        maxHeight = 70;
        break;
      case "inline":
        maxWidth = 80;
        maxHeight = 60;
        break;
      case "side":
        maxWidth = 45;
        maxHeight = 35;
        break;
      case "double":
        maxWidth = 50;
        maxHeight = 40;
        break;
    }

    // Maintain aspect ratio while fitting within bounds
    const aspectRatio = w / h;

    if (w > maxWidth) {
      w = maxWidth;
      h = w / aspectRatio;
    }
    if (h > maxHeight) {
      h = maxHeight;
      w = h * aspectRatio;
    }

    return {
      width: Math.round(Math.max(w, 20)),
      height: Math.round(Math.max(h, 15)),
    };
  };

  // Enhanced function to process Slate content with proper formatting - matches Word export logic
  const processSlateContent = (content, options = {}) => {
    if (!content || !Array.isArray(content)) return;

    content.forEach((block) => {
      if (!block || !block.children) return;

      // Extract alignment from block
      const blockAlignment =
        block.align === "center"
          ? "center"
          : block.align === "right"
          ? "right"
          : "left";

      // Determine text size based on block type - matches Word export sizes
      let textSize = 11; // Base size for PDF (22/2)
      let isHeading = false;

      if (block.type) {
        const sizeMap = {
          "heading-one": 24, // 48/2
          "heading-two": 18, // 36/2
          "heading-three": 15, // 30/2
          "heading-four": 13, // 26/2
          "heading-five": 11, // 22/2
          "heading-six": 10, // 20/2
          paragrapgh: 11, // 22/2
          "paragrapgh-two": 10, // 20/2
        };
        textSize = sizeMap[block.type] || 11;

        if (block.type.includes("heading")) {
          isHeading = true;
        }
      }

      // Handle list items - matches Word export logic
      if (block.type === "bulleted-list") {
        block.children.forEach((listItem, index) => {
          if (listItem.type === "list-item" && listItem.children) {
            const listText = listItem.children
              .map((child) => child.text || "")
              .join("");
            if (listText.trim()) {
              checkPageBreak(textSize + 5);

              doc.setFontSize(textSize);
              setColorFromHex("000000"); // Set color to black for paragraphs

              let xPosition = getAlignedXPosition(
                "• " + listText,
                blockAlignment,
                15
              );
              const lines = doc.splitTextToSize(
                "• " + listText,
                availableWidth - 30
              );

              lines.forEach((line, idx) => {
                doc.text(line, xPosition, currentY);
                currentY += textSize * 0.4 + 2;
                checkPageBreak(textSize + 5);
              });

              currentY += 3; // Tight spacing like Word
            }
          }
        });
        return;
      }

      if (block.type === "numbered-list") {
        block.children.forEach((listItem, index) => {
          if (listItem.type === "list-item" && listItem.children) {
            const listText = listItem.children
              .map((child) => child.text || "")
              .join("");
            if (listText.trim()) {
              checkPageBreak(textSize + 5);

              doc.setFontSize(textSize);
              setColorFromHex("000000"); // Set color to black for paragraphs

              let xPosition = getAlignedXPosition(
                `${index + 1}. ` + listText,
                blockAlignment,
                15
              );
              const lines = doc.splitTextToSize(
                `${index + 1}. ` + listText,
                availableWidth - 30
              );

              lines.forEach((line, idx) => {
                doc.text(line, xPosition, currentY);
                currentY += textSize * 0.4 + 2;
                checkPageBreak(textSize + 5);
              });

              currentY += 3; // Tight spacing like Word
            }
          }
        });
        return;
      }

      // Process regular paragraph content with mixed formatting
      let paragraphText = "";
      let hasContent = false;

      block.children.forEach((child) => {
        if (!child) return;

        const text = child.text || "";
        if (!text && !child.children) return;

        // Handle nested content
        if (child.children && Array.isArray(child.children)) {
          child.children.forEach((nestedChild) => {
            const nestedText = nestedChild.text || "";
            if (nestedText) {
              paragraphText += nestedText;
              hasContent = true;
            }
          });
        } else if (text) {
          paragraphText += text;
          hasContent = true;
        }
      });

      // Create paragraph only if we have content
      if (hasContent && paragraphText.trim()) {
        checkPageBreak(textSize + 5);

        doc.setFontSize(textSize);

        // Set font weight for headings
        if (isHeading) {
          doc.setFont(headingFont, "bold");
          setColorFromHex("000000"); // Set color to black for headings
          currentY += isHeading ? 12 : 6; // Extra spacing before headings
        } else {
          doc.setFont(defaultFont, "normal");
          setColorFromHex("000000"); // Set color to black for paragraphs
        }

        let xPosition = getAlignedXPosition(paragraphText, blockAlignment);
        const lines = doc.splitTextToSize(paragraphText, availableWidth - 20);

        lines.forEach((line, idx) => {
          doc.text(line, xPosition, currentY);
          currentY += textSize * 0.5 + 1; // Tight line spacing like Word
          checkPageBreak(textSize + 5);
        });

        currentY += isHeading ? 6 : 3; // Spacing after content
        doc.setFont(defaultFont, "normal");
      } else {
        // Empty paragraph for spacing
        currentY += 3;
      }
    });
  };

  // Helper function to get aligned X position
  const getAlignedXPosition = (text, alignment, indent = 0) => {
    const textWidth = doc.getTextWidth(text);
    switch (alignment) {
      case "center":
        return (pageWidth - textWidth) / 2;
      case "right":
        return pageWidth - textWidth - 10 - indent;
      default:
        return 10 + indent;
    }
  };

  // Helper function to check for page breaks
  const checkPageBreak = (neededSpace = 20) => {
    if (currentY + neededSpace > pageHeight - 20) {
      doc.addPage();
      currentY = 20;
    }
  };

  // Create image with enhanced error handling - matches Word export logic
  const createImageParagraph = async (imageUrl, options = {}) => {
    const {
      alignment = "center",
      width = 80,
      height = 60,
      maxWidth = 80,
      maxHeight = 60,
      context = "normal",
    } = options;

    try {
      // For demo purposes, use placeholder image
      const dimensions = getImageDimensions(
        width,
        height,
        maxWidth,
        maxHeight,
        context
      );

      checkPageBreak(dimensions.height + 10);

      let xPosition;
      switch (alignment) {
        case "left":
          xPosition = 10;
          break;
        case "right":
          xPosition = pageWidth - dimensions.width - 10;
          break;
        default:
          xPosition = (pageWidth - dimensions.width) / 2;
      }

      if (imageUrl) {
        doc.addImage(
          imageUrl,
          "JPEG",
          xPosition,
          currentY,
          dimensions.width,
          dimensions.height
        );
      } else {
        doc.addImage(
          ImageAlter,
          "JPEG",
          xPosition,
          currentY,
          dimensions.width,
          dimensions.height
        );
      }
      currentY += dimensions.height + 5;
    } catch (error) {
      console.error("Error creating image:", error);

      // Fallback styling matches Word export
      checkPageBreak(25);

      doc.setFontSize(8);
      doc.setFont(defaultFont, "italic");
      setColorFromHex("6C757D");

      const fallbackText = `[Image: ${
        imageUrl.split("/").pop() || "unavailable"
      }]`;
      const textWidth = doc.getTextWidth(fallbackText);
      let xPosition = (pageWidth - textWidth) / 2;

      // Draw border around fallback text
      doc.setDrawColor(222, 226, 230);
      doc.rect(xPosition - 5, currentY - 8, textWidth + 10, 15);

      doc.text(fallbackText, xPosition, currentY);
      currentY += 20;

      doc.setFont(defaultFont, "normal");
    }
  };

  // Improved code block formatting to match Word export exactly
  const createCodeBlock = (codeContent, options = {}) => {
    const { spacing = { before: 4, after: 4 } } = options;

    const lines = (codeContent || "")
      .toString()
      .split("\n")
      .map((l) => (l === "" ? " " : l));

    checkPageBreak(lines.length * 4 + 20 + spacing.before + spacing.after);

    currentY += spacing.before;

    // Add "Code:" label - matches Word export
    doc.setFontSize(16);
    doc.setFont(defaultFont, "normal");
    setColorFromHex("333333");
    doc.text("Code:", 10, currentY);
    currentY += 10;

    const blockHeight = lines.length * 4 + 8;
    const blockWidth = availableWidth;
    const blockX = 10;

    // Draw shaded background - matches Word export colors
    setFillColorFromHex("F3F4F6");
    doc.rect(blockX, currentY - 5, blockWidth, blockHeight, "F");

    // Draw blue left bar - matches Word export
    setFillColorFromHex("E0E0E0");
    doc.rect(blockX, currentY - 5, 4, blockHeight, "F");

    // Draw border - matches Word export
    doc.setDrawColor(224, 224, 224);
    doc.rect(blockX, currentY - 5, blockWidth, blockHeight);

    // Render code lines
    doc.setFont(codeFont, "normal");
    doc.setFontSize(8);
    setColorFromHex("333333");

    lines.forEach((line) => {
      doc.text(line, blockX + 10, currentY, { maxWidth: blockWidth - 20 });
      currentY += 4;
    });

    currentY += spacing.after;
    doc.setFont(defaultFont, "normal");
  };

  // Create table with enhanced styling - matches Word export exactly
  const createTable = (tableData, options = {}) => {
    if (!Array.isArray(tableData) || tableData.length === 0) return;

    const {
      design = "normal",
      boldAll = [],
      underlineAll = [],
      italicAll = [],
      colAlign = [],
      cellAlignAll = [],
    } = options;

    // Helper for background color based on design - matches Word export
    const getCellShading = (colIndex, rowIndex) => {
      switch (design) {
        case "alternativerow":
          return rowIndex % 2 === 0 ? [229, 231, 235] : [243, 244, 246];
        case "alternativecol":
          return colIndex % 2 === 0 ? [229, 231, 235] : [243, 244, 246];
        case "toprow":
          return rowIndex === 0 ? [229, 231, 235] : [255, 255, 255];
        case "leftcol":
          return colIndex === 0 ? [229, 231, 235] : [255, 255, 255];
        default:
          return [255, 255, 255];
      }
    };

    const toAlign = (val, fallback) => {
      if (val === "left") return "left";
      if (val === "center") return "center";
      if (val === "right") return "right";
      return fallback;
    };

    const rows = tableData.map((row, rowIndex) =>
      Array.isArray(row) ? row : []
    );
    const columnCount = Math.max(...rows.map((r) => r.length));
    const cellWidth = availableWidth / columnCount;

    checkPageBreak(rows.length * 10 + 20);

    for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
      const row = rows[rowIndex];
      let x = 10;
      let maxLines = 1;
      const wrappedTexts = [];

      // First pass: wrap text and calculate max lines
      for (let colIndex = 0; colIndex < columnCount; colIndex++) {
        const text =
          row[colIndex] !== undefined ? row[colIndex].toString() : "";
        const wrapped = doc.splitTextToSize(text, cellWidth - 4);
        wrappedTexts.push(wrapped);
        maxLines = Math.max(maxLines, wrapped.length);
      }

      const lineHeight = 4;
      const cellHeight = maxLines * lineHeight + 4;

      // Page break check
      if (currentY + cellHeight > pageHeight - 20) {
        doc.addPage();
        currentY = 20;
      }

      // Second pass: draw cells and vertically centered text
      for (let colIndex = 0; colIndex < columnCount; colIndex++) {
        const wrapped = wrappedTexts[colIndex];

        // Cell shading
        const fillColor = getCellShading(colIndex, rowIndex);
        doc.setFillColor(...fillColor);
        doc.rect(x, currentY, cellWidth, cellHeight, "F");

        // Border - matches Word export
        doc.setDrawColor(176, 176, 176);
        doc.rect(x, currentY, cellWidth, cellHeight);

        // Text style
        const isHeaderRow = rowIndex === 0;
        const textBold = boldAll?.[rowIndex]?.[colIndex] === true;
        const textUnderline = !!underlineAll?.[rowIndex]?.[colIndex];
        const textItalic = !!italicAll?.[rowIndex]?.[colIndex];

        doc.setFont(
          defaultFont,
          textBold ? "bold" : textItalic ? "italic" : "normal"
        );
        doc.setFontSize(isHeaderRow ? 9 : 8);
        setColorFromHex("000000");

        // Alignment priority: per-cell -> per-col -> default
        const perCell = cellAlignAll?.[rowIndex]?.[colIndex];
        const perCol = colAlign?.[colIndex];
        const defaultAlign =
          colIndex === 0
            ? "left"
            : colIndex === row.length - 1
            ? "right"
            : "center";
        const cellAlign = toAlign(perCell, toAlign(perCol, defaultAlign));

        // Vertical centering
        const totalTextHeight = wrapped.length * lineHeight;
        const verticalOffset = (cellHeight - totalTextHeight) / 2;

        wrapped.forEach((line, idx) => {
          let tx;
          switch (cellAlign) {
            case "left":
              tx = x + 2;
              break;
            case "right":
              tx = x + cellWidth - 2 - doc.getTextWidth(line);
              break;
            default:
              tx = x + cellWidth / 2 - doc.getTextWidth(line) / 2;
          }

          doc.text(
            line,
            tx,
            currentY + verticalOffset + lineHeight + idx * lineHeight
          );
        });

        x += cellWidth;
      }

      currentY += cellHeight;
    }

    currentY += 5;
  };

  // Create cost table styled exactly like Word export
  const createCostTable = (costContent, options = {}) => {
    console.log("costContent:", JSON.stringify(costContent, null, 2));

    const showQuantity = !!options?.quantity;
    const hasDiscount = !!options?.discount;
    const hasTax = !!options?.tax;
    const currency =
      typeof options?.currency === "string" ? options.currency : "$";
    const discountValue = Number(options?.values?.discount ?? 0);
    const taxValue = Number(options?.values?.tax ?? 0);

    const headerLabels = showQuantity
      ? ["Description", "Unit Price", "Quantity", "Amount"]
      : ["Description", "Amount"];

    const dataRows = Array.isArray(costContent)
      ? costContent
          .filter((row) => typeof row === "object" && row !== null)
          .map((rowObj) =>
            showQuantity
              ? [
                  rowObj.deliverable ?? "",
                  rowObj.price ?? "",
                  rowObj.quantity ?? "",
                  rowObj.amount ?? "",
                ]
              : [rowObj.deliverable ?? "", rowObj.amount ?? ""]
          )
      : [];

    const colCount = headerLabels.length;
    const colWidth = availableWidth / colCount;
    const rowHeight = 8;

    checkPageBreak((dataRows.length + 6) * rowHeight + 40);

    // Draw header - matches Word export styling
    let x = 10;
    doc.setFontSize(9);
    doc.setFont(defaultFont, "bold");
    setFillColorFromHex("F5F5F5");
    setColorFromHex("000000");

    headerLabels.forEach((header) => {
      setFillColorFromHex("F5F5F5");
      doc.rect(x, currentY, colWidth, rowHeight, "F");
      doc.setDrawColor(222, 226, 230);
      doc.rect(x, currentY, colWidth, rowHeight);
      doc.text(
        header.toString(),
        x + colWidth / 2 - doc.getTextWidth(header) / 2,
        currentY + 6
      );
      x += colWidth;
    });
    currentY += rowHeight;

    // Draw data rows
    doc.setFont(defaultFont, "normal");
    doc.setFontSize(8);

    dataRows.forEach((row) => {
      x = 10;
      setColorFromHex("000000");

      row.forEach((cell, i) => {
        doc.setDrawColor(222, 226, 230);
        doc.rect(x, currentY, colWidth, rowHeight);
        const cellText = cell !== undefined ? cell.toString() : "";
        doc.text(
          cellText,
          x + colWidth / 2 - doc.getTextWidth(cellText) / 2,
          currentY + 6
        );
        x += colWidth;
      });
      currentY += rowHeight;
    });

    if (!Array.isArray(costContent) || costContent.length === 0) return;

    // Calculate subtotal - matches Word export logic
    let subtotal = 0;
    if (Array.isArray(costContent)) {
      subtotal = costContent.reduce((sum, row) => {
        let amount = 0;
        if (typeof row === "object" && row !== null && "amount" in row) {
          amount = Number(row.amount) || 0;
        } else if (Array.isArray(row)) {
          amount = Number(row[row.length - 1]) || 0;
        }
        return sum + amount;
      }, 0);
    }

    const discountAmount = hasDiscount ? subtotal * (discountValue / 100) : 0;
    const taxAmount = hasTax ? subtotal * (taxValue / 100) : 0;
    const total = subtotal - discountAmount + taxAmount;

    // Draw summary rows - matches Word export exactly
    const summaryRows = [];
    summaryRows.push(["Total", `${currency}${subtotal.toFixed(2)}`]);

    if (hasDiscount) {
      summaryRows.push([
        `Discount (${discountValue}%)`,
        `${currency}${discountAmount.toFixed(2)}`,
      ]);
    }

    if (hasTax) {
      summaryRows.push([
        `Tax (${taxValue}%)`,
        `${currency}${taxAmount.toFixed(2)}`,
      ]);
    }

    summaryRows.push([
      "Total Payable Amount",
      `${currency}${total.toFixed(2)}`,
    ]);

    doc.setFontSize(8);

    summaryRows.forEach((row, idx) => {
      x = 10;
      const isLastRow = idx === summaryRows.length - 1;

      for (let i = 0; i < colCount; i++) {
        doc.setDrawColor(255, 255, 255);

        if (isLastRow) {
          setFillColorFromHex("F5F5F5");
          doc.rect(x, currentY, colWidth, rowHeight, "F");
        }

        doc.rect(x, currentY, colWidth, rowHeight);

        if (i === 0) {
          // Split label into main and percentage part - matches Word export
          const label = row[0] ?? "";
          const match = label.match(/^(.*?)(\(([^)]*)\))?$/);
          let tx = x + 3;

          setColorFromHex("000000");
          doc.setFont(defaultFont, isLastRow ? "bold" : "normal");

          if (match) {
            const mainText = (match[1] || "").trim();
            const percentText = match[3] || "";

            if (mainText) {
              const textToDraw = mainText + (percentText ? " " : "");
              doc.text(textToDraw, tx, currentY + 6);
              tx += doc.getTextWidth(textToDraw);
            }

            if (percentText) {
              setColorFromHex("A0A0A0");
              doc.text(`(${percentText})`, tx, currentY + 6);
              setColorFromHex("000000");
            }
          } else {
            doc.text(label.toString(), tx, currentY + 6);
          }
        } else if (i === colCount - 1) {
          const value = row[1] ?? "";
          doc.setFont(defaultFont, isLastRow ? "bold" : "normal");
          const valueText = value.toString();
          doc.text(
            valueText,
            x + colWidth - 3 - doc.getTextWidth(valueText),
            currentY + 6
          );
        }

        x += colWidth;
      }
      currentY += rowHeight;
    });

    currentY += 5;
  };

  // Create price table styled exactly like Word export
  const createPriceTable = (priceContent, options = {}) => {
    if (!Array.isArray(priceContent) || priceContent.length === 0) return;

    const currency =
      typeof options?.currency === "string" ? options.currency : "$";
    const showPercentage = !!options?.percentage;
    const showValue = !!options?.value;

    const headerLabels = ["Deliverable"];
    if (showPercentage) headerLabels.push("Percentage");
    if (showValue) headerLabels.push("Value");

    const colCount = headerLabels.length;
    const colWidth = availableWidth / colCount;
    const rowHeight = 9;

    checkPageBreak((priceContent.length + 3) * rowHeight + 20);

    // Header row with shading - matches Word export
    let x = 10;
    doc.setFontSize(10);
    doc.setFont(defaultFont, "bold");
    setFillColorFromHex("F5F5F5");
    setColorFromHex("000000");

    headerLabels.forEach((header) => {
      setFillColorFromHex("F5F5F5");
      doc.rect(x, currentY, colWidth, rowHeight, "F");
      doc.setDrawColor(222, 226, 230);
      doc.rect(x, currentY, colWidth, rowHeight);
      doc.text(
        header.toString(),
        x + colWidth / 2 - doc.getTextWidth(header) / 2,
        currentY + 7
      );
      x += colWidth;
    });
    currentY += rowHeight;

    let totalPercentage = 0;
    let totalValue = 0;

    doc.setFont(defaultFont, "normal");
    doc.setFontSize(10);

    // Draw data rows
    priceContent.forEach((item) => {
      const row = [item?.deliverable ?? ""];
      if (showPercentage) {
        const pct = Number(item?.percentage ?? 0);
        row.push(pct ? `${pct}%` : "");
        totalPercentage += pct;
      }
      if (showValue) {
        const val = Number(item?.value ?? 0);
        row.push(val ? `${currency}${val}` : "");
        totalValue += val;
      }

      checkPageBreak(rowHeight + 5);

      x = 10;
      row.forEach((cell, i) => {
        // Set background for first column
        if (i === 0) {
          setFillColorFromHex("F5F5F5");
          doc.rect(x, currentY, colWidth, rowHeight, "F");
        }
        doc.setDrawColor(222, 226, 230);
        doc.rect(x, currentY, colWidth, rowHeight);

        const align =
          i === 0 ? "left" : i === row.length - 1 ? "right" : "center";
        let tx;
        const cellText = cell.toString();

        switch (align) {
          case "left":
            tx = x + 4;
            break;
          case "right":
            tx = x + colWidth - 4 - doc.getTextWidth(cellText);
            break;
          default:
            tx = x + colWidth / 2 - doc.getTextWidth(cellText) / 2;
        }

        setColorFromHex("000000");
        doc.text(cellText, tx, currentY + 7);
        x += colWidth;
      });
      currentY += rowHeight;
    });

    // Total row with shading - matches Word export
    const totalRow = ["Total"];
    if (showPercentage) totalRow.push(`${totalPercentage}%`);
    if (showValue) totalRow.push(`${currency}${totalValue}`);

    x = 10;
    doc.setFont(defaultFont, "bold");
    doc.setFontSize(10);
    setFillColorFromHex("F5F5F5");

    totalRow.forEach((cell, i) => {
      setFillColorFromHex("F5F5F5");
      doc.rect(x, currentY, colWidth, rowHeight, "F");
      doc.setDrawColor(222, 226, 230);
      doc.rect(x, currentY, colWidth, rowHeight);

      const align =
        i === 0 ? "left" : i === totalRow.length - 1 ? "right" : "center";
      let tx;
      const cellText = cell.toString();

      switch (align) {
        case "left":
          tx = x + 4;
          break;
        case "right":
          tx = x + colWidth - 4 - doc.getTextWidth(cellText);
          break;
        default:
          tx = x + colWidth / 2 - doc.getTextWidth(cellText) / 2;
      }

      setColorFromHex("000000");
      doc.text(cellText, tx, currentY + 7);
      x += colWidth;
    });

    currentY += rowHeight + 5;
  };

  // Track items used in cover overlay to avoid duplication
  let skipNextItems = new Set();

  // Main processing loop with improved spacing - matches Word export exactly
  for (const [index, item] of data.entries()) {
    try {
      // Skip items that were used as cover overlay
      if (skipNextItems.has(item.id)) {
        continue;
      }

      switch (item.type) {
        case "cover":
          // Create a text-only cover page, matching web UI formatting
          const nextItems = data.slice(index + 1, index + 5);
          let overlayItemIds = new Set();

          for (const nextItem of nextItems) {
            if (
              (nextItem?.type === "heading" || nextItem?.type === "input") &&
              nextItem?.content &&
              Array.isArray(nextItem.content)
            ) {
              nextItem.content.forEach((block) => {
                const children = block?.children;
                const text =
                  Array.isArray(children) && children[0]?.text
                    ? children[0].text
                    : "";
                if (!text.trim()) return;

                checkPageBreak(30);

                // Determine style
                let size = 22;
                let color = "000000";
                let bold =
                  children &&
                  children[0] &&
                  typeof children[0].bold === "boolean"
                    ? children[0].bold
                    : true;
                let alignment = block?.align
                  ? block.align.toLowerCase()
                  : "center";

                if (block?.type && block.type.includes("heading")) {
                  const sizeMap = {
                    "heading-one": 24,
                    "heading-two": 18,
                    "heading-three": 15,
                    "heading-four": 13,
                    "heading-five": 11,
                    "heading-six": 10,
                  };
                  size = sizeMap[block.type] || 22;
                }

                doc.setFontSize(size);
                doc.setFont(headingFont, bold ? "bold" : "normal");
                setColorFromHex("000000");

                let xPosition = getAlignedXPosition(text, alignment);
                const lines = doc.splitTextToSize(text, availableWidth - 20);

                lines.forEach((line) => {
                  if (alignment === "center") {
                    xPosition = (pageWidth - doc.getTextWidth(line)) / 2;
                  }
                  doc.text(line, xPosition, currentY);
                  currentY += size * 0.6 + 2;
                  checkPageBreak(size + 10);
                });

                currentY += 6;
                overlayItemIds.add(nextItem.id);
              });
            }
          }

          if (overlayItemIds.size === 0) {
            checkPageBreak(30);
            doc.setFontSize(22);
            doc.setFont(headingFont, "bold");
            setColorFromHex("000000");

            const coverText = "COVER PAGE";
            let xPosition = (pageWidth - doc.getTextWidth(coverText)) / 2;
            doc.text(coverText, xPosition, currentY);
            currentY += 30;
          }

          overlayItemIds.forEach((id) => skipNextItems.add(id));
          break;

        case "heading":
          if (Array.isArray(item.content)) {
            item.content.forEach((headingBlock, idx) => {
              try {
                const children = headingBlock?.children;
                const text =
                  Array.isArray(children) && children[0]?.text
                    ? children[0].text
                    : "";
                if (!text.trim()) return;

                const size = item.size || "heading-two";
                const alignment = headingBlock?.align
                  ? headingBlock.align.toLowerCase()
                  : "left";
                const isBold =
                  children &&
                  children[0] &&
                  typeof children[0].bold === "boolean"
                    ? children[0].bold
                    : true;
                const textColor = convertTailwindTextColor(item.textColor);

                // Web-matching heading sizes
                const sizeMap = {
                  "heading-one": 20, // 40/2
                  "heading-two": 16, // 32/2
                  "heading-three": 14, // 28/2
                  "heading-four": 12, // 24/2
                  "heading-five": 10, // 20/2
                  "heading-six": 8, // 16/2
                };

                checkPageBreak(sizeMap[size] + 10);

                // Check if next item is also a heading for spacing
                const nextItem = data[index + 1];
                const isNextHeading = nextItem && nextItem.type === "heading";

                // Spacing before heading
                currentY += isNextHeading ? 8 : 12;

                doc.setFontSize(sizeMap[size] || 16);
                doc.setFont(headingFont, isBold ? "bold" : "normal");
                setColorFromHex("000000");

                let xPosition = getAlignedXPosition(text, alignment);
                const lines = doc.splitTextToSize(text, availableWidth - 20);

                lines.forEach((line) => {
                  if (alignment === "center") {
                    xPosition = (pageWidth - doc.getTextWidth(line)) / 2;
                  } else if (alignment === "right") {
                    xPosition = pageWidth - doc.getTextWidth(line) - 10;
                  }
                  doc.text(line, xPosition, currentY);
                  currentY += sizeMap[size] * 0.5 + 1;
                  checkPageBreak(sizeMap[size] + 5);
                });

                currentY += isNextHeading ? 2 : 6;
                doc.setFont(defaultFont, "normal");
              } catch (err) {
                console.error("Error in heading block", headingBlock, err);
                doc.setFontSize(9);
                doc.setFont(defaultFont, "italic");
                setColorFromHex("DC3545");
                doc.text(
                  `[Error processing heading block ${idx}]`,
                  10,
                  currentY
                );
                currentY += 12;
              }
            });
          }
          break;

        case "input":
        case "paragrapgh": // Handle misspelled type
          if (Array.isArray(item.content)) {
            processSlateContent(item.content, {
              color: convertTailwindTextColor(item.textColor),
            });
          }
          break;

        case "double-para":
          if (item.firstContent && item.secondContent) {
            const leftTexts = item.firstContent
              .map((block) => block?.children?.[0]?.text || "")
              .filter((t) => t.trim());
            const rightTexts = item.secondContent
              .map((block) => block?.children?.[0]?.text || "")
              .filter((t) => t.trim());

            if (leftTexts.length > 0 || rightTexts.length > 0) {
              checkPageBreak(
                Math.max(leftTexts.length, rightTexts.length) * 6 + 20
              );

              const textColor = convertTailwindTextColor(item.textColor);
              const leftAlignment =
                item.firstContent[0]?.align === "center"
                  ? "center"
                  : item.firstContent[0]?.align === "right"
                  ? "right"
                  : "left";
              const rightAlignment =
                item.secondContent[0]?.align === "center"
                  ? "center"
                  : item.secondContent[0]?.align === "right"
                  ? "right"
                  : "left";

              const halfWidth = (availableWidth - 10) / 2;
              const leftStartY = currentY;
              const rightStartY = currentY;

              // Process left column
              doc.setFontSize(11);
              doc.setFont(defaultFont, "normal");
              setColorFromHex("000000");

              leftTexts.forEach((text) => {
                let xPosition;
                switch (leftAlignment) {
                  case "center":
                    xPosition = 10 + halfWidth / 2 - doc.getTextWidth(text) / 2;
                    break;
                  case "right":
                    xPosition = 10 + halfWidth - doc.getTextWidth(text) - 5;
                    break;
                  default:
                    xPosition = 10;
                }

                const lines = doc.splitTextToSize(text, halfWidth - 10);
                lines.forEach((line) => {
                  doc.text(line, xPosition, currentY);
                  currentY += 6;
                });
                currentY += 2;
              });

              const leftEndY = currentY;
              currentY = rightStartY;

              // Process right column
              rightTexts.forEach((text) => {
                let xPosition;
                switch (rightAlignment) {
                  case "center":
                    xPosition =
                      10 +
                      halfWidth +
                      10 +
                      halfWidth / 2 -
                      doc.getTextWidth(text) / 2;
                    break;
                  case "right":
                    xPosition = pageWidth - doc.getTextWidth(text) - 10;
                    break;
                  default:
                    xPosition = 10 + halfWidth + 10;
                }

                const lines = doc.splitTextToSize(text, halfWidth - 10);
                lines.forEach((line) => {
                  doc.text(line, xPosition, currentY);
                  currentY += 6;
                });
                currentY += 2;
              });

              currentY = Math.max(leftEndY, currentY) + 5;
            }
          }
          break;

        case "table":
          createTable(item.content, {
            design: item.design || "normal",
            boldAll: item.boldAll,
            underlineAll: item.underlineAll,
            italicAll: item.italicAll,
            cellAlignAll: item.cellAlignAll,
            colAlign: item.colAlign,
          });
          break;

        case "cost":
          const mergedOptions = {
            ...(item.options || {}),
            values: item.values || {},
          };
          createCostTable(item.content, mergedOptions);
          break;

        case "price":
          if (Array.isArray(item.content)) {
            createPriceTable(item.content, item.options);
          }
          break;

        case "image":
          if (item.content) {
            await createImageParagraph(item.content, {
              width: parseInt(item.width) || 80,
              height: parseInt(item.height) || 60,
              context: "inline",
              alignment:
                item.aliegn === "left"
                  ? "left"
                  : item.aliegn === "right"
                  ? "right"
                  : "center",
            });

            if (item.caption) {
              checkPageBreak(15);
              doc.setFontSize(8);
              doc.setFont(defaultFont, "italic");
              setColorFromHex("6C757D");

              const captionWidth = doc.getTextWidth(item.caption);
              const xPosition = (pageWidth - captionWidth) / 2;
              doc.text(item.caption, xPosition, currentY);
              currentY += 12;
              doc.setFont(defaultFont, "normal");
            }
          }
          break;

        case "image-para":
          if (Array.isArray(item.content) && item.ImageLink) {
            const text = item.content
              .map((block) => block?.children?.[0]?.text || "")
              .join(" ");
            const isLeftAligned = item.align === "left";

            checkPageBreak(60);

            const imageWidth = parseInt(item.width) || 50;
            const imageHeight = parseInt(item.height) || 40;
            const textWidth = availableWidth - imageWidth - 15;

            if (isLeftAligned) {
              // Image on left, text on right
              try {
                if (item.ImageLink) {
                  doc.addImage(
                    item.ImageLink,
                    "JPEG",
                    10,
                    currentY,
                    imageWidth,
                    imageHeight
                  );
                } else {
                  doc.addImage(
                    ImageAlter,
                    "JPEG",
                    10,
                    currentY,
                    imageWidth,
                    imageHeight
                  );
                }
              } catch (error) {
                console.log("Image load error:", error);
              }

              doc.setFontSize(11);
              doc.setFont(defaultFont, "normal");
              setColorFromHex("000000");

              const lines = doc.splitTextToSize(text, textWidth);
              let textY = currentY + 5;

              lines.forEach((line) => {
                doc.text(line, 10 + imageWidth + 10, textY);
                textY += 6;
              });

              currentY += Math.max(imageHeight, lines.length * 6) + 10;
            } else {
              // Text on left, image on right
              doc.setFontSize(11);
              doc.setFont(defaultFont, "normal");
              setColorFromHex("000000");

              const lines = doc.splitTextToSize(text, textWidth);
              let textY = currentY + 5;

              lines.forEach((line) => {
                doc.text(line, 10, textY);
                textY += 6;
              });

              try {
                if (item.ImageLink) {
                  doc.addImage(
                    item.ImageLink,
                    "JPEG",
                    pageWidth - imageWidth - 10,
                    currentY,
                    imageWidth,
                    imageHeight
                  );
                } else {
                  doc.addImage(
                    ImageAlter,
                    "JPEG",
                    pageWidth - imageWidth - 10,
                    currentY,
                    imageWidth,
                    imageHeight
                  );
                }
              } catch (error) {
                console.log("Image load error:", error);
              }

              currentY += Math.max(imageHeight, lines.length * 6) + 10;
            }
          }
          break;

        case "double-image":
          if (item.ImageLink1 && item.ImageLink2) {
            checkPageBreak(60);

            const imageWidth = parseInt(item.width1 || item.width2) || 50;
            const imageHeight = parseInt(item.height1 || item.height2) || 40;
            const spacing = 10;
            const totalWidth = imageWidth * 2 + spacing;
            const startX = (pageWidth - totalWidth) / 2;

            try {
              if (item.ImageLink1) {
                doc.addImage(
                  item.ImageLink1,
                  "JPEG",
                  startX,
                  currentY,
                  imageWidth,
                  imageHeight
                );
              } else {
                doc.addImage(
                  ImageAlter,
                  "JPEG",
                  startX,
                  currentY,
                  imageWidth,
                  imageHeight
                );
              }
              if (item.ImageLink2) {
                doc.addImage(
                  item.ImageLink2,
                  "JPEG",
                  startX + imageWidth + spacing,
                  currentY,
                  imageWidth,
                  imageHeight
                );
              } else {
                doc.addImage(
                  ImageAlter,
                  "JPEG",
                  startX + imageWidth + spacing,
                  currentY,
                  imageWidth,
                  imageHeight
                );
              }
            } catch (error) {
              console.log("Image load error:", error);
            }

            currentY += imageHeight + 10;
          }
          break;

        case "code":
          if (item.content) {
            createCodeBlock(item.content);
          }
          break;

        case "line":
          checkPageBreak(15);
          currentY += 6;

          doc.setDrawColor(222, 226, 230);
          doc.line(10, currentY, pageWidth - 10, currentY);

          currentY += 6;
          break;

        case "sign":
          if (Array.isArray(item.content) && item.content.length >= 2) {
            checkPageBreak(90);

            // Signature Block Container
            const blockX = 10;
            const blockY = currentY + 20;
            const blockWidth = availableWidth;
            const blockHeight = 60;

            // Draw background
            doc.setFillColor(245, 245, 245); // light gray
            doc.rect(blockX, blockY, blockWidth, blockHeight, "F");
            // Draw border
            doc.setDrawColor(180, 180, 180);
            doc.rect(blockX, blockY, blockWidth, blockHeight);

            // Heading
            doc.setFontSize(15);
            doc.setFont(headingFont, "bold");
            setColorFromHex("000000");
            doc.text("Signatures", blockX + 5, blockY - 8);

            // Two columns: Proposed By & Accepted By
            const colWidth = (blockWidth - 20) / 2;
            const leftX = blockX + 10;
            const rightX = blockX + 10 + colWidth + 10;
            const labelY = blockY + 12;
            const lineY = blockY + 28;
            const nameY = blockY + 38;

            // Labels
            doc.setFontSize(11);
            doc.setFont(defaultFont, "bold");
            setColorFromHex("000000");
            doc.text("Proposed By", leftX, labelY);
            doc.text("Accepted By", rightX, labelY);

            // Signature lines
            doc.setDrawColor(120, 120, 120);
            doc.line(leftX, lineY, leftX + colWidth - 20, lineY);
            doc.line(rightX, lineY, rightX + colWidth - 20, lineY);

            // Names below lines
            doc.setFontSize(10);
            doc.setFont(defaultFont, "normal");
            setColorFromHex("000000");
            const proposedName = item.content[0]?.proposedName || "";
            const acceptedName = item.content[1]?.acceptedName || "";
            doc.text(proposedName, leftX, nameY);
            doc.text(acceptedName, rightX, nameY);

            // Optional: Date fields
            doc.setFontSize(9);
            setColorFromHex("6C757D");
            doc.text("Date:", leftX, blockY + 50);
            doc.text("Date:", rightX, blockY + 50);

            currentY = blockY + blockHeight + 10;
          }
          break;

        case "brake":
          doc.addPage();
          currentY = 20;
          break;

        default:
          // Improved fallback handling for unknown types
          console.warn(`Unhandled content type '${item.type}':`, item);

          if (Array.isArray(item.content)) {
            try {
              processSlateContent(item.content, {
                color: convertTailwindTextColor(item.textColor),
              });
              console.log(
                `Successfully processed unknown type '${item.type}' as text content`
              );
            } catch (err) {
              console.error(
                `Failed to process unknown type '${item.type}' as text:`,
                err
              );

              checkPageBreak(15);
              doc.setFontSize(8);
              doc.setFont(defaultFont, "italic");
              setColorFromHex("DC3545");
              doc.text(`[Error: Could not process ${item.type}]`, 10, currentY);
              currentY += 12;
            }
          } else {
            checkPageBreak(10);
            doc.setFontSize(7);
            doc.setFont(defaultFont, "italic");
            setColorFromHex("6C757D");
            doc.text(
              `[Debug: Skipped ${item.type} - no content array]`,
              10,
              currentY
            );
            currentY += 8;
          }
          break;
      }
    } catch (error) {
      console.error(`Error processing item of type '${item.type}':`, error);

      checkPageBreak(15);
      doc.setFontSize(9);
      doc.setFont(defaultFont, "italic");
      setColorFromHex("DC3545");
      doc.text(`[Error processing ${item.type} content]`, 10, currentY);
      currentY += 15;
    }
  }

  // Save the PDF with proper naming
  const fileName = `${jsonData.proposalName || "Business_Proposal"}.pdf`;
  doc.save(fileName);
  console.log(
    `PDF "${fileName}" generated successfully with Word-matching styling`
  );
};

export default GeneratePDF;
