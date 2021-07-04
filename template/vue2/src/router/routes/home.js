import Home from '@/views/Home.vue';

export default [
  {
    path: '/',
    name: 'Home',
    exact: true,
    component: Home,
    meta: {
      title: 'Home',
      keepAlive: true,
      sort: -1,
    },
  },
];
