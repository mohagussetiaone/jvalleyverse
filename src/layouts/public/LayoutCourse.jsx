import { Outlet } from "react-router-dom";
import Navbar from "@layouts/Navbar";
import Sidebar from "@/layouts/Sidebar/SidebarCourse";

export default function LayoutCourse() {
  return (
    <div className="flex max-w-screen overflow-hidden ">
      <div className="w-full">
        <main>
          <Navbar />
          <div className="pt-[67px]">
            <div className="fixed top-[67px] bottom-0 left-0">
              <Sidebar />
            </div>
            <div className="xl:ml-[275px] min-h-full ">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
