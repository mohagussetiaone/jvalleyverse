import { useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import hljs from "highlight.js";
import "highlight.js/styles/default.css";
import toast from "react-hot-toast";

hljs.configure({
  languages: ["javascript", "python", "ruby", "java", "cpp", "css", "html", "json", "markdown", "sql", "bash", "go", "kotlin", "php", "typescript", "c", "c#", "c++", "rust", "swift", "scala", "shell"],
});

const CustomToolbar = () => (
  <div id="toolbar">
    <select className="ql-header" defaultValue="" onChange={(e) => e.persist()}>
      <option value="1"></option>
      <option value="2"></option>
      <option selected></option>
    </select>
    <select className="ql-font" defaultValue="" onChange={(e) => e.persist()}>
      <option></option>
      <option value="serif"></option>
      <option value="monospace"></option>
    </select>
    <select className="ql-size" defaultValue="normal">
      <option value="small"></option>
      <option value="large"></option>
      <option value="huge"></option>
      <option selected></option>
    </select>
    <select className="ql-align" defaultValue="" onChange={(e) => e.persist()}>
      <option selected></option>
      <option value="center"></option>
      <option value="right"></option>
      <option value="justify"></option>
    </select>
    <button className="ql-bold"></button>
    <button className="ql-italic"></button>
    <button className="ql-underline"></button>
    <button className="ql-strike"></button>
    <button className="ql-code-block"></button>
  </div>
);

const modules = {
  toolbar: {
    container: "#toolbar",
  },
  syntax: {
    highlight: (text) => hljs.highlightAuto(text).value,
  },
};

const formats = ["header", "font", "size", "align", "bold", "italic", "underline", "strike", "code-block"];

const ReactQuillProvider = ({ value, onChange, showCreateDiscussion, setShowCreateDiscussion, ...props }) => {
  const quillRef = useRef(null);

  useEffect(() => {
    if (quillRef.current) {
      const editor = quillRef.current.getEditor();
      const editorContainer = editor.root;
      editorContainer.style.height = "200px"; // Mengatur tinggi default editor
      editor.focus(); // Fokus pada editor saat komponen di-render
    }
  }, [value]);

  const handleSave = () => {
    setShowCreateDiscussion(false);
    toast.success("Pertanyaan Berhasil disimpan");
  };

  return (
    <>
      <div className="w-full h-full py-3">
        <div>
          <CustomToolbar />
          <ReactQuill ref={quillRef} theme="snow" value={value} onChange={onChange} modules={modules} formats={formats} {...props} />
        </div>
        <div className="flex justify-end mt-4 mb-6">
          <button className="bg-brand-500 hover:bg-brand-700 text-white font-bold py-2 px-4 rounded" onClick={handleSave}>
            Simpan
          </button>
        </div>
      </div>
    </>
  );
};

export default ReactQuillProvider;
