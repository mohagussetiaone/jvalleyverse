import { Link } from "react-router-dom";
import useDarkMode from "@/hooks/useDarkMode";
import TelegramImage from "@/assets/tech/telegramDark.png";
import DiscordImage from "@/assets/tech/discord.png";
import DiscussionImage from "@/assets/tech/discussion.png";
import DiscussionDarkImage from "@/assets/tech/discussionDark.png";
import { handleGetStudyCaseDetail } from "@/api/StudyCase/StudyCaseApi";
import { useQuery } from "@tanstack/react-query";
import ErrorServer from "@/components/ErrorServer";
import { useParams } from "react-router-dom";
import DetailStudyCaseSkeleton from "@/components/loading/DetailStudyCaseSkeleton";
import { useAuthValidation } from "@/lib/authValidation";

const StudyCaseDetail = () => {
  useAuthValidation();

  const { studyCaseId } = useParams();
  const { darkMode } = useDarkMode();
  const {
    error: errorStudyCase,
    isPending: isPendingStudyCase,
    data: dataStudyCase,
  } = useQuery({
    queryKey: ["getStudyCase"],
    queryFn: () => handleGetStudyCaseDetail(studyCaseId),
  });

  if (isPendingStudyCase) {
    return <DetailStudyCaseSkeleton />;
  }

  if (errorStudyCase) {
    return <ErrorServer />;
  }

  console.log("dataStudyCase", dataStudyCase);

  return (
    <>
      <div className="w-[100vw] bg-white pt-8 dark:bg-gradient-to-r from-black via-brand3 to-background-500 px-4 h-full">
        <div className="flex gap-4 flex-col">
          <div className="flex justify-center items-center h-auto md:h-auto md:min-w-[300px] xl:min-w-[400px] mb-4">
            <iframe src={dataStudyCase.youtube_url} frameBorder="0" allowFullScreen className="w-full h-[40vh] md:h-[400px] xl:h-[500px]"></iframe>
          </div>
          <div className="grid bg-gray-200 dark:bg-background-900 p-4 grid-cols-3 gap-4 md:mx-10 mb-10">
            <Link to="/belajar/diskusi" className="flex w-full flex-col items-center gap-2 justify-center rounded-lg px-1 md:py-3 cursor-pointer bg-white dark:bg-black/20">
              <img src={darkMode ? DiscussionDarkImage : DiscussionImage} className="w-14" />
              <p className="text-black dark:text-neutral-200">Diskusi</p>
            </Link>
            <Link to="https://discord.gg/TxmFR8cK" target="_blank" className="flex w-full flex-col items-center gap-2 justify-center rounded-lg px-1 md:py-3 cursor-pointer bg-white dark:bg-black/20">
              <img src={DiscordImage} className="w-14" />
              <p className="text-black dark:text-neutral-200">Discord</p>
            </Link>
            <Link to="https://t.me/jvalleyverse" target="_blank" className="flex w-full flex-col items-center gap-2 justify-center rounded-lg px-1 md:py-3 cursor-pointer bg-white dark:bg-black/20">
              <img src={TelegramImage} className="w-14" />
              <p className="text-black dark:text-neutral-200">Telegram</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudyCaseDetail;
