import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "@views/Home";
import { Welcome } from "./views/Home/components/Welcome";
import Layout from "./layouts/public";

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
          return <Welcome />;
        },
      },
    ],
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
