
const { clearVant, integrateVant } = require('./vant');

function integrateUi(api, options, files) {
  const uiLib = options.uiLib;
  switch (uiLib) {
    case 'vant':
      integrateVant(api, options, files);
      break;
    case 'antDesign Vue':
      
      break;
    default:
      break;
  }
  clearVant(files);
}

module.exports = {
  integrateUi
}