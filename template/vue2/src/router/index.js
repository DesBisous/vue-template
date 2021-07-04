import Vue from 'vue';
import store from '@/store';
import VueRouter from 'vue-router';
import { historyBase } from '@/data/host';
import { checkLogin } from '@/utils/auth';
import { importAll } from '@/utils/common';
import { inApp, isAndroid } from '@hst/utils';

const getRoutes = () => {
  const routesContext = importAll(require.context('./routes', false, /\.js$/));
  return Object.values(routesContext)
    .reduce((routes, route) => [...routes, ...route], [])
    .sort((a, b) => (a.meta.sort || 0) - (b.meta.sort || 0));
};

// 解决重复路由跳转警告
const originPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originPush.call(this, location).catch(err => err);
};

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: historyBase(),
  routes: getRoutes(),
});

router.beforeEach(async (to, from, next) => {
  // 设置title
  document.title = to.meta.title;

  // 登录校验
  await checkLogin(to);

  next();
});

router.afterEach(() => {
  if (inApp() && !isAndroid()) {
    if (window.webkit) {
      window.webkit.messageHandlers.hashchangeMessageHandler.postMessage(null); // IOS 设置标题额外需要
    }
  }

  //gio 统计
  if (window.gio) {
    // 设置登录用户ID, 从 check/login 中获取 GIO_RID
    const rId = store.getters['user/userInfo']?.GIO_RID;
    if (rId) {
      window.gio('setUserId', rId);
      window.gio('people.set', 'rId', rId);
    }
  }
});

export default router;
