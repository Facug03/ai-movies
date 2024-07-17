/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'media.themoviedb.org',
        protocol: 'https',
      },
    ],
  },
}

export default nextConfig
