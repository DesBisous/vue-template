
const { clearVant, integrateVant } = require('./vue2/vant');
const { clearAntdV, integrateAntdV } = require('./vue2/antdv');

function integrateUi(api, options, files) {
  const ui = options.ui;
  const version = options.version;
  if (version === 'vue2') {
    if (ui === 'vant') {
      integrateVant(api, options, files);
    }
    if (ui === 'antdv') {
      integrateAntdV(api, options, files);
    }
  }
  clearVant(files);
  clearAntdV(files);
}

module.exports = {
  integrateUi
}