/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Add this line
  images: {
    unoptimized: true, // Static exports require unoptimized images
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;