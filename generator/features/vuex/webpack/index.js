
const fs = require('fs');
const path = require('path');
const { EOL } = require('os');
const { delLineByValRegExp } = require('../../../lib/regExp.js');

// 文件
const vuexAuthFile = 'src/utils/auth.js';
const vuexRouterFile = 'src/router/index.js';
// 占位
const vuexImportMatchKey = '/* vuex import config */';
// 模板
const vuexEnterFile = '../../../../template/features/vuex/webpack/index.js';
const vuexModulesFile = '../../../../template/features/vuex/webpack/modules/user.js';
// 规则
const delLineByVantRegExp               = delLineByValRegExp('vuex');

function clearVuex(files) {
  files[vuexAuthFile] = files[vuexAuthFile].replace(delLineByVantRegExp, '');
  files[vuexRouterFile] = files[vuexRouterFile].replace(delLineByVantRegExp, '');
}

function importVuex(files) {
  if (files[vuexAuthFile]) {
    files[vuexAuthFile] = files[vuexAuthFile].replace(vuexImportMatchKey, `import store from '@/store';`);
  }
  if (files[vuexRouterFile]) {
    files[vuexRouterFile] = files[vuexRouterFile].replace(vuexImportMatchKey, `import store from '@/store';`);
  }
}

function injectVuex(api, files) {
  if (files[api.entryFile]) {
    const contentMain = files[api.entryFile];
    const lines = contentMain.split(/\r?\n/g)
    const renderIndex = lines.findIndex(line => line.match(/render/))
    lines[renderIndex - 1] += `${EOL}  store,`
    files[api.entryFile] = lines.join(EOL);
  }
}

function addStoreFile(files) {
  files['src/store/index.js'] = fs
    .readFileSync(path.join(__dirname, vuexEnterFile))
    .toString();
  files['src/store/modules/user.js'] = fs
    .readFileSync(path.join(__dirname, vuexModulesFile))
    .toString();
}

function integrateWebpack(api, options, files) {
  api.injectImports(api.entryFile, `import store from './store';`);
  // 拷贝模板到项目中
  addStoreFile(files);
  // 对 main.js 写入 Vuex
  injectVuex(api, files);
  importVuex(files);
}
module.exports = {
  clearVuex,
  integrateWebpack
}