import { useState, useCallback } from "react";
import { IoMdGitMerge } from "react-icons/io";
import { MdGridView } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useDarkMode from "@/hooks/useDarkMode";
import ModalMenu from "../../ModalMenu";
import { handleGetProject } from "@/api/Project/ProjectApi";
import { handleGetCategoryProject } from "@/api/CategoryProject/CategoryProjectApi";
import { useTranslation } from "react-i18next";
import ErrorServer from "@/components/ErrorServer";
import SkeletonGrid from "@/components/loading/CardProductSkeleton";
import Pagination from "@/components/pagination/ReactPaginate";
import StarRating from "@/components/stars/StartRating";
import ImageNotAvailable from "@/assets/img/noimage.jpg";
import DataNotFound from "@/components/DataNotFound";
import Input from "@/components/input/Input";
import SelectInput from "@/components/input/SelectInput";

const toCamelCase = (str) => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

const ProjectCard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { darkMode } = useDarkMode();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("semua");
  const [showModalMenu, setShowModalMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Calculate average rating
  const calculateAverageRating = useCallback((reviews) => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviews.length;
  }, []);

  // GET ALL PROJECT
  const {
    error: errorProject,
    isPending: isPendingProject,
    data: dataProject,
  } = useQuery({
    queryKey: ["getProject"],
    queryFn: handleGetProject,
  });

  // GET ALL CATEGORY PROJECT
  const {
    error: errorCategoryProject,
    isPending: isPendingCategoryProject,
    data: dataCategoryProject,
  } = useQuery({
    queryKey: ["getCategoryProject"],
    queryFn: handleGetCategoryProject,
  });

  console.log("dataCategoryProject", dataCategoryProject);

  console.log("dataProject", dataProject);

  const categoryOptions = dataCategoryProject
    ? [
        { label: "Semua", value: "semua" },
        ...dataCategoryProject.map((item) => ({
          label: toCamelCase(item.category_name),
          value: item.category_name,
        })),
      ]
    : [{ label: "Semua", value: "semua" }];

  console.log("categoryOptions", categoryOptions);

  // FILTER DATA
  const filteredData =
    dataProject && dataProject?.filter((item) => (filterType === "semua" || item.category_project?.category_name === filterType) && item.project_published === true && item?.project_name?.toLowerCase().includes(searchTerm.toLowerCase()));

  // Total pages
  const totalPages = Math.ceil(filteredData?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  // Data setelah di filter
  const currentData = filteredData?.slice(startIndex, startIndex + itemsPerPage);
  3;
  console.log("currentData", currentData);

  // Handle pagination
  const handlePageClick = (page) => {
    setCurrentPage(page.selected + 1);
  };

  const handleCardClick = async (id) => {
    navigate(`/belajar/project/${id}`);
  };

  if (errorProject || errorCategoryProject) {
    return <ErrorServer />;
  }

  if (isPendingProject || isPendingCategoryProject) {
    return <SkeletonGrid />;
  }

  return (
    <>
      <div className="bg-gray-200 dark:bg-primaryDark p-3 md:p-6 pt-6">
        <div className="mb-4">
          <div className="flex justify-between">
            <div className="flex gap-2">
              <div className="cursor-pointer xl:hidden" onClick={() => setShowModalMenu(!showModalMenu)}>
                <MdGridView className="text-gray-800 dark:text-neutral-200 hover:text-black w-8 h-8" />
              </div>
              <Input
                placeholder={t("Cari project...")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white hidden md:block dark:bg-transparent text-black dark:text-neutral-200 focus:border-gray-500 dark:border-neutral-200"
              />
            </div>
            <SelectInput
              placeholder={t("Semua")}
              options={categoryOptions || []}
              value={categoryOptions?.find((option) => option.value === filterType)}
              onChange={(option) => setFilterType(option.value)}
              className="w-full"
              isClearable={false}
            />
          </div>
          <div className="flex justify-start">
            <Input
              placeholder={t("Cari projects...")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white md:hidden dark:bg-transparent text-black dark:text-neutral-200 focus:border-gray-500 dark:border-neutral-200"
            />
          </div>
        </div>
        {filteredData && filteredData?.length === 0 ? (
          <DataNotFound />
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 min-h-screen h-[100vh] mx-auto">
              {currentData &&
                currentData.map((item) => (
                  <div className="relative group cursor-pointer" key={item.id}>
                    <div
                      className={`max-w-[310px] absolute min-h-[245px] h-[245px] md:min-h-[320px] sm:h-[300px] md:h-[300px] transition rounded-lg opacity-0 -inset-1 bg-white dark:bg-gradient-to-r from-secondaryDark to-brand-500 blur duration-400 group-hover:opacity-100 group-hover:duration-200 z-0 ${
                        darkMode ? "group-hover:opacity-100" : ""
                      }`}
                    ></div>
                    <div className="relative max-w-[300px] min-h-[235px] sm:min-h-[295px] rounded-lg overflow-hidden shadow-lg z-10 bg-white dark:bg-black transition-colors duration-300" onClick={() => handleCardClick(item.id)}>
                      <div className="h-32 sm:h-40 md:h-44 overflow-hidden">
                        <img className="w-full h-full object-cover" src={item.project_img_url ? `${import.meta.env.VITE_CDN_GET_IMAGE}/jvalleyverseImg/${item.project_img_url}` : ImageNotAvailable} alt={item.project_name} />
                      </div>
                      <div className="flex flex-col px-2 pt-2">
                        <h3 className="font-bold text-start text-black dark:text-white text-sm md:text-md xl:text-lg mb-2">{item.project_name}</h3>
                        <div className="flex justify-between">
                          <button className="inline-flex gap-2 bg-blue-100 text-primaryDark rounded-full px-4 text-sm font-semibold mr-2 self-start">
                            <IoMdGitMerge className="w-5 h-5 mt-0.5" />
                            {item?.chapter_detail?.length} Chapter
                          </button>
                          <div className="flex items-center">
                            <StarRating rating={Math.round(calculateAverageRating(item.review_user || []))} />
                            <span className="ml-2 text-sm dark:text-neutral-200">{calculateAverageRating(item.review_user || []).toFixed(1)} / 5</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap justify-start px-2 py-0 md:py-2">
                        {item.tags &&
                          item.tags.length > 0 &&
                          item.tags.map((tag, index) => (
                            <span key={index} className="inline-block bg-gray-200 dark:bg-black/40 rounded-full px-1 md:px-2 md:py-1 py-0 text-xs md:text-sm font-semibold text-gray-900 dark:text-neutral-200 mr-2 mb-1 md:mb-2">
                              #{tag}
                            </span>
                          ))}
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            <div className="pt-2 md:pt-14 text-start text-sm text-black dark:text-gray-300">Total Cards: {filteredData?.length}</div>
            <div className="flex justify-center items-center my-4">
              <Pagination totalPages={totalPages} handlePageClick={handlePageClick} />
            </div>
          </>
        )}
      </div>
      {showModalMenu && <ModalMenu showModalMenu={showModalMenu} setShowModalMenu={() => setShowModalMenu(false)} />}
    </>
  );
};

export default ProjectCard;
