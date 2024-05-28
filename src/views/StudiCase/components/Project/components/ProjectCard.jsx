import { useState } from "react";
import { IoMdGitMerge } from "react-icons/io";
import { MdGridView } from "react-icons/md";
import ModalMenuProject from "./ModalMenuProject";
import { useNavigate } from "react-router-dom";

// Data Acak
const data = [
  {
    id: 1,
    title: "Dashboard Jajanian",
    image: "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["#photography", "#travel", "#winter"],
    chapter: 19,
    type: "Chapter",
    content: "Content of Chapter 1",
  },
  {
    id: 2,
    title: "Mountain Expedition",
    image: "https://plus.unsplash.com/premium_photo-1664201890375-f8fa405cdb7d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["#adventure", "#mountains", "#nature"],
    chapter: 12,
    category: "Frontend",
    content: "Content of Article 2",
  },
  {
    id: 3,
    title: "City Lights",
    image: "https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["#city", "#night", "#urban"],
    chapter: 8,
    category: "Backend",
    content: "Content of Blog 3",
  },
  {
    id: 4,
    title: "Forest Trails",
    image: "https://images.unsplash.com/photo-1556740714-a8395b3bf30f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["#forest", "#nature", "#hiking"],
    chapter: 6,
    category: "Database",
    content: "Content of Chapter 4",
  },
  {
    id: 5,
    title: "Desert Adventure",
    image: "https://images.unsplash.com/photo-1616077167599-cad3639f9cbd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["#desert", "#adventure", "#exploration"],
    chapter: 34,
    category: "UI/UX",
    content: "Content of Article 5",
  },
  {
    id: 6,
    title: "Coastal Views",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["#coast", "#beach", "#sunset"],
    chapter: 23,
    category: "Backend",
    content: "Content of Blog 6",
  },
  {
    id: 7,
    title: "Urban Exploration",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["#urban", "#exploration", "#nightlife"],
    chapter: 47,
    category: "Frontend",
    content: "Content of Chapter 7",
  },
  {
    id: 8,
    title: "Mountain Peaks",
    image: "https://images.unsplash.com/photo-1522198734915-76c764a8454d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["#mountains", "#peaks", "#adventure"],
    chapter: 32,
    category: "Desain",
    content: "Content of Article 8",
  },
  {
    id: 9,
    title: "Jungle Trek",
    image: "https://plus.unsplash.com/premium_photo-1661458140307-c9ea805a5f84?q=80&w=2060&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["#jungle", "#trek", "#adventure"],
    chapter: 12,
    category: "UI/UX",
    content: "Content of Blog 9",
  },
];

const ProjectCard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("Semua");
  const [showModalMenu, setShowModalMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const itemsPerPage = 6;

  const filteredData = data.filter((item) => (filterType === "Semua" || item.category === filterType) && item.title.toLowerCase().includes(searchTerm.toLowerCase()));

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

  const handleCardClick = (id) => {
    navigate(`/belajar/project/${id}`);
  };

  return (
    <>
      <div className="w-full h-full">
        <div className="bg-gray-200 px-2 md:px-8 py-4 md:py-6 xl:py-7">
          <div className="mb-4">
            <div className="flex justify-between">
              <div className="cursor-pointer xl:hidden" onClick={() => setShowModalMenu(!showModalMenu)}>
                <MdGridView className="text-gray-800 hover:text-black w-8 h-8" />
              </div>
              <input type="text" placeholder="Cari project..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="px-4 py-2 hidden md:block rounded bg-white text-black border border-gray-400" />
              <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="bg-white text-black border border-gray-400 cursor-pointer py-2 rounded mx-4">
                <option value="Semua">Semua</option>
                <option value="Database">Database</option>
                <option value="UI/UX">UI/UX</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
              </select>
            </div>
            <div className="flex justify-start">
              <input type="text" placeholder="Cari project..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="px-4 md:hidden py-2 rounded bg-white text-black border border-gray-400" />
            </div>
          </div>
          {filteredData && filteredData?.length === 0 ? (
            <div className="text-center text-brand-500 text-xl h-[325px] mt-24">Data Not Found</div>
          ) : (
            <div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 xl:gap-4">
                {currentData.map((item) => (
                  <div key={item.id} className="max-w-[300px] h-auto rounded overflow-hidden shadow-lg" onClick={() => handleCardClick(item.id)}>
                    <div className="w-full h-44 overflow-hidden">
                      <img className="w-full h-full object-cover" src={item.image} alt={item.title} />
                    </div>
                    <div className="flex flex-col px-2 pt-2">
                      <h3 className="font-bold text-start text-black text-xl mb-2">{item.title}</h3>
                      <button className="inline-flex gap-2 bg-blue-100 text-brand2 rounded-full px-4 py-1 text-sm font-semibold mr-2 mb-2 self-start">
                        <IoMdGitMerge className="w-5 h-5 mt-0.5" />
                        {item.chapter} Chapter
                      </button>
                    </div>
                    <div className="flex justify-start px-2 py-2">
                      {item.tags.map((tag, index) => (
                        <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-900 mr-2 mb-2">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-start text-black">Total Cards: {filteredData.length}</div>
              <div className="flex justify-center gap-3 items-center mt-4 mx-4">
                <div>
                  <button onClick={handlePrev} disabled={currentPage === 1} className={`px-4 py-2 border rounded ${currentPage === 1 ? "bg-gray-300" : "bg-brand2 text-white"}`}>
                    Prev
                  </button>
                </div>
                <div>
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button key={index + 1} onClick={() => handlePageClick(index + 1)} className={`px-4 py-2 border rounded-full mx-1 ${currentPage === index + 1 ? "bg-brand2 text-white" : "bg-gray-300"}`}>
                      {index + 1}
                    </button>
                  ))}
                </div>
                <div>
                  <button onClick={handleNext} disabled={currentPage === totalPages} className={`px-4 py-2 border rounded ${currentPage === totalPages ? "bg-gray-300" : "bg-brand2 text-white"}`}>
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {showModalMenu && <ModalMenuProject showModalMenu={showModalMenu} setShowModalMenu={() => setShowModalMenu(false)} />}
    </>
  );
};

export default ProjectCard;
