
const postcssKey        = 'postcss.config.js';
const postcssMatchKey   = '/* postcss rem config */';

function integrateRem(api, options, files) {
  api.injectImports(api.entryFile, `import 'amfe-flexible/index.js';`);
  if (files[postcssKey]) {
    files[postcssKey] = files[postcssKey].replace(
      postcssMatchKey,
      `// rem 适配方案
    'postcss-pxtorem': {
      rootValue: 37.5, //换算基数， 默认100
      unitPrecision: 5, //允许 rem 单位增长到的十进制数字。
      propList: ['*'], // 指定属性 px 转换 rem
      // exclude: /(node_module)/, //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)\/如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
      selectorBlackList: ['.ignore'], //要忽略并保留为px的选择器
      replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
      mediaQuery: false, //（布尔值）允许在媒体查询中转换px。
      minPixelValue: 1, //设置要替换的最小像素值(3px会被转rem)。 默认 0
    },`)
  }
}

module.exports = {
  integrateRem,
};