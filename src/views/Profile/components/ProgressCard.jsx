import { useState } from "react";
import { MdGridView } from "react-icons/md";
import ModalMenuProgress from "./ModalMenuProgress";
import { useNavigate } from "react-router-dom";
import useDarkMode from "@/hooks/useDarkMode";
import { useTranslation } from "react-i18next";

// Data Acak
const data = [
  {
    id: 1,
    title: "Dashboard Jajanian",
    image: "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["#photography", "#travel", "#winter"],
    progress: 25,
    isComplete: false,
    type: "Chapter",
    content: "Content of Chapter 1",
  },
  {
    id: 2,
    title: "Mountain Expedition",
    image: "https://plus.unsplash.com/premium_photo-1664201890375-f8fa405cdb7d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["#adventure", "#mountains", "#nature"],
    progress: 20,
    isComplete: true,
    category: "Frontend",
    content: "Content of Article 2",
  },
  {
    id: 3,
    title: "City Lights",
    image: "https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["#city", "#night", "#urban"],
    progress: 18,
    isComplete: false,
    category: "Backend",
    content: "Content of Blog 3",
  },
  {
    id: 4,
    title: "Forest Trails",
    image: "https://images.unsplash.com/photo-1556740714-a8395b3bf30f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["#forest", "#nature", "#hiking"],
    progress: 60,
    isComplete: false,
    category: "Database",
    content: "Content of Chapter 4",
  },
  {
    id: 5,
    title: "Desert Adventure",
    image: "https://images.unsplash.com/photo-1616077167599-cad3639f9cbd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["#desert", "#adventure", "#exploration"],
    progress: 34,
    isComplete: true,
    category: "UI/UX",
    content: "Content of Article 5",
  },
  {
    id: 6,
    title: "Coastal Views",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["#coast", "#beach", "#sunset"],
    progress: 45,
    isComplete: false,
    category: "Backend",
    content: "Content of Blog 6",
  },
  {
    id: 7,
    title: "Urban Exploration",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["#urban", "#exploration", "#nightlife"],
    progress: 47,
    isComplete: false,
    category: "Frontend",
    content: "Content of Chapter 7",
  },
  {
    id: 8,
    title: "Mountain Peaks",
    image: "https://images.unsplash.com/photo-1522198734915-76c764a8454d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["#mountains", "#peaks", "#adventure"],
    progress: 24,
    isComplete: false,
    category: "Desain",
    content: "Content of Article 8",
  },
  {
    id: 9,
    title: "Jungle Trek",
    image: "https://plus.unsplash.com/premium_photo-1661458140307-c9ea805a5f84?q=80&w=2060&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["#jungle", "#trek", "#adventure"],
    progress: 62,
    isComplete: true,
    category: "UI/UX",
    content: "Content of Blog 9",
  },
];

const ProgressCard = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("Semua");
  const [showModalMenu, setShowModalMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();
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
      <div className="w-[100vw] px-4 md:pl-10 xl:pr-14 bg-gray-200 dark:bg-gradient-to-r from-black via-background-900 to-background-700">
        <div className="py-4">
          <div className="mb-4">
            <div className="flex justify-start py-4">
              <h3 className="text-2xl text-left text-black dark:text-neutral-200 font-bold">{t("Progress belajar saya")}</h3>
            </div>
            <div className="flex justify-between mb-4 md:mb-0">
              <div className="cursor-pointer xl:hidden" onClick={() => setShowModalMenu(!showModalMenu)}>
                <MdGridView className="text-gray-800 hover:text-black w-8 h-8" />
              </div>
              <input
                type="text"
                placeholder={t("Cari progress berjalan...")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 hidden md:block rounded bg-white text-black border border-gray-400 dark:bg-transparent dark:text-neutral-200 mb-6"
              />
              <div>
                <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="bg-white text-black border border-gray-400 cursor-pointer p-2 rounded dark:bg-transparent dark:text-white">
                  <option value="Semua">{t("Semua")}</option>
                  <option value="Database">Database</option>
                  <option value="UI/UX">UI/UX</option>
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                </select>
              </div>
            </div>
            <div className="flex  justify-start">
              <input
                type="text"
                placeholder={t("Cari project...")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 md:hidden py-2 rounded bg-white text-black dark:bg-background-500 dark:text-neutral-200 border border-gray-400"
              />
            </div>
          </div>
          {filteredData && filteredData?.length === 0 ? (
            <div className="text-center text-neutral-200 text-xl h-[325px] mt-24">{t("Data tidak ditemukan")}</div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 xl:gap-4">
                {currentData.map((item) => (
                  <div className="relative group cursor-pointer" key={item.id}>
                    <div
                      className={`absolute transition rounded-lg opacity-0 -inset-1 bg-white dark:bg-gradient-to-r from-purple-700 to-brand-500 blur duration-400 group-hover:opacity-100 group-hover:duration-200 z-0 ${
                        darkMode ? "group-hover:opacity-100" : ""
                      }`}
                    ></div>
                    <div className="relative max-w-[350px] h-auto rounded-lg overflow-hidden shadow-lg z-10 bg-white dark:bg-slate-800 transition-colors duration-300" onClick={() => handleCardClick(item.id)}>
                      <div className="h-28 md:h-32 xl:h-44 overflow-hidden">
                        <img className="w-full h-full object-cover" src={item.image} alt={item.title} />
                      </div>
                      <div className="flex flex-col px-2 pt-2">
                        <h3 className="font-bold text-start text-black dark:text-white text-base xl:text-xl mb-2">{item.title}</h3>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${item.progress}%` }}></div>
                        </div>
                        <div className="text-start">
                          <span className="text-start text-black dark:text-gray-300 text-sm">
                            Progress: {item.progress}% {t("Selesai")}
                          </span>
                        </div>
                        <div className="py-4 text-start">
                          {item.isComplete === true ? (
                            <span className="bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-green-600">{t("Selesai")}</span>
                          ) : (
                            <span className="bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-blue-600">{t("Lanjutkan")}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-start text-black dark:text-gray-300">Total Cards: {filteredData.length}</div>
              <div className="flex justify-center gap-3 items-center mt-4 mx-4">
                <div>
                  <button onClick={handlePrev} disabled={currentPage === 1} className={`px-4 py-2 border rounded cursor-pointer ${currentPage === 1 ? "bg-gray-500 dark:bg-background-500" : "bg-brand-500 dark:bg-blue-700 text-white"}`}>
                    Prev
                  </button>
                </div>
                <div>
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => handlePageClick(index + 1)}
                      className={`px-4 py-2 border rounded-full mx-1 ${currentPage === index + 1 ? "bg-brand-500 dark:bg-blue-700 text-white" : "bg-gray-500 dark:bg-background-500"}`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
                <div>
                  <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 border rounded cursor-pointer ${currentPage === totalPages ? "bg-gray-500 dark:bg-background-500" : "bg-brand-500 dark:bg-blue-700 text-white"}`}
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {showModalMenu && <ModalMenuProgress showModalMenu={showModalMenu} setShowModalMenu={() => setShowModalMenu(false)} />}
    </>
  );
};

export default ProgressCard;
