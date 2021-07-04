
const { getEnv } = require('../../lib/common.js');
const { integrateWebpack } = require('./webpack');
const { integrateVite } = require('./vite');

function integrateVuex(api, options, files) {
  const { isWebpack, isVite } = getEnv(options);
  if (isWebpack) {
    integrateWebpack(api, options, files);
  }
  if (isVite) {
    integrateVite(api, options, files);
  }
}

module.exports = {
  integrateVuex
}