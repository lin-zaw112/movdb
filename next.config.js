/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */
// next.config.js
const withPlugins = require("next-compose-plugins");
const optimizedImages = require("next-optimized-images");
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

// next.config.js

module.exports = withPlugins(
  [
    [
      optimizedImages,
      {
        // these are the default values so you don't have to provide them if they are good enough for your use-case.
        // but you can overwrite them here with any valid value you want.
        inlineImageLimit: 8192,
        imagesFolder: "images",
        imagesName: "[name]-[hash].[ext]",
        handleImages: ["jpeg", "png", "svg", "webp", "gif"],
        removeOriginalExtension: false,
        optimizeImages: true,
        optimizeImagesInDev: true,
        optipng: {
          optimizationLevel: 3,
        },
        pngquant: false,
        gifsicle: {
          interlaced: true,
          optimizationLevel: 3,
        },
        responsive: {
          adapter: require("responsive-loader/sharp"),
        },
        webp: {
          preset: "default",
          quality: 75,
        },
      },
    ],
  ],
  config,
);
