import { useTranslation } from "react-i18next";
import Idn from "@/assets/flag/flagIdn.png";
import Uk from "@/assets/flag/flagUk.png";
import { useLanguageStore } from "@/hooks/useLanguage";

const languages = [
  { code: "id", name: "ID", flag: Idn },
  { code: "en", name: "UK", flag: Uk },
];

const ToggleTranslateSwitch = () => {
  const { selectedLang, setSelectedLang } = useLanguageStore();
  const { i18n } = useTranslation();

  const changeLanguage = (lang) => {
    setSelectedLang(lang);
    i18n.changeLanguage(lang.code);
  };

  return (
    <div className="flex items-center space-x-4">
      <div
        className="relative inline-block w-16 h-7 cursor-pointer"
        onClick={() => {
          const newLang = selectedLang.code === languages[0].code ? languages[1] : languages[0];
          changeLanguage(newLang);
        }}
      >
        <div className="block mt-0.5 bg-gray-300 dark:bg-black/40 w-full h-full rounded-full"></div>
        <div className={`absolute left-0 top-0 w-8 h-8 bg-white border-2 border-gray-300 rounded-full transition-transform duration-300 ease-in-out ${selectedLang.code === languages[1].code ? "translate-x-full" : ""}`}>
          <img src={selectedLang.flag} alt={selectedLang.name} className="w-full h-full object-cover rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default ToggleTranslateSwitch;
