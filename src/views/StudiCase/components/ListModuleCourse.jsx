import { useState, useEffect } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import useActiveMenu from "@/hooks/useActiveMenu";
import { Link, useParams } from "react-router-dom";
import { handleGetProjectDetail, handleGetChapterByProjectId } from "@/api/Project/ProjectApi";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ErrorServer from "@/components/ErrorServer";
import Loading from "@/components/Loading";
import useChapterProject from "@/hooks/useChapterProject";
import { useTranslation } from "react-i18next";
import SidebarSkeleton from "@/components/loading/SidebarSkeleton";

const ListModuleCourse = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const { activeMenu, setActiveMenu } = useActiveMenu();
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const { projectId } = useParams();
  const { setDataChapters } = useChapterProject();

  const {
    error: errorProjectDetail,
    isPending: isPendingProjectDetail,
    data: dataProjectDetails,
  } = useQuery({
    queryKey: ["getProjectDetail"],
    queryFn: () => handleGetProjectDetail(projectId),
    enabled: !!projectId,
  });

  const {
    error: errorChapterProjects,
    isPending: isPendingChapterProjects,
    data: dataChapterProjects,
  } = useQuery({
    queryKey: ["getChapterProjectById"],
    queryFn: () => handleGetChapterByProjectId(dataProjectDetails?.id),
    enabled: !!dataProjectDetails?.id,
  });

  useEffect(() => {
    if (projectId) {
      queryClient.invalidateQueries(["getProjectDetail"]);
    } else if (dataProjectDetails) {
      queryClient.invalidateQueries(["getChapterProjectById"]);
    }
    if (dataChapterProjects) {
      setDataChapters(dataChapterProjects);
    }
  }, [dataChapterProjects, setDataChapters, dataProjectDetails, projectId]);

  if (errorProjectDetail || errorChapterProjects) {
    return <ErrorServer />;
  }

  if (isPendingProjectDetail || isPendingChapterProjects) {
    return <SidebarSkeleton />;
  }

  const handleClick = (menuId) => {
    if (activeMenu === menuId) {
      setActiveMenu(null);
      setActiveSubMenu(null);
    } else {
      setActiveMenu(menuId);
      setActiveSubMenu(menuId);
    }
  };

  const handleSubMenuClick = (subMenuId) => {
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
                    className={`flex items-center justify-between p-2 rounded-lg ${
                      activeMenu === item.id
                        ? "bg-gray-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-black dark:text-gray-200 dark:hover:text-white hover:bg-gray-300 hover:text-black"
                        : "text-black dark:text-neutral-200 bg-white dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-white hover:bg-gray-100 hover:text-gray-900"
                    }`}
                    onClick={() => handleClick(item.id)}
                  >
                    <div className="flex items-center">
                      {index + 1}.<span className="ms-3">{item.chapter_name}</span>
                    </div>
                    {item.chapter_detail && (
                      <div className="flex items-center">
                        <span className="text-xs">{item.chapter_detail.length} Step</span>
                        <MdKeyboardArrowRight className={`transition-transform ${activeSubMenu === item.id ? "rotate-90" : ""}`} />
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
                              activeSubMenu === chapter_detail.id
                                ? "bg-gray-200 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-black dark:text-gray-200 dark:hover:text-white hover:bg-gray-300 hover:text-black"
                                : "hover:text-black text-black dark:text-white dark:hover:text-white"
                            }`}
                            onClick={() => handleSubMenuClick(chapter_detail.id)}
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
