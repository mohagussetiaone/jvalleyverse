import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { handleGetReviewById } from "@/api/Review/ReviewProject";
import ErrorServer from "@/components/ErrorServer";
import DetailCardProductSkeleton from "@/components/loading/DetailCardProductSkeleton";

const ReviewProject = () => {
  const { projectId } = useParams();
  const [reviewStats, setReviewStats] = useState([]);

  // GET Review By Id
  const {
    isLoading: isLoadingReview,
    error: errorReview,
    data: dataReview,
  } = useQuery({
    queryKey: ["getReview", projectId],
    queryFn: () => handleGetReviewById(projectId),
    enabled: !!projectId,
  });

  console.log("data review", dataReview);

  const calculateReviewStats = useCallback(() => {
    if (!dataReview || dataReview.length === 0) {
      return [5, 4, 3, 2, 1].map((rating) => ({
        rating,
        percentage: "0%",
        count: 0,
      }));
    }
    const ratingCounts = dataReview.reduce((acc, review) => {
      acc[review.rating] = (acc[review.rating] || 0) + 1;
      return acc;
    }, {});
    const maxCount = Math.max(...Object.values(ratingCounts));
    return [5, 4, 3, 2, 1].map((rating) => {
      const count = ratingCounts[rating] || 0;
      const percentage = maxCount > 0 ? ((count / maxCount) * 100).toFixed(2) + "%" : "0%";
      return { rating, percentage, count };
    });
  }, [dataReview]);

  useEffect(() => {
    if (dataReview) {
      const stats = calculateReviewStats();
      setReviewStats(stats);
    }
  }, [dataReview, calculateReviewStats]);

  if (errorReview) {
    <ErrorServer />;
  }

  if (isLoadingReview) {
    return <DetailCardProductSkeleton />;
  }

  console.log("reviewStats", reviewStats);

  return (
    <section className="relative">
      <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
        <div className="w-full">
          <h2 className="font-manrope font-bold text-xl text-black dark:text-neutral-200 mb-8 text-center">Testimonial</h2>
          <div className="grid grid-cols-1 gap-11 max-xl:max-w-2xl max-xl:mx-auto">
            <div className="box flex flex-col gap-y-2 w-full">
              {reviewStats &&
                reviewStats.map((data, index) => (
                  <div key={index} className="flex items-center w-full">
                    <p className="font-medium text-lg dark:text-neutral-200 mr-0.5">{data.rating}</p>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_12042_8589)">
                        <path
                          d="M9.10326 2.31699C9.47008 1.57374 10.5299 1.57374 10.8967 2.31699L12.7063 5.98347C12.8519 6.27862 13.1335 6.48319 13.4592 6.53051L17.5054 7.11846C18.3256 7.23765 18.6531 8.24562 18.0596 8.82416L15.1318 11.6781C14.8961 11.9079 14.7885 12.2389 14.8442 12.5632L15.5353 16.5931C15.6754 17.41 14.818 18.033 14.0844 17.6473L10.4653 15.7446C10.174 15.5915 9.82598 15.5915 9.53466 15.7446L5.91562 17.6473C5.18199 18.033 4.32456 17.41 4.46467 16.5931L5.15585 12.5632C5.21148 12.2389 5.10393 11.9079 4.86825 11.6781L1.94038 8.82416C1.34687 8.24562 1.67438 7.23765 2.4946 7.11846L6.54081 6.53051C6.86652 6.48319 7.14808 6.27862 7.29374 5.98347L9.10326 2.31699Z"
                          fill="#FBBF24"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_12042_8589">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <p className="h-2 w-full sm:min-w-[278px] rounded-3xl bg-yellow-100 ml-5 mr-3">
                      <span className="h-full w-[30%] rounded-3xl bg-yellow-400 flex" style={{ width: data.percentage }}></span>
                    </p>
                    <p className="font-medium text-lg text-black dark:text-neutral-200 mr-0.5">{data.count}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewProject;
