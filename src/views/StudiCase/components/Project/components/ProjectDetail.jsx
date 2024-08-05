import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import YoutubeImage from "@/assets/tech/youtube.png";
import GithubImage from "@/assets/tech/githubDark.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { handleGetProjectDetail } from "@/api/Project/ProjectApi";
import ErrorServer from "@/components/ErrorServer";
import { useTranslation } from "react-i18next";
import { useCheckSession } from "@/api/Auth/CheckSession";
import { handleAddEnrollments } from "@/api/Enrollments/EnrollmentProject";
import DetailCardProductSkeleton from "@/components/loading/DetailCardProductSkeleton";

const ProjectDetail = () => {
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

  console.log("dataProjectDetails", dataProjectDetails);

  useEffect(() => {
    if (projectId) {
      queryClient.invalidateQueries(["getProjectDetail"]);
    }
  }, [projectId]);

  if (errorProjectDetail || errorSession) {
    <ErrorServer />;
  }

  if (isPendingProjectDetail) {
    return <DetailCardProductSkeleton />;
  }

  const handleStarter = async (id) => {
    try {
      navigate(`/belajar/project/${projectId}/chapter/16`);
      if (dataSession?.session === null) {
        return;
      }
      const response = await handleAddEnrollments({
        project_id: id,
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
          <div className="flex text-start flex-col text-black bg-white dark:bg-black p-2 md:p-4 xl:p-6 rounded-lg">
            <div className="mb-6 dark:text-neutral-200">
              <h4 className="text-3xl font-bold">{dataProjectDetails?.project_name}</h4>
              <p className="text-justify">{dataProjectDetails?.project_description}</p>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-0 md:gap-4 xl:gap-6">
              <div className="col-span-2 bg-gray-200 dark:bg-neutral-800 text-start flex-col rounded-lg p-4 mb-2">
                <div className="flex flex-col text-center gap-2 dark:text-neutral-200">
                  <h4 className="text-3xl font-bold">{t("Siap untuk memulai professional?")}</h4>
                  <p className="">{t("Lacak progres Anda, tonton dengan cermat, memulai belajar dengan mudah")}</p>
                  <button className="text-white mt-4" onClick={() => handleStarter(dataProjectDetails?.id)}>
                    {t("Mulai Sekarang")}
                  </button>
                </div>
              </div>
              <div className="col-span-1 my-4 md:my-0">
                <div className="flex gap-4 justify-center">
                  <Link
                    to={dataProjectDetails?.project_github}
                    target="_blank"
                    className="flex w-[140px] bg-whiteSmoke text-black hover:text-gray-900 flex-col items-center gap-2 justify-center border border-gray-500 rounded-lg px-1 md:py-3 cursor-pointer"
                  >
                    <img src={GithubImage} className="w-14" alt="Source Code" />
                    <p>Source Code</p>
                  </Link>
                  <Link
                    to={dataProjectDetails?.project_youtube_playlist}
                    target="_blank"
                    className="flex w-[140px] bg-whiteSmoke text-black hover:text-gray-900 flex-col items-center gap-2 justify-center border border-gray-500 rounded-lg px-1 md:py-3 cursor-pointer"
                  >
                    <img src={YoutubeImage} className="w-14" alt="Discord" />
                    <p>Youtube Playlist</p>
                  </Link>
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
