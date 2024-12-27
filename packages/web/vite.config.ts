import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@crawler": path.resolve(__dirname, "../crawler/src"),
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
