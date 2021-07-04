module.exports = {
  // 规范文档：http://stylelint.cn/user-guide/rules/
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  rules: {
    /** Color */
    'color-no-invalid-hex': true, // 禁止使用无效的十六进制颜色
    'color-hex-length': 'long', // 指定十六进制颜色不缩写
    'color-hex-case': 'upper', // 指定十六进制颜色大写
    /** Font family */
    'font-family-no-duplicate-names': true, // 禁止使用重复的字体名称
    /** Function */
    'function-calc-no-unspaced-operator': true, // 禁止在 calc 函数内使用不加空格的操作符
    'function-comma-space-before': 'never', // 在函数逗号之前禁止有空白
    'function-comma-space-after': 'always', // 在函数逗号之后必须有一个空格
    'function-name-case': 'lower', // 函数名称使用驼峰式大小写
    'function-parentheses-space-inside': 'never', // 在括号内两边禁止有空白
    /** At-rule */
    'rule-empty-line-before': 'always', // 要求在 at 规则之前有空行。
    /** Value */
    'value-keyword-case': null, // 关闭 @-webkit-keyframes 关键字的值的大小写
    'value-list-comma-newline-after': null, // 关闭值列表的逗号之后要求有一个换行符或禁止有空白
    /** Declaration block */
    'declaration-empty-line-before': 'never', // 禁止在声明语句之前有空行
    'declaration-block-trailing-semicolon': 'always', // 必须有拖尾分号
    'declaration-colon-newline-after': null, // 关闭在多行值列表的冒号之后必须有一个换行符
    /** Unit */
    'unit-whitelist': ['em', 'rem', '%', 's', 'px', 'dppx'], // 指定一个所允许的单位的白名单
    /** General / Sheet */
    'max-nesting-depth': 4, // 限制允许嵌套的深度
  },
};
