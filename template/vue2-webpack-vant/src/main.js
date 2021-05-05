import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from '@/plugins/i18n.js';
import fastClick from 'fastclick';
import vant from '@/plugins/vant';
import 'amfe-flexible/index.js';
import '@/assets/icons';
import '@/mocks';
import '@/assets/styles/index.less';

Vue.config.productionTip = false;
fastClick.attach(document.body);

// plugins
Vue.use(vant);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
