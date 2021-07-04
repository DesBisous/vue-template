import i18n from '@/plugins/i18n';
import { debounce } from '@hst/utils';
import { langType } from '@/data/lang';
import { getLang } from '@/utils/lang';
import { wait, tryCatch, throttleMsg, isObject, isFunction } from '@/utils/common';
import { errCode, hideCode, httpDelay, gateway, requestList, noRepeatIntercept } from '@/data/http';

/**
 * [gatewayConfig 网关配置]
 * @param  {[type]} config [description]
 * @return {[type]}        [description]
 */
export function gatewayConfig(config) {
  const _config = config;
  const url = _config.url;
  if (url && url.indexOf('//') < 0) {
    _config.url = gateway + _config.url;
  }
}

/**
 * [isHide 从字典中判断是否需要 $message 的消息]
 * @param  {[type]}  code [关键字]
 * @return {Boolean}      [description]
 */
export function isHide(code) {
  return hideCode.includes(`${code}`);
}

/**
 * 重复请求拦截
 */
export function repeatRequestIntercept(config, cancelToken) {
  // 判断 url 是否需要拦截重复取消操作
  const noCancelRepeat = noRepeatIntercept.find(url => config.url.indexOf(url) > -1);
  if (!noCancelRepeat && requestList.has(config.url)) {
    cancelToken('Cancellation Request');
    return;
  }
  // 未拦截的保存
  requestList.add(config.url);
}

/**
 * 清除请求 url 记录
 * httpDelay 按照接口请求速度能达到 httpDelay+ 即可完成
 */
export async function removeRequestListItem(config, delay = httpDelay) {
  if (!config) return;
  await wait(delay);
  requestList.delete(config.url);
}

/**
 * http 错误拦截
 */
export function errorIntercept(error) {
  // 请求超时
  if (error.code === 'ECONNABORTED') {
    throttleMsg(errCode[error.code]);
    return;
  }
  // 自定义错误
  if (errCode[error.message]) {
    console.log(errCode[error.message]);
    return;
  }
  // 错误码拦截
  resStateIntercept(error);
}

/**
 * 错误码拦截
 */
export function resStateIntercept(error) {
  if (!error.response) return;
  const { status } = error.response;
  const errMsg = errCode[status] || errCode['default'];
  if (!isHide(status)) {
    throttleMsg(errMsg);
  }
}

/**
 * 响应时特殊拦截处理
 * 这里可以做一些统一的顶层接口响应拦截
 */
export const responseIntercept = debounce(function () {}, 1000, false);

/**
 * [reqResultCallback 请求结果回调包装]
 * [不处理网络异常,这些交给 axios 处理]
 * @param  {[type]}   res [请求结果]
 * @param  {Function} cb  [callback]
 */
export function reqResultCallback(err, res, cb, errCb) {
  if (err !== null) {
    errCb && errCb(err, res);
    throw err;
  }
  const sucMsg = res.sucMsg || '';
  const errMsg = res.errMsg || '';

  if (res.code === '00000') {
    sucMsg && throttleMsg(sucMsg);
    cb && cb(res);
  } else {
    // errCode[res.code] 可以在 errCode 定义服务端返回的 111111 给一个友好提示
    const msg =
      errMsg || errCode[res.code] || getLang(i18n.locale) === langType.zhCN
        ? res.error
        : res.errorHK || res.error || '';
    msg && !isHide(res.code) && (!res.isHide || !res.isHide()) && throttleMsg(msg);
    errCb && errCb(err, res);
  }
}

/**
 * 统一封装处理 Ajax 的 tryCatchAjax 和 消息提示
 * @param {*} request Ajax 请求
 * @param {*} cb 成功回调
 * @param {*} args 接受剩余参数：1、存在 Func 作为 errCb，多个执行覆盖；2、存在 Object 作为 options，多个覆盖
 */
export async function tryCatchAjax(request, cb, ...args) {
  let errCb, options;

  const combinFunc = arg => {
    isFunction(arg) ? (errCb = arg) : isObject(arg) ? (options = { ...options, ...arg }) : null;
  };

  args.forEach(arg => combinFunc(arg));
  const [err, res] = await tryCatch(request);
  reqResultCallback(err, { ...res, ...options }, cb, errCb);
}