import { Outlet } from "react-router-dom";
import Navbar from "@layouts/Navbar";
import Footer from "@layouts/Footer";

export default function Layout() {
  return (
    <div className="flex h-full max-w-screen">
      <div className="h-full w-full">
        <main className={`h-full flex-none transition-all`}>
          <div className="h-full overflow-x-hidden">
            <Navbar />
            <div className="pt-[70px] mx-auto mb-auto h-auto w-full">
              <Outlet />
            </div>
            <div>
              <Footer />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
