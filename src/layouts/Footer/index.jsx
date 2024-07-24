import JvalleyLogo from "@/assets/logo/logosmalldark.png";
import { Link } from "react-router-dom";
import { FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white dark:bg-gradient-to-r from-black via-background-900 to-background-500 pt-4">
      <footer className="relative w-full">
        <div className="w-full px-4 md:px-8 xl:px-10 mx-auto max-w-7xl">
          <div className="grid justify-between grid-cols-1 gap-1 md:gap-2 xl:gap-4 md:grid-cols-2">
            <div className="flex gap-4 my-2 text-start text-black dark:text-white">
              <img src={JvalleyLogo} className="w-20 md:w-24 h-20 md:h-24 text-start font-sans text-xl antialiased font-semibold tracking-normal text-inherit md:-mt-2" />
              <div className="flex flex-col">
                <p>Jl Menteng Dalam RT015/011</p>
                <p>Kel Menteng Dalam Kec Tebet</p>
                <p>Kota Jakarta Selatan 12870</p>
              </div>
            </div>
            <div className="grid justify-between grid-cols-2 gap-0">
              <ul className="text-start">
                <p className="block mb-3 font-sans text-lg text-black dark:text-neutral-200 font-medium leading-normal">{t("Komunitas")}</p>
                <li>
                  <Link to="/tentang" className="block py-1.5 font-sans text-base font-normal leading-relaxed text-black dark:text-neutral-200 antialiased transition-colors hover:text-blue-gray-900">
                    {t("Tentang kami")}
                  </Link>
                </li>

                <li>
                  <Link target="_blank" to="https://t.me/jvalleyverse" className="block py-1.5 font-sans text-base font-normal leading-relaxed text-black dark:text-neutral-200 antialiased transition-colors hover:text-blue-gray-900">
                    {t("Grup Telegram")}
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="block py-1.5 font-sans text-base font-normal leading-relaxed text-black dark:text-neutral-200 antialiased transition-colors hover:text-blue-gray-900">
                    {t("Pertanyaan")}
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="block py-1.5 font-sans text-base font-normal leading-relaxed text-black dark:text-neutral-200 antialiased transition-colors hover:text-blue-gray-900">
                    Blog
                  </Link>
                </li>
              </ul>
              <ul className="text-start">
                <p className="block mb-3 font-sans text-lg antialiased font-medium leading-normal text-black dark:text-neutral-200">{t("Kelas Online")}</p>
                <li>
                  <Link to="/signin" className="block py-1.5 font-sans text-base font-normal leading-relaxed text-black dark:text-neutral-200 antialiased transition-colors hover:text-blue-gray-900">
                    {t("Pendaftaran")}
                  </Link>
                </li>
                <li>
                  <Link to="/jalur-belajar" className="block py-1.5 font-sans text-base font-normal leading-relaxed text-black dark:text-neutral-200 antialiased transition-colors hover:text-blue-gray-900">
                    {t("Jalur belajar")}
                  </Link>
                </li>
                <li>
                  <Link to="/belajar/diskusi" className="block py-1.5 font-sans text-base font-normal leading-relaxed text-black dark:text-neutral-200 antialiased transition-colors hover:text-blue-gray-900">
                    {t("Konsultasi")}
                  </Link>
                </li>
                <li>
                  <Link to="/show-case" className="block py-1.5 font-sans text-base font-normal leading-relaxed text-black dark:text-neutral-200 antialiased transition-colors hover:text-blue-gray-900">
                    Show Case
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-full py-4 mt-4 border-t border-gray-500 md:flex-row md:justify-between">
            <p className="block mb-4 font-sans text-sm antialiased font-normal leading-normal text-center text-black dark:text-neutral-200 md:mb-0">
              © {new Date().getFullYear()}{" "}
              <a href="https://jvalleyverse.vercel.app/" target="_blank" className="text-black dark:text-neutral-200">
                Jvalleyverse Community
              </a>
              . All Rights Reserved.
            </p>
            <div className="flex gap-4  sm:justify-center">
              <a
                href="https://www.instagram.com/jvalleyverse"
                target="_blank"
                className="block font-sans text-base antialiased font-light leading-relaxed transition-opacity text-inherit opacity-80 text-black dark:text-neutral-200 hover:text-black dark:hover:text-neutral-200"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/jvalleyverse"
                target="_blank"
                className="block font-sans text-base antialiased font-light leading-relaxed transition-opacity text-inherit opacity-80 text-black dark:text-neutral-200 hover:text-black dark:hover:text-neutral-200"
              >
                <FaTwitter className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/Jvalleyverse"
                target="_blank"
                className="block font-sans text-base antialiased font-light leading-relaxed transition-opacity text-inherit opacity-80 text-black dark:text-neutral-200 hover:text-black dark:hover:text-neutral-200"
              >
                <FaGithub className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Navbar;
