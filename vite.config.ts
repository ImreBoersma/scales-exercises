/// <reference types="vitest/config" />
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [react()],
	envPrefix: "REACT_APP_",
	build: {
		outDir: "build",
		rolldownOptions: {
			output: {
				codeSplitting: {
					groups: [
						{ name: "firebase", test: /node_modules[\\/]@?firebase/ },
						{ name: "mui", test: /node_modules[\\/]@(mui|emotion)/ },
						{
							name: "react",
							test: /node_modules[\\/](react|react-dom|scheduler)[\\/]/,
						},
					],
				},
			},
		},
	},
	test: {
		environment: "jsdom",
		env: { REACT_APP_PROJECT_ID: "test-project", REACT_APP_API_KEY: "test" },
		coverage: {
			include: ["src/**"],
			exclude: ["src/**/*.test.*", "src/**/*.d.ts"],
		},
	},
});
