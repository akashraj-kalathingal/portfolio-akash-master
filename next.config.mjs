/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  transpilePackages: ["three"],
  outputFileTracingRoot: process.cwd(),
};
export default nextConfig;
