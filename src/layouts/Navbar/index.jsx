import { useState } from "react";
import { Menu, MenuItem, NavbarItem } from "@/components/ui/navbar-menu";
import { cn } from "@/utils/cn";
import { Link } from "react-router-dom";
import logoJv from "@/assets/logo/logojv.png";
import logoDark from "@/assets/logo/logo-dark.png";
import logoSmallDark from "@/assets/logo/logosmalldark.png";
import { RxHamburgerMenu } from "react-icons/rx";
import { LuMoon, LuSun } from "react-icons/lu";
import uiuxImg from "@/assets/navbar/uiux.png";
import frontEndImg from "@/assets/navbar/frontend.jpeg";
import backEndImg from "@/assets/navbar/backend.png";
import databaseImg from "@/assets/navbar/database.jpg";
import certificateImg from "@/assets/navbar/certificate.jpg";
import showCaseImg from "@/assets/navbar/showcase.jpg";
import telegramImg from "@/assets/navbar/telegram.jpeg";
import stuckImg from "@/assets/navbar/erorr.png";
import ModalMainMenu from "@/components/ModalMainMenu";
import useDarkMode from "@/hooks/useDarkMode";
import useStudyActive from "@/hooks/useStudyActive";
import { useNavigate } from "react-router-dom";
import DropdownUser from "./DropdownUser";

export default function NavbarDemo() {
  return (
    <>
      <Navbar />
    </>
  );
}

function Navbar(className) {
  const navigate = useNavigate();
  const [active, setActive] = useState(null);
  const [showModalMainMenu, setShowModalMainMenu] = useState(false);
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { setStudyActive } = useStudyActive();

  return (
    <>
      <nav className={cn("fixed left-0 w-full px-4 md:px-8 xl:px-10 bg-white dark:bg-gradient-to-r from-black/90 to-brand2 z-30 border-b border-brand-500 dark:border-brand2", className)}>
        <Menu setActive={setActive} className="w-full ">
          <div className="flex mx-auto justify-between">
            <div className="justify-end md:flex">
              <Link to="/" className="hidden md:block">
                <img src={darkMode ? logoDark : logoJv} alt="logoJv.png" className="h-10" />
              </Link>
              <Link to="/" className="block md:hidden">
                <img src={logoSmallDark} alt="logoJv.png" className="h-12 w-auto" />
              </Link>
            </div>
            <div className="gap-4 items-center hidden xl:flex">
              <Link to="/belajar" className="text-black font-normal dark:text-neutral-200 hover:text-black">
                Belajar
              </Link>
              <MenuItem setActive={setActive} active={active} item="Jalur belajar" className="cursor-pointer">
                <div className="text-sm grid grid-cols-2 gap-10 p-4">
                  <NavbarItem
                    title="UI/UX Design"
                    onClick={(data) => {
                      navigate("/jalur-belajar", { data });
                      setStudyActive(0);
                    }}
                    src={uiuxImg}
                    description="Maksimalkan kepuasan pengguna dengan desain yang intuitif dan menarik."
                  />
                  <NavbarItem
                    title="Database"
                    onClick={(data) => {
                      navigate("/jalur-belajar", { data });
                      setStudyActive(1);
                    }}
                    src={databaseImg}
                    description="Mengelola dan pembaruan data dengan efisien, serta menjaga keamanan dan integritasnya."
                  />
                  <NavbarItem
                    title="Backend Developer"
                    onClick={(data) => {
                      navigate("/jalur-belajar", { data });
                      setStudyActive(2);
                    }}
                    src={backEndImg}
                    description="Membangun infrastruktur server, database, dan logika bisnis kinerja dan keamanan sistem"
                  />
                  <NavbarItem
                    title="Frontend Developer"
                    onClick={(data) => {
                      navigate("/jalur-belajar", { data });
                      setStudyActive(3);
                    }}
                    src={frontEndImg}
                    description="Mentransformasi desain UI/UX menjadi web yang interaktif dan responsif dengan efisien."
                  />
                </div>
                <Link to="/jalur-belajar" className="flex justify-center py-2">
                  <span className="text-brand2 dark:text-gray-100 font-bold cursor-pointer">Lihat selengkapnya</span>
                </Link>
              </MenuItem>

              <MenuItem setActive={setActive} active={active} item="Explore">
                <div className="text-sm grid grid-cols-2 gap-10 p-4">
                  <NavbarItem title="Cek Sertifikat" href="https://algochurn.com" src={certificateImg} description="Maksimalkan kepuasan pengguna dengan desain yang intuitif dan menarik." />
                  <NavbarItem title="Show Case" href="https://tailwindmasterkit.com" src={showCaseImg} description="Mentransformasi desain UI/UX menjadi web yang interaktif dan responsif dengan efisien." />
                  <NavbarItem title="Grup Telegram" href="https://gomoonbeam.com" src={telegramImg} description="Membangun infrastruktur server, database, dan logika bisnis kinerja dan keamanan sistem" />
                  <NavbarItem title="Stuck Erorr" href="https://userogue.com" src={stuckImg} description="Mengelola dan pembaruan data dengan efisien, serta menjaga keamanan dan integritasnya." />
                </div>
                <Link to="/jalur-belajar" className="flex justify-center py-2">
                  <span className="text-brand2 dark:text-gray-100 font-bold cursor-pointer">Lihat selengkapnya</span>
                </Link>
              </MenuItem>
              <Link to={"/tentang"} className="text-black font-normal dark:text-neutral-200 hover:text-black">
                Tentang
              </Link>
            </div>
            <div className="flex gap-3">
              <span className="cursor-pointer">
                {darkMode ? <LuSun className="mt-1.5 w-8 h-8 text-gray-800 dark:text-white" onClick={toggleDarkMode} /> : <LuMoon className="mt-1.5 w-8 h-8 text-gray-800 dark:text-white" onClick={toggleDarkMode} />}
              </span>
              <div className="flex xl:hidden">
                <button className="px-3 bg-white dark:bg-brand2 border border-gray-300 active:border-none dark:border-none" onClick={() => setShowModalMainMenu(true)}>
                  <RxHamburgerMenu className="w-7 h-7 text-black dark:text-neutral-200" />
                  <p className="sr-only">Menu</p>
                </button>
              </div>
              <div className="gap-2 hidden md:flex">
                <Link to="/signin" className=" md:mt-1">
                  <button className="btn border bg-white text-brand-500 hover:bg-gray-100 py-1 px-3">Masuk</button>
                </Link>
                <Link to="/signup" className="md:mt-1">
                  <button className="btn text-white bg-brand-500 hover:bg-brand-800 hover:border-brand-800 py-1 px-3">Daftar</button>
                </Link>
              </div>
              <DropdownUser />
            </div>
          </div>
        </Menu>
      </nav>
      {showModalMainMenu && <ModalMainMenu showModalMainMenu={showModalMainMenu} setShowModalMainMenu={() => setShowModalMainMenu(!showModalMainMenu)} />}
    </>
  );
}
