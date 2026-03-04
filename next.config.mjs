import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.alias["drizzle-orm"] = path.resolve(__dirname, "config/db.js");
    return config;
  },
};

export default nextConfig;
