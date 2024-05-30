// import { useState } from "react";
import { IoImageOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import ProfileImage from "@/assets/img/CustomerService.png";

const BannerProfile = () => {
  //   const [activeTab, setActiveTab] = useState("profile");

  //   const tabContentData = [
  //     {
  //       id: 1,
  //       label: "Profile",
  //       value: "profile",
  //       content: (
  //         <div className="w-full h-full p-3">
  //           <div className="flex ">
  //             <div className="mt-2 mb-2 md:mb-4 w-full">
  //               <h4 className="px-2 text-xl font-bold text-navy-700 dark:text-white">Informasi Pribadi</h4>
  //             </div>
  //           </div>
  //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:px-2">
  //             <div className="rounded-lg bg-gray-200 dark:bg-boxDarkSecondary px-3 md:py-4 dark:bg-boxdark-2 dark:shadow-none">
  //               <p className="font-semibold dark:text-gray-500">Nama Lengkap</p>
  //               <p className="text-sm font-medium text-navy-700 dark:text-white">Moh Agus Setiawan</p>
  //             </div>
  //             <div className="rounded-lg bg-gray-200 dark:bg-boxDarkSecondary px-3 md:py-4 dark:bg-boxdark-2 dark:shadow-none">
  //               <p className="font-semibold dark:text-gray-500">Email</p>
  //               <p className="text-sm font-medium text-navy-700 dark:text-white">mohagussetiaone@gmail.com</p>
  //             </div>
  //             <div className="rounded-lg bg-gray-200 dark:bg-boxDarkSecondary px-3 md:py-4 dark:bg-boxdark-2 dark:shadow-none">
  //               <p className="font-semibold dark:text-gray-500">Nomor Telepon</p>
  //               <p className="text-sm font-medium text-navy-700 dark:text-white">6287885159098</p>
  //             </div>
  //           </div>
  //           <div className="mt-4 flex justify-end">
  //             <button className="w-[250px] rounded-lg text-sm p-1 bg-blue-500 dark:bg-blue-700 dark:text-white hover:bg-blue-700 text-white">Simpan perubahan</button>
  //           </div>
  //         </div>
  //       ),
  //     },
  //     {
  //       id: 2,
  //       label: "Passwords",
  //       value: "password",
  //       content: <h3>Password</h3>,
  //     },
  //     {
  //       id: 3,
  //       label: "Notifikasi",
  //       value: "notification",
  //       content: (
  //         <div className="w-full h-full p-3">
  //           <h3>Notifikasi tab</h3>
  //         </div>
  //       ),
  //     },
  //   ];

  //   const changeTab = (value) => {
  //     setActiveTab(value);
  //   };

  return (
    <>
      <div className="flex flex-col md:flex-row py-8 px-4 md:px-8 xl:px-10 justify-between h-full bg-gray-200 dark:bg-gradient-to-r from-black/90 to-brand2">
        <div className="flex relative items-center">
          <img className="h-auto w-20 md:w-28 xl:w-44 rounded-full bg-white/70 border-gray-100 border-4" src={ProfileImage} alt="profile.jpg" />
          <div className="absolute">
            <input type="file" className="hidden" accept=".jpg,.jpeg,.png,.gif,.bmp,.svg" />
            <button className="p-1 bg-white dark:bg-graydark dark:text-gray-100 border border-gray-100 shadow absolute top-4 -right-20 xl:-right-24 md:-right-28 rounded-full">
              <IoImageOutline className="size-5 dark:text-boxDark" />
            </button>
          </div>
          <div className="ml-4 md:ml-8 xl:ml-14 mt-0 md:mt-4 flex flex-col justify-between text-start">
            <div className="text-xl font-bold text-navy-700 dark:text-white">Moh Agus Setiawan</div>
            <div className="space-y-2">
              <span className="text-navy-700 dark:text-white">mohagussetiaone@gmail.com</span>
            </div>
          </div>
        </div>
        <div className="flex md:mt-4 ml-24 xl:mr-14 items-center justify-start xl:justify-end">
          <Link to="/setting" className="text-sm text-black dark:text-gray-200 border-[1px] border-gray-600 rounded-lg py-1 md:py-2 px-2 md:px-4">
            Edit Profile
          </Link>
        </div>
      </div>
    </>
  );
};

export default BannerProfile;
