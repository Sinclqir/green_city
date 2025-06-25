/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/green_city' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/green_city/' : '',
  // Configuration pour éviter les erreurs de pré-rendu avec React Three Fiber
  experimental: {
    appDir: true,
  },
  // Désactiver le pré-rendu pour les pages avec React Three Fiber
  async generateStaticParams() {
    return []
  },
  // Configuration pour les pages dynamiques
  async rewrites() {
    return []
  },
}

export default nextConfig
