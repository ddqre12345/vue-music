/**
 * Created by yi on 2017-01-06.
 */
import Vue from 'vue';
import Vuex from 'vuex';
// Vuex 进行状态管理
Vue.use(Vuex);

// 创建一个对象来保存应用启动时的初始状态
const state = {
    musicData: [],
    skinColor: localStorage.skinColor || '#B72712',
    isShowIndex: true,
    isPlaying: false,
    isAnimation: false,
    isShowAsideMenu: false,
    isShowMiniMusic: false,
    isShowAbout: false,
    linkBorderIndex: '',
    DOM: {},
    audio: {
      name: '',
      src: '',
      musicImgSrc: '',
      index: 0
    }
};
// 创建一个对象存储一系列我们接下来要写的 mutation 函数
const mutations = {
    del(state, index) {
      if (state.musicData.length === 0) {
        return;
      }
      state.musicData.splice(index, 1);
    },
    play(state, flag) {
      state.isPlaying = flag;
    },
    addMusic(state, payload) {
      for (let music of state.musicData) {
        if (JSON.stringify(music) === JSON.stringify(payload)) {
          return;
        }
      }
      state.musicData.unshift(payload);
    },
    toggleMusic(state, index) {
        state.audio.name = state.musicData[index].name;
        state.audio.src = state.musicData[index].src;
        state.audio.musicImgSrc = state.musicData[index].musicImgSrc;
        state.audio.index = index;
    },
    playMusic(state, payload) {
      state.audio.name = payload.name;
      state.audio.src = payload.src;
      state.audio.musicImgSrc = payload.imgSrc;
      state.isPlaying = true;
    },
    findDOM(state, payload) {
      state.DOM[payload.name] = payload.dom;
    },
    showIndex(state, flag) {
      state.isShowIndex = flag;
    },
    showAsideMenu(state, flag) {
      state.isShowAsideMenu = flag;
    },
    showMiniMusic(state, flag) {
      state.isShowMiniMusic = flag;
    },
    showAbout(state, flag) {
      state.isShowAbout = flag;
    },
    changeLinkBorderIndex(state, index) {
      state.linkBorderIndex = index;
    },
    changeSkinColor(state, color) {
      state.skinColor = color;
    }
};

const actions = {
    getData({ commit,state }) {
      if (localStorage.musics !== '[]' && localStorage.musics) {
        state.musicData = JSON.parse(localStorage.musics);
        return;
      }
      return new Promise((resolve, reject) => {
        Vue.axios.get('/api/music-data')
            .then (res => {
              if (res.data.errno === 0) {
                state.musicData = res.data.musicData;
                localStorage.musics = JSON.stringify(state.musicData);
              }
            })
            .then(() => {
              commit('toggleMusic',0)
            });
        resolve();
      });
    }
};

// 整合初始状态和变更函数，我们就得到了我们所需的 store
// 至此，这个 store 就可以连接到我们的应用中
export default new Vuex.Store({
  state,
  mutations,
  actions
});
