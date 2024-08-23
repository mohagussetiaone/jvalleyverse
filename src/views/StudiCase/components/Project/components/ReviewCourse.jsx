import { useForm } from "react-hook-form";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Modal from "@/components/modal/Modal";
import { useCheckSession } from "@/api/Auth/CheckSession";
import { handleCreateReviews } from "@/api/Review/ReviewProject";
import toast from "react-hot-toast";

function ReviewCourse({ showReview, setShowReview }) {
  const { projectId } = useParams();
  const queryClient = useQueryClient();
  console.log("projectId", projectId);

  const { data: sessionData } = useQuery({
    queryKey: ["checkSession"],
    queryFn: useCheckSession,
  });

  console.log("sessionData", sessionData);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      rating: "5",
    },
  });

  const onSubmit = async (data) => {
    try {
      let payload = {
        rating: data.rating,
        message: data.message,
        user_id: sessionData.session.user.id,
        course_id: projectId,
      };
      console.log("data terkirim", payload);
      const response = await handleCreateReviews(payload);
      console.log("response", response);
      queryClient.invalidateQueries(["getProjectDetail"]);
      queryClient.invalidateQueries(["dataChapters"]);
      queryClient.invalidateQueries(["getProjectDetailById"]);
      queryClient.invalidateQueries(["getCheckReview"]);
      reset();
      setShowReview();
      toast.success("Terimakasih sudah memberi ulasan");
    } catch (error) {
      console.error(error);
      alert("Failed to submit review.");
    }
  };

  return (
    <Modal
      open={showReview}
      setIsOpen={setShowReview}
      header={<p className="flex text-2xl justify-center">Bagaimana pendapatmu tentang course ini?</p>}
      content={
        <form onSubmit={handleSubmit(onSubmit)} className="sm:max-w-xl sm:mx-auto">
          <div className="min-w-1xl flex flex-col">
            <div className="w-full flex flex-col items-center">
              <div className="flex flex-col items-center py-8 space-y-3">
                <div className="rating rating-lg flex gap-2">
                  <input type="radio" value="1" {...register("rating")} name="rating" className="mask mask-star-2 bg-brand-500" />
                  <input type="radio" value="2" {...register("rating")} name="rating" className="mask mask-star-2 bg-brand-500" />
                  <input type="radio" value="3" {...register("rating")} name="rating" className="mask mask-star-2 bg-brand-500" />
                  <input type="radio" value="4" {...register("rating")} name="rating" className="mask mask-star-2 bg-brand-500" />
                  <input type="radio" value="5" {...register("rating")} name="rating" className="mask mask-star-2 bg-brand-500" />
                </div>
              </div>
              <div className="w-full flex flex-col">
                <textarea
                  rows="3"
                  {...register("message")}
                  className="p-4 bg-white dark:bg-transparent border rounded-md text-black dark:text-neutral-200 cursor-pointe focus:border-brand-500 focus:outline-brand-500 resize-none"
                  placeholder="Online course is really good. I learned so much from this course. I am really happy with this course. I recommend this course to everyone. Thank you!"
                />
                <button type="submit" className="py-2 mt-8 text-lg bg-brand-500 rounded-xl text-white">
                  Rate now
                </button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <button type="button" className="btn btn-link" onClick={() => setShowReview(false)}>
                Tidak, terimakasih
              </button>
            </div>
          </div>
        </form>
      }
    />
  );
}

export default ReviewCourse;
