import { useState } from "react";
import { MdKeyboardArrowRight, MdMenu, MdClose } from "react-icons/md";
import useActiveMenu from "@/hooks/useActiveMenu";

const SidebarStudyCase = () => {
  const { activeMenu, setActiveMenu } = useActiveMenu();
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleClick = (menuId) => {
    if (activeMenu === menuId) {
      setActiveMenu(null);
      setActiveSubMenu(null);
    } else {
      setActiveMenu(menuId);
      setActiveSubMenu(menuId);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const sidebarData = [
    {
      id: 1,
      title: "Pengenalan",
      url: "#",
      subMenu: [
        { id: 1.1, title: "Submenu 1-1", url: "#" },
        { id: 1.2, title: "Submenu 1-2", url: "#" },
      ],
    },
    {
      id: 2,
      title: "Tahap 2",
      url: "#",
      subMenu: [
        { id: 2.1, title: "Submenu 2-1", url: "#" },
        { id: 2.2, title: "Submenu 2-2", url: "#" },
      ],
    },
    {
      id: 3,
      title: "Random Title 1",
      url: "#",
      subMenu: [
        { id: 3.1, title: "Submenu 3-1", url: "#" },
        { id: 3.2, title: "Submenu 3-2", url: "#" },
      ],
    },
    {
      id: 4,
      title: "Random Title 2",
      url: "#",
      subMenu: [
        { id: 4.1, title: "Submenu 4-1", url: "#" },
        { id: 4.2, title: "Submenu 4-2", url: "#" },
      ],
    },
    {
      id: 5,
      title: "Random Title 3",
      url: "#",
      subMenu: [
        { id: 5.1, title: "Submenu 5-1", url: "#" },
        { id: 5.2, title: "Submenu 5-2", url: "#" },
      ],
    },
    {
      id: 6,
      title: "Random Title 4",
      url: "#",
      subMenu: [
        { id: 6.1, title: "Submenu 6-1", url: "#" },
        { id: 6.2, title: "Submenu 6-2", url: "#" },
      ],
    },
    {
      id: 7,
      title: "Random Title 5",
      url: "#",
      subMenu: [
        { id: 7.1, title: "Submenu 7-1", url: "#" },
        { id: 7.2, title: "Submenu 7-2", url: "#" },
      ],
    },
    {
      id: 8,
      title: "Random Title 6",
      url: "#",
      subMenu: [
        { id: 8.1, title: "Submenu 8-1", url: "#" },
        { id: 8.2, title: "Submenu 8-2", url: "#" },
      ],
    },
    {
      id: 9,
      title: "Random Title 7",
      url: "#",
      subMenu: [
        { id: 9.1, title: "Submenu 9-1", url: "#" },
        { id: 9.2, title: "Submenu 9-2", url: "#" },
      ],
    },
    {
      id: 10,
      title: "Random Title 8",
      url: "#",
      subMenu: [
        { id: 10.1, title: "Submenu 10-1", url: "#" },
        { id: 10.2, title: "Submenu 10-2", url: "#" },
      ],
    },
    {
      id: 11,
      title: "Random Title 9",
      url: "#",
      subMenu: [
        { id: 11.1, title: "Submenu 11-1", url: "#" },
        { id: 11.2, title: "Submenu 11-2", url: "#" },
      ],
    },
    {
      id: 12,
      title: "Random Title 10",
      url: "#",
      subMenu: [
        { id: 12.1, title: "Submenu 12-1", url: "#" },
        { id: 12.2, title: "Submenu 12-2", url: "#" },
      ],
    },
  ];

  return (
    <>
      <aside className={`fixed top-4 left-4 xl:static z-40 w-[300px] h-full bg-gray-50 dark:bg-gray-800 transition-transform transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-60"}`}>
        <div className="h-full px-3 py-4">
          <div className="relative z-50">
            <div className="flex px-2 pb-5 items-center justify-between">
              <div>
                <h3 className="text-black text-xl font-bold">Daftar Module</h3>
              </div>
              <div>
                <button onClick={toggleSidebar} className="bg-white p-2 rounded-lg">
                  {isSidebarOpen ? <MdClose size={24} className="text-red-500" /> : <MdMenu size={24} className="text-blue-500 bg-brand2" />}
                </button>
              </div>
            </div>
          </div>
          <hr className="py-1" />
          <div className="h-full overflow-y-auto">
            <ul className="space-y-2 font-medium">
              {sidebarData.map((item) => (
                <li key={item.id}>
                  <div>
                    <a
                      href={item.url}
                      className={`flex items-center justify-between p-2 rounded-lg ${activeMenu === item.id ? "bg-gray-200 text-black hover:bg-gray-300 hover:text-black" : "text-gray-700 bg-white hover:bg-gray-100 hover:text-gray-800"}`}
                      onClick={() => handleClick(item.id)}
                    >
                      <div className="flex items-center">
                        {item.id}
                        <span className="ms-3">{item.title}</span>
                      </div>
                      {item.subMenu && (
                        <div className="flex items-center">
                          <span className="text-xs">{item?.subMenu.length} module</span>
                          <MdKeyboardArrowRight className={`transition-transform ${activeSubMenu === item.id ? "rotate-90" : ""}`} />
                        </div>
                      )}
                    </a>
                    {activeSubMenu === item.id && item.subMenu && (
                      <ul className="pl-8 space-y-1 transition-all duration-300 ease-in-out">
                        {item.subMenu.map((subItem) => (
                          <li key={subItem.id}>
                            <a href={subItem.url} className="flex items-center p-2 rounded-lg text-gray-600 hover:bg-gray-200">
                              <div className="w-2.5 h-2.5 bg-gray-600 rounded-full mr-3"></div>
                              {subItem.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>
      {!isSidebarOpen && (
        <button onClick={toggleSidebar} className="fixed top-4 right-4 bg-white p-2 rounded-lg z-50">
          {isSidebarOpen ? <MdClose size={24} className="text-red-500" /> : <MdMenu size={24} className="text-blue-500 bg-brand2" />}
        </button>
      )}
    </>
  );
};

export default SidebarStudyCase;
