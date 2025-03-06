/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "res.cloudinary.com",
      "cloudinary-2-s3.s3.amazonaws.com",
      "${{%20secrets.aws_storage_bucket_name%20}}.s3.amazonaws.com",
      "cloudinary2.s3.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;
