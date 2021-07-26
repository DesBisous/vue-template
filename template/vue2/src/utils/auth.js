import qs from 'qs';
/* vuex import config */
import { userApi } from '@/api';
import { passportHost } from '@/data/host';
import { getLang } from '@/utils/lang';
import { tryCatchAjax } from '@/utils/http';
import { callHandlerToNative, inApp, isMobile } from '@hst/utils';

/**
 * 获取登录地址
 */
const getPassportUrl = () => {
  const lang = getLang();
  const params = qs.stringify({
    target: window.location.href,
    lang,
  });
  return `${passportHost}/login?${params}`;
};

/**
 * App 内唤起登录页
 *
 */
function toNativeLogin() {
  callHandlerToNative({
    type: 'LOGIN',
    data: {
      needPop: 'n', // IOS，关闭登录，是否需要返回上一页
      url: location.href,
    },
  });
}

/**
 * 跳转到登录页
 */
export async function goLogin() {
  // 这里如何自己本地配置了 nginx 就可以移除
  if (process.env.NODE_ENV === 'development') return;

  // 如果不在APP中自动跳转到登录页
  if (!inApp()) {
    window.location.href = getPassportUrl();
    return;
  }

  // 如果不是手机设备, 直接返回
  if (!isMobile()) return;

  toNativeLogin();
}

/**
 * 检查登录
 */
export async function checkLogin(to) {
  let isLogin = false;
  const params = to.query ?? {};
  // 校验是否登录
  await tryCatchAjax(userApi.checkLogin(params), res => {
    isLogin = res.data.logined;
    <%_ if (features.includes('vuex')) {_%>
    store.dispatch('user/setUserInfo', res.data);
    <%_ } else { _%>
    localStorage.setItem('userInfo', JSON.stringify(res.data));
    <%_ } _%>
  });
  !isLogin && goLogin();
}
