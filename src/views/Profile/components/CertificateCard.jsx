import { useState } from "react";
import { LuView, LuDownload } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import DiscussionSkeleton from "@/components/loading/DiscussionSkeleton";
import ErrorServer from "@/components/ErrorServer";
import { handleGetCertificate } from "@/api/Certificate/CertificateApi";
import { useCheckSession } from "@/api/Auth/CheckSession";
import { PiCertificateLight } from "react-icons/pi";

const CertificateCard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // CHECK SESSION
  const { data: sessionData } = useQuery({
    queryKey: ["checkSession"],
    queryFn: useCheckSession,
  });

  console.log("sessionData", sessionData);

  // GET ALL CERTIFICATE
  const {
    error: errorCertificate,
    isPending: isPendingCertificate,
    data: dataCertificate,
  } = useQuery({
    queryKey: ["getCertificate"],
    queryFn: () => handleGetCertificate(sessionData?.session?.user?.id),
    enabled: !!sessionData,
  });

  if (errorCertificate) {
    return <ErrorServer />;
  }

  if (isPendingCertificate) {
    return <DiscussionSkeleton />;
  }

  console.log("dataCertificate", dataCertificate);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const filteredCertificates = dataCertificate && dataCertificate.filter((certificate) => certificate.certificate_name.toLowerCase().includes(searchTerm.toLowerCase()));

  const totalPages = Math.ceil(filteredCertificates?.length / itemsPerPage);
  const currentCertificates = filteredCertificates?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleClickViewSertificate = (id) => {
    navigate(`/profile/sertifikat/${id}`);
  };

  return (
    <div className="w-screen px-4 xl:pl-10 xl:pr-16">
      <div className="flex justify-start mb-8">
        <input type="text" placeholder={t("Cari Sertifikat...")} value={searchTerm} onChange={handleSearchChange} className="w-full bg-white dark:bg-black/20 dark:text-neutral-200 p-2 border border-gray-400 rounded" />
      </div>
      {currentCertificates.length > 0 ? (
        currentCertificates.map((certificate, index) => (
          <div key={index} className="bg-white dark:bg-black/20 grid gap-0 grid-cols-12 max-w-full w-full border border-gray-400 dark:border-none rounded-lg p-2 md:p-4 mb-4">
            <div className="col-span-12 md:col-span-2 mx-auto">
              <PiCertificateLight className="w-44 h-44 text-black dark:text-neutral-400" />
            </div>
            <div className="col-span-12 md:col-span-10 gap-1 md:gap-2 xl:gap-4 rounded-b lg:rounded-b-none lg:rounded-r xl:p-4 flex flex-col justify-between leading-normal text-justify items-center">
              <div className="text-left py-1 text-wrap">
                <div className="text-left text-gray-900 dark:text-neutral-200 font-bold text-xl mb-2">{certificate.certificate_name}</div>
                <p className="text-gray-700 dark:text-neutral-200 text-base">{certificate.certificate_description}</p>
              </div>
              <div className="flex gap-4">
                <button className="flex bg-white dark:bg-black/20 text-brand-500 border border-brand-500  gap-2" onClick={() => handleClickViewSertificate(certificate.id)}>
                  <LuView size={25} />
                  {t("Lihat Certificate")}
                </button>
                <button className="flex bg-brand-500 dark:bg-brand-600 text-white gap-2">
                  <LuDownload size={25} />
                  Download
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="bg-white dark:bg-background-900 max-w-full w-full border border-gray-400 dark:border-none rounded-lg p-4 mb-4">
          <div className="flex justify-center items-center h-[70vw] md:h-[20vw] text-gray-900 dark:text-neutral-200 font-bold text-xl">Data not found</div>
        </div>
      )}
      <div className="flex gap-4 justify-center my-8">
        <div>
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} className="p-2 border border-gray-400 rounded mx-1">
            Prev
          </button>
        </div>
        <div className="flex">
          {Array.from({ length: totalPages }, (_, index) => (
            <button key={index} onClick={() => setCurrentPage(index + 1)} className={`px-4 py-0 border border-gray-400 rounded-full mx-1 ${index + 1 === currentPage ? "bg-gray-500" : "bg-blue-500"}`}>
              {index + 1}
            </button>
          ))}
        </div>
        <div>
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)} className="p-2 border border-gray-400 rounded mx-1">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CertificateCard;
