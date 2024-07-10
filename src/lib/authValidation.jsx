// import { useEffect } from "react";
import localforage from "localforage";
// import toast from "react-hot-toast";
import { redirect, useNavigate } from "react-router-dom";
// import { clearAllStorage } from "@/store/local/Forage-Helper";
// import supabase from "@/config/supabaseConfig";

export const authLoader = async ({ request }) => {
  const authToken = await localforage.getItem("userSession");
  const url = new URL(request.url);

  // url protected harus login
  const protectedPaths = ["/profile"];
  const protectedPatterns = [
    /^\/show-case\/[^/]+$/, // /show-case/:showCaseId
    /^\/profile\/sertifikat\/[^/]+$/, // /profile/sertifikat/:sertId
    /^\/belajar\/project\/[^/]+$/, // /belajar/project/:projectId
    /^\/belajar\/project\/[^/]+\/chapter\/[^/]+$/, // /belajar/project/:projectId/chapter/:chapterId
    /^\/belajar\/studi-kasus\/[^/]+$/, // /belajar/studi-kasus/:id
    /^\/belajar\/studi-kasus\/[^/]+\/chapter\/[^/]+$/, // /belajar/studi-kasus/:id/chapter/:chapterId
  ];

  if (authToken && url.pathname === "/signin") {
    return redirect("/");
  }

  // Check if the path is protected and the token exists
  const isProtectedPath = protectedPaths.includes(url.pathname) || protectedPatterns.some((pattern) => pattern.test(url.pathname));

  // Redirect to '/login' if there's no token and the user is not trying to access '/login'
  if ((!authToken || (authToken && authToken.session === null)) && isProtectedPath) {
    return redirect("/signin");
  }

  return { authToken };
};

// Masih belum benar
// export function useAuthValidation() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const handleAuthValidation = async () => {
//       const session = supabase.auth.session();
//       console.log("session", session);
//       if (session !== null) {
//         setTimeout(() => {
//           navigate("/signin");
//         }, 2550);
//       } else {
//         await clearAllStorage();
//         toast.error("Token is expired, back to login", {
//           duration: 2350,
//         });
//         setTimeout(() => {
//           navigate("/signin");
//         }, 2550);
//       }
//     };

//     handleAuthValidation();
//   }, [navigate]);
// }
