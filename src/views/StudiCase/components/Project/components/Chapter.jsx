import dayjs from "dayjs";
import toast from "react-hot-toast";
import { useState, useEffect, useCallback } from "react";
import { GrLinkNext } from "react-icons/gr";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import TelegramImage from "@/assets/tech/telegramDark.png";
import DiscordImage from "@/assets/tech/discord.png";
import DiscussionImage from "@/assets/tech/discussion.png";
import DiscussionDarkImage from "@/assets/tech/discussionDark.png";
import useDarkMode from "@/hooks/useDarkMode";
import { handleCheckReview } from "@/api/Review/ReviewProject";
import { handleGetProjectDetail, handleGetChapterById } from "@/api/Project/ProjectApi";
import { updateChapterProgress } from "@/api/Project/ChapterApi";
import { handleCreateCertificate } from "@/api/Certificate/CertificateApi";
import { useCheckSession } from "@/api/Auth/CheckSession";
import { useParams, Link } from "react-router-dom";
import useChapterProject from "@/hooks/useChapterProject";
import { calculateChapterProgress } from "@/utils/calculateProgress";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ReviewCourse from "./ReviewCourse";
import ErrorServer from "@/components/ErrorServer";
import ChapterSkeleton from "./skeleton/ChapterSkeleton";
import { useAuthValidation } from "@/lib/authValidation";

const Chapter = () => {
  useAuthValidation();

  const { t } = useTranslation();
  const { darkMode } = useDarkMode();
  const { dataChapters } = useChapterProject();
  const { projectId, chapterId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showReview, setShowReview] = useState(false);
  const [progress, setProgress] = useState(0);

  console.log("dataChapters", dataChapters);

  // GET SESSION
  const {
    isLoading: isLoadingSession,
    error: errorSession,
    data: dataSession,
  } = useQuery({
    queryKey: ["getSession"],
    queryFn: useCheckSession,
  });

  //  Get check reviews
  const {
    isLoading: isLoadingCheckReview,
    error: errorCheckReview,
    data: dataCheckReview,
  } = useQuery({
    queryKey: ["getCheckReview"],
    queryFn: () => handleCheckReview(dataSession.session.user.id, projectId),
    enabled: !!projectId || !!dataSession,
  });

  console.log("dataCheckReview", dataCheckReview);

  const {
    error: errorChapterDetailById,
    isPending: isPendingChapterDetailById,
    data: dataChapterDetailById,
  } = useQuery({
    queryKey: ["getProjectDetailById"],
    queryFn: () => handleGetChapterById(chapterId),
    enabled: !!chapterId,
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
    if (dataChapters) {
      const newProgress = calculateChapterProgress(dataChapters);
      setProgress(newProgress);
    }
  }, [dataChapters]);

  useEffect(() => {
    queryClient.invalidateQueries(["getProjectDetailById"]);
  }, [chapterId]);

  const findNextChapterId = () => {
    if (!dataChapters || dataChapters.length === 0) return null;
    // Flatten all chapter details into a single array
    const allChapterDetails = dataChapters.flatMap((chapterProject) => chapterProject.chapter_detail);
    // Sort the chapter details by their IDs to maintain order
    allChapterDetails.sort((a, b) => a.id - b.id);
    // Find the current chapter's index
    const currentIndex = allChapterDetails.findIndex((detail) => detail.id === parseInt(chapterId, 10));
    // Determine the next chapter
    const nextChapter = allChapterDetails[currentIndex + 1];
    // Return the next chapter ID or null if it doesn't exist
    return nextChapter ? nextChapter.id : null;
  };

  const nextChapterId = findNextChapterId();

  const handleNextChapter = async () => {
    try {
      console.log("next Chapter path", `/belajar/project/${projectId}/chapter/${nextChapterId}`);
      if (nextChapterId !== null) {
        // Update progress in Supabase
        await updateChapterProgress(projectId, chapterId);
        navigate(`/belajar/project/${projectId}/chapter/${nextChapterId}`);
      } else {
        throw new Error("Next chapter not found");
      }
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  const handleClassDone = useCallback(async () => {
    try {
      if (nextChapterId === null) {
        // Calculate certificate validity end date (3 years from now)
        const expirationDate = dayjs().add(3, "year").format("YYYY-MM-DD"); // 3 years from now
        const payload = {
          project_id: projectId,
          certificate_name: dataProjectDetails?.project_name,
          user_id: dataSession?.session?.user?.id,
          certificate_valid: expirationDate,
        };
        await updateChapterProgress(projectId, chapterId);
        await handleCreateCertificate(payload);

        // Recalculate progress after updating the chapter progress
        queryClient.invalidateQueries(["getProjectDetail"]);
        queryClient.invalidateQueries(["dataChapters"]);
        toast.success("Yeay!, Anda telah menyelesaikan semua materi");
      } else {
        throw new Error("Generate certificate not valid");
      }
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  }, [projectId, chapterId, dataProjectDetails, dataSession, nextChapterId, queryClient, navigate]);

  if (errorSession || errorChapterDetailById || errorProjectDetail || errorCheckReview) {
    return <ErrorServer />;
  }

  if (isLoadingSession || isPendingChapterDetailById || isPendingProjectDetail || isLoadingCheckReview) {
    return <ChapterSkeleton />;
  }

  console.log("dataChapters", dataChapters);
  console.log("dataChapterDetailById", dataChapterDetailById);

  return (
    <>
      <div className="w-[100vw] bg-gray-200 dark:bg-background-900 px-4 h-full py-6">
        <div className="flex justify-center md:min-w-[300px] md:h-[100vh] xl:min-w-[400px] md:w-full mb-4 md:mb-4">
          <iframe src={dataChapterDetailById.youtube_url} frameBorder="0" allowFullScreen className="w-full h-full"></iframe>
        </div>
        <div className="w-full rounded-lg bg-white dark:bg-black my-6 p-4 md:p-3 xl:p-4">
          <div className="flex flex-col md:flex-row gap-2 justify-between md:items-center">
            <div className="flex w-full md:w-[50%] flex-col gap-2 text-start">
              <div className="mb-3">
                <h3 className="text-black dark:text-neutral-200 text-2xl">{dataChapterDetailById.chapter_detail_name}</h3>
              </div>
              <div className="w-full h-4 bg-gray-200 rounded-full dark:bg-gray-700">
                <div
                  className="h-4 bg-blue-600 rounded-full dark:bg-blue-500"
                  style={{
                    width: `${progress}%`,
                    background: "linear-gradient(90deg, rgba(0, 0, 255, 0.3) 25%, rgba(0, 0, 255, 0.8) 50%, rgba(0, 0, 255, 0.3) 75%)",
                    backgroundSize: "200% 100%",
                    animation: "flow 4s linear infinite",
                  }}
                ></div>
              </div>
              <p className="text-black dark:text-white">
                {progress === 100 ? "Completed" : "In Progress"} {progress}%
              </p>
            </div>
            <div className="flex justify-end md:items-center">
              {nextChapterId && (
                <button className="flex gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700" onClick={handleNextChapter}>
                  {t("Selesaikan dan lanjutkan")}
                  <GrLinkNext className="mt-1.5" />
                </button>
              )}

              {!nextChapterId && progress < 100 && (
                <button className="flex gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700" onClick={handleClassDone}>
                  {t("Selesaikan kelas")}
                </button>
              )}

              {!nextChapterId && progress === 100 && dataCheckReview?.length === 0 && (
                <button className="btn btn-sm border-none bg-brand-500 hover:bg-brand-700 text-white dark:text-neutral-200" onClick={() => setShowReview(!showReview)}>
                  {t("Tulis ulasanmu")}
                </button>
              )}

              {!nextChapterId && progress === 100 && dataCheckReview?.length > 0 && (
                <button className="btn btn-sm border-none bg-brand-500 hover:bg-brand-700 text-white dark:text-neutral-200" onClick={() => navigate(`/belajar/project/${projectId}/reviews`)}>
                  {t("Lihat ulasan")}
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Link to="/belajar/diskusi" className="flex w-full flex-col items-center gap-2 justify-center rounded-lg p-2 md:p-3 cursor-pointer bg-white dark:bg-black">
            <img src={darkMode ? DiscussionDarkImage : DiscussionImage} className="w-14" />
            <p className="text-black dark:text-neutral-200">Diskusi</p>
          </Link>
          <Link to="https://discord.gg/Eba8yPFCPd" target="_blank" className="flex w-full flex-col items-center gap-2 justify-center rounded-lg p-2 md:p-3 cursor-pointer bg-white dark:bg-black">
            <img src={DiscordImage} className="w-14" />
            <p className="text-black dark:text-neutral-200">Discord</p>
          </Link>
          <Link to="https://t.me/jvalleyverse" target="_blank" className="flex w-full flex-col items-center gap-2 justify-center rounded-lg p-2 md:p-3 cursor-pointer bg-white dark:bg-black">
            <img src={TelegramImage} className="w-14" />
            <p className="text-black dark:text-neutral-200">Telegram</p>
          </Link>
        </div>
      </div>
      {showReview && <ReviewCourse projectId={projectId} chapterId={chapterId} showReview={showReview} setShowReview={() => setShowReview(!showReview)} />}
    </>
  );
};

export default Chapter;
