import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import LabelInput from "@/components/input/LabelInput";
import SelectHook from "@/components/input/Select";
import TextInput from "@/components/input/TextInput";
import SuggestionTags from "@/utils/suggestionsTag";
import { useForm, Controller } from "react-hook-form";
import { handleGetProject } from "@/api/Project/ProjectApi";
import { handleGetShowCaseCategory } from "@/api/ShowCase/ShowCaseCategoryApi";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IoMdClose } from "react-icons/io";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Loading from "@/components/Loading";
import ErrorServer from "@/components/ErrorServer";
import supabase from "@/config/supabaseConfig";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useCheckSession } from "@/api/Auth/CheckSession";
import { useNavigate } from "react-router-dom";

const optionTags = SuggestionTags.map((tags) => ({
  value: tags,
  label: tags,
}));

const animatedComponents = makeAnimated();

const AddShowCase = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const validationSchema = yup.object().shape({
    name: yup.string().min(3, "Name must be at least 3 character").required("Name is required"),
    description: yup.string().min(3, "Description must be at least 3 character").required("Description is required"),
    url_github: yup.string().min(6, "Url Github must be at least 6 character").required("Url Github is required"),
    url_preview: yup.string().min(6, "Url Preview must be at least 6 character").required("Url Preview is required"),
    project_id: yup.string().required("Project is required"),
    tech: yup
      .array()
      .of(
        yup.object().shape({
          value: yup.string().optional(),
          label: yup.string().optional(),
        })
      )
      .min(1, "At least one tag is required")
      .required("Tags are required"),
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
    isLoading: isLoadingShowCaseCategory,
    error: errorShowCaseCategory,
    data: dataShowCaseCategory,
  } = useQuery({
    queryKey: ["getShowCaseCategory"],
    queryFn: handleGetShowCaseCategory,
  });

  const {
    isLoading: isLoadingSession,
    error: errorSession,
    data: dataSession,
  } = useQuery({
    queryKey: ["getSession"],
    queryFn: useCheckSession,
  });

  const onSubmit = async (values) => {
    // Check if image file is selected
    if (!imageFile) {
      toast.error("Please select an image to upload");
      return;
    }

    const requestPromise = new Promise(async (resolve, reject) => {
      try {
        const { data: showCase, error: showCaseError } = await supabase.schema("user").from("show_case").select("id").eq("name", values.name);
        if (showCaseError) throw showCaseError;
        if (showCase.length > 0) {
          // If project name exists, throw an error
          throw new Error("Project name already exists. Please choose a different name.");
        }
        // Get project id
        const { data: showCaseId, error: showCaseIdError } = await supabase.schema("user").from("show_case").select("id", { count: "exact" }).order("id", { ascending: false }).limit(1);
        // if get project error
        if (showCaseIdError) throw showCaseIdError;
        // set sequence project
        const showCaseIdNext = showCaseId[0]?.id + 1 || 1;
        console.log("showCaseIdNext", showCaseIdNext);
        // upload file into storage
        const { data: storageData, error: storageError } = await supabase.storage.from("jvalleyverseImg").upload(`showCase/${showCaseIdNext}/${imageFile.name}`, imageFile);
        console.log("storageData", storageData);
        // if upload error
        if (!storageData || !storageData.path || storageError) {
          throw new Error("Failed to upload image");
        }
        // const tagsData = tags.map((tag) => tag.text);
        // Payload for insert
        let payload = {
          show_case_img_url: storageData.path,
          category_show_case_id: values.category_show_case_id ? values.category_show_case_id : null,
          name: values.name,
          description: values.description,
          url_github: values.url_github,
          url_preview: values.url_preview,
          project_id: values.project_id ? values.project_id : null,
          user_id: dataSession.session.user.id,
          tech: values.tech ? values.tech.map((tech) => tech.value) : [],
        };
        console.log("payload", payload);
        // Insert project data
        const { data: showCaseData, error: errorShowCase } = await supabase.schema("user").from("show_case").insert(payload);
        // error insert
        console.log("showCaseData", showCaseData);
        console.log("errorShowCase", errorShowCase);
        if (errorShowCase) throw errorShowCase;
        // when all process finish
        resolve(showCaseData);
      } catch (error) {
        reject(error);
      }
    });

    toast.promise(
      requestPromise,
      {
        loading: "Adding show case...",
        success: () => {
          queryClient.invalidateQueries({
            queryKey: ["getShowCase"],
          });
          navigate("/show-case");
          return "Adding show case successfully";
        },
        error: (error) => {
          console.log("error", error);
          return error.message || "Terjadi kesalahan saat memproses data";
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
  };

  if (isLoading || isLoadingSession || isLoadingShowCaseCategory) {
    return <Loading />;
  }

  if (error || errorSession || errorShowCaseCategory) {
    return <ErrorServer />;
  }

  const projectOption = data?.map((project) => ({
    value: project.id,
    label: project.project_name,
  }));

  const showCaseCategoryOption = dataShowCaseCategory?.map((showCaseCategory) => ({
    value: showCaseCategory.id,
    label: showCaseCategory.category_name,
  }));

  const handleChangeSelect = (name, selectedOption) => {
    setValue(name, selectedOption.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleImageReset = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  return (
    <div className="w-full p-6 min-h-screen dark:bg-gradient-to-r from-black via-background-900 to-background-600">
      <div className="max-w-4xl bg-white dark:bg-background-900 p-8 mx-auto rounded-xl">
        <div className="flex justify-center my-2">
          <h3 className="text-2xl dark:text-neutral-200 font-bold">Buat Show Case anda</h3>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2 mb-2">
            <label htmlFor="show_case_img_url" className="text-black dark:text-neutral-200 font-medium text-sm">
              Show case image <span className="text-red-700">*</span>
            </label>
            <input id="show_case_img_url" name="show_case_img_url" type="file" accept="image/*" onChange={handleImageChange} className="file-input file-input-sm file-input-ghost w-full max-w-xs" />
            {imagePreview && (
              <div className="relative bg-black-200 rounded-e-lg">
                <img src={imagePreview} alt="Image Preview" className="rounded w-[200px] h-auto" />
                <button type="button" onClick={handleImageReset} className="absolute top-0 right-0 m-2 p-1 bg-red-500 text-white rounded-full">
                  <IoMdClose />
                </button>
              </div>
            )}
          </div>
          <div className="flex flex-col dark:text-neutral-200 mb-3">
            <LabelInput label="Nama" type="text" id="name" name="name" placeholder="Laundry App" error={errors.name} register={register} required />
          </div>
          <div className="mb-3">
            <SelectHook
              label="Kategory Show Case"
              name="category_show_case_id"
              options={showCaseCategoryOption}
              value={register("category_show_case_id").value}
              placeholder="Pilih Kategory Show case"
              onChange={handleChangeSelect}
              register={register}
              error={errors.category_show_case_id}
              required
            />
          </div>
          <div className="flex flex-col dark:text-neutral-200 mb-3">
            <TextInput
              label="Deskripsi"
              type="text"
              id="description"
              name="description"
              placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"
              error={errors.description}
              register={register}
              required
            />
          </div>
          <div className="mb-4">
            <SelectHook label="Project" name="project_id" options={projectOption} value={register("project_id").value} placeholder="Pilih Project" onChange={handleChangeSelect} register={register} error={errors.project_id} />
          </div>
          <div className="mb-4">
            <div className="dark:text-neutral-200 font-medium text-sm my-1">
              Teknology yang dipakai <span className="text-red-700">*</span>
            </div>
            <Controller
              name="tech"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  className="text-sm my-react-select-container"
                  classNamePrefix="my-react-select"
                  placeholder="Pilih teknologi yang dipakai"
                  isMulti
                  options={optionTags}
                  onChange={(selectedOptions) => {
                    setValue("tech", selectedOptions);
                    return selectedOptions;
                  }}
                />
              )}
            />
            {errors.tech && <p>{errors.tech.message}</p>}
          </div>
          <div className="flex flex-col dark:text-neutral-200 mb-3">
            <LabelInput label="Url Preview" type="text" id="url_preview" name="url_preview" placeholder="https://example.com" error={errors.url_preview} register={register} required />
          </div>
          <div className="flex flex-col dark:text-neutral-200 mb-3">
            <LabelInput label="Url Github" type="text" id="url_github" name="url_github" placeholder="https://github.com/example" error={errors.url_github} register={register} required />
          </div>
          <div className="my-8 flex justify-end">
            <button type="submit" className=" bg-brand-500 text-white font-semibold py-2 rounded-md">
              Buat Show Case
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddShowCase;
