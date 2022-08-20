/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    ERGOPAD_API_URL: 'https://api.ergopad.io',
  },
}

module.exports = nextConfig
