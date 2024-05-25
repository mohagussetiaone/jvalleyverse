import { useState } from "react";
import { FiBookOpen } from "react-icons/fi";

// Data Acak
const data = [
  {
    id: 1,
    title: "Dashboard Jajanian",
    image: "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["#photography", "#travel", "#winter"],
    type: "Chapter",
    content: "Content of Chapter 1",
  },
  {
    id: 2,
    title: "Mountain Expedition",
    image: "https://plus.unsplash.com/premium_photo-1664201890375-f8fa405cdb7d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["#adventure", "#mountains", "#nature"],
    type: "Article",
    content: "Content of Article 2",
  },
  {
    id: 3,
    title: "City Lights",
    image: "https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["#city", "#night", "#urban"],
    type: "Blog",
    content: "Content of Blog 3",
  },
  {
    id: 4,
    title: "Forest Trails",
    image: "https://images.unsplash.com/photo-1556740714-a8395b3bf30f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["#forest", "#nature", "#hiking"],
    type: "Chapter",
    content: "Content of Chapter 4",
  },
  {
    id: 5,
    title: "Desert Adventure",
    image: "https://images.unsplash.com/photo-1616077167599-cad3639f9cbd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["#desert", "#adventure", "#exploration"],
    type: "Article",
    content: "Content of Article 5",
  },
  {
    id: 6,
    title: "Coastal Views",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["#coast", "#beach", "#sunset"],
    type: "Blog",
    content: "Content of Blog 6",
  },
  {
    id: 7,
    title: "Urban Exploration",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["#urban", "#exploration", "#nightlife"],
    type: "Chapter",
    content: "Content of Chapter 7",
  },
  {
    id: 8,
    title: "Mountain Peaks",
    image: "https://images.unsplash.com/photo-1522198734915-76c764a8454d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["#mountains", "#peaks", "#adventure"],
    type: "Article",
    content: "Content of Article 8",
  },
  {
    id: 9,
    title: "Jungle Trek",
    image: "https://plus.unsplash.com/premium_photo-1661458140307-c9ea805a5f84?q=80&w=2060&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["#jungle", "#trek", "#adventure"],
    type: "Blog",
    content: "Content of Blog 9",
  },
];

const StudyCase = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const filteredData = data.filter((item) => (filterType === "All" || item.type === filterType) && item.title.toLowerCase().includes(searchTerm.toLowerCase()));

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <div className="w-[calc(100%-290px)] bg-white h-screen px-4 md:px-6 py-6 overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="px-4 py-2 rounded bg-white text-black border border-gray-400" />
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="bg-white text-black border border-gray-400 cursor-pointer px-4 py-2 rounded">
            <option value="All">All</option>
            <option value="Chapter">Chapter</option>
            <option value="Article">Article</option>
            <option value="Blog">Blog</option>
          </select>
        </div>
        {filteredData.length === 0 ? (
          <div className="text-center text-red-500 text-xl mt-4">Data Not Found</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {currentData.map((item) => (
              <div key={item.id} className="max-w-[300px] h-auto rounded overflow-hidden shadow-lg">
                <div className="w-full h-48 overflow-hidden">
                  <img className="w-full h-full object-cover" src={item.image} alt={item.title} />
                </div>
                <div className="flex flex-col px-2 pt-2">
                  <h3 className="font-bold text-start text-black text-xl mb-2">{item.title}</h3>
                  <button className="inline-flex gap-2 bg-blue-100 text-brand2 rounded-full px-4 py-1 text-sm font-semibold mr-2 mb-2 self-start">
                    <FiBookOpen className="w-5 h-5 mt-0.5" />
                    {item.type}
                  </button>
                </div>
                <div className="px-2 py-2">
                  <p className="overflow-auto max-h-24">{item.content}</p>
                  {item.tags.map((tag, index) => (
                    <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-900 mr-2 mb-2">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-between items-center mt-4">
          <button onClick={handlePrev} disabled={currentPage === 1} className={`px-4 py-2 border rounded ${currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"}`}>
            Prev
          </button>
          <div>
            {Array.from({ length: totalPages }, (_, index) => (
              <button key={index + 1} onClick={() => handlePageClick(index + 1)} className={`px-4 py-2 border rounded mx-1 ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-300"}`}>
                {index + 1}
              </button>
            ))}
          </div>
          <button onClick={handleNext} disabled={currentPage === totalPages} className={`px-4 py-2 border rounded ${currentPage === totalPages ? "bg-gray-300" : "bg-blue-500 text-white"}`}>
            Next
          </button>
        </div>
        <div className="mt-4 text-center">Total Cards: {filteredData.length}</div>
      </div>
    </>
  );
};

export default StudyCase;
