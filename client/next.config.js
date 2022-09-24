/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.experiments.topLevelAwait = true 
    return config;
  },
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    ERGOPAD_API_URL: 'https://ergopad.ergohost.io/api',
    ERGO_API_URL: 'https://api.ergoplatform.com/api',
    NETA_POLICY_ID: '472c3d4ecaa08fb7392ff041ee2e6af75f4a558810a74b28600549d5392810e8',
    NETA_PROJECT_ID: 'neta',
  },
}

module.exports = nextConfig
