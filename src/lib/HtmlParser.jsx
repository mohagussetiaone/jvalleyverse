import { useState } from "react";
import parse from "html-react-parser";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark, prism } from "react-syntax-highlighter/dist/esm/styles/prism";
import hljs from "highlight.js";
import useDarkMode from "@/hooks/useDarkMode";

// Fungsi untuk mengekstrak teks dari anak elemen DOM
const extractText = (children) => {
  return children
    .map((child) => {
      if (child.type === "text") {
        return child.data;
      } else if (child.children && child.children.length > 0) {
        return extractText(child.children);
      }
      return "";
    })
    .join("");
};

// Komponen CodeBlock dengan fitur copy
const CodeBlock = ({ code }) => {
  const { darkMode } = useDarkMode();
  const detectedLanguage = hljs.highlightAuto(code).language || "text";
  const themeStyle = darkMode ? a11yDark : prism;

  const [copyStatus, setCopyStatus] = useState("Salin kode");

  // Fungsi untuk menyalin kode ke clipboard
  const handleCopyClick = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code).then(() => {
      setCopyStatus("Disalin!");
      setTimeout(() => setCopyStatus("Salin kode"), 2000);
    });
  };

  return (
    <div style={{ position: "relative" }}>
      {/* Tombol Copy */}
      <button
        onClick={handleCopyClick}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          backgroundColor: darkMode ? "#333" : "#dcdcdc",
          border: "none",
          padding: "5px 10px",
          cursor: "pointer",
          borderRadius: "5px",
          fontSize: "12px",
          color: darkMode ? "#f5f5f5" : "#333",
        }}
      >
        {copyStatus}
      </button>

      {/* Highlighter untuk kode */}
      <SyntaxHighlighter language={detectedLanguage} style={themeStyle} showLineNumbers>
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

// Komponen HtmlParser
const HtmlParser = ({ htmlString }) => {
  const options = {
    replace: (domNode) => {
      if (domNode.name === "pre" && domNode.attribs.class === "ql-syntax") {
        const codeContent = extractText(domNode.children);
        return <CodeBlock code={codeContent} />;
      }
    },
  };

  return <div>{parse(htmlString, options)}</div>;
};

export default HtmlParser;
