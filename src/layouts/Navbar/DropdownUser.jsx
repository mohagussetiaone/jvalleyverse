import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import supabase from "@/config/supabaseConfig";
import { RiHome6Line, RiUser3Line, RiBook2Line, RiSettings4Line } from "react-icons/ri";
import ModalConfirmation from "@/components/ModalConfirmation";
import { remove } from "@/store/local/Forage";

const DropdownUser = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalLogout, setModalLogout] = useState(false);
  const imageSrc = `https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?t=st=1717041704~exp=1717045304~hmac=0750efed9eed2f1aeba7b5c0126a6d1f5a91ec1f04b3f0eff376c533164f38bd&w=740`;

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
          <img src={imageSrc} alt="profile_picture.jpg" className="rounded-full w-10 h-10 -mt-1" />
        </span>
      </Link>

      {/* <!-- Dropdown Start --> */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute rounded-sm right-0 mt-5 pt-4 flex w-52 flex-col bg-white  dark:bg-brand2 ${dropdownOpen === true ? "block" : "hidden"}`}
      >
        <ul className="flex flex-col gap-3 md:gap-4 border-stroke px-6 dark:border-black">
          <li>
            <Link to="/" className="flex items-center gap-3 text-sm font-medium duration-300 ease-in-out cursor-pointer hover:text-black lg:text-base text-gray-900 dark:text-neutral-200 dark:hover:text-white border-gray-700">
              <RiHome6Line className="w-5 h-5" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/profile" className="flex items-center gap-3 text-sm font-medium duration-300 ease-in-out cursor-pointer hover:text-black lg:text-base text-gray-900 dark:text-neutral-200 dark:hover:text-white border-gray-700">
              <RiUser3Line className="w-5 h-5" />
              {t("Profil Saya")}
            </Link>
          </li>
          <li>
            <Link to="/profile" className="flex items-center gap-3 text-sm font-medium duration-300 ease-in-out cursor-pointer hover:text-black lg:text-base text-gray-900 dark:text-neutral-200 dark:hover:text-white border-gray-700">
              <RiBook2Line className="w-5 h-5" />
              {t("Kelas Saya")}
            </Link>
          </li>
          <li>
            <Link to="/pengaturan" className="flex items-center gap-3 text-sm font-medium duration-300 ease-in-out cursor-pointer hover:text-black lg:text-base text-gray-900 dark:text-neutral-200 dark:hover:text-white border-gray-700">
              <RiSettings4Line className="w-5 h-5" />
              {t("Pengaturan")}
            </Link>
          </li>
        </ul>
        <button
          className="flex justify-center border-t mt-4 items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out bg-white dark:bg-brand2 text-red-500 hover:text-red-600 hover:bg-red-100/50 border-none lg:text-base"
          onClick={() => setModalLogout(true)}
        >
          {t("Keluar")}
        </button>
        {modalLogout && <ModalConfirmation showModalConfirm={modalLogout} setShowModalConfirm={modalLogoutClose} funcConfirm={handleLogout} />}
      </div>
    </div>
  );
};

export default DropdownUser;
