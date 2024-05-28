import { Outlet } from "react-router-dom";
import NavbarCourse from "@layouts/Navbar/NavbarCourse";
import SidebarCourseDetail from "@/layouts/Sidebar/SidebarCourseDetail";

export default function LayoutCourseDetail() {
  return (
    <div className="flex overflow-hidden">
      <div className="w-full">
        <main>
          <NavbarCourse />
          <div className="pt-[67px]">
            <div className="fixed top-[67px] bottom-0 left-0">
              <SidebarCourseDetail />
            </div>
            <div className="flex xl:ml-[300px] bg-gray-200 pt-5s mx-auto mb-auto h-auto min-h-[70vh]">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
