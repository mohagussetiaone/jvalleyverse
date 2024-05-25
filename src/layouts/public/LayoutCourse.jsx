import { Outlet } from "react-router-dom";
import Navbar from "@layouts/Navbar";
import Sidebar from "@/layouts/Sidebar/SidebarCourse";

export default function Layout() {
  return (
    <div className="flex h-full max-w-screen">
      <div className="h-full w-full">
        <main className={`h-full flex-none transition-all`}>
          <div className="h-full overflow-x-hidden">
            <Navbar />
            <div className="pt-[67px] mx-auto mb-auto h-auto w-full">
              <div className="flex">
                <div>
                  <Sidebar />
                </div>
                <div>
                  <Outlet />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
