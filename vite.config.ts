import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [react()],
	envPrefix: "REACT_APP_",
	build: { outDir: "build" },
});
