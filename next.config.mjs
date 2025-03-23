import path from 'path'

const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.resolve.alias['@'] = path.join(process.cwd(), 'src')
    return config
  },
}

export default nextConfig
