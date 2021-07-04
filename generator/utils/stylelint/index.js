const fs = require('fs');
const path = require('path');
const { delLineByValRegExp } = require('../../lib/regExp.js');

const webpackKey                            = 'webpack.config.js';
const eslintrcKey                           = '.eslintrc.js';
const eslintrcPrettierMatchKey              = '/* eslintrc prettier config */';
const stylelintConfigMatchKey               = '/* stylelint config */';
const stylelintrcFile                       = '../../../template/utils/stylelint/stylelintrc.js';
const stylelintrcignoreFile                 = '../../../template/utils/stylelint/.stylelintignore';
const delLineByEslintrcRegExp               = delLineByValRegExp('eslintrc');
const delLineByStylelintRegExp              = delLineByValRegExp('stylelint');

function clearStylelint(files) {
  files[eslintrcKey] = files[eslintrcKey].replace(delLineByEslintrcRegExp, '');
  files[webpackKey] = files[webpackKey].replace(delLineByStylelintRegExp, '');
}

function eslintrcConfigStylelint(files) {
  if (files[eslintrcKey]) {
    files[eslintrcKey] = files[eslintrcKey].replace(
      eslintrcPrettierMatchKey,
      `'prettier/prettier': 'off',`);
  }
}

function webpackConfigStylelint(files) {
if (files[webpackKey]) {
    files[webpackKey] = files[webpackKey].replace(
      stylelintConfigMatchKey,
      `const StyleLintPlugin = require('stylelint-webpack-plugin');
  const plugins = [];
  plugins.push(
    new StyleLintPlugin({
      files: ['**/*.{vue,htm,html,css,sss,less,scss,sass}'],
      fix: false, // 是否自动修复
      cache: true, // 是否缓存
      emitErrors: true,
      failOnError: false,
    })
  );
  config.plugins = [...config.plugins, ...plugins];`);
  }
}

function addStylelintFile(files) {
  files['.stylelintrc.js'] = fs
    .readFileSync(path.join(__dirname, stylelintrcFile))
    .toString();
  files['.stylelintignore'] = fs
    .readFileSync(path.join(__dirname, stylelintrcignoreFile))
    .toString();
}

function integrateStylelint(api, options, files) {
  addStylelintFile(files);
  eslintrcConfigStylelint(files);
  webpackConfigStylelint(files);
}

module.exports = {
  integrateStylelint,
  clearStylelint
}