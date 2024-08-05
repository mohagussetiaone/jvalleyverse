import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorServer from "@/components/ErrorServer";
import Loading from "@/components/Loading";
import { useQuery } from "@tanstack/react-query";
import { useCheckSession } from "@/api/Auth/CheckSession";
import { handleGetShowCaseByUserId } from "@/api/ShowCase/ShowCaseApi";
import dayjs from "dayjs";
import { TruncateText } from "@/lib/TruncateText";

const Card = ({ item }) => {
  const navigate = useNavigate();
  const handleShowCaseDetail = (id) => {
    navigate(`/show-case/${id}`);
  };

  return (
    <div
      className="flex flex-col items-center bg-white  border border-gray-200 rounded-lg shadow md:flex-row md:max-w-2xl hover:bg-gray-100 cursor-pointer dark:border-gray-900 dark:bg-gray-800 dark:hover:bg-slate-600"
      onClick={() => handleShowCaseDetail(item.id)}
    >
      <div className="w-full min-w-[11rem] md:w-44 xl:w-52 md:h-32 xl:h-44">
        <img className="w-full h-full object-contain rounded-t-lg md:rounded-none md:rounded-s-lg" src={`${import.meta.env.VITE_CDN_GET_IMAGE}/jvalleyverseImg/${item.show_case_img_url}`} alt={item.name} />
      </div>
      <div className="flex flex-col p-4">
        <div className="flex flex-col justify-betweenleading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.name}</h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{TruncateText(item.description, 145)}</p>
        </div>
        <div className="flex items-center">
          <img className="w-10 h-10 rounded-full mr-4" src={`${import.meta.env.VITE_CDN_GET_IMAGE}/jvalleyverseImg/${item.users.profile_image_url}`} alt="Avatar of Jonathan Reinink" />
          <div className="text-sm">
            <p className="text-gray-600 leading-none">{item.users.name}</p>
            <p className="text-gray-600">{dayjs(item.created_at).format("DD MMM YY")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4); // 4 items per page
  const [selectedCategory, setSelectedCategory] = useState("");

  // GET SESSION
  const {
    isLoading: isLoadingSession,
    error: errorSession,
    data: dataSession,
  } = useQuery({
    queryKey: ["getSession"],
    queryFn: useCheckSession,
  });

  console.log("dataSession", dataSession);

  // GET ALL SHOWCASE
  const {
    error: errorShowCaseByUserId,
    isPending: isPendingShowCaseByUserId,
    data: dataShowCaseByUserId,
  } = useQuery({
    queryKey: ["getShowCaseByUserId"],
    queryFn: () => handleGetShowCaseByUserId(dataSession?.session?.user.id),
    enabled: !!dataSession?.session?.user?.id,
  });

  console.log("dataShowCaseByUserId", dataShowCaseByUserId);

  if (errorShowCaseByUserId || errorSession) {
    return <ErrorServer />;
  }

  if (isPendingShowCaseByUserId || isLoadingSession) {
    return <Loading />;
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  const filteredData = dataShowCaseByUserId?.filter((item) => {
    return (
      (item?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) || item?.description.toLowerCase()?.includes(searchTerm?.toLowerCase())) && (selectedCategory === "" || item?.category_show_case?.category_name === selectedCategory)
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="bg-white dark:bg-gradient-to-r from-black via-background-900 to-background-600 mx-auto min-h-screen p-6">
      <div className="flex justify-between">
        <div>
          <h3 className="text-xl md:text-2xl dark:text-neutral-200">Show case anda</h3>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between py-4">
        <div>
          <input id="search" name="search" type="text" value={searchTerm} onChange={handleSearch} placeholder="Search..." className="mb-4 p-2 dark:bg-transparent border border-gray-300 rounded w-full" />
        </div>
        <div>
          <select value={selectedCategory} onChange={handleCategoryChange} className="mb-4 p-2 border border-gray-300 dark:bg-transparent cursor-pointer dark:text-neutral-200 rounded w-full">
            <option value="">All Categories</option>
            <option value="Fullstack">Fullstack</option>
            <option value="Backend">Backend</option>
            <option value="Front End">Front End</option>
            <option value="UI/UX">UI/UX</option>
            <option value="Testing">Testing</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentItems.length > 0 ? currentItems.map((item) => <Card key={item.id} item={item} />) : <div className="col-span-2 h-80 flex items-center justify-center text-center text-gray-500">Data Not Found</div>}
      </div>
      <div className="flex justify-center">
        <div className="flex justify-between mt-4">
          <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="mx-1 px-3 py-1 border rounded bg-white disabled:opacity-50">
            Prev
          </button>
          <div>
            {Array.from({ length: totalPages }, (_, index) => (
              <button key={index} onClick={() => setCurrentPage(index + 1)} className={`mx-1 px-3 py-1 border rounded ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-white"}`}>
                {index + 1}
              </button>
            ))}
          </div>
          <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="mx-1 px-3 py-1 border rounded bg-white disabled:opacity-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
