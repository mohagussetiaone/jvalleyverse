import { Link } from "react-router-dom";

const RelatedTopik = ({ dataDiscussion }) => {
  return (
    <div className="bg-neutral-200 dark:bg-black/30 rounded-md">
      <div className="text-start rounded-t-lg p-2 md:pl-4">
        <p className="text-base text-black dark:text-neutral-200">Topik Related</p>
      </div>
      <div className="bg-white dark:bg-black/10 p-2 rounded-b-md">
        {dataDiscussion &&
          dataDiscussion.map((discussion, index) => (
            <div key={discussion.id} className={`p-2 text-black flex text-start justify-start ${(index + 1) % 5 === 0 ? "border-b border-gray-300" : ""}`}>
              <ol className="text-sm ">
                <li className="cursor-pointer">
                  <Link to={`${discussion.id}`} className="text-black font-normal dark:text-neutral-400">
                    {discussion.question}
                  </Link>
                </li>
              </ol>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RelatedTopik;
