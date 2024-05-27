import { Outlet } from "react-router-dom";
import Navbar from "@layouts/Navbar";
import SidebarCourseDetail from "@/layouts/Sidebar/SidebarCourseDetail";

export default function LayoutCourseDetail() {
  return (
    <div className="flex overflow-hidden">
      <div className="w-full">
        <main>
          <Navbar />
          <div className="pt-[67px]">
            <div className="fixed top-[67px] bottom-0 left-0">
              <SidebarCourseDetail />
            </div>
            <div className="flex xl:ml-[300px] min-h-full bg-gray-200">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
