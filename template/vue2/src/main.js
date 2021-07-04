import Vue from 'vue';
import App from './App.vue';
import router from './router';
import i18n from '@/plugins/i18n';
import directive from '@/plugins/directive';

Vue.config.productionTip = false;
/* fastClick attach body */

// plugins
Vue.use(directive);
/* vant vue use */
/* antdv vue use */ 
new Vue({
  i18n,
  router,
  <%_ if(ui === 'antdv') { _%>
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
}).$mount('#app');
