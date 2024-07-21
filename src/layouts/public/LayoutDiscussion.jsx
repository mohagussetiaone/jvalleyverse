import { Outlet } from "react-router-dom";
import Navbar from "@/layouts/Navbar/NavbarCourse";
import Sidebar from "@/layouts/Sidebar/SidebarDiscussion";

export default function LayoutDiscussion() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <div className="w-full">
        <main>
          <Navbar />
          <div className="pt-[55px]">
            <div className="fixed top-[55px] bottom-0 left-0">
              <Sidebar />
            </div>
            <div className="xl:ml-[200px] bg-gray-200 mx-auto mb-auto h-full min-h-[90vh]">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
