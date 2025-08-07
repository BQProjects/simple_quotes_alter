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
  const defaultFont = settings.body || "Segoe UI";
  const headingFont = settings.heading || "Segoe UI";
  const codeFont = "Consolas";
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

  // Web-matching typography function with tighter spacing
  const createParagraph = (text, options = {}) => {
    const {
      bold = false,
      italic = false,
      underline = false,
      size = 22,
      color = defaultColor.replace("#", ""),
      alignment = AlignmentType.LEFT,
      heading = null,
      spacing = { before: 60, after: 60 }, // Much tighter default spacing
      indent = null,
      font = defaultFont,
      lineSpacing = 1.2, // Tighter line spacing
    } = options;

    return new Paragraph({
      children: [
        new TextRun({
          text: text || "",
          bold: bold,
          italics: italic,
          underline: underline,
          size: size,
          color: convertToHex(color),
          font: font,
        }),
      ],
      alignment: alignment,
      heading: heading,
      spacing: {
        ...spacing,
        line: Math.round(size * 20 * lineSpacing),
      },
      indent: indent,
    });
  };

  const createImageParagraph = async (imageUrl, options = {}) => {
    const {
      alignment = AlignmentType.CENTER,
      width = 400,
      height = 300,
      spacing = { before: 120, after: 120 }, // Tighter spacing
      maxWidth = 600,
      maxHeight = 400,
      context = "normal",
    } = options;

    try {
      const imageBuffer = await fetchImageAsArrayBuffer(imageUrl);
      if (imageBuffer) {
        const dimensions = getImageDimensions(
          width,
          height,
          maxWidth,
          maxHeight,
          context
        );

        return new Paragraph({
          children: [
            new ImageRun({
              data: imageBuffer,
              transformation: {
                width: dimensions.width,
                height: dimensions.height,
              },
            }),
          ],
          alignment: alignment,
          spacing: spacing,
        });
      }
    } catch (error) {
      console.error("Error creating image:", error);
    }

    // Web-matching fallback styling
    return new Paragraph({
      children: [
        new TextRun({
          text: `[Image: ${imageUrl.split("/").pop() || "unavailable"}]`,
          italic: true,
          size: 18,
          color: "6C757D",
          font: defaultFont,
        }),
      ],
      alignment: alignment,
      spacing: spacing,
      borders: {
        top: { style: BorderStyle.SINGLE, size: 1, color: "DEE2E6" },
        bottom: { style: BorderStyle.SINGLE, size: 1, color: "DEE2E6" },
        left: { style: BorderStyle.SINGLE, size: 1, color: "DEE2E6" },
        right: { style: BorderStyle.SINGLE, size: 1, color: "DEE2E6" },
      },
      shading: {
        fill: "F8F9FA",
        type: ShadingType.SOLID,
      },
      indent: {
        left: 150,
        right: 150,
      },
    });
  };

  // Improved code block formatting
  const createCodeBlock = (codeContent, options = {}) => {
    const { spacing = { before: 120, after: 120 } } = options;

    const codeLines = codeContent.split("\n");
    const codeParagraphs = codeLines.map(
      (line) =>
        new Paragraph({
          children: [
            new TextRun({
              text: line || " ", // Ensure empty lines are preserved
              size: 18,
              font: codeFont,
            }),
          ],
          spacing: { before: 0, after: 40 }, // Tight line spacing within code block
          indent: { left: 400 }, // Indentation for code block
          borders: {
            left: { style: BorderStyle.SINGLE, size: 6, color: "007ACC" }, // Blue left border
          },
        })
    );

    // Add title and wrapper
    return [
      createParagraph("Code:", {
        bold: true,
        size: 20,
        spacing: { before: spacing.before, after: 40 },
      }),
      ...codeParagraphs,
      createParagraph("", { spacing: { before: 40, after: spacing.after } }),
    ];
  };

  const createTable = (tableData, options = {}) => {
    if (!Array.isArray(tableData) || tableData.length === 0) return null;

    const {
      design = "normal",
      boldAll = [],
      underlineAll = [],
      italicAll = [],
    } = options;

    const rows = tableData.map((row, rowIndex) => {
      const cells = Array.isArray(row) ? row : [];
      const isHeaderRow = rowIndex === 0;

      return new TableRow({
        children: cells.map((cellText, cellIndex) => {
          let textBold = boldAll?.[rowIndex]?.[cellIndex] || isHeaderRow;
          let textUnderline = underlineAll?.[rowIndex]?.[cellIndex] || false;
          let textItalic = italicAll?.[rowIndex]?.[cellIndex] || false;
          let textColor = convertToHex(defaultColor);

          return new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: cellText?.toString() || "",
                    size: 20,
                    font: defaultFont,
                    bold: textBold,
                    underline: textUnderline,
                    italics: textItalic,
                    color: textColor,
                  }),
                ],
                alignment: AlignmentType.LEFT,
                spacing: { before: 60, after: 60 }, // Tighter cell spacing
              }),
            ],
            width: {
              size: 100 / cells.length,
              type: WidthType.PERCENTAGE,
            },
            borders: {
              top: { style: BorderStyle.SINGLE, size: 4, color: "DEE2E6" },
              bottom: { style: BorderStyle.SINGLE, size: 4, color: "DEE2E6" },
              left: { style: BorderStyle.SINGLE, size: 4, color: "DEE2E6" },
              right: { style: BorderStyle.SINGLE, size: 4, color: "DEE2E6" },
            },
            margins: {
              top: 100,
              bottom: 100,
              left: 120,
              right: 120,
            },
            verticalAlign: VerticalAlign.CENTER,
          });
        }),
      });
    });

    return new Table({
      rows: rows,
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

  const createCostTable = (costContent, options = {}) => {
    if (!Array.isArray(costContent) || costContent.length === 0) return null;

    const hasDiscount = options?.discount;
    const hasQuantity = options?.quantity;
    const hasTax = options?.tax;
    const currency = options?.currency || "$";
    const taxValue = options?.values?.tax;
    const discountValue = options?.values?.discount;

    // Build headers dynamically
    const headers = ["Deliverable"];
    if (
      costContent.some(
        (item) => item.price !== null && item.price !== undefined
      )
    ) {
      headers.push("Price");
    }
    if (hasDiscount) headers.push("Discount");
    if (hasQuantity) headers.push("Quantity");
    headers.push("Payment Duration", "Amount");

    // Header row with professional styling
    const headerRow = new TableRow({
      children: headers.map(
        (header) =>
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: header,
                    bold: true,
                    size: 20,
                    font: defaultFont,
                  }),
                ],
                alignment: AlignmentType.CENTER,
                spacing: { before: 80, after: 80 },
              }),
            ],
            width: {
              size: 100 / headers.length,
              type: WidthType.PERCENTAGE,
            },
            borders: {
              top: { style: BorderStyle.SINGLE, size: 4, color: "1976D2" },
              bottom: { style: BorderStyle.SINGLE, size: 4, color: "1976D2" },
              left: { style: BorderStyle.SINGLE, size: 4, color: "1976D2" },
              right: { style: BorderStyle.SINGLE, size: 4, color: "1976D2" },
            },
            margins: {
              top: 120,
              bottom: 120,
              left: 100,
              right: 100,
            },
            verticalAlign: VerticalAlign.CENTER,
          })
      ),
    });

    // Data rows with alternating background
    const dataRows = costContent.map((item, index) => {
      const rowData = [item.deliverable || ""];

      if (headers.includes("Price")) {
        rowData.push(item.price ? `${currency}${item.price}` : "-");
      }
      if (hasDiscount) {
        rowData.push(item.discount ? `${item.discount}%` : "-");
      }
      if (hasQuantity) {
        rowData.push(item.quantity?.toString() || "-");
      }

      rowData.push(
        item.paymentDuration || "-",
        `${currency}${item.amount || 0}`
      );

      const isEvenRow = index % 2 === 0;

      return new TableRow({
        children: rowData.map(
          (cellData, cellIndex) =>
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: cellData.toString(),
                      size: 18,
                      font: defaultFont,
                      color: convertToHex(defaultColor),
                      bold: cellIndex === rowData.length - 1, // Bold amount column
                    }),
                  ],
                  alignment:
                    cellIndex === rowData.length - 1 || cellIndex === 1
                      ? AlignmentType.RIGHT
                      : AlignmentType.LEFT,
                  spacing: { before: 60, after: 60 },
                }),
              ],
              borders: {
                top: { style: BorderStyle.SINGLE, size: 2, color: "DEE2E6" },
                bottom: { style: BorderStyle.SINGLE, size: 2, color: "DEE2E6" },
                left: { style: BorderStyle.SINGLE, size: 2, color: "DEE2E6" },
                right: { style: BorderStyle.SINGLE, size: 2, color: "DEE2E6" },
              },
              margins: {
                top: 100,
                bottom: 100,
                left: 100,
                right: 100,
              },
              verticalAlign: VerticalAlign.CENTER,
            })
        ),
      });
    });

    // Calculate totals
    let subtotal = costContent.reduce(
      (sum, item) => sum + (Number(item.amount) || 0),
      0
    );
    let discountAmount = 0;
    let taxAmount = 0;

    if (hasDiscount && discountValue) {
      discountAmount = subtotal * (discountValue / 100);
      subtotal -= discountAmount;
    }

    if (hasTax && taxValue) {
      taxAmount = subtotal * (taxValue / 100);
    }

    const total = subtotal + taxAmount;

    // Summary rows
    const summaryRows = [];

    if (hasDiscount && discountValue) {
      summaryRows.push(
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: "Discount",
                      bold: true,
                      size: 18,
                      font: defaultFont,
                    }),
                  ],
                  alignment: AlignmentType.RIGHT,
                  spacing: { before: 60, after: 60 },
                }),
              ],
              columnSpan: headers.length - 1,
              shading: { fill: "F8F9FA", type: ShadingType.SOLID },
              borders: {
                top: { style: BorderStyle.SINGLE, size: 2, color: "DEE2E6" },
                bottom: { style: BorderStyle.SINGLE, size: 2, color: "DEE2E6" },
                left: { style: BorderStyle.SINGLE, size: 2, color: "DEE2E6" },
                right: { style: BorderStyle.NONE },
              },
              margins: { top: 100, bottom: 100, left: 100, right: 100 },
            }),
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: `-${currency}${discountAmount.toFixed(2)}`,
                      bold: true,
                      size: 18,
                      color: "DC3545",
                      font: defaultFont,
                    }),
                  ],
                  alignment: AlignmentType.RIGHT,
                  spacing: { before: 60, after: 60 },
                }),
              ],
              shading: { fill: "F8F9FA", type: ShadingType.SOLID },
              borders: {
                top: { style: BorderStyle.SINGLE, size: 2, color: "DEE2E6" },
                bottom: { style: BorderStyle.SINGLE, size: 2, color: "DEE2E6" },
                left: { style: BorderStyle.NONE },
                right: { style: BorderStyle.SINGLE, size: 2, color: "DEE2E6" },
              },
              margins: { top: 100, bottom: 100, left: 100, right: 100 },
            }),
          ],
        })
      );
    }

    if (hasTax && taxValue) {
      summaryRows.push(
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: `Tax (${taxValue}%)`,
                      bold: true,
                      size: 18,
                      font: defaultFont,
                    }),
                  ],
                  alignment: AlignmentType.RIGHT,
                  spacing: { before: 60, after: 60 },
                }),
              ],
              columnSpan: headers.length - 1,
              shading: { fill: "F1F3F4", type: ShadingType.SOLID },
              borders: {
                top: { style: BorderStyle.SINGLE, size: 2, color: "DEE2E6" },
                bottom: { style: BorderStyle.SINGLE, size: 2, color: "DEE2E6" },
                left: { style: BorderStyle.SINGLE, size: 2, color: "DEE2E6" },
                right: { style: BorderStyle.NONE },
              },
              margins: { top: 100, bottom: 100, left: 100, right: 100 },
            }),
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: `${currency}${taxAmount.toFixed(2)}`,
                      bold: true,
                      size: 18,
                      color: "6C757D",
                      font: defaultFont,
                    }),
                  ],
                  alignment: AlignmentType.RIGHT,
                  spacing: { before: 60, after: 60 },
                }),
              ],
              shading: { fill: "F1F3F4", type: ShadingType.SOLID },
              borders: {
                top: { style: BorderStyle.SINGLE, size: 2, color: "DEE2E6" },
                bottom: { style: BorderStyle.SINGLE, size: 2, color: "DEE2E6" },
                left: { style: BorderStyle.NONE },
                right: { style: BorderStyle.SINGLE, size: 2, color: "DEE2E6" },
              },
              margins: { top: 100, bottom: 100, left: 100, right: 100 },
            }),
          ],
        })
      );
    }

    // Total row with emphasis
    const totalRow = new TableRow({
      children: [
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: "Total",
                  bold: true,
                  size: 22,
                  font: defaultFont,
                }),
              ],
              alignment: AlignmentType.RIGHT,
              spacing: { before: 80, after: 80 },
            }),
          ],
          columnSpan: headers.length - 1,
          // No background shading for cost table total row to match web UI
          shading: undefined,
          borders: {
            top: { style: BorderStyle.DOUBLE, size: 6, color: "1976D2" },
            bottom: { style: BorderStyle.DOUBLE, size: 6, color: "1976D2" },
            left: { style: BorderStyle.SINGLE, size: 4, color: "1976D2" },
            right: { style: BorderStyle.NONE },
          },
          margins: { top: 120, bottom: 120, left: 100, right: 100 },
        }),
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: `${currency}${total.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`,
                  bold: true,
                  size: 22,
                  font: defaultFont,
                }),
              ],
              alignment: AlignmentType.RIGHT,
              spacing: { before: 80, after: 80 },
            }),
          ],
          // No background shading for total amount cell to match web UI
          shading: undefined,
          borders: {
            top: { style: BorderStyle.DOUBLE, size: 6, color: "1976D2" },
            bottom: { style: BorderStyle.DOUBLE, size: 6, color: "1976D2" },
            left: { style: BorderStyle.NONE },
            right: { style: BorderStyle.SINGLE, size: 4, color: "1976D2" },
          },
          margins: { top: 120, bottom: 120, left: 100, right: 100 },
        }),
      ],
    });

    return new Table({
      rows: [headerRow, ...dataRows, ...summaryRows, totalRow],
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

  // Improved price table formatting
  const createPriceTable = (priceContent, options = {}) => {
    if (!Array.isArray(priceContent) || priceContent.length === 0) return null;

    const currency = options?.currency || "$";
    const showValue = options?.value;

    const rows = priceContent.map((priceItem, index) => {
      const isEvenRow = index % 2 === 0;
      const value = priceItem.value ? `${currency}${priceItem.value}` : "";
      const percentage = priceItem.percentage ? `${priceItem.percentage}%` : "";
      const displayValue = showValue ? value : percentage;

      return new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: priceItem.deliverable || "Milestone",
                    size: 20,
                    font: defaultFont,
                    color: convertToHex(defaultColor),
                  }),
                ],
                alignment: AlignmentType.LEFT,
                spacing: { before: 60, after: 60 },
              }),
            ],
            width: { size: 70, type: WidthType.PERCENTAGE },
            borders: {
              top: { style: BorderStyle.SINGLE, size: 2, color: "DEE2E6" },
              bottom: { style: BorderStyle.SINGLE, size: 2, color: "DEE2E6" },
              left: { style: BorderStyle.SINGLE, size: 2, color: "DEE2E6" },
              right: { style: BorderStyle.SINGLE, size: 2, color: "DEE2E6" },
            },
            margins: { top: 100, bottom: 100, left: 120, right: 120 },
            verticalAlign: VerticalAlign.CENTER,
          }),
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: displayValue,
                    size: 20,
                    font: defaultFont,
                    color: "1976D2",
                    bold: true,
                  }),
                ],
                alignment: AlignmentType.RIGHT,
                spacing: { before: 60, after: 60 },
              }),
            ],
            width: { size: 30, type: WidthType.PERCENTAGE },
            borders: {
              top: { style: BorderStyle.SINGLE, size: 2, color: "DEE2E6" },
              bottom: { style: BorderStyle.SINGLE, size: 2, color: "DEE2E6" },
              left: { style: BorderStyle.SINGLE, size: 2, color: "DEE2E6" },
              right: { style: BorderStyle.SINGLE, size: 2, color: "DEE2E6" },
            },
            margins: { top: 100, bottom: 100, left: 120, right: 120 },
            verticalAlign: VerticalAlign.CENTER,
          }),
        ],
      });
    });

    // Header row
    const headerRow = new TableRow({
      children: [
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: "Deliverable",
                  bold: true,
                  size: 20,
                  font: defaultFont,
                }),
              ],
              alignment: AlignmentType.CENTER,
              spacing: { before: 80, after: 80 },
            }),
          ],
          width: { size: 70, type: WidthType.PERCENTAGE },
          borders: {
            top: { style: BorderStyle.SINGLE, size: 4, color: "1976D2" },
            bottom: { style: BorderStyle.SINGLE, size: 4, color: "1976D2" },
            left: { style: BorderStyle.SINGLE, size: 4, color: "1976D2" },
            right: { style: BorderStyle.SINGLE, size: 4, color: "1976D2" },
          },
          margins: { top: 120, bottom: 120, left: 120, right: 120 },
          verticalAlign: VerticalAlign.CENTER,
        }),
      ],
    });

    return new Table({
      rows: [headerRow, ...rows],
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
                let color = nextItem.textColor || "1976D2";
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
                color: "1976D2",
                spacing: { before: 240, after: 240 },
              })
            );
          }

          overlayItemIds.forEach((id) => skipNextItems.add(id));
          allContent.push(...coverParagraphs);
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
                const textColor = item.textColor || defaultColor;

                // Web-matching heading sizes with tighter spacing
                const sizeMap = {
                  "heading-one": 48,
                  "heading-two": 36,
                  "heading-three": 30,
                  "heading-four": 26,
                  "heading-five": 22,
                  "heading-six": 20,
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

                // Much tighter heading spacing
                const spacingMap = {
                  "heading-one": { before: 240, after: 120 },
                  "heading-two": { before: 180, after: 100 },
                  "heading-three": { before: 160, after: 80 },
                  "heading-four": { before: 140, after: 70 },
                  "heading-five": { before: 120, after: 60 },
                  "heading-six": { before: 100, after: 50 },
                };

                allContent.push(
                  createParagraph(text, {
                    bold: isBold,
                    size: sizeMap[size] || 36,
                    alignment: alignmentMap[alignment] || AlignmentType.LEFT,
                    heading: headingMap[size] || HeadingLevel.HEADING_2,
                    color: textColor,
                    spacing: spacingMap[size] || { before: 180, after: 100 },
                    font: headingFont,
                    lineSpacing: 1.1,
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
            for (const block of item.content) {
              const text = block?.children?.[0]?.text || "";
              if (text.trim()) {
                const alignment = block?.align?.toLowerCase() || "left";
                const type =
                  block?.type === "paragrapgh" ? "paragraph" : block?.type;
                const isBold = block?.children?.[0]?.bold || false;
                const isItalic = block?.children?.[0]?.italic || false;
                const isUnderline = block?.children?.[0]?.underline || false;

                const alignmentMap = {
                  left: AlignmentType.LEFT,
                  center: AlignmentType.CENTER,
                  right: AlignmentType.RIGHT,
                };

                let size = 22;
                let heading = null;
                let spacing = { before: 60, after: 60 }; // Much tighter spacing

                if (type && type.includes("heading")) {
                  const sizeMap = {
                    "heading-one": 44,
                    "heading-two": 32,
                    "heading-three": 28,
                    "heading-four": 24,
                    "heading-five": 22,
                    "heading-six": 20,
                  };
                  size = sizeMap[type] || 22;

                  const spacingMap = {
                    "heading-one": { before: 240, after: 120 },
                    "heading-two": { before: 180, after: 100 },
                    "heading-three": { before: 160, after: 80 },
                    "heading-four": { before: 140, after: 70 },
                    "heading-five": { before: 120, after: 60 },
                    "heading-six": { before: 100, after: 50 },
                  };
                  spacing = spacingMap[type] || { before: 180, after: 100 };

                  const headingMap = {
                    "heading-one": HeadingLevel.HEADING_1,
                    "heading-two": HeadingLevel.HEADING_2,
                    "heading-three": HeadingLevel.HEADING_3,
                    "heading-four": HeadingLevel.HEADING_4,
                    "heading-five": HeadingLevel.HEADING_5,
                    "heading-six": HeadingLevel.HEADING_6,
                  };
                  heading = headingMap[type];
                }

                allContent.push(
                  createParagraph(text, {
                    bold: isBold || (type && type.includes("heading")),
                    italic: isItalic,
                    underline: isUnderline,
                    size: size,
                    alignment: alignmentMap[alignment] || AlignmentType.LEFT,
                    heading: heading,
                    spacing: spacing,
                    font:
                      type && type.includes("heading")
                        ? headingFont
                        : defaultFont,
                  })
                );
              }
            }
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
                            alignment: leftAlignment,
                            spacing: { before: 60, after: 60 },
                          })
                        ),
                        width: { size: 50, type: WidthType.PERCENTAGE },
                        borders: {
                          top: { style: BorderStyle.NONE },
                          bottom: { style: BorderStyle.NONE },
                          left: { style: BorderStyle.NONE },
                          right: { style: BorderStyle.NONE },
                        },
                        margins: { top: 0, bottom: 0, left: 0, right: 150 },
                        verticalAlign: VerticalAlign.TOP,
                      }),
                      new TableCell({
                        children: rightTexts.map((text) =>
                          createParagraph(text, {
                            size: 22,
                            alignment: rightAlignment,
                            spacing: { before: 60, after: 60 },
                          })
                        ),
                        width: { size: 50, type: WidthType.PERCENTAGE },
                        borders: {
                          top: { style: BorderStyle.NONE },
                          bottom: { style: BorderStyle.NONE },
                          left: { style: BorderStyle.NONE },
                          right: { style: BorderStyle.NONE },
                        },
                        margins: { top: 0, bottom: 0, left: 150, right: 0 },
                        verticalAlign: VerticalAlign.TOP,
                      }),
                    ],
                  }),
                ],
                width: { size: 100, type: WidthType.PERCENTAGE },
                layout: TableLayoutType.AUTOFIT,
              });

              allContent.push(
                createParagraph("", { spacing: { before: 120, after: 60 } }),
                doubleParaTable,
                createParagraph("", { spacing: { before: 60, after: 120 } })
              );
            }
          }
          break;

        case "table":
          const table = createTable(item.content, {
            design: item.design,
            boldAll: item.boldAll,
            underlineAll: item.underlineAll,
            italicAll: item.italicAll,
          });
          if (table) {
            allContent.push(
              createParagraph("", { spacing: { before: 180, after: 80 } }),
              table,
              createParagraph("", { spacing: { before: 80, after: 180 } })
            );
          }
          break;

        case "cost":
          const costTable = createCostTable(item.content, item.options);
          if (costTable) {
            // Add heading if provided
            if (item.heading) {
              allContent.push(
                createParagraph(item.heading, {
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
              costTable,
              createParagraph("", { spacing: { before: 120, after: 200 } })
            );
          }
          break;

        case "price":
          if (Array.isArray(item.content)) {
            allContent.push(
              createParagraph("Price Terms", {
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
          if (item.content) {
            const imagePara = await createImageParagraph(item.content, {
              width: parseInt(item.width) || 400,
              height: parseInt(item.height) || 300,
              context: "inline",
              alignment:
                item.aliegn === "left"
                  ? AlignmentType.LEFT
                  : item.aliegn === "right"
                  ? AlignmentType.RIGHT
                  : AlignmentType.CENTER,
              spacing: { before: 160, after: 80 },
            });
            allContent.push(imagePara);

            if (item.caption) {
              allContent.push(
                createParagraph(item.caption, {
                  italic: true,
                  size: 18,
                  alignment: AlignmentType.CENTER,
                  spacing: { before: 40, after: 160 },
                  color: "6C757D",
                })
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

            const imageCell = await createImageParagraph(item.ImageLink, {
              width: parseInt(item.width) || 280,
              height: parseInt(item.height) || 210,
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
                            top: { style: BorderStyle.NONE },
                            bottom: { style: BorderStyle.NONE },
                            left: { style: BorderStyle.NONE },
                            right: { style: BorderStyle.NONE },
                          },
                          margins: { top: 0, bottom: 0, left: 0, right: 200 },
                          verticalAlign: VerticalAlign.CENTER,
                        }),
                        new TableCell({
                          children: [textCell],
                          width: { size: 65, type: WidthType.PERCENTAGE },
                          borders: {
                            top: { style: BorderStyle.NONE },
                            bottom: { style: BorderStyle.NONE },
                            left: { style: BorderStyle.NONE },
                            right: { style: BorderStyle.NONE },
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
                            top: { style: BorderStyle.NONE },
                            bottom: { style: BorderStyle.NONE },
                            left: { style: BorderStyle.NONE },
                            right: { style: BorderStyle.NONE },
                          },
                          margins: { top: 0, bottom: 0, left: 0, right: 200 },
                          verticalAlign: VerticalAlign.CENTER,
                        }),
                        new TableCell({
                          children: [imageCell],
                          width: { size: 35, type: WidthType.PERCENTAGE },
                          borders: {
                            top: { style: BorderStyle.NONE },
                            bottom: { style: BorderStyle.NONE },
                            left: { style: BorderStyle.NONE },
                            right: { style: BorderStyle.NONE },
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
              createParagraph("", { spacing: { before: 200, after: 80 } }),
              imageParaTable,
              createParagraph("", { spacing: { before: 80, after: 200 } })
            );
          }
          break;

        case "double-image":
          if (item.ImageLink1 && item.ImageLink2) {
            const image1 = await createImageParagraph(item.ImageLink1, {
              width: parseInt(item.width1) || 320,
              height: parseInt(item.height1) || 240,
              context: "double",
              alignment: AlignmentType.CENTER,
              spacing: { before: 0, after: 0 },
            });
            const image2 = await createImageParagraph(item.ImageLink2, {
              width: parseInt(item.width2) || 320,
              height: parseInt(item.height2) || 240,
              context: "double",
              alignment: AlignmentType.CENTER,
              spacing: { before: 0, after: 0 },
            });

            const doubleImageTable = new Table({
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      children: [image1],
                      width: { size: 50, type: WidthType.PERCENTAGE },
                      borders: {
                        top: { style: BorderStyle.NONE },
                        bottom: { style: BorderStyle.NONE },
                        left: { style: BorderStyle.NONE },
                        right: { style: BorderStyle.NONE },
                      },
                      margins: { top: 0, bottom: 0, left: 0, right: 100 },
                      verticalAlign: VerticalAlign.CENTER,
                    }),
                    new TableCell({
                      children: [image2],
                      width: { size: 50, type: WidthType.PERCENTAGE },
                      borders: {
                        top: { style: BorderStyle.NONE },
                        bottom: { style: BorderStyle.NONE },
                        left: { style: BorderStyle.NONE },
                        right: { style: BorderStyle.NONE },
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
              createParagraph("", { spacing: { before: 240, after: 120 } }),
              doubleImageTable,
              createParagraph("", { spacing: { before: 120, after: 240 } })
            );
          }
          break;

        case "code":
          if (item.content) {
            const codeBlocks = createCodeBlock(item.content, {
              spacing: { before: 200, after: 200 },
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
          if (Array.isArray(item.content)) {
            allContent.push(
              createParagraph("Signatures", {
                bold: true,
                size: 30,
                heading: HeadingLevel.HEADING_3,
                spacing: { before: 400, after: 200 },
                font: headingFont,
                color: "1976D2",
              })
            );

            // Create signature table with better web-matching layout
            const signatureRows = [];

            for (let i = 0; i < item.content.length; i += 2) {
              const signature1 = item.content[i];
              const signature2 = item.content[i + 1];

              const cells = [];

              // First signature
              if (signature1) {
                const role = i === 0 ? "Proposed by" : "Accepted by";
                const name =
                  signature1.proposedName ||
                  signature1.acceptedName ||
                  "Not specified";
                const status = signature1.signed ? "✓ Signed" : "Pending";
                const statusColor = signature1.signed ? "28A745" : "DC3545";

                cells.push(
                  new TableCell({
                    children: [
                      createParagraph(`${role}:`, {
                        bold: true,
                        size: 20,
                        spacing: { before: 0, after: 60 },
                      }),
                      createParagraph(name, {
                        size: 22,
                        spacing: { before: 0, after: 120 },
                      }),
                      createParagraph("_".repeat(25), {
                        color: "6C757D",
                        size: 16,
                        spacing: { before: 0, after: 60 },
                      }),
                      createParagraph(status, {
                        size: 18,
                        color: statusColor,
                        bold: true,
                        spacing: { before: 0, after: 0 },
                      }),
                    ],
                    width: {
                      size: signature2 ? 50 : 100,
                      type: WidthType.PERCENTAGE,
                    },
                    borders: {
                      top: { style: BorderStyle.NONE },
                      bottom: { style: BorderStyle.NONE },
                      left: { style: BorderStyle.NONE },
                      right: { style: BorderStyle.NONE },
                    },
                    margins: {
                      top: 0,
                      bottom: 0,
                      left: 0,
                      right: signature2 ? 150 : 0,
                    },
                    verticalAlign: VerticalAlign.TOP,
                  })
                );
              }

              // Second signature (if exists)
              if (signature2) {
                const role = "Accepted by";
                const name =
                  signature2.proposedName ||
                  signature2.acceptedName ||
                  "Not specified";
                const status = signature2.signed ? "✓ Signed" : "Pending";
                const statusColor = signature2.signed ? "28A745" : "DC3545";

                cells.push(
                  new TableCell({
                    children: [
                      createParagraph(`${role}:`, {
                        bold: true,
                        size: 20,
                        spacing: { before: 0, after: 60 },
                      }),
                      createParagraph(name, {
                        size: 22,
                        spacing: { before: 0, after: 120 },
                      }),
                      createParagraph("_".repeat(25), {
                        color: "6C757D",
                        size: 16,
                        spacing: { before: 0, after: 60 },
                      }),
                      createParagraph(status, {
                        size: 18,
                        color: statusColor,
                        bold: true,
                        spacing: { before: 0, after: 0 },
                      }),
                    ],
                    width: { size: 50, type: WidthType.PERCENTAGE },
                    borders: {
                      top: { style: BorderStyle.NONE },
                      bottom: { style: BorderStyle.NONE },
                      left: { style: BorderStyle.NONE },
                      right: { style: BorderStyle.NONE },
                    },
                    margins: { top: 0, bottom: 0, left: 150, right: 0 },
                    verticalAlign: VerticalAlign.TOP,
                  })
                );
              }

              signatureRows.push(new TableRow({ children: cells }));
            }

            const signatureTable = new Table({
              rows: signatureRows,
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
          console.warn(`Unhandled content type '${item.type}':`, item);
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

  // Create the final document with web-matching styles
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
            spacing: {
              before: 60,
              after: 60,
              line: Math.round(22 * 20 * 1.2),
            },
          },
        },
        {
          id: "Heading1",
          name: "Heading 1",
          basedOn: "Normal",
          next: "Normal",
          run: {
            font: headingFont,
            size: 44,
            bold: true,
            color: "1976D2",
          },
          paragraph: {
            spacing: {
              before: 240,
              after: 120,
              line: Math.round(44 * 20 * 1.1),
            },
          },
        },
        {
          id: "Heading2",
          name: "Heading 2",
          basedOn: "Normal",
          next: "Normal",
          run: {
            font: headingFont,
            size: 32,
            bold: true,
            color: "1976D2",
          },
          paragraph: {
            spacing: {
              before: 180,
              after: 100,
              line: Math.round(32 * 20 * 1.1),
            },
          },
        },
        {
          id: "CodeBlock",
          name: "Code Block",
          basedOn: "Normal",
          next: "Normal",
          run: {
            font: codeFont,
            size: 18,
            color: "333333",
          },
          paragraph: {
            spacing: {
              before: 0,
              after: 40,
              line: Math.round(18 * 20 * 1.2),
            },
            indent: {
              left: 400,
            },
            shading: {
              fill: "F8F9FA",
              type: ShadingType.SOLID,
            },
            borders: {
              left: { style: BorderStyle.SINGLE, size: 6, color: "007ACC" },
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
                      size: 18,
                      color: "6C757D",
                      alignment: AlignmentType.CENTER,
                      spacing: { before: 60, after: 60 },
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
                    size: 16,
                    color: "6C757D",
                    alignment: AlignmentType.CENTER,
                    spacing: { before: 60, after: 60 },
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
