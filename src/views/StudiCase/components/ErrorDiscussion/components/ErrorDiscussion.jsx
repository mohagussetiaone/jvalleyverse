import CardDiscussion from "./CardDiscussion";
import ResponseDiscussion from "./ResponseDiscussion";

const ErrorDiscussion = () => {
  return (
    <>
      <div className="w-full bg-gray-200">
        <div className="grid grid-cols-12 gap-5 p-2 md:p-4 xl:p-6">
          <div className="col-span-9">
            <CardDiscussion />
          </div>
          <div className="col-span-3">
            <ResponseDiscussion />
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorDiscussion;
