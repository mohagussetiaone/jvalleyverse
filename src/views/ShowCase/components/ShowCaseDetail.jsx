import { Link } from "react-router-dom";
import { FaEye, FaGithub } from "react-icons/fa";
import { handleGetShowCaseById } from "@/api/ShowCase/ShowCaseApi";
import NotFound from "@/views/NotFound";
import Loading from "@/components/Loading";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import DefaultProfile from "@/assets/profile/profileDefault.jpg";
import { useParams } from "react-router-dom";
import { useAuthValidation } from "@/lib/authValidation";

const ShowCaseDetail = () => {
  useAuthValidation();
  const { showCaseId } = useParams();

  // GET ALL SHOWCASE
  const {
    error: errorShowCaseById,
    isPending: isPendingShowCaseById,
    data: dataShowCaseById,
  } = useQuery({
    queryKey: ["getShowCaseById", showCaseId],
    queryFn: () => handleGetShowCaseById(showCaseId),
    enabled: !!showCaseId,
  });

  if (errorShowCaseById) {
    return <NotFound />;
  }

  if (isPendingShowCaseById) {
    return <Loading />;
  }

  console.log("dataShowCaseById", dataShowCaseById);

  return (
    <section className="body-font overflow-hidden bg-white dark:bg-primaryDark">
      <div className="container py-10 mx-auto">
        <div className="mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full md:pr-4">
            <div className="sticky top-4">
              <img alt="ecommerce" className="w-full h-auto object-cover object-center rounded border border-gray-200" src={`${import.meta.env.VITE_CDN_GET_IMAGE}/jvalleyverseImg/${dataShowCaseById?.show_case_img_url}`} />
            </div>
          </div>
          <div className="lg:w-1/2 w-full lg:pl-6 mt-6 lg:mt-0 text-black dark:text-neutral-200">
            <h1 className="text-3xl title-font font-medium mb-1">{dataShowCaseById?.name}</h1>
            <div className="py-2">
              <div className="flex text-sm gap-2">
                <img
                  src={dataShowCaseById?.users?.profile_image_url !== null ? `${import.meta.env.VITE_CDN_GET_IMAGE}/jvalleyverseImg/${dataShowCaseById?.users?.profile_image_url}` : DefaultProfile}
                  alt="profile.jpg"
                  className="w-6 h-6 rounded-full"
                />
                <h3>{dataShowCaseById?.users?.name}</h3>
                <h6 className="text-gray-900 dark:text-neutral-200">| Dipublikasikan pada: {dayjs(dataShowCaseById?.created_at).fromNow()}</h6>
              </div>
            </div>
            <p className="text-base font-normal text-justify">{dataShowCaseById?.description}</p>
            <div className="mt-4">
              <div className="mb-2">
                <h2 className="text-gray-900 dark:text-neutral-200 title-font font-medium">Teknologi yang dipakai :</h2>
              </div>
              {dataShowCaseById.tech.map((tech, index) => (
                <span key={index} className="bg-gray-300 dark:bg-secondaryDark text-black dark:text-neutral-200 text-xs font-semibold mr-2 px-3 py-2 rounded">
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex gap-4 mt-4 md:mt-6">
              <Link
                to={dataShowCaseById.url_preview}
                target="_blank"
                className="flex gap-2 mt-6 text-gray-900 dark:text-brand-500 bg-white dark:bg-transparent hover:bg-gray-100 hover:text-black border border-black dark:border-brand-500 py-2 px-8 focus:outline-none  rounded text-lg"
              >
                <FaEye className="w-5 h-5 mt-1" />
                Preview
              </Link>
              <Link to={dataShowCaseById.url_github} target="_blank" className="flex gap-2 mt-6 text-white bg-black dark:bg-brand-700 border-0 py-2 px-8 focus:outline-none hover:bg-black/90 hover:text-white rounded text-lg">
                <FaGithub className="w-5 h-5 mt-1" />
                Github
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowCaseDetail;
