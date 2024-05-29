import { useState } from "react";
import { Menu, MenuItem, ProductItem } from "@/components/ui/navbar-menu";
import { cn } from "@/utils/cn";
import { Link } from "react-router-dom";
import logoJv from "@/assets/logo/logojv.png";
import { MdGridView } from "react-icons/md";
import { LuMoon, LuSun } from "react-icons/lu";
import uiuxImg from "@/assets/navbar/uiux.png";
import frontEndImg from "@/assets/navbar/frontend.jpeg";
import backEndImg from "@/assets/navbar/backend.png";
import databaseImg from "@/assets/navbar/database.jpg";
import certificateImg from "@/assets/navbar/certificate.jpg";
import showCaseImg from "@/assets/navbar/showcase.jpg";
import telegramImg from "@/assets/navbar/telegram.jpeg";
import stuckImg from "@/assets/navbar/erorr.png";
import ModalMenuModule from "@/views/StudiCase/components/Project/components/ModalMenuModule";
import useDarkMode from "@/hooks/useDarkMode";
import { LuLogOut } from "react-icons/lu";

const NavbarCourse = (className) => {
  const [active, setActive] = useState(null);
  const [showModalMenu, setShowModalMenu] = useState(false);
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <>
      <nav className={cn("fixed left-0 w-full px-2 md:px-14 bg-white dark:bg-gradient-to-r from-black/90 to-brand2 z-30", className)}>
        <Menu setActive={setActive} className="w-full bg-[#11090E]">
          <div className="flex mx-auto justify-between">
            <div className="justify-end hidden md:flex">
              <Link to="/">
                <img src={logoJv} alt="logoJv.png" className="h-10" />
              </Link>
            </div>
            <div className="flex md:hidden">
              <button className="px-3 bg-white border border-gray-300" onClick={() => setShowModalMenu(true)}>
                <MdGridView className="w-7 h-7 text-black" />
                <p className="sr-only">Menu</p>
              </button>
            </div>
            <div className="gap-4 items-center hidden md:flex">
              <MenuItem setActive={setActive} active={active} item="Jalur belajar">
                <div className="text-sm grid grid-cols-2 gap-10 p-4">
                  <ProductItem title="UI/UX Design" href="https://algochurn.com" src={uiuxImg} description="Maksimalkan kepuasan pengguna dengan desain yang intuitif dan menarik." />
                  <ProductItem title="Frontend Developer" href="https://tailwindmasterkit.com" src={frontEndImg} description="Mentransformasi desain UI/UX menjadi web yang interaktif dan responsif dengan efisien." />
                  <ProductItem title="Backend Developer" href="https://gomoonbeam.com" src={backEndImg} description="Membangun infrastruktur server, database, dan logika bisnis kinerja dan keamanan sistem" />
                  <ProductItem title="Database" href="https://userogue.com" src={databaseImg} description="Mengelola dan pembaruan data dengan efisien, serta menjaga keamanan dan integritasnya." />
                </div>
                <Link to="/jalur-belajar" className="flex justify-center py-2">
                  <span className="text-brand2 font-bold cursor-pointer">Lihat selengkapnya</span>
                </Link>
              </MenuItem>
              <Link to="/belajar" className="text-black font-normal dark:text-neutral-200 hover:text-black">
                Belajar
              </Link>
              <MenuItem setActive={setActive} active={active} item="Explore">
                <div className="text-sm grid grid-cols-2 gap-10 p-4">
                  <ProductItem title="Cek Sertifikat" href="https://algochurn.com" src={certificateImg} description="Maksimalkan kepuasan pengguna dengan desain yang intuitif dan menarik." />
                  <ProductItem title="Show Case" href="https://tailwindmasterkit.com" src={showCaseImg} description="Mentransformasi desain UI/UX menjadi web yang interaktif dan responsif dengan efisien." />
                  <ProductItem title="Grup Telegram" href="https://gomoonbeam.com" src={telegramImg} description="Membangun infrastruktur server, database, dan logika bisnis kinerja dan keamanan sistem" />
                  <ProductItem title="Stuck Erorr" href="https://userogue.com" src={stuckImg} description="Mengelola dan pembaruan data dengan efisien, serta menjaga keamanan dan integritasnya." />
                </div>
                <Link to="/jalur-belajar" className="flex justify-center py-2">
                  <span className="text-brand2 font-bold cursor-pointer">Lihat selengkapnya</span>
                </Link>
              </MenuItem>
              <Link to={"/tentang"} className="text-black font-normal dark:text-neutral-200 hover:text-black">
                Tentang
              </Link>
            </div>
            <div className="flex gap-3">
              <Link to="/belajar" className="flex md:hidden gap-1.5 mr-1 items-center bg-white text-black">
                <LuLogOut className="text-black" />
                Back To Course
              </Link>
              <span className="cursor-pointer">
                {darkMode ? <LuSun className="mt-1.5 w-8 h-8 text-gray-800 dark:text-white" onClick={toggleDarkMode} /> : <LuMoon className="mt-1.5 w-8 h-8 text-gray-800 dark:text-white" onClick={toggleDarkMode} />}
              </span>
              <div className="flex gap-2">
                <Link to="/signin" className="hidden md:block md:mt-1">
                  <button className="btn border bg-white text-brand-500 border-brand-500 hover:border-brand-700 hover:bg-gray-100 py-1 px-3">Masuk</button>
                </Link>
                <Link to="/signup" className="hidden md:block md:mt-1">
                  <button className="btn text-white bg-brand-500 hover:bg-brand-800 hover:border-brand-800 py-1 px-3">Daftar</button>
                </Link>
              </div>
            </div>
          </div>
        </Menu>
      </nav>
      {showModalMenu && <ModalMenuModule showModalMenu={showModalMenu} setShowModalMenu={() => setShowModalMenu(!showModalMenu)} />}
    </>
  );
};

export default NavbarCourse;
