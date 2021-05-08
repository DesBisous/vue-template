const { createPackage } = require('./pkgConfig');
const { integrateUi } = require('./uiConfig');
const { integrateGrammar } = require('./grammarConfig');
const { integrateAdapt } = require('./adaptConfig')
const { integrateTest } = require('./testConfig')
const { integrateUtils } = require('./utilsConfig')


const templateMap = new Map([
  ['vue2-webpack-vant', '../template/vue2-webpack-vant']
])

module.exports = (api, options, rootOptions) => {

  // console.log(options);

  const tempPath = '../template/' + options.develop;
  // 复制并用 ejs 渲染 `./template` 内所有的文件
  api.render(tempPath);

  api.render((files) => {
    // UI 库集成
    integrateUi(api, options, files);
    // 基础语法
    integrateGrammar(api, options, files);
    // 测试工具
    integrateTest(api, options, files);
    // 适配方案
    integrateAdapt(api, options, files);
    // 工具库
    integrateUtils(api, options, files);
  }, options)

  // 修改 `package.json` 里的字段
  api.extendPackage(createPackage(options));
}