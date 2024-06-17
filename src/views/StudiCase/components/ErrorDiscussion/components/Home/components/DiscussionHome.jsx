import { useState } from "react";

const randomData = [
  {
    id: 1,
    answers: 2,
    votes: 2,
    question: "What is Lorem Ipsum?",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    tags: ["Javascript", "React", "Redux"],
    date: "02 Feb 2022 14:03",
    avatar: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1716887986~exp=1716891586~hmac=729888601cee5f142cdae9e83d1f720240b371d5c32f368bba67fc6278e7197b&w=740",
  },
  {
    id: 2,
    answers: 3,
    votes: 5,
    question: "How does React work?",
    description: "React makes it painless to create interactive UIs.",
    tags: ["React", "UI", "Frontend"],
    date: "15 Mar 2023 10:15",
    avatar: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1716887986~exp=1716891586~hmac=729888601cee5f142cdae9e83d1f720240b371d5c32f368bba67fc6278e7197b&w=740",
  },
  {
    id: 3,
    answers: 1,
    votes: 4,
    question: "What is useState in React?",
    description: "useState is a Hook that lets you add state to functional components.",
    tags: ["React", "Hooks"],
    date: "10 Jan 2023 09:30",
    avatar: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1716887986~exp=1716891586~hmac=729888601cee5f142cdae9e83d1f720240b371d5c32f368bba67fc6278e7197b&w=740",
  },
  {
    id: 4,
    answers: 2,
    votes: 3,
    question: "What is JavaScript?",
    description: "JavaScript is a programming language that conforms to the ECMAScript specification.",
    tags: ["Javascript", "Programming"],
    date: "25 Dec 2022 15:45",
    avatar: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1716887986~exp=1716891586~hmac=729888601cee5f142cdae9e83d1f720240b371d5c32f368bba67fc6278e7197b&w=740",
  },
  {
    id: 5,
    answers: 5,
    votes: 7,
    question: "How to use CSS Grid?",
    description: "CSS Grid Layout is a two-dimensional layout system for the web.",
    tags: ["CSS", "Grid", "Web Design"],
    date: "05 May 2023 12:00",
    avatar: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1716887986~exp=1716891586~hmac=729888601cee5f142cdae9e83d1f720240b371d5c32f368bba67fc6278e7197b&w=740",
  },
  {
    id: 6,
    answers: 2,
    votes: 6,
    question: "What is a REST API?",
    description: "REST is an architectural style for designing networked applications.",
    tags: ["API", "REST", "Backend"],
    date: "22 Apr 2023 16:20",
    avatar: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1716887986~exp=1716891586~hmac=729888601cee5f142cdae9e83d1f720240b371d5c32f368bba67fc6278e7197b&w=740",
  },
  {
    id: 7,
    answers: 4,
    votes: 8,
    question: "How to manage state in React?",
    description: "State management in React can be done using various tools like useState, Context API, and Redux.",
    tags: ["React", "State Management"],
    date: "30 Jun 2023 08:45",
    avatar: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1716887986~exp=1716891586~hmac=729888601cee5f142cdae9e83d1f720240b371d5c32f368bba67fc6278e7197b&w=740",
  },
  {
    id: 8,
    answers: 3,
    votes: 2,
    question: "What is TypeScript?",
    description: "TypeScript is a strongly typed programming language that builds on JavaScript.",
    tags: ["TypeScript", "Javascript", "Programming"],
    date: "14 Aug 2023 13:55",
    avatar: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1716887986~exp=1716891586~hmac=729888601cee5f142cdae9e83d1f720240b371d5c32f368bba67fc6278e7197b&w=740",
  },
  {
    id: 9,
    answers: 1,
    votes: 1,
    question: "What is Node.js?",
    description: "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.",
    tags: ["Node.js", "Backend", "Javascript"],
    date: "18 Sep 2023 11:10",
    avatar: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1716887986~exp=1716891586~hmac=729888601cee5f142cdae9e83d1f720240b371d5c32f368bba67fc6278e7197b&w=740",
  },
  {
    id: 10,
    answers: 5,
    votes: 10,
    question: "How to optimize React performance?",
    description: "Optimizing performance in a React application can be achieved through various techniques.",
    tags: ["React", "Performance", "Optimization"],
    date: "02 Oct 2023 17:25",
    avatar: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1716887986~exp=1716891586~hmac=729888601cee5f142cdae9e83d1f720240b371d5c32f368bba67fc6278e7197b&w=740",
  },
];

const ITEMS_PER_PAGE = 5;

const DiscussionHome = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = randomData.filter(
    (item) => item.question.toLowerCase().includes(searchTerm.toLowerCase()) || item.description.toLowerCase().includes(searchTerm.toLowerCase()) || item.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
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

  return (
    <>
      <div className="w-full bg-white dark:bg-brand2 text-black dark:text-neutral-200 border-y-2 border-gray-300 rounded-lg">
        <div className="bg-white dark:bg-black/20 rounded-lg">
          <div className="flex flex-col gap-2 xl:gap-4 px-2 md:px-4 xl:px-6 py-4">
            <div className="flex justify-between mb-2">
              <div>
                <h3 className="font-semibold text-md md:text-xl">Semua Pertanyaan</h3>
              </div>
              <div>
                <button className="bg-blue-500 dark:bg-black/50 text-white px-4 py-1 rounded">Buat Pertanyaan</button>
              </div>
            </div>
            <div className="flex gap-2 flex-col md:flex-row text-start justify-start md:justify-between">
              <div>
                <h3 className="text-sm md:text-lg mt-1">Total {filteredData.length} Pertanyaan</h3>
              </div>
              <div>
                <input className="w-full bg-white dark:bg-brand2 border rounded-md px-3 py-1" type="text" placeholder="Cari Pertanyaan" value={searchTerm} onChange={handleSearchChange} />
              </div>
            </div>
          </div>
          {filteredData.length === 0 ? (
            <div className="text-center py-4 bg-white dark:bg-black/40 h-[calc(100vh-39vh)]">
              <h3 className="mt-24 text-lg md:text-xl">Data Not Found</h3>
            </div>
          ) : (
            displayedData.map((item) => (
              <div key={item.id} className="grid grid-cols-5 border-t-2 px-2 md:px-4">
                <div className="col-span-1 flex flex-col items-center justify-center h-full py-4 relative">
                  <h3>{item.answers} Jawaban</h3>
                  <h3>{item.votes} Vote</h3>
                  <div className="absolute right-0 top-[15%] bottom-[15%] w-[1px] bg-gray-400"></div>
                </div>
                <div className="col-span-4 p-2 xl:p-4">
                  <div className="flex flex-col gap-1 md:gap-2 text-start">
                    <p className="text-lg md:text-2xl">{item.question}</p>
                    <p className="text-sm md:text-base xl:text-lg text-justify">{item.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-between space-x-2 mt-3">
                    <div className="flex gap-2">
                      <div className="flex h-8 gap-2 px-1 md:px-2">
                        {item.tags.map((tag, index) => (
                          <p key={index} className="bg-gray-200 text-gray-800 p-0.5 md:p-1 rounded">
                            {tag}
                          </p>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-1 items-center justify-end">
                      <div>
                        <img className="w-10 h-10 rounded-full" src={item.avatar} alt="Rounded avatar" />
                      </div>
                      <div className="item-center">
                        <h2 className="text-xs">{item.date}</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
          {filteredData.length > 0 && (
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

export default DiscussionHome;
