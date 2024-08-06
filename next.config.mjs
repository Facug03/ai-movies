/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'image.tmdb.org',
        protocol: 'https'
      }
    ],
    loader: 'custom',
    loaderFile: './src/imageLoader.ts'
  }
}

export default nextConfig
