import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleGetShowCase } from "@/api/ShowCase/ShowCaseApi";
import ErrorServer from "@/components/ErrorServer";
import Loading from "@/components/Loading";
import DataNotFound from "@/components/DataNotFound";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { MdAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import Pagination from "@/components/pagination/ReactPaginate";

const Card = ({ item }) => {
  const navigate = useNavigate();
  const handleShowCaseDetail = (id) => {
    navigate(`/show-case/${id}`);
  };

  return (
    <div
      className="flex flex-col md:items-start bg-white  border border-gray-200 rounded-lg shadow xl:flex-row md:max-w-2xl hover:bg-gray-100 cursor-pointer dark:border-secondaryDark dark:bg-secondaryDark/20"
      onClick={() => handleShowCaseDetail(item.id)}
    >
      <div className="w-full min-w-[11rem] xl:w-52 xl:h-44">
        <img className="w-full h-full sm:h-48 object-contain rounded-t-lg md:rounded-none md:rounded-s-lg" src={`${import.meta.env.VITE_CDN_GET_IMAGE}/jvalleyverseImg/${item.show_case_img_url}`} alt={item.name} />
      </div>
      <div className="flex flex-col p-4">
        <div className="flex flex-col justify-between leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-left">{item.name}</h5>
          <p className="mb-3 line-clamp-2 whitespace-normal font-normal text-gray-700 dark:text-neutral-200 text-left truncate">{item.description}</p>
        </div>
        <div className="flex items-center">
          <img className="w-10 h-10 rounded-full mr-4" src={`${import.meta.env.VITE_CDN_GET_IMAGE}/jvalleyverseImg/${item.users.profile_image_url}`} alt="Avatar of Jonathan Reinink" />
          <div className="text-sm text-left">
            <p className="text-neutral-200 leading-none">{item.users.name}</p>
            <p className="text-neutral-200">{dayjs(item.created_at).format("DD MMM YY")}</p>
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

  // GET ALL SHOWCASE
  const {
    error: errorShowCase,
    isPending: isPendingShowCase,
    data: dataShowCase,
  } = useQuery({
    queryKey: ["getShowCase"],
    queryFn: handleGetShowCase,
  });

  if (errorShowCase) {
    return <ErrorServer />;
  }

  if (isPendingShowCase) {
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

  const filteredData = dataShowCase.filter((item) => {
    return (
      (item?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) || item?.description.toLowerCase()?.includes(searchTerm?.toLowerCase())) && (selectedCategory === "" || item?.category_show_case?.category_name === selectedCategory)
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageClick = (page) => {
    setCurrentPage(page.selected + 1);
  };

  return (
    <div className="bg-white dark:bg-primaryDark mx-auto min-h-screen p-6">
      <div className="flex justify-between">
        <div>
          <h3 className="text-xl md:text-2xl dark:text-neutral-200">Show kiriman anggota</h3>
        </div>
        <Link to="/show-case/buat-show-case">
          <button className="flex items-center bg-brand-500 hover:bg-brand-700 text-white font-bold py-2 px-4 rounded-lg">
            <MdAdd className="mr-2" />
            Tambah
          </button>
        </Link>
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{currentItems.length > 0 ? currentItems.map((item) => <Card key={item.id} item={item} />) : <DataNotFound />}</div>
      <div className="flex justify-center">
        <div className="flex justify-center items-center py-4">
          <Pagination totalPages={totalPages} handlePageClick={handlePageClick} />
        </div>
      </div>
    </div>
  );
};

export default Index;
