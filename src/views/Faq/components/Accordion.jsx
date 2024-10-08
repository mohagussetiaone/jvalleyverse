import { useState } from "react";
import { FaAngleRight } from "react-icons/fa";
const Accordion = ({ isiFAQ }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const handleToggle = (index) => {
    if (openIndex === index) {
      // Close the accordion if it's already open
      setOpenIndex(null);
    } else {
      // Open the clicked accordion
      setOpenIndex(index);
    }
  };

  return (
    isiFAQ && (
      <div className="w-full h-full py-4 md:py-4 px-4 md:px-6 sm:overflow-x-auto">
        <div className="space-y-4">
          {isiFAQ.map((faq, index) => (
            <div key={index}>
              <button className="w-full bg-gray-200 dark:bg-black text-left px-2 py-2 md:py-4 dark:text-gray-200 focus:outline-none focus:border-none font-medium flex justify-between items-center" onClick={() => handleToggle(index)}>
                {faq.pertanyaan}
                <FaAngleRight className={`w-5 h-5 transform transition-transform duration-700 ${openIndex === index ? "rotate-90" : ""}`} />
              </button>
              <div className={`transition-max-height bg-white dark:bg-black/80 duration-600 ease-in-out overflow-hidden ${openIndex === index ? "max-h-96" : "max-h-0"}`}>
                <div className="p-4 text-sm dark:text-neutral-200">{faq.jawaban}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default Accordion;
