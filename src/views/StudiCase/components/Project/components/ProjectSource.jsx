import { Link } from "react-router-dom";
import YoutubeImage from "@/assets/tech/youtube.png";
import GithubImage from "@/assets/tech/githubDark.png";

const ProjectSource = ({ dataProjectDetails }) => {
  return (
    <div className="grid-cols-4">
      <h3 className="text-lg text-center font-bold pb-6 dark:text-neutral-200">Project source</h3>
      <div className="flex gap-10 justify-center">
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
  );
};

export default ProjectSource;
