import Vue from 'vue';
import VueRouter from 'vue-router';
import { importAll } from '@/utils/common';

const getRoutes = () => {
  const routesContext = importAll(require.context('./routes', false, /\.js$/));
  return Object.values(routesContext)
    .reduce((routes, route) => [...routes, ...route], [])
    .sort((a, b) => (a.meta.sort || 0) - (b.meta.sort || 0));
};

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  // process.env.BASE_URL 默认是 /
  base: process.env.BASE_URL,
  routes: getRoutes(),
});

router.beforeEach((to, from, next) => {
  // 设置title
  document.title = to.meta.title;

  // 登录校验

  next();
});

export default router;
