import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:4000", // Backend server
        changeOrigin: true, // Ensures the host header matches the target
        // No need for path rewrite since you want to keep the full API path
      },
    },
  },
});
