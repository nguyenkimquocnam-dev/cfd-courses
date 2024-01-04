import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import jsconfigpath from "vite-jsconfig-paths";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), jsconfigpath()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
