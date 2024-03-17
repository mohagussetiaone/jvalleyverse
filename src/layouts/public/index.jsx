import { Outlet } from "react-router-dom";
import Navbar from "@layouts/Navbar";
// import Footer from "@components/Footer";

export default function Layout() {
  return (
    <div className="flex h-full max-w-screen">
      <div className="h-full w-full">
        <main className={`h-full flex-none transition-all`}>
          <div className="h-full overflow-x-hidden">
            <Navbar />
            <div className="pt-5s mx-auto mb-auto h-auto min-h-[70vh]">
              <Outlet />
            </div>
            {/* <Footer /> */}
          </div>
          <h4>Footer</h4>
        </main>
      </div>
    </div>
  );
}
