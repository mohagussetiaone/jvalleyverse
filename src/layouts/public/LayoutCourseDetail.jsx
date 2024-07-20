import { Outlet } from "react-router-dom";
import NavbarCourse from "@layouts/Navbar/NavbarCourse";
import SidebarCourseDetail from "@/layouts/Sidebar/SidebarCourseDetail";
import useSidebar from "@/hooks/useSidebar";

export default function LayoutCourseDetail() {
  const { collapsed } = useSidebar();

  return (
    <div className="flex flex-col min-h-screen w-full">
      <div className="w-full">
        <main>
          <NavbarCourse />
          <div className="pt-[60px]">
            <div className="fixed top-[60px] bottom-0 left-0">
              <SidebarCourseDetail />
            </div>
            <div className={`flex ${collapsed ? "xl:ml-[300px]" : "xl:ml-[0px]"} mx-auto mb-auto h-auto min-h-[70vh]`}>
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
