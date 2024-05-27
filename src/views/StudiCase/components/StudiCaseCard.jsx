import Project from "./Project";
import StudyCase from "./StudyCase";
import ErrorDiscussion from "./ErrorDiscussion";
import Library from "./Library";
import Explore from "./Explore";
import Mentoring from "./Mentoring";
import Tutorial from "./Tutorial";
import useActiveMenu from "@/hooks/useActiveMenu";

const StudiCaseCard = () => {
  const { activeMenu } = useActiveMenu();
  return (
    <>
      <div className="bg-gradient-to-tr w-screen from-black via-brand2 to-gray-900">
        <div className="flex">
          {activeMenu === 1 && <Project />}
          {activeMenu === 2 && <StudyCase />}
          {activeMenu === 3 && <ErrorDiscussion />}
          {activeMenu === 4 && <Library />}
          {activeMenu === 5 && <Explore />}
          {activeMenu === 6 && <Mentoring />}
          {activeMenu === 7 && <Tutorial />}
        </div>
      </div>
    </>
  );
};

export default StudiCaseCard;
