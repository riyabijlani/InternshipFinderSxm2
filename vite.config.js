import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Inline PostCSS so Vite doesn't need to search any external config
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },
});
