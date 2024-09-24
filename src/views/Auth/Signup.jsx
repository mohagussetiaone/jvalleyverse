import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate, useLoaderData, redirect } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import toast from "react-hot-toast";
import supabase from "@/config/supabaseConfig";
import { useTranslation } from "react-i18next";
import { IoMdArrowBack } from "react-icons/io";

const SignUp = () => {
  const { isAlreadyLoggedIn } = useLoaderData();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirPassword, setShowConfirPassword] = useState(false);

  useEffect(() => {
    if (isAlreadyLoggedIn) {
      toast.error("You're already logged in!");
      // Redirect setelah menampilkan toast
      redirect("/");
    }
  }, [isAlreadyLoggedIn]);

  const [formData, setFormData] = useState({
    namalengkap: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleConfirmationPassword = () => {
    setShowConfirPassword((prevShowConfirPassword) => !prevShowConfirPassword);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const SignUp = async (e) => {
  //   e.preventDefault();
  //   if (formData.confirmPassword !== formData.password) {
  //     toast.error("konfirmasi password harus sama.");
  //     return;
  //   }
  //   const loadingToast = toast.loading("Memproses pendaftaran...");
  //   try {
  //     const { data, error } = await supabase.auth.signUp({
  //       email: formData.email,
  //       password: formData.password,
  //     });
  //     setTimeout(async () => {
  //       toast.dismiss(loadingToast);
  //       if (data?.session !== null) {
  //         toast.success("Pendaftaran akun Berhasil", {
  //           duration: 1900,
  //         });
  //         setFormData({
  //           email: "",
  //           password: "",
  //         });
  //         navigate("/signin");
  //         return data;
  //       } else if (data?.session === null) {
  //         toast.error("User sudah terdaftar");
  //       } else {
  //         toast.error(error.message);
  //       }
  //       if (error) toast.error(error.message);
  //     }, 2000);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const signUpAdmin = async (e) => {
    e.preventDefault();
    if (formData.confirmPassword !== formData.password) {
      toast.error("konfirmasi password harus sama.");
      return;
    }
    const promise = new Promise((resolve, reject) => {
      (async () => {
        try {
          // Membuat pengguna baru admin dengan Supabase
          const { data: userAdmin, error } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
          });
          console.log("userAdmin", userAdmin);
          if (error) {
            reject(error);
            return;
          }
          if (userAdmin) {
            const { data: dataUser, error: errorUser } = await supabase.schema("user").from("users").insert({
              id: userAdmin.user.id,
              role_id: 3,
              email: formData.email,
              verify: true,
            });
            console.log("dataUser", dataUser);
            console.log("errorUser", errorUser);
            if (errorUser) {
              reject(errorUser);
              return;
            }
            navigate("/");
            resolve("Sign Up Berhasil");
          }
        } catch (error) {
          console.log("error", error);
          if (error.message === "Network Error") {
            reject("Internal Server Error");
          } else {
            reject(error.message || "Email atau Password tidak valid");
          }
        }
      })();
    });

    toast.promise(
      promise,
      {
        loading: "Processing ...",
        success: (message) => message,
        error: (message) => message,
      },
      {
        success: {
          duration: 1900,
        },
        error: {
          duration: 4000,
        },
      }
    );
  };

  return (
    <>
      <Helmet>
        <title>Jvalleyverse - Register</title>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/logosmalldark.png" />
        <meta data-rh="true" name="robots" content="index,follow" />
        <meta data-rh="true" name="googlebot" content="index,follow" />
        <meta name="google-site-verification" content="rfHxt49m6Pm8OYRF_sbphjX7fCLLlfY_RibGFeNQuzs" />
        <meta name="viewport" content="width=device-width" />
        <meta name="title" content="Jvalleyverse - Belajar dan Berkembang Bersama" />
        <meta name="description" content="Bergabunglah dengan Jvalleyverse komunitas IT gratis untuk belajar, berbagi pengetahuan, dan berkembang bersama para profesional dan penggemar IT dari berbagai latar belakang." />
        <meta name="keywords" content="jvalleyverse, jvalley, komunitas IT, IT gratis, belajar IT, forum IT, dukungan IT, diskusi IT, pengembangan IT, jaringan IT, teknologi informasi, pemrograman" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Jvalleyverse" />
        <meta property="og:title" content="Jvalleyverse - Belajar dan Berkembang Bersama" />
        <meta property="og:description" content="Bergabunglah dengan jvalleyverse komunitas IT gratis untuk belajar, berbagi pengetahuan, dan berkembang bersama para profesional dan penggemar IT dari berbagai latar belakang." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://jvalleyverse.vercel.app/" />
        <meta property="og:image" content="/logosmalldark.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Jvalleyverse - Belajar dan Berkembang Bersama" />
        <meta name="twitter:description" content="Bergabunglah dengan komunitas IT gratis untuk belajar, berbagi pengetahuan, dan berkembang bersama para profesional dan penggemar IT dari berbagai latar belakang." />
        <meta name="twitter:image" content="/logosmalldark.png" />
      </Helmet>
      <section className="flex flex-col w-screen md:flex-row h-screen items-center overflow-hidden">
        <div className="bg-gradient-to-br from-brand-600 via-black to-primaryDark w-full h-screen flex items-center justify-center">
          <div className="w-full max-w-md mx-2 p-2 px-4 md:py-6 xl:py-8 md:px-8 xl:px-16 bg-white rounded-lg shadow">
            <Link to="/" className="flex justify-start my-2">
              <IoMdArrowBack className="text-blue-600 text-xl mt-1 mr-2" />
              {t("Kembali ke dashboard")}
            </Link>
            <h1 className="text-xl flex justify-center text-black md:text-2xl font-bold leading-tight">{t("Daftar akun")}</h1>
            <form className="mt-6" onSubmit={signUpAdmin}>
              <div className="mt-2">
                <label className="flex justify-start text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={t("Masukkan email")}
                  className="w-full text-black px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  autoFocus
                  autoComplete="on"
                  required
                />
              </div>
              <div className="mt-2">
                <label className="flex justify-start text-gray-700">{t("Kata sandi")}</label>
                <div className="relative">
                  <input
                    type={showConfirPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder={t("Masukkan kata sandi")}
                    minLength="6"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full text-black px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                    required
                  />
                  <span className="absolute inset-y-0 right-0 pr-3 mt-2 flex items-center cursor-pointer" onClick={toggleConfirmationPassword}>
                    {showConfirPassword ? <AiOutlineEye className="text-gray-500 w-5 h-5" /> : <AiOutlineEyeInvisible className="text-gray-500 w-5 h-5" />}
                  </span>
                </div>
              </div>
              <div className="mt-2">
                <label className="flex justify-start text-gray-700">{t("Konfirmasi kata sandi")}</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder={t("Masukkan ulang kata sandi")}
                    minLength="6"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full text-black px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                    required
                  />
                  <span className="absolute inset-y-0 right-0 pr-3 mt-2 flex items-center cursor-pointer" onClick={togglePasswordVisibility}>
                    {showPassword ? <AiOutlineEye className="text-gray-500 w-5 h-5" /> : <AiOutlineEyeInvisible className="text-gray-500 w-5 h-5" />}
                  </span>
                </div>
              </div>
              <button type="submit" className="w-full mt-8 block bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 text-white font-semibold rounded-lg px-4 py-3">
                {t("Daftar")}
              </button>
            </form>
            <p className="mt-2 text-black">
              {t("Sudah punya akun?")}{" "}
              <Link to="/signin" className="text-blue-500 cursor-pointer hover:text-blue-700 font-semibold">
                {"  "}
                {t("Masuk")}
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
