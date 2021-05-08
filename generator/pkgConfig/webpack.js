const { getFeaturesAttr, packageConfigCombin } = require('../utils/common.js');

const scriptsMap = new Map([
  ['Unit Testing', { name: 'test:unit', value: 'vue-cli-service test:unit' }]
]);

const dependenciesMap = new Map([
  ['@hst/utils', { name: '@hst/utils', value: '^0.1.4-11' }],
  ['JavaScript-Jsx', [
    { name: '@vue/babel-helper-vue-jsx-merge-props', value: '^1.2.1' },
    { name: '@vue/babel-preset-jsx', value: '^1.2.4' },
  ]],
  ['vant', { name: 'vant', value: '^2.12.16' }],
  ['rem', { name: 'amfe-flexible', value: '^2.2.1' }],
]);

const devDependenciesMap = new Map([
  ['vw', { name: 'postcss-px-to-viewport', value: '^1.1.1' }],
  ['rem', { name: 'postcss-pxtorem', value: '^5.1.1' }],
  ['Unit Testing', [
    { name: '@vue/cli-plugin-unit-jest', value: '~4.5.0' },
    { name: '@vue/test-utils', value: '^1.0.3' },
  ]],
]);

const gitHooksMap = {
  "gitHooks": new Map([
    ['Unit Testing', { name: 'pre-push', value: 'npm run test:unit' }]
  ]),
  "lint-staged": new Map([])
};

const scriptsPkg = {
  "serve": "cross-env NODE_ENV=development vue-cli-service serve --mode dev",
  "build:daily": "cross-env NODE_ENV=production vue-cli-service build --mode daily",
  "build:beta": "cross-env NODE_ENV=production vue-cli-service build --mode beta",
  "build:prod": "cross-env NODE_ENV=production vue-cli-service build --mode prod",
  "lint": "vue-cli-service lint"
}

const dependenciesPkg = {
  "axios": "^0.21.1",
  "core-js": "^3.6.5",
  "fastclick": "^1.0.6",
  "qs": "^6.10.1",
  "vue": "^2.6.11",
  "vue-i18n": "^8.24.4",
  "vue-router": "^3.2.0",
  "vuex": "^3.4.0",
  "vuex-persistedstate": "^4.0.0-beta.3"
}

const devDependenciesPkg = {
  "@babel/plugin-proposal-nullish-coalescing-operator": "^7.13.8",
  "@babel/plugin-proposal-optional-chaining": "^7.13.12",
  "@babel/plugin-transform-modules-commonjs": "^7.14.0",
  "@gfx/zopfli": "^1.0.15",
  "@vue/cli-plugin-babel": "~4.5.0",
  "@vue/cli-plugin-eslint": "~4.5.0",
  "@vue/cli-plugin-router": "~4.5.0",
  "@vue/cli-plugin-vuex": "~4.5.0",
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
  "mockjs": "^1.1.0",
  "prettier": "^2.2.1",
  "svg-sprite-loader": "^6.0.6",
  "vue-template-compiler": "^2.6.11",
  "webpack-bundle-analyzer": "^4.4.1"
}

const gitHooksPkg = {
  "gitHooks": {
    "pre-commit": "lint-staged",
    "commit-msg": "node gitHooks/verifyCommit.js",
  },
  "lint-staged": {
    "*.{js,jsx,vue}": [
      "prettier --write",
      "vue-cli-service lint",
      "git add"
    ]
  }
}

function gitHooksMapConfig(options) {
  for (const itemMap in gitHooksMap) {
    packageConfigCombin(gitHooksPkg[itemMap], gitHooksMap[itemMap], options);
  }
}

function packageConfig(options) {
  packageConfigCombin(scriptsPkg, scriptsMap, options);
  packageConfigCombin(dependenciesPkg, dependenciesMap, options); // --save
  packageConfigCombin(devDependenciesPkg, devDependenciesMap, options); // --save-dev
  gitHooksMapConfig(options);
}

function createWebpackPackage(options) {
  const { grammar, testSign } = getFeaturesAttr(options);
  packageConfig([
    options.uiLib,
    grammar,
    options.adapt,
    testSign,
    ...options.utils,
  ]);
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