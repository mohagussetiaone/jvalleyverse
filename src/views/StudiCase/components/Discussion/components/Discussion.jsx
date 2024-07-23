import { useState } from "react";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import ReactQuillProvider from "@/components/ReactQuillProvider";
import { handleGetDiscussion } from "@/api/Project/DiscussionApi";
import ErrorServer from "@/components/ErrorServer";
import Loading from "@/components/Loading";
import { Link } from "react-router-dom";
import HtmlParser from "@/lib/HtmlParser";
import { GoProject } from "react-icons/go";
import profileDefault from "@/assets/profile/profileDefault.jpg";

const ITEMS_PER_PAGE = 5;

const Discussion = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showCreateDiscussion, setShowCreateDiscussion] = useState(false);

  // GET ALL DISCUSION
  const {
    error: errorDiscussion,
    isPending: isPendingDiscussion,
    data: dataDiscussion,
  } = useQuery({
    queryKey: ["getDiscussion"],
    queryFn: handleGetDiscussion,
  });

  if (errorDiscussion) {
    return <ErrorServer />;
  }

  if (isPendingDiscussion) {
    return <Loading />;
  }

  const filteredData = dataDiscussion.filter(
    (item) => item?.question?.toLowerCase().includes(searchTerm.toLowerCase()) || item.content.toLowerCase().includes(searchTerm.toLowerCase()) || item?.tags?.some((tag) => tag?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const displayedData = filteredData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDetailQuestion = (id) => {
    navigate(`/belajar/diskusi/${id}`);
  };

  return (
    <>
      <div className="w-full bg-white dark:bg-black/10 text-black dark:text-neutral-200 rounded-lg">
        <div className="bg-white dark:bg-black/20 rounded-lg">
          <div className="flex flex-col gap-2 xl:gap-4 px-2 md:px-4 xl:px-6 py-4">
            <div className="flex justify-between mb-2">
              <div>
                <h3 className="font-semibold text-md md:text-xl">Semua Pertanyaan</h3>
              </div>
              <div>
                <Link to="/belajar/diskusi/buat-pertanyaan" className="border border-brand-500 bg-white text-brand-500 dark:bg-brand2 dark:border-none dark:text-neutral-200 px-4 py-1 rounded" onClick={() => setShowCreateDiscussion(true)}>
                  Buat Pertanyaan
                </Link>
              </div>
            </div>
            {showCreateDiscussion && <ReactQuillProvider showCreateDiscussion={showCreateDiscussion} setShowCreateDiscussion={setShowCreateDiscussion} />}
            <div className="flex gap-2 flex-col md:flex-row text-start justify-start md:justify-between">
              <div>
                <h3 className="text-sm md:text-base mt-1">Total {filteredData.length} Pertanyaan</h3>
              </div>
              <div>
                <input className="w-full bg-white dark:bg-transparent border rounded-md px-3 py-1" type="text" placeholder="Cari Pertanyaan" value={searchTerm} onChange={handleSearchChange} />
              </div>
            </div>
          </div>
          {filteredData.length === 0 ? (
            <div className="text-center py-4 bg-white dark:bg-black/40 h-[calc(100vh-39vh)]">
              <h3 className="mt-24 text-lg md:text-xl">Data Not Found</h3>
            </div>
          ) : (
            displayedData &&
            displayedData.map((item) => (
              <div key={item.id} className="w-full border-t-2 px-2 md:px-4 cursor-pointer" onClick={() => handleDetailQuestion(item.id)}>
                <div className="p-2 xl:p-4">
                  <div className={`flex ${item.project?.project_name ? "justify-between items-start" : "justify-end"} py-2`}>
                    {item?.project?.project_name && (
                      <div className="flex gap-4 justify-start items-center">
                        <h3 className="text-sm whitespace-nowrap">Related Project </h3>
                        <h3 className="flex gap-1 bg-brand-500 text-white dark:bg-black py-1 px-2 rounded-lg whitespace-nowrap">
                          <GoProject className="w-4 h-4 mt-1" />
                          {item?.project?.project_name}
                        </h3>
                      </div>
                    )}
                    <h3>{item?.replies?.length} Jawaban</h3>
                  </div>
                  <div className="flex flex-col gap-1 md:gap-2 text-start">
                    <p className="text-lg md:text-2xl">{item?.question}</p>
                    <HtmlParser htmlString={item?.content} />
                  </div>
                  <div className="flex flex-wrap gap-2 justify-between space-x-2 mt-3">
                    <div className="flex gap-2">
                      <div className="flex h-8 gap-2 px-1 md:px-2">
                        {item.tags.map((tag, index) => (
                          <p key={index} className="bg-gray-200 text-gray-800 p-0.5 md:p-1 rounded">
                            #{tag}
                          </p>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-1 items-center justify-end">
                      <div className="group flex relative">
                        <img className="w-10 h-10 rounded-full" src={item?.avatar || profileDefault} alt="Rounded avatar" />
                        <span className="group-hover:opacity-100 inline-block whitespace-nowrap transition-opacity bg-gray-800 dark:bg-black px-1 text-sm text-gray-100 rounded-md absolute top-0 left-20 -translate-x-1/2 translate-y-full opacity-0 m-4 mx-auto">
                          {item.user.name}
                        </span>
                      </div>
                      <div className="item-center">
                        <h2 className="text-xs">{dayjs(item?.created_at).format("DD MMM YYYY HH:mm")}</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
          {filteredData && filteredData.length > 0 && (
            <div className="flex justify-center py-8 border-t-2 border-gray-200 dark:border-white">
              <button className={`px-3 py-1 mx-1 ${currentPage === 1 ? "bg-gray-300 text-black cursor-not-allowed" : "bg-blue-500 text-white"}`} onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button key={index} className={`px-3 py-1 mx-1 ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`} onClick={() => handlePageChange(index + 1)}>
                  {index + 1}
                </button>
              ))}
              <button
                className={`px-3 py-1 mx-1 ${currentPage === totalPages ? "bg-gray-300 text-black cursor-not-allowed" : "bg-blue-500 text-white"}`}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Discussion;
