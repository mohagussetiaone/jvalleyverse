import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "@views/Home";
import About from "./views/About/components/AboutCard";
// Layout
import Layout from "./layouts/public";
import LayoutCourse from "./layouts/public/LayoutCourse";
import LayoutCourseDetail from "./layouts/public/LayoutCourseDetail";
// Views
import SignIn from "./views/Auth/Signin";
import SignUp from "./views/Auth/Signup";
import Faq from "./views/Faq";
import Timeline from "./views/Timeline";
import StudiKasus from "./views/StudiCase";
import ProjectDetail from "./views/StudiCase/components/Project/components/ProjectDetail";
import Chapter from "./views/StudiCase/components/Project/components/Chapter";
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
      {
        path: "/jalur-belajar",
        // loader: authLoader,
        Component() {
          return <Timeline />;
        },
      },
      {
        path: "/tentang",
        // loader: authLoader,
        Component() {
          return <About />;
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
        path: "/testimoni",
        // loader: authLoader,
        Component() {
          return <About />;
        },
      },

      {
        path: "/belajar",
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
    path: "/",
    // loader: authLoader,
    element: <LayoutCourseDetail />,
    children: [
      {
        path: "/belajar/project/:id",
        // loader: authLoader,
        Component() {
          return <ProjectDetail />;
        },
      },
      {
        path: "/belajar/project/:id/chapter/:chapterId",
        // loader: authLoader,
        Component() {
          return <Chapter />;
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
