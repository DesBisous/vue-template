import { langType } from '@/data/lang';

const state = () => ({
  lang: langType.zhCN, // 默认简体
});

// getters
const getters = {
  lang: state => state.lang,
};

// actions
const actions = {
  setLang(context, lang) {
    context.commit('setLang', lang);
  },
};

// 更改状态
const mutations = {
  setLang(state, lang) {
    state.lang = lang;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
