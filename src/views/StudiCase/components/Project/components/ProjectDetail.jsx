import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MdArrowForward } from "react-icons/md";
import { useAuthValidation } from "@/lib/authValidation";
import { useCheckSession } from "@/api/Auth/CheckSession";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { handleGetProjectDetail } from "@/api/Project/ProjectApi";
import { handleAddEnrollments } from "@/api/Enrollments/EnrollmentProject";
import ProjectSource from "./ProjectSource";
import ReviewProject from "./ReviewProject";
import ErrorServer from "@/components/ErrorServer";
import DetailCardProductSkeleton from "@/components/loading/DetailCardProductSkeleton";

const ProjectDetail = () => {
  useAuthValidation();

  const navigate = useNavigate();
  const { projectId } = useParams();
  const { t } = useTranslation();
  const [isIframeError, setIsIframeError] = useState(false);

  // GET SESSION
  const {
    isLoading: isLoadingSession,
    error: errorSession,
    data: dataSession,
  } = useQuery({
    queryKey: ["getSession"],
    queryFn: useCheckSession,
  });

  // GET PROJECT DETAILS
  const {
    error: errorProjectDetail,
    isPending: isPendingProjectDetail,
    data: dataProjectDetails,
  } = useQuery({
    queryKey: ["getProjectDetail", projectId],
    queryFn: () => handleGetProjectDetail(projectId),
    enabled: !!projectId,
  });

  console.log("data Project Detail", dataProjectDetails);

  if (errorProjectDetail || errorSession) {
    <ErrorServer />;
  }

  if (isPendingProjectDetail || isLoadingSession) {
    return <DetailCardProductSkeleton />;
  }

  const handleStarter = async () => {
    try {
      const firstChapterDetail = dataProjectDetails.chapter_projects[0].chapter_details[0];
      const chapterId = firstChapterDetail.id;
      navigate(`/belajar/project/${projectId}/chapter/${chapterId}`);
      if (dataSession?.session === null) {
        return;
      }
      const response = await handleAddEnrollments({
        project_id: projectId,
        user_id: dataSession?.session?.user?.id,
      });
      return response;
    } catch (error) {
      throw new Error(error);
    }
  };
  console.log("isIframeError", isIframeError);

  return (
    <>
      <div className="w-full px-2 md:px-4 h-full py-6 dark:bg-primaryDark flex flex-col">
        <div className="flex justify-center items-center h-auto md:h-auto md:min-w-[300px] xl:min-w-[400px] mb-4">
          {/* <iframe src={dataProjectDetails?.project_youtube_embed} frameBorder="0" allowFullScreen className="w-full h-[40vh] md:h-[400px] xl:h-[500px]"></iframe> */}
          {isIframeError ? (
            // Tampilkan gambar error ketika iframe gagal dimuat
            <h2>Error cuy</h2>
          ) : (
            // Tampilkan iframe jika tidak ada error
            <iframe src={dataProjectDetails?.project_youtube_embed} frameBorder="0" allowFullScreen className="w-full h-[40vh] md:h-[400px] xl:h-[500px]" onError={() => setIsIframeError(true)}></iframe>
          )}
        </div>

        <div className="w-full flex flex-col gap-4">
          <div className="flex gap-6 text-start flex-col text-black bg-white dark:bg-black p-2 md:p-4 xl:p-6 rounded-lg">
            <div className="dark:text-neutral-200">
              <h4 className="text-3xl font-bold pb-4">{dataProjectDetails?.project_name}</h4>
              <p className="text-justify">{dataProjectDetails?.project_description}</p>
            </div>
            <div>
              <button className="text-white bg-brand-500" onClick={handleStarter}>
                {t("Mulai Sekarang")}
              </button>
            </div>
            {/* <div className="flex flex-col">
              <div className="grid-cols-6 mx-auto bg-gray-100 dark:bg-neutral-800 text-start flex-col rounded-lg p-4 mb-2">
                <div className="flex flex-col text-center gap-2 dark:text-neutral-200">
                  <h4 className="text-3xl font-bold">{t("Siap untuk memulai professional?")}</h4>
                  <p className="">{t("Lacak progres Anda, tonton dengan cermat, memulai belajar dengan mudah")}</p>
                  <button className="text-white bg-brand-500 mt-4" onClick={handleStarter}>
                    {t("Mulai Sekarang")}
                  </button>
                </div>x
              </div>
            </div> */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
              <div className="col-span-1">
                <ProjectSource dataProjectDetails={dataProjectDetails} />
              </div>
              <div className="col-span-1 mt-8 md:mt-0">
                <ReviewProject />
                <div className="flex justify-end pt-6 px-4">
                  <button className="flex text-white bg-brand-500 p-1 text-sm" onClick={() => navigate(`/belajar/project/${projectId}/reviews`)}>
                    Lihat lengkap
                    <MdArrowForward className="flex w-4 h-4 items-center justify-center mt-0.5 mx-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetail;
