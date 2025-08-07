/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'umbra-digital.sgp1.digitaloceanspaces.com'
      },
      {
        protocol: 'https',
        hostname: 'tridonic-api-staging.umbradigital.com'
      },
      {
        protocol: 'https',
        hostname: 'tridonic-api.umbradigital.com'
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000'
      }
    ]
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/sign-in',
        permanent: true
      }
    ]
  }
}

module.exports = nextConfig
