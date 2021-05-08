import i18n from '@/plugins/i18n';
import NotFound from '@/components/common/NotFound.vue';

export default [
  {
    // 找不到该页面
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: {
      title: i18n.t('router.notFound'),
      sort: 99,
    },
  },
];
