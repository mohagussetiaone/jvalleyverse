import { Tab } from "@headlessui/react";
import ProgressCard from "./ProgressCard";
import CertificateList from "./CertificateList";
import useActiveMenu from "@/hooks/useActiveMenu";
import ShowCase from "./ShowCase";

const TabMenuProfile = () => {
  const { activeMenu, setActiveMenu } = useActiveMenu();

  return (
    <div className="bg-gray-200 dark:bg-gradient-to-r from-black/90 to-brand2">
      <div className="flex flex-col justify-start">
        <Tab.Group selectedIndex={activeMenu} onChange={setActiveMenu}>
          <div className="flex my-4 px-4 md:px-8 xl:px-10">
            <Tab.List className="flex gap-4">
              <Tab className={({ selected }) => (selected ? "rounded-none border-none bg-white dark:bg-black/90 dark:text-neutral-200 text-black border border-black" : "bg-white dark:bg-black/20 text-gray-300 rounded-none")}>
                Progress belajar
              </Tab>
              <Tab className={({ selected }) => (selected ? "rounded-none border-none bg-white dark:bg-black/90 dark:text-neutral-200 text-black border border-black" : "bg-white dark:bg-black/20 text-gray-300 rounded-none")}>
                Sertifikat
              </Tab>
              <Tab className={({ selected }) => (selected ? "rounded-none border-none bg-white dark:bg-black/90 dark:text-neutral-200 text-black border border-black" : "bg-white dark:bg-black/20 text-gray-300 rounded-none")}>Show Case</Tab>
            </Tab.List>
          </div>
          <div>
            <Tab.Panels>
              <Tab.Panel>
                <ProgressCard />
              </Tab.Panel>
              <Tab.Panel>
                <CertificateList />
              </Tab.Panel>
              <Tab.Panel>
                <ShowCase />
              </Tab.Panel>
            </Tab.Panels>
          </div>
        </Tab.Group>
      </div>
    </div>
  );
};

export default TabMenuProfile;
