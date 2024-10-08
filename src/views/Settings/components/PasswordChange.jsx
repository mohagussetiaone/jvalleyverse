import * as yup from "yup";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import { handleChangePassword } from "@/api/Profile/ProfileApi";
import LabelInput from "@/components/input/LabelInput";

const PasswordChange = ({ userProfile, dataSession }) => {
  console.log("dataSession", dataSession);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const validationSchema = yup.object().shape({
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    confirm_password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (values) => {
    if (values.password !== values.confirm_password) {
      toast.error("Password does not match");
      return;
    }
    const requestPromise = new Promise((resolve, reject) => {
      try {
        let payload = {
          password: values.password,
        };
        // Update profile data
        const changePassword = handleChangePassword(payload.password);
        console.log("changePassword", changePassword);
        // when all process finish
        resolve(changePassword);
      } catch (error) {
        reject(error);
      }
    });
    toast.promise(
      requestPromise,
      {
        loading: "Updating password...",
        success: () => {
          queryClient.invalidateQueries({
            queryKey: ["getProfile"],
          });
          navigate("/profile");
          return "Change password successfully";
        },
        error: (error) => {
          return error.message || "An error occurred while processing data";
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

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div>
            <LabelInput label="Email" value={userProfile?.email || dataSession?.session?.user?.email || ""} type="email" id="email" name="email" placeholder="example@example.com" error={errors.email} register={register} disabled />
          </div>
          <div className="w-full flex gap-4 mt-2">
            <div className="w-full md:w-1/2">
              <LabelInput label="Password" type="password" id="password" name="password" placeholder="••••••••" error={errors.password} register={register} required hasicon />
            </div>
            <div className="w-full md:w-1/2">
              <LabelInput label="Konfirmasi Password" type="password" id="confirm_password" name="confirm_password" placeholder="••••••••" error={errors.confirm_password} register={register} required hasicon />
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button type="submit" className="bg-brand-800 hover:bg-brand-900 text-white font-bold py-2 px-4 rounded">
            Ganti password
          </button>
        </div>
      </form>
    </div>
  );
};

export default PasswordChange;
