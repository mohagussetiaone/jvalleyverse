import { IoMdHome, IoIosPricetags, IoIosChatboxes } from "react-icons/io";
import useActiveMenu from "@/hooks/useActiveMenu";
import { Link } from "react-router-dom";

const SidebarDiscussion = () => {
  const { activeMenu, setActiveMenu } = useActiveMenu();

  const sidebarData = [
    { id: 1, title: "Home", icon: <IoMdHome className="w-5 h-5" />, url: "/belajar/diskusi/home" },
    { id: 2, title: "Pertanyaan", icon: <IoIosChatboxes className="w-5 h-5" />, url: "/belajar/diskusi/pertanyaan" },
    { id: 3, title: "Tags", icon: <IoIosPricetags className="w-5 h-5" />, url: "/belajar/diskusi/tags" },
  ];

  const handleClick = (menuId) => {
    setActiveMenu(menuId);
  };

  return (
    <>
      <aside className="hidden xl:block left-0 z-40 w-[200px] h-full bg-gray-50 dark:bg-gray-800 overflow-y-auto">
        <div className="h-full px-3 py-4">
          <ul className="space-y-2 font-medium">
            {sidebarData &&
              sidebarData.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.url}
                    className={`flex items-center p-2 rounded-lg ${activeMenu === item.id ? "bg-gray-200 text-black hover:bg-gray-300 hover:text-black" : "text-gray-700 bg-white hover:bg-gray-100 hover:text-gray-800"}`}
                    onClick={() => handleClick(item.id)}
                  >
                    {item.icon}
                    <span className="ms-3 text-sm">{item.title}</span>
                  </Link>
                </li>
              ))}
          </ul>
          <div className="absolute bottom-4 right-0.5 justify-center w-full">
            <p className="mb-4 text-black text-sm font-normal">
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

export default SidebarDiscussion;
