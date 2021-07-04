const { getEnv } = require('../lib/common.js');
const { createWebpackPackage } = require('./vue2');
const { createWebpackPackageVue3 } = require('./vue3/webpack.js');
const { createVitePackageVue3 } = require('./vue3/vite.js');

async function createPackage(options) {
  let package = {};
  const version = options.version;
  if (version === 'vue2') {
    package = await createWebpackPackage(options);
  } else {
    const { isVite, isWebpack } = getEnv(options);
    if (isWebpack) {
      package = createWebpackPackageVue3(options);
    }
    if (isVite) {
      package = createVitePackageVue3(options);
    }
  }

  return package
}

module.exports = {
  createPackage
}