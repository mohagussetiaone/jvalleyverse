import { Fragment } from "react";
import { Tab, TabGroup, TabList, TabPanels, TabPanel } from "@headlessui/react";
import DetailProfile from "./components/DetailProfile";
import PersonalData from "./components/PersonalData";
import PasswordChange from "./components/PasswordChange";
import { handleGetProfile } from "@/api/Profile/ProfileApi";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const buttons = [
  {
    title: "Detail profile",
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
    <div className="w-full bg-gray-100 dark:bg-brand2 p-10 md:py-20 mx-auto md:px-24">
      <TabGroup className="w-full">
        <div className="grid grid-cols-12 md:gap-10">
          <div className="lg:col-span-2 md:col-span-3 col-span-12">
            <TabList>
              {buttons.map((item, i) => (
                <Tab key={i} as={Fragment}>
                  {({ selected }) => (
                    <div
                      className={`text-sm font-medium md:block inline-block mb-4 last:mb-0 capitalize ring-0 foucs:ring-0 focus:outline-none px-6 rounded-md py-2 transition duration-150 cursor-pointer ${
                        selected ? "text-white bg-gray-800 dark:bg-black" : "text-slate-500 bg-gray-200 dark:bg-black/20 dark:text-slate-300"
                      }`}
                    >
                      {item.title}
                    </div>
                  )}
                </Tab>
              ))}
            </TabList>
          </div>
          <div className="lg:col-span-10 md:col-span-11 col-span-12">
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
  );
};

export default Settings;
