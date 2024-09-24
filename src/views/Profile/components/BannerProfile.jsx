import { Link } from "react-router-dom";
import ImageDefault from "@/assets/profile/profileDefault.jpg";
import { handleGetProfile } from "@/api/Profile/ProfileApi";
import { useQuery } from "@tanstack/react-query";
import { useCheckSession } from "@/api/Auth/CheckSession";

const BannerProfile = () => {
  const { data: userProfile } = useQuery({
    queryKey: ["getProfile"],
    queryFn: handleGetProfile,
  });

  const { data: dataSession } = useQuery({
    queryKey: ["checkSession"],
    queryFn: useCheckSession,
  });

  console.log("userProfile", userProfile);

  return (
    <>
      <div className="flex flex-col md:flex-row py-10 px-4 md:px-8 xl:px-10 justify-between h-full bg-white dark:bg-primaryDark">
        <div className="flex relative items-center">
          <img
            className="h-auto w-20 md:w-28 xl:w-44 rounded-full bg-white/70 dark:bg-secondaryDark border-4 border-gray-300 dark:border-brand-500"
            src={
              dataSession?.session?.user?.app_metadata?.provider === "google"
                ? dataSession?.session?.user?.user_metadata?.avatar_url
                : userProfile?.profile_image_url !== null
                ? `${import.meta.env.VITE_CDN_GET_IMAGE}/jvalleyverseImg/${userProfile?.profile_image_url}`
                : ImageDefault
            }
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
          <Link to="/settings" className="text-sm text-black dark:text-brand-500 border-[1px] border-gray-600 dark:border-brand-500 rounded-lg py-1 md:py-2 px-2 md:px-4">
            Edit Profile
          </Link>
        </div>
      </div>
    </>
  );
};

export default BannerProfile;
