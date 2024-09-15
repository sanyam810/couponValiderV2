import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      external: [], // Ensure no external modules are skipped (we want to bundle `three`)
    },
    commonjsOptions: {
      include: [/node_modules/], // Ensure that dependencies from node_modules can be bundled
    },
  },
  optimizeDeps: {
    include: ["three"], // Pre-bundle `three` during development to avoid issues
  },
});
