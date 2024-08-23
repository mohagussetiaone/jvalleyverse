import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import supabase from "@/config/supabaseConfig";
import { RiHome6Line, RiUser3Line, RiBook2Line, RiSettings4Line } from "react-icons/ri";
import ModalConfirmation from "@/components/ModalConfirmation";
import { remove } from "@/store/local/Forage";
import { useQuery } from "@tanstack/react-query";
import { handleGetProfile } from "@/api/Profile/ProfileApi";
import ImageDefault from "@/assets/profile/profileDefault.jpg";

const DropdownUser = () => {
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
      <Link ref={trigger} onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-4" to="#">
        <span>
          <img src={userProfile?.profile_image_url !== null ? `${import.meta.env.VITE_CDN_GET_IMAGE}/jvalleyverseImg/${userProfile?.profile_image_url}` : ImageDefault} alt="profile_picture.jpg" className="rounded-full w-10 h-10 -mt-1" />
        </span>
      </Link>

      {/* <!-- Dropdown Start --> */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute rounded-md right-0 mt-5 pt-4 flex w-52 flex-col bg-white dark:bg-background-900 ${dropdownOpen === true ? "block" : "hidden"}`}
      >
        <div className="flex flex-col justify-start text-black dark:text-neutral-200 px-6 pb-2">
          <h3>{userProfile?.name}</h3>
          <p>Theme </p>
        </div>
        <hr className="border-stroke py-2" />
        <ul className="flex flex-col gap-3 md:gap-4 border-stroke px-6 dark:border-black">
          <li>
            <Link
              to="/"
              className="flex items-center gap-3 text-sm font-medium duration-300 ease-in-out cursor-pointer hover:text-black lg:text-base text-gray-900 dark:text-neutral-200 dark:hover:text-white border-gray-700"
              onClick={() => setDropdownOpen(false)}
            >
              <RiHome6Line className="w-5 h-5" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className="flex items-center gap-3 text-sm font-medium duration-300 ease-in-out cursor-pointer hover:text-black lg:text-base text-gray-900 dark:text-neutral-200 dark:hover:text-white border-gray-700"
              onClick={() => setDropdownOpen(false)}
            >
              <RiUser3Line className="w-5 h-5" />
              {t("Profil Saya")}
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className="flex items-center gap-3 text-sm font-medium duration-300 ease-in-out cursor-pointer hover:text-black lg:text-base text-gray-900 dark:text-neutral-200 dark:hover:text-white border-gray-700"
              onClick={() => setDropdownOpen(false)}
            >
              <RiBook2Line className="w-5 h-5" />
              {t("Kelas Saya")}
            </Link>
          </li>
          <li>
            <Link
              to="/settings"
              className="flex items-center gap-3 text-sm font-medium duration-300 ease-in-out cursor-pointer hover:text-black lg:text-base text-gray-900 dark:text-neutral-200 dark:hover:text-white border-gray-700"
              onClick={() => setDropdownOpen(false)}
            >
              <RiSettings4Line className="w-5 h-5" />
              {t("Pengaturan")}
            </Link>
          </li>
        </ul>
        <button
          className="flex bg-transparent justify-center mt-4 items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out text-red-500 hover:text-red-600 border-none lg:text-base"
          onClick={() => {
            setModalLogout(true);
            setDropdownOpen(false);
          }}
        >
          {t("Keluar")}
        </button>
        {modalLogout && <ModalConfirmation showModalConfirm={modalLogout} setShowModalConfirm={modalLogoutClose} funcConfirm={handleLogout} />}
      </div>
    </div>
  );
};

export default DropdownUser;
