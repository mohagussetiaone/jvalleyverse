import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "@views/Home";
import About from "./views/About/components/AboutCard";
// Layout
import Layout from "./layouts/public";
import LayoutCourse from "./layouts/public/LayoutCourse";
import LayoutCourseDetail from "./layouts/public/LayoutCourseDetail";
import LayoutDiscussion from "./layouts/public/LayoutDiscussion";
// Views
// Auth
import SignIn from "./views/Auth/Signin";
import SignUp from "./views/Auth/Signup";
// Pages
import Faq from "./views/Faq";
import Timeline from "./views/Timeline";
import Belajar from "./views/StudiCase";

import StudiKasus from "./views/StudiCase/components/StudyCase";
import Project from "./views/StudiCase/components/Project";
import ProjectDetail from "./views/StudiCase/components/Project/components/ProjectDetail";
import Discussion from "./views/StudiCase/components/ErrorDiscussion";
import Chapter from "./views/StudiCase/components/Project/components/Chapter";
import NotFound from "./views/NotFound";
import Profile from "./views/Profile";

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
      {
        path: "/profile",
        // loader: authLoader,
        Component() {
          return <Profile />;
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
          return <Belajar />;
        },
      },
      {
        path: "/belajar/project",
        // loader: authLoader,
        Component() {
          return <Project />;
        },
      },
      {
        path: "/belajar/studi-kasus",
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
    path: "/",
    // loader: authLoader,
    element: <LayoutDiscussion />,
    children: [
      {
        path: "/belajar/diskusi",
        // loader: authLoader,
        Component() {
          return <Discussion />;
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
