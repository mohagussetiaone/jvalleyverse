import parse from "html-react-parser";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula, prism } from "react-syntax-highlighter/dist/esm/styles/prism";
import hljs from "highlight.js";
import useDarkMode from "@/hooks/useDarkMode";

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

const CodeBlock = ({ code }) => {
  const { darkMode } = useDarkMode();
  const detectedLanguage = hljs.highlightAuto(code).language || "text";
  const themeStyle = darkMode ? dracula : prism;

  return (
    <SyntaxHighlighter language={detectedLanguage} style={themeStyle} showLineNumbers>
      {code}
    </SyntaxHighlighter>
  );
};

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
