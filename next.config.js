/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn1.iconfinder.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn2.iconfinder.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn0.iconfinder.com",
        pathname: "/**",
      },
    ],
  },
  env: {},
};

module.exports = nextConfig;
