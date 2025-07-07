/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.iconfinder.com",
        pathname: "/**",
      },
    ],
  },
  env: {},
};

module.exports = nextConfig;
