import Vue from 'vue';
import App from './App.vue';
import router from './router';
import i18n from '@/plugins/i18n';
import global from '@/plugins/global';
import directive from '@/plugins/directive';

Vue.config.productionTip = false;
/* fastClick attach body */

// plugins
Vue.use(global);
Vue.use(directive);
/* vant vue use */
/* antdv vue use */
<%_ if (utils.includes('skeleton')) { _%>
const app = new Vue({
<%_ } else { _%>
new Vue({
<%_ } _%>
  i18n,
  router,
  <%_ if (ui === 'antdv') { _%>
  render() {
    return (
      <Intl>
        <App />
      </Intl>
    );
  },
  <%_ } else { _%>
  render: h => h(App),
  <%_ } _%>
<%_ if (utils.includes('skeleton')) { _%>
});
<%_ } else { _%>
}).$mount('#app');
<%_ } _%>

<%_ if (utils.includes('skeleton')) { _%>
window.mountApp = () => {
  app.$mount('#app');
};
if (window.styleReady) {
  window.mountApp();
}
<%_ } _%>