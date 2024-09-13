import { useState } from "react";
import { cn } from "@/utils/cn";
import { Link, useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { LuMoon, LuSun } from "react-icons/lu";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
// IMG
import logoJv from "@/assets/logo/logojv.png";
import logoDark from "@/assets/logo/logo-dark.png";
import logoSmallDark from "@/assets/logo/logosmalldark.png";
import uiuxImg from "@/assets/navbar/uiux.png";
import frontEndImg from "@/assets/navbar/frontend.jpeg";
import backEndImg from "@/assets/navbar/backend.png";
import databaseImg from "@/assets/navbar/database.jpg";
import certificateImg from "@/assets/navbar/certificate.jpg";
import showCaseImg from "@/assets/navbar/showcase.jpg";
import telegramImg from "@/assets/navbar/telegram.jpeg";
import stuckImg from "@/assets/navbar/erorr.png";
// Modal
import ModalMainMenu from "@/components/ModalMainMenu";
import { Menu, MenuItem, NavbarItem, NavbarExplore } from "@/components/ui/navbar-menu";
// Hooks
import useDarkMode from "@/hooks/useDarkMode";
import useStudyActive from "@/hooks/useStudyActive";
import useActiveMenu from "@/hooks/useActiveMenu";
import { useCheckSession } from "@/api/Auth/CheckSession";
// Component
import Notification from "./Notification";
import DropdownUser from "./DropdownUser";
import Language from "@/components/Language";

export default function NavbarDemo() {
  return (
    <>
      <Navbar />
    </>
  );
}

function Navbar(className) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [active, setActive] = useState(null);
  const [showModalMainMenu, setShowModalMainMenu] = useState(false);
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { setStudyActive } = useStudyActive();
  const { setActiveMenu } = useActiveMenu();

  const { data: sessionData } = useQuery({
    queryKey: ["checkSession"],
    queryFn: useCheckSession,
  });

  console.log("sessionData", sessionData);

  return (
    <>
      <nav className={cn(`fixed left-0 w-full px-4 bg-white dark:bg-gradient-to-r from-black to-background-500 md:px-8 xl:px-10 z-30 border-b border-brand-500 dark:border-background-500`, className)}>
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
              <Link to="/belajar/project" className="text-black font-normal dark:text-neutral-200 hover:text-black">
                {t("Belajar")}
              </Link>
              <MenuItem setActive={setActive} active={active} item={t("Silabus")} className="cursor-pointer">
                <div className="text-sm grid grid-cols-2 gap-10 p-4">
                  <NavbarItem
                    title="UI/UX Design"
                    onClick={(data) => {
                      navigate("/roadmap", { data });
                      setStudyActive(0);
                    }}
                    src={uiuxImg}
                    description={t("Maksimalkan kepuasan pengguna dengan desain yang intuitif dan menarik.")}
                  />
                  <NavbarItem
                    title="Database"
                    onClick={(data) => {
                      navigate("/roadmap", { data });
                      setStudyActive(1);
                    }}
                    src={databaseImg}
                    description={t("Mengelola dan pembaruan data dengan efisien, serta menjaga keamanan dan integritasnya.")}
                  />
                  <NavbarItem
                    title="Backend Developer"
                    onClick={(data) => {
                      navigate("/roadmap", { data });
                      setStudyActive(2);
                    }}
                    src={backEndImg}
                    description={t("Membangun infrastruktur server, database, dan logika bisnis kinerja dan keamanan sistem")}
                  />
                  <NavbarItem
                    title="Frontend Developer"
                    onClick={(data) => {
                      navigate("/roadmap", { data });
                      setStudyActive(3);
                    }}
                    src={frontEndImg}
                    description={t("Mentransformasi desain UI/UX menjadi web yang interaktif dan responsif dengan efisien.")}
                  />
                </div>
                <Link to="/roadmap" className="flex justify-center py-2">
                  <span className="text-background-500 dark:text-gray-100 font-bold cursor-pointer"> {t("Lihat selengkapnya")}</span>
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
                      navigate("/show-case", { data });
                      setActiveMenu(2);
                    }}
                    src={showCaseImg}
                    description={t("Pamerkan project portofoliomu ke publik")}
                  />
                  <NavbarExplore title={t("Grup Telegram")} onClick={() => window.open("https://t.me/jvalleyverse")} src={telegramImg} description={t("Jadi bagian dari Jvalleyverse dan berkontribusi")} />
                  <NavbarExplore
                    title="Stuck Erorr"
                    onClick={() => {
                      navigate("/belajar/diskusi");
                    }}
                    src={stuckImg}
                    description={t("Tanyakan masalahmu di sini dalam forum diskusi")}
                  />
                </div>
              </MenuItem>
              <Link to={"/blog"} className="text-black font-normal dark:text-neutral-200 hover:text-black">
                {t("Blog")}
              </Link>
              <Link to={"/tentang"} className="text-black font-normal dark:text-neutral-200 hover:text-black">
                {t("Tentang")}
              </Link>
            </div>
            <div className="flex gap-3">
              <Language />
              <Notification />
              <span className="cursor-pointer">
                {darkMode ? <LuSun className="mt-1.5 w-8 h-8 text-gray-800 dark:text-white" onClick={toggleDarkMode} /> : <LuMoon className="mt-1.5 w-8 h-8 text-gray-800 dark:text-white" onClick={toggleDarkMode} />}
              </span>
              <div className="flex xl:hidden">
                <button className="px-3 bg-white dark:bg-background-500 border border-gray-300 active:border-none dark:border-none" onClick={() => setShowModalMainMenu(true)}>
                  <RxHamburgerMenu className="w-7 h-7 text-black dark:text-neutral-200" />
                  <p className="sr-only">Menu</p>
                </button>
              </div>
              {sessionData && sessionData.session === null && (
                <div className="gap-4 hidden md:flex items-center">
                  <Link to="/signup">
                    <button className="text-white bg-brand-500 hover:bg-brand-800 hover:border-brand-800 py-1 px-3">{t("Daftar")}</button>
                  </Link>
                </div>
              )}
              {sessionData && sessionData.session !== null && <DropdownUser />}
            </div>
          </div>
        </Menu>
      </nav>
      {showModalMainMenu && <ModalMainMenu showModalMainMenu={showModalMainMenu} setShowModalMainMenu={() => setShowModalMainMenu(!showModalMainMenu)} />}
    </>
  );
}
