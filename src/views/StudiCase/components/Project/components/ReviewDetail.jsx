import { useAuthValidation } from "@/lib/authValidation";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/Loading";
import ErrorServer from "@/components/ErrorServer";
import { handleGetReviewById } from "@/api/Review/ReviewProject";
import dayjs from "dayjs";
import DataNotFound from "@/components/DataNotFound";
import { useParams } from "react-router-dom";

const ReviewDetail = () => {
  useAuthValidation();

  const { projectId } = useParams();

  // GET Review By Id
  const {
    isLoading: isLoadingReview,
    error: errorReview,
    data: dataReview,
  } = useQuery({
    queryKey: ["getReview"],
    queryFn: () => handleGetReviewById(projectId),
    enabled: !!projectId,
  });

  if (isLoadingReview) return <Loading />;
  if (errorReview) return <ErrorServer />;

  console.log("dataReview", dataReview);

  return (
    <section className="py-10 relative bg-white dark:bg-primaryDark">
      <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
        <div className="w-full">
          <h2 className="font-manrope font-bold text-2xl text-black dark:text-neutral-200 pb-4 text-center">Mereka Mengulas</h2>
          <div>
            {dataReview.length > 0 ? (
              dataReview.map((review, index) => (
                <div key={index} className="pt-6 pb-8 border-b border-gray-100 max-xl:max-w-2xl max-xl:mx-auto">
                  <div className="flex items-center gap-3 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 30 30" fill="none">
                        <g clipPath="url(#clip0_13624_2892)">
                          <path
                            d="M14.1033 2.56698C14.4701 1.82374 15.5299 1.82374 15.8967 2.56699L19.1757 9.21093C19.3214 9.50607 19.6029 9.71064 19.9287 9.75797L27.2607 10.8234C28.0809 10.9426 28.4084 11.9505 27.8149 12.5291L22.5094 17.7007C22.2737 17.9304 22.1662 18.2614 22.2218 18.5858L23.4743 25.8882C23.6144 26.7051 22.7569 27.3281 22.0233 26.9424L15.4653 23.4946C15.174 23.3415 14.826 23.3415 14.5347 23.4946L7.9767 26.9424C7.24307 27.3281 6.38563 26.7051 6.52574 25.8882L7.7782 18.5858C7.83384 18.2614 7.72629 17.9304 7.49061 17.7007L2.1851 12.5291C1.59159 11.9505 1.91909 10.9426 2.73931 10.8234L10.0713 9.75797C10.3971 9.71064 10.6786 9.50607 10.8243 9.21093L14.1033 2.56698Z"
                            fill={i < review.rating ? "#FBBF24" : "#E5E7EB"}
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_13624_2892">
                            <rect width="30" height="30" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    ))}
                  </div>
                  <div className="flex sm:items-center md:items-start flex-col min-[400px]:flex-row justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <img src={`${import.meta.env.VITE_CDN_GET_IMAGE}/jvalleyverseImg/${review.user.profile_image_url}`} alt={`${review.user.name} image`} className="w-10 h-10 rounded-full object-cover" />
                      <div className="flex flex-col">
                        <h6 className="font-semibold text-lg leading-8 text-indigo-600 ">{review.user.name}</h6>
                        <p className="font-normal text-xs dark:text-gray-400">{dayjs(review.created_at).format("DD MMM YYYY HH:mm")}</p>
                      </div>
                    </div>
                  </div>
                  <p className="font-normal text-lg leading-8 dark:text-gray-400 max-xl:text-justify">{review.message}</p>
                </div>
              ))
            ) : (
              <DataNotFound />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewDetail;
