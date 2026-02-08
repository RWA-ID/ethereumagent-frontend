/** @type {import('next').NextConfig} */
const path = require("path");

const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  turbopack: {
    resolveAlias: {
      "@react-native-async-storage/async-storage": "./lib/asyncStorageWeb.ts",
    },
  },
  webpack: (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = config.resolve.alias || {};

    // MetaMask SDK expects this RN module; we shim it for web
    config.resolve.alias["@react-native-async-storage/async-storage"] = path.resolve(
      __dirname,
      "lib/asyncStorageWeb.ts"
    );

    return config;
  },
};

module.exports = nextConfig;
