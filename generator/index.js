const { integrateFeatures } = require('./features');
const { integrateUi } = require('./ui');
const { integrateGrammar } = require('./grammar');
const { integrateAdapt } = require('./adapt');
const { integrateUtils } = require('./utils');
const { createPackage } = require('./pkgConfig');
const { lastInjectImports } = require('./lib/common.js');

const templateMap = new Map([
  ['vue2', '../template/vue2'],
  ['vue3', cli => `../template/vue3/${cli}`],
])

module.exports = async (api, options, rootOptions) => {
  // vue create --preset ./hs-vue-template my-project -r http://nexus.tech.2caipiao.com/content/groups/npms/
  // console.log(rootOptions); // 返回的是 preset 的东西
  // console.log(options);

  const tempPath = typeof templateMap.get(options.version) === 'string' ?
    templateMap.get(options.version) : templateMap.get(options.version)(options.cli);
  
  // 复制并用 ejs 渲染 `./template` 内所有的文件
  api.render(tempPath, options);

  api.render((files) => {
    // 特征
    integrateFeatures(api, options, files);
    // UI 库集成
    integrateUi(api, options, files);
    // 基础语法
    integrateGrammar(api, options, files);
    // 适配方案
    integrateAdapt(api, options, files);
    // 工具库
    integrateUtils(api, options, files);
    // 额外注入
    lastInjectImports(api);
  }, options)

  console.log('');
  console.log('✨  准备就绪~');

  // 修改 `package.json` 里的字段
  const package = await createPackage(options);
  api.extendPackage(package);
}