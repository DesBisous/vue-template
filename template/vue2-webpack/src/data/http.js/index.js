import i18n from '@/plugins/i18n';
// 当前请求中 url
export const requestList = new Set();

// 错误码字典
export const errCode = {
  400: i18n.t('errCode.400'),
  401: i18n.t('errCode.401'),
  404: i18n.t('errCode.404'),
  500: i18n.t('errCode.500'),
  501: i18n.t('errCode.501'),
};
