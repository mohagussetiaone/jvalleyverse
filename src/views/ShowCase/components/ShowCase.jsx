import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const generateRandomData = () => {
  return [
    {
      id: 1,
      title: "Community Garden",
      description: "A project to create a community garden for local residents.",
      img: "https://images.unsplash.com/photo-1544725121-be3bf52e2dc8?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Environment",
    },
    {
      id: 2,
      title: "Street Art Festival",
      description: "A festival celebrating street art and local artists.",
      img: "https://images.unsplash.com/photo-1573165231859-48b6a66b8b1d?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Art",
    },
    {
      id: 3,
      title: "Tech Workshop",
      description: "Workshops teaching basic coding and tech skills to community members.",
      img: "https://images.unsplash.com/uploads/141103282695035fa1380/95cdfeef?q=80&w=2030&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Technology",
    },
    {
      id: 4,
      title: "Community Clean-Up",
      description: "A project to clean up local parks and streets.",
      img: "https://images.unsplash.com/photo-1603566234499-85676f87022f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Environment",
    },
    {
      id: 5,
      title: "Book Exchange Program",
      description: "A program to exchange books among community members.",
      img: "https://images.unsplash.com/photo-1565035812153-a190783dbc09?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Education",
    },
    {
      id: 6,
      title: "Youth Sports League",
      description: "Organizing sports leagues for local youth.",
      img: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Sports",
    },
    {
      id: 7,
      title: "Community Theatre",
      description: "A community theatre project showcasing local talent.",
      img: "https://images.unsplash.com/photo-1541462608143-67571c6738dd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Art",
    },
    {
      id: 8,
      title: "Food Drive",
      description: "A food drive to help those in need in the community.",
      img: "https://plus.unsplash.com/premium_photo-1661544139432-c007a6b9b00b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Charity",
    },
    {
      id: 9,
      title: "Art Classes",
      description: "Free art classes for community members of all ages.",
      img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Art",
    },
    {
      id: 10,
      title: "Music Festival",
      description: "A festival featuring local musicians and bands.",
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "Music",
    },
  ];
};

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
      <div className="relative md:w-44 xl:w-52 md:h-32 xl:h-44">
        <img className="w-full h-full rounded-t-lg md:rounded-none md:rounded-s-lg" src={item.img} alt={item.title} />
      </div>
      <div className="flex flex-col p-4">
        <div className="flex flex-col justify-betweenleading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.title}</h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.description}</p>
        </div>
        <div className="flex items-center">
          <img className="w-10 h-10 rounded-full mr-4" src={item.img} alt="Avatar of Jonathan Reinink" />
          <div className="text-sm">
            <p className="text-gray-600 leading-none">Jonathan Reinink</p>
            <p className="text-gray-600">Aug 18</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Index = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4); // 4 items per page
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    setData(generateRandomData());
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  const filteredData = data.filter((item) => {
    return (item.title.toLowerCase().includes(searchTerm.toLowerCase()) || item.description.toLowerCase().includes(searchTerm.toLowerCase())) && (selectedCategory === "" || item.category === selectedCategory);
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="bg-white dark:bg-gradient-to-tr from-black via-brand2 to-gray-900 mx-auto min-h-screen p-6">
      <div className="flex flex-col md:flex-row justify-between py-4">
        <div className="block md:hidden py-2">
          <h3 className="text-xl md:text-2xl dark:text-neutral-200">Show case Jvalleyverse</h3>
        </div>
        <div>
          <input id="search" name="search" type="text" value={searchTerm} onChange={handleSearch} placeholder="Search..." className="mb-4 p-2 dark:bg-brand2 border border-gray-300 rounded w-full" />
        </div>
        <div className="hidden md:block">
          <h3 className="text-xl md:text-2xl dark:text-neutral-200">Show case Jvalleyverse</h3>
        </div>
        <div>
          <select value={selectedCategory} onChange={handleCategoryChange} className="mb-4 p-2 border border-gray-300 rounded w-full">
            <option value="">All Categories</option>
            <option value="Environment">Environment</option>
            <option value="Art">Art</option>
            <option value="Technology">Technology</option>
            <option value="Education">Education</option>
            <option value="Sports">Sports</option>
            <option value="Charity">Charity</option>
            <option value="Music">Music</option>
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
