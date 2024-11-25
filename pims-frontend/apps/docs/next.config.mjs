/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@pims-frontend/ui', 'material-react-table'],
  compiler: {
    styledComponents: true,
  },
  experimental: {
    optimizePackageImports: ['@pims-frontend/ui', 'material-react-table'],
  },
};

export default nextConfig;
