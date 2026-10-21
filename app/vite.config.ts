import { defineConfig } from "vite";

// Relative base so the built site works under any path (GitHub Pages serves it at /<repo>/).
export default defineConfig({
  base: "./",
  build: { outDir: "dist", emptyOutDir: true },
});
