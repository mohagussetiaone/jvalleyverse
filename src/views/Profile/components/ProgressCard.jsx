import { useState } from "react";
import { MdGridView } from "react-icons/md";
import ModalMenuProgress from "./ModalMenuProgress";
import { useNavigate } from "react-router-dom";
import useDarkMode from "@/hooks/useDarkMode";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import Loading from "@/components/Loading";
import ErrorServer from "@/components/ErrorServer";
import { useCheckSession } from "@/api/Auth/CheckSession";
import { handleGetEnrollments } from "@/api/Enrollments/EnrollmentProject";
import { calculateEnrollmentProgress } from "@/utils/calculateProgress";
import Pagination from "@/components/pagination/ReactPaginate";

const ProgressCard = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("Semua");
  const [showModalMenu, setShowModalMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();
  const itemsPerPage = 6;

  // GET SESSION
  const {
    isLoading: isLoadingSession,
    error: errorSession,
    data: dataSession,
  } = useQuery({
    queryKey: ["getSession"],
    queryFn: useCheckSession,
  });

  console.log("dataSession", dataSession);

  const {
    isLoading: isLoadingEnrollment,
    error: errorEnrollment,
    data: dataEnrollment,
  } = useQuery({
    queryKey: ["getEnrollment"],
    queryFn: () => handleGetEnrollments(dataSession?.session?.user?.id),
    enabled: !!dataSession?.session?.user?.id,
  });

  if (isLoadingSession || isLoadingEnrollment) return <Loading />;
  if (errorSession || errorEnrollment) return <ErrorServer />;

  console.log("dataEnrollment", dataEnrollment);

  const filteredData = dataEnrollment?.filter((item) => (filterType === "Semua" || item?.project?.category_project?.category_name === filterType) && item?.project?.project_name?.toLowerCase().includes(searchTerm.toLowerCase()));

  console.log("filteredData", filteredData);

  const totalPages = Math.ceil(filteredData?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData?.slice(startIndex, startIndex + itemsPerPage);

  const handlePageClick = (page) => {
    setCurrentPage(page.selected + 1);
  };

  const handleCardClick = (id) => {
    navigate(`/belajar/project/${id}`);
  };

  const progress = calculateEnrollmentProgress(dataEnrollment && dataEnrollment?.project?.chapters);
  console.log("progress card", progress);

  return (
    <>
      <div className="w-[100vw] px-4 md:pl-10 xl:pr-14 bg-white dark:bg-primaryDark">
        <div className="py-4">
          <div className="mb-4">
            <div className="flex justify-start py-4">
              <h3 className="text-2xl text-left text-black dark:text-neutral-200 font-bold">{t("Progress belajar saya")}</h3>
            </div>
            <div className="flex justify-between mb-4 md:mb-0">
              <div className="flex gap-4">
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
              </div>
              <div className="ml-4 md:ml-0">
                <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="bg-white text-black border border-gray-400 cursor-pointer p-2 rounded dark:bg-transparent dark:text-white">
                  <option value="Semua">{t("Semua")}</option>
                  <option value="figma">Figma</option>
                  <option value="ui/ux">UI/UX</option>
                  <option value="frontend">Frontend</option>
                  <option value="backend">Backend</option>
                  <option value="fullstack">Fullstack</option>
                </select>
              </div>
            </div>
            <div className="flex  justify-start">
              <input
                type="text"
                placeholder={t("Cari project...")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 md:hidden py-2 rounded bg-white text-black dark:bg-transparent dark:text-neutral-200 border border-gray-400"
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
                      className={`absolute transition rounded-lg opacity-0 -inset-1 bg-white dark:bg-gradient-to-r from-brand-900 to-brand-500 blur duration-400 group-hover:opacity-100 group-hover:duration-200 z-0 ${
                        darkMode ? "group-hover:opacity-100" : ""
                      }`}
                    ></div>
                    <div className="relative max-w-[350px] h-auto rounded-lg overflow-hidden shadow-lg z-10 bg-white dark:bg-black transition-colors duration-300" onClick={() => handleCardClick(item.project_id)}>
                      <div className="h-32 sm:h-40 md:h-44 overflow-hidden">
                        <img className="w-full h-full object-cover" src={`${import.meta.env.VITE_CDN_GET_IMAGE}/jvalleyverseImg/${item.project.project_img_url}`} alt={item.project.project_name} />
                      </div>
                      <div className="flex flex-col px-2 pt-2">
                        <h3 className="font-bold text-start text-black dark:text-white text-base xl:text-xl mb-2">{item.project.project_name}</h3>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${calculateEnrollmentProgress(item.project.chapters)}%` }}></div>
                        </div>
                        <div className="text-start">
                          <span className="text-start text-black dark:text-gray-300 text-sm">Progress: {calculateEnrollmentProgress(item.project.chapters)}%</span>
                        </div>
                        <div className="py-4 text-start">
                          {calculateEnrollmentProgress(item.project.chapters) === 100 ? (
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
              <div className="flex justify-center items-center py-4">
                <Pagination totalPages={totalPages} handlePageClick={handlePageClick} />
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
