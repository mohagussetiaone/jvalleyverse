import { useNavigate } from "react-router-dom";

const dummyData = [
  {
    id: 1,
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    author: "Moh Agus Setiawan",
    date: "04 April 2022",
    imgSrc: "https://images.pexels.com/photos/27308308/pexels-photo-27308308/free-photo-of-lofoten-islands-of-norway.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, voluptatum.",
  },
  {
    id: 2,
    title: "Lorem ipsum dolor sit amet consectetur semua bila terjadi akan",
    author: "Moh Agus Setiawan",
    date: "04 April 2022",
    imgSrc: "https://images.pexels.com/photos/27308308/pexels-photo-27308308/free-photo-of-lofoten-islands-of-norway.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, voluptatum.",
  },
  {
    id: 3,
    title: "Lorem ipsum dolor sit amet consectetur semua bila terjadi akan terbiasa bersama mu akan menjadi semua nya akan sirnah",
    author: "Moh Agus Setiawan",
    date: "04 April 2022",
    imgSrc: "https://images.pexels.com/photos/27308308/pexels-photo-27308308/free-photo-of-lofoten-islands-of-norway.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, voluptatum.",
  },
  {
    id: 2,
    title: "Lorem ipsum dolor sit amet consectetur semua bila terjadi akan",
    author: "Moh Agus Setiawan",
    date: "04 April 2022",
    imgSrc: "https://images.pexels.com/photos/27308308/pexels-photo-27308308/free-photo-of-lofoten-islands-of-norway.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, voluptatum.",
  },
  {
    id: 3,
    title: "Lorem ipsum dolor sit amet consectetur semua bila terjadi akan terbiasa bersama mu akan menjadi semua nya akan sirnah",
    author: "Moh Agus Setiawan",
    date: "04 April 2022",
    imgSrc: "https://images.pexels.com/photos/27308308/pexels-photo-27308308/free-photo-of-lofoten-islands-of-norway.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, voluptatum.",
  },
  {
    id: 2,
    title: "Lorem ipsum dolor sit amet consectetur semua bila terjadi akan",
    author: "Moh Agus Setiawan",
    date: "04 April 2022",
    imgSrc: "https://images.pexels.com/photos/27308308/pexels-photo-27308308/free-photo-of-lofoten-islands-of-norway.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, voluptatum.",
  },
  {
    id: 3,
    title: "Lorem ipsum dolor sit amet consectetur semua bila terjadi akan terbiasa bersama mu akan menjadi semua nya akan sirnah",
    author: "Moh Agus Setiawan",
    date: "04 April 2022",
    imgSrc: "https://images.pexels.com/photos/27308308/pexels-photo-27308308/free-photo-of-lofoten-islands-of-norway.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, voluptatum.",
  },
];

const Blog = () => {
  const navigate = useNavigate();

  function handleDetailBlog(id) {
    navigate(`/blog/${id}`);
  }

  return (
    <div className="w-full mx-auto px-14 py-4 bg-gray-200 dark:bg-background-900 dark:text-neutral-200">
      {dummyData.map((blog, index) => (
        <div key={blog.id}>
          {index === 0 && (
            <div className={`shadow-lg bg-white rounded-lg dark:bg-gradient-to-r from-background-600 via-background-700 to-background-800 p-6 cursor-pointer hover:bg-gray-200 ${index === 0 ? "mb-6" : "mb-4"}`}>
              <div className="text-center text-black dark:text-neutral-200">
                <h3 className="text-5xl pb-4">Our News</h3>
                <h6 className="py-8">{blog.description}</h6>
              </div>
              <div className="relative overflow-hidden">
                <img src={blog.imgSrc} alt="banner.img" className="w-full h-[350px] object-cover" />
              </div>
              <div className="flex flex-col text-gray-800 dark:text-neutral-200">
                <h2 className="text-2xl font-medium py-2" onClick={() => handleDetailBlog(blog.id)}>
                  {blog.title}
                </h2>
                <div className="flex items-center text-sm gap-2 text-gray-800 dark:text-neutral-200">
                  <p>{blog.author}</p>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-gray-800 dark:bg-neutral-200 dark:text-neutral-200 mt-1"></span>
                  <p>{blog.date}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dummyData.slice(1).map((blog) => (
          <div key={blog.id} className="flex flex-col md:flex-row md:items-start rounded-lg xl:flex-row cursor-pointer bg-white dark:bg-gradient-to-r from-background-600 via-background-700 to-background-800">
            <div className="w-full min-w-[11rem] xl:w-52 xl:h-44 relative overflow-hidden">
              <img className="w-full h-full sm:h-48 object-contain rounded-t-lg md:rounded-none md:rounded-s-lg transition-transform duration-300 ease-in-out transform hover:scale-110" src={blog.imgSrc} alt="blog.img" />
            </div>
            <div className="flex flex-col justify-center h-full p-4 align-middle text-black dark:text-neutral-200">
              <h2 className="text-2xl line-clamp-3 overflow-hidden text-ellipsis font-medium py-2 text-justify" onClick={() => handleDetailBlog(blog.id)}>
                {blog.title}
              </h2>
              <div className="text-sm gap-2 text-gray-800 dark:text-neutral-200">
                <div className="flex gap-2">
                  <p>{blog.author}</p>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-gray-800 dark:bg-neutral-200 dark:text-neutral-200 mt-2"></span>
                  <p>{blog.date}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
