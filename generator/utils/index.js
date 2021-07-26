const { getUtils } = require('../lib/common.js');
const { integrateMock, clearMock } = require('./mock');
const { integrateSkeleton, clearSkeleton } = require('./skeleton');
const { integrateFastclick, clearFastClick } = require('./fastclick');
const { integrateStylelint, clearStylelint } = require('./stylelint');

function integrateUtils(api, options, files) {
  const { isMock, isFastclick, isStylelint, isSkeleton } = getUtils(options);
  // Fastclick
  if(isFastclick) integrateFastclick(api, options, files);
  // Mock
  if(isMock) integrateMock(api, options, files);
  // Stylelint
  if (isStylelint) integrateStylelint(api, options, files);
  // Skeleton
  if (isSkeleton) integrateSkeleton(api, options, files)

  // clear
  clearMock(files);
  clearFastClick(api, files);
  clearStylelint(files);
  clearSkeleton(files);
}

module.exports = {
  integrateUtils
}