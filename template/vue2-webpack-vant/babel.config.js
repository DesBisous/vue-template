module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset', // babel 解析器
  ],
  plugins: [
    '@babel/plugin-transform-modules-commonjs', // commonjs 转换 module
    '@babel/plugin-proposal-nullish-coalescing-operator', // ?? 语法
    '@babel/plugin-proposal-optional-chaining', // ?. 语法
    [
      'import',
      {
        libraryName: 'vant',
        libraryDirectory: 'es',
        style: name => `${name}/style/less`,
      },
      'vant',
    ],
  ],
};
