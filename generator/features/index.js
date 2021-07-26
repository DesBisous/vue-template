const { getFeatures } = require('../lib/common.js');
const { integrateVuex, clearVuex } = require('./vuex');
const { integrateJsx, clearJsx } = require('./jsx');
const { integrateTsx } = require('./tsx');
const { integrateUnitTest } = require('./unitTest');

function integrateFeatures(api, options, files) {
  const { isVuex, isJsx, isTsx, isUnitTest } = getFeatures(options);

  // Vuex 状态管理器
  if (isVuex) integrateVuex(api, options, files);

  // Jsx
  if (isJsx) integrateJsx(api, options, files);

  // Tsx
  if (isTsx) integrateTsx(api, options, files);

  // Unit Test
  if (isUnitTest) integrateUnitTest(api, options, files);
  
  // clear
  clearJsx(files);
  clearVuex(files);
}

module.exports = {
  integrateFeatures
}