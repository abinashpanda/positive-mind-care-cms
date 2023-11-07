import './src/env.mjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  transpilePackages: ['lucide-react'], // add this
}

export default nextConfig
