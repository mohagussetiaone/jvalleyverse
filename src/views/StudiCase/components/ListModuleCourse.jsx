import { useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import useActiveMenu from "@/hooks/useActiveMenu";
import { Link } from "react-router-dom";

const ListModuleCourse = () => {
  const { activeMenu, setActiveMenu } = useActiveMenu();
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  const handleClick = (menuId) => {
    if (activeMenu === menuId) {
      setActiveMenu(null);
      setActiveSubMenu(null);
    } else {
      setActiveMenu(menuId);
      setActiveSubMenu(menuId);
    }
  };

  const handleSubMenuClick = (subMenuId) => {
    setActiveSubMenu(subMenuId === activeSubMenu ? null : subMenuId);
  };

  const sidebarData = [
    {
      id: 1,
      title: "Pengenalan",
      pathCourse: "belajar/project",
      projectId: 1,
      subMenu: [
        { id: 1.1, title: "Submenu 1-1", url: "1" },
        { id: 1.2, title: "Submenu 1-2", url: "2" },
      ],
    },
    {
      id: 2,
      title: "Tahap 2",
      pathCourse: "belajar/project",
      projectId: 1,
      subMenu: [
        { id: 2.1, title: "Submenu 2-1", url: "3" },
        { id: 2.2, title: "Submenu 2-2", url: "4" },
      ],
    },
    {
      id: 3,
      title: "Random Title 1",
      pathCourse: "belajar/project",
      projectId: 1,
      subMenu: [
        { id: 3.1, title: "Submenu 3-1", url: "4" },
        { id: 3.2, title: "Submenu 3-2", url: "5" },
      ],
    },
    {
      id: 4,
      title: "Random Title 2",
      pathCourse: "belajar/project",
      projectId: 1,
      subMenu: [
        { id: 4.1, title: "Submenu 4-1", url: "6" },
        { id: 4.2, title: "Submenu 4-2", url: "7" },
      ],
    },
    {
      id: 5,
      title: "Random Title 3",
      pathCourse: "belajar/project",
      projectId: 1,
      subMenu: [
        { id: 5.1, title: "Submenu 5-1", url: "8" },
        { id: 5.2, title: "Submenu 5-2", url: "9" },
      ],
    },
    {
      id: 6,
      title: "Random Title 4",
      pathCourse: "belajar/project",
      projectId: 1,
      subMenu: [
        { id: 6.1, title: "Submenu 6-1", url: "10" },
        { id: 6.2, title: "Submenu 6-2", url: "11" },
      ],
    },
    {
      id: 7,
      title: "Random Title 5",
      pathCourse: "belajar/project",
      projectId: 1,
      subMenu: [
        { id: 7.1, title: "Submenu 7-1", url: "12" },
        { id: 7.2, title: "Submenu 7-2", url: "13" },
      ],
    },
    {
      id: 8,
      title: "Random Title 6",
      pathCourse: "belajar/project",
      projectId: 1,
      subMenu: [
        { id: 8.1, title: "Submenu 8-1", url: "14" },
        { id: 8.2, title: "Submenu 8-2", url: "15" },
      ],
    },
    {
      id: 9,
      title: "Random Title 7",
      pathCourse: "belajar/project",
      projectId: 1,
      subMenu: [
        { id: 9.1, title: "Submenu 9-1", url: "16" },
        { id: 9.2, title: "Submenu 9-2", url: "17" },
      ],
    },
    {
      id: 10,
      title: "Random Title 8",
      pathCourse: "belajar/project",
      projectId: 1,
      subMenu: [
        { id: 10.1, title: "Submenu 10-1", url: "18" },
        { id: 10.2, title: "Submenu 10-2", url: "19" },
      ],
    },
    {
      id: 11,
      title: "Random Title 9",
      pathCourse: "belajar/project",
      projectId: 1,
      subMenu: [
        { id: 11.1, title: "Submenu 11-1", url: "10" },
        { id: 11.2, title: "Submenu 11-2", url: "11" },
      ],
    },
    {
      id: 12,
      title: "Random Title 10",
      pathCourse: "belajar/project",
      projectId: 1,
      subMenu: [
        { id: 12.1, title: "Submenu 12-1", url: "12" },
        { id: 12.2, title: "Submenu 12-2", url: "13" },
      ],
    },
  ];

  return (
    <>
      <div className="overflow-y-auto flex-grow">
        <ul className="space-y-2 font-medium">
          {sidebarData.map((item) => (
            <li key={item.id}>
              <div>
                <a
                  className={`flex items-center justify-between p-2 rounded-lg ${
                    activeMenu === item.id
                      ? "bg-gray-200 dark:bg-neutral-600 dark:hover:bg-gray-800/70 text-black dark:text-gray-200 dark:hover:text-white hover:bg-gray-300 hover:text-black"
                      : "text-gray-700 dark:text-neutral-200 bg-white dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-white hover:bg-gray-100 hover:text-gray-800"
                  }`}
                  onClick={() => handleClick(item.id)}
                >
                  <div className="flex items-center">
                    {item.id}
                    <span className="ms-3">{item.title}</span>
                  </div>
                  {item.subMenu && (
                    <div className="flex items-center">
                      <span className="text-xs">{item.subMenu.length} module</span>
                      <MdKeyboardArrowRight className={`transition-transform ${activeSubMenu === item.id ? "rotate-90" : ""}`} />
                    </div>
                  )}
                </a>
                {activeMenu === item.id && item.subMenu && (
                  <ul className="pl-4 py-2 space-y-1 transition-all duration-300 ease-in-out">
                    {item.subMenu.map((subItem) => (
                      <li key={subItem.id}>
                        <Link
                          to={`${item.pathCourse}/${item.projectId}/chapter/${subItem.url}`}
                          className={`flex items-center p-2 rounded-lg ${
                            activeSubMenu === subItem.id
                              ? "bg-gray-200 dark:bg-neutral-600 dark:hover:bg-gray-800/70 text-black dark:text-gray-200 dark:hover:text-white hover:bg-gray-300 hover:text-black"
                              : "hover:text-black text-black dark:text-white dark:hover:text-white"
                          }`}
                          onClick={() => handleSubMenuClick(subItem.id)}
                        >
                          <div className="w-2.5 h-2.5 bg-gray-600  rounded-full mr-3"></div>
                          {subItem.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ListModuleCourse;
