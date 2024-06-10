import { GrLinkNext } from "react-icons/gr";
import GithubImage from "@/assets/tech/github.png";
import GithubImage2 from "@/assets/tech/github2.png";
import DiscordImage from "@/assets/tech/discord.png";
import YoutubeImage from "@/assets/tech/youtube.png";
import useDarkMode from "@/hooks/useDarkMode";

const Chapter = () => {
  const { darkMode } = useDarkMode();

  return (
    <div className="w-[100vw] bg-gray-200 dark:bg-gradient-to-br from-black/90 via-gray-900 to-brand2 px-4 h-full py-6">
      <div className="flex justify-center md:min-w-[300px] md:h-[100vh] xl:min-w-[400px] md:w-full mb-4 md:mb-4">
        <iframe src="https://www.youtube.com/embed/SIDgKNa363k?si=Hh-wKdji-Q36UgPC" frameBorder="0" allowFullScreen className="w-full h-full"></iframe>
      </div>
      <div className="w-full rounded-lg bg-white dark:bg-black my-6 p-2 md:p-3 xl:p-4">
        <div className="flex gap-2 justify-between items-center">
          <div className="flex w-[50%] flex-col gap-2 text-start">
            <div className="mb-3">
              <h3 className="text-black dark:text-neutral-200 text-2xl">Introduction</h3>
            </div>
            <div className="w-full h-4 bg-gray-200 rounded-full dark:bg-gray-700">
              <div className="h-4 bg-blue-600 rounded-full dark:bg-blue-500" style={{ width: "45%" }}></div>
            </div>
            <p className="text-black dark:text-white">45% Complete</p>
          </div>
          <div className="flex items-center">
            <button className="flex gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Selesaikan dan lanjutkan
              <GrLinkNext className="mt-1.5" />
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="flex w-full flex-col items-center gap-2 justify-center rounded-lg px-1 md:py-3 cursor-pointer bg-white dark:bg-black">
          <img src={darkMode ? GithubImage2 : GithubImage} className="w-14" />
          <p className="text-black dark:text-neutral-200">Source Code</p>
        </div>
        <div className="flex w-full flex-col items-center gap-2 justify-center rounded-lg px-1 md:py-3 cursor-pointer bg-white dark:bg-black">
          <img src={DiscordImage} className="w-14" />
          <p className="text-black dark:text-neutral-200">Discord</p>
        </div>
        <div className="flex w-full flex-col items-center gap-2 justify-center rounded-lg px-1 md:py-3 cursor-pointer bg-white dark:bg-black">
          <img src={YoutubeImage} className="w-14" />
          <p className="text-black dark:text-neutral-200">Youtube</p>
        </div>
      </div>
    </div>
  );
};

export default Chapter;
