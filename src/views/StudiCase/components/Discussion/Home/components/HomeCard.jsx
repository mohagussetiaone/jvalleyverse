import DiscussionHome from "../../components/Discussion";
import RelatedTopik from "./RelatedTopik";

const ErrorDiscussion = () => {
  return (
    <>
      <div className="w-full bg-gray-200 dark:bg-gradient-to-br from-black/90 via-brand2 to-gray-900">
        <div className="grid grid-cols-12 gap-5 py-2 md:p-4 xl:p-6">
          <div className="col-span-12 md:col-span-9">
            <DiscussionHome />
          </div>
          <div className="col-span-12 md:col-span-3">
            <RelatedTopik />
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorDiscussion;
