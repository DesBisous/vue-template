module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset', // babel 解析器
    /* jsx babel config */
  ],
  plugins: [
    '@babel/plugin-transform-modules-commonjs', // commonjs 转换 module
    '@babel/plugin-proposal-nullish-coalescing-operator', // ?? 语法
    '@babel/plugin-proposal-optional-chaining', // ?. 语法
    /* vant babel config */
    /* antdv babel config */
  ],
};
