/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.tmdb.org",
        port: "",
        pathname: "/t/p/original/*",
      },
    ],
  },
};

export default nextConfig;
