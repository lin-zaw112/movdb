/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */
// next.config.js
const withPlugins = require("next-compose-plugins");
const optimizedImages = require("next-optimized-images");
const imageminOptipng = require("imagemin-optipng");

const config = {
  reactStrictMode: true,
  images: {
    loader: "default",
    minimumCacheTTL: 60,
    domains: ["image.tmdb.org", "img.youtube.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        port: "",
        pathname: "/t/p/w500",
      },
    ],
  },
  swcMinify: false,
};

module.exports = withPlugins(
  [
    optimizedImages,
    imageminOptipng,
    // your other plugins here
  ],
  config,
);
