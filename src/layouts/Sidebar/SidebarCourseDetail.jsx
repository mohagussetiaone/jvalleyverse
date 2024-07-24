import { MdMenu, MdClose } from "react-icons/md";
import ListModuleCourse from "@/views/StudiCase/components/ListModuleCourse";
import useSidebar from "@/hooks/useSidebar";
import { useTranslation } from "react-i18next";

const SidebarCourseDetail = () => {
  const { collapsed, setMenuCollapsed } = useSidebar();
  const { t } = useTranslation();

  const toggleSidebar = () => {
    setMenuCollapsed(!collapsed);
  };

  return (
    <>
      <aside className={`hidden xl:block fixed top-4 left-4 xl:static z-40 w-[300px] h-full bg-gray-50 dark:bg-black/95 transition-transform transform ${collapsed ? "translate-x-0" : "-translate-x-[295px]"}`}>
        <div className="h-full flex flex-col px-3 py-4">
          <div className="relative z-50">
            <div className="flex px-2 pb-5 items-center justify-between">
              <div>
                <h3 className="text-black dark:text-neutral-200 text-xl font-bold">{t("Daftar Module")}</h3>
              </div>
              <div>
                <button onClick={toggleSidebar} className="bg-white dark:bg-black p-2 rounded-lg">
                  {collapsed ? (
                    <MdClose size={24} className="text-red-500 hover:border-none" />
                  ) : (
                    <div className="absolute top-0 -right-16 px-4 py-2 bg-white dark:bg-black/80 rounded-r-full">
                      <MdMenu size={24} className="text-black dark:text-neutral-200 " />
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
          <hr className="py-1" />
          <ListModuleCourse />
        </div>
      </aside>
      {!collapsed && (
        <button onClick={toggleSidebar} className="fixed top-4 right-4 bg-white p-2 rounded-lg z-50">
          {collapsed ? <MdClose size={24} className="text-red-500" /> : <MdMenu size={24} className="text-blue-500 bg-brand2" />}
        </button>
      )}
    </>
  );
};

export default SidebarCourseDetail;
