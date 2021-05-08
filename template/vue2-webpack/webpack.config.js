const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProd = ['daily', 'beta', 'prod'].includes(process.env.ENV);

const resolve = dir => path.join(__dirname, dir);

/**
 * css loader 配置
 */
const cssConfig = () => ({
  css: {
    loaderOptions: {
      less: {
        /* vant webpack css config */
      },
    },
  },
});

/**
 * CDN 配置
 */
const cdnConfig = config => {
  const cndConfig = { externals: {}, cdn: {} };
  if (cndConfig.externals) {
    // CDN 引入，比如： { jQuery: '$' }，html 上需要配合引入 <script src='jquery'/>
    config.externals = cndConfig.externals;
  }
  if (!cndConfig.cdn) return;
  const plugins = config.plugins;
  for (var i = 0; i < plugins.length; i++) {
    const plugin = plugins[i];
    // HtmlWebpackPlugin 默认配置了，手动找到它
    if (plugin instanceof HtmlWebpackPlugin) {
      // 定义 cdn 的外部链接，比如：cdn：{ css: [], js: ['http:www.xx.com/xx.js'] }
      plugin.options.cdn = cndConfig.cdn;
      // 顺便添加环境变量
      plugin.options.ENV = process.env.ENV;
      // 判斷是否需要添加雅虎統計
      plugin.options.NeedStatistics =
        process.env.VUE_APP_PROJECT === 'OnlineHK';
    }
  }
};

/**
 * svg 配置
 */
const svgConfig = config => {
  const svgRule = config.module.rule('svg');
  svgRule.uses.clear();
  svgRule.exclude.add(/node_modules/);
  svgRule
    .test(/\.svg$/)
    .use('svg-sprite-loader')
    .loader('svg-sprite-loader')
    .options({
      symbolId: 'icon-[name]',
    });
  // images 匹配规则中排除 svg 文件夹下的文件
  const imagesRule = config.module.rule('images');
  imagesRule.exclude.add(resolve('src/assets/icons/svg'));
  config.module.rule('images').test(/\.(png|jpe?g|gif|svg)(\?.*)?$/);
};

/**
 * images 压缩配置，注意：这个库需要翻墙 install
 */
const imagesConfig = config => {
  if (isProd) {
    const imagesRule = config.module.rule('images');
    imagesRule
      .rule('images')
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        mozjpeg: { progressive: true, quality: 65 }, // 压缩 JPEG 图像
        optipng: { enabled: false }, // 压缩 PNG 图像
        pngquant: { quality: [0.65, 0.9], speed: 4 }, // 压缩 PNG 图像
        gifsicle: { interlaced: false }, // 压缩 GIF 图像
        // webp: { quality: 75 } // 将 JPG 和 PNG 图像压缩为 WEBP
      });
  }
};

/**
 * alias 配置
 */
const aliasConfig = config => {
  config.resolve.alias.set('@', resolve('src'));
};

/**
 * clean console, debugger 配置
 */
const cleanLogs = config => {
  if (isProd) {
    // 移除 console.log(测试环境 预发布和生产环境)
    config.optimization.minimizer('terser').tap(args => {
      // 注释console.*
      args[0].terserOptions.compress.drop_console = true;
      // remove debugger
      args[0].terserOptions.compress.drop_debugger = true;
      // 移除 console.log
      args[0].terserOptions.compress.pure_funcs = ['console.log'];
      return args;
    });
  }
};

/**
 * analyzer 打包分析
 */
const analyzerConfig = config => {
  if (isProd) {
    config
      .plugin('webpack-report')
      .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [
        {
          analyzerMode: 'static',
        },
      ]);
  }
};

/**
 * 模块分割
 */
const splitChunksConfig = config => {
  if (isProd) {
    config.optimization = {
      splitChunks: {
        cacheGroups: {
          common: {
            name: 'chunk-common',
            chunks: 'initial',
            minChunks: 2, // 被提取的 chunk 最少需要被多少chunks共同引入
            maxInitialRequests: 5, // 最大初始同步 chunks 提取数
            minSize: 0, // 提取出的新 chunk 在两次压缩之前要小于多少kb，默认为0，即不做限制
            priority: 1, // 拆分优先级
            reuseExistingChunk: true, // 是否重用已存在的chunk
            enforce: true,
          },
          vendors: {
            name: 'chunk-vendors',
            test: /[\\/]node_modules[\\/]/,
            chunks: 'initial',
            priority: 2,
            reuseExistingChunk: true,
            enforce: true,
          },
          /* vant webpack split chunk config */
          echarts: {
            name: 'chunk-echarts',
            test: /[\\/]node_modules[\\/](vue-)?echarts[\\/]/,
            chunks: 'all',
            priority: 4,
            reuseExistingChunk: true,
            enforce: true,
          },
        },
      },
    };
  }
};

/**
 * gzip、zopfli 压缩,
 * 注意: 服务器上 nginx 也必须开启 gzip 才能生效(或者后端 spring 开启)
 *
 */
const compressionConfig = config => {
  if (isProd) {
    const plugins = [];
    const zopfli = require('@gfx/zopfli');
    const CompressionPlugin = require('compression-webpack-plugin');
    const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
    plugins.push(
      new CompressionPlugin({
        compressionOptions: {
          numiterations: 15,
        },
        minRatio: 0.99,
        test: productionGzipExtensions,
        algorithm(input, compressionOptions, callback) {
          return zopfli.gzip(input, compressionOptions, callback);
        },
      })
    );
    config.plugins = [...config.plugins, ...plugins];
  }
};

/**
 * proxy 代理配置
 */
const devServerConfig = () => ({
  devServer: {
    open: true,
    port: 3000,
    proxy: {
      '/api': {
        target: process.env.VUE_APP_PROXY_URL,
        changeOrigin: true,
        // ws: true,
        pathRewrite: {
          '^/api': '/',
        },
        headers: {
          origin: process.env.VUE_APP_PROXY_URL,
          Referer: process.env.VUE_APP_PROXY_URL,
        },
      },
    },
  },
});

module.exports = {
  isProd,
  cssConfig,
  devServerConfig,
  cdnConfig,
  splitChunksConfig,
  compressionConfig,
  svgConfig,
  imagesConfig,
  aliasConfig,
  cleanLogs,
  analyzerConfig,
};
