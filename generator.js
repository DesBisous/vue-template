module.exports = (api, options, rootOptions) => {
  // 复制并用 ejs 渲染 `./template` 内所有的文件
  api.render('./template/vue2-webpack-vant')
  // 修改 `package.json` 里的字段
  api.extendPackage({
    "scripts": {
      "serve": "cross-env NODE_ENV=development vue-cli-service serve --mode dev",
      "build:daily": "cross-env NODE_ENV=production vue-cli-service build --mode daily",
      "build:beta": "cross-env NODE_ENV=production vue-cli-service build --mode beta",
      "build:prod": "cross-env NODE_ENV=production vue-cli-service build --mode prod",
      "test:unit": "vue-cli-service test:unit",
      "lint": "vue-cli-service lint"
    },
    "dependencies": {
      "amfe-flexible": "^2.2.1",
      "axios": "^0.21.1",
      "core-js": "^3.6.5",
      "fastclick": "^1.0.6",
      "qs": "^6.10.1",
      "vant": "^2.12.16",
      "vue": "^2.6.11",
      "vue-i18n": "^8.24.4",
      "vue-router": "^3.2.0",
      "vuex": "^3.4.0",
      "vuex-persistedstate": "^4.0.0-beta.3"
    },
    "devDependencies": {
      "@babel/plugin-proposal-nullish-coalescing-operator": "^7.13.8",
      "@babel/plugin-proposal-optional-chaining": "^7.13.12",
      "@babel/plugin-transform-modules-commonjs": "^7.14.0",
      "@gfx/zopfli": "^1.0.15",
      "@vue/cli-plugin-babel": "~4.5.0",
      "@vue/cli-plugin-eslint": "~4.5.0",
      "@vue/cli-plugin-router": "~4.5.0",
      "@vue/cli-plugin-unit-jest": "~4.5.0",
      "@vue/cli-plugin-vuex": "~4.5.0",
      "@vue/cli-service": "~4.5.0",
      "@vue/eslint-config-prettier": "^6.0.0",
      "@vue/test-utils": "^1.0.3",
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
      "postcss-px-to-viewport": "^1.1.1",
      "postcss-pxtorem": "^5.1.1",
      "postcss-write-svg": "^3.0.1",
      "prettier": "^2.2.1",
      "svg-sprite-loader": "^6.0.6",
      "vue-template-compiler": "^2.6.11",
      "webpack-bundle-analyzer": "^4.4.1"
    },
    "gitHooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "node gitHooks/verifyCommit.js",
      "pre-push": "npm run test:unit"
    },
    "lint-staged": {
      "*.{js,jsx,vue}": [
        "prettier --write",
        "vue-cli-service lint",
        "git add"
      ]
    }
  })
}