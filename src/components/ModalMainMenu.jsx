import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
// import ProfileDropdown from "./ProfileDropdown";
// import { useIsLoggedInStore } from "@store/Auth/IsLoggedIn";
// import { useAuthCheck } from "@store/Auth/customHooks";

const subMenu = [
  { name: "Dashboard", to: "/" },
  { name: "Jalur Belajar", to: "/jalur-belajar" },
  { name: "Belajar", to: "/belajar/project" },
  { name: "Show Case", to: "/show-case" },
  { name: "Diskusi", to: "/belajar/diskusi" },
  { name: "Tentang", to: "/tentang" },
];

const ModalMainMenu = ({ showModalMainMenu, setShowModalMainMenu }) => {
  // const { isLoggedIn } = useIsLoggedInStore();
  // console.log("isLoggedIn", isLoggedIn);
  //   const authToken = useAuthCheck();
  // console.log("authToken", authToken);

  return (
    <nav className="bg-white dark:bg-slate-800 sticky top-0 z-30 border-b border-gray-200">
      <Transition.Root show={showModalMainMenu} as={Fragment}>
        <Dialog as="div" className="relative z-40" onClose={setShowModalMainMenu}>
          <Transition.Child as={Fragment} enter="transition-opacity ease-linear duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="transition-opacity ease-linear duration-300" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 z-40 flex justify-end">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative w-full max-w-xs flex flex-col h-full overflow-y-auto bg-white dark:bg-black/90 py-4 px-0 pb-12 shadow-xl">
                <div className="flex items-center justify-start px-4">
                  <span type="button" className="mr-2 flex h-10 w-10 items-center justify-center bg-white dark:bg-black/90 p-2 text-gray-400" onClick={() => setShowModalMainMenu(!showModalMainMenu)}>
                    <IoMdClose className="h-6 w-6" />
                  </span>
                  <h2 className="text-xl mx-4 font-semibold text-gray-900 dark:text-neutral-200">Main menu</h2>
                </div>
                <form className="mt-4 border-t border-gray-200">
                  <h3 className="sr-only text-black">Main Menu</h3>
                  <div className="flex-col justify-center text-center pt-2 pb-1 px-2 py-3 font-medium text-gray-900">
                    {subMenu.map((menu) => (
                      <div key={menu.name} className="mb-2 rounded-md border border-gray-600 hover:border-black dark:hover:border-gray-300">
                        <Link to={menu.to} className="block px-2 py-3 hover:text-black dark:hover:text-neutral-200 text-black dark:text-neutral-200" onClick={() => setShowModalMainMenu(!showModalMainMenu)}>
                          {menu.name}
                        </Link>
                      </div>
                    ))}
                  </div>
                  {/* {authToken?.session === null && (
                    <div className="flex justify-center gap-10 flex-row mt-4">
                      <div>
                        <Link to="/signin" className="border bg-blue-700 text-white border-gray-600 rounded-md px-5 py-2">
                          SignIn
                        </Link>
                      </div>
                      <div>
                        <Link to="/signup" className="border border-blue-700 px-5 py-2 rounded-md">
                          SignUp
                        </Link>
                      </div>
                    </div>
                  )} */}
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </nav>
  );
};

export default ModalMainMenu;
