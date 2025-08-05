import React, {
  useCallback,
  useMemo,
  useState,
  useRef,
  useEffect,
} from "react";
import {
  FaBold,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
} from "react-icons/fa";
import {
  createEditor,
  Transforms,
  Editor,
  Element as SlateElement,
} from "slate";
import { LuStrikethrough } from "react-icons/lu";
import { FaStrikethrough } from "react-icons/fa6";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";
import { Button, Toolbar } from "./comp"; // Your components
import { FaItalic } from "react-icons/fa";
import { FaUnderline } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { PiTextBBold } from "react-icons/pi";
import { RxFontItalic } from "react-icons/rx";
import { PiTextUnderline } from "react-icons/pi";
import { PiTextStrikethrough } from "react-icons/pi";
import { BsTextCenter } from "react-icons/bs";
import { BsTextRight } from "react-icons/bs";
import { BsTextLeft } from "react-icons/bs";

const LIST_TYPES = ["numbered-list", "bulleted-list"];
const ALIGN_TYPES = ["left", "center", "right"];

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes(n.type),
    split: true,
  });

  const newProperties = {
    type: format,
  };
  Transforms.setNodes(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const toggleAlign = (editor, align) => {
  const newProperties = { align };
  Transforms.setNodes(editor, newProperties);
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const transformText = (editor, transformType) => {
  const { selection } = editor;

  if (!selection) return;

  const nodes = Array.from(
    Editor.nodes(editor, {
      match: (n) => Editor.isInline(editor, n) || Editor.isBlock(editor, n),
    })
  );

  for (const [node, path] of nodes) {
    if (node.text) {
      let newText = node.text;
      if (transformType === "uppercase") newText = node.text.toUpperCase();
      else if (transformType === "lowercase") newText = node.text.toLowerCase();
      else if (transformType === "capitalize")
        newText = node.text.replace(/\b\w/g, (char) => char.toUpperCase());

      Transforms.insertText(editor, newText, { at: path });
    }
  }
};

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => n.type === format,
  });
  return !!match;
};

const isAlignActive = (editor, align) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => n.align === align,
  });
  return !!match;
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const Element = ({ attributes, children, element, size }) => {
  const alignment =
    element.align === "center"
      ? `text-${element.align}`
      : element.align === "right"
      ? "text-right"
      : "text-left";

  switch (size) {
    case "heading-one":
      return (
        <h1 className={`w-full text-[2.5em] ${alignment}`} {...attributes}>
          {children}
        </h1>
      );
    case "heading-two":
      return (
        <h2 className={`text-[2em] ${alignment}`} {...attributes}>
          {children}
        </h2>
      );
    case "heading-three":
      return (
        <h3 className={`text-[1.75em] ${alignment}`} {...attributes}>
          {children}
        </h3>
      );
    case "heading-four":
      return (
        <h4 className={`text-[1.5em] ${alignment}`} {...attributes}>
          {children}
        </h4>
      );
    case "heading-five":
      return (
        <h5 className={`text-[1.25em] ${alignment}`} {...attributes}>
          {children}
        </h5>
      );
    case "heading-six":
      return (
        <h6 className={`text-[1em] ${alignment}`} {...attributes}>
          {children}
        </h6>
      );
    default:
      return (
        <p className={`mb-2 ${alignment}`} {...attributes}>
          {children}
        </p>
      );
  }
};

const Leaf = ({ attributes, children, leaf }) => {
  const classNames = [
    leaf.bold ? "font-bold" : "",
    leaf.italic ? "italic" : "",
    leaf.underline ? "underline" : "",
    leaf.strikethrough ? "line-through" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span {...attributes} className={classNames}>
      {children}
    </span>
  );
};
const MyRichTextEditor = ({
  index,
  indexValue,
  setIndexValue,
  onChange,
  onSizeChange,
  data,
  preview,
  size,
  settings,
  onTextColor,
  textColor,
  selected,
  setSelected,
}) => {
  const colors = [
    { class: "text-active_text", hex: "#1F1F1F" },
    { class: "text-white", hex: "#FFFFFF" },
    { class: "text-gray-700", hex: "#374151" },
  ];
  const alignments = [
    { name: "left", icon: <BsTextLeft /> },
    { name: "center", icon: <BsTextCenter /> },
    { name: "right", icon: <BsTextRight /> },
  ];
  const [textSize, setTextSize] = useState(size);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [open, setOpen] = useState(false);
  const initialValue = [
    {
      type: textSize,
      align: "left",

      children: [
        {
          text: "",
          bold: false,
        },
      ],
    },
  ];

  const createBorder = (theme, color) => {
    if (theme === 1) {
      return size === "heading-one" ? (
        <div
          style={{ "--tw-bg-opacity": 1, backgroundColor: color }}
          className="h-[10px] w-full"
        ></div>
      ) : size === "heading-two" ? (
        <div
          style={{ "--tw-bg-opacity": 1, backgroundColor: color }}
          className="h-[5px] w-full"
        ></div>
      ) : (
        <div
          style={{ "--tw-bg-opacity": 1, backgroundColor: "white" }}
          className="h-[5px] w-full"
        ></div>
      );
    } else if (theme === 2) {
      return size === "heading-one" ? (
        <div
          style={{ "--tw-bg-opacity": 1, backgroundColor: color }}
          className="h-[10px] w-full"
        ></div>
      ) : size === "heading-two" ? (
        <div className="w-full h-[5px] flex items-center justify-center">
          <div
            style={{ "--tw-bg-opacity": 1, backgroundColor: color }}
            className="h-[10px] w-[20%]"
          ></div>
          <div
            style={{ "--tw-bg-opacity": 1, backgroundColor: color }}
            className="h-[2px] w-[80%]"
          ></div>
        </div>
      ) : (
        <div
          style={{ "--tw-bg-opacity": 1, backgroundColor: "white" }}
          className="h-[5px] w-full"
        ></div>
      );
    } else if (theme === 3) {
      return size === "heading-one" ? (
        <div
          style={{ "--tw-bg-opacity": 1, backgroundColor: color }}
          className="h-[10px] w-[20%]"
        ></div>
      ) : size === "heading-two" ? (
        <div
          style={{ "--tw-bg-opacity": 1, backgroundColor: color }}
          className="h-[5px] w-[20%]"
        ></div>
      ) : (
        <div
          style={{ "--tw-bg-opacity": 1, backgroundColor: "white" }}
          className="h-[5px] w-full"
        ></div>
      );
    } else if (theme === 4) {
      return size === "heading-one" ? (
        <div
          style={{ "--tw-bg-opacity": 1, backgroundColor: color }}
          className="h-[10px] w-[20%]"
        ></div>
      ) : size === "heading-two" ? (
        <div
          style={{ "--tw-bg-opacity": 1, backgroundColor: color }}
          className="h-[5px] w-[20%]"
        ></div>
      ) : (
        <div
          style={{ "--tw-bg-opacity": 1, backgroundColor: "white" }}
          className="h-[5px] w-full"
        ></div>
      );
    } else if (theme === 5) {
      return size === "heading-one" ? (
        <div
          style={{ "--tw-bg-opacity": 1, backgroundColor: color }}
          className="h-[8px] w-full"
        ></div>
      ) : size === "heading-two" ? (
        <div
          style={{ "--tw-bg-opacity": 1, backgroundColor: color }}
          className="h-[6px] w-full"
        ></div>
      ) : (
        <div
          style={{ "--tw-bg-opacity": 1, backgroundColor: "white" }}
          className="h-[5px] w-full"
        ></div>
      );
    } else if (theme === 0) {
      return <div></div>;
    }
  };
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [value, setValue] = useState(initialValue);
  const toolbarRef = useRef(null);
  const editorRef = useRef(null);
  const moveRef = useRef(null);
  const colorBtnRef = useRef(null);
  const colorRef = useRef(null);
  const alignBtnRef = useRef(null);
  const alignRef = useRef(null);
  const [selectedAlign, setSelectedAlign] = useState("left");
  const [openA, setOpenA] = useState(false);

  // Close menu when clicking outside
  const handleClickOutsideMenu = (event) => {
    if (
      colorBtnRef.current &&
      !colorBtnRef.current.contains(event.target) &&
      colorRef.current &&
      !colorRef.current.contains(event.target)
    ) {
      setOpen(false);
    }
  };

  const handleClickOutsideAlign = (event) => {
    if (
      alignBtnRef.current &&
      !alignBtnRef.current.contains(event.target) &&
      alignRef.current &&
      !alignRef.current.contains(event.target)
    ) {
      setOpenA(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideAlign);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideAlign);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideMenu);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideMenu);
    };
  }, []);

  const renderElement = useCallback(
    (props) => <Element {...props} size={size} />,
    [size]
  );
  const renderLeaf = useCallback(
    (props) => <Leaf {...props} size={size} />,
    [size]
  );

  const lightenColor = (hex, percent) => {
    // Remove "#" if present
    hex = hex.replace("#", "");

    // Convert hex to RGB values
    let num = parseInt(hex, 16);
    let r = (num >> 16) & 255;
    let g = (num >> 8) & 255;
    let b = num & 255;

    // Adjust each color channel toward 255 (white)
    r = Math.round(r + (255 - r) * percent);
    g = Math.round(g + (255 - g) * percent);
    b = Math.round(b + (255 - b) * percent);

    return `rgb(${r}, ${g}, ${b})`;
  };

  // ✅ Usage: Lighten #01070c by 50%
  const lighterColor = lightenColor("#01070c", 0.5);

  return (
    <div
      className={` relative z-10 w-[100%] py-0.5 mx-2 rounded  ${
        selected === index ? "mt-0.5" : "mt-0.5"
      }`}
      onFocus={() => setSelected(index)}
      onBlur={(e) => {
        // Prevent toolbar from hiding when interacting with the dropdowns
        if (
          toolbarRef.current &&
          toolbarRef.current.contains(e.relatedTarget)
        ) {
          e.preventDefault();
        } else {
          setIndexValue(null);
        }
      }}
      ref={editorRef}
    >
      <Slate
        editor={editor}
        initialValue={
          Array.isArray(data.content)
            ? data.content
            : preview
            ? []
            : initialValue
        }
        value={data}
        onChange={(newValue) => onChange(newValue)}
      >
        {index === selected && preview !== true && (
          <Toolbar
            className="absolute -top-11  left-[26%]  bg-white flex flex-row items-center justify-center border border-gray-100 shadow-md shadow-gray-300 rounded-md  px-1 py-1 "
            ref={toolbarRef}
            onFocus={() => setIndexValue(index)}
            onBlur={(e) => {
              if (
                editorRef.current &&
                editorRef.current.contains(e.relatedTarget)
              ) {
                e.preventDefault();
              } else {
                setIndexValue(null);
              }
            }}
          >
            {/* Heading Dropdown */}

            {/* Text Transform Dropdown */}

            <div className="relative my-[-3px] flex flex-row ">
              <select
                className="   rounded px-1 bg-white py-1 outline-none text-md  font-semibold text-lvl_2_txt"
                onChange={(e) => {
                  toggleBlock(editor, e.target.value);
                  onSizeChange(e.target.value);
                }}
                defaultValue={size}
              >
                <option className="" value="heading-one">
                  H1
                </option>
                <option value="heading-two">H2</option>
                <option value="heading-three">H3</option>
                <option value="heading-four">H4</option>
                <option value="heading-five">H5</option>
                <option value="heading-six">H6</option>
              </select>
              <div className="w-[1px] h-8 bg-gray-200 ml-1"></div>
              <select
                className="   bg-white  rounded px-1 py-1 ml-2 outline-none text-md text-gray-500"
                onChange={(e) => transformText(editor, e.target.value)}
                defaultValue=""
              >
                <option value="" disabled hidden>
                  Aa
                </option>
                <option value="uppercase">AA</option>
                <option value="lowercase">aa</option>
                <option value="capitalize">Aa</option>
              </select>
              <div className="w-[1px] h-8 bg-gray-200 ml-1"></div>
            </div>

            <Button
              onMouseDown={(e) => {
                e.preventDefault();
                toggleMark(editor, "bold");
              }}
              className="flex items-center justify-center  "
              active={isMarkActive(editor, "bold")}
            >
              <FaBold />
            </Button>
            <Button
              onMouseDown={(e) => {
                e.preventDefault();
                toggleMark(editor, "italic");
              }}
              className="flex items-center justify-center"
              active={isMarkActive(editor, "italic")}
            >
              <FaItalic />
            </Button>
            <Button
              onMouseDown={(e) => {
                e.preventDefault();
                toggleMark(editor, "underline");
              }}
              className="flex items-center justify-center pt-[3px]"
              active={isMarkActive(editor, "underline")}
            >
              <FaUnderline />
            </Button>
            <Button
              onMouseDown={(e) => {
                e.preventDefault();
                toggleMark(editor, "strikethrough");
              }}
              className="flex items-center justify-center"
              active={isMarkActive(editor, "strikethrough")}
            >
              <FaStrikethrough />
            </Button>
            <div className="w-[1px] h-8 bg-gray-200 ml-1"></div>
            <div
              ref={alignBtnRef}
              className="relative flex items-center justify-center gap-2  py-1"
            >
              {/* Selected align icon */}
              <button
                className="text-gray-700 text-xl"
                onClick={() => setOpenA((prev) => !prev)}
              >
                {alignments.find((a) => a.name === selectedAlign)?.icon}
              </button>
              <IoIosArrowDown
                onClick={() => setOpenA((prev) => !prev)}
                className="text-gray-500 text-sm  cursor-pointer"
              />

              {/* Dropdown options */}
              {openA && (
                <div
                  ref={alignRef}
                  className="absolute top-[75%] z-10 mt-2 bg-white border border-gray-200 rounded-sm p-2 shadow flex-col left-0"
                >
                  {alignments.map((align) => (
                    <button
                      key={align.name}
                      className={`text-gray-700 text-xl p-1 hover:bg-gray-100 flex items-center justify-center w-full ${
                        isAlignActive(editor, align.name)
                          ? "bg-gray-200 rounded"
                          : ""
                      }`}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        toggleAlign(editor, align.name);
                        setSelectedAlign(align.name);
                        setOpen(false);
                      }}
                    >
                      {align.icon}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </Toolbar>
        )}

        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Click to add heading"
          style={{
            "--tw-bg-opacity": 0.4,
            backgroundColor:
              settings.theme === 5
                ? lightenColor(settings.color, 0.8)
                : "transparent",
          }}
          className={` relative min-h-[20px] ${
            textColor ? textColor : "text-active_text"
          }   px-2 py-1 outline-none   font-${settings.heading} ${
            index === selected && preview !== true ? "none" : "none"
          }`}
          readOnly={preview}
        />
        {settings.theme !== 0 && (
          <div
            className={`absolute w-full h-[15px] px-2 ${
              settings.theme === 4 ? "top-0" : "-bottom-2"
            } left-0`}
          >
            {createBorder(settings.theme, settings.color)}
          </div>
        )}
      </Slate>
    </div>
  );
};

export default MyRichTextEditor;
