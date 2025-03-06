/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "res.cloudinary.com",
      "cloudinary2.s3.amazonaws.com", 
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cloudinary2.s3.amazonaws.com",
      },
    ],
  },
};

module.exports = nextConfig;
