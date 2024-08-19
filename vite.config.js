/* eslint-disable no-undef */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@views": path.resolve(__dirname, "./src/views"),
      "@layouts": path.resolve(__dirname, "./src/layouts"),
      "@lib": path.resolve(__dirname, "./src/lib"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@store": path.resolve(__dirname, "./src/store"),
      "@routes": path.resolve(__dirname, "./src/routes"),
      "@config": path.resolve(__dirname, "./src/config"),
      "@public": path.resolve(__dirname, "./public"),
    },
  },
  server: {
    mimeTypes: {
      "text/xml": ["xml"],
      "application/xml": ["xml"],
    },
  },
  extend: {
    ping: {
      "75%, 100%": { transform: "scale(2)", opacity: 0 },
    },
  },
  animation: {
    "animate-ping": "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
    typing: "typing 2s steps(20) infinite alternate, blink .7s infinite",
  },
  plugins: [react()],
  // server: {
  //   host: "0.0.0.0",
  //   port: 3000,
  // },
  // preview: {
  //   port: 3001,
  // },
});
