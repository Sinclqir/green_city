/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/green-city3' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/green-city3/' : '',
  output: 'export', // <-- Ajouté pour export statique
  experimental: {
    appDir: true,
  },
}

export default nextConfig
