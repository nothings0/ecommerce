/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "backend-md7c.onrender.com",
        port: "",
      },
    ],
  },
  sassOptions: {
    additionalData: `@import "./app/mixin.scss";`,
  },
};

module.exports = nextConfig;
