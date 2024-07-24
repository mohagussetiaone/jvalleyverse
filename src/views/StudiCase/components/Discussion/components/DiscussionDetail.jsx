import { handleGetDiscussionById } from "@/api/Project/DiscussionApi";
import ErrorServer from "@/components/ErrorServer";
import Loading from "@/components/Loading";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import dayjs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";
import LocaleData from "dayjs/plugin/localeData";
import LocalId from "dayjs/locale/id";
import HtmlParser from "@/lib/HtmlParser";
import ReplyDiscussion from "./ReplyDiscussion";

dayjs.extend(RelativeTime);
dayjs.extend(LocaleData);
dayjs.locale(LocalId);

const defaultProfile = "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1716887986~exp=1716891586~hmac=729888601cee5f142cdae9e83d1f720240b371d5c32f368bba67fc6278e7197b&w=740";

const DiscussionDetail = () => {
  const { discussionId } = useParams();
  const queryClient = useQueryClient();

  const {
    error: errorDiscussionDetail,
    isPending: isPendingDiscussionDetail,
    data: dataDiscussionDetail,
  } = useQuery({
    queryKey: ["getDiscussionById"],
    queryFn: () => handleGetDiscussionById(discussionId),
    enabled: !!discussionId,
  });

  useEffect(() => {
    if (dataDiscussionDetail) {
      queryClient.invalidateQueries(["getDiscussionById"]);
    }
  }, [dataDiscussionDetail]);

  if (errorDiscussionDetail) {
    return <ErrorServer />;
  }

  if (isPendingDiscussionDetail) {
    return <Loading />;
  }

  console.log("dataDiscussion By ID", dataDiscussionDetail);

  const profileImage = `${import.meta.env.VITE_CDN_GET_IMAGE}/jvalleyverseImg/${dataDiscussionDetail?.user?.profile_image_url}`;

  return (
    <div className="px-2 dark:bg-background-900 md:px-6 xl:px-10 py-6">
      <div className="py-6 px-4 md:px-6 xl:px-8 bg-white dark:bg-black/20 dark:text-neutral-300 rounded-lg">
        <div className="flex flex-col gap-2">
          <div>
            <h3 className="text-3xl">{dataDiscussionDetail?.question}</h3>
          </div>
          <div className="flex text-sm gap-2">
            <img src={dataDiscussionDetail?.user?.profile_image_url !== null ? profileImage : defaultProfile} alt="profile.jpg" className="w-6 h-6 rounded-full" />
            <h3>{dataDiscussionDetail?.user?.name}</h3>
            <h6 className="text-gray-700">| Ditanya pada: {dayjs(dataDiscussionDetail?.created_at).fromNow()}</h6>
          </div>
          <hr className="border-gray-300 border-1 py-2" />
        </div>
        <HtmlParser htmlString={dataDiscussionDetail?.content} />
        {/* Map jawaban */}
        <div>
          <h3 className="my-6">{dataDiscussionDetail?.replies?.length} Jawaban:</h3>
          {dataDiscussionDetail &&
            dataDiscussionDetail?.replies?.map((answer, index) => (
              <div key={index} className="flex gap-4 mb-6">
                <img src={answer?.user?.profile_image_url !== null ? `${import.meta.env.VITE_CDN_GET_IMAGE}/jvalleyverseImg/${answer?.user?.profile_image_url}` : defaultProfile} alt="profile.jpg" className="w-10 h-10 rounded-full" />
                <div>
                  <h3>{answer?.user?.name}</h3>
                  <h6 className="text-xs text-gray-700 mb-1">{dayjs(answer?.created_at).fromNow()}</h6>
                  <HtmlParser htmlString={answer?.content} />
                </div>
              </div>
            ))}
        </div>
        <hr className="border-gray-300 border-1 py-2" />
        <ReplyDiscussion />
      </div>
    </div>
  );
};

export default DiscussionDetail;
