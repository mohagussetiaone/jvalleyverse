import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
// import ProfileDropdown from "./ProfileDropdown";
// import { useIsLoggedInStore } from "@store/Auth/IsLoggedIn";
// import { useAuthCheck } from "@store/Auth/customHooks";

const subMenu = [
  { name: "Projek", to: "/belajar/project" },
  { name: "Studi Kasus", to: "/belajar/studi-kasus" },
  { name: "Diskusi", to: "/belajar/diskusi" },
  { name: "Explorasi", to: "/belajar/explorasi" },
  { name: "Mentoring", to: "/belajar/mentoring" },
  { name: "Tutorial", to: "/belajar/tutorial" },
];

const ModalMenuProject = ({ showModalMenu, setShowModalMenu }) => {
  // const { isLoggedIn } = useIsLoggedInStore();
  // console.log("isLoggedIn", isLoggedIn);
  //   const authToken = useAuthCheck();
  // console.log("authToken", authToken);

  return (
    <nav className="bg-white sticky top-0 z-30 border-b border-gray-200">
      <Transition.Root show={showModalMenu} as={Fragment}>
        <Dialog as="div" className="relative z-40" onClose={setShowModalMenu}>
          <Transition.Child as={Fragment} enter="transition-opacity ease-linear duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="transition-opacity ease-linear duration-300" leaveFrom="opacity-100" leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative w-full flex h-full max-w-xs flex-col overflow-y-auto bg-white py-4 px-0 pb-12 shadow-xl">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg mx-4 font-medium text-gray-900">Menu pembelajaran</h2>
                  <span type="button" className="mr-2 flex h-10 w-10 items-center justify-center bg-white p-2 text-gray-400" onClick={() => setShowModalMenu(!showModalMenu)}>
                    <IoMdClose className="h-6 w-6" />
                  </span>
                </div>
                <form className="mt-4 border-t border-gray-200">
                  <h3 className="sr-only text-black">Categories</h3>
                  <div className="flex-col justify-center text-center pt-2 pb-1 px-2 py-3 font-medium text-gray-900">
                    {subMenu.map((menu) => (
                      <div key={menu.name} className="mb-2 rounded-md border hover:border-black border-gray-300">
                        <Link to={menu.to} className="block px-2 py-3 hover:text-black text-gray-700">
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

export default ModalMenuProject;
