module.exports = {
  plugins: {
    autoprefixer: {},
    // 可用于在 retina 屏绘制 1px 细线，https://juejin.cn/post/6844903757440876557
    'postcss-write-svg': {
      utf8: false,
    },
    // vw 适配方案
    // 'postcss-px-to-viewport': {
    //   viewportWidth: 375, // (Number) The width of the viewport.
    //   viewportHeight: 667, // (Number) The height of the viewport.
    //   unitPrecision: 3, // (Number) The decimal numbers to allow the REM units to grow to.
    //   viewportUnit: 'vw', // (String) Expected units.
    //   selectorBlackList: ['.ignore'], // (Array) The selectors to ignore and leave as px.
    //   minPixelValue: 1, // (Number) Set the minimum pixel value to replace.
    //   mediaQuery: false, // (Boolean) Allow px to be converted in media queries.
    // },
    // rem 适配方案
    'postcss-pxtorem': {
      rootValue: 37.5, //换算基数， 默认100
      unitPrecision: 5, //允许 rem 单位增长到的十进制数字。
      propList: ['*'], // 指定属性 px 转换 rem
      // exclude: /(node_module)/, //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)\/如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
      selectorBlackList: ['.ignore'], //要忽略并保留为px的选择器
      replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
      mediaQuery: false, //（布尔值）允许在媒体查询中转换px。
      minPixelValue: 1, //设置要替换的最小像素值(3px会被转rem)。 默认 0
    },
  },
};
