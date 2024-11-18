import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// eslint-disable-next-line no-undef
const url = process.env.USE_DOCKER
  ? "http://backend:3000"
  : "http://localhost:3000";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    proxy: {
      "/api": {
        target: url,
        rewrite: path => path.replace(/^\/api/, "")
      }
    }
  }
});
