<template>
    <div class="single-player">
      <div class="player-wrapper">
        <div class='header-other'>
          <span @click="goBack" class="back"><i class="back-icon"></i></span>
          <div class="play-title">
            <p class="play-name" style="-webkit-box-orient: vertical;"><span>{{audio.name}}</span></p>
            <p class="play-singer" style="-webkit-box-orient: vertical;"> {{audio.singer}}</p>
          </div>
        </div>
        <div class="bar-line"></div>
        <div class="play-content">
          <div class="play-effect">
            <div class="cd-holder" :class="{'cd-play': playing}" :style="{'opacity': showLyric ? 0 : 1}" @click="toggleShow">
              <div class="stick"></div>
              <div class="cd-wrapper" :class="{'cd-rotate': playing}">
                <div class="cd-mask"></div>
                <img v-lazy="audio.albumPic + '?param=300y300'" lazy="loading" class="cd-img">
              </div>
            </div>
            <div class="lyric-holder" @click="toggleShow" :style="{'display': showLyric ? 'block' : 'none'}">
              <div class="lrc-inner" style="transition: -webkit-transform 0.3s ease-out; transform-origin: 0 0 0;" :style="{'top': (300 - 42 * (currentIndex + 1) + 'px')}">
                <p v-for="(item, index) in afterLrc" :id="index" :key="index" :style="{'color': index === currentIndex ? '#fff' : '#8e9ba1'}">{{item[1]}}</p>
                <p v-show="afterLrc.length === 0">没有找到歌词</p>
              </div>
            </div>
          </div>
          <div class="bottom-wrapper">
            <div class="process-bar">
              <div class="pro">
                  <div class="pro-wrap">
                    <slider class="song-slider" @change="changeTime" v-model="prCurrentTime"></slider>
                  </div>
                  <div class="time">
                    <time id="cur">{{currentTime | time}}</time>
                    <time id="total">{{durationTime | time}}</time>
                  </div>
              </div>
            </div>
            <div class="control-bar">
              <div class="btn d-mode"></div>
              <div class="btn d-prev" @click="playPrev"></div>
              <div class="btn d-play btn-big" @click="togglePlay" :class="{'d-pause': playing}"></div>
              <div class="btn d-next" @click="playNext"></div>
              <div class="btn d-list" @click="showList"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="mask">
        <div class="album-cover" :style="{'background-image':'url(' + audio.albumPic + '?param=500y500' + ')'}"></div>
        <div class="cover-mask" style="opacity:0.6;"></div>
      </div>
      <toast ref="toast"></toast>
      <BottomSheet ref="bottomSheet"></BottomSheet>
    </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';
import slider from '../../../components/slider/slider';
import Toast from '../../../components/toast';
import BottomSheet from '../../../components/list/common/list';
import api from '../../../api';
export default {
  data () {
    return {
      afterLrc: [],
      lrcIndex: 0,
      showLyric: false,
      currentIndex: -1
    };
  },
  mounted () {
    this.loadLrc(this.$route.params.id);
  },
  // watch currentTime 调整歌词当前高亮位置
  watch: {
    'currentTime' (val) {
      let currentIndex = 0;
      for (let i = 0; i < this.afterLrc.length; i++) {
        if (val > this.afterLrc[i][0] - 1) {
          currentIndex = i;
        }
      }
      this.currentIndex = currentIndex;
    }
  },
  methods: {
    toggleShow () {
      this.showLyric = !this.showLyric;
    },
    togglePlay () {
      if (this.playing) {
        this.$store.commit('pause');
        document.getElementById('audioPlay').pause();
      } else {
        this.$store.commit('play');
        document.getElementById('audioPlay').play();
      }
    },
    goBack () {
      this.$router.go(-1);
      this.$store.commit('toggleDetail');
    },
    changeTime (value) { // 改变播放时间事件
      let time = (value * this.durationTime) / 100;
      this.$store.commit('changeTime', time);
      this.$store.commit('setChange', true);
    },
    loadLrc (id) {
        this.afterLrc = [{'txt': '正在加载中...'}];
        if (!id) {
            this.afterLrc = [{'txt': '这里显示歌词哦！'}];
            return;
        }
        api.getLyricResource(id).then((res) => {
              if (res.data.nolyric) {
                  this.afterLrc = [{'txt': '暂无歌词'}];
              } else {
                  this.afterLrc = this.parseLyric(res.data.lrc.lyric);
              }
        })
        .catch(function (error) {
          console.log('加载出错:' + error);
        });
    },
    parseLyric(lyric) {
      let lines = lyric.split('\n');
      let pattern = /\[\d{2}:\d{2}.\d{2}\]/g;
      let result = [];
      while (!pattern.test(lines[0])) {
        lines = lines.slice(1);
      }
      lines[lines.length - 1].length === 0 && lines.pop();
      for (let data of lines) {
        let index = data.indexOf(']');
        let time = data.substring(0, index + 1);
        let value = data.substring(index + 1);
        let timeString = time.substring(1, time.length - 2);
        let timeArr = timeString.split(':');
        result.push([parseInt(timeArr[0], 10) * 60 + parseFloat(timeArr[1]), value]);
      }
      result.sort(function(a, b) {
        return a[0] - b[0];
      });
      return result;
    },
    showList () {
      this.$refs.bottomSheet.show();
    },
    ...mapMutations([
      'playNext',
      'playPrev'
    ])
  },
  computed: {
    ...mapGetters([
      'currentTime',
      'bufferedTime',
      'durationTime',
      'prCurrentTime',
      'audio',
      'playing'
    ])
  },
  filters: {
    // 时间字符格式化
    time (value) {
      let length = Math.floor(parseInt(value));
      let minute = Math.floor(value / 60);
      if (minute < 10) {
        minute = '0' + minute;
      }
      let second = length % 60;
      if (second < 10) {
        second = '0' + second;
      }
      return minute + ':' + second;
    }
  },
  components: {
    slider,
    Toast,
    BottomSheet
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import 'player.styl';
</style>
