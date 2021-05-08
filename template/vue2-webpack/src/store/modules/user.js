const state = () => ({
  userInfo: {}, // 信息
});

// getters
const getters = {
  userInfo: state => state.userInfo,
};

// actions
const actions = {
  setUserInfo(context, userInfo) {
    context.commit('setUserInfo', userInfo);
  },
};

// 更改状态
const mutations = {
  setUserInfo(state, userInfo) {
    state.userInfo = { ...state.userInfo, ...userInfo };
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
