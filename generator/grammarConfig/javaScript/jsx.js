const { delLineByValRegExp } = require('../../regExp');

const babelFileKey         = 'babel.config.js';
const babelMatchKey        = '/* jsx babel config */';
const delLineByJsxRegExp   = delLineByValRegExp('jsx');

function clearJsx(files) {
  files[babelFileKey] = files[babelFileKey].replace(delLineByJsxRegExp, '');
}

const { getEnv } = require('../../utils/common.js');

function babelConfigJsx(files) {
  if (files[babelFileKey]) {
    files[babelFileKey] = files[babelFileKey].replace(
      babelMatchKey,
      `'@vue/babel-preset-jsx',`
    )
  }
}

function integrateJsx(api, options, files) {
  const { isVite, isWebpack } = getEnv(options);
  if (isWebpack) {
    babelConfigJsx(files);
  }
}

module.exports = {
  integrateJsx,
  clearJsx
}