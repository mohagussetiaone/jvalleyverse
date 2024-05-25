import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "@views/Home";
import About from "./views/About/components/AboutCard";
import Layout from "./layouts/public";
import LayoutCourse from "./layouts/public/LayoutCourse";
import SignIn from "./views/Auth/Signin";
import SignUp from "./views/Auth/Signup";
import Faq from "./views/Faq";
import Timeline from "./views/Timeline";
import StudiKasus from "./views/StudiCase";
import NotFound from "./views/NotFound";

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
  },
  {
    path: "/",
    // loader: authLoader,
    element: <LayoutCourse />,
    children: [
      {
        path: "/tentang",
        // loader: authLoader,
        Component() {
          return <About />;
        },
      },
      {
        path: "/testimoni",
        // loader: authLoader,
        Component() {
          return <About />;
        },
      },
      {
        path: "/jalur-belajar",
        // loader: authLoader,
        Component() {
          return <Timeline />;
        },
      },
      {
        path: "/studi-kasus",
        // loader: authLoader,
        Component() {
          return <StudiKasus />;
        },
      },
      {
        path: "/faq",
        // loader: authLoader,
        Component() {
          return <Faq />;
        },
      },
    ],
  },
  {
    path: "/signin",
    // loader: authLoader,
    Component: SignIn,
  },
  {
    path: "/signup",
    // loader: authLoader,
    Component: SignUp,
  },
  {
    path: "*",
    // loader: authLoader,
    Component: NotFound,
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
