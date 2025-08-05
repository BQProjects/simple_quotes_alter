import jsPDF from "jspdf";
import React from "react";
import autoTable from "jspdf-autotable";
import ImageAlter from "../../assets/ImageAlter.png";
import { BsFileLock } from "react-icons/bs";

const GeneratePDF = async (data, settings) => {
  const doc = new jsPDF();
  let currentY = 10; // Start position for the Y-coordinate
  const pageHeight = doc.internal.pageSize.height;
  const availableWidth = doc.internal.pageSize.width - 10;
  doc.setFont(settings.body);

  const renderContent = (content, type, options) => {
    const pageS = doc.internal.pageSize.width;
    if (type !== "image" && type !== "brake") {
      if (!content) {
        console.warn(
          `Content for type '${type}' is missing or invalid:`,
          content
        );
        return;
      }
    }

    switch (type) {
      case "heading":
        doc.setFont(settings.heading);
        currentY += 10;
        const headingText =
          Array.isArray(content) &&
          content[0]?.children &&
          content[0]?.children[0]?.text
            ? content[0].children[0].text
            : "";
        const textSize =
          Array.isArray(content) && content[0]?.children && content[0]?.type
            ? content[0].type
            : "heading-two";
        const alignment =
          Array.isArray(content) && content[0]?.align
            ? content[0].align.toLowerCase()
            : "left"; // Default to "left" alignment if not specified
        if (currentY + 20 > pageHeight) {
          doc.addPage();
          currentY = 10;
        }

        doc.setFontSize(
          textSize === "heading-one"
            ? 26
            : textSize === "heading-two"
            ? 24
            : textSize === "heading-three"
            ? 22
            : textSize === "heading-four"
            ? 20
            : textSize === "heading-five"
            ? 18
            : 16
        );

        let xPosition = 10; // Default for "left"
        if (alignment === "center") {
          const pageWidth = doc.internal.pageSize.width;
          const textWidth = doc.getTextWidth(headingText);
          xPosition = (pageWidth - textWidth) / 2; // Center align
        } else if (alignment === "right") {
          const pageWidth = doc.internal.pageSize.width;
          const textWidth = doc.getTextWidth(headingText);
          xPosition = pageWidth - textWidth - 10; // Right align
        }

        // Render the text
        doc.text(headingText, xPosition, currentY, { maxWidth: pageS });
        currentY += 5;
        // Add space after heading
        doc.setFont(settings.body);
        break;

      case "table":
        doc.setFontSize(12);
        if (currentY + 25 > pageHeight) {
          doc.addPage();
          currentY = 10;
        }

        if (Array.isArray(content) && content.length > 0) {
          const rows = content.map((row) => (Array.isArray(row) ? row : []));
          const columnCount = Math.max(...rows.map((r) => r.length));
          const cellWidth =
            (doc.internal.pageSize.getWidth() - 20) / columnCount;
          let startY = currentY;

          for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
            const row = rows[rowIndex];
            let x = 10; // left margin
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

            const lineHeight = 7;
            const cellHeight = maxLines * lineHeight + 2;

            // Page break check
            if (startY + cellHeight > pageHeight) {
              doc.addPage();
              startY = 10;
            }

            // Second pass: draw cells and vertically centered text
            for (let colIndex = 0; colIndex < columnCount; colIndex++) {
              const wrapped = wrappedTexts[colIndex];
              doc.rect(x, startY, cellWidth, cellHeight); // Draw cell border

              // Vertical centering
              const totalTextHeight = wrapped.length * lineHeight;
              const verticalOffset = (cellHeight - totalTextHeight) / 2;
              doc.text(wrapped, x + 2, startY + verticalOffset + lineHeight);

              x += cellWidth;
            }

            startY += cellHeight;
          }

          currentY = startY + 10;
        } else {
          console.warn("Invalid table data:", content);
        }
        break;

      case "input":
        if (Array.isArray(content)) {
          content.forEach((block) => {
            const text = block?.children?.[0]?.text || "";
            const alignment = block?.align?.toLowerCase() || "left";
            const type = block?.type || "paragraph";

            if (type === "numbered-list") {
              if (currentY + 15 > pageHeight) {
                doc.addPage();
                currentY = 10;
              }
              if (Array.isArray(block?.children)) {
                block.children.forEach((item, idx) => {
                  const text = item?.children?.[0]?.text || "";
                  const alignment = item?.align?.toLowerCase() || "left"; // Default alignment is "left"

                  let xPosition = 10; // Default for "left" alignment
                  if (alignment === "center") {
                    const pageWidth = doc.internal.pageSize.width;
                    const textWidth = doc.getTextWidth(`${idx + 1}. ` + text);
                    xPosition = (pageWidth - textWidth) / 2; // Center align
                  } else if (alignment === "right") {
                    const pageWidth = doc.internal.pageSize.width;
                    const textWidth = doc.getTextWidth(`${idx + 1}. ` + text);
                    xPosition = pageWidth - textWidth - 10; // Right align
                  }

                  doc.setFontSize(8); // Set standard font size for list items
                  const prefix = `${idx + 1}.`; // Use numbers or bullet points
                  const lines = doc.splitTextToSize(
                    prefix + text,
                    availableWidth
                  );
                  lines.forEach((line, idx) => {
                    doc.text(line, xPosition, currentY, {
                      maxWidth: doc.internal.pageSize.width - 15,
                    });
                    currentY += 5;
                    if (currentY + 10 > pageHeight) {
                      doc.addPage();
                      currentY = 10;
                    }
                    // Move down for the next line
                  }); // Move down for the next item
                });
              }
            } else if (type === "bulleted-list") {
              if (currentY + 15 > pageHeight) {
                doc.addPage();
                currentY = 10;
              }
              if (Array.isArray(block?.children)) {
                block.children.forEach((item, idx) => {
                  const text = item?.children?.[0]?.text || "";
                  const alignment = item?.align?.toLowerCase() || "left"; // Default alignment is "left"

                  let xPosition = 10; // Default for "left" alignment
                  if (alignment === "center") {
                    const pageWidth = doc.internal.pageSize.width;
                    const textWidth = doc.getTextWidth("• " + text);
                    xPosition = (pageWidth - textWidth) / 2; // Center align
                  } else if (alignment === "right") {
                    const pageWidth = doc.internal.pageSize.width;
                    const textWidth = doc.getTextWidth("• " + text);
                    xPosition = pageWidth - textWidth - 10; // Right align
                  }

                  doc.setFontSize(8); // Set standard font size for list items
                  const prefix = "• "; // Use numbers or bullet points
                  const lines = doc.splitTextToSize(
                    prefix + text,
                    availableWidth
                  );
                  lines.forEach((line, idx) => {
                    doc.text(line, xPosition, currentY, {
                      maxWidth: doc.internal.pageSize.width - 15,
                    });
                    if (currentY + 10 > pageHeight) {
                      doc.addPage();
                      currentY = 10;
                    }
                    currentY += 5; // Move down for the next line
                  }); // Move down for the next item
                });
              }
            } else if (type === "block-quote") {
              if (currentY + 15 > pageHeight) {
                doc.addPage();
                currentY = 10;
              }
              const text = block?.children?.[0]?.text || "";

              // Apply custom styling for block quotes
              doc.setFont("Times", "italic"); // Italic font for block quotes
              doc.setFontSize(14); // Slightly larger font size for emphasis

              // Add left indentation for block quotes
              const xPosition = 20; // Indent block quotes slightly
              doc.text(text, xPosition, currentY, {
                maxWidth: doc.internal.pageSize.width - 40,
              }); // Restrict width for wrapping
              if (currentY + 10 > pageHeight) {
                doc.addPage();
                currentY = 10;
              }

              currentY += 5; // Add extra spacing after block quote
            } else {
              if (currentY + 15 > pageHeight) {
                doc.addPage();
                currentY = 10;
              }
              let xPosition = 10; // Default for "left" alignment
              if (alignment === "center") {
                const pageWidth = doc.internal.pageSize.width;
                const textWidth = doc.getTextWidth(text);
                xPosition = (pageWidth - textWidth) / 2; // Center align
              } else if (alignment === "right") {
                const pageWidth = doc.internal.pageSize.width;
                const textWidth = doc.getTextWidth(text);
                xPosition = pageWidth - textWidth - 10; // Right align
              }
              const textSize = block.type;

              doc.setFontSize(
                textSize === "heading-one"
                  ? 16
                  : textSize === "heading-two"
                  ? 14
                  : textSize === "heading-three"
                  ? 12
                  : textSize === "heading-four"
                  ? 10
                  : textSize === "heading-five"
                  ? 8
                  : 8
              ); // Set a standard font size for input text
              const lines = doc.splitTextToSize(text, availableWidth);
              if (textSize === "heading-one" || textSize === "heading-two") {
                currentY += 3;
              }
              lines.forEach((line, idx) => {
                doc.text(line, xPosition, currentY, {
                  maxWidth: doc.internal.pageSize.width - 15,
                });
                if (currentY + 10 > pageHeight) {
                  doc.addPage();
                  currentY = 10;
                }
                currentY +=
                  textSize === "heading-one"
                    ? 12
                    : textSize === "heading-two"
                    ? 10
                    : textSize === "heading-three"
                    ? 8
                    : textSize === "heading-four"
                    ? 6
                    : textSize === "heading-five"
                    ? 6
                    : 5; // Move down for the next line
              });
              // Add space after rendering each block
            }
          });
        } else {
          console.warn("Invalid content for 'input':", content);
        }
        break;

      case "double-para":
        if (
          Array.isArray(content.firstContent) &&
          Array.isArray(content.secondContent)
        ) {
          if (currentY + 20 > pageHeight) {
            doc.addPage();
            currentY = 10;
          }
          const pageWidth = doc.internal.pageSize.width;
          const halfWidth = pageWidth / 2;
          const temp = currentY;
          const currentPage = doc.internal.getCurrentPageInfo().pageNumber;

          content.firstContent.forEach((block) => {
            const text = block?.children?.[0]?.text || "No Text Provided";
            const alignment = block?.align?.toLowerCase() || "left";
            const type = block?.type || "paragraph";

            if (type === "numbered-list") {
              const alignment = block?.align?.toLowerCase() || "left";
              if (Array.isArray(block?.children)) {
                block.children.forEach((item, idx) => {
                  const text = item?.children?.[0]?.text || "No Text Provided";
                  // Default alignment is "left"

                  let xPosition = 10; // Default for "left" alignment
                  if (alignment === "center") {
                    const pageWidth = doc.internal.pageSize.width / 2;
                    const textWidth = doc.getTextWidth(`${idx + 1}. ` + text);
                    xPosition = (pageWidth - textWidth) / 2; // Center align
                  } else if (alignment === "right") {
                    const pageWidth = doc.internal.pageSize.width / 2;
                    const textWidth = doc.getTextWidth(`${idx + 1}. ` + text);
                    xPosition = pageWidth - textWidth - 10; // Right align
                  }

                  doc.setFontSize(8); // Set standard font size for list items
                  const prefix = `${idx + 1}.`; // Use numbers or bullet points
                  const lines = doc.splitTextToSize(
                    prefix + text,
                    halfWidth - 15
                  );
                  lines.forEach((line, idx) => {
                    doc.text(line, xPosition, currentY, {
                      maxWidth: halfWidth - 15,
                    });
                    if (currentY + 10 > pageHeight) {
                      doc.addPage();
                      currentY = 10;
                    }
                    currentY += 5; // Move down for the next line
                  });
                });
              }
            } else if (type === "bulleted-list") {
              const alignment = block?.align?.toLowerCase() || "left";
              if (Array.isArray(block?.children)) {
                block.children.forEach((item, idx) => {
                  const text = item?.children?.[0]?.text || "No Text Provided";
                  // Default alignment is "left"

                  let xPosition = 10; // Default for "left" alignment
                  if (alignment === "center") {
                    const pageWidth = doc.internal.pageSize.width / 2;
                    const textWidth = doc.getTextWidth("• " + text);
                    xPosition = (pageWidth - textWidth) / 2; // Center align
                  } else if (alignment === "right") {
                    const pageWidth = doc.internal.pageSize.width / 2;
                    const textWidth = doc.getTextWidth("• " + text);
                    xPosition = pageWidth - textWidth - 10; // Right align
                  }

                  doc.setFontSize(8); // Set standard font size for list items
                  const prefix = "• "; // Use numbers or bullet points
                  const lines = doc.splitTextToSize(
                    prefix + text,
                    halfWidth - 15
                  );
                  lines.forEach((line, idx) => {
                    doc.text(line, xPosition, currentY, {
                      maxWidth: halfWidth - 15,
                    });
                    if (currentY + 10 > pageHeight) {
                      doc.addPage();
                      currentY = 10;
                    }
                    currentY += 5; // Move down for the next line
                  });
                });
              }
            } else if (type === "block-quote") {
              const text = block?.children?.[0]?.text || "No Text Provided";

              // Apply custom styling for block quotes
              doc.setFont("Times", "italic"); // Italic font for block quotes
              doc.setFontSize(10); // Slightly larger font size for emphasis

              // Add left indentation for block quotes
              const xPosition = 20;

              // Restrict width for wrapping
              const lines = doc.splitTextToSize(text, halfWidth - 15);
              lines.forEach((line, idx) => {
                doc.text(line, xPosition, currentY, {
                  maxWidth: doc.internal.pageSize.width - 40,
                });
                if (currentY + 10 > pageHeight) {
                  doc.addPage();
                  currentY = 10;
                }
                currentY += 5; // Move down for the next line
              });
            } else {
              let xPosition = 10; // Default for "left" alignment
              if (alignment === "center") {
                const pageWidth = doc.internal.pageSize.width / 2;
                const textWidth = doc.getTextWidth(text);
                xPosition = (pageWidth - textWidth) / 2; // Center align
              } else if (alignment === "right") {
                const pageWidth = doc.internal.pageSize.width / 2;
                const textWidth = doc.getTextWidth(text);
                xPosition = pageWidth - textWidth - 10; // Right align
              }
              const textSize = block.type;
              if (textSize === "heading-one" || textSize === "heading-two") {
                currentY += 3;
              }

              doc.setFontSize(
                textSize === "heading-one"
                  ? 16
                  : textSize === "heading-two"
                  ? 14
                  : textSize === "heading-three"
                  ? 12
                  : textSize === "heading-four"
                  ? 10
                  : textSize === "heading-five"
                  ? 8
                  : 8
              ); // Set a standard font size for input text
              const lines = doc.splitTextToSize(text, halfWidth - 15);
              lines.forEach((line, idx) => {
                doc.text(line, xPosition, currentY, {
                  maxWidth: halfWidth - 15,
                });
                if (currentY + 10 > pageHeight) {
                  doc.addPage();
                  currentY = 10;
                }
                currentY += 5;
              });
            }
          });
          currentY = temp;
          doc.setPage(currentPage);
          content.secondContent.forEach((block) => {
            const text = block?.children?.[0]?.text || "No Text Provided";
            const alignment = block?.align?.toLowerCase() || "left";
            const type = block?.type || "paragraph";

            if (type === "numbered-list") {
              if (Array.isArray(block?.children)) {
                block.children.forEach((item, idx) => {
                  const text = item?.children?.[0]?.text || "No Text Provided";
                  // Default alignment is "left"

                  let xPosition = halfWidth + 10; // Default for "left" alignment
                  if (alignment === "center") {
                    const pageWidth = doc.internal.pageSize.width / 2;
                    const textWidth = doc.getTextWidth(`${idx + 1}. ` + text);
                    xPosition = halfWidth + (pageWidth - textWidth) / 2; // Center align
                  } else if (alignment === "right") {
                    const pageWidth = doc.internal.pageSize.width / 2;
                    const textWidth = doc.getTextWidth(`${idx + 1}. ` + text);
                    xPosition = halfWidth + pageWidth - textWidth - 10; // Right align
                  }

                  doc.setFontSize(8); // Set standard font size for list items
                  const prefix = `${idx + 1}.`; // Use numbers or bullet points
                  const lines = doc.splitTextToSize(
                    prefix + text,
                    halfWidth - 15
                  );
                  lines.forEach((line, idx) => {
                    doc.text(line, xPosition, currentY, {
                      maxWidth: halfWidth - 15,
                    });
                    if (currentY + 10 > pageHeight) {
                      doc.setPage(currentPage + 1);
                      currentY = 10;
                    }
                    currentY += 5; // Move down for the next item // Move down for the next line
                  });
                });
              }
            } else if (type === "bulleted-list") {
              const alignment = block?.align?.toLowerCase() || "left";
              if (Array.isArray(block?.children)) {
                block.children.forEach((item, idx) => {
                  const text = item?.children?.[0]?.text || "No Text Provided";
                  // Default alignment is "left"

                  let xPosition = halfWidth + 10; // Default for "left" alignment
                  if (alignment === "center") {
                    const pageWidth = doc.internal.pageSize.width / 2;
                    const textWidth = doc.getTextWidth("• " + text);
                    xPosition = halfWidth + (pageWidth - textWidth) / 2; // Center align
                  } else if (alignment === "right") {
                    const pageWidth = doc.internal.pageSize.width / 2;
                    const textWidth = doc.getTextWidth("• " + text);
                    xPosition = halfWidth + pageWidth - textWidth - 10; // Right align
                  }

                  doc.setFontSize(8); // Set standard font size for list items
                  const prefix = "• "; // Use numbers or bullet points
                  const lines = doc.splitTextToSize(
                    prefix + text,
                    halfWidth - 15
                  );
                  lines.forEach((line, idx) => {
                    doc.text(line, xPosition, currentY, {
                      maxWidth: halfWidth - 15,
                    });
                    if (currentY + 10 > pageHeight) {
                      doc.setPage(currentPage + 1);
                      currentY = 10;
                    }
                    currentY += 5; // Move down for the next item // Move down for the next line
                  });
                });
              }
            } else if (type === "block-quote") {
              const text = block?.children?.[0]?.text || "No Text Provided";

              // Apply custom styling for block quotes
              doc.setFont("Times", "italic"); // Italic font for block quotes
              doc.setFontSize(12); // Slightly larger font size for emphasis

              // Add left indentation for block quotes
              const xPosition = halfWidth + 10; // Indent block quotes slightly
              doc.text(text, xPosition, currentY, {
                maxWidth: doc.internal.pageSize.width - 40,
              }); // Restrict width for wrapping

              currentY += 5; // Add extra spacing after block quote
            } else {
              let xPosition = halfWidth + 10; // Default for "left" alignment
              if (alignment === "center") {
                const pageWidth = doc.internal.pageSize.width / 2;
                const textWidth = doc.getTextWidth(text);
                xPosition = halfWidth + (pageWidth - textWidth) / 2; // Center align
              } else if (alignment === "right") {
                const pageWidth = doc.internal.pageSize.width / 2;
                const textWidth = doc.getTextWidth(text);
                xPosition = halfWidth + pageWidth - textWidth - 10; // Right align
              }
              const textSize = block.type;
              if (textSize === "heading-one" || textSize === "heading-two") {
                currentY += 3;
              }

              doc.setFontSize(
                textSize === "heading-one"
                  ? 16
                  : textSize === "heading-two"
                  ? 14
                  : textSize === "heading-three"
                  ? 12
                  : textSize === "heading-four"
                  ? 10
                  : textSize === "heading-five"
                  ? 8
                  : 8
              ); // Set a standard font size for input text
              const lines = doc.splitTextToSize(text, halfWidth - 15);
              lines.forEach((line, idx) => {
                doc.text(line, xPosition, currentY, {
                  maxWidth: halfWidth - 15,
                });
                if (currentY + 10 > pageHeight) {
                  doc.setPage(currentPage + 1);
                  currentY = 10;
                }
                currentY += 5;
              });
            }
          });
        } else {
          console.warn(`Invalid content for '${type}':`, content);
        }
        break;

      case "image":
        if (currentY + 50 > pageHeight) {
          doc.addPage();
          currentY = 10;
        }
        const imgWidth = availableWidth - 10; // Image width
        const imgHeight = 50; // Image height
        const pageWidth = doc.internal.pageSize.width;
        const Position = (pageWidth - imgWidth) / 2; // Center the image horizontally

        doc.addImage(content, "JPEG", Position, currentY, imgWidth, imgHeight);
        currentY += imgHeight + 10; // Add space after the image
        break;

      case "image-para":
        if (currentY + 30 > pageHeight) {
          doc.addPage();
          currentY = 10;
        }
        if (Array.isArray(content)) {
          const pageWidth = doc.internal.pageSize.width;
          const halfWidth = pageWidth / 2;
          const temp = currentY;
          content.forEach((block) => {
            const text = block?.children?.[0]?.text || "No Text Provided";
            const alignment = block?.align?.toLowerCase() || "left";
            const type = block?.type || "paragraph";

            if (type === "numbered-list") {
              const alignment = block?.align?.toLowerCase() || "left";
              if (Array.isArray(block?.children)) {
                block.children.forEach((item, idx) => {
                  const text = item?.children?.[0]?.text || "No Text Provided";
                  // Default alignment is "left"

                  let xPosition = 10; // Default for "left" alignment
                  if (alignment === "center") {
                    const pageWidth = doc.internal.pageSize.width / 2;
                    const textWidth = doc.getTextWidth(`${idx + 1}. ` + text);
                    xPosition = (pageWidth - textWidth) / 2; // Center align
                  } else if (alignment === "right") {
                    const pageWidth = doc.internal.pageSize.width / 2;
                    const textWidth = doc.getTextWidth(`${idx + 1}. ` + text);
                    xPosition = pageWidth - textWidth - 10; // Right align
                  }

                  doc.setFontSize(8); // Set standard font size for list items
                  const prefix = `${idx + 1}.`; // Use numbers or bullet points
                  const lines = doc.splitTextToSize(
                    prefix + text,
                    halfWidth - 10
                  );
                  lines.forEach((line, idx) => {
                    doc.text(line, xPosition, currentY, {
                      maxWidth: halfWidth - 10,
                    });
                    if (currentY + 10 > pageHeight) {
                      doc.addPage();
                      currentY = 10;
                    }
                    currentY += 5; // Move down for the next line
                  });
                });
              }
            } else if (type === "bulleted-list") {
              const alignment = block?.align?.toLowerCase() || "left";
              if (Array.isArray(block?.children)) {
                block.children.forEach((item, idx) => {
                  const text = item?.children?.[0]?.text || "No Text Provided";
                  // Default alignment is "left"

                  let xPosition = 10; // Default for "left" alignment
                  if (alignment === "center") {
                    const pageWidth = doc.internal.pageSize.width / 2;
                    const textWidth = doc.getTextWidth("• " + text);
                    xPosition = (pageWidth - textWidth) / 2; // Center align
                  } else if (alignment === "right") {
                    const pageWidth = doc.internal.pageSize.width / 2;
                    const textWidth = doc.getTextWidth("• " + text);
                    xPosition = pageWidth - textWidth - 10; // Right align
                  }

                  doc.setFontSize(8); // Set standard font size for list items
                  const prefix = "• "; // Use numbers or bullet points
                  const lines = doc.splitTextToSize(
                    prefix + text,
                    halfWidth - 10
                  );
                  lines.forEach((line, idx) => {
                    doc.text(line, xPosition, currentY, {
                      maxWidth: halfWidth - 10,
                    });
                    if (currentY + 10 > pageHeight) {
                      doc.addPage();
                      currentY = 10;
                    }
                    currentY += 5; // Move down for the next line
                  });
                });
              }
            } else if (type === "block-quote") {
              const text = block?.children?.[0]?.text || "No Text Provided";

              // Apply custom styling for block quotes
              doc.setFont("Times", "italic"); // Italic font for block quotes
              doc.setFontSize(12); // Slightly larger font size for emphasis

              // Add left indentation for block quotes
              const xPosition = 20; // Indent block quotes slightly
              doc.text(text, xPosition, currentY, {
                maxWidth: halfWidth - 10,
              }); // Restrict width for wrapping

              currentY += 5; // Add extra spacing after block quote
            } else {
              let xPosition = 10; // Default for "left" alignment
              if (alignment === "center") {
                const pageWidth = doc.internal.pageSize.width;
                const textWidth = doc.getTextWidth(text);
                xPosition = (pageWidth - textWidth) / 2; // Center align
              } else if (alignment === "right") {
                const pageWidth = doc.internal.pageSize.width;
                const textWidth = doc.getTextWidth(text);
                xPosition = pageWidth - textWidth - 10; // Right align
              }
              const textSize = block.type;
              if (textSize === "heading-one" || textSize === "heading-two") {
                currentY += 3;
              }

              doc.setFontSize(
                textSize === "heading-one"
                  ? 16
                  : textSize === "heading-two"
                  ? 14
                  : textSize === "heading-three"
                  ? 12
                  : textSize === "heading-four"
                  ? 10
                  : textSize === "heading-five"
                  ? 8
                  : 8
              ); // Set a standard font size for input text
              const lines = doc.splitTextToSize(text, halfWidth - 10);
              lines.forEach((line, idx) => {
                doc.text(line, xPosition, currentY, {
                  maxWidth: halfWidth - 10,
                });
                if (currentY + 10 > pageHeight) {
                  doc.addPage();
                  currentY = 10;
                }
                currentY +=
                  textSize === "heading-one"
                    ? 12
                    : textSize === "heading-two"
                    ? 10
                    : textSize === "heading-three"
                    ? 8
                    : textSize === "heading-four"
                    ? 6
                    : textSize === "heading-five"
                    ? 5
                    : 5; // Move down for the next line
              });
            }
          });
          currentY = temp;
          const imgWidth = 50; // Image width
          const imgHeight = 50; // Image height
          const page = doc.internal.pageSize.width / 2;

          const imgXPosition = page + 10; // Position image to the right of the text
          const imgYPosition = currentY - 10; // Keep the same Y position as the text

          // Center the image horizontally

          doc.addImage(
            ImageAlter,
            "JPEG",
            imgXPosition,
            imgYPosition,
            imgWidth,
            imgHeight
          );
          currentY += Math.max(50, 10);
        } else {
          console.warn("Invalid content for 'input':", content);
        }
        break;

      case "cost":
        doc.setFontSize(12);
        if (currentY + 15 > pageHeight) {
          doc.addPage();
          currentY = 10;
        }

        const hasDiscount = options.quantity;
        const hasQuantity = options.quantity;

        // Dynamically build headers
        const headers = ["Deliverable", "Price"];
        if (hasDiscount) headers.push("Discount");
        if (hasQuantity) headers.push("Quantity");
        headers.push("Payment Duration", "Amount");

        // Prepare body rows
        const body = content.map((row) => {
          const rowData = [row.deliverable, row.price];
          if (hasDiscount) rowData.push(row.discount || "");
          if (hasQuantity) rowData.push(row.quantity || "");
          rowData.push(row.paymentDuration, row.amount);
          return rowData;
        });

        // Table layout config
        const colCount = headers.length;
        const colWidth = (doc.internal.pageSize.getWidth() - 20) / colCount;
        const rowHeight = 10;
        let y = currentY;

        // Draw header
        let x = 10;
        headers.forEach((header) => {
          doc.rect(x, y, colWidth, rowHeight);
          doc.text(header.toString(), x + 2, y + 7);
          x += colWidth;
        });
        y += rowHeight;

        // Draw rows
        body.forEach((row) => {
          x = 10;
          if (y + rowHeight > pageHeight) {
            doc.addPage();
            y = 10;
          }

          row.forEach((cell) => {
            doc.rect(x, y, colWidth, rowHeight);
            doc.text(cell !== undefined ? cell.toString() : "", x + 2, y + 7);
            x += colWidth;
          });
          y += rowHeight;
        });

        // Update currentY
        currentY = y + 10;

        // Calculate total amount
        let total = 0;
        content.forEach((item) => {
          total += Number(item.amount) || 0;
        });

        const formattedValue = new Intl.NumberFormat().format(total);
        doc.text(`Total Price is $${formattedValue}`, 15, currentY);
        break;

      case "sign":
        // Add "Signatures" label with some spacing
        let proposed;
        let proposedSigned;
        let acceptedSigned;
        let accepted;
        content.forEach((item, idx) => {
          if (idx === 0) {
            proposed = item.proposedName;
            proposedSigned = item.signed;
          } else {
            accepted = item.acceptedName;
            acceptedSigned = item.signed;
          }
        });
        currentY += 10;
        doc.text("Signatures", 10, currentY + 5);

        // Proposed name
        // Proposed signature line and text
        const proposedLineStart = 60;
        const proposedLineEnd = 110;
        const proposedLineCenter = (proposedLineStart + proposedLineEnd) / 2; // Center of the line
        const proposedTextWidth = doc.getTextWidth(proposed); // Width of the text
        const proposedTextX = proposedLineCenter - proposedTextWidth / 2; // Center the text

        if (proposedSigned === true) {
          doc.setFont("Times", "italic");
          doc.text(proposed, proposedTextX, currentY);
        }

        doc.line(
          proposedLineStart,
          currentY + 3,
          proposedLineEnd,
          currentY + 3
        ); // Draw line
        doc.setFont("Times", "normal", "bold");

        doc.text(proposed, proposedTextX, currentY + 9); // Centered text above the line

        // Accepted signature line and text
        const acceptedLineStart = 140;
        const acceptedLineEnd = 190;
        const acceptedLineCenter = (acceptedLineStart + acceptedLineEnd) / 2; // Center of the line
        const acceptedTextWidth = doc.getTextWidth(accepted); // Width of the text
        const acceptedTextX = acceptedLineCenter - acceptedTextWidth / 2; // Center the text

        if (acceptedSigned === true) {
          doc.setFont("Times", "italic");
          doc.text(accepted, acceptedTextX, currentY);
        }
        doc.line(
          acceptedLineStart,
          currentY + 3,
          acceptedLineEnd,
          currentY + 3
        ); // Draw line
        doc.setFont("Times", "normal", "bold");
        doc.text(accepted, acceptedTextX, currentY + 9); // Centered text above the line

        break;

      case "brake":
        doc.addPage();
        currentY = 10;
      default:
        console.warn(`Unhandled type '${type}':`, content);
    }
  };

  // Iterate over all data items
  data.forEach((item) => {
    if (item.type === "double-para") {
      renderContent(item, item.type, {});
    } else if (item.type === "cost") {
      renderContent(item.content, item.type, item.options);
    } else {
      renderContent(item.content, item.type, {});
    }

    currentY += 5;
  });

  // Save the PDF
  doc.save("document.pdf");
};

export default GeneratePDF;
