/// <reference types="vitest/config" />
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [react()],
	envPrefix: "REACT_APP_",
	build: { outDir: "build" },
	test: {
		environment: "jsdom",
		env: { REACT_APP_PROJECT_ID: "test-project", REACT_APP_API_KEY: "test" },
	},
});
