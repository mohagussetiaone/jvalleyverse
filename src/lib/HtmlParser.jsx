import parse from "html-react-parser";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css"; // Pilih gaya mode gelap untuk highlight.js

const CodeBlock = ({ code }) => {
  // Sorot kode menggunakan hljs
  const highlightedCode = hljs.highlightAuto(code).value;

  return (
    <div className="bg-gray-900 text-gray-100 border border-gray-700 rounded-lg p-4 mb-4 overflow-x-auto">
      <pre className="bg-gray-900 text-gray-100 p-4">
        <code dangerouslySetInnerHTML={{ __html: highlightedCode }} className="font-mono" />
      </pre>
    </div>
  );
};

const HtmlParser = ({ htmlString }) => {
  const options = {
    replace: (domNode) => {
      if (domNode.name === "pre" && domNode.children[0].name === "code") {
        // Ambil teks kode dari domNode
        const codeContent = domNode.children[0].children.map((child) => child.data).join("");
        return <CodeBlock code={codeContent} />;
      }
    },
  };

  return <div>{parse(htmlString, options)}</div>;
};

export default HtmlParser;
