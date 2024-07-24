import { useQuery } from "@tanstack/react-query";
import LabelInput from "@/components/input/LabelInput";
import SelectHook from "@/components/input/Select";
import ReactQuillProvider from "@/components/ReactQuillProvider";
import SuggestionTags from "@/utils/suggestionsTag";
import { useForm, Controller } from "react-hook-form";
import { handleGetProject } from "@/api/Project/ProjectApi";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Loading from "@/components/Loading";
import ErrorServer from "@/components/ErrorServer";
import { handleAddQuestion } from "@/api/Discussion/DiscussionApi";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useCheckSession } from "@/api/Auth/CheckSession";
import { useNavigate } from "react-router-dom";

const optionTags = SuggestionTags.map((tags) => ({
  value: tags,
  label: tags,
}));

const animatedComponents = makeAnimated();

const Question = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const validationSchema = yup.object().shape({
    question: yup.string().min(1, "Question must be at least 1 character").required("Question is required"),
    project_id: yup
      .number()
      .nullable()
      .transform((value, originalValue) => (originalValue === "" ? null : value)),
    tags: yup
      .array()
      .of(
        yup.object().shape({
          value: yup.string().required(),
          label: yup.string().required(),
        })
      )
      .min(1, "At least one tag is required")
      .required("Tags are required"),
    content: yup.string().min(1, "Content must be at least 1 character").required("Content is required"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { isLoading, error, data } = useQuery({
    queryKey: ["getProject"],
    queryFn: handleGetProject,
  });

  const {
    isLoading: isLoadingSession,
    error: errorSession,
    data: dataSession,
  } = useQuery({
    queryKey: ["getSession"],
    queryFn: useCheckSession,
  });

  const onSubmit = async (formData) => {
    const submissionData = {
      ...formData,
      user_id: dataSession?.session?.user?.id,
      tags: formData.tags ? formData.tags.map((tag) => tag.value) : [],
    };

    if (dataSession?.session === null) {
      toast.error("Please login for discussion author");
      navigate("/signin");
      return;
    }

    try {
      const requestPromise = handleAddQuestion(submissionData);
      await toast.promise(
        requestPromise,
        {
          loading: "Request in process...",
          success: (response) => {
            console.log("response", response);
            queryClient.invalidateQueries({
              queryKey: ["getProject"],
            });
            navigate("/belajar/diskusi");
            return "Create question successfully";
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

  if (isLoading || isLoadingSession) {
    return <Loading />;
  }

  if (error || errorSession) {
    return <ErrorServer />;
  }

  const projectOption = data?.map((project) => ({
    value: project.id,
    label: project.project_name,
  }));

  const handleChangeSelect = (name, selectedOption) => {
    setValue(name, selectedOption.value);
  };

  return (
    <div className="w-full py-8 px-4 min-h-screen dark:bg-background-900">
      <div className="max-w-4xl bg-gray-200 dark:bg-black/20 mx-auto p-8 rounded-xl">
        <div className="flex justify-center my-2">
          <h3 className="text-2xl dark:text-neutral-200 font-bold">Buat pertanyaan anda</h3>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col dark:text-neutral-200 mb-3">
            <LabelInput label="Pertanyaan" type="text" id="question" name="question" placeholder="How to create a new project?" error={errors.question} register={register} required />
          </div>
          <div className="mb-3">
            <SelectHook label="Project" name="project_id" options={projectOption} value={register("project_id").value} placeholder="Pilih Project" onChange={handleChangeSelect} register={register} error={errors.project_id} />
          </div>
          <div className="mb-3">
            <div className="dark:text-neutral-200 font-medium text-sm my-1">
              Tags <span className="text-red-700">*</span>
            </div>
            <Controller
              name="tags"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  className="text-sm my-react-select-container"
                  classNamePrefix="my-react-select"
                  placeholder="Pilih Tag"
                  isMulti
                  options={optionTags}
                  onChange={(selectedOptions) => {
                    setValue("tags", selectedOptions);
                    return selectedOptions;
                  }}
                />
              )}
            />
            {errors.tags && <p className="text-red-700 text-sm">{errors.tags.message}</p>}
          </div>
          <div className="flex flex-col dark:text-neutral-200 py-4">
            <label htmlFor="content">
              Rincian pertanyaan <span className="text-red-700">*</span>
            </label>
            <span className="text-sm">Perkenalkan masalahnya dan perluas apa yang Anda masukkan ke dalam judul. Minimal 20 karakter</span>
            <Controller name="content" control={control} render={({ field }) => <ReactQuillProvider {...field} value={field.value || ""} onChange={(value) => field.onChange(value)} />} />
            {errors.content && <p className="text-red-700 text-sm">{errors.content.message}</p>}
          </div>
          <div className="flex justify-end">
            <button type="submit" className="flex justify-end bg-brand-800 text-white font-semibold py-2 rounded-md">
              Buat Pertanyaan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Question;
