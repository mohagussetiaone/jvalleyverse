import { useRef } from "react";
import { MdOutlineFileDownload } from "react-icons/md";
import logoJv from "@/assets/logo/logojv.png";
import ttdImage from "@/assets/img/ttd.png";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Certificate = () => {
  const certificateRef = useRef(null);

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

  return (
    <div className="w-full min-w-[100vw] bg-white dark:bg-brand2">
      <div ref={certificateRef} className="relative md:mx-auto w-full md:w-[55vw] bg-white border border-brand-300 px-6 p-4 md:p-8 xl:p-10">
        <div className="flex justify-between items-center mb-6">
          <div>
            <img src={logoJv} alt="Logo" className="h-8 xl:h-12" />
          </div>
          <div>
            <h1 className="text-sm xl:text-2xl font-bold text-gray-700">CERTIFICATE</h1>
          </div>
        </div>
        <div className="flex flex-col text-center text-black mb-2 md:mb-4 xl:mb-6">
          <p className="text-sm md:text-lg">Sertifikat Ini Dengan Bangga Diberikan Kepada</p>
          <p className="text-xl md:text-2xl font-bold text-black my-1 md:my-3">Moh Agus Setiawan</p>
          <p className="text-sm md:text-lg">yang telah menyelesaikan kelas</p>
          <p className="text-sm md:text-xl font-semibold">Fullstack Programming by Next JS Advance</p>
          <p className="text-sm md:text-lg">dalam program Kelas Online Jvalleyverse</p>
        </div>
        <div className="text-left ml-0 md:ml-5 text-black mb-2">
          <p className="text-sm md:text-md font-semibold">12 November 2022</p>
        </div>
        <div className="flex justify-between items-center">
          <div className="items-center text-black">
            <img src={ttdImage} alt="Signature" className="ml-3 md:ml-0 w-20 md:w-44 h-8 md:h-16" />
            <p className="text-sm md:text-lg font-semibold">Moh Agus Setiawan</p>
            <p className="text-sm md:text-lg">CEO & Co-Founder</p>
          </div>
          <div className="items-end text-black mt-12">
            <p className="text-xs md:text-lg">Berlaku sampai 25 Desember 2026</p>
          </div>
        </div>
        <button onClick={handleDownload} className="absolute gap-1 right-0 xl:right-2 top-0 md:top-2 bg-blue-500 text-white p-1 rounded-lg shadow-lg">
          <MdOutlineFileDownload className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Certificate;
