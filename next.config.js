/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.images.ctfassets.net',
      },
      {
        protocol: 'https',
        hostname: '**.lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.firebasestorage.googleapis.com',
      },
    ],
    domains: ['images.ctfassets.net', 'lh3.googleusercontent.com', 'firebasestorage.googleapis.com'],
  },
  experimental: {
    appDir: true,
    fontLoaders: [
      { loader: '@next/font/google', options: { subsets: ['latin'] } },
    ],
  },
  modularizeImports: {
    '@mui/material': {
      transform: '@mui/material/{{member}}',
    },
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
  },
}

module.exports = nextConfig
