import { Fragment } from "react";

import { Tab, TabGroup, TabList, TabPanels, TabPanel } from "@headlessui/react";
import TimelineUiUx from "./UIUX/TimelineUiUx";
import TimelineDatabase from "./Database/TimelineDatabase";
import TimelineBackend from "./BackEnd/TimelineBackend";
import TimelineFrontEnd from "./FrontEnd/TimelineFrontEnd";
// import TimelineTesting from "./Testing/TimelineTesting";
import CommingSoon from "@/components/CommingSoon";
import useStudyActive from "../../../hooks/useStudyActive";

const buttons = [
  {
    title: "UI/UX",
  },
  {
    title: "Database",
  },
  {
    title: "Backend",
  },
  {
    title: "Front End",
  },
  {
    title: "Testing",
  },
];

const TimelineTab = () => {
  const { studyActive, setStudyActive } = useStudyActive();

  return (
    <div className="w-full pt-6 bg-whiteSmoke dark:bg-gradient-to-r from-black via-background-900 to-background-600">
      <div>
        <TabGroup selectedIndex={studyActive} onChange={setStudyActive}>
          <TabList className="flex mx-auto justify-center items-center lg:space-x-6 md:space-x-4 space-x-3 px-4 ">
            <div className="flex overflow-x-scroll md:overflow-x-hidden gap-4">
              {buttons.map((item, i) => (
                <Tab as={Fragment} key={i}>
                  {({ selected }) => (
                    <button
                      className={`text-sm font-medium mb-7 capitalize ring-0 foucs:ring-0 focus:outline-none px-6 rounded-md py-2 transition duration-150 whitespace-nowrap ${
                        selected ? "text-white bg-brand-500 " : "text-slate-500 bg-white dark:bg-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {item.title}
                    </button>
                  )}
                </Tab>
              ))}
            </div>
          </TabList>
          <TabPanels>
            <TabPanel>
              <TimelineUiUx />
            </TabPanel>
            <TabPanel>
              <TimelineDatabase />
            </TabPanel>
            <TabPanel>
              <TimelineBackend />
            </TabPanel>
            <TabPanel>
              <TimelineFrontEnd />
            </TabPanel>
            <TabPanel>
              <CommingSoon />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
};

export default TimelineTab;
