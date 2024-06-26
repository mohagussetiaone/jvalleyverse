import { useRef, useEffect, useState } from "react";
import { menuItems } from "@/constant/data";
import useSidebar from "@/hooks/useSidebar";
import useDarkMode from "@/hooks/useDarkMode";
import SimpleBar from "simplebar-react";
import SidebarLogo from "./Logo";
import Navmenu from "./Navmenu";

const Sidebar = () => {
  const scrollableNodeRef = useRef();
  const [scroll, setScroll] = useState(false);
  const { darkMode } = useDarkMode();
  const { collapsed } = useSidebar();

  useEffect(() => {
    const handleScroll = () => {
      if (scrollableNodeRef.current.scrollTop > 0) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };
    scrollableNodeRef.current.addEventListener("scroll", handleScroll);
  }, [scrollableNodeRef]);

  const [menuHover, setMenuHover] = useState(false);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div
        className={`sidebar-wrapper text-black bg-white dark:bg-slate-800 ${collapsed ? "w-[72px] close_sidebar" : "[248px]"} ${menuHover ? "sidebar-hovered" : ""} "border-r border-slate-200 dark:border-slate-700" : "shadow-base"}
      `}
        onMouseEnter={() => {
          setMenuHover(true);
        }}
        onMouseLeave={() => {
          setMenuHover(false);
        }}
      >
        <SidebarLogo menuHover={menuHover} />
        <div className={`h-[60px]  absolute top-[80px] nav-shadow z-[1] w-full transition-all duration-200 pointer-events-none ${scroll ? " opacity-100" : " opacity-0"}`}></div>

        <SimpleBar className="sidebar-menu px-4 h-[calc(100%-80px)]" scrollableNodeProps={{ ref: scrollableNodeRef }}>
          <Navmenu menus={menuItems} />
        </SimpleBar>
      </div>
    </div>
  );
};

export default Sidebar;
