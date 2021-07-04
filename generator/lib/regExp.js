const invisibleExcludeWrap = ' \\f\\t\\u\\v';

module.exports = {
  delLineByValRegExp: (val = '', flag = 'g') => new RegExp(`[${invisibleExcludeWrap}]{0,}/\\* ${val}.{0,}\\*/[\\r?\\n]{0,}`, flag),
  removeSpaceBySign: (before, after, flag = 'g') => new RegExp(`${before}[${invisibleExcludeWrap}]{0,}${after}`, flag),
}
