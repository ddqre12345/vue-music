const state = {
    isShowAsideMenu: false,
    loadingShow: false
};

const getters = {
    isShowAsideMenu: state => state.isShowAsideMenu,
    loadingShow: state => state.loadingShow
};

const mutations = {
    showAsideMenu(state, flag) {
      state.isShowAsideMenu = flag;
    },
    update_loading(state, data) {
      state.loadingShow = data;
    }
};

const actions = {
};

export default {
  state,
  getters,
  mutations,
  actions
};
