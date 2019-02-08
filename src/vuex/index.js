import Vuex from 'vuex';

import common from './modules/common';
import musicPlayer from './modules/musicPlayer';

export default new Vuex.Store({
  modules: {
    common,
    musicPlayer
  }
});
