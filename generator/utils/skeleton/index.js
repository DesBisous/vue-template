
const fs = require('fs');
const path = require('path');
const { delLineByValRegExp } = require('../../lib/regExp.js');

// 文件
const vueConfigFileKey                            = 'vue.config.js';
const webpackFileKey                              = 'webpack.config.js';

// 占位
const skeletonWebpackPluginMatchKey               = '/* skeleton webpack plugin */';
const skeletonWebpackConfigMatchKey               = '/* skeleton webpack config */';
const skeletonWebpackExportMatchKey               = '/* skeleton webpack export */';
const skeletonVueConfigRequireMatchKey            = '/* skeleton vue config require */';
const skeletonVueConfigMatchKey                   = '/* skeleton vue config */';

// 模板
const skeletonEnterFile                           = '../../../template/utils/skeleton/index.js';
const skeletonTemplate1File                       = '../../../template/utils/skeleton/Skeleton1.vue';
const skeletonTemplate2File                       = '../../../template/utils/skeleton/Skeleton2.vue';

// 规则
const delLineByMockRegExp = delLineByValRegExp('skeleton');

function clearSkeleton(files) {
  files[vueConfigFileKey] = files[vueConfigFileKey].replace(delLineByMockRegExp, '');
  files[webpackFileKey] = files[webpackFileKey].replace(delLineByMockRegExp, '');
}

function vueConfig(files) {
  if (files[vueConfigFileKey]) {
    files[vueConfigFileKey] = files[vueConfigFileKey].replace(
      skeletonVueConfigRequireMatchKey,
      `skeletonConfig,`)
  }
  if (files[vueConfigFileKey]) {
    files[vueConfigFileKey] = files[vueConfigFileKey].replace(
      skeletonVueConfigMatchKey,
      `// skeleton 配置
    skeletonConfig(config);`)
  }
}

function webpackConfig(files) {
  if (files[webpackFileKey]) {
    files[webpackFileKey] = files[webpackFileKey].replace(
      skeletonWebpackPluginMatchKey,
      `const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin');`)
  }
  if (files[webpackFileKey]) {
    files[webpackFileKey] = files[webpackFileKey].replace(
      skeletonWebpackExportMatchKey,
      `skeletonConfig,`)
  }
  if (files[webpackFileKey]) {
    files[webpackFileKey] = files[webpackFileKey].replace(
      skeletonWebpackConfigMatchKey,
      `/**
 * skeleton 配置
 */
const skeletonConfig = config => {
  config.plugins.push(
    new SkeletonWebpackPlugin({
      webpackConfig: {
        entry: {
          app: resolve('./src/views/skeleton/index.js'),
        },
      },
      minimize: true,
      quiet: true,
      router: {
        mode: 'history',
        routes: [
          {
            path: /(\\/|\\/home)$/i,
            skeletonId: 'Skeleton1',
          },
          {
            path: /\\/about/i,
            skeletonId: 'Skeleton2',
          },
        ],
      },
    })
  );
  class OmmitCSSPlugin {
    constructor() {
      const attributes = {
        rel: 'preload',
        as: 'style',
        onload: ${"`this.onload=null;this.rel='stylesheet';window.styleReady=true;window.mountApp&&window.mountApp();`"},
      };
      this.files = [
        {
          match: /vendors\\.[a-z-0-9]*.css$/,
          attributes,
        },
        {
          match: /app\\.[a-z-0-9]*.css$/,
          attributes,
        },
      ];
    }

    match(href) {
      return this.files.find(item => ${'`${href}`'}.match(item.match));
    }

    apply(compiler) {
      compiler.plugin('compilation', compilation => {
        compilation.plugin('html-webpack-plugin-alter-asset-tags', args => {
          args.head.forEach(item => {
            const rel = item.attributes.rel;
            const href = item.attributes.href;
            const match = this.match(href);
            if (rel === 'stylesheet' && !!match) {
              Object.assign(item.attributes, match.attributes);
            }
          });
          // process.exit(1);
        });
      });
    }
  }
  // 动态更改 link 属性
  config.plugins.push(new OmmitCSSPlugin());
};`)
  }
}

function addSkeletonFile(files) {
  files['src/views/skeleton/index.js'] = fs
    .readFileSync(path.join(__dirname, skeletonEnterFile))
    .toString();
    files['src/views/skeleton/Skeleton1.vue'] = fs
    .readFileSync(path.join(__dirname, skeletonTemplate1File))
      .toString();
    files['src/views/skeleton/Skeleton2.vue'] = fs
    .readFileSync(path.join(__dirname, skeletonTemplate2File))
    .toString();
}

function integrateSkeleton(api, options, files) {
  // 拷贝模板到项目中
  addSkeletonFile(files);
  // 配置
  webpackConfig(files);
  vueConfig(files);
}

module.exports = {
  clearSkeleton,
  integrateSkeleton
}