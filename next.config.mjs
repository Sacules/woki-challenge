/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.tmdb.org",
        port: "",
        pathname: "/t/p/*/*",
      },
    ],
  },
};

export default nextConfig;
