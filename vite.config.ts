import deno from "@deno/vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

import "react";
import "react-dom";

export default defineConfig({
  root: "./src/app",
  build: {
    outDir: "./dist",
    emptyOutDir: true, // also necessary
  },
  server: {
    port: 3000,
  },
  plugins: [react(), deno()],
  optimizeDeps: {
    include: ["react/jsx-runtime"],
  },
});
