import { IoMdHome, IoIosChatboxes } from "react-icons/io";
import useActiveMenu from "@/hooks/useActiveMenu";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const SidebarDiscussion = () => {
  const { activeMenu, setActiveMenu } = useActiveMenu();
  const { t } = useTranslation();

  const sidebarData = [
    { id: 1, title: `${t("Home")}`, icon: <IoMdHome className="w-5 h-5" />, url: "/belajar/diskusi" },
    { id: 2, title: `${t("Pertanyaan Saya")}`, icon: <IoIosChatboxes className="w-5 h-5" />, url: "/belajar/diskusi/pertanyaan" },
    // { id: 3, title: "Tags", icon: <IoIosPricetags className="w-5 h-5" />, url: "/belajar/diskusi/tags" },
  ];

  const handleClick = (menuId) => {
    setActiveMenu(menuId);
  };

  return (
    <>
      <aside className="hidden xl:block left-0 z-40 w-[200px] h-full bg-gray-50 dark:bg-black/95 overflow-y-auto">
        <div className="h-full px-3 py-4">
          <ul className="space-y-2 font-medium">
            {sidebarData &&
              sidebarData.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.url}
                    className={`flex items-center p-2 rounded-lg ${
                      activeMenu === item.id
                        ? "bg-gray-200 dark:bg-neutral-900 text-black dark:text-neutral-200 hover:bg-gray-300 hover:text-black"
                        : "text-gray-900 dark:text-neutral-400 bg-white dark:bg-black/50 hover:bg-gray-100 hover:text-gray-800 dark:hover:text-neutral-200"
                    }`}
                    onClick={() => handleClick(item.id)}
                  >
                    {item.icon}
                    <span className="ms-3 text-sm">{item.title}</span>
                  </Link>
                </li>
              ))}
          </ul>
          <div className="absolute bottom-4 right-0.5 justify-center w-full">
            <p className="mb-4 text-center text-sm font-normal">
              <a href="https://jvalleyverse.vercel.app/" target="_blank" className="text-gray-900 hover:text-black dark:text-neutral-200">
                Jvalleyverse Community
              </a>
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SidebarDiscussion;
