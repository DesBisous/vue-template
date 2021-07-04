const { getUtils } = require('../lib/common.js');
const { integrateMock } = require('./mock');
const { integrateFastclick, clearFastClick } = require('./fastclick');
const { integrateStylelint, clearStylelint } = require('./stylelint');

function integrateUtils(api, options, files) {
  const { isMock, isFastclick, isStylelint } = getUtils(options);
  // Fastclick
  if(isFastclick) integrateFastclick(api, options, files);
  // Mock
  if(isMock) integrateMock(api, options, files);
  // Stylelint
  if(isStylelint) integrateStylelint(api, options, files);

  // clear
  clearFastClick(api, files);
  clearStylelint(files);
}

module.exports = {
  integrateUtils
}