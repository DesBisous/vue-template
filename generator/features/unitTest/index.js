
const fs = require('fs');
const path = require('path');
const { getEnv } = require('../../lib/common.js');

const jestConfigJs                      = '../../../template/features/unitTest/jest.config.js';
const funcSpecJs                        = '../../../template/features/unitTest/spec/func.spec.js';
const vueSpecJs                         = '../../../template/features/unitTest/spec/vue.spec.js';

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
  integrateUnitTest
}