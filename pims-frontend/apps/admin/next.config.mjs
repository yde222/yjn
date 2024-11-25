/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@pims-frontend/ui', 'material-react-table'],
  compiler: {
    styledComponents: true,
  },
  experimental: {
    optimizePackageImports: ['@pims-frontend/ui', 'material-react-table'],
  },
  basePath: '/admin',
  output: 'standalone',
  redirects: async () => [
    {
      source: '/',
      destination: '/admin',
      permanent: true,
      basePath: false,
    },
  ],
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    // TODO: 임시방편이므로, 나중에 삭제할 것. 타입스크립트의 빌드에러를 무시하도록 함.
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
