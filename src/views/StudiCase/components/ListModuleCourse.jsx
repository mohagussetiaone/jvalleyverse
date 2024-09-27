import { useState, useEffect } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import useActiveMenu from "@/hooks/useActiveMenu";
import { Link, useParams } from "react-router-dom";
import { handleGetProjectDetail, handleGetChapterByProjectId } from "@/api/Project/ProjectApi";
import { useQuery } from "@tanstack/react-query";
import ErrorServer from "@/components/ErrorServer";
import useChapterProject from "@/hooks/useChapterProject";
import { useTranslation } from "react-i18next";
import SidebarSkeleton from "@/components/loading/SidebarSkeleton";

const ListModuleCourse = () => {
  const { t } = useTranslation();
  const { activeMenu, setActiveMenu } = useActiveMenu();
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const { projectId, chapterId } = useParams();
  const { setDataChapters } = useChapterProject();

  const {
    error: errorProjectDetail,
    isPending: isPendingProjectDetail,
    data: dataProjectDetails,
  } = useQuery({
    queryKey: ["getProjectDetail", projectId],
    queryFn: () => handleGetProjectDetail(projectId),
    enabled: !!projectId,
  });

  const {
    error: errorChapterProjects,
    isPending: isPendingChapterProjects,
    data: dataChapterProjects,
  } = useQuery({
    queryKey: ["getChapterProjectById", dataProjectDetails?.id],
    queryFn: () => handleGetChapterByProjectId(dataProjectDetails?.id),
    enabled: !!dataProjectDetails?.id,
  });

  console.log("chapterId", chapterId);
  console.log("dataChapterProjects", dataChapterProjects);

  useEffect(() => {
    if (dataChapterProjects) {
      // Check if chapterId matches any chapter_detail.id to set active menu and submenu
      const activeChapter = dataChapterProjects.find((item) => item.chapter_detail.some((detail) => detail.id.toString() === chapterId));

      setDataChapters(dataChapterProjects);
      console.log("activeChapter", activeChapter);

      if (activeChapter) {
        setActiveMenu(activeChapter.id); // Open the parent menu
        setActiveSubMenu(chapterId); // Set the active submenu
      }
    }
  }, [dataChapterProjects, chapterId, setActiveMenu, setActiveSubMenu, setDataChapters]);

  if (errorProjectDetail || errorChapterProjects) {
    return <ErrorServer />;
  }

  if (isPendingProjectDetail || isPendingChapterProjects) {
    return <SidebarSkeleton />;
  }

  const handleClick = (menuId) => {
    // Mengubah logika untuk handleClick hanya mengatur activeMenu
    if (activeMenu === menuId) {
      setActiveMenu(null); // Menutup parent menu jika diklik ulang
    } else {
      setActiveMenu(menuId); // Membuka parent menu baru
    }
  };

  const handleSubMenuClick = (subMenuId) => {
    // Mengubah hanya activeSubMenu, tanpa menutup parent menu
    setActiveSubMenu(subMenuId === activeSubMenu ? null : subMenuId);
  };

  return (
    <>
      <div className="overflow-y-auto flex-grow">
        <ul className="space-y-2 font-medium">
          {dataChapterProjects &&
            dataChapterProjects.map((item, index) => (
              <li key={item.id}>
                <div>
                  <a
                    className={`flex items-center cursor-pointer justify-between p-2 rounded-lg ${
                      activeMenu === item.id
                        ? "bg-gray-200 dark:bg-secondaryDark/40 dark:hover:bg-secondaryDark text-black dark:text-gray-200 dark:hover:text-white hover:bg-gray-300 hover:text-black"
                        : "text-black dark:text-neutral-200 bg-white dark:bg-secondaryDark/40 dark:hover:bg-secondaryDark dark:hover:text-white hover:bg-gray-100 hover:text-gray-900"
                    }`}
                    onClick={() => handleClick(item.id)}
                  >
                    <div className="flex items-center">
                      {index + 1}.<span className="ms-3">{item.chapter_name}</span>
                    </div>
                    {item.chapter_detail && (
                      <div className="flex items-center">
                        <span className="text-xs">{item.chapter_detail.length} Step</span>
                        <MdKeyboardArrowRight className={`transition-transform ${activeMenu === item.id ? "rotate-90" : ""}`} />
                      </div>
                    )}
                  </a>
                  {activeMenu === item.id && item.chapter_detail && (
                    <ul className="pl-4 py-2 space-y-1 transition-all duration-300 ease-in-out">
                      {item.chapter_detail.map((chapter_detail) => (
                        <li key={chapter_detail.id}>
                          <Link
                            to={`belajar/project/${item.project_id}/chapter/${chapter_detail.id}`}
                            className={`flex items-center p-2 rounded-lg ${
                              activeSubMenu === chapter_detail.id || chapter_detail.id.toString() === chapterId
                                ? "bg-gray-200 dark:bg-secondaryDark dark:hover:bg-secondaryDark text-black dark:text-gray-200 dark:hover:text-white hover:bg-gray-300 hover:text-black"
                                : "hover:text-black text-black dark:text-white dark:hover:text-white"
                            }`}
                            onClick={() => handleSubMenuClick(chapter_detail.id, item.id)}
                          >
                            <span className="w-2 h-2 bg-gray-600 rounded-full mr-3"></span>
                            <h4 className="text-start text-sm justify-start">{chapter_detail.chapter_detail_name}</h4>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          {dataChapterProjects && dataChapterProjects.length === 0 && <div className="text-gray-700 dark:text-neutral-200">{t("Belum ada modul")}</div>}
        </ul>
      </div>
    </>
  );
};

export default ListModuleCourse;
