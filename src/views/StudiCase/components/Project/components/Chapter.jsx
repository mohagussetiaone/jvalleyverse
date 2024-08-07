import dayjs from "dayjs";
import { useEffect } from "react";
import { GrLinkNext } from "react-icons/gr";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import TelegramImage from "@/assets/tech/telegramDark.png";
import DiscordImage from "@/assets/tech/discord.png";
import DiscussionImage from "@/assets/tech/discussion.png";
import DiscussionDarkImage from "@/assets/tech/discussionDark.png";
import useDarkMode from "@/hooks/useDarkMode";
import { handleGetProjectDetail, handleGetChapterById } from "@/api/Project/ProjectApi";
import { updateChapterProgress } from "@/api/Project/ChapterApi";
import { handleCreateCertificate } from "@/api/Certificate/CertificateApi";
import { useCheckSession } from "@/api/Auth/CheckSession";
import { useParams, Link } from "react-router-dom";
import ErrorServer from "@/components/ErrorServer";
import Loading from "@/components/Loading";
import { calculateChapterProgress } from "@/utils/calculateProgress";
import useChapterProject from "@/hooks/useChapterProject";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Chapter = () => {
  const { projectId, chapterId } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();
  const { dataChapters } = useChapterProject();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

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
    queryClient.invalidateQueries(["getProjectDetailById"]);
  }, [chapterId]);

  if (errorSession || errorChapterDetailById || errorProjectDetail) {
    return <ErrorServer />;
  }

  if (isLoadingSession || isPendingChapterDetailById || isPendingProjectDetail) {
    return <Loading />;
  }

  console.log("dataChapters", dataChapters);

  const progress = calculateChapterProgress(dataChapters);

  console.log("dataChapterDetailById", dataChapterDetailById);

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
      if (nextChapterId) {
        // Update progress in Supabase
        await updateChapterProgress(projectId, chapterId);
        navigate(`/belajar/project/${projectId}/chapter/${nextChapterId}`);
      } else {
        // Calculate certificate validity end date (3 years from now)
        const expirationDate = dayjs().add(3, "year").format("YYYY-MM-DD"); // 3 years from now
        const payload = {
          project_id: projectId,
          certificate_name: dataProjectDetails?.project_name,
          user_id: dataSession?.session?.user?.id,
          certificate_valid: expirationDate,
        };
        await handleCreateCertificate(payload);
        navigate("/profile");
        toast.success("Certificate created successfully");
        // Generate certificate function here
        console.log("Generate certificate");
        // Add your certificate generation logic here
      }
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  return (
    <div className="w-[100vw] bg-gray-200 dark:bg-background-900 px-4 h-full py-6">
      <div className="flex justify-center md:min-w-[300px] md:h-[100vh] xl:min-w-[400px] md:w-full mb-4 md:mb-4">
        <iframe src={dataChapterDetailById.youtube_url} frameBorder="0" allowFullScreen className="w-full h-full"></iframe>
      </div>
      <div className="w-full rounded-lg bg-white dark:bg-black my-6 p-2 md:p-3 xl:p-4">
        <div className="flex gap-2 justify-between items-center">
          <div className="flex w-[50%] flex-col gap-2 text-start">
            <div className="mb-3">
              <h3 className="text-black dark:text-neutral-200 text-2xl">{dataChapterDetailById.chapter_detail_name}</h3>
            </div>
            <div className="w-full h-4 bg-gray-200 rounded-full dark:bg-gray-700">
              <div className="h-4 bg-blue-600 rounded-full dark:bg-blue-500" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="text-black dark:text-white">
              {progress}% {progress === 100 ? "Completed" : "In Progress"}
            </p>
          </div>
          <div className="flex items-center">
            <button className="flex gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700" onClick={handleNextChapter}>
              {nextChapterId ? (
                <>
                  {t("Selesaikan dan lanjutkan")}
                  <GrLinkNext className="mt-1.5" />
                </>
              ) : (
                t("Selesaikan")
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Link to="/belajar/diskusi" className="flex w-full flex-col items-center gap-2 justify-center rounded-lg px-1 md:py-3 cursor-pointer bg-white dark:bg-black">
          <img src={darkMode ? DiscussionDarkImage : DiscussionImage} className="w-14" />
          <p className="text-black dark:text-neutral-200">Diskusi</p>
        </Link>
        <Link to="https://discord.gg/TxmFR8cK" target="_blank" className="flex w-full flex-col items-center gap-2 justify-center rounded-lg px-1 md:py-3 cursor-pointer bg-white dark:bg-black">
          <img src={DiscordImage} className="w-14" />
          <p className="text-black dark:text-neutral-200">Discord</p>
        </Link>
        <Link to="https://t.me/jvalleyverse" target="_blank" className="flex w-full flex-col items-center gap-2 justify-center rounded-lg px-1 md:py-3 cursor-pointer bg-white dark:bg-black">
          <img src={TelegramImage} className="w-14" />
          <p className="text-black dark:text-neutral-200">Telegram</p>
        </Link>
      </div>
    </div>
  );
};

export default Chapter;
