export default [
  {
    path: '/about',
    name: 'About',
    exact: true,
    component: () => import('@/views/About.vue'),
    meta: {
      title: 'About',
      keepAlive: false,
      sort: 1,
    },
  },
];
