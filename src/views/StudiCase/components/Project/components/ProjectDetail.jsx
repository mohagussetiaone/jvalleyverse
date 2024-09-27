import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MdArrowForward } from "react-icons/md";
import { useAuthValidation } from "@/lib/authValidation";
import { useCheckSession } from "@/api/Auth/CheckSession";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { handleGetProjectDetail } from "@/api/Project/ProjectApi";
import { handleAddEnrollments } from "@/api/Enrollments/EnrollmentProject";
import Button from "@/components/ui/Button";
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

  console.log("dataProjectDetails", dataProjectDetails);

  if (errorProjectDetail || errorSession) {
    <ErrorServer />;
  }

  if (isPendingProjectDetail || isLoadingSession) {
    return <DetailCardProductSkeleton />;
  }

  const handleStarter = async () => {
    try {
      // Gabungkan semua `chapter_details` dari setiap `chapter_projects` menjadi satu array
      const allChapterDetails = dataProjectDetails?.chapter_projects?.flatMap((chapter) => chapter.chapter_details) || [];
      // Temukan chapter detail pertama yang `progress: false`
      const firstIncompleteChapter = allChapterDetails.find((detail) => detail.progress === false);
      // Jika tidak ada `progress: false`, temukan chapter detail terakhir yang `progress: true`
      const lastCompleteChapter = allChapterDetails.filter((detail) => detail.progress === true).slice(-1)[0];
      // Tentukan chapterId untuk redirect: `progress: false` jika ada, jika tidak ada pilih `progress: true` terakhir
      const chapterId = firstIncompleteChapter?.id || lastCompleteChapter?.id;
      // Redirect ke chapter yang ditentukan
      if (chapterId) {
        navigate(`/belajar/project/${projectId}/chapter/${chapterId}`);
      }

      // Tambahkan enrollments jika session valid
      if (dataSession?.session !== null) {
        const response = await handleAddEnrollments({
          project_id: projectId,
          user_id: dataSession?.session?.user?.id,
        });
        return response;
      }
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
              <Button onClick={handleStarter}>{t("Mulai Sekarang")}</Button>
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
                  <Link to={`/belajar/project/${projectId}/reviews`}>
                    <Button size="sm" className="flex">
                      {t("Lihat Lengkap")}
                      <MdArrowForward className="flex w-4 h-4 items-center justify-center mt-0.5 mx-1" />
                    </Button>
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
