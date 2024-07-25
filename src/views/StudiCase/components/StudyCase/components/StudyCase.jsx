import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { MdGridView } from "react-icons/md";
import ModalMenu from "../../ModalMenu";
import useDarkMode from "@/hooks/useDarkMode";
import { useNavigate } from "react-router-dom";
import { handleGetStudyCase } from "@/api/StudyCase/StudyCaseApi";
import ErrorServer from "@/components/ErrorServer";
import profileDefault from "@/assets/profile/profileDefault.jpg";
import SkeletonGrid from "@/components/loading/CardProductSkeleton";

const StudyCase = () => {
  const itemsPerPage = 6;
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("Semua");
  const [showModalMenu, setShowModalMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    error: errorStudyCase,
    isPending: isPendingStudyCase,
    data: dataStudyCase,
  } = useQuery({
    queryKey: ["getStudyCase"],
    queryFn: handleGetStudyCase,
  });

  if (isPendingStudyCase) {
    return <SkeletonGrid />;
  }

  if (errorStudyCase) {
    return <ErrorServer />;
  }

  console.log("data StudyCase", dataStudyCase);
  console.log("image", `${import.meta.env.VITE_CDN_GET_IMAGE}/jvalleyverseImg/${dataStudyCase.img_url}`);

  const filteredData =
    dataStudyCase.length > 0 && dataStudyCase?.filter((item) => (filterType === "Semua" || item.category_project.category_name === filterType) && item.is_published === true && item.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData && filteredData?.slice(startIndex, startIndex + itemsPerPage);

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
    navigate(`/belajar/studi-kasus/${id}`);
  };

  return (
    <>
      <div className="bg-gray-200 dark:bg-background-900 p-3 md:p-6">
        <div className="mb-4">
          <div className="flex justify-between pt-4">
            <div className="cursor-pointer xl:hidden" onClick={() => setShowModalMenu(!showModalMenu)}>
              <MdGridView className="text-gray-800 dark:text-neutral-200 hover:text-black w-8 h-8" />
            </div>
            <input
              type="text"
              placeholder="Cari studi kasus..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 hidden md:flex rounded bg-white text-black border border-gray-400 dark:bg-transparent dark:text-neutral-200"
            />
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="bg-white text-black border border-gray-400 cursor-pointer p-2 rounded dark:bg-transparent dark:text-white">
              <option value="Semua">Semua</option>
              <option value="database">Database</option>
              <option value="ui/ux">UI/UX</option>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="fullstack">Fullstack</option>
            </select>
          </div>
          <div className="flex justify-start">
            <input
              type="text"
              placeholder="Cari project..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 md:hidden py-2 rounded bg-white dark:bg-transparent text-black dark:text-neutral-200 border border-gray-400"
            />
          </div>
        </div>
        {filteredData && filteredData?.length === 0 ? (
          <div className="text-center text-brand-500 text-xl h-[100vh] mt-24">Data Not Found</div>
        ) : (
          <div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 min-h-screen h-[100vh] mx-auto">
              {currentData &&
                currentData.map((item) => (
                  <div className="relative group cursor-pointer" key={item.id} onClick={() => handleCardClick(item.id)}>
                    <div
                      className={`absolute min-h-[240px] h-[240px] md:min-h-[305px] sm:h-[300px] md:h-[300px] transition rounded-lg opacity-0 -inset-1 bg-white dark:bg-gradient-to-r from-purple-700 to-brand-500 blur duration-400 group-hover:opacity-100 group-hover:duration-200 z-0 ${
                        darkMode ? "group-hover:opacity-100" : ""
                      }`}
                    ></div>
                    <div className="relative max-w-[300px] min-h-[235px] sm:min-h-[295px] rounded-lg overflow-hidden shadow-lg z-10 bg-white dark:bg-slate-800 transition-colors duration-300">
                      <div className="h-28 md:h-32 xl:h-44 overflow-hidden">
                        <img className="w-full h-full object-cover" src={item.img_url ? `${import.meta.env.VITE_CDN_GET_IMAGE}/jvalleyverseImg/${item.img_url}` : profileDefault} alt={item.title} />
                      </div>
                      <div className="flex flex-col px-2 pt-2">
                        <h3 className="font-bold text-start text-black dark:text-white text-base md:text-md xl:text-xl mb-2">{item.title}</h3>
                        <h3 className="text-start text-black dark:text-white text-xs md:text-md mb-2">{item.description}</h3>
                      </div>
                      <div className="flex flex-wrap justify-start px-2 py-0 md:py-2">
                        {item.tags.map((tag, index) => (
                          <span key={index} className="inline-block bg-gray-200 dark:bg-black/40 rounded-full px-1 md:px-2 md:py-1 py-0 text-xs md:text-sm font-semibold text-gray-900 dark:text-neutral-200 mr-2 mb-1 md:mb-2">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className="pt-2 md:pt-14 text-start text-sm text-black dark:text-gray-300">Total Cards: {filteredData.length}</div>
            <div className="flex justify-center gap-3 items-center my-4 mx-4">
              <div>
                <button
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 border rounded cursor-pointer ${currentPage === 1 ? "bg-gray-500 dark:bg-background-500 dark:text-white" : "bg-brand-500 dark:bg-blue-700 text-white"}`}
                >
                  Prev
                </button>
              </div>
              <div>
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => handlePageClick(index + 1)}
                    className={`px-4 py-2 border rounded-full mx-1 ${currentPage === index + 1 ? "bg-brand-500 dark:bg-blue-700 text-white" : "bg-gray-500 dark:bg-background-500 dark:text-white"}`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              <div>
                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 border rounded cursor-pointer ${currentPage === totalPages ? "bg-gray-500 dark:bg-background-500 dark:text-white" : "bg-brand-500 dark:bg-blue-700 text-white"}`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {showModalMenu && <ModalMenu showModalMenu={showModalMenu} setShowModalMenu={() => setShowModalMenu(false)} />}
    </>
  );
};

export default StudyCase;
