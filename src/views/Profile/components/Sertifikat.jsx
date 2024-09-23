import { useRef } from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import logoJv from "@/assets/logo/logojv.png";
import ttdImage from "@/assets/img/ttd.png";
import html2canvas from "html2canvas";
import dayjs from "dayjs";
import jsPDF from "jspdf";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import DiscussionSkeleton from "@/components/loading/DiscussionSkeleton";
import ErrorServer from "@/components/ErrorServer";
import { handleGetCertificateById } from "@/api/Certificate/CertificateApi";
import { useAuthValidation } from "@/lib/authValidation";

const Certificate = () => {
  useAuthValidation();

  const certificateRef = useRef(null);
  const { sertId } = useParams();
  const handleDownload = () => {
    const certificateElement = certificateRef.current;
    html2canvas(certificateElement, { scale: 2 })
      .then((canvas) => {
        const pdf = new jsPDF("l", "mm", "a4");
        const width = 297;
        const height = (canvas.height * width) / canvas.width - 4;
        pdf.addImage(canvas.toDataURL("image/png", 0.5), "PNG", 0, 0, width, height);
        pdf.save("certificate.pdf");
      })
      .catch((error) => {
        console.error("An error occurred while generating the PDF:", error);
      });
  };

  // GET ALL CERTIFICATE
  const {
    error: errorCertificateById,
    isPending: isPendingCertificateById,
    data: dataCertificateById,
  } = useQuery({
    queryKey: ["getCertificateById"],
    queryFn: () => handleGetCertificateById(sertId),
    enabled: !!sertId,
  });

  if (errorCertificateById) {
    return <ErrorServer />;
  }

  if (isPendingCertificateById) {
    return <DiscussionSkeleton />;
  }

  console.log("dataCertificateById", dataCertificateById);

  return (
    <div className="w-full bg-white dark:bg-primaryDark">
      <div className="w-[450px] md:w-[600px] xl:w-[700px] justify-center items-center mx-auto py-8 md:py-10">
        <div ref={certificateRef} className="relative md:mx-auto h-auto w-full bg-white border border-brand-300 px-6 p-4 md:p-8 xl:p-10">
          <div className="flex justify-between items-center mb-3 md:mb-5 xl:mb-6">
            <div>
              <img src={logoJv} alt="Logo" className="h-8 xl:h-10" />
            </div>
            <div>
              <h1 className="text-xs pr-3 md:pr-0 xl:text-2xl font-bold text-gray-700">CERTIFICATE</h1>
            </div>
          </div>
          <div className="flex flex-col text-center text-black mb-4 md:mb-5 xl:mb-6">
            <p className="text-xs md:text-lg">Sertifikat Ini Dengan Bangga Diberikan Kepada</p>
            <p className="text-base md:text-2xl font-bold text-black my-1 md:my-3">{dataCertificateById?.users?.name}</p>
            <p className="text-xs md:text-lg">yang telah menyelesaikan kelas</p>
            <p className="text-xs md:text-xl font-semibold">{dataCertificateById?.certificate_name}</p>
            <p className="text-xs md:text-lg">dalam program kelas {dataCertificateById?.project.project_name}</p>
          </div>
          <div className="text-left ml-0 md:ml-5 text-black mb-2">
            <p className="text-xs md:text-base xl:text-lg font-semibold">{dayjs(dataCertificateById?.created_at).format("DD MMMM YYYY")}</p>
          </div>
          <div className="flex justify-between items-center">
            <div className="items-center text-black">
              <img src={ttdImage} alt="Signature" className="ml-3 md:ml-0 w-20 md:w-44 h-8 md:h-16" />
              <p className="text-xs md:text-lg font-semibold">Moh Agus Setiawan</p>
              <p className="text-xs md:text-lg">CEO & Co-Founder</p>
            </div>
            <div className="items-end text-black mt-12">
              <p className="text-xs md:text-lg">Berlaku sampai {dayjs(dataCertificateById?.certificate_valid).format("DD MMMM YYYY")}</p>
            </div>
          </div>
          <button onClick={handleDownload} className="absolute gap-1 right-0 xl:right-2 top-0 md:top-2 bg-blue-500 text-white p-1 rounded-lg shadow-lg">
            <MdOutlineFileDownload className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
