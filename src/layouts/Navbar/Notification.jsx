import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import supabase from "@/config/supabaseConfig";
import { RiHome6Line, RiUser3Line, RiBook2Line, RiSettings4Line } from "react-icons/ri";
import { LuBell } from "react-icons/lu";
import ModalConfirmation from "@/components/ModalConfirmation";
import { remove } from "@/store/local/Forage";
import { useQuery } from "@tanstack/react-query";
import { handleGetProfile } from "@/api/Profile/ProfileApi";

const Notification = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalLogout, setModalLogout] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  const {
    error: errorUserProfile,
    isLoading: isPendingUserProfile,
    data: userProfile,
  } = useQuery({
    queryKey: ["getProfile"],
    queryFn: handleGetProfile,
  });

  if (errorUserProfile) return toast.error("Error while fetching profile");
  if (isPendingUserProfile) return console.log("Loading...");

  const modalLogoutClose = () => {
    setDropdownOpen(false);
    setModalLogout(false);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.auth.signOut();
      remove("userSession");
      navigate(0);
      if (error) {
        toast.error("Logout gagal. silahkan coba kembali.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative my-1">
      <div ref={trigger} onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-4">
        <div className="flex">
          <LuBell className="w-7 h-7 mt-1 text-gray-800 dark:text-neutral-200" />
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-600 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-700"></span>
          </span>
        </div>
      </div>

      {/* <!-- Dropdown Start --> */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute rounded-md -right-24 mt-5 pt-4 flex w-96 flex-col bg-white dark:bg-background-900 ${dropdownOpen === true ? "block" : "hidden"}`}
      >
        <ul className="flex flex-col gap-3 md:gap-4 border-stroke px-6 dark:border-black">
          <li>
            <div
              className="flex items-center gap-3 text-sm font-medium duration-300 ease-in-out cursor-pointer hover:text-black lg:text-base text-gray-900 dark:text-neutral-200 dark:hover:text-white border-gray-700"
              onClick={() => setDropdownOpen(false)}
            >
              <span>
                <RiHome6Line className="w-7 h-7" />
              </span>
              <span className="line-clamp-2 overflow-hidden text-ellipsis">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
                type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book.
              </span>
            </div>
          </li>
          <li>
            <div
              className="flex items-center gap-3 text-sm font-medium duration-300 ease-in-out cursor-pointer hover:text-black lg:text-base text-gray-900 dark:text-neutral-200 dark:hover:text-white border-gray-700"
              onClick={() => setDropdownOpen(false)}
            >
              <span>
                <RiUser3Line className="w-7 h-7" />
              </span>
              <span className="line-clamp-2 overflow-hidden text-ellipsis">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
                type specimen book.
              </span>
            </div>
          </li>
          <li>
            <div
              className="flex items-center gap-3 text-sm font-medium duration-300 ease-in-out cursor-pointer hover:text-black lg:text-base text-gray-900 dark:text-neutral-200 dark:hover:text-white border-gray-700"
              onClick={() => setDropdownOpen(false)}
            >
              <span>
                <RiBook2Line className="w-7 h-7" />
              </span>
              <span className="line-clamp-2 overflow-hidden text-ellipsis">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
                type specimen book.
              </span>
            </div>
          </li>
          <li>
            <div
              className="flex items-center gap-3 text-sm font-medium duration-300 ease-in-out cursor-pointer hover:text-black lg:text-base text-gray-900 dark:text-neutral-200 dark:hover:text-white border-gray-700"
              onClick={() => setDropdownOpen(false)}
            >
              <span>
                <RiSettings4Line className="w-7 h-7" />
              </span>
              <span className="line-clamp-2 overflow-hidden text-ellipsis">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
                type specimen book.
              </span>
            </div>
          </li>
        </ul>
        <button
          className="flex bg-transparent justify-center items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out text-blue-500 hover:text-blue-600 border-none lg:text-base"
          onClick={() => {
            setModalLogout(true);
            setDropdownOpen(false);
          }}
        >
          {t("Lihat Selengkapnya")}
        </button>
        {modalLogout && <ModalConfirmation showModalConfirm={modalLogout} setShowModalConfirm={modalLogoutClose} funcConfirm={handleLogout} />}
      </div>
    </div>
  );
};

export default Notification;
