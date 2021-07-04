
const { delLineByValRegExp } = require('../../lib/regExp.js');

const mainMatchKey                      = '/* fastClick attach body */';
const delLineByFastClickRegExp          = delLineByValRegExp('fastClick');

function clearFastClick(api, files) {
  files[api.entryFile] = files[api.entryFile].replace(delLineByFastClickRegExp, '');
}

function mainConfig(api, files) {
  if (files[api.entryFile]) {
    files[api.entryFile] = files[api.entryFile].replace(
      mainMatchKey,
      `fastClick.attach(document.body);
fastClick.prototype.focus = targetElement => {
  targetElement.focus();
};`);
  }
}

function integrateFastclick(api, options, files) {
  api.injectImports(api.entryFile, `import fastClick from 'fastclick';`);
  mainConfig(api, files);
  clearFastClick(api, files);
}

module.exports = {
  integrateFastclick,
  clearFastClick
}