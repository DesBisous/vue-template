/**
 * 是否为对象
 */
export function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * 是否为方法
 */
export function isFunction(val) {
  return typeof val === 'function';
}

/**
 * 获取目录中的文件内容
 * @returns
 */
export function importAll(context, extRegExp = /\.js$/) {
  const modules = {};
  const replace = str => str.replace(/.\//g, '').replace(extRegExp, '');

  context.keys().forEach(key => {
    const name = replace(key);
    if (name) modules[name] = context(key).default;
  });

  return modules;
}

// 深度合并对象
export function deepObjectMerge(firstObj, secondObj) {
  for (const key in secondObj) {
    firstObj[key] =
      firstObj[key] && isObject(firstObj[key])
        ? deepObjectMerge(firstObj[key], secondObj[key])
        : secondObj[key];
  }
  return firstObj;
}
