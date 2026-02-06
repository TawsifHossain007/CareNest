import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co.com",
        // port: "",
        // pathname: "/my-bucket/**",
        // search: "",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        // port: "",
        // pathname: "/my-bucket/**",
        // search: "",
      },
    ],
  },
  experimental: {
    turbo: {
      root: __dirname,
    },
  },
};

export default nextConfig;