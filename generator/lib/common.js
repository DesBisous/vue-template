const { getRemoteVersion } = require('./packageManager');

function getFeaturesAttr(options) {
  const features = options.features;
  const isTypeScript = features.includes('TypeScript');
  const isJsxOrTsx = features.includes('Jsx/Tsx');
  const isVuex = features.includes('Vuex');
  // 基础语法
  let grammar = 'JavaScript';
  if (isJsxOrTsx) grammar = 'JavaScript-Jsx';
  if (isTypeScript) grammar = 'TypeScript';
  if (isTypeScript && isJsxOrTsx) grammar = 'TypeScript-Tsx';
  // 测试工具
  const isUnitTest = features.includes('Unit Testing');
  let testSign = 'none';
  if (isUnitTest) testSign = 'Unit Testing';
  // Vuex
  const vuex = isVuex ? 'Vuex' : ''
  return { isTypeScript, isVuex, grammar, testSign, vuex };
}

function getFeatures(options) {
  // [ 'jsx', 'tsx', 'vuex', 'Unit Test' ]
  const features = options.features;
  const isJsx = features.includes('jsx');
  const isTsx = features.includes('tsx');
  const isVuex = features.includes('vuex');
  const isUnitTest = features.includes('Unit Test');
  return {isJsx, isTsx, isVuex, isUnitTest}
}

function getEnv(options) {
  const version = options.version;
  const cli = options.cli;
  const isWebpack = version === 'vue2' || cli === 'webpack';
  const isVite = cli === 'vite';
  return { isWebpack, isVite };
}

function getUtils(options) {
  const utils = options.utils;
  const isMock = utils.includes('mock');
  const isFastclick = utils.includes('fastclick');
  const isStylelint = utils.includes('stylelint');
  return { isMock, isFastclick, isStylelint };
}

function getPackageValue(pkg, pkgMapKey, value) {
  if (value instanceof Function ) {
    return value(pkg, pkgMapKey);
  }
  return value;
}

function packageConfigCombin(pkg, pkgMap, options) {
  let _pkg = null;
  options.forEach(name => {
    _pkg = pkgMap.get(name);
    if (_pkg) {
      if (Array.isArray(_pkg)) {
        _pkg.forEach(p => pkg[p.name] = getPackageValue(pkg[p.name], name, p.value))
      } else pkg[_pkg.name] = getPackageValue(pkg[_pkg.name], name, _pkg.value);
    }
  })
  return pkg;
}

function lastInjectImports(api) {
  api.injectImports(api.entryFile, `import '@/assets/icons';`);
  api.injectImports(api.entryFile, `import '@/assets/styles/index.less';`);
}

async function updatePackageVersion(package, packageName) {
  const version = await getRemoteVersion(packageName);
  package[packageName] = `^${version}`;
}

/**
 * 异步任务捕获异常
 */
function tryCatch(promise) {
  return promise
    .then(res => {
      return [null, res];
    })
    .catch(err => [err]);
}

module.exports = {
  tryCatch,
  getEnv,
  getUtils,
  getFeatures,
  getFeaturesAttr,
  packageConfigCombin,
  lastInjectImports,
  updatePackageVersion
}