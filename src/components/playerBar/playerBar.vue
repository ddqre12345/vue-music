<template>
  <div class="foot">
    <div class="player-mini">
      <div class="mini-content">
        <audio :src="audio.location" @timeupdate="updateTime" @canplay="canPlaySong" @error="loadError" @ended="next" id="audioPlay"></audio>
        <div class="music-logo">
          <img v-lazy="audio.albumPic + '?param=100y100'" lazy="loading" v-show="!loading" :alt="audio.name" @click="showDetail">
        </div>
        <div class="info">
          <p class="name" style="-webkit-box-orient: vertical;">{{audio.name}}</p>
          <p class="artist" style="-webkit-box-orient: vertical;">{{audio.singer}}</p>
        </div>
        <div class="mini-option">
          <div  class="mini-btn player-list" :class="{pause: playing}" @click="showList"></div>
          <div style='width:40px;height:40px;'>
            <x-circle :percent="prCurrentTime" :stroke-width="5" stroke-color="#ce332e" trail-color="#d1d1d1">
              <div class="mini-btn player" :class="{pause: playing}" @click="toggleStatus"></div>
            </x-circle>
          </div>
          <div class="mini-btn next" :class="{pause: playing}" @click="next"></div>
        </div>
      </div>
    </div>
    <toast ref="toast"></toast>
    <BottomSheet ref="bottomSheet"></BottomSheet>
  </div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex';
import { XCircle } from 'vux';
import Toast from '../toast';
import BottomSheet from '../list/common/list';
export default {
  data () {
    return {
      loadedTime: 0,
      playerTime: 0
    };
  },
  methods: {
    ...mapMutations([
      'play',
      'pause',
      'playNext',
      'resetAudio'
    ]),
    showDetail () {
      this.$router.push({name: 'player', params: {id: this.audio.id}});
      this.$store.commit('toggleDetail');
    },
    showList () {
      this.$refs.bottomSheet.show();
    },
    canPlaySong () {
      this.$store.commit('closeLoading');
      this.$store.commit('play');
      document.getElementById('audioPlay').play();
    },
    toggleStatus () {
      if (this.playing) {
        document.getElementById('audioPlay').pause();
        this.$store.commit('pause');
      } else {
        document.getElementById('audioPlay').play();
        this.$store.commit('play');
      }
    },
    // 文件加载出错
    loadError () {
      // 判断是第一次打开程序还是后来程序加载的路径有错根据src是否为空
      if (document.getElementById('audioPlay').currentSrc) {
        this.loading = false;
        this.$store.commit('closeLoading');
        // 还要把playbar重置下 TODO
      } else {
        this.$refs.toast.show('歌曲路径加载出错');
      }
    },
    next () {
      this.toggleStatus();
      switch (this.playType) {
        case 1:
        this.$store.commit('playNext');
        this.$store.dispatch('getSong', this.songList[this.currentIndex - 1].id);
        break;
        case 2:
        let value = Math.floor(Math.random() * (this.songList.length));
        this.$store.commit('setAudioIndex', value);
        this.$store.dispatch('getSong', this.songList[value].id);
        break;
        case 3:
        this.$store.commit('resetAudio');
        break;
      }
    },
    // 更新进度条事件
    updateTime () {
      let vm = this;
      let myaudio = document.getElementById('audioPlay');
      let time = parseInt(myaudio.currentTime);
      // 防止在未加载完成时，切歌出现的错误
      // Failed to execute 'end' on 'TimeRanges':
      // 由onprogress 更改为 onsuspend事件。参考：http://www.cnblogs.com/tianma3798/p/6038908.html
      myaudio.onsuspend = function () {
        let timeRange = myaudio.buffered;
        if (timeRange.length > 0 && myaudio.duration > 0) {
          vm.$store.commit('updateBufferedTime', parseInt(myaudio.buffered.end(0)));
        }
      };
      vm.$store.commit('updateDurationTime', parseInt(myaudio.duration));
      if (this.change) {
        myaudio.currentTime = this.tmpCurrentTime;
        this.$store.commit('setChange', false);
      } else {
        this.$store.commit('updateCurrentTime', time);
      }
    }
  },
  computed: {
    ...mapGetters([
      'audio',
      'change',
      'playing',
      'loading',
      'songList',
      'playType',
      'currentTime',
      'currentIndex',
      'prBufferedTime',
      'tmpCurrentTime',
      'prCurrentTime'
    ])
  },
  components: {
    Toast,
    BottomSheet,
    XCircle
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
    @import 'playerBar.styl';
</style>
