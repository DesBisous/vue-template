// 校验是否为无效值：[空字符串，null, undefined]
export function isInvalid(value) {
  if (value === null || value === undefined) {
    return true;
  }
  // 空字符串
  if (typeof value === 'string' && !value.trim()) {
    return true;
  }
  return false;
}

// 是否为数字
export function isNumber(val) {
  const regPos = /^\d+(\.\d+)?$/; //非负浮点数
  const regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
  return regPos.test(val) || regNeg.test(val);
}
