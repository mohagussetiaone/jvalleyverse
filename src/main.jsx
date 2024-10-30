import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.jsx";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import "@/config/i18n.js";

const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
document.body.classList.add(isDarkMode ? "dark" : "light");
const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </QueryClientProvider>
);
