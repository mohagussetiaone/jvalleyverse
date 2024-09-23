import DiscussionHome from "../../components/Discussion";
import RelatedTopik from "./RelatedTopik";
import { handleGetDiscussion } from "@/api/Project/DiscussionApi";
import { useQuery } from "@tanstack/react-query";
import DiscussionSkeleton from "@/components/loading/DiscussionSkeleton";
import ErrorServer from "@/components/ErrorServer";

const ErrorDiscussion = () => {
  // GET ALL DISCUSION
  const {
    error: errorDiscussion,
    isPending: isPendingDiscussion,
    data: dataDiscussion,
  } = useQuery({
    queryKey: ["getDiscussion"],
    queryFn: handleGetDiscussion,
  });

  if (errorDiscussion) {
    return <ErrorServer />;
  }

  if (isPendingDiscussion) {
    return <DiscussionSkeleton />;
  }

  console.log("dataDiscussion", dataDiscussion);

  return (
    <>
      <div className="w-full bg-gray-200 dark:bg-primaryDark">
        <div className="grid grid-cols-12 gap-5 py-2 md:p-4 xl:p-6">
          <div className="col-span-12 md:col-span-9">
            <DiscussionHome dataDiscussion={dataDiscussion} />
          </div>
          <div className="col-span-12 md:col-span-3">
            <RelatedTopik dataDiscussion={dataDiscussion} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorDiscussion;
