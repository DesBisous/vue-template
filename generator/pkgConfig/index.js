const { getEnv } = require('../utils/common.js');
const { createWebpackPackage } = require('./webpack.js');
const { createVitePackage } = require('./vite.js');

function createPackage(options) {
  let package = {};
  const { isVite, isWebpack } = getEnv(options);
  if (isWebpack) {
    package = createWebpackPackage(options);
  }
  if (isVite) {
    package = createVitePackage(options);
  }
  return package
}

module.exports = {
  createPackage
}