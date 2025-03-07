import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const env = process.env.NODE_ENV || "development";
const envFile = path.resolve(__dirname, `.env.${env}`);

if (fs.existsSync(envFile)) {
	dotenv.config({ path: envFile });
	console.log(`Loaded ${envFile}`);
} else {
	console.error(`Environment file ${envFile} not found`);
}
