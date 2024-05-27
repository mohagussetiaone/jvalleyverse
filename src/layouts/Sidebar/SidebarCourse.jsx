import { MdOutlineCollectionsBookmark, MdOutlineBugReport } from "react-icons/md";
import { GoProjectSymlink } from "react-icons/go";
import { IoLibraryOutline } from "react-icons/io5";
import { FaRegCompass } from "react-icons/fa";
import { FcAssistant } from "react-icons/fc";
import { GrReactjs } from "react-icons/gr";
import useActiveMenu from "@/hooks/useActiveMenu";

const Sidebar = () => {
  const { activeMenu, setActiveMenu } = useActiveMenu();

  const sidebarData = [
    { id: 1, title: "Project", icon: <GoProjectSymlink className="w-7 h-7" />, url: "#" },
    { id: 2, title: "Studi Kasus", icon: <MdOutlineCollectionsBookmark className="w-7 h-7" />, url: "#" },
    { id: 3, title: "Error Discussion", icon: <MdOutlineBugReport className="w-7 h-7" />, url: "#" },
    { id: 4, title: "Library", icon: <IoLibraryOutline className="w-7 h-7" />, url: "#" },
    { id: 5, title: "Explore", icon: <FaRegCompass className="w-7 h-7" />, url: "#" },
    { id: 6, title: "Mentoring", icon: <FcAssistant className="w-7 h-7" />, url: "#" },
    { id: 7, title: "Tutorial", icon: <GrReactjs className="w-7 h-7" />, url: "#" },
  ];

  const handleClick = (menuId) => {
    setActiveMenu(menuId);
  };

  return (
    <>
      <aside className="hidden xl:block left-0 z-40 w-[275px] h-full bg-gray-50 dark:bg-gray-800 overflow-y-auto">
        <div className="h-full px-3 py-4">
          <ul className="space-y-2 font-medium">
            {sidebarData.map((item) => (
              <li key={item.id}>
                <a
                  href={item.url}
                  className={`flex items-center p-2 rounded-lg ${activeMenu === item.id ? "bg-gray-200 text-black hover:bg-gray-300 hover:text-black" : "text-gray-700 bg-white hover:bg-gray-100 hover:text-gray-800"}`}
                  onClick={() => handleClick(item.id)}
                >
                  {item.icon}
                  <span className="ms-3">{item.title}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="absolute bottom-4 justify-center mr-8 w-full">
            <p className="mb-4 text-black text-sm font-normal">
              © {new Date().getFullYear()}{" "}
              <a href="https://jvalleyverse.vercel.app/" target="_blank" className="text-gray-900 hover:text-black">
                Jvalleyverse Community
              </a>
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
