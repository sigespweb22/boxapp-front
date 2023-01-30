const path = require('path')

/** @type {import('next').NextConfig} */

const createEnvFile = require('./environment-builder');

module.exports = {
  transpilePackages: ['awesome_module'],
  trailingSlash: true,
  reactStrictMode: false,
  experimental: {
    esmExternals: false,
    jsconfigPaths: true // enables it for both jsconfig.json and tsconfig.json
  },
  webpack: config => {
    createEnvFile();
    config.resolve.alias = {
      ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
    }

    return config
  }
}
