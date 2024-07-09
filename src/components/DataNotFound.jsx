import { useTranslation } from "react-i18next";
const DataNotFound = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="w-full min-w-[100vw] md:min-w-[80vw] h-[50vh] bg-whiteSmoke dark:bg-gradient-to-tr from-black via-brand2 to-gray-900">
        <div className="pt-14 md:pt-16 xl:pt-20">
          <div className="flex-1 flex flex-col items-center justify-center text-black dark:text-neutral-200">
            <h1 className="text-xl lg:text-2xl xl:text-3xl tracking-wider font-bold font-serif mt-12 text-center">{t("Data tidak ditemukan")}</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default DataNotFound;
