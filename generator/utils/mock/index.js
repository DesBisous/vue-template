
const fs = require('fs');
const path = require('path');
const { delLineByValRegExp } = require('../../lib/regExp.js');

// 文件
const webpackFileKey                              = 'webpack.config.js';
const compatibleFileKey                           = 'public/js/compatible.js';

// 占位
const publicCompatibleMatchKey                    = '/* mock public compatible config */';
const webpackExternalsMatchKey                    = '/* mock webpack externals config */';

// 模板
const mockEnterFile                               = '../../../template/utils/mocks/webpack/index.js';
const mockModulesFile                             = '../../../template/utils/mocks/webpack/modules/user.js';

// 规则
const delLineByMockRegExp                         = delLineByValRegExp('mock');

function clearMock(files) {
  files[webpackFileKey] = files[webpackFileKey].replace(delLineByMockRegExp, '');
  files[compatibleFileKey] = files[compatibleFileKey].replace(delLineByMockRegExp, '');
}

function webpackConfig(files) {
  if (files[webpackFileKey]) {
    files[webpackFileKey] = files[webpackFileKey].replace(
      webpackExternalsMatchKey,
      `if (isProd) {
    Object.assign(config, {
      externals: [
        function (context, request, callback) {
          // 移除 mock 相关内容
          if (/(?:@|data|\\.|node-libs-browser)\\/mock/.test(request)) {
            return callback(null, 'mock');
          }
          callback();
        },
      ],
    });
  }`)
  }
}

function publicFiles(files) {
  if (files[compatibleFileKey]) {
    files[compatibleFileKey] = files[compatibleFileKey].replace(
      publicCompatibleMatchKey,
      `window.mock = {};`)
  }
}

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
  webpackConfig(files);
  publicFiles(files);
}

module.exports = {
  clearMock,
  integrateMock
}