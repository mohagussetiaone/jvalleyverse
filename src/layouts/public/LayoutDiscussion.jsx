import { Outlet } from "react-router-dom";
import Navbar from "@/layouts/Navbar/NavbarCourse";
import Sidebar from "@/layouts/Sidebar/SidebarDiscussion";

export default function LayoutDiscussion() {
  return (
    <div className="flex max-w-screen overflow-hidden">
      <div className="w-full">
        <main>
          <Navbar />
          <div className="pt-[67px]">
            <div className="fixed top-[67px] bottom-0 left-0">
              <Sidebar />
            </div>
            <div className="xl:ml-[200px] bg-gray-200 pt-5s mx-auto mb-auto h-auto min-h-[90vh]">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
