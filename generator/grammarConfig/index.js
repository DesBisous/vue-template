const { getFeaturesAttr } = require('../utils/common.js');
const { clearJsx, integrateJsx } = require('./javaScript/jsx.js');

function integrateGrammar(api, options, files) {
  const { grammar } = getFeaturesAttr(options);
  switch (grammar) {
    case 'JavaScript':
      break;
    case 'JavaScript-Jsx':
      integrateJsx(api, options, files);
      break;
    case 'TypeScript':
      
      break;
    case 'TypeScript-Tsx':
      
      break;
    default:
      break;
  }
  clearJsx(files);
}

module.exports = {
  integrateGrammar
}