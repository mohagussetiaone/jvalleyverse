import "./App.css";
import { createBrowserRouter, RouterProvider, useLoaderData } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "@views/Home";
import Layout from "./layouts/public";

// Auth
// import SignIn from "@views/Auth/SignIn";
// import SignUp from "@views/Auth/SignUp";
// import ResetPassword from "@views/Auth/ResetPassword";
// import NotFound from "@views/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    // loader: authLoader,
    element: <Layout />,
    children: [
      {
        path: "/",
        // loader: authLoader,
        Component() {
          return <Home />;
        },
      },
    ],
    // },
    // {
    //   path: "/signin",
    //   loader: authLoader,
    //   Component: SignIn,
    // },
    // {
    //   path: "/signup",
    //   loader: authLoader,
    //   Component: SignUp,
    // },
    // { path: "/reset-password", loader: authLoader, Component: ResetPassword },
    // {
    //   path: "*",
    //   element: <NotFound />,
  },
]);

export default function App() {
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: "",
          duration: 1450,
          style: {
            background: "#ffff",
            color: "#1577d6",
          },
        }}
      />
      <RouterProvider router={router} />
    </>
  );
}
