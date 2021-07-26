const {
  isProd,
  cssConfig,
  devServerConfig,
  cdnConfig,
  splitChunksConfig,
  compressionConfig,
  stylelintConfig,
  svgConfig,
  imagesConfig,
  aliasConfig,
  cleanLogs,
  externalsConfig,
  /* skeleton vue config require */
} = require('./webpack.config');

module.exports = {
  lintOnSave: true, // 通过 eslint-loader 在每次保存时 lint 代码,将 lint 错误输出为编译警告
  productionSourceMap: !isProd, // 不需要生产环境的 source map
  filenameHashing: true, // 开发环境下是否哈希重写文件名
  transpileDependencies: [], // 对 node_modules 指定依赖 Babel 转译
  publicPath: '/',
  // isProd
  //   ? `${process.env.VUE_APP_RES_URL}/project-name/${process.env.ENV}`
  //   : '/',
  ...cssConfig(),
  ...devServerConfig(),
  configureWebpack: config => {
    // CDN 配置
    cdnConfig(config);
    // 模块分割
    splitChunksConfig(config);
    // gzip、zopfli 压缩
    compressionConfig(config);
    // stylelint 配置
    stylelintConfig(config);
    // externals 配置
    externalsConfig(config);
    /* skeleton vue config */
  },
  chainWebpack: config => {
    // 修复 HMR (热更新)失效
    config.resolve.symlinks(true);
    // 配置 SVG
    svgConfig(config);
    // 配置 Image 压缩
    imagesConfig(config);
    // alias 别名
    aliasConfig(config);
    // 线上清除日志
    cleanLogs(config);
    // 移除 prefetch 插件, vue 路由懒加载有这两个无法生效，
    // 因为被标记为 prefetch、preload 的资源，将会被浏览器在空闲时间加载。
    config.plugins.delete('prefetch'); // 是告诉浏览器页面必定需要的资源，浏览器一定会加载这些资源
    config.plugins.delete('preload'); // 是告诉浏览器页面可能需要的资源，浏览器不一定会加载这些资源
  },
};
