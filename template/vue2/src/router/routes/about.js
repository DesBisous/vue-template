export default [
  {
    path: '/about',
    name: 'About',
    exact: true,
    component: () => import('@/views/About.vue'),
    meta: {
      title: 'About',
      keepAlive: true,
      sort: 1,
    },
  },
];
