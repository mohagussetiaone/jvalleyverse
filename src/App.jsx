import "./App.css";
import { authLoader } from "./lib/authValidation";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./views/Home";
import About from "./views/About";
import ShowCase from "./views/ShowCase";
import AddShowCase from "./views/ShowCase/components/AddShowCase";
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
import BuatPertanyaan from "./views/StudiCase/components/Discussion/components/question";
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
import Settings from "./views/Settings";
// Certificate
import Certificate from "./views/Profile/components/Sertifikat";

const router = createBrowserRouter([
  {
    path: "/",
    loader: authLoader,
    element: <Layout />,
    children: [
      {
        path: "/",
        loader: authLoader,
        Component() {
          return <Home />;
        },
      },
      {
        path: "/jalur-belajar",
        loader: authLoader,
        Component() {
          return <Timeline />;
        },
      },
      {
        path: "/tentang",
        loader: authLoader,
        Component() {
          return <About />;
        },
      },
      {
        path: "/show-case",
        loader: authLoader,
        Component() {
          return <ShowCase />;
        },
      },
      {
        path: "/show-case/buat-show-case",
        loader: authLoader,
        Component() {
          return <AddShowCase />;
        },
      },
      {
        path: "/show-case/:showCaseId",
        loader: authLoader,
        Component() {
          return <ShowCaseDetail />;
        },
      },
      {
        path: "/profile",
        loader: authLoader,
        Component() {
          return <Profile />;
        },
      },
      {
        path: "/settings",
        loader: authLoader,
        Component() {
          return <Settings />;
        },
      },
      {
        path: "/profile/sertifikat/:sertId",
        loader: authLoader,
        Component() {
          return <Certificate />;
        },
      },
      {
        path: "/belajar/studi-kasus/:studyCaseId",
        loader: authLoader,
        Component() {
          return <StudyCase />;
        },
      },
    ],
  },
  {
    path: "/",
    loader: authLoader,
    element: <LayoutCourse />,
    children: [
      // {
      //   path: "/testimoni",
      //   // loader: authLoader,
      //   Component() {
      //     return <About />;
      //   },
      // },
      {
        path: "/belajar/project",
        loader: authLoader,
        Component() {
          return <Project />;
        },
      },
      {
        path: "/belajar/studi-kasus",
        loader: authLoader,
        Component() {
          return <StudiKasus />;
        },
      },
      {
        path: "/belajar/mentoring",
        loader: authLoader,
        Component() {
          return <Mentoring />;
        },
      },
      {
        path: "/faq",
        loader: authLoader,
        Component() {
          return <Faq />;
        },
      },
    ],
  },
  {
    path: "/",
    loader: authLoader,
    element: <LayoutCourseDetail />,
    children: [
      {
        path: "/belajar/project/:projectId",
        loader: authLoader,
        Component() {
          return <ProjectDetail />;
        },
      },
      {
        path: "/belajar/project/:projectId/chapter/:chapterId",
        loader: authLoader,
        Component() {
          return <Chapter />;
        },
      },

      {
        path: "/belajar/studi-kasus/:id/chapter/:chapterId",
        loader: authLoader,
        Component() {
          return <Chapter />;
        },
      },
    ],
  },
  {
    path: "/",
    loader: authLoader,
    element: <LayoutDiscussion />,
    children: [
      {
        path: "/belajar/diskusi",
        loader: authLoader,
        Component() {
          return <DiscussionHome />;
        },
      },
      {
        path: "/belajar/diskusi/buat-pertanyaan",
        loader: authLoader,
        Component() {
          return <BuatPertanyaan />;
        },
      },
      {
        path: "/belajar/diskusi/:discussionId",
        loader: authLoader,
        Component() {
          return <DiscussionDetail />;
        },
      },
      {
        path: "/belajar/diskusi/pertanyaan",
        loader: authLoader,
        Component() {
          return <Pertanyaan />;
        },
      },
    ],
  },
  {
    path: "/signin",
    loader: authLoader,
    Component: SignIn,
  },
  {
    path: "/signup",
    loader: authLoader,
    Component: SignUp,
  },
  {
    path: "*",
    loader: authLoader,
    Component: NotFound,
  },
]);

export default function App() {
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerStyle={{}}
        toastOptions={{
          className: "",
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
