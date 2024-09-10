import CertificateCard from "./CertificateCard";
import { useTranslation } from "react-i18next";

const CertificateList = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-white dark:bg-gradient-to-r from-black via-background-900 to-background-700">
      <div className="mt-4 md:mt-6">
        <div className="px-4 md:px-10">
          <h2 className="text-2xl text-left text-black dark:text-neutral-200 font-bold py-6">{t("Sertifikat Saya")}</h2>
        </div>
        <CertificateCard />
      </div>
    </div>
  );
};

export default CertificateList;
