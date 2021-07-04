const { delLineByValRegExp } = require('../../lib/regExp.js');

const babelFileKey                = 'babel.config.js';
const babelMatchKey               = '/* jsx babel config */';
const delLineByJsxRegExp          = delLineByValRegExp('jsx');

function clearJsx(files) {
  files[babelFileKey] = files[babelFileKey].replace(delLineByJsxRegExp, '');
}

function babelConfigJsx(files) {
  if (files[babelFileKey]) {
    files[babelFileKey] = files[babelFileKey].replace(
      babelMatchKey,
      `[
      '@vue/babel-preset-jsx',
      {
        injectH: false,
      },
    ],`
    )
  }
}

function integrateJsx(api, options, files) {
  babelConfigJsx(files);
}

module.exports = {
  integrateJsx,
  clearJsx,
}