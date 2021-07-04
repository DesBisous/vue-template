import i18n from '@/plugins/i18n';

export const gateway = process.env.NODE_ENV !== 'production' ? '/api' : '';
export const token = 'HSH5_SID';

// http 请求延时时间
export const httpDelay = 60;
// 当前请求中 url
export const requestList = new Set();
// 无需防止重复提交的接口
export const noRepeatIntercept = ['rest/login/check'];

// 错误码字典
export const errCode = {
  400: i18n.t('errCode.400'),
  401: i18n.t('errCode.401'),
  404: i18n.t('errCode.404'),
  500: i18n.t('errCode.500'),
  501: i18n.t('errCode.501'),
  default: i18n.t('errCode.default'),
  ECONNABORTED: i18n.t('errCode.ECONNABORTED'),
  'Cancellation Request': i18n.t('errCode.Cancellation Request'),
};
/**
 * 特殊状态不进行弹窗，比如 401，直接去登录页面或者缓存原生, 包括后台返回的状态码
 */
export const hideCode = ['401'];
