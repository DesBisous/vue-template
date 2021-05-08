const { clearPostCss, integrateRem, integrateVw } = require('./postcss/index.js');

function integrateAdapt(api, options, files) {
  const adapt = options.adapt;
  switch (adapt) {
    case 'rem':
      integrateRem(api, options, files);
      break;
    case 'vw':
      integrateVw(api, options, files);
      break;
    default:
      break;
  }
  clearPostCss(files);
}

module.exports = {
  integrateAdapt
}