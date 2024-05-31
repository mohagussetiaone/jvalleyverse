import { Tab } from "@headlessui/react";
import ProgressCard from "./ProgressCard";
import Sertifikat from "./Sertifikat";

const TabMenuProfile = () => {
  return (
    <div className="bg-white dark:bg-gradient-to-r from-black/90 to-brand2">
      <div className="flex flex-col justify-start">
        <Tab.Group>
          <div className="flex my-4 px-4 md:px-8 xl:px-10">
            <Tab.List className="flex gap-4">
              <Tab className={({ selected }) => (selected ? "rounded-none border-none bg-gray-200 text-black" : "bg-white text-gray-700 rounded-none")}>Progress belajar</Tab>
              <Tab className={({ selected }) => (selected ? "rounded-none border-none bg-gray-200 text-black" : "bg-white text-gray-700 rounded-none")}>Sertifikat Saya</Tab>
              <Tab className={({ selected }) => (selected ? "rounded-none border-none bg-gray-200 text-black" : "bg-white text-gray-700 rounded-none")}>Show Case</Tab>
            </Tab.List>
          </div>
          <div>
            <Tab.Panels>
              <Tab.Panel>
                <ProgressCard />
              </Tab.Panel>
              <Tab.Panel>
                <Sertifikat />
              </Tab.Panel>
              <Tab.Panel>Content 3</Tab.Panel>
            </Tab.Panels>
          </div>
        </Tab.Group>
      </div>
    </div>
  );
};

export default TabMenuProfile;
