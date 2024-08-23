import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

export default function MyModal({ open, setIsOpen, header, content, footer }) {
  return (
    <>
      <Dialog open={open} as="div" className="relative z-10 focus:outline-none" onClose={setIsOpen}>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel transition className="w-full max-w-xl rounded-xl bg-white dark:bg-background-900 px-6 py-4 duration-300 ease-out">
              <DialogTitle as="h3" className="text-base/7 font-medium text-black dark:text-white">
                {header}
              </DialogTitle>
              <div>{content}</div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
