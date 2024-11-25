/** @type {import('next').NextConfig} */

import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

const nextConfig = {
  transpilePackages: ['@pims-frontend/ui', 'material-react-table'],
  compiler: {
    styledComponents: true,
  },
  experimental: {
    optimizePackageImports: ['@pims-frontend/ui', 'material-react-table'],
  },
  output: 'standalone',
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    // TODO: 임시방편이므로, 나중에 삭제할 것. 타입스크립트의 빌드에러를 무시하도록 함.
    ignoreBuildErrors: true,
  },
}

export default withNextIntl(nextConfig)
