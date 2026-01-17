import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Enable minification
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
      },
    },
    // Code splitting configuration
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Vendor chunk for React and React DOM
          if (id.includes("node_modules/react-dom")) {
            return "vendor";
          }
          if (id.includes("node_modules/react/")) {
            return "vendor";
          }
          // Router chunk
          if (id.includes("node_modules/react-router")) {
            return "router";
          }
          // Icons chunk
          if (id.includes("node_modules/lucide-react")) {
            return "icons";
          }
        },
      },
    },
    // Generate source maps for debugging (optional)
    sourcemap: false,
    // Chunk size warning limit
    chunkSizeWarningLimit: 500,
  },
  // Optimize deps
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom", "lucide-react"],
  },
});
