import { MdOutlineCollectionsBookmark, MdOutlineBugReport } from "react-icons/md";
import { GoProjectSymlink } from "react-icons/go";
// import { IoLibraryOutline } from "react-icons/io5";
// import { FaRegCompass } from "react-icons/fa";
import { FcAssistant } from "react-icons/fc";
// import { GrReactjs } from "react-icons/gr";
import useActiveMenu from "@/hooks/useActiveMenu";
import { Link } from "react-router-dom";

const SidebarCourse = () => {
  const { activeMenu, setActiveMenu } = useActiveMenu();

  const sidebarData = [
    { id: 1, title: "Projects", icon: <GoProjectSymlink className="w-7 h-7" />, url: "/belajar/project" },
    { id: 2, title: "Studi Kasus", icon: <MdOutlineCollectionsBookmark className="w-7 h-7" />, url: "/belajar/studi-kasus" },
    { id: 3, title: "Discussion", icon: <MdOutlineBugReport className="w-7 h-7" />, url: "/belajar/diskusi" },
    // { id: 4, title: "Library", icon: <IoLibraryOutline className="w-7 h-7" />, url: "/belajar/library" },
    // { id: 5, title: "Explore", icon: <FaRegCompass className="w-7 h-7" />, url: "/belajar/explore" },
    { id: 6, title: "Mentoring", icon: <FcAssistant className="w-7 h-7" />, url: "/belajar/mentoring" },
    // { id: 7, title: "Tutorial", icon: <GrReactjs className="w-7 h-7" />, url: "/belajar/tutorial" },
  ];

  const handleClick = (menuId) => {
    setActiveMenu(menuId);
  };

  return (
    <>
      <aside className="hidden xl:block left-0 z-40 w-[275px] h-full bg-gray-50 dark:bg-black/90 overflow-y-auto">
        <div className="h-full px-3 py-5">
          <ul className="space-y-2 font-medium">
            {sidebarData &&
              sidebarData.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.url}
                    className={`flex items-center p-2 rounded-lg ${
                      activeMenu === item.id ? "bg-gray-200 text-black hover:bg-gray-300 hover:text-black dark:bg-black dark:text-white" : "text-gray-700 bg-white hover:bg-gray-100 hover:text-gray-800 dark:hover:text-gray-100 dark:bg-black"
                    }`}
                    onClick={() => handleClick(item.id)}
                  >
                    {item.icon}
                    <span className="ms-3">{item.title}</span>
                  </Link>
                </li>
              ))}
          </ul>
          <div className="absolute bottom-4 justify-center right-1 w-full">
            <p className="mb-4 text-center text-black dark:text-white text-sm font-normal">
              © {new Date().getFullYear()}{" "}
              <a href="https://jvalleyverse.vercel.app/" target="_blank" className="text-gray-900 hover:text-black dark:text-white">
                Jvalleyverse Community
              </a>
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SidebarCourse;
