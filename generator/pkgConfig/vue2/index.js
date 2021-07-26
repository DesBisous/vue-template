const { getFeatures, packageConfigCombin, updatePackageVersion } = require('../../lib/common.js');

const scriptsMap = new Map([
  ['stylelint', { name: 'lint:css', value: 'stylelint **/*.{html,vue,css,sass,scss,less} --fix' }],
  ['Unit Testing', { name: 'test', value: 'jest --coverage --verbose -u' }]
]);

const dependenciesMap = new Map([
  ['jsx', [
    { name: '@vue/babel-helper-vue-jsx-merge-props', value: '^1.2.1' },
    { name: '@vue/babel-preset-jsx', value: '^1.2.4' },
  ]],
  ['vant', { name: 'vant', value: '^2.12.16' }],
  ['antdv', [
    { name: 'ant-design-vue', value: '^1.7.5' },
    { name: 'moment', value: '^2.29.1' },
  ]],
  ['rem', { name: 'amfe-flexible', value: '^2.2.1' }],
  ['vuex', [
    { name: 'vuex', value: '^3.4.0' },
    { name: 'vuex-persistedstate', value: '^4.0.0-beta.3' },
  ]],
  ['fastclick', { name: 'fastclick', value: '^1.0.6' }],
]);

const devDependenciesMap = new Map([
  ['vw', { name: 'postcss-px-to-viewport', value: '^1.1.1' }],
  ['rem', { name: 'postcss-pxtorem', value: '^5.1.1' }],
  ['Unit Testing', [
    { name: '@vue/cli-plugin-unit-jest', value: '~4.5.0' },
    { name: '@vue/test-utils', value: '^1.0.3' },
  ]],
  ['vuex', { name: '@vue/cli-plugin-vuex', value: '~4.5.0' }],
  ['mock', { name: 'mockjs', value: '^1.1.0' }],
  ['stylelint', [
    { name: 'stylelint', value: '^13.13.1' },
    { name: 'stylelint-config-prettier', value: '^8.0.2' },
    { name: 'stylelint-config-standard', value: '^22.0.0' },
    { name: 'stylelint-webpack-plugin', value: '^2.1.1' }
  ]],
  ['skeleton', {name: 'vue-skeleton-webpack-plugin', value: '^1.2.2'}]
]);

const gitHooksMap = {
  "gitHooks": new Map([
    ['Unit Testing', { name: 'pre-push', value: 'npm run test:unit' }]
  ]),
  "lint-staged": new Map([
    ['stylelint', [
      {
        name: '*.{css,sass,scss,less}', value: function (pkg, pkgMapKey) {
          if (pkgMapKey === 'stylelint') {
            return [
              "npm run lint:css"
            ]
          }
        }
      },
      {
        name: '*.{js,jsx,vue,html}', value: function (pkg, pkgMapKey) {
          if (pkgMapKey === 'stylelint') {
            let index = -1;
            for (let i = 0; i < pkg.length; i += 1) {
              if (pkg[i].includes('prettier')) {
                index = i;
                break;
              }
            }
            if (index > -1) {
              pkg.splice(index + 1, 0, "npm run lint:css");
            }
          }
          return pkg;
        }
      },
    ]
    ]
  ])
};

const scriptsPkg = {
  "serve": "cross-env NODE_ENV=development vue-cli-service serve --mode dev",
  "build:daily": "cross-env NODE_ENV=production vue-cli-service build --mode daily --report",
  "build:beta": "cross-env NODE_ENV=production vue-cli-service build --mode beta",
  "build:prod": "cross-env NODE_ENV=production vue-cli-service build --mode prod",
  "lint": "vue-cli-service lint",
}

const dependenciesPkg = {
  "axios": "^0.21.1",
  "core-js": "^3.6.5",
  "qs": "^6.10.1",
  "vue": "^2.6.14",
  "vue-i18n": "^8.24.4",
  "vue-router": "^3.2.0"
}

const devDependenciesPkg = {
  "@babel/plugin-proposal-nullish-coalescing-operator": "^7.13.8",
  "@babel/plugin-proposal-optional-chaining": "^7.13.12",
  "@babel/plugin-transform-modules-commonjs": "^7.14.0",
  "@gfx/zopfli": "^1.0.15",
  "@vue/cli-plugin-babel": "~4.5.0",
  "@vue/cli-plugin-eslint": "~4.5.0",
  "@vue/cli-plugin-router": "~4.5.0",
  "@vue/cli-service": "~4.5.0",
  "@vue/eslint-config-prettier": "^6.0.0",
  "babel-eslint": "^10.1.0",
  "babel-plugin-import": "^1.13.3",
  "compression-webpack-plugin": "^6.1.1",
  "cross-env": "^7.0.3",
  "eslint": "^6.7.2",
  "eslint-plugin-prettier": "^3.3.1",
  "eslint-plugin-vue": "^6.2.2",
  "image-webpack-loader": "^7.0.1",
  "less": "^3.0.4",
  "less-loader": "^5.0.0",
  "lint-staged": "^9.5.0",
  "prettier": "^2.3.0",
  "svg-sprite-loader": "^6.0.6",
  "vue-template-compiler": "^2.6.14",
}

const gitHooksPkg = {
  "gitHooks": {
    "pre-commit": "lint-staged",
    "commit-msg": "node gitHooks/verifyCommit.js",
  },
  "lint-staged": {
    "*.{js,jsx,vue,html}": [
      "prettier --write",
      "npm run lint",
      "git add"
    ]
  }
}

function gitHooksMapConfig(options) {
  for (const itemMap in gitHooksMap) {
    packageConfigCombin(gitHooksPkg[itemMap], gitHooksMap[itemMap], options);
  }
}

async function packageConfig(options) {
  packageConfigCombin(scriptsPkg, scriptsMap, options);
  packageConfigCombin(dependenciesPkg, dependenciesMap, options); // --save
  packageConfigCombin(devDependenciesPkg, devDependenciesMap, options); // --save-dev
  gitHooksMapConfig(options);
  // 特殊库查找更新版本
  await updatePackageVersion(dependenciesPkg, '@hst/utils', '0.1.6-15');
}

async function createWebpackPackage(options) {
  const { isJsx, isTsx, isVuex, isUnitTest } = getFeatures(options);
  const config = [...options.utils];

  isJsx && config.push('jsx');
  isTsx && config.push('tsx');
  isVuex && config.push('vuex');
  isUnitTest && config.push('Unit Test');
  options.ui !== 'none' && config.push(options.ui);
  options.adapt !== 'none' && config.push(options.adapt);
  
  await packageConfig(config);

  return {
    "scripts": scriptsPkg,
    "dependencies": dependenciesPkg,
    "devDependencies": devDependenciesPkg,
    ...gitHooksPkg
  }
}

module.exports = {
  createWebpackPackage
}