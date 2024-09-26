import { useTranslation } from "react-i18next";
const DataNotFound = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="w-full min-w-[100vw] h-[100vh] bg-whiteSmoke dark:bg-primaryDark">
        <div className="pt-14 md:pt-16 xl:pt-20">
          <div className="flex-1 flex flex-col items-center justify-center text-black dark:text-neutral-200">
            <h1 className="text-xl items-center justify-center align-middle lg:text-2xl xl:text-3xl tracking-wider font-bold font-serif mt-52 text-center">{t("Data tidak ditemukan")}</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default DataNotFound;
