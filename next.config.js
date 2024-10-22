/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

const nextConfig = withPWA({
  images: {
    domains: ["media.elrond.com", "devnet-media.elrond.com", "i.postimg.cc"],
  },
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

  config.webpack = (config, { isServer }) => {
    config.resolve.fallback = {
      fs: false, // This will prevent fs from being bundled for the client
      // https://github.com/multiversx/mx-sdk-js-core/issues/520
    }

    return config;
  };

  return config;
};
