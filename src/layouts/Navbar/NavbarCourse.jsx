import { useState } from "react";
import { Menu, MenuItem, NavbarItem, NavbarExplore } from "@/components/ui/navbar-menu";
import { cn } from "@/utils/cn";
import { Link } from "react-router-dom";
import logoJv from "@/assets/logo/logojv.png";
import logoJvDark from "@/assets/logo/logo-dark.png";
import logoSmallDark from "@/assets/logo/logosmalldark.png";
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
import { useNavigate } from "react-router-dom";
import useStudyActive from "@/hooks/useStudyActive";
import useActiveMenu from "@/hooks/useActiveMenu";

const NavbarCourse = (className) => {
  const navigate = useNavigate();
  const [active, setActive] = useState(null);
  const [showModalMenu, setShowModalMenu] = useState(false);
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { setStudyActive } = useStudyActive();
  const { setActiveMenu } = useActiveMenu();

  return (
    <>
      <nav className={cn("fixed left-0 w-full px-2 md:px-6 bg-white dark:bg-gradient-to-r from-black/90 to-brand2 z-30", className)}>
        <Menu setActive={setActive} className="w-full bg-[#11090E]">
          <div className="flex mx-auto justify-between">
            <Link to="/" className="hidden xl:flex">
              <img src={darkMode ? logoJvDark : logoJv} alt="logoJv.png" className="h-10" />
            </Link>
            <Link to="/" className="hidden md:flex xl:hidden">
              <img src={logoSmallDark} alt="logoJv.png" className="h-10" />
            </Link>
            <div className="flex md:hidden">
              <button className="px-3 bg-white dark:bg-black/70" onClick={() => setShowModalMenu(true)}>
                <MdGridView className="w-7 h-7 text-black dark:text-neutral-200" />
                <p className="sr-only">Menu</p>
              </button>
            </div>
            <div className="gap-4 items-center hidden xl:flex">
              <Link to="/belajar/project" className="text-black font-normal dark:text-neutral-200 hover:text-black">
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
                  <NavbarExplore
                    title="Cek Sertifikat"
                    onClick={(data) => {
                      navigate("/profile", { data });
                      setActiveMenu(1);
                    }}
                    src={certificateImg}
                    description="Dapatkan sertifikat yang menunjukkan keahlianmu"
                  />
                  <NavbarExplore
                    title="Show Case"
                    onClick={(data) => {
                      navigate("/profile", { data });
                      setActiveMenu(2);
                    }}
                    src={showCaseImg}
                    description="Pamerkan project portofoliomu ke publik"
                  />
                  <NavbarExplore title="Grup Telegram" onClick={() => window.open("https://t.me/jvalleyverse")} src={telegramImg} description="Jadi bagian dari Jvalleyverse dan berkontribusi" />
                  <NavbarExplore
                    title="Stuck Erorrs"
                    onClick={() => {
                      navigate("/belajar/diskusi");
                    }}
                    src={stuckImg}
                    description="Tanyakan masalahmu di sini dalam forum diskusi"
                  />
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
              <Link to="/belajar/project" className="flex md:hidden gap-1.5 mr-1 items-center bg-white dark:bg-black/30 rounded-lg px-2 py-1 text-black dark:text-neutral-200 border border-gray-900">
                <LuLogOut className="text-black dark:text-neutral-200" />
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
