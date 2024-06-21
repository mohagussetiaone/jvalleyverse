import { useState } from "react";
import NodeJsImage from "@/assets/tech/nodejs.png";
import { LuView, LuDownload } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const CertificateCard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const certificateData = [
    { id: 1, title: "Can coffee make you a better developer?", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil." },
    { id: 2, title: "The benefits of working remotely", description: "Fugit, doloribus! Suscipit consequatur ex obcaecati quibusdam odio rerum impedit necessitatibus at." },
    { id: 3, title: "How to improve your coding skills", description: "Facilis soluta delectus sunt ut id temporibus, eaque architecto magni maxime fugiat eum cumque." },
    { id: 4, title: "Understanding the JavaScript event loop", description: "Numquam aspernatur dolore maiores quasi natus! Consequuntur animi libero explicabo autem." },
    { id: 5, title: "Why you should learn TypeScript", description: "Doloribus nemo eos, quas obcaecati maxime voluptatum! Similique, delectus! Dignissimos, nostrum?" },
    { id: 6, title: "The future of web development", description: "Rerum, atque provident! Fugiat optio, repellat ex tempore architecto consectetur!" },
    { id: 7, title: "Building scalable applications", description: "Aperiam cumque necessitatibus quibusdam? Quidem, quia? Deserunt perferendis maxime voluptates." },
    { id: 8, title: "Mastering React hooks", description: "Quasi voluptates, architecto delectus maiores veritatis ipsam dolor beatae explicabo rem." },
    { id: 9, title: "Effective debugging techniques", description: "Voluptatibus commodi adipisci molestias ea reprehenderit alias libero iusto praesentium?" },
    { id: 10, title: "Exploring the Node.js ecosystem", description: "Veniam atque cum odio quos, maiores ad dolore optio distinctio." },
  ];

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const filteredCertificates = certificateData.filter((certificate) => certificate.title.toLowerCase().includes(searchTerm.toLowerCase()));

  const totalPages = Math.ceil(filteredCertificates.length / itemsPerPage);
  const currentCertificates = filteredCertificates.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleClickViewSertificate = (id) => {
    navigate(`/profile/sertifikat/${id}`);
  };

  return (
    <div className="w-screen px-4 xl:pl-10 xl:pr-16">
      <div className="flex justify-start mb-8">
        <input type="text" placeholder="Search by title..." value={searchTerm} onChange={handleSearchChange} className="w-full bg-white dark:bg-black dark:text-neutral-200 p-2 border border-gray-400 rounded" />
      </div>
      {currentCertificates.length > 0 ? (
        currentCertificates.map((certificate, index) => (
          <div key={index} className="bg-white dark:bg-slate-800 grid gap-0 grid-cols-12 max-w-full w-full border border-gray-400 dark:border-none rounded-lg p-2 md:p-4 mb-4">
            <div className="col-span-12 md:col-span-2 mx-auto">
              <img src={NodeJsImage} className="h-auto w-full lg:w-40 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l overflow-hidden" />
            </div>
            <div className="col-span-12 md:col-span-10 gap-1 md:gap-2 xl:gap-4 rounded-b lg:rounded-b-none lg:rounded-r xl:p-4 flex flex-col justify-between leading-normal text-justify">
              <div className="text-left py-1 text-wrap">
                <div className="text-left text-gray-900 dark:text-neutral-200 font-bold text-xl mb-2">{certificate.title}</div>
                <p className="text-gray-700 dark:text-neutral-200 text-base">{certificate.description}</p>
              </div>
              <div className="flex gap-2">
                <button className="flex bg-white dark:bg-slate-800 text-brand-500 border border-brand-500  gap-2" onClick={() => handleClickViewSertificate(certificate.id)}>
                  <LuView size={25} />
                  View Certificate
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
        <div className="bg-white dark:bg-brand2 max-w-full w-full border border-gray-400 dark:border-none rounded-lg p-4 mb-4">
          <div className="text-center h-[70vw] md:h-[20vw] text-gray-900 dark:text-neutral-200 font-bold text-xl">Data not found</div>
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
