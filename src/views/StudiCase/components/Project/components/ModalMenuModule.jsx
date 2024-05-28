import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoMdClose } from "react-icons/io";
import ListModuleCourse from "../../ListModuleCourse";

const ModalMenuModule = ({ showModalMenu, setShowModalMenu }) => {
  return (
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
            <Dialog.Panel className="relative w-full max-w-xs flex h-full flex-col bg-white shadow-xl">
              <div className="sticky top-0 z-50 bg-white py-4 px-4 shadow-md flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">Module pembelajaran</h2>
                <button type="button" className="flex h-10 w-10 items-center justify-center bg-white p-2 text-gray-400" onClick={() => setShowModalMenu(!showModalMenu)}>
                  <IoMdClose className="h-6 w-6" />
                </button>
              </div>
              <hr className="border-gray-200" />
              <div className="flex-grow overflow-y-auto px-2 py-4">
                <ListModuleCourse />
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalMenuModule;
