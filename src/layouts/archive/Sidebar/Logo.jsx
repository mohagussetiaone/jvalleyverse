import useDarkMode from "@/hooks/useDarkMode";
import useSidebar from "@/hooks/useSidebar";
import { Link } from "react-router-dom";
import MobileLogo from "@/assets/logo/logo.png";

const SidebarLogo = ({ menuHover }) => {
  const { darkMode } = useDarkMode();
  const { collapsed, setMenuCollapsed } = useSidebar();

  return (
    <div className={`logo-segment flex justify-between items-center bg-white dark:bg-slate-800 z-[9] py-6 px-4 ${menuHover ? "logo-hovered" : ""} " border-b border-r-0 border-slate-200 dark:border-slate-700" : "border-none"}`}>
      <Link to="/dashboard">
        <div className="flex items-center space-x-4">
          <div>{!darkMode ? <img src={MobileLogo} alt="logoksoerp.jpg" className="w-10 h-10" /> : <img src={MobileLogo} alt="logo.jpg" className="w-10 h-10" />}</div>
        </div>
      </Link>
      {(!collapsed || menuHover) && <input type="radio" onClick={() => setMenuCollapsed(!collapsed)}></input>}
    </div>
  );
};

export default SidebarLogo;
