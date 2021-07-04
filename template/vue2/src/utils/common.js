import { inApp, getCookie, setCookie } from '@hst/utils';

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
 * 异步任务捕获异常
 */
export function tryCatch(promise) {
  return promise
    .then(res => {
      return [null, res];
    })
    .catch(err => [err]);
}

//跨浏览器获取目标对象
export function getTarget(ev) {
  if (ev.target) {
    //w3c
    return ev.target;
  } else if (ev.srcElement) {
    //IE
    return ev.srcElement;
  }
  return null;
}

/**
 * [stopPropagation 阻止冒泡行为]
 * @param  {[type]} event [description]
 * @return {[type]}       [description]
 */
export function stopPropagation(e) {
  const event = e || window.event;
  if (event && event.stopPropagation) {
    event.stopPropagation();
  } else {
    event.cancelBubble = true;
  }
}

/**
 * [preventDefault 浏览器阻止默认行为]
 * @param  {[type]} event [description]
 * @return {[type]}       [description]
 */
export function preventDefault(ev) {
  var e = ev || window.event;
  if (e.preventDefault) {
    e.preventDefault();
  } else {
    e.returnValue = false;
  }
}

/**
 * 跨浏览器添加事件
 */
export function addEvent(obj, type, fn) {
  if (obj.addEventListener) {
    obj.addEventListener(type, fn, false);
  } else if (obj.attachEvent) {
    //IE
    obj.attchEvent('on' + type, fn);
  }
}

//跨浏览器移除事件
export function removeEvent(obj, type, fn) {
  if (obj.removeEventListener) {
    obj.removeEventListener(type, fn, false);
  } else if (obj.detachEvent) {
    //兼容IE
    obj.detachEvent('on' + type, fn);
  }
}

/**
 * [throttleMsg 判断处理消息节流]
 */
export function throttleMsg(msg<%_ if (ui === 'antdv') { _%>, type = 'error'<%_ } _%>) {
  const hstMsg = getCookie('hstMessage'); // 已发布的消息
  const isThrottleMsg = hstMsg && hstMsg.includes(msg);
  if (!isThrottleMsg) {
    setCookie('hstMessage', msg, Date.now() + 1000);
    <%_ if (ui === 'vant') { _%>
    Toast(msg);
    <%_ } else if(ui === 'antdv') { _%>
    message[type](msg);
    <%_ } else { _%>
    console.log(msg);
    <%_ } _%>
  }
}

/**
 * 获取目录中的文件内容
 * @returns
 */
export function importAll(context, extRegExp = /\.js$/, keyRegExpCb = key => key) {
  const modules = {};
  const replace = str => str.replace(/.\//g, '').replace(extRegExp, '');

  context.keys().forEach(key => {
    const name = keyRegExpCb(replace(key));
    if (name) modules[name] = context(key).default ? context(key).default : context(key);
  });

  return modules;
}

// 深度合并对象
export function deepObjectMerge(firstObj, secondObj = {}) {
  for (const key in secondObj) {
    firstObj[key] =
      firstObj[key] && isObject(firstObj[key])
        ? deepObjectMerge(firstObj[key], secondObj[key])
        : secondObj[key];
  }
  return firstObj;
}

/**
 * 跳转到 app下载页, 尝试启动 APP
 * @param {Object} data {redirectType: 1, redirectValue: { url: '你当前的地址' }}
 */
export function launchApp(params) {
  const data = encodeURIComponent(JSON.stringify(params));
  window.location.href = `https://www.vbkr.com/app-deep-link/cn-landing?_app_redirect=${data}`;
}

/**
 * 统一 H5 点击跳转
 */
export function commonRedirect(cb, params, isNeedLaunch = false) {
  // 判断如果不在app内
  if (!inApp()) {
    isNeedLaunch && launchApp(params);
    return;
  }
  cb();
}

/**
 * 等待函数
 */
export async function wait(timeSpan = 600) {
  return new Promise(resolve => {
    setTimeout(resolve, timeSpan);
  });
}