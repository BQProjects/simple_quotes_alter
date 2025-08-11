import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  PageBreak,
  AlignmentType,
  HeadingLevel,
  ImageRun,
  WidthType,
  BorderStyle,
  ShadingType,
  convertInchesToTwip,
  convertMillimetersToTwip,
  TableLayoutType,
  Media,
  VerticalAlign,
  Header,
  Footer,
} from "docx";
import { saveAs } from "file-saver";

// Enhanced image fetching with better error handling and format support
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

    // Try alternative approach with proxy or different headers
    try {
      const proxyResponse = await fetch(
        `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`
      );
      if (proxyResponse.ok) {
        return await proxyResponse.arrayBuffer();
      }
    } catch (proxyError) {
      console.error("Proxy fetch also failed:", proxyError);
    }

    return null;
  }
};

// Improved image dimensions to maintain proper aspect ratios
const getImageDimensions = (
  width,
  height,
  maxWidth = 600,
  maxHeight = 400,
  context = "normal"
) => {
  let w = parseInt(width) || maxWidth;
  let h = parseInt(height) || maxHeight;

  // Context-specific sizing to match web layout exactly
  switch (context) {
    case "cover":
      maxWidth = 650;
      maxHeight = 450;
      break;
    case "inline":
      maxWidth = 500;
      maxHeight = 350;
      break;
    case "side":
      maxWidth = 280;
      maxHeight = 200;
      break;
    case "double":
      maxWidth = 320;
      maxHeight = 240;
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
    width: Math.round(Math.max(w, 120)),
    height: Math.round(Math.max(h, 80)),
  };
};

const JsonToWord = async (jsonData) => {
  const data = jsonData.data || jsonData;
  const settings = jsonData.settings || {};
  const allContent = [];

  // Document-level settings that match web typography
  const defaultFont = "Arial";
  const headingFont = "Arial";
  const codeFont = "Arial";
  const defaultColor = settings.color || "#212529";
  const theme = settings.theme || 0;

  // Color conversion helper
  const convertToHex = (colorValue) => {
    if (!colorValue) return defaultColor.replace("#", "");

    // If it's already a valid hex without #, return as-is
    if (typeof colorValue === "string" && /^[0-9A-Fa-f]{6}$/.test(colorValue)) {
      return colorValue;
    }

    // Remove # if present
    if (typeof colorValue === "string" && colorValue.startsWith("#")) {
      const hex = colorValue.slice(1);
      if (/^[0-9A-Fa-f]{6}$/.test(hex)) {
        return hex;
      }
    }

    // Handle common color names
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

      // Try to extract hex from various formats
      if (/^[0-9A-Fa-f]{3}$/.test(lowerColor)) {
        // Convert 3-digit hex to 6-digit
        return lowerColor
          .split("")
          .map((char) => char + char)
          .join("");
      }
    }

    // Fallback to default color
    return defaultColor.replace("#", "");
  };

  // Convert Tailwind CSS text color classes to hex values
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

    // Return mapped color or try to extract color from class
    if (colorMap[textColor]) {
      return colorMap[textColor];
    }

    // If it's already a hex color, process it
    if (textColor.startsWith("#")) {
      return convertToHex(textColor);
    }

    // Extract color from text-{color}-{shade} pattern
    const match = textColor.match(/text-(\w+)-?(\d+)?/);
    if (match) {
      const [, color, shade] = match;
      const key = shade ? `text-${color}-${shade}` : `text-${color}`;
      if (colorMap[key]) {
        return colorMap[key];
      }
    }

    // Fallback to default
    console.warn(`Unknown textColor: ${textColor}, using default`);
    return convertToHex(defaultColor);
  };

  // Web-matching typography function with ultra-tight spacing
  const createParagraph = (text, options = {}) => {
    const {
      bold = false,
      italic = false,
      underline = false,
      strikethrough = false,
      link = false,
      size = 22,
      color = defaultColor.replace("#", ""),
      alignment = AlignmentType.LEFT,
      heading = null,
      spacing = { before: 30, after: 30 }, // Ultra-tight default spacing to match web
      indent = null,
      font = defaultFont,
      lineSpacing = 1.15, // Web-like line spacing
      numbering = null,
    } = options;

    let textRun;
    if (link && text) {
      // Create a hyperlink text run
      textRun = new TextRun({
        text: text || "",
        bold: bold,
        italics: italic,
        underline: true, // Links are always underlined
        strike: strikethrough,
        size: size,
        color: "0000FF", // Blue color for links
        font: font,
      });
    } else {
      textRun = new TextRun({
        text: text || "",
        bold: bold,
        italics: italic,
        underline: underline,
        strike: strikethrough,
        size: size,
        color: convertToHex(color),
        font: font,
      });
    }

    return new Paragraph({
      children: [textRun],
      alignment: alignment,
      heading: heading,
      spacing: spacing,
      indent: indent,
      numbering: numbering,
      style: lineSpacing !== 1.15 ? "CustomLineSpacing" : undefined,
    });
  };

  // Enhanced function to process Slate content with proper formatting
  const processSlateContent = (content, options = {}) => {
    if (!content || !Array.isArray(content)) return [];

    const paragraphs = [];

    content.forEach((block) => {
      if (!block || !block.children) return;

      // Extract alignment from block
      const blockAlignment =
        block.align === "center"
          ? AlignmentType.CENTER
          : block.align === "right"
          ? AlignmentType.RIGHT
          : AlignmentType.LEFT;

      // Determine text size based on block type
      let textSize = 22;
      let headingLevel = null;
      let isHeading = false;

      if (block.type) {
        const sizeMap = {
          "heading-one": 48,
          "heading-two": 36,
          "heading-three": 30,
          "heading-four": 26,
          "heading-five": 22,
          "heading-six": 20,
          paragrapgh: 22,
          "paragrapgh-two": 20,
        };
        textSize = sizeMap[block.type] || 22;

        if (block.type.includes("heading")) {
          isHeading = true;
          const headingMap = {
            "heading-one": HeadingLevel.HEADING_1,
            "heading-two": HeadingLevel.HEADING_2,
            "heading-three": HeadingLevel.HEADING_3,
            "heading-four": HeadingLevel.HEADING_4,
            "heading-five": HeadingLevel.HEADING_5,
            "heading-six": HeadingLevel.HEADING_6,
          };
          headingLevel = headingMap[block.type];
        }
      }

      // Handle list items
      if (block.type === "bulleted-list") {
        block.children.forEach((listItem, index) => {
          if (listItem.type === "list-item" && listItem.children) {
            const listText = listItem.children
              .map((child) => child.text || "")
              .join("");
            if (listText.trim()) {
              paragraphs.push(
                createParagraph(listText, {
                  ...options,
                  size: textSize,
                  alignment: blockAlignment,
                  numbering: {
                    reference: "bullet-numbering",
                    level: 0,
                  },
                  spacing: { before: 60, after: 60 },
                })
              );
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
              paragraphs.push(
                createParagraph(listText, {
                  ...options,
                  size: textSize,
                  alignment: blockAlignment,
                  numbering: {
                    reference: "numbered-numbering",
                    level: 0,
                  },
                  spacing: { before: 60, after: 60 },
                })
              );
            }
          }
        });
        return;
      }

      // Process regular paragraph content with mixed formatting
      const textRuns = [];

      block.children.forEach((child) => {
        if (!child) return;

        const text = child.text || "";
        if (!text && !child.children) return;

        // Handle nested content
        if (child.children && Array.isArray(child.children)) {
          child.children.forEach((nestedChild) => {
            const nestedText = nestedChild.text || "";
            if (nestedText) {
              textRuns.push(
                new TextRun({
                  text: nestedText,
                  bold: nestedChild.bold || false,
                  italics: nestedChild.italic || false,
                  underline: nestedChild.underline || false,
                  strike: nestedChild.strikethrough || false,
                  size: textSize,
                  color: nestedChild.link
                    ? "0000FF"
                    : options.color || convertToHex(defaultColor),
                  font: defaultFont,
                })
              );
            }
          });
        } else if (text) {
          // Handle direct text content
          textRuns.push(
            new TextRun({
              text: text,
              bold: child.bold || false,
              italics: child.italic || false,
              underline: child.underline || child.link || false,
              strike: child.strikethrough || false,
              size: textSize,
              color: child.link
                ? "0000FF"
                : options.color || convertToHex(defaultColor),
              font: defaultFont,
            })
          );
        }
      });

      // Create paragraph only if we have content
      if (textRuns.length > 0) {
        paragraphs.push(
          new Paragraph({
            children: textRuns,
            alignment: blockAlignment,
            heading: headingLevel,
            spacing: isHeading
              ? { before: 240, after: 120 }
              : { before: 120, after: 120 },
          })
        );
      } else {
        // Empty paragraph for spacing
        paragraphs.push(
          new Paragraph({
            children: [new TextRun({ text: "", size: textSize })],
            alignment: blockAlignment,
            spacing: { before: 60, after: 60 },
          })
        );
      }
    });

    return paragraphs;
  };

  const validateImageUrl = (url) => {
    if (!url || typeof url !== "string") return false;

    try {
      const urlObj = new URL(url);
      // Only allow http/https protocols
      if (!["http:", "https:"].includes(urlObj.protocol)) return false;

      // Check for image file extensions (basic validation)
      const pathname = urlObj.pathname.toLowerCase();
      const imageExtensions = [
        ".jpg",
        ".jpeg",
        ".png",
        ".gif",
        ".bmp",
        ".webp",
      ];
      const hasImageExtension = imageExtensions.some(
        (ext) => pathname.endsWith(ext) || pathname.includes(ext)
      );

      // Allow if has image extension OR if it's a dynamic URL (no extension)
      return hasImageExtension || !pathname.includes(".");
    } catch {
      return false;
    }
  };

  // Fixed createImageParagraph function with proper error handling and format detection
  const createImageParagraph = async (imageUrl, options = {}) => {
    const {
      alignment = AlignmentType.CENTER,
      width = 400,
      height = 300,
      spacing = { before: 60, after: 60 },
      maxWidth = 600,
      maxHeight = 400,
      context = "normal",
    } = options;

    try {
      // Validate URL
      if (!imageUrl || typeof imageUrl !== "string") {
        throw new Error("Invalid image URL");
      }

      const imageBuffer = await fetchImageAsArrayBuffer(imageUrl);
      if (!imageBuffer || imageBuffer.byteLength === 0) {
        throw new Error("Empty or invalid image buffer");
      }

      // Detect image format from buffer
      const uint8Array = new Uint8Array(imageBuffer);
      let format = "png"; // default fallback

      // Check magic bytes for common formats
      if (
        uint8Array[0] === 0xff &&
        uint8Array[1] === 0xd8 &&
        uint8Array[2] === 0xff
      ) {
        format = "jpg";
      } else if (
        uint8Array[0] === 0x89 &&
        uint8Array[1] === 0x50 &&
        uint8Array[2] === 0x4e &&
        uint8Array[3] === 0x47
      ) {
        format = "png";
      } else if (
        uint8Array[0] === 0x47 &&
        uint8Array[1] === 0x49 &&
        uint8Array[2] === 0x46
      ) {
        format = "gif";
      } else if (
        uint8Array[0] === 0x52 &&
        uint8Array[1] === 0x49 &&
        uint8Array[2] === 0x46 &&
        uint8Array[3] === 0x46
      ) {
        format = "webp";
      } else if (uint8Array[0] === 0x42 && uint8Array[1] === 0x4d) {
        format = "bmp";
      }

      // Skip unsupported formats
      if (!["jpg", "jpeg", "png", "gif", "bmp"].includes(format)) {
        throw new Error(`Unsupported image format: ${format}`);
      }

      const dimensions = getImageDimensions(
        width,
        height,
        maxWidth,
        maxHeight,
        context
      );

      // Validate dimensions
      if (
        !dimensions.width ||
        !dimensions.height ||
        dimensions.width < 10 ||
        dimensions.height < 10
      ) {
        throw new Error("Invalid image dimensions");
      }

      // Create the image run with proper error handling
      const imageRun = new ImageRun({
        data: imageBuffer,
        transformation: {
          width: Math.round(dimensions.width),
          height: Math.round(dimensions.height),
        },
        type: format === "jpg" ? "jpg" : format, // Ensure correct type mapping
      });

      return new Paragraph({
        children: [imageRun],
        alignment: alignment,
        spacing: spacing,
      });
    } catch (error) {
      console.error("Error creating image:", error);

      // Return a more styled fallback paragraph
      const fileName = imageUrl
        ? imageUrl.split("/").pop() || "image"
        : "unknown";

      return new Paragraph({
        children: [
          new TextRun({
            text: `[Image unavailable: ${fileName}]`,
            italic: true,
            size: 20,
            color: "999999",
            font: defaultFont,
          }),
        ],
        alignment: alignment,
        spacing: spacing,
        borders: {
          top: { style: BorderStyle.SINGLE, size: 4, color: "DDDDDD" },
          bottom: { style: BorderStyle.SINGLE, size: 4, color: "DDDDDD" },
          left: { style: BorderStyle.SINGLE, size: 4, color: "DDDDDD" },
          right: { style: BorderStyle.SINGLE, size: 4, color: "DDDDDD" },
        },
        shading: {
          fill: "F8F9FA",
          type: ShadingType.SOLID,
        },
        indent: {
          left: convertMillimetersToTwip(10),
          right: convertMillimetersToTwip(10),
        },
      });
    }
  };

  // Enhanced image fetching with better error handling and timeout
  const fetchImageAsArrayBuffer = async (url) => {
    try {
      // Add timeout to prevent hanging
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch(url, {
        mode: "cors",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          Accept: "image/*",
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.startsWith("image/")) {
        throw new Error(`Invalid content type: ${contentType}`);
      }

      const buffer = await response.arrayBuffer();

      // Validate buffer size (not too small, not too large)
      if (buffer.byteLength < 100) {
        throw new Error("Image file too small");
      }
      if (buffer.byteLength > 10 * 1024 * 1024) {
        // 10MB limit
        throw new Error("Image file too large");
      }

      return buffer;
    } catch (error) {
      console.error("Error fetching image:", error);

      // Try alternative approach with proxy (only if original fails)
      if (error.name !== "AbortError") {
        try {
          const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(
            url
          )}`;
          const proxyResponse = await fetch(proxyUrl, {
            mode: "cors",
            headers: {
              Accept: "image/*",
            },
          });

          if (proxyResponse.ok) {
            const buffer = await proxyResponse.arrayBuffer();
            if (buffer.byteLength > 100) {
              return buffer;
            }
          }
        } catch (proxyError) {
          console.error("Proxy fetch also failed:", proxyError);
        }
      }

      return null;
    }
  };

  // Improved dimension calculation with validation
  const getImageDimensions = (
    width,
    height,
    maxWidth = 600,
    maxHeight = 400,
    context = "normal"
  ) => {
    // Parse and validate input dimensions
    let w = parseInt(width, 10) || maxWidth;
    let h = parseInt(height, 10) || maxHeight;

    // Ensure positive values
    w = Math.max(w, 50);
    h = Math.max(h, 50);

    // Context-specific sizing
    switch (context) {
      case "cover":
        maxWidth = Math.min(maxWidth, 650);
        maxHeight = Math.min(maxHeight, 450);
        break;
      case "inline":
        maxWidth = Math.min(maxWidth, 500);
        maxHeight = Math.min(maxHeight, 350);
        break;
      case "side":
        maxWidth = Math.min(maxWidth, 280);
        maxHeight = Math.min(maxHeight, 200);
        break;
      case "double":
        maxWidth = Math.min(maxWidth, 320);
        maxHeight = Math.min(maxHeight, 240);
        break;
    }

    // Maintain aspect ratio while fitting within bounds
    const aspectRatio = w / h;

    if (w > maxWidth) {
      w = maxWidth;
      h = Math.round(w / aspectRatio);
    }
    if (h > maxHeight) {
      h = maxHeight;
      w = Math.round(h * aspectRatio);
    }

    // Ensure minimum dimensions for Word compatibility
    const finalWidth = Math.max(Math.round(w), 50);
    const finalHeight = Math.max(Math.round(h), 50);
    const singleIMGHeight = Math.max(finalHeight, 250);
    const singleIMGWidth = Math.max(finalWidth, 250);
    return {
      width: finalWidth,
      height: finalHeight,
      singlewidth: singleIMGHeight,
      singleheight: singleIMGWidth,
    };
  };

  // Improved code block formatting to match web view exactly
  const createCodeBlock = (codeContent, options = {}) => {
    const { spacing = { before: 80, after: 80 } } = options;

    const lines = (codeContent || "")
      .toString()
      .split("\n")
      .map((l) => (l === "" ? " " : l));

    // Use a one-cell table to get consistent background, left bar and inner padding
    const codeParagraphs = lines.map(
      (line) =>
        new Paragraph({
          children: [new TextRun({ text: line, size: 16, font: codeFont })],
          spacing: { before: 0, after: 20 },
        })
    );

    const codeCell = new TableCell({
      children: codeParagraphs,
      borders: {
        left: { style: BorderStyle.SINGLE, size: 8, color: "E0E0E0" },
        top: { style: BorderStyle.SINGLE, size: 2, color: "E0E0E0" },
        bottom: { style: BorderStyle.SINGLE, size: 2, color: "E0E0E0" },
        right: { style: BorderStyle.SINGLE, size: 2, color: "E0E0E0" },
      },
      shading: { fill: "F3F4F6" },
      margins: { top: 120, bottom: 120, left: 200, right: 200 }, // inner padding
    });

    const codeTable = new Table({
      rows: [new TableRow({ children: [codeCell] })],
      width: { size: 100, type: WidthType.PERCENTAGE },
      layout: TableLayoutType.AUTOFIT,
      margins: { top: 0, bottom: 0 },
    });

    return [
      createParagraph("Code:", {
        bold: false,
        size: 32,
        spacing: { before: spacing.before, after: 20 },
        color: "333333",
      }),
      codeTable,
      createParagraph("", { spacing: { before: 20, after: spacing.after } }),
    ];
  };

  const createTable = (tableData, options = {}) => {
    if (!Array.isArray(tableData) || tableData.length === 0) return null;

    const {
      design = "normal",
      boldAll = [],
      underlineAll = [],
      italicAll = [],
      colAlign = [],
      cellAlignAll = [],
    } = options;

    // Helper for background color based on design
    const getCellShading = (colIndex, rowIndex) => {
      switch (design) {
        case "alternativerow":
          return rowIndex % 2 === 0 ? "E5E7EB" : "F3F4F6";
        case "alternativecol":
          return colIndex % 2 === 0 ? "E5E7EB" : "F3F4F6";
        case "toprow":
          return rowIndex === 0 ? "E5E7EB" : "FFFFFF";
        case "leftcol":
          return colIndex === 0 ? "E5E7EB" : "FFFFFF";
        default:
          return "FFFFFF";
      }
    };

    const toAlign = (val, fallback) => {
      if (val === "left") return AlignmentType.LEFT;
      if (val === "center") return AlignmentType.CENTER;
      if (val === "right") return AlignmentType.RIGHT;
      return fallback;
    };

    const rows = tableData.map((row, rowIndex) => {
      const cells = Array.isArray(row) ? row : [];
      const isHeaderRow = rowIndex === 0;
      return new TableRow({
        children: cells.map((cellText, cellIndex) => {
          const textBold = boldAll?.[rowIndex]?.[cellIndex] === true;
          const textUnderline = !!underlineAll?.[rowIndex]?.[cellIndex];
          const textItalic = !!italicAll?.[rowIndex]?.[cellIndex];
          const textColor = "212529";

          // Alignment priority: per-cell -> per-col -> default(left first, right last, center otherwise)
          const perCell = cellAlignAll?.[rowIndex]?.[cellIndex];
          const perCol = colAlign?.[cellIndex];
          const defaultAlign =
            cellIndex === 0
              ? AlignmentType.LEFT
              : cellIndex === cells.length - 1
              ? AlignmentType.RIGHT
              : AlignmentType.CENTER;
          const cellAlign = toAlign(perCell, toAlign(perCol, defaultAlign));

          return new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: (cellText ?? "").toString(),
                    size: isHeaderRow ? 18 : 16,
                    font: defaultFont,
                    bold: textBold,
                    underline: textUnderline,
                    italics: textItalic,
                    color: textColor,
                  }),
                ],
                alignment: cellAlign,
                spacing: { before: 10, after: 10 },
              }),
            ],
            width: {
              size: 100 / (cells.length || 1),
              type: WidthType.PERCENTAGE,
            },
            borders: {
              top: { style: BorderStyle.SINGLE, size: 2, color: "B0B0B0" },
              bottom: { style: BorderStyle.SINGLE, size: 2, color: "B0B0B0" },
              left: { style: BorderStyle.SINGLE, size: 2, color: "B0B0B0" },
              right: { style: BorderStyle.SINGLE, size: 2, color: "B0B0B0" },
            },
            shading: { fill: getCellShading(cellIndex, rowIndex) },
            margins: { top: 20, bottom: 20, left: 20, right: 20 },
            verticalAlign: VerticalAlign.CENTER,
          });
        }),
      });
    });

    return new Table({
      rows,
      width: { size: 100, type: WidthType.PERCENTAGE },
      layout: TableLayoutType.AUTOFIT,
      margins: { top: 40, bottom: 40 },
    });
  };

  // Create a cost table with dynamic column widths
  const createCostTable = (costContent, options = {}) => {
    console.log("costContent:", JSON.stringify(costContent, null, 2));

    const showQuantity = !!options?.quantity;
    const headerLabels = showQuantity
      ? ["Description", "Unit Price", "Quantity", "Amount"]
      : ["Description", "Amount"];

    const getColumnWidths = () => {
      const colCount = headerLabels.length;
      const widths = [];
      widths.push(60); // Description fixed at 60%
      const remainingWidth = 40;
      const otherCols = colCount - 1;
      const perOtherCol = remainingWidth / otherCols;
      for (let i = 0; i < otherCols; i++) widths.push(perOtherCol);
      return widths;
    };

    const columnWidths = getColumnWidths();

    const dataRows = Array.isArray(costContent)
      ? costContent
          .filter((row) => typeof row === "object" && row !== null)
          .map((rowObj) => {
            const rowArr = showQuantity
              ? [
                  rowObj.deliverable ?? "",
                  rowObj.price ?? "",
                  rowObj.quantity ?? "",
                  rowObj.amount ?? "",
                ]
              : [rowObj.deliverable ?? "", rowObj.amount ?? ""];

            return new TableRow({
              children: rowArr.map(
                (cell, i) =>
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [
                          new TextRun({
                            text: cell?.toString() || "",
                            size: 16,
                            font: defaultFont,
                          }),
                        ],
                        alignment:
                          i === 0 ? AlignmentType.LEFT : AlignmentType.CENTER,
                        spacing: { before: 30, after: 30 },
                      }),
                    ],
                    width: {
                      size: columnWidths[i],
                      type: WidthType.PERCENTAGE,
                    },
                    borders: {
                      top: {
                        style: BorderStyle.SINGLE,
                        size: 2,
                        color: "DEE2E6",
                      },
                      bottom: {
                        style: BorderStyle.SINGLE,
                        size: 2,
                        color: "DEE2E6",
                      },
                      left: {
                        style: BorderStyle.SINGLE,
                        size: 2,
                        color: "DEE2E6",
                      },
                      right: {
                        style: BorderStyle.SINGLE,
                        size: 2,
                        color: "DEE2E6",
                      },
                    },
                    margins: { top: 60, bottom: 60, left: 80, right: 80 },
                    verticalAlign: VerticalAlign.CENTER,
                  })
              ),
            });
          })
      : [];

    const headerRow = new TableRow({
      children: headerLabels.map(
        (label, i) =>
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: label,
                    bold: true,
                    size: 18,
                    font: defaultFont,
                  }),
                ],
                alignment: i === 0 ? AlignmentType.LEFT : AlignmentType.CENTER,
                spacing: { before: 30, after: 30 },
              }),
            ],
            width: {
              size: columnWidths[i],
              type: WidthType.PERCENTAGE,
            },
            shading: { fill: "f5f5f5" },
            borders: {
              top: { style: BorderStyle.SINGLE, size: 2, color: "DEE2E6" },
              bottom: { style: BorderStyle.SINGLE, size: 2, color: "DEE2E6" },
              left: { style: BorderStyle.SINGLE, size: 2, color: "DEE2E6" },
              right: { style: BorderStyle.SINGLE, size: 2, color: "DEE2E6" },
            },
            margins: { top: 60, bottom: 60, left: 80, right: 80 },
            verticalAlign: VerticalAlign.CENTER,
          })
      ),
    });

    if (!Array.isArray(costContent) || costContent.length === 0) return null;

    const hasDiscount = options?.discount;
    const hasTax = options?.tax;
    const currency =
      typeof options?.currency === "string" ? options.currency : "$";
    const discountValue = Number(options?.values?.discount ?? 0);
    const taxValue = Number(options?.values?.tax ?? 0);

    let subtotal = costContent.reduce((sum, row) => {
      let amount = 0;
      if (typeof row === "object" && row !== null && "amount" in row) {
        amount = Number(row.amount) || 0;
      }
      return sum + amount;
    }, 0);

    const discountAmount = hasDiscount ? subtotal * (discountValue / 100) : 0;
    const taxAmount = hasTax ? subtotal * (taxValue / 100) : 0;
    const total = subtotal - discountAmount + taxAmount;

    const makeFullWidthSummaryRow = (label, value) => {
      const cells = [];
      headerLabels.forEach((_, i) => {
        if (i === 0) {
          cells.push(
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: label,
                      bold: true,
                      size: 16,
                      font: defaultFont,
                    }),
                  ],
                  alignment: AlignmentType.LEFT,
                }),
              ],
              width: { size: columnWidths[i], type: WidthType.PERCENTAGE },
              borders: {
                top: { style: BorderStyle.SINGLE, size: 2, color: "FFFFFF" },
                bottom: { style: BorderStyle.SINGLE, size: 2, color: "FFFFFF" },
                left: { style: BorderStyle.SINGLE, size: 2, color: "FFFFFF" },
                right: { style: BorderStyle.SINGLE, size: 2, color: "FFFFFF" },
              },
            })
          );
        } else if (i === headerLabels.length - 1) {
          cells.push(
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: value,
                      bold: true,
                      size: 16,
                      font: defaultFont,
                    }),
                  ],
                  alignment: AlignmentType.RIGHT,
                }),
              ],
              width: { size: columnWidths[i], type: WidthType.PERCENTAGE },
              borders: {
                top: { style: BorderStyle.SINGLE, size: 2, color: "FFFFFF" },
                bottom: { style: BorderStyle.SINGLE, size: 2, color: "FFFFFF" },
                left: { style: BorderStyle.SINGLE, size: 2, color: "FFFFFF" },
                right: { style: BorderStyle.SINGLE, size: 2, color: "FFFFFF" },
              },
            })
          );
        } else {
          cells.push(
            new TableCell({
              children: [
                new Paragraph({ children: [new TextRun({ text: "" })] }),
              ],
              width: { size: columnWidths[i], type: WidthType.PERCENTAGE },
              borders: {
                top: { style: BorderStyle.SINGLE, size: 2, color: "FFFFFF" },
                bottom: { style: BorderStyle.SINGLE, size: 2, color: "FFFFFF" },
                left: { style: BorderStyle.SINGLE, size: 2, color: "FFFFFF" },
                right: { style: BorderStyle.SINGLE, size: 2, color: "FFFFFF" },
              },
            })
          );
        }
      });
      return new TableRow({ children: cells });
    };

    const summaryRows = [
      makeFullWidthSummaryRow("Total", `${currency}${subtotal}`),
    ];
    if (hasDiscount) {
      summaryRows.push(
        makeFullWidthSummaryRow(
          `Discount (${discountValue}%)`,
          `${currency}${discountAmount.toFixed(2)}`
        )
      );
    }
    if (hasTax) {
      summaryRows.push(
        makeFullWidthSummaryRow(
          `Tax (${taxValue}%)`,
          `${currency}${taxAmount.toFixed(2)}`
        )
      );
    }
    summaryRows.push(
      makeFullWidthSummaryRow(
        "Total Payable Amount",
        `${currency}${total.toFixed(2)}`
      )
    );

    return [
      new Table({
        rows: [headerRow, ...dataRows],
        width: { size: 100, type: WidthType.PERCENTAGE },
        layout: TableLayoutType.AUTOFIT,
      }),
      new Table({
        rows: summaryRows,
        width: { size: 60, type: WidthType.PERCENTAGE },
        layout: TableLayoutType.AUTOFIT,
      }),
    ];
  };

  // Improved price table formatting
  const createPriceTable = (priceContent, options = {}) => {
    if (!Array.isArray(priceContent) || priceContent.length === 0) return null;

    const currency =
      typeof options?.currency === "string" ? options.currency : "$";
    const showPercentage = !!options?.percentage;
    const showValue = !!options?.value;

    // Dynamically build columns
    const headerLabels = ["Deliverable"];
    if (showPercentage) headerLabels.push("Percentage");
    if (showValue) headerLabels.push("Value");

    // Prepare rows
    let totalPercentage = 0;
    let totalValue = 0;

    const tableRows = priceContent.map((priceItem, index) => {
      const rowArr = [priceItem.deliverable || ""];
      if (showPercentage) {
        const percentage = priceItem.percentage
          ? Number(priceItem.percentage)
          : 0;
        rowArr.push(percentage ? `${percentage}%` : "");
        totalPercentage += percentage;
      }
      if (showValue) {
        const value = priceItem.value ? Number(priceItem.value) : 0;
        rowArr.push(value ? `${currency}${value}` : "");
        totalValue += value;
      }
      return new TableRow({
        children: rowArr.map(
          (cell, i) =>
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: cell,
                      size: 20,
                      font: defaultFont,
                      color: i > 0 ? "000000" : convertToHex(defaultColor),
                    }),
                  ],
                  alignment:
                    i === 0
                      ? AlignmentType.LEFT
                      : i === rowArr.length - 1
                      ? AlignmentType.RIGHT
                      : AlignmentType.CENTER,
                  spacing: { before: 60, after: 60 },
                }),
              ],
              width: {
                size: i === 0 ? 60 : 20, // Adjust column widths: 60% for Deliverable, 20% for others
                type: WidthType.PERCENTAGE,
              },
              shading: {
                fill: i === 0 ? "f5f5f5" : "ffffff",
              },
              borders: {
                top: { style: BorderStyle.SINGLE, size: 2, color: "DEE2E6" },
                bottom: { style: BorderStyle.SINGLE, size: 2, color: "DEE2E6" },
                left: { style: BorderStyle.SINGLE, size: 2, color: "DEE2E6" },
                right: { style: BorderStyle.SINGLE, size: 2, color: "DEE2E6" },
              },
              margins: { top: 100, bottom: 100, left: 120, right: 120 },
              verticalAlign: VerticalAlign.CENTER,
            })
        ),
      });
    });

    // Add Total row
    const totalArr = ["Total"];
    if (showPercentage) totalArr.push(`${totalPercentage}%`);
    if (showValue) totalArr.push(`${currency}${totalValue}`);
    const totalRow = new TableRow({
      children: totalArr.map(
        (cell, i) =>
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: cell,
                    bold: true,
                    size: 20,
                    font: defaultFont,
                    color: i > 0 ? "000000" : convertToHex(defaultColor),
                  }),
                ],
                alignment:
                  i === 0
                    ? AlignmentType.LEFT
                    : i === totalArr.length - 1
                    ? AlignmentType.RIGHT
                    : AlignmentType.CENTER,
                spacing: { before: 60, after: 60 },
              }),
            ],
            width: {
              size: i === 0 ? 60 : 20, // Adjust column widths: 60% for Deliverable, 20% for others
              type: WidthType.PERCENTAGE,
            },
            shading: {
              fill: "f5f5f5",
            },
            borders: {
              top: { style: BorderStyle.SINGLE, size: 2, color: "DEE2E6" },
              bottom: { style: BorderStyle.SINGLE, size: 2, color: "DEE2E6" },
              left: { style: BorderStyle.SINGLE, size: 2, color: "DEE2E6" },
              right: { style: BorderStyle.SINGLE, size: 2, color: "DEE2E6" },
            },
            margins: { top: 100, bottom: 100, left: 120, right: 120 },
            verticalAlign: VerticalAlign.CENTER,
          })
      ),
    });

    // Header row
    const headerRow = new TableRow({
      children: headerLabels.map(
        (label, i) =>
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: label,
                    bold: true,
                    size: 20,
                    font: defaultFont,
                  }),
                ],
                alignment:
                  i === 0
                    ? AlignmentType.LEFT
                    : i === headerLabels.length - 1
                    ? AlignmentType.RIGHT
                    : AlignmentType.CENTER,
                spacing: { before: 80, after: 80 },
              }),
            ],
            width: {
              size: i === 0 ? 60 : 20, // Adjust column widths: 60% for Deliverable, 20% for others
              type: WidthType.PERCENTAGE,
            },
            shading: {
              fill: "f5f5f5",
            },
            borders: {
              top: { style: BorderStyle.SINGLE, size: 2, color: "DEE2E6" },
              bottom: { style: BorderStyle.SINGLE, size: 2, color: "DEE2E6" },
              left: { style: BorderStyle.SINGLE, size: 2, color: "DEE2E6" },
              right: { style: BorderStyle.SINGLE, size: 2, color: "DEE2E6" },
            },
            margins: { top: 120, bottom: 120, left: 120, right: 120 },
            verticalAlign: VerticalAlign.CENTER,
          })
      ),
    });

    return new Table({
      rows: [headerRow, ...tableRows, totalRow],
      width: {
        size: 100,
        type: WidthType.PERCENTAGE,
      },
      layout: TableLayoutType.AUTOFIT,
      margins: {
        top: 120,
        bottom: 120,
      },
    });
  };

  // Track items used in cover overlay to avoid duplication
  let skipNextItems = new Set();

  // Main processing loop with improved spacing
  for (const [index, item] of data.entries()) {
    try {
      // Skip items that were used as cover overlay
      if (skipNextItems.has(item.id)) {
        continue;
      }

      switch (item.type) {
        case "cover":
          if (item.coverType === "full") {
            // Ensure no image background for full-page covers
            allContent.push(
              createParagraph("", {
                size: 22,
                alignment: AlignmentType.CENTER,
                spacing: { before: 60, after: 60 },
              })
            );
          } else if (item.coverType === "half") {
            // Always create a text-only cover page, but match web UI formatting
            const nextItems = data.slice(index + 1, index + 5);
            let overlayItemIds = new Set();
            let coverParagraphs = [];
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

                  // Determine style
                  let size = 44;
                  let heading = null;
                  let font = headingFont;
                  let color = nextItem.textColor || "000000";
                  let bold =
                    children &&
                    children[0] &&
                    typeof children[0].bold === "boolean"
                      ? children[0].bold
                      : true;
                  let alignment = block?.align
                    ? block.align.toLowerCase()
                    : "center";
                  let spacing = { before: 120, after: 120 }; // Tighter cover spacing

                  if (block?.type && block.type.includes("heading")) {
                    const sizeMap = {
                      "heading-one": 48,
                      "heading-two": 36,
                      "heading-three": 30,
                      "heading-four": 26,
                      "heading-five": 22,
                      "heading-six": 20,
                    };
                    size = sizeMap[block.type] || 44;
                    const headingMap = {
                      "heading-one": HeadingLevel.HEADING_1,
                      "heading-two": HeadingLevel.HEADING_2,
                      "heading-three": HeadingLevel.HEADING_3,
                      "heading-four": HeadingLevel.HEADING_4,
                      "heading-five": HeadingLevel.HEADING_5,
                      "heading-six": HeadingLevel.HEADING_6,
                    };
                    heading = headingMap[block.type];
                    font = headingFont;
                    spacing = { before: 120, after: 120 };
                  }

                  coverParagraphs.push(
                    createParagraph(text, {
                      bold,
                      size,
                      heading,
                      alignment:
                        alignment === "center"
                          ? AlignmentType.CENTER
                          : alignment === "right"
                          ? AlignmentType.RIGHT
                          : AlignmentType.LEFT,
                      color,
                      font,
                      spacing,
                    })
                  );
                  overlayItemIds.add(nextItem.id);
                });
              }
            }

            if (coverParagraphs.length === 0) {
              coverParagraphs.push(
                createParagraph("COVER PAGE", {
                  bold: true,
                  size: 44,
                  alignment: AlignmentType.CENTER,
                  color: "000000",
                  spacing: { before: 240, after: 240 },
                })
              );
            }

            overlayItemIds.forEach((id) => skipNextItems.add(id));
            allContent.push(...coverParagraphs);
          }
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

                // Web-matching heading sizes - exact match to CSS
                const sizeMap = {
                  "heading-one": 40, // 2.5em exact
                  "heading-two": 32, // 2em exact
                  "heading-three": 28, // 1.75em exact
                  "heading-four": 24, // 1.5em exact
                  "heading-five": 20, // 1.25em exact
                  "heading-six": 16, // 1em exact
                };

                const alignmentMap = {
                  left: AlignmentType.LEFT,
                  center: AlignmentType.CENTER,
                  right: AlignmentType.RIGHT,
                };

                const headingMap = {
                  "heading-one": HeadingLevel.HEADING_1,
                  "heading-two": HeadingLevel.HEADING_2,
                  "heading-three": HeadingLevel.HEADING_3,
                  "heading-four": HeadingLevel.HEADING_4,
                  "heading-five": HeadingLevel.HEADING_5,
                  "heading-six": HeadingLevel.HEADING_6,
                };

                // Check if next item is also a heading for ultra-tight spacing
                const nextItem = data[index + 1];
                const isNextHeading = nextItem && nextItem.type === "heading";

                // Ultra-tight spacing to match web view exactly
                const spacingMap = {
                  "heading-one": isNextHeading
                    ? { before: 160, after: 20 }
                    : { before: 160, after: 80 },
                  "heading-two": isNextHeading
                    ? { before: 120, after: 15 }
                    : { before: 120, after: 60 },
                  "heading-three": isNextHeading
                    ? { before: 100, after: 10 }
                    : { before: 100, after: 50 },
                  "heading-four": isNextHeading
                    ? { before: 80, after: 8 }
                    : { before: 80, after: 40 },
                  "heading-five": isNextHeading
                    ? { before: 60, after: 6 }
                    : { before: 60, after: 30 },
                  "heading-six": isNextHeading
                    ? { before: 40, after: 4 }
                    : { before: 40, after: 20 },
                };

                allContent.push(
                  createParagraph(text, {
                    bold: isBold,
                    size: sizeMap[size] || 32,
                    alignment: alignmentMap[alignment] || AlignmentType.LEFT,
                    heading: headingMap[size] || HeadingLevel.HEADING_2,
                    color: textColor,
                    spacing: spacingMap[size] || { before: 40, after: 20 },
                    font: headingFont,
                    lineSpacing: 1.05, // Even tighter line spacing
                  })
                );
              } catch (err) {
                console.error("Error in heading block", headingBlock, err);
                allContent.push(
                  createParagraph(`[Error processing heading block ${idx}]`, {
                    italic: true,
                    color: "DC3545",
                    size: 18,
                  })
                );
              }
            });
          }
          break;

        case "input":
          if (Array.isArray(item.content)) {
            const processedParagraphs = processSlateContent(item.content, {
              color: convertTailwindTextColor(item.textColor),
            });
            allContent.push(...processedParagraphs);
          }
          break;

        // Handle misspelled "paragrapgh" type (common in test data)
        case "paragrapgh":
          if (Array.isArray(item.content)) {
            const processedParagraphs = processSlateContent(item.content, {
              color: convertTailwindTextColor(item.textColor),
            });
            allContent.push(...processedParagraphs);
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
              const textColor = convertTailwindTextColor(item.textColor);
              const leftAlignment =
                item.firstContent[0]?.align === "center"
                  ? AlignmentType.CENTER
                  : item.firstContent[0]?.align === "right"
                  ? AlignmentType.RIGHT
                  : AlignmentType.LEFT;
              const rightAlignment =
                item.secondContent[0]?.align === "center"
                  ? AlignmentType.CENTER
                  : item.secondContent[0]?.align === "right"
                  ? AlignmentType.RIGHT
                  : AlignmentType.LEFT;

              const doubleParaTable = new Table({
                rows: [
                  new TableRow({
                    children: [
                      new TableCell({
                        children: leftTexts.map((text) =>
                          createParagraph(text, {
                            size: 22,
                            color: textColor,
                            alignment: leftAlignment,
                            spacing: { before: 20, after: 20 }, // Ultra-tight for web match
                          })
                        ),
                        width: { size: 50, type: WidthType.PERCENTAGE },
                        borders: {
                          top: {
                            style: BorderStyle.SINGLE,
                            size: 2,
                            color: "FFFFFF",
                          },
                          bottom: {
                            style: BorderStyle.SINGLE,
                            size: 2,
                            color: "FFFFFF",
                          },
                          left: {
                            style: BorderStyle.SINGLE,
                            size: 2,
                            color: "FFFFFF",
                          },
                          right: {
                            style: BorderStyle.SINGLE,
                            size: 2,
                            color: "FFFFFF",
                          },
                        },
                        margins: { top: 0, bottom: 0, left: 0, right: 100 }, // Reduced margins
                        verticalAlign: VerticalAlign.TOP,
                      }),
                      new TableCell({
                        children: rightTexts.map((text) =>
                          createParagraph(text, {
                            size: 22,
                            color: textColor,
                            alignment: rightAlignment,
                            spacing: { before: 20, after: 20 }, // Ultra-tight for web match
                          })
                        ),
                        width: { size: 50, type: WidthType.PERCENTAGE },
                        borders: {
                          top: {
                            style: BorderStyle.SINGLE,
                            size: 2,
                            color: "FFFFFF",
                          },
                          bottom: {
                            style: BorderStyle.SINGLE,
                            size: 2,
                            color: "FFFFFF",
                          },
                          left: {
                            style: BorderStyle.SINGLE,
                            size: 2,
                            color: "FFFFFF",
                          },
                          right: {
                            style: BorderStyle.SINGLE,
                            size: 2,
                            color: "FFFFFF",
                          },
                        },
                        margins: { top: 0, bottom: 0, left: 100, right: 0 }, // Reduced margins
                        verticalAlign: VerticalAlign.TOP,
                      }),
                    ],
                  }),
                ],
                width: { size: 100, type: WidthType.PERCENTAGE },
                layout: TableLayoutType.AUTOFIT,
              });

              allContent.push(
                createParagraph("", { spacing: { before: 60, after: 30 } }), // Reduced spacing
                doubleParaTable,
                createParagraph("", { spacing: { before: 30, after: 60 } }) // Reduced spacing
              );
            }
          }
          break;

        case "table":
          const table = createTable(item.content, {
            design: item.design || "striped", // Default to striped for web-like appearance
            boldAll: item.boldAll,
            underlineAll: item.underlineAll,
            italicAll: item.italicAll,
            cellAlignAll: item.cellAlignAll,
          });
          if (table) {
            allContent.push(
              createParagraph("", { spacing: { before: 100, after: 40 } }), // Reduced spacing
              table,
              createParagraph("", { spacing: { before: 40, after: 100 } }) // Reduced spacing
            );
          }
          break;

        case "cost":
          // Merge options and values so discount/tax are read correctly
          const mergedOptions = {
            ...(item.options || {}),
            values: item.values || {},
          };
          const costTable = createCostTable(item.content, mergedOptions);
          if (costTable) {
            // Add heading if provided
            if (item.heading) {
              allContent.push(
                createParagraph({
                  bold: true,
                  size: 32,
                  heading: HeadingLevel.HEADING_2,
                  spacing: { before: 300, after: 120 },
                  font: headingFont,
                  color: "1976D2",
                })
              );
            }
            allContent.push(
              ...costTable,
              createParagraph("", { spacing: { before: 120, after: 200 } })
            );
          }
          break;

        case "price":
          if (Array.isArray(item.content)) {
            allContent.push(
              createParagraph({
                bold: true,
                size: 32,
                heading: HeadingLevel.HEADING_2,
                spacing: { before: 300, after: 120 },
                font: headingFont,
                color: "1976D2",
              })
            );

            const priceTable = createPriceTable(item.content, item.options);
            if (priceTable) {
              allContent.push(
                priceTable,
                createParagraph("", { spacing: { before: 120, after: 200 } })
              );
            }
          }
          break;

        case "image":
          if (item.content && validateImageUrl(item.content)) {
            try {
              const imageBuffer = await fetchImageAsArrayBuffer(item.content);
              if (imageBuffer) {
                const image = new Image();
                image.src = URL.createObjectURL(new Blob([imageBuffer]));

                await new Promise((resolve) => {
                  image.onload = resolve;
                });

                const originalWidth = image.naturalWidth;
                const originalHeight = image.naturalHeight;

                const dimensions = getImageDimensions(
                  originalWidth,
                  originalHeight,
                  parseInt(item.width) || 400,
                  parseInt(item.height) || 300,
                  "inline"
                );

                const imagePara = await createImageParagraph(item.content, {
                  width: dimensions.singlewidth,
                  height: dimensions.singleheight,
                  context: "inline",
                  alignment:
                    item.aliegn === "left"
                      ? AlignmentType.LEFT
                      : item.aliegn === "right"
                      ? AlignmentType.RIGHT
                      : AlignmentType.CENTER,
                  spacing: { before: 80, after: 40 },
                });
                allContent.push(imagePara);

                if (item.caption) {
                  allContent.push(
                    createParagraph(item.caption, {
                      italic: true,
                      size: 16,
                      alignment: AlignmentType.CENTER,
                      spacing: { before: 20, after: 80 },
                      color: "6C757D",
                    })
                  );
                }
              } else {
                allContent.push(
                  createParagraph(
                    `[Image could not be loaded: ${item.content}]`,
                    {
                      italic: true,
                      size: 16,
                      color: "DC3545",
                      spacing: { before: 40, after: 40 },
                    }
                  )
                );
              }
            } catch (error) {
              console.error("Failed to process image:", error);
              // Add fallback text instead of breaking
              allContent.push(
                createParagraph(
                  `[Image could not be loaded: ${item.content}]`,
                  {
                    italic: true,
                    size: 16,
                    color: "DC3545",
                    spacing: { before: 40, after: 40 },
                  }
                )
              );
            }
          }
          break;

        case "image-para":
          if (Array.isArray(item.content) && item.ImageLink) {
            const text = item.content
              .map((block) => block?.children?.[0]?.text || "")
              .join(" ");
            const isLeftAligned = item.align === "left";

            // Make sure to await the image creation
            const imageCell = await createImageParagraph(item.ImageLink, {
              width: parseInt(item.width) || 320,
              height: parseInt(item.height) || 240,
              context: "side",
              spacing: { before: 0, after: 0 },
              alignment: AlignmentType.CENTER,
            });

            const textCell = createParagraph(text, {
              size: 22,
              spacing: { before: 80, after: 80 },
              lineSpacing: 1.3,
            });

            const imageParaTable = new Table({
              rows: [
                new TableRow({
                  children: isLeftAligned
                    ? [
                        new TableCell({
                          children: [imageCell],
                          width: { size: 35, type: WidthType.PERCENTAGE },
                          borders: {
                            top: {
                              style: BorderStyle.SINGLE,
                              size: 2,
                              color: "FFFFFF",
                            },
                            bottom: {
                              style: BorderStyle.SINGLE,
                              size: 2,
                              color: "FFFFFF",
                            },
                            left: {
                              style: BorderStyle.SINGLE,
                              size: 2,
                              color: "FFFFFF",
                            },
                            right: {
                              style: BorderStyle.SINGLE,
                              size: 2,
                              color: "FFFFFF",
                            },
                          },
                          margins: { top: 0, bottom: 0, left: 0, right: 200 },
                          verticalAlign: VerticalAlign.CENTER,
                        }),
                        new TableCell({
                          children: [textCell],
                          width: { size: 65, type: WidthType.PERCENTAGE },
                          borders: {
                            top: {
                              style: BorderStyle.SINGLE,
                              size: 2,
                              color: "FFFFFF",
                            },
                            bottom: {
                              style: BorderStyle.SINGLE,
                              size: 2,
                              color: "FFFFFF",
                            },
                            left: {
                              style: BorderStyle.SINGLE,
                              size: 2,
                              color: "FFFFFF",
                            },
                            right: {
                              style: BorderStyle.SINGLE,
                              size: 2,
                              color: "FFFFFF",
                            },
                          },
                          margins: { top: 0, bottom: 0, left: 200, right: 0 },
                          verticalAlign: VerticalAlign.CENTER,
                        }),
                      ]
                    : [
                        new TableCell({
                          children: [textCell],
                          width: { size: 65, type: WidthType.PERCENTAGE },
                          borders: {
                            top: {
                              style: BorderStyle.SINGLE,
                              size: 2,
                              color: "FFFFFF",
                            },
                            bottom: {
                              style: BorderStyle.SINGLE,
                              size: 2,
                              color: "FFFFFF",
                            },
                            left: {
                              style: BorderStyle.SINGLE,
                              size: 2,
                              color: "FFFFFF",
                            },
                            right: {
                              style: BorderStyle.SINGLE,
                              size: 2,
                              color: "FFFFFF",
                            },
                          },
                          margins: { top: 0, bottom: 0, left: 0, right: 200 },
                          verticalAlign: VerticalAlign.CENTER,
                        }),
                        new TableCell({
                          children: [imageCell],
                          width: { size: 35, type: WidthType.PERCENTAGE },
                          borders: {
                            top: {
                              style: BorderStyle.SINGLE,
                              size: 2,
                              color: "FFFFFF",
                            },
                            bottom: {
                              style: BorderStyle.SINGLE,
                              size: 2,
                              color: "FFFFFF",
                            },
                            left: {
                              style: BorderStyle.SINGLE,
                              size: 2,
                              color: "FFFFFF",
                            },
                            right: {
                              style: BorderStyle.SINGLE,
                              size: 2,
                              color: "FFFFFF",
                            },
                          },
                          margins: { top: 0, bottom: 0, left: 200, right: 0 },
                          verticalAlign: VerticalAlign.CENTER,
                        }),
                      ],
                }),
              ],
              width: { size: 100, type: WidthType.PERCENTAGE },
              layout: TableLayoutType.FIXED,
            });

            allContent.push(
              createParagraph("", { spacing: { before: 100, after: 40 } }), // Web-like spacing
              imageParaTable,
              createParagraph("", { spacing: { before: 40, after: 100 } }) // Web-like spacing
            );
          }
          break;

        case "double-image":
          if (item.ImageLink1 && item.ImageLink2) {
            // Await both images
            const [image1, image2] = await Promise.all([
              createImageParagraph(item.ImageLink1, {
                width: parseInt(item.width1) || 320,
                height: parseInt(item.height1) || 240,
                context: "double",
                alignment: AlignmentType.CENTER,
                spacing: { before: 0, after: 0 },
              }),
              createImageParagraph(item.ImageLink2, {
                width: parseInt(item.width2) || 320,
                height: parseInt(item.height2) || 240,
                context: "double",
                alignment: AlignmentType.CENTER,
                spacing: { before: 0, after: 0 },
              }),
            ]);

            const doubleImageTable = new Table({
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      children: [image1],
                      width: { size: 50, type: WidthType.PERCENTAGE },
                      borders: {
                        top: {
                          style: BorderStyle.SINGLE,
                          size: 2,
                          color: "FFFFFF",
                        },
                        bottom: {
                          style: BorderStyle.SINGLE,
                          size: 2,
                          color: "FFFFFF",
                        },
                        style: BorderStyle.SINGLE,
                        size: 2,
                        color: "FFFFFF",
                        left: {
                          style: BorderStyle.SINGLE,
                          size: 2,
                          color: "FFFFFF",
                        },
                        right: {
                          style: BorderStyle.SINGLE,
                          size: 2,
                          color: "FFFFFF",
                        },
                      },
                      margins: { top: 0, bottom: 0, left: 0, right: 100 },
                      verticalAlign: VerticalAlign.CENTER,
                    }),
                    new TableCell({
                      children: [image2],
                      width: { size: 50, type: WidthType.PERCENTAGE },
                      borders: {
                        top: {
                          style: BorderStyle.SINGLE,
                          size: 2,
                          color: "FFFFFF",
                        },
                        bottom: {
                          style: BorderStyle.SINGLE,
                          size: 2,
                          color: "FFFFFF",
                        },
                        left: {
                          style: BorderStyle.SINGLE,
                          size: 2,
                          color: "FFFFFF",
                        },
                        right: {
                          style: BorderStyle.SINGLE,
                          size: 2,
                          color: "FFFFFF",
                        },
                      },
                      margins: { top: 0, bottom: 0, left: 100, right: 0 },
                      verticalAlign: VerticalAlign.CENTER,
                    }),
                  ],
                }),
              ],
              width: { size: 100, type: WidthType.PERCENTAGE },
              layout: TableLayoutType.FIXED,
            });

            allContent.push(
              createParagraph("", { spacing: { before: 120, after: 60 } }), // Web-like spacing
              doubleImageTable,
              createParagraph("", { spacing: { before: 60, after: 120 } }) // Web-like spacing
            );
          }
          break;

        case "code":
          if (item.content) {
            const codeBlocks = createCodeBlock(item.content, {
              spacing: { before: 120, after: 120 }, // Web-like spacing
            });
            allContent.push(...codeBlocks);
          }
          break;

        case "line":
          allContent.push(
            createParagraph("", { spacing: { before: 120, after: 0 } }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "─".repeat(60),
                  size: 14,
                  color: "DEE2E6",
                }),
              ],
              alignment: AlignmentType.CENTER,
              spacing: { before: 0, after: 120 },
            })
          );
          break;

        case "sign":
          if (Array.isArray(item.content) && item.content.length >= 2) {
            const proposedName = item.content[0]?.proposedName || "";
            const acceptedName = item.content[1]?.acceptedName || "";

            // Border helpers
            const borderVisible = {
              style: BorderStyle.SINGLE,
              size: 2,
              color: "B4B4B4",
            };
            const borderHidden = {
              style: BorderStyle.SINGLE,
              size: 2,
              color: "FFFFFF", // Matches white background so inner lines disappear
            };
            const labelHidden = {
              style: BorderStyle.SINGLE,
              size: 2,
              color: "EFEFEF",
            };

            const labelBorder = ({ top, bottom, left, right }) => ({
              top: top ? borderVisible : labelHidden,
              bottom: bottom ? borderVisible : labelHidden,
              left: left ? borderVisible : labelHidden,
              right: right ? borderVisible : labelHidden,
            });

            const getBorders = ({ top, bottom, left, right }) => ({
              top: top ? borderVisible : borderHidden,
              bottom: bottom ? borderVisible : borderHidden,
              left: left ? borderVisible : borderHidden,
              right: right ? borderVisible : borderHidden,
            });

            // Heading row (spanning both columns)
            const headingRow = new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: "Signatures",
                          bold: true,
                          size: 32, // Slightly larger for emphasis
                          font: headingFont,
                          color: "333333",
                        }),
                      ],
                      alignment: AlignmentType.LEFT,
                      spacing: { before: 100, after: 60 },
                    }),
                  ],
                  borders: getBorders({
                    top: false,
                    bottom: true,
                    left: false,
                    right: false,
                  }),
                  verticalAlign: VerticalAlign.CENTER,
                  margins: { top: 200, bottom: 100, left: 100, right: 100 },
                  columnSpan: 2,
                }),
              ],
            });

            // Labels row
            const labelRow = new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: "Proposed By",
                          bold: true,
                          size: 22,
                          font: defaultFont,
                          color: "000000",
                        }),
                      ],
                      alignment: AlignmentType.LEFT,
                      spacing: { before: 40, after: 20 },
                    }),
                  ],
                  borders: labelBorder({
                    top: true,
                    bottom: false,
                    left: true,
                    right: false,
                  }),
                  shading: { fill: "EFEFEF" },
                  width: { size: 50, type: WidthType.PERCENTAGE },
                  verticalAlign: VerticalAlign.CENTER,
                  margins: { top: 100, bottom: 40, left: 100, right: 40 },
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: "Accepted By",
                          bold: true,
                          size: 22,
                          font: defaultFont,
                          color: "000000",
                        }),
                      ],
                      alignment: AlignmentType.LEFT,
                      spacing: { before: 40, after: 20 },
                    }),
                  ],
                  borders: labelBorder({
                    top: true,
                    bottom: false,
                    left: false,
                    right: true,
                  }),
                  shading: { fill: "EFEFEF" },
                  width: { size: 50, type: WidthType.PERCENTAGE },
                  verticalAlign: VerticalAlign.CENTER,
                  margins: { top: 100, bottom: 40, left: 40, right: 100 },
                }),
              ],
            });

            // Names row
            const nameRow = new TableRow({
              children: [
                new TableCell({
                  children: [
                    new Paragraph({
                      text: proposedName,
                      alignment: AlignmentType.LEFT,
                    }),
                  ],
                  borders: labelBorder({
                    top: false,
                    bottom: true,
                    left: true,
                    right: false,
                  }),
                  shading: { fill: "EFEFEF" },
                  width: { size: 50, type: WidthType.PERCENTAGE },
                  verticalAlign: VerticalAlign.CENTER,
                  margins: { top: 80, bottom: 80, left: 100, right: 40 },
                }),
                new TableCell({
                  children: [
                    new Paragraph({
                      text: acceptedName,
                      alignment: AlignmentType.LEFT,
                    }),
                  ],
                  borders: labelBorder({
                    top: false,
                    bottom: true,
                    left: false,
                    right: true,
                  }),
                  shading: { fill: "EFEFEF" },
                  width: { size: 50, type: WidthType.PERCENTAGE },
                  verticalAlign: VerticalAlign.CENTER,
                  margins: { top: 80, bottom: 80, left: 40, right: 100 },
                }),
              ],
            });

            // Build table
            const signatureTable = new Table({
              rows: [headingRow, labelRow, nameRow],
              width: { size: 100, type: WidthType.PERCENTAGE },
              layout: TableLayoutType.AUTOFIT,
            });

            allContent.push(signatureTable);
          }
          break;

        case "brake":
          allContent.push(new Paragraph({ children: [new PageBreak()] }));
          break;

        default:
          // Improved fallback handling for unknown types
          console.warn(`Unhandled content type '${item.type}':`, item);

          // Try to handle as text content if it has content array
          if (Array.isArray(item.content)) {
            try {
              const processedParagraphs = processSlateContent(item.content, {
                color: convertTailwindTextColor(item.textColor),
              });
              if (processedParagraphs.length > 0) {
                allContent.push(...processedParagraphs);
                console.log(
                  `Successfully processed unknown type '${item.type}' as text content`
                );
              } else {
                // Add a placeholder paragraph for empty unknown types
                allContent.push(
                  createParagraph(`[Unknown content type: ${item.type}]`, {
                    italic: true,
                    color: "6C757D",
                    size: 16,
                    spacing: { before: 60, after: 60 },
                  })
                );
              }
            } catch (err) {
              console.error(
                `Failed to process unknown type '${item.type}' as text:`,
                err
              );
              allContent.push(
                createParagraph(`[Error: Could not process ${item.type}]`, {
                  italic: true,
                  color: "DC3545",
                  size: 16,
                  spacing: { before: 60, after: 60 },
                })
              );
            }
          } else {
            // Non-content types get a debug note
            allContent.push(
              createParagraph(
                `[Debug: Skipped ${item.type} - no content array]`,
                {
                  italic: true,
                  color: "6C757D",
                  size: 14,
                  spacing: { before: 30, after: 30 },
                }
              )
            );
          }
          break;
      }
    } catch (error) {
      console.error(`Error processing item of type '${item.type}':`, error);
      allContent.push(
        createParagraph(`[Error processing ${item.type} content]`, {
          italic: true,
          color: "DC3545",
          size: 18,
          spacing: { before: 120, after: 120 },
        })
      );
    }
  }

  // Create the final document with ultra-web-matching styles
  const doc = new Document({
    creator: "Professional Proposal Generator",
    title: jsonData.proposalName || "Business Proposal",
    description: "Generated from JSON proposal data with web-matching layout",
    styles: {
      paragraphStyles: [
        {
          id: "Normal",
          name: "Normal",
          basedOn: "Normal",
          next: "Normal",
          run: {
            font: defaultFont,
            size: 22,

            color: convertToHex(defaultColor),
          },
          paragraph: {
            spacing: { line: 360 },
          },
        },
        {
          id: "Heading1",
          name: "Heading 1",
          basedOn: "Normal",
          next: "Normal",
          run: {
            font: headingFont,
            size: 40, // Exact match to 2.5em
            bold: true,
            color: "1976D2",
          },
          paragraph: {
            spacing: { line: 360 },
          },
        },
        {
          id: "Heading2",
          name: "Heading 2",
          basedOn: "Normal",
          next: "Normal",
          run: {
            font: headingFont,
            size: 32, // Exact match to 2em
            bold: true,
            color: "1976D2",
          },
          paragraph: {
            spacing: { line: 360 },
          },
        },
        {
          id: "CodeBlock",
          name: "Code Block",
          basedOn: "Normal",
          next: "Normal",
          run: {
            font: codeFont,
            size: 16, // Smaller, web-like
            color: "333333",
          },
          paragraph: {
            spacing: {
              before: 0,
              after: 20,
              line: 360,
            },
            indent: {
              left: 200,
            },
            shading: {
              fill: "F8F9FA",
              type: ShadingType.SOLID,
            },
            borders: {
              left: { style: BorderStyle.SINGLE, size: 4, color: "007ACC" },
              top: { style: BorderStyle.SINGLE, size: 2, color: "E0E0E0" },
              bottom: { style: BorderStyle.SINGLE, size: 2, color: "E0E0E0" },
              right: { style: BorderStyle.SINGLE, size: 2, color: "E0E0E0" },
            },
          },
        },
      ],
    },
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: convertInchesToTwip(0.75),
              bottom: convertInchesToTwip(0.75),
              left: convertInchesToTwip(1),
              right: convertInchesToTwip(1),
            },
            size: {
              orientation: "portrait",
            },
          },
        },
        headers: settings.header
          ? {
              default: new Header({
                children: [
                  createParagraph(
                    jsonData.proposalName || "Business Proposal",
                    {
                      size: 16,
                      color: "6C757D",
                      alignment: AlignmentType.CENTER,
                      spacing: { before: 30, after: 30 },
                    }
                  ),
                ],
              }),
            }
          : undefined,
        footers: settings.footer
          ? {
              default: new Footer({
                children: [
                  createParagraph("Page", {
                    size: 14,
                    color: "6C757D",
                    alignment: AlignmentType.CENTER,
                    spacing: { before: 30, after: 30 },
                  }),
                ],
              }),
            }
          : undefined,
        children:
          allContent.length > 0
            ? allContent
            : [
                createParagraph("No content available", {
                  italic: true,
                  size: 22,
                  alignment: AlignmentType.CENTER,
                  color: "6C757D",
                  spacing: {
                    before: convertInchesToTwip(1.5),
                    after: convertInchesToTwip(1.5),
                  },
                }),
              ],
      },
    ],
  });

  try {
    const blob = await Packer.toBlob(doc);
    const fileName = `${jsonData.proposalName || "Proposal"}.docx`;
    saveAs(blob, fileName);
    console.log(
      `Document "${fileName}" generated successfully with improved web-matching styling`
    );
  } catch (error) {
    console.error("Error generating document:", error);
    throw new Error(`Failed to generate Word document: ${error.message}`);
  }
};

export default JsonToWord;
