import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// from https://vitejs.dev/config/#using-environment-variables-in-config
export default defineConfig({
  // Other Vite config...
  plugins: [react()],
  base: "/us-census-language/",
});
