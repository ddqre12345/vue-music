import Vue from 'vue';
import Vuex from 'vuex';

import common from './modules/common';
import musicPlayer from './modules/musicPlayer';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    common,
    musicPlayer
  }
});
