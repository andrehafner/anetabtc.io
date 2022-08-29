/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    ERGOPAD_API_URL: 'https://api.ergopad.io',
    NETA_POLICY_ID: '472c3d4ecaa08fb7392ff041ee2e6af75f4a558810a74b28600549d5392810e8',
    NETA_PROJECT_ID: 'neta',
  },
}

module.exports = nextConfig
