import Vue from 'vue';
import Vuex from 'vuex';

import moviePlayer from './modules/moviePlayer';
import musicPlayer from './modules/musicPlayer';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    moviePlayer,
    musicPlayer
  }
});
