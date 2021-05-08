
const fs = require('fs');
const path = require('path');
const { getEnv } = require('../../utils/common.js');

const jestConfigJs  = '../../../template/tests/unit/jest.config.js';
const funcSpecJs    = '../../../template/tests/unit/spec/func.spec.js';
const vueSpecJs     = '../../../template/tests/unit/spec/vue.spec.js';

function addWebpackUnitTestFile(files) {
  files['jest.config.js'] = fs
    .readFileSync(path.join(__dirname, jestConfigJs))
    .toString();
  files['tests/unit/func.spec.js'] = fs
    .readFileSync(path.join(__dirname, funcSpecJs))
    .toString();
  files['tests/unit/vue.spec.js'] = fs
    .readFileSync(path.join(__dirname, vueSpecJs))
    .toString();
}

function integrateUnitTest(api, options, files) {
  const { isVite, isWebpack } = getEnv(options);
  if (isWebpack) {
    addWebpackUnitTestFile(files);
  }
  if (isVite) {
    
  }
}

module.exports = {
  integrateUnitTest,
}