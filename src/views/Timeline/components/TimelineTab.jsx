import { Fragment } from "react";
import { Tab } from "@headlessui/react";
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
    <div className="w-screen pt-6 bg-whiteSmoke dark:bg-gradient-to-br from-brand2 via-gray-900 to-gray-800">
      <h3></h3>
      <div className="flex flex-col justify-center">
        <Tab.Group selectedIndex={studyActive} onChange={setStudyActive}>
          <Tab.List className="lg:space-x-6 md:space-x-4 space-x-3 rtl:space-x-reverse">
            {buttons.map((item, i) => (
              <Tab as={Fragment} key={i}>
                {({ selected }) => (
                  <button
                    className={`text-sm font-medium mb-7 last:mb-0 capitalize ring-0 foucs:ring-0 focus:outline-none px-6 rounded-md py-2 transition duration-150 ${
                      selected ? "text-white bg-brand-500 " : "text-slate-500 bg-white dark:bg-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {item.title}
                  </button>
                )}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <TimelineUiUx />
            </Tab.Panel>
            <Tab.Panel>
              <TimelineDatabase />
            </Tab.Panel>
            <Tab.Panel>
              <TimelineBackend />
            </Tab.Panel>
            <Tab.Panel>
              <TimelineFrontEnd />
            </Tab.Panel>
            <Tab.Panel>
              <CommingSoon />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default TimelineTab;
