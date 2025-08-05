import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(),
    visualizer(), // Generates a bundle analysis report
  ],
  build: {
    chunkSizeWarningLimit: 1000, // Increases chunk size warning limit (default is 500KB)
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id.split("node_modules/")[1].split("/")[0]; // Creates separate chunks for dependencies
          }
        },
      },
    },
  },
});
