import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ErrorServer from "@/components/ErrorServer";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa6";
import { HiOutlineLink } from "react-icons/hi";
import { handleGetDiscussion } from "@/api/Project/DiscussionApi";
import DiscussionSkeleton from "@/components/loading/DiscussionSkeleton";
import { useAuthValidation } from "@/lib/authValidation";

const BlogDetails = () => {
  useAuthValidation();

  const tags = ["React", "JavaScript", "CSS", "HTML", "Node.js"];
  const currentUrl = window.location.href;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    alert("Link copied to clipboard!");
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

  if (errorDiscussion) {
    return <ErrorServer />;
  }

  if (isPendingDiscussion) {
    return <DiscussionSkeleton />;
  }

  console.log("dataDiscussion", dataDiscussion);

  return (
    <div className="grid grid-cols-12 gap-2 md:gap-4 bg-gray-200 dark:bg-gradient-to-r from-background-600 via-background-700 to-background-800 p-6 px-4 md:px-8 xl:px-10">
      <div className="bg-white dark:bg-background-900 col-span-12 xl:col-span-9 p-4 rounded-lg">
        <div>
          <img src="https://images.pexels.com/photos/27308308/pexels-photo-27308308/free-photo-of-lofoten-islands-of-norway.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="banner.img" className="w-full h-[350px]" />
        </div>
        <div className="flex flex-col text-gray-800 dark:text-neutral-200">
          <h2 className="text-5xl font-medium py-3">Lorem ipsum dolor sit amet consectetur</h2>
          <div className="flex items-center text-sm gap-2 text-gray-800 dark:text-neutral-200">
            <p>Moh Agus Setiawan</p>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-gray-800 dark:bg-neutral-200 dark:text-neutral-200 mt-1"></span>
            <p>04 April 2022</p>
          </div>
        </div>
        <div className="mt-8 text-gray-800 dark:text-neutral-200">
          <p className="mt-2 first-letter:text-4xl first-letter:font-bold first-letter:float-left first-letter:mr-2 first-letter:leading-tight">
            An todays rapidly evolving world, staying informed is more crucial than ever. The information we share here aims to empower our readers with knowledge that can drive positive change. By staying up-to-date with the latest trends
            and insights, you not only gain a competitive edge but also contribute to a more informed and connected community.
          </p>
          <p className="mt-4">
            We believe that sharing knowledge is the key to progress. Thats why we are committed to bringing you the most relevant and impactful news. Whether its groundbreaking innovations, critical updates, or inspiring stories, our goal
            is to keep you informed and engaged.
          </p>
          <div className="mt-6">
            <h5 className="text-lg font-medium">Stay Connected</h5>
            <p className="text-justify">
              Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney
              College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes
              from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first
              line of Lorem Ipsum, Lorem ipsum dolor sit amet., comes from a line in section 1.10.32. Where can I get some? There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some
              form, by injected humour, or randomised words which dont look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isnt anything embarrassing hidden in the middle of text. All
              the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model
              sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
            </p>
          </div>
        </div>
      </div>
      <div className="min-h-screen col-span-12 xl:col-span-3 sticky top-14 hidden md:block">
        <div className="flex flex-col gap-4">
          <div className="bg-white dark:bg-black/10 rounded-md">
            <div className="text-start rounded-t-lg p-2 md:pl-4">
              <h3 className="uppercase text-black dark:text-neutral-200">Topik Related</h3>
            </div>
            <div className=" p-2 rounded-b-md">
              {dataDiscussion &&
                dataDiscussion.map((discussion, index) => (
                  <div key={discussion.id} className={`p-2 text-black flex text-start justify-start ${(index + 1) % 5 === 0 ? "border-b border-gray-300" : ""}`}>
                    <ol className="text-sm ">
                      <li className="cursor-pointer">
                        <Link to={`${discussion.id}`} className="text-black font-normal dark:text-neutral-400">
                          {discussion.question}
                        </Link>
                      </li>
                    </ol>
                  </div>
                ))}
            </div>
          </div>
          <div className="p-4 bg-white dark:bg-black/10 rounded-md">
            <div className="pb-4">
              <h3 className="uppercase text-black dark:text-neutral-200">Recomended Topic</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {tags.map((tag, index) => (
                <button key={index} onClick={() => handleTagClick(tag)} className="bg-gray-200 dark:bg-brand3 text-black dark:text-white text-sm px-6 py-2 rounded-2xl hover:cursor-pointer hover:border-none">
                  #{tag}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col bg-white dark:bg-black/10 justify-start gap-4 p-4 rounded-md">
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
