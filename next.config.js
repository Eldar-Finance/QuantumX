/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.elrond.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'devnet-media.elrond.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'i.postimg.cc',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'tools.multiversx.com',
        pathname: '**',
      }
    ]
  },
  distDir: 'build',
  transpilePackages: ['@multiversx/sdk-dapp'],
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      path: false,
      crypto: false,
      os: false,
      stream: false,
      buffer: require.resolve('buffer/'),
    };
    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
    rules: {
      "react/no-unescaped-entities": "off"
    }
  }
};

const withTM = require("next-transpile-modules")(["@multiversx/sdk-dapp"]);

module.exports = withPWA(withTM(nextConfig));