import dayjs from "dayjs";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ErrorServer from "@/components/ErrorServer";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa6";
import { HiOutlineLink } from "react-icons/hi";
import { handleGetDiscussion } from "@/api/Project/DiscussionApi";
import DiscussionSkeleton from "@/components/loading/DiscussionSkeleton";
import { useAuthValidation } from "@/lib/authValidation";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { handleGetBlogById, handleGetBlogs } from "@/api/Blog/BlogApi";

const BlogDetails = () => {
  useAuthValidation();
  const query = useQueryClient();
  const { blogId } = useParams();
  const tags = ["React", "JavaScript", "CSS", "HTML", "Node.js"];
  const currentUrl = window.location.href;

  // GET ALL BLOG
  const {
    error: errorBlog,
    isPending: isPendingBlog,
    data: dataBlog,
  } = useQuery({
    queryKey: ["getBlogById"],
    queryFn: () => handleGetBlogById(blogId),
    enabled: !!blogId,
  });

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
  console.log("data Blog by id", dataBlog);

  useEffect(() => {
    if (blogId) {
      query.invalidateQueries(["getBlogById"]);
    }
  }, [blogId]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    toast.success("Link copied to clipboard!");
  };

  const handleShare = (platform) => {
    let url = "";

    switch (platform) {
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
        break;
      case "twitter":
        url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}`;
        break;
      case "linkedin":
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;
        break;
      default:
        break;
    }

    window.open(url, "_blank");
  };

  const handleTagClick = (tag) => {
    console.log(`Tag clicked: ${tag}`);
  };

  const {
    error: errorDiscussion,
    isPending: isPendingDiscussion,
    data: dataDiscussion,
  } = useQuery({
    queryKey: ["getDiscussion"],
    queryFn: handleGetDiscussion,
  });

  if (errorBlog || errorBlogs || errorDiscussion) {
    return <ErrorServer />;
  }

  if (isPendingBlog || isPendingBlogs || isPendingDiscussion) {
    return <DiscussionSkeleton />;
  }

  console.log("dataDiscussion", dataDiscussion);

  return (
    <div className="grid grid-cols-12 gap-2 md:gap-4 bg-gray-200 dark:bg-primaryDark p-6 px-4 md:px-8 xl:px-10">
      <div className="bg-white dark:bg-secondaryDark/20 col-span-12 xl:col-span-9 p-4 rounded-lg">
        <div>
          <img src={dataBlog?.cover_img_url} alt="banner.img" className="w-full h-[350px]" />
        </div>
        <div className="flex flex-col text-gray-800 dark:text-neutral-200">
          <h2 className="text-5xl font-medium py-3">{dataBlog?.title}</h2>
          <div className="flex items-center text-sm gap-2 text-gray-800 dark:text-neutral-200">
            <p>{dataBlog?.author?.name}</p>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-gray-800 dark:bg-neutral-200 dark:text-neutral-200 mt-1"></span>
            <p>{dayjs(dataBlog?.created_at).format("DD MMM YYYY HH:MM")}</p>
          </div>
        </div>
        <div className="mt-8 text-gray-800 dark:text-neutral-200">
          <p className="mt-2 first-letter:text-4xl first-letter:font-bold first-letter:float-left first-letter:mr-2 first-letter:leading-tight text-justify">{dataBlog?.content}</p>
        </div>
      </div>
      <div className="min-h-screen col-span-12 xl:col-span-3 sticky top-14 hidden md:block">
        <div className="flex flex-col gap-4">
          <div className="bg-white dark:bg-secondaryDark/20 rounded-md">
            <div className="text-start rounded-t-lg p-2 md:pl-4">
              <h3 className="uppercase text-black dark:text-neutral-200">Topik Related</h3>
            </div>
            <div className=" p-2 rounded-b-md">
              {dataBlogs &&
                dataBlogs.map((blog, index) => (
                  <div key={blog.id} className={`p-2 text-black flex text-start justify-start ${(index + 1) % 5 === 0 ? "border-b border-gray-300" : ""}`}>
                    <ol className="text-sm ">
                      <li className="cursor-pointer">
                        <Link to={`/blog/${blog.id}`} className="line-clamp-2 text-black hover:text-black font-normal dark:text-neutral-400">
                          {blog.title}
                        </Link>
                      </li>
                    </ol>
                  </div>
                ))}
            </div>
          </div>
          <div className="p-4 bg-white dark:bg-secondaryDark/20 rounded-md">
            <div className="pb-4">
              <h3 className="uppercase text-black dark:text-neutral-200">Recomended Topic</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {tags.map((tag, index) => (
                <button key={index} onClick={() => handleTagClick(tag)} className="bg-gray-200 dark:bg-secondaryDark text-black dark:text-white text-sm px-6 py-2 rounded-2xl hover:cursor-pointer hover:border-none">
                  #{tag}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col bg-white dark:bg-secondaryDark/20 justify-start gap-4 p-4 rounded-md">
            <div>
              <h3 className="uppercase text-black dark:text-neutral-200">Bagikan</h3>
            </div>
            <div className="flex text-black dark:text-neutral-200 gap-4">
              <span onClick={handleCopyLink} className="cursor-pointer">
                <HiOutlineLink className="w-6 h-6" />
              </span>
              <span onClick={() => handleShare("facebook")} className="cursor-pointer">
                <FaFacebook className="w-6 h-6" />
              </span>
              <span onClick={() => handleShare("twitter")} className="cursor-pointer">
                <FaTwitter className="w-6 h-6" />
              </span>
              <span onClick={() => handleShare("linkedin")} className="cursor-pointer">
                <FaLinkedin className="w-6 h-6" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
