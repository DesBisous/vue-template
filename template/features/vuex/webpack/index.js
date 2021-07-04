import Vue from 'vue';
import Vuex from 'vuex';
import { importAll } from '@/utils/common';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const modules = importAll(require.context('./modules', false, /\.js$/));

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules,
  plugins: [
    // 数据持久化
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
});
