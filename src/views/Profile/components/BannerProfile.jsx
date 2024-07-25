import { Link } from "react-router-dom";
import ProfileImage from "@/assets/img/CustomerService.png";
import { handleGetProfile } from "@/api/Profile/ProfileApi";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const BannerProfile = () => {
  const {
    error: errorUserProfile,
    isLoading: isPendingUserProfile,
    data: userProfile,
  } = useQuery({
    queryKey: ["getProfile"],
    queryFn: handleGetProfile,
  });

  if (errorUserProfile) return toast.error("Error while fetching profile");
  if (isPendingUserProfile) return console.log("Loading...");

  console.log("userProfile", userProfile);

  return (
    <>
      <div className="flex flex-col md:flex-row py-10 px-4 md:px-8 xl:px-10 justify-between h-full bg-white dark:bg-gradient-to-r from-black to-background-500">
        <div className="flex relative items-center">
          <img
            className="h-auto w-20 md:w-28 xl:w-44 rounded-full bg-white/70 border-gray-300 border-4"
            src={userProfile?.profile_image_url !== null ? `${import.meta.env.VITE_CDN_GET_IMAGE}/jvalleyverseImg/${userProfile?.profile_image_url}` : ProfileImage}
            alt="profile.jpg"
          />
          <div className="ml-4 md:ml-8 xl:ml-14 mt-0 md:mt-4 flex flex-col justify-between text-start">
            <div className="text-xl font-bold text-navy-700 dark:text-white">{userProfile?.name}</div>
            <div className="space-y-2">
              <span className="text-navy-700 dark:text-white">{userProfile?.email}</span>
            </div>
          </div>
        </div>
        <div className="flex md:mt-4 ml-24 xl:mr-14 items-center justify-start xl:justify-end">
          <Link to="/settings" className="text-sm text-black dark:text-gray-200 border-[1px] border-gray-600 rounded-lg py-1 md:py-2 px-2 md:px-4">
            Edit Profile
          </Link>
        </div>
      </div>
    </>
  );
};

export default BannerProfile;
