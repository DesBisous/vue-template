
function getFeaturesAttr(options) {
  const features = options.features;
  const isTypeScript = features.includes('TypeScript');
  const isJsxOrTsx = features.includes('Jsx/Tsx');
  // 基础语法
  let grammar = 'JavaScript';
  if (isJsxOrTsx) grammar = 'JavaScript-Jsx';
  if (isTypeScript) grammar = 'TypeScript';
  if (isTypeScript && isJsxOrTsx) grammar = 'TypeScript-Tsx';
  // 测试工具
  const isUnitTest = features.includes('Unit Testing');
  let testSign = 'none';
  if (isUnitTest) testSign = 'Unit Testing';
  return { isTypeScript, grammar, testSign }
}

function getEnv(options) {
  const isWebpack = options.develop.includes('webpack');
  const isVite = options.develop.includes('Vite');
  return { isWebpack, isVite }
}

function packageConfigCombin(pkg, pkgMap, options) {
  let _pkg = null;
  options.forEach(name => {
    _pkg = pkgMap.get(name);
    if (_pkg) {
      if (Array.isArray(_pkg)) {
        _pkg.forEach(p => pkg[p.name] = p.value)
      } else pkg[_pkg.name] = _pkg.value;
    }
  })
  return pkg;
}

module.exports = {
  getFeaturesAttr,
  getEnv,
  packageConfigCombin,
}