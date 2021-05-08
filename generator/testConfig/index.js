
const { getFeaturesAttr } = require('../utils/common.js');
const { integrateUnitTest } = require('./unit/index.js');

function integrateTest(api, options, files) {
  const { testSign } = getFeaturesAttr(options);
  switch (testSign) {
    case 'Unit Testing':
        integrateUnitTest(api, options, files);
      break;
    default:
      break;
  }
}

module.exports = {
  integrateTest
}