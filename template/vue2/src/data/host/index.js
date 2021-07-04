// 静态文件地址域名
export const staticHost = `${process.env.VUE_APP_RES_OLD_URL}/projects/h5`;

// 当前域名
export const originHost =
  process.env.NODE_ENV === 'production' ? window.location.origin : process.env.VUE_APP_DAILY_DOMAIN;
// 权限校验域名, 页面跳转使用
export const passportHost = `${originHost}/passport`;

export const historyBase = () => {
  if (process.env.NODE_ENV !== 'production') return process.env.BASE_URL;
  return '/'; // 上线后的目录地址
};
