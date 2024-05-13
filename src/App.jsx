import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "@views/Home";
import About from "./views/About/components/AboutCard";
import Layout from "./layouts/public";
import SignIn from "./views/Auth/Signin";
import SignUp from "./views/Auth/Signup";

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
        path: "/about",
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
