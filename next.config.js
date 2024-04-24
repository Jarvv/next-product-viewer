/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'qhqtctclhwhqsozqmfzg.supabase.co',
      },
    ],
  },
}

module.exports = nextConfig
