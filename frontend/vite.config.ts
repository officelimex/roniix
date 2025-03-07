import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createHtmlPlugin } from "vite-plugin-html";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

export default defineConfig({
	plugins: [
		react(),
		createHtmlPlugin({
			minify: {
				collapseWhitespace: true,
				removeComments: true,
				removeRedundantAttributes: true,
				removeScriptTypeAttributes: true,
				removeStyleLinkTypeAttributes: true,
				useShortDoctype: true,
				minifyCSS: true,
				minifyJS: true,
			},
		}),
	],
	base: "/",
	server: {
		port: 3000,
		host: true,
		open: false,
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	build: {
		outDir: "dist",
		sourcemap: false,
		minify: "terser",
		chunkSizeWarningLimit: 500,
		target: "es2015",
		cssCodeSplit: true,
		cssMinify: true,
		modulePreload: true,
		reportCompressedSize: true,
		terserOptions: {
			compress: {
				drop_console: true,
				drop_debugger: true,
			},
		},
		rollupOptions: {
			output: {
				manualChunks: {
					core: ["react", "react-dom", "react-router-dom", "axios", "swr"],
					vendor: ["formik", "react-paystack", "yup"],
					ui: [
						"react-toastify",
						"react-bootstrap",
						"bootstrap",
						"react-slick",
						"input-otp",
					],
				},
				entryFileNames: "assets/[name]-[hash].js",
				chunkFileNames: "assets/[name]-[hash].js",
				assetFileNames: "assets/[name]-[hash].[ext]",
			},
			input: {
				main: path.resolve(__dirname, "index.html"),
			},
		},
	},
	optimizeDeps: {
		include: ["react", "react-dom"],
	},
});
