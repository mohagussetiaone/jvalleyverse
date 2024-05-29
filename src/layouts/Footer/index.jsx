import JvalleyLogo from "@/assets/logo/logo.png";
import { Link } from "react-router-dom";
import { FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";

const index = () => {
  return (
    <div className="bg-white dark:bg-gradient-to-br from-black via-brand2 to-gray-900 pt-10">
      <footer className="relative w-full">
        <div className="w-full px-8 md:px-14 mx-auto max-w-7xl">
          <div className="grid justify-between grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex flex-col text-start text-black dark:text-white">
              <img src={JvalleyLogo} className="w-60 md:w-72 block text-start mb-6 font-sans text-xl antialiased font-semibold tracking-normal text-inherit" />
              <p>Jl Menteng Dalam RT015/011</p>
              <p>Kel Menteng Dalam Kec Tebet</p>
              <p>Kota Jakarta Selatan 12870</p>
            </div>
            <div className="grid justify-between grid-cols-2 gap-0 py-10 md:py-0 ">
              <ul>
                <p className="block mb-3 font-sans text-lg text-black dark:text-neutral-200 font-medium leading-normal">Komunitas</p>
                <li>
                  <a href="#" className="block py-1.5 font-sans text-base font-normal leading-relaxed text-black dark:text-neutral-200 antialiased transition-colors hover:text-blue-gray-900">
                    Tentang kami
                  </a>
                </li>
                <li>
                  <a href="#" className="block py-1.5 font-sans text-base font-normal leading-relaxed text-black dark:text-neutral-200 antialiased transition-colors hover:text-blue-gray-900">
                    Tracking belajar
                  </a>
                </li>
                <li>
                  <a href="#" className="block py-1.5 font-sans text-base font-normal leading-relaxed text-black dark:text-neutral-200 antialiased transition-colors hover:text-blue-gray-900">
                    Kesempatan kerja
                  </a>
                </li>
                <li>
                  <a href="#" className="block py-1.5 font-sans text-base font-normal leading-relaxed text-black dark:text-neutral-200 antialiased transition-colors hover:text-blue-gray-900">
                    Informasi terkini
                  </a>
                </li>
              </ul>
              <ul>
                <p className="block mb-3 font-sans text-lg antialiased font-medium leading-normal text-black dark:text-neutral-200">Kelas Online</p>
                <li>
                  <a href="#" className="block py-1.5 font-sans text-base font-normal leading-relaxed text-black dark:text-neutral-200 antialiased transition-colors hover:text-blue-gray-900">
                    Pendaftaran
                  </a>
                </li>
                <li>
                  <a href="#" className="block py-1.5 font-sans text-base font-normal leading-relaxed text-black dark:text-neutral-200 antialiased transition-colors hover:text-blue-gray-900">
                    Konsultasi
                  </a>
                </li>
                <li>
                  <a href="#" className="block py-1.5 font-sans text-base font-normal leading-relaxed text-black dark:text-neutral-200 antialiased transition-colors hover:text-blue-gray-900">
                    Events
                  </a>
                </li>
                <li>
                  <Link to="/faq" className="block py-1.5 font-sans text-base font-normal leading-relaxed text-black dark:text-neutral-200 antialiased transition-colors hover:text-blue-gray-900">
                    Pertanyaan
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-full py-4 mt-12 border-t border-gray-500 md:flex-row md:justify-between">
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

export default index;
