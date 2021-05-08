const fs = require('fs');
const path = require('path');
const { getEnv } = require('../../utils/common.js');
const { delLineByValRegExp, removeSpaceBySign } = require('../../regExp');

const babelFileKey                      = 'babel.config.js';
const webpackFileKey                    = 'webpack.config.js';
const mainFileKey                       = 'src/main.js';
const vantLessFileKey                   = 'src/assets/styles/index.less';
const vantDataLangFileKey               = 'src/data/lang/index.js';
const vantUtilLangFileKey               = 'src/utils/lang.js';
const mainMatchKey                      = '/* Vue use vant */';
const babelMatchKey                     = '/* vant babel config */';
const webpackMatchKey                   = '/* vant webpack css config */';
const webpackSplitChunkMatchKey         = '/* vant webpack split chunk config */';
const vantLessMatchKey                  = '/* vant less config */';
const vantDataLangMatchKey              = '/* vant data lang config */';
const vantUtilSetLangMatchKey           = '/* vant util set lang config */';
const vantUtilImportVantLocalesMatchKey = '/* vant util import vantLocales config */';
const vantUtilMergeVantLocalesMatchKey  = '/* vant util merge vantLocales config */';
const vantPluginsFile                   = '../../../template/vant/plugins/vant.webpack.js';
const vantVariablesStyleFile            = '../../../template/vant/styles/vantVariables.less';
const vantStyleFile                     = '../../../template/vant/styles/vant.less';
const delLineByVantRegExp               = delLineByValRegExp('vant');
const removeSpaceByBracket              = removeSpaceBySign('\\n', '\\[');
const removeSpaceByCurlyBraces          = removeSpaceBySign('\\n', '\\}');
const removeSpaceByConst                = removeSpaceBySign('\\n', 'const');
const removeSpaceByLocale               = removeSpaceBySign('\\n', 'Locale');
const langs                             = [
                                            { key: 'vantEnUS', val: 'en-US' },
                                            { key: 'vantZhCN', val: 'zh-CN' },
                                            { key: 'vantZhHK', val: 'zh-HK' }
                                          ];

function clearVant(files) {
  files[babelFileKey] = files[babelFileKey].replace(delLineByVantRegExp, '');
  files[webpackFileKey] = files[webpackFileKey].replace(delLineByVantRegExp, '');
  files[mainFileKey] = files[mainFileKey].replace(delLineByVantRegExp, '');
  files[vantLessFileKey] = files[vantLessFileKey].replace(delLineByVantRegExp, '');
  files[vantDataLangFileKey] = files[vantDataLangFileKey].replace(delLineByVantRegExp, '');
  files[vantUtilLangFileKey] = files[vantUtilLangFileKey].replace(delLineByVantRegExp, '');
}

function mainConfigVant(files) {
  if (files[mainFileKey]) {
    files[mainFileKey] = files[mainFileKey].replace(mainMatchKey, 'Vue.use(vant);');
  }
}

function babelConfigVant(files) {
  if (files[babelFileKey]) {
    files[babelFileKey] = files[babelFileKey].replace(
      babelMatchKey,
      `[
      'import',
      {
        libraryName: 'vant',
        libraryDirectory: 'es',
        style: name => ${'`'}${'${name}/style/less'}${'`'},
      },
      'vant',
    ],`)
  }
}

function webpackConfigVant(files) {
  if (files[webpackFileKey]) {
    files[webpackFileKey] = files[webpackFileKey].replace(
      webpackMatchKey,
      `modifyVars: {
        // 这些是 vant 的官方 Api 配置
        // 直接覆盖变量
        // 'text-color': '#111',
        // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
        hack:
          "true; @import '" +
          resolve('src/assets/styles/vantVariables.less') +
          "'",
        },`)
    files[webpackFileKey] = files[webpackFileKey].replace(
      webpackSplitChunkMatchKey,
      `vant: {
            name: 'chunk-vant',
            test: /[\/]node_modules[\/]vant[\/]/,
            chunks: 'all',
            priority: 3,
            reuseExistingChunk: true,
            enforce: true,
          },`)
  }
}

function indexVantImport(files) {
  if (files[vantLessFileKey]) {
    files[vantLessFileKey] = files[vantLessFileKey].replace(vantLessMatchKey, `@import './vant.less';`);
  }
}

function vantLangConfig(api, files) {
  if (files[vantDataLangFileKey]) {
    langs.forEach(lang => {
      api.injectImports(vantDataLangFileKey, `import ${lang.key} from 'vant/lib/locale/lang/${lang.val}';`);
    });
    files[vantDataLangFileKey] = files[vantDataLangFileKey].replace(
      vantDataLangMatchKey,
      `export const vantLocales = {
        [langType.enUS]: vantEnUS,
        [langType.zhHK]: vantZhHK,
        [langType.zhCN]: vantZhCN,
      };`.replace(removeSpaceByBracket, '\n  [').replace(removeSpaceByCurlyBraces, '\n}'));
  }
  if (files[vantUtilLangFileKey]) {
    api.injectImports(vantUtilLangFileKey, `import { Locale } from 'vant';`);
    files[vantUtilLangFileKey] = files[vantUtilLangFileKey].replace(
      vantUtilSetLangMatchKey,
      `// 设置 vant 语言
       const vantLangLib = vantLocales[lang];
       const vantLangArray = lang.split('_');
       const vantLang =
    vantLangArray[0] + '_' + vantLangArray[1].toLocaleLowerCase();
       Locale.use(vantLang, vantLangLib);`.replace(removeSpaceByConst, '\n  const').replace(removeSpaceByLocale, '\n  Locale'));
    files[vantUtilLangFileKey] = files[vantUtilLangFileKey].replace(
      vantUtilImportVantLocalesMatchKey,
      `, vantLocales`);
    files[vantUtilLangFileKey] = files[vantUtilLangFileKey].replace(
      vantUtilMergeVantLocalesMatchKey,
      `vantLocales, `);
  }
}

function addVantPluginsFile(files) {
  files['src/plugins/vant.js'] = fs
    .readFileSync(path.join(__dirname, vantPluginsFile))
    .toString();
}

function addVantStyleFile(files) {
  files['src/assets/styles/vantVariables.less'] = fs
    .readFileSync(path.join(__dirname, vantVariablesStyleFile))
    .toString();
  files['src/assets/styles/vant.less'] = fs
    .readFileSync(path.join(__dirname, vantStyleFile))
    .toString();
}

function integrateVant(api, options, files) {
  const { isVite, isWebpack} = getEnv(options);
  api.injectImports(api.entryFile, `import vant from '@/plugins/vant';`);
  if (isWebpack) {
    webpackConfigVant(files);
    babelConfigVant(files);
    mainConfigVant(files);
    vantLangConfig(api, files);
  }
  indexVantImport(files);
  addVantPluginsFile(files);
  addVantStyleFile(files);
}

module.exports = {
  integrateVant,
  clearVant
}