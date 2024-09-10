import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import ErrorServer from "@/components/ErrorServer";
import { useCheckSession } from "@/api/Auth/CheckSession";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { handleGetProjectDetail } from "@/api/Project/ProjectApi";
import { handleAddEnrollments } from "@/api/Enrollments/EnrollmentProject";
import DetailCardProductSkeleton from "@/components/loading/DetailCardProductSkeleton";
import ProjectSource from "./ProjectSource";
import ReviewProject from "./ReviewProject";
import { useAuthValidation } from "@/lib/authValidation";

const ProjectDetail = () => {
  useAuthValidation();

  const navigate = useNavigate();
  const { projectId } = useParams();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

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
    queryKey: ["getProjectDetail"],
    queryFn: () => handleGetProjectDetail(projectId),
    enabled: !!projectId,
  });

  console.log("data Project Detail", dataProjectDetails);

  useEffect(() => {
    if (projectId) {
      queryClient.invalidateQueries(["getProjectDetail"]);
    }
  }, [projectId]);

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

  return (
    <>
      <div className="w-full px-2 md:px-4 h-full py-6 dark:bg-background-500 flex flex-col">
        <div className="flex justify-center md:min-w-[300px] h-auto md:h-[100vh] xl:min-w-[400px] md:w-full mb-4 md:mb-4">
          <iframe src={dataProjectDetails?.project_youtube_embed} frameBorder="0" allowFullScreen className="w-full h-full"></iframe>
        </div>
        <div className="w-full flex flex-col gap-4">
          <div className="flex gap-6 text-start flex-col text-black bg-white dark:bg-black p-2 md:p-4 xl:p-6 rounded-lg">
            <div className="mb-6 dark:text-neutral-200">
              <h4 className="text-3xl font-bold">{dataProjectDetails?.project_name}</h4>
              <p className="text-justify">{dataProjectDetails?.project_description}</p>
            </div>
            <div className="flex flex-col">
              <div className="grid-cols-6 mx-auto bg-gray-200 dark:bg-neutral-800 text-start flex-col rounded-lg p-4 mb-2">
                <div className="flex flex-col text-center gap-2 dark:text-neutral-200">
                  <h4 className="text-3xl font-bold">{t("Siap untuk memulai professional?")}</h4>
                  <p className="">{t("Lacak progres Anda, tonton dengan cermat, memulai belajar dengan mudah")}</p>
                  <button className="text-white mt-4" onClick={handleStarter}>
                    {t("Mulai Sekarang")}
                  </button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-6 pt-8">
              <div className="col-span-3">
                <ProjectSource dataProjectDetails={dataProjectDetails} />
              </div>
              <div className="col-span-3">
                <ReviewProject />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetail;
