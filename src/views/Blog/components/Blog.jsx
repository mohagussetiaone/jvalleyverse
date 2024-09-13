import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/Loading";
import ErrorServer from "@/components/ErrorServer";
import { handleGetBlogs } from "@/api/Blog/BlogApi";
import dayjs from "dayjs";

const Blog = () => {
  const navigate = useNavigate();

  // GET ALL BLOGS
  const {
    error: errorBlogs,
    isPending: isPendingBlogs,
    data: dataBlogs,
  } = useQuery({
    queryKey: ["getBlogs"],
    queryFn: handleGetBlogs,
  });

  console.log("dataBlogs", dataBlogs);

  function handleDetailBlog(id) {
    navigate(`/blog/${id}`);
  }

  if (isPendingBlogs) <Loading />;
  if (errorBlogs) <ErrorServer />;

  return (
    <div className="w-full mx-auto px-14 py-4 bg-gray-200 dark:bg-background-900 dark:text-neutral-200">
      {dataBlogs &&
        dataBlogs.map((blog, index) => (
          <div key={index}>
            {index === 0 && (
              <div className={`shadow-lg bg-white rounded-lg dark:bg-gradient-to-r from-background-600 via-background-700 to-background-800 p-6 cursor-pointer ${index === 0 ? "mb-6" : "mb-4"}`}>
                <div className="relative overflow-hidden">
                  <img src={blog.cover_img_url} alt="banner.img" className="w-full h-[350px] object-cover" />
                </div>
                <div className="flex flex-col text-gray-800 dark:text-neutral-200">
                  <h2 className="text-2xl font-medium py-2 line-clamp-2" onClick={() => handleDetailBlog(blog.id)}>
                    {blog.title}
                  </h2>
                  <div className="flex items-center text-sm gap-2 text-gray-800 dark:text-neutral-200 py-2">
                    <p>{blog.authors.name}</p>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-gray-800 dark:bg-neutral-200 dark:text-neutral-200 mt-1"></span>
                    <p>{dayjs(blog.created_at).format("DD MMM YYYY HH:MM")}</p>
                  </div>
                  <p className="line-clamp-2">{blog.content}</p>
                </div>
              </div>
            )}
          </div>
        ))}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {dataBlogs &&
          dataBlogs.slice(1).map((blog) => (
            <div key={blog.id} className="flex flex-col md:flex-row md:items-start rounded-lg xl:flex-row cursor-pointer bg-white dark:bg-gradient-to-r from-background-600 via-background-700 to-background-800">
              <div className="w-full min-w-[11rem] xl:w-52 xl:h-44 relative overflow-hidden">
                <img className="w-full h-full object-contain rounded-t-lg md:rounded-none md:rounded-s-lg transition-transform duration-300 ease-in-out transform hover:scale-110" src={blog.cover_img_url} alt="blog.img" />
              </div>
              <div className="flex flex-col justify-center h-full p-4 align-middle text-black dark:text-neutral-200">
                <h2 className="text-2xl line-clamp-2 overflow-hidden text-ellipsis font-medium py-2 text-start" onClick={() => handleDetailBlog(blog.id)}>
                  {blog.title}
                </h2>
                <div className="text-sm gap-2 text-gray-800 dark:text-neutral-200 py-2">
                  <div className="flex gap-2">
                    <p>{blog.authors.name}</p>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-gray-800 dark:bg-neutral-200 dark:text-neutral-200 mt-2"></span>
                    <p>{dayjs(blog.created_at).format("DD MMM YYYY HH:MM")}</p>
                  </div>
                </div>
                <p className="line-clamp-2">{blog.content}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Blog;
