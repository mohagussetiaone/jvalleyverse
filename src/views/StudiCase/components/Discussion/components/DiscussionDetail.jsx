import ReactQuillProvider from "@/components/ReactQuillProvider";
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

dayjs.extend(RelativeTime);
dayjs.extend(LocaleData);
dayjs.locale(LocalId);

const defaultProfile = "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1716887986~exp=1716891586~hmac=729888601cee5f142cdae9e83d1f720240b371d5c32f368bba67fc6278e7197b&w=740";

const DiscussionDetail = () => {
  const { discussionId } = useParams();
  const queryClient = useQueryClient();

  // const answers = [
  //   {
  //     name: "Moh Agus Setiawan",
  //     date: "26 April 2023",
  //     profileImg: "https://picsum.photos/300/300",
  //     answer:
  //       "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.",
  //   },
  //   {
  //     name: "Nina Lestari",
  //     date: "27 April 2023",
  //     profileImg: "https://picsum.photos/300/300",
  //     answer:
  //       "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.",
  //   },
  //   {
  //     name: "Rian Hidayat",
  //     date: "28 April 2023",
  //     profileImg: "https://picsum.photos/300/300",
  //     answer:
  //       "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32.",
  //   },
  //   {
  //     name: "Siti Aisyah",
  //     date: "29 April 2023",
  //     profileImg: "https://picsum.photos/300/300",
  //     answer:
  //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  //   },
  // ];

  // GET DISCUSION BY ID
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

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="px-2 dark:bg-brand2 md:px-6 xl:px-10 pt-6">
      <div className="py-6 px-4 md:px-6 xl:px-8 bg-white dark:bg-black/20 dark:text-neutral-300 rounded-lg">
        <div className="flex flex-col gap-2">
          <div>
            <h3 className="text-3xl">{dataDiscussionDetail.question}</h3>
          </div>
          <div className="flex text-sm gap-2">
            <img src={defaultProfile} alt="profile.jpg" className="w-6 h-6 rounded-full" />
            <h3>{dataDiscussionDetail.user.name}</h3>
            <h6 className="text-gray-700">| Ditanya pada: {dayjs(dataDiscussionDetail.created_at).fromNow()}</h6>
          </div>
          <hr className="border-gray-300 border-1 py-2" />
        </div>
        <div>
          <p className="text-justify">{dataDiscussionDetail.content}</p>
        </div>
        {/* Map jawaban */}
        <div>
          <h3 className="my-6">{dataDiscussionDetail?.replies.length} Jawaban:</h3>
          {dataDiscussionDetail &&
            dataDiscussionDetail?.replies?.map((answer, index) => (
              <div key={index} className="flex gap-4 mb-6">
                <img src={defaultProfile} alt="profile.jpg" className="w-16 h-14 rounded-full" />
                <div>
                  <h3>{answer.user.name}</h3>
                  <h6 className="text-xs text-gray-700 mb-1">{dayjs(answer.created_at).fromNow()}</h6>
                  <p className="text-justify">{answer.content}</p>
                </div>
              </div>
            ))}
        </div>
        <hr className="border-gray-300 border-1 py-2" />
        {/* Form balasan */}
        <div className="mt-6">
          <h3 className="text-xl mb-4">Balas Jawaban:</h3>
          <form onSubmit={handleSubmit}>
            <div className="border p-2 rounded">
              <ReactQuillProvider value="blablabla" />
            </div>
            <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white rounded text-end justify-end">
              Kirim
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DiscussionDetail;
