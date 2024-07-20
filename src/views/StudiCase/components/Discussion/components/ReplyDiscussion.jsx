import * as yup from "yup";
import toast from "react-hot-toast";
import ReactQuillProvider from "@/components/ReactQuillProvider";
import { useForm, Controller } from "react-hook-form";
import { handleReplyQuestion } from "@/api/Discussion/ReplyDiscussion";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCheckSession } from "@/api/Auth/CheckSession";
import { useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import Loading from "@/components/Loading";
import ErrorServer from "@/components/ErrorServer";
import { useParams, useNavigate } from "react-router-dom";

const ReplyDiscussion = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { discussionId } = useParams();
  const validationSchema = yup.object().shape({
    content: yup.string().min(1, "Content must be at least 1 character").required("Content is required"),
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const {
    isLoading: isLoadingSession,
    error: errorSession,
    data: dataSession,
  } = useQuery({
    queryKey: ["getSession"],
    queryFn: useCheckSession,
  });

  if (isLoadingSession) {
    return <Loading />;
  }

  if (errorSession) {
    return <ErrorServer />;
  }

  const onSubmit = async (payload) => {
    const submissionData = {
      discussion_id: discussionId,
      content: payload.content,
      user_id: dataSession?.session?.user.id,
    };

    if (dataSession?.session === null) {
      toast.error("Please login for discussion author");
      navigate("/signin");
      return;
    }

    try {
      const requestPromise = handleReplyQuestion(submissionData);
      await toast.promise(
        requestPromise,
        {
          loading: "Request in process...",
          success: () => {
            queryClient.invalidateQueries({
              queryKey: ["getDiscussionById"],
            });
            reset(); // Reset form fields after successful submission
            return "Reply question successfully";
          },
          error: (error) => {
            console.log("error", error);
            return error?.message || "Terjadi kesalahan saat memproses data";
          },
        },
        {
          success: {
            duration: 1500,
          },
          error: {
            duration: 2000,
          },
        }
      );
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("Unexpected error occurred");
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg mb-4">Komentar:</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="border p-2 rounded">
          <Controller name="content" control={control} render={({ field }) => <ReactQuillProvider {...field} value={field.value || ""} onChange={(value) => field.onChange(value)} />} />
          {errors.content && <p>{errors.content.message}</p>}
        </div>
        <button type="submit" className="flex mt-2 px-4 py-2 bg-blue-500 text-white rounded text-end justify-end">
          Kirim
        </button>
      </form>
    </div>
  );
};

export default ReplyDiscussion;
