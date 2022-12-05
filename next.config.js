/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
});

module.exports = withPWA({
  images: {
    domains: ["media.elrond.com", "devnet-media.elrond.com"],
  },
});
