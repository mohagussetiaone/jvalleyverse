import { Outlet } from "react-router-dom";
import Navbar from "@/layouts/Navbar";
import Sidebar from "@/layouts/Sidebar/SidebarCourse";

export default function LayoutCourse() {
  return (
    <div className="flex flex-col">
      <div className="h-full w-full">
        <main>
          <Navbar />
          <div className="pt-[67px]">
            <div className="fixed top-[67px] bottom-0 left-0">
              <Sidebar />
            </div>
            <div className="xl:ml-[275px] min-h-full h-full">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
