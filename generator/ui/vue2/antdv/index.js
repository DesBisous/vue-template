const fs = require('fs');
const path = require('path');
const { delLineByValRegExp, removeSpaceBySign } = require('../../../lib/regExp.js');
// 文件
const mainFileKey                       = 'src/main.js';
const babelFileKey                      = 'babel.config.js';
const webpackFileKey                    = 'webpack.config.js';
const antdvLessFileKey                  = 'src/assets/styles/index.less';
const antdvDataLangFileKey              = 'src/data/lang/index.js';
const antdvUtilCommonFileKey            = 'src/utils/common.js';
// 占位
const mainMatchKey                      = '/* antdv vue use */';
const babelMatchKey                     = '/* antdv babel config */';
const webpackMatchKey                   = '/* antdv webpack css config */';
const webpackSplitChunkMatchKey         = '/* antdv webpack split chunk config */';
const antdvLessMatchKey                 = '/* antdv less config */';
const antdvDataLangMatchKey             = '/* antdv data lang config */';
// 模板
const antdvPluginsFile                  = '../../../../template/ui/antdv/plugins/antdv.js';
const antdvStyleFile                    = '../../../../template/ui/antdv/styles/antdv.less';
const antdvDataFile = '../../../../template/ui/antdv/data/antdv/style.js';
const antdvIntlViewFile                 = '../../../../template/ui/antdv/view/Intl.vue';
// 规则
const delLineByAntdvRegExp              = delLineByValRegExp('antdv');
const removeSpaceByBracket              = removeSpaceBySign('\\n', '\\[');
const removeSpaceByCurlyBraces          = removeSpaceBySign('\\n', '\\}');
// 字典
const langs                             = [
                                            { key: 'antdvEnUS', val: 'en_US' },
                                            { key: 'antdvZhCN', val: 'zh_CN' },
                                            { key: 'antdvZhHK', val: 'zh_TW' }
                                          ];

function clearAntdV(files) {
  files[babelFileKey] = files[babelFileKey].replace(delLineByAntdvRegExp, '');
  files[webpackFileKey] = files[webpackFileKey].replace(delLineByAntdvRegExp, '');
  files[mainFileKey] = files[mainFileKey].replace(delLineByAntdvRegExp, '');
  files[antdvLessFileKey] = files[antdvLessFileKey].replace(delLineByAntdvRegExp, '');
}

function webpackConfig(files) {
  if (files[webpackFileKey]) {
    files[webpackFileKey] = files[webpackFileKey].replace(
      webpackMatchKey,
      `modifyVars: resolve('./src/data/antdv/style'),
        javascriptEnabled: true,`)
    files[webpackFileKey] = files[webpackFileKey].replace(
      webpackSplitChunkMatchKey,
      `antdv: {
            name: 'chunk-antdv',
            test: /[\\\\/]node_modules[\\\\/]ant-design-vue[\\\\/]/,
            chunks: 'all',
            priority: 3,
            reuseExistingChunk: true,
            enforce: true,
          },`)
  }
}

function babelConfig(files) {
  if (files[babelFileKey]) {
    files[babelFileKey] = files[babelFileKey].replace(
      babelMatchKey,
      `[
      'import',
      {
        libraryName: 'ant-design-vue',
        libraryDirectory: 'es',
        style: true
      }
    ],`)
  }
}

function mainUseVant(files) {
  if (files[mainFileKey]) {
    files[mainFileKey] = files[mainFileKey].replace(mainMatchKey, 'Vue.use(antdv);');
  }
}

function antdvLangConfig(api, files) {
  if (files[antdvDataLangFileKey]) {
    langs.forEach(lang => {
      api.injectImports(antdvDataLangFileKey, `import ${lang.key} from 'ant-design-vue/lib/locale-provider/${lang.val}';`);
    });
    files[antdvDataLangFileKey] = files[antdvDataLangFileKey].replace(
      antdvDataLangMatchKey,
      `\nexport const antdvLocales = {
        [langType.enUS]: antdvEnUS,
        [langType.zhHK]: antdvZhHK,
        [langType.zhCN]: antdvZhCN,
      };`.replace(removeSpaceByBracket, '\n  [').replace(removeSpaceByCurlyBraces, '\n}'));
  }
}

function indexStyleImport(files) {
  if (files[antdvLessFileKey]) {
    files[antdvLessFileKey] = files[antdvLessFileKey].replace(antdvLessMatchKey, `@import './antdv.less';`);
  }
}

function addPluginsFile(files) {
  files['src/plugins/antdv.js'] = fs
    .readFileSync(path.join(__dirname, antdvPluginsFile))
    .toString();
}

function addStyleFile(files) {
  files['src/assets/styles/antdv.less'] = fs
    .readFileSync(path.join(__dirname, antdvStyleFile))
    .toString();
}

function addDataFile(files) {
  files['src/data/antdv/index.js'] = fs
    .readFileSync(path.join(__dirname, antdvDataFile))
    .toString();
}

function addView(files) {
  files['src/Intl.vue'] = fs
    .readFileSync(path.join(__dirname, antdvIntlViewFile))
    .toString();
}

function integrateAntdV(api, options, files) {
  // Vue2 只有 Webpack
  api.injectImports(api.entryFile, `import Intl from './Intl.vue';`);
  api.injectImports(api.entryFile, `import antdv from '@/plugins/antdv';`);
  api.injectImports(antdvUtilCommonFileKey, `import { message } from 'ant-design-vue';`);
  
  webpackConfig(files); // webpack-config
  babelConfig(files); // babel-config
  mainUseVant(files); // main.js
  antdvLangConfig(api, files); // data/lang/index.js
  indexStyleImport(files); // assets/styles/index.less
  addPluginsFile(files); // plugins/vant.js
  addStyleFile(files); // assets/styles/vant.less
  addDataFile(files); // data/antdv/index.js
  addView(files);
}

module.exports = {
  integrateAntdV,
  clearAntdV
}