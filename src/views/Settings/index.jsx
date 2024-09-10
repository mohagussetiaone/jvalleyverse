import { Fragment } from "react";
import { Helmet } from "react-helmet-async";
import { Tab, TabGroup, TabList, TabPanels, TabPanel } from "@headlessui/react";
import DetailProfile from "./components/DetailProfile";
import PersonalData from "./components/PersonalData";
import PasswordChange from "./components/PasswordChange";
import { handleGetProfile } from "@/api/Profile/ProfileApi";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAuthValidation } from "@/lib/authValidation";

const buttons = [
  {
    title: "Profile",
    icon: "heroicons-outline:home",
  },
  {
    title: "Personal Data",
    icon: "heroicons-outline:user",
  },
  {
    title: "Password",
    icon: "heroicons-outline:cog",
  },
];

const Settings = () => {
  useAuthValidation();

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
      <Helmet>
        <title>Jvalleyverse - Pengaturan</title>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/logosmalldark.png" />
        <meta data-rh="true" name="robots" content="index,follow" />
        <meta data-rh="true" name="googlebot" content="index,follow" />
        <meta name="google-site-verification" content="rfHxt49m6Pm8OYRF_sbphjX7fCLLlfY_RibGFeNQuzs" />
        <meta name="viewport" content="width=device-width" />
        <meta name="title" content="Jvalleyverse - Belajar dan Berkembang Bersama" />
        <meta name="description" content="Bergabunglah dengan Jvalleyverse komunitas IT gratis untuk belajar, berbagi pengetahuan, dan berkembang bersama para profesional dan penggemar IT dari berbagai latar belakang." />
        <meta name="keywords" content="jvalleyverse, jvalley, komunitas IT, IT gratis, belajar IT, forum IT, dukungan IT, diskusi IT, pengembangan IT, jaringan IT, teknologi informasi, pemrograman" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Jvalleyverse" />
        <meta property="og:title" content="Jvalleyverse - Belajar dan Berkembang Bersama" />
        <meta property="og:description" content="Bergabunglah dengan jvalleyverse komunitas IT gratis untuk belajar, berbagi pengetahuan, dan berkembang bersama para profesional dan penggemar IT dari berbagai latar belakang." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://jvalleyverse.vercel.app/" />
        <meta property="og:image" content="/logosmalldark.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Jvalleyverse - Belajar dan Berkembang Bersama" />
        <meta name="twitter:description" content="Bergabunglah dengan komunitas IT gratis untuk belajar, berbagi pengetahuan, dan berkembang bersama para profesional dan penggemar IT dari berbagai latar belakang." />
        <meta name="twitter:image" content="/logosmalldark.png" />
      </Helmet>
      <div className="w-full bg-gray-100 dark:bg-gradient-to-r from-black via-background-900 to-background-500 p-4 md:p-8 xl:p-10 md:py-20 mx-auto md:px-24">
        <TabGroup className="w-full">
          <div className="grid grid-cols-12 md:gap-10">
            <div className="lg:col-span-2 md:col-span-3 col-span-12 pt-6">
              <TabList className="flex gap-4 flex-row md:flex-col flex-nowrap whitespace-nowrap">
                {buttons.map((item, i) => (
                  <Tab key={i} as={Fragment}>
                    {({ selected }) => (
                      <div
                        className={`text-sm font-medium md:block inline-block last:mb-0 capitalize ring-0 foucs:ring-0 focus:outline-none px-6 rounded-md py-2 transition duration-150 cursor-pointer ${
                          selected ? "text-white bg-gray-800 dark:bg-background-900" : "text-slate-500 bg-gray-200 dark:bg-black/20 dark:text-slate-300"
                        }`}
                      >
                        {item.title}
                      </div>
                    )}
                  </Tab>
                ))}
              </TabList>
            </div>

            <div className="lg:col-span-10 md:col-span-11 col-span-12 mt-8 md:mt-0">
              <TabPanels>
                <TabPanel>
                  <DetailProfile userProfile={userProfile} />
                </TabPanel>
                <TabPanel>
                  <PersonalData userProfile={userProfile} />
                </TabPanel>
                <TabPanel>
                  <PasswordChange userProfile={userProfile} />
                </TabPanel>
              </TabPanels>
            </div>
          </div>
        </TabGroup>
      </div>
    </>
  );
};

export default Settings;
