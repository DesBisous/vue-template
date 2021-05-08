const { integrateRem } = require('./pxtorem.js');
const { integrateVw } = require('./viewport.js');
const { delLineByValRegExp } = require('../../regExp');

const postcssKey               = 'postcss.config.js';
const delLineByPostcssRegExp   = delLineByValRegExp('postcss');


function clearPostCss(files) {
  files[postcssKey] = files[postcssKey].replace(delLineByPostcssRegExp, '');
}

module.exports = {
  clearPostCss,
  integrateRem,
  integrateVw
};