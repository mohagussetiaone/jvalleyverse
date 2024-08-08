import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import supabase from "@/config/supabaseConfig";
import toast from "react-hot-toast";
import { set } from "@/store/local/Forage";
import { useTranslation } from "react-i18next";
import { IoMdArrowBack } from "react-icons/io";

const SignIn = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const savedEmail = localStorage.getItem("email") || "";
  const savedPassword = localStorage.getItem("password") || "";

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      email: savedEmail,
      password: savedPassword,
    },
  });

  useEffect(() => {
    setValue("email", savedEmail);
    setValue("password", savedPassword);
  }, [savedEmail, savedPassword, setValue]);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleLoginWithGoogle = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) {
      alert("failed to login");
    }
    console.log("data", data);
  };

  const handleSignInWithEmailPassword = async (data) => {
    const { email, password } = data;
    if (!email || !password) {
      toast.error("Email dan Password harus diisi");
      return;
    }
    const loadingToast = toast.loading("Memproses login...");
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      console.log("data response login", data);
      set(data && data?.session?.access_token);
      setTimeout(async () => {
        toast.dismiss(loadingToast);
        if (data?.session === null) {
          toast.error("User tidak ditemukan");
          return;
        } else if (data?.session !== null) {
          toast.success("Login Berhasil", {
            duration: 1900,
          });
          if (rememberMe) {
            localStorage.setItem("email", email);
            localStorage.setItem("password", password);
          } else {
            localStorage.removeItem("email");
            localStorage.removeItem("password");
          }
          navigate("/");
        }
        if (error) {
          throw new Error(error.message);
        }
      }, 2000);
    } catch (error) {
      setTimeout(() => {
        toast.dismiss(loadingToast);
        toast.error(error.message || "Terjadi kesalahan saat login", {
          duration: 4000,
        });
      }, 2000);
    }
  };

  useEffect(() => {
    const clearLocalStorage = () => {
      if (!rememberMe) {
        localStorage.removeItem("email");
        localStorage.removeItem("password");
      }
    };
    window.addEventListener("beforeunload", clearLocalStorage);
    return () => {
      window.removeEventListener("beforeunload", clearLocalStorage);
    };
  }, [rememberMe]);

  function backToDashboard() {
    navigate(-1);
  }

  return (
    <>
      <Helmet>
        <title>Jvalleyverse - Login</title>
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
        <div className="bg-gradient-to-br from-background-500 via-black to-brand-800 w-full h-screen flex items-center justify-center">
          <div className="max-w-xl p-2 md:py-4 xl:py-6 md:px-8 xl:px-16 mx-auto bg-white rounded-lg shadow">
            <button className="flex bg-white text-blue-600 hover:border-none active:border-none justify-start my-2" onClick={backToDashboard}>
              <IoMdArrowBack className="text-blue-600 text-xl mt-1 mr-2" />
              {t("Kembali ke dashboard")}
            </button>
            <h1 className="text-xl flex justify-center text-black md:text-2xl font-bold leading-tight mt-4">{t("Masuk ke akun anda")}</h1>
            <form className="mt-6 px-2" onSubmit={handleSubmit(handleSignInWithEmailPassword)}>
              <div>
                <label className="flex justify-start text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  {...register("email", { required: true })}
                  placeholder={t("Masukkan email")}
                  className="w-full text-black px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                  autoFocus
                  autoComplete="on"
                  required
                />
              </div>
              <div className="mt-4">
                <label className="flex justify-start text-gray-700">{t("Kata sandi")}</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    {...register("password", { required: true, minLength: 6 })}
                    placeholder={t("Masukkan kata sandi")}
                    className="w-full text-black px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                    required
                  />
                  <span className="absolute inset-y-0 right-0 pr-3 mt-2 flex items-center cursor-pointer" onClick={togglePasswordVisibility}>
                    {showPassword ? <AiOutlineEye className="text-gray-500 w-5 h-5" /> : <AiOutlineEyeInvisible className="text-gray-500 w-5 h-5" />}
                  </span>
                </div>
              </div>
              <div className="text-right flex justify-between mt-2">
                <div className="mb-4 flex items-center justify-between px-2">
                  <div className="flex items-center mb-2">
                    <input className="h-4 w-4 mr-2 leading-tight cursor-pointer" type="checkbox" id="rememberMeCheckbox" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
                    <label className="text-sm text-black" htmlFor="rememberMeCheckbox">
                      {t("Ingat Saya")}
                    </label>
                  </div>
                </div>
                <div>
                  <Link to="/reset-password" className="text-sm font-semibold text-blue-500 hover:text-blue-700 focus:text-blue-700">
                    {t("Lupa Password?")}
                  </Link>
                </div>
              </div>
              <button type="submit" className="w-full block bg-blue-600 hover:bg-blue-700 focus:bg-indigo-400 text-white font-semibold rounded-lg px-4 py-3 mt-2">
                {t("Masuk akun")}
              </button>
            </form>
            <div className="flex items-center justify-center my-2">
              <hr className="border-gray-300 w-full" />
              <span className="px-4 text-gray-500">{t("Atau")}</span>
              <hr className="border-gray-300 w-full" />
            </div>
            <div className="flex justify-center mx-2">
              <button type="button" className="w-[325px] md:w-full md:px-14 bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg py-3 border border-gray-300" onClick={handleLoginWithGoogle}>
                <div className="flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
                    <path
                      fill="#fbc02d"
                      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                    ></path>
                    <path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                    <path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                    <path
                      fill="#1565c0"
                      d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                    ></path>
                  </svg>
                  <span className="md:ml-4 ml-2">{t("Masuk dengan Google")}</span>
                </div>
              </button>
            </div>
            <p className="mt-2 mx-2 flex justify-start text-black">
              {t("Belum mempunyai akun?")}{" "}
              <Link to="/signup" className="text-blue-500 hover:text-blue-700 font-semibold">
                {"  "}
                {t("Buat akun")}
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignIn;
