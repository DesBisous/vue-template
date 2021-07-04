
const fs = require('fs');
const path = require('path');

const mockEnterFile                     = '../../../template/utils/mocks/webpack/index.js';
const mockModulesFile                   = '../../../template/utils/mocks/webpack/modules/user.js';

function addMockFile(files) {
  files['src/mocks/index.js'] = fs
    .readFileSync(path.join(__dirname, mockEnterFile))
    .toString();
  files['src/mocks/modules/user.js'] = fs
    .readFileSync(path.join(__dirname, mockModulesFile))
    .toString();
}

function integrateMock(api, options, files) {
  api.injectImports(api.entryFile, `import '@/mocks';`);
  // 拷贝模板到项目中
  addMockFile(files);
}

module.exports = {
  integrateMock
}