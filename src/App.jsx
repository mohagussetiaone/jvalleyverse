import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "@/views/Home";
import About from "./views/About/components/AboutCard";
import ShowCase from "./views/ShowCase";
import ShowCaseDetail from "./views/ShowCase/components/ShowCaseDetail";
// Layout
import Layout from "./layouts/public";
import LayoutCourse from "./layouts/public/LayoutCourse";
import LayoutCourseDetail from "./layouts/public/LayoutCourseDetail";
import LayoutDiscussion from "./layouts/public/LayoutDiscussion";
// Views
// Auth
import SignIn from "./views/Auth/Signin";
import SignUp from "./views/Auth/Signup";
// FAQ
import Faq from "./views/Faq";
// Timeline
import Timeline from "./views/Timeline";
// Belajar
import Project from "./views/StudiCase/components/Project";
import StudiKasus from "./views/StudiCase/components/StudyCase";
import DiscussionHome from "./views/StudiCase/components/Discussion/Home";
import DiscussionDetail from "./views/StudiCase/components/Discussion/components/DiscussionDetail";
import Pertanyaan from "./views/StudiCase/components/Discussion/Pertanyaan";
import Mentoring from "./views/StudiCase/components/Mentoring";
// Project detail
import ProjectDetail from "./views/StudiCase/components/Project/components/ProjectDetail";
// Study Case detail
import StudyCase from "./views/StudiCase/components/StudyCase/components/StudyCaseDetail";
// Chapter
import Chapter from "./views/StudiCase/components/Project/components/Chapter";
// Not Found
import NotFound from "./views/NotFound";
// Profile
import Profile from "./views/Profile";
// Certificate
import Certificate from "./views/Profile/components/Sertifikat";

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
        path: "/show-case",
        // loader: authLoader,
        Component() {
          return <ShowCase />;
        },
      },
      {
        path: "/show-case/:showCaseId",
        // loader: authLoader,
        Component() {
          return <ShowCaseDetail />;
        },
      },
      {
        path: "/profile",
        // loader: authLoader,
        Component() {
          return <Profile />;
        },
      },
      {
        path: "/profile/sertifikat/:sertId",
        // loader: authLoader,
        Component() {
          return <Certificate />;
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
        path: "/belajar/mentoring",
        // loader: authLoader,
        Component() {
          return <Mentoring />;
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
      {
        path: "/belajar/studi-kasus/:id",
        // loader: authLoader,
        Component() {
          return <StudyCase />;
        },
      },
      {
        path: "/belajar/studi-kasus/:id/chapter/:chapterId",
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
          return <DiscussionHome />;
        },
      },
      {
        path: "/belajar/diskusi/:discussionId",
        // loader: authLoader,
        Component() {
          return <DiscussionDetail />;
        },
      },
      {
        path: "/belajar/diskusi/pertanyaan",
        // loader: authLoader,
        Component() {
          return <Pertanyaan />;
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
