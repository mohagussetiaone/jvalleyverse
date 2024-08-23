import { useState } from "react";
import { cn } from "@/utils/cn";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import logoJv from "@/assets/logo/logojv.png";
import logoJvDark from "@/assets/logo/logo-dark.png";
// import logoSmallDark from "@/assets/logo/logosmalldark.png";
import { MdGridView } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { LuMoon, LuSun, LuLogOut } from "react-icons/lu";
// Img
import uiuxImg from "@/assets/navbar/uiux.png";
import frontEndImg from "@/assets/navbar/frontend.jpeg";
import backEndImg from "@/assets/navbar/backend.png";
import databaseImg from "@/assets/navbar/database.jpg";
import certificateImg from "@/assets/navbar/certificate.jpg";
import showCaseImg from "@/assets/navbar/showcase.jpg";
import telegramImg from "@/assets/navbar/telegram.jpeg";
import stuckImg from "@/assets/navbar/erorr.png";
// Modal
import ModalMenuModule from "@/views/StudiCase/components/Project/components/ModalMenuModule";
import { Menu, MenuItem, NavbarItem, NavbarExplore } from "@/components/ui/navbar-menu";
// Hooks
import useDarkMode from "@/hooks/useDarkMode";
import useStudyActive from "@/hooks/useStudyActive";
import useActiveMenu from "@/hooks/useActiveMenu";
import { useCheckSession } from "@/api/Auth/CheckSession";
// Component
import Language from "@/components/Language";
import DropdownUser from "./DropdownUser";

const NavbarCourse = (className) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [active, setActive] = useState(null);
  const [showModalMenu, setShowModalMenu] = useState(false);
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { setStudyActive } = useStudyActive();
  const { setActiveMenu } = useActiveMenu();

  const { data: sessionData } = useQuery({
    queryKey: ["checkSession"],
    queryFn: useCheckSession,
  });

  return (
    <>
      <nav className={cn("fixed left-0 w-full px-4 bg-white dark:bg-gradient-to-r from-black to-background-500 md:px-8 xl:px-10 z-30 border-b border-brand-500 dark:border-background-500", className)}>
        <Menu setActive={setActive} className="w-full bg-[#11090E]">
          <div className="flex mx-auto justify-between">
            <Link to="/" className="hidden xl:flex">
              <img src={darkMode ? logoJvDark : logoJv} alt="logoJv.png" className="h-10" />
            </Link>
            {/* <Link to="/" className="hidden md:flex xl:hidden">
              <img src={logoSmallDark} alt="logoJv.png" className="h-10" />
            </Link> */}
            <div className="flex xl:hidden">
              <button className="px-3 bg-white dark:bg-black/70" onClick={() => setShowModalMenu(true)}>
                <MdGridView className="w-7 h-7 text-black dark:text-neutral-200" />
                <p className="sr-only">Menu</p>
              </button>
            </div>
            <div className="gap-4 items-center hidden xl:flex">
              <Link to="/belajar/project" className="text-black font-normal dark:text-neutral-200 hover:text-black">
                {t("Belajar")}
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
                    description={t("Maksimalkan kepuasan pengguna dengan desain yang intuitif dan menarik.")}
                  />
                  <NavbarItem
                    title="Database"
                    onClick={(data) => {
                      navigate("/jalur-belajar", { data });
                      setStudyActive(1);
                    }}
                    src={databaseImg}
                    description={t("Mengelola dan pembaruan data dengan efisien, serta menjaga keamanan dan integritasnya.")}
                  />
                  <NavbarItem
                    title="Backend Developer"
                    onClick={(data) => {
                      navigate("/jalur-belajar", { data });
                      setStudyActive(2);
                    }}
                    src={backEndImg}
                    description={t("Membangun infrastruktur server, database, dan logika bisnis kinerja dan keamanan sistem")}
                  />
                  <NavbarItem
                    title="Frontend Developer"
                    onClick={(data) => {
                      navigate("/jalur-belajar", { data });
                      setStudyActive(3);
                    }}
                    src={frontEndImg}
                    description={t("Mentransformasi desain UI/UX menjadi web yang interaktif dan responsif dengan efisien.")}
                  />
                </div>
                <Link to="/jalur-belajar" className="flex justify-center py-2">
                  <span className="text-background-500 dark:text-gray-100 font-bold cursor-pointer">{t("Lihat selengkapnya")}</span>
                </Link>
              </MenuItem>

              <MenuItem setActive={setActive} active={active} item="Explore">
                <div className="text-sm grid grid-cols-2 gap-10 p-4">
                  <NavbarExplore
                    title={t("Cek Sertifikat")}
                    onClick={(data) => {
                      navigate("/profile", { data });
                      setActiveMenu(1);
                    }}
                    src={certificateImg}
                    description={t("Dapatkan sertifikat yang menunjukkan keahlianmu")}
                  />
                  <NavbarExplore
                    title="Show Case"
                    onClick={(data) => {
                      navigate("/profile", { data });
                      setActiveMenu(2);
                    }}
                    src={showCaseImg}
                    description={t("Pamerkan project portofoliomu ke publik")}
                  />
                  <NavbarExplore title={t("Grup Telegram")} onClick={() => window.open("https://t.me/jvalleyverse")} src={telegramImg} description={t("Jadi bagian dari Jvalleyverse dan berkontribusi")} />
                  <NavbarExplore
                    title="Stuck Erorrs"
                    onClick={() => {
                      navigate("/belajar/diskusi");
                    }}
                    src={stuckImg}
                    description={t("Tanyakan masalahmu di sini dalam forum diskusi")}
                  />
                </div>
                <Link to="/jalur-belajar" className="flex justify-center py-2">
                  <span className="text-background-500 dark:text-gray-100 font-bold cursor-pointer">{t("Lihat selengkapnya")}</span>
                </Link>
              </MenuItem>
              <Link to={"/blog"} className="text-black font-normal dark:text-neutral-200 hover:text-black">
                {t("Blog")}
              </Link>
              <Link to={"/tentang"} className="text-black font-normal dark:text-neutral-200 hover:text-black">
                Tentang
              </Link>
            </div>
            <div className="flex gap-3">
              <Link to="/belajar/project" className="flex xl:hidden gap-1.5 mr-1 items-center bg-white dark:bg-black/30 rounded-lg px-2 py-1 text-black dark:text-neutral-200 border border-gray-900">
                <LuLogOut className="text-black dark:text-neutral-200" />
                {t("Keluar")}
              </Link>
              <div className="mt-2">
                <Language />
              </div>
              <span className="cursor-pointer">
                {darkMode ? <LuSun className="mt-1.5 w-8 h-8 text-gray-800 dark:text-white" onClick={toggleDarkMode} /> : <LuMoon className="mt-1.5 w-8 h-8 text-gray-800 dark:text-white" onClick={toggleDarkMode} />}
              </span>
              {sessionData && sessionData.session === null && (
                <div className="gap-2 hidden md:flex">
                  <Link to="/signin" className=" md:mt-1">
                    <button className="btn border bg-white text-brand-500 hover:bg-gray-100 py-1 px-3">{t("Masuk")}</button>
                  </Link>
                  <Link to="/signup" className="md:mt-1">
                    <button className="btn text-white bg-brand-500 hover:bg-brand-800 hover:border-brand-800 py-1 px-3">{t("Daftar")}</button>
                  </Link>
                </div>
              )}
              {sessionData && sessionData.session !== null && <DropdownUser />}
            </div>
          </div>
        </Menu>
      </nav>
      {showModalMenu && <ModalMenuModule showModalMenu={showModalMenu} setShowModalMenu={() => setShowModalMenu(!showModalMenu)} />}
    </>
  );
};

export default NavbarCourse;
