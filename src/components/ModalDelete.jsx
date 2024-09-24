import { Dialog, DialogPanel } from "@headlessui/react";

const ModalDelete = ({ modalDelete, setModalDelete, data, deleteFunction }) => {
  return (
    <>
      <Dialog open={modalDelete} onClose={setModalDelete} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center">
          <DialogPanel className="w-full max-w-lg border bg-white dark:bg-black p-6 rounded-lg">
            <div className="flex flex-col items-center dark:text-neutral-200">
              <p className="text-base">Apakah kamu yakin akan menghapus {data}? </p>
              <p className="text-sm mt-1">Data tidak dapat dipulihkan kembali</p>
            </div>
            <div className="flex justify-center gap-8 mx-auto mt-8">
              <button className="border border-red-400 bg-white dark:bg-transparent text-red-500 dark:text-red-600" onClick={setModalDelete}>
                Batalkan
              </button>
              <button className="bg-red-500 text-neutral-200" onClick={deleteFunction}>
                Hapus
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default ModalDelete;
