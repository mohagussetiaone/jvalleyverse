import { Outlet } from "react-router-dom";
import Navbar from "@/layouts/Navbar";
import Footer from "@/layouts/Footer";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen h-full w-full">
      <Navbar />
      <div className="block">
        <main className="h-full">
          <div className="pt-[60px] h-full">
            <Outlet />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
