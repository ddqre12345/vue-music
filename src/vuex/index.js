import Vue from 'vue';
import Vuex from 'vuex';

import common from './modules/common';
import moviePlayer from './modules/moviePlayer';
import musicPlayer from './modules/musicPlayer';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    common,
    moviePlayer,
    musicPlayer
  }
});
