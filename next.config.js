/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

const nextConfig = withPWA({
  images: {
    domains: ["media.elrond.com", "devnet-media.elrond.com", "i.postimg.cc"],
  },
  distDir: 'build',
  transpilePackages: ['@multiversx/sdk-dapp'],
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    config.externals.push('pino-pretty', 'lokijs', 'encoding', {
      bufferutil: 'bufferutil',
      'utf-8-validate': 'utf-8-validate'
    });

    return config;
  }
});

const withTM = require("next-transpile-modules")(["@multiversx/sdk-dapp"]);

module.exports = (phase, defaultConfig) => {
  const plugins = [withTM, (config) => config];

  const config = plugins.reduce(
    (acc, plugin) => {
      const update = plugin(acc);
      return typeof update === "function"
        ? update(phase, defaultConfig)
        : update;
    },
    { ...nextConfig }
  );

  return config;
};

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   distDir: 'build',
//   transpilePackages: ['@multiversx/sdk-dapp'],
//   webpack: (config) => {
//     config.resolve.fallback = { fs: false };
//     config.externals.push('pino-pretty', 'lokijs', 'encoding', {
//       bufferutil: 'bufferutil',
//       'utf-8-validate': 'utf-8-validate'
//     });

//     return config;
//   }
// };

// module.exports = nextConfig;
