import { useState } from "react";
import { MdMenu, MdClose } from "react-icons/md";
import ListModuleCourse from "../../views/StudiCase/components/ListModuleCourse";

const SidebarCourseDetail = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <aside className={`hidden xl:block fixed top-4 left-4 xl:static z-40 w-[300px] h-full bg-gray-50 dark:bg-gray-800 transition-transform transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-[295px]"}`}>
        <div className="h-full flex flex-col px-3 py-4">
          <div className="relative z-50">
            <div className="flex px-2 pb-5 items-center justify-between">
              <div>
                <h3 className="text-black text-xl font-bold">Daftar Module</h3>
              </div>
              <div>
                <button onClick={toggleSidebar} className="bg-white p-2 rounded-lg">
                  {isSidebarOpen ? (
                    <MdClose size={24} className="text-red-500 hover:border-none" />
                  ) : (
                    <div className="absolute top-0 -right-16 px-4 py-2 bg-white rounded-r-full">
                      <MdMenu size={24} className="text-black  " />
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
      {!isSidebarOpen && (
        <button onClick={toggleSidebar} className="fixed top-4 right-4 bg-white p-2 rounded-lg z-50">
          {isSidebarOpen ? <MdClose size={24} className="text-red-500" /> : <MdMenu size={24} className="text-blue-500 bg-brand2" />}
        </button>
      )}
    </>
  );
};

export default SidebarCourseDetail;
