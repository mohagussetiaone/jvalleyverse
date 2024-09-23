import { Tab, TabGroup, TabList, TabPanels, TabPanel } from "@headlessui/react";
import ProgressCard from "./ProgressCard";
import CertificateList from "./CertificateList";
import useActiveMenu from "@/hooks/useActiveMenu";
import ShowCase from "./ShowCase";
import { useTranslation } from "react-i18next";

const TabMenuProfile = () => {
  const { t } = useTranslation();
  const { activeMenu, setActiveMenu } = useActiveMenu();

  return (
    <div className="bg-gray-200 dark:bg-primaryDark/90">
      <div className="flex flex-col justify-start">
        <TabGroup selectedIndex={activeMenu} onChange={setActiveMenu}>
          <div className="flex my-4 px-4 md:px-8 xl:px-10">
            <TabList className="flex gap-4">
              <Tab
                className={({ selected }) =>
                  `rounded-none text-black dark:text-neutral-200 text-sm whitespace-nowrap border-none ${selected ? "bg-gray-300 dark:bg-brand-900 dark:text-neutral-200 border border-black" : "bg-white dark:bg-secondaryDark/90"}`
                }
              >
                {t("Progress belajar")}
              </Tab>
              <Tab
                className={({ selected }) =>
                  `rounded-none text-black dark:text-neutral-200 text-sm whitespace-nowrap border-none ${selected ? "bg-gray-300 dark:bg-brand-900 dark:text-neutral-200 border border-black" : "bg-white dark:bg-secondaryDark/90"}`
                }
              >
                {t("Sertifikat")}
              </Tab>
              <Tab
                className={({ selected }) =>
                  `rounded-none text-black dark:text-neutral-200 text-sm whitespace-nowrap border-none ${selected ? "bg-gray-300 dark:bg-brand-900 dark:text-neutral-200 border border-black" : "bg-white dark:bg-secondaryDark/90"}`
                }
              >
                Show Case
              </Tab>
            </TabList>
          </div>
          <div>
            <TabPanels>
              <TabPanel>
                <ProgressCard />
              </TabPanel>
              <TabPanel>
                <CertificateList />
              </TabPanel>
              <TabPanel>
                <ShowCase />
              </TabPanel>
            </TabPanels>
          </div>
        </TabGroup>
      </div>
    </div>
  );
};

export default TabMenuProfile;
