<template>
    <div class="single-player">
      <div class="player-wrapper">
        <div class='header-other'>
          <span @click="goBack" class="back"><i class="back-icon"></i></span>
          <div class="play-title">
            <p class="play-name"><span>{{audio.name}}</span></p>
            <p class="play-singer"> {{audio.singer}}</p>
          </div>
        </div>
        <div class="bar-line"></div>
        <div class="play-content">
          <div class="play-effect">
            <div class="cd-holder" :class="{'cd-play': playing}" :style="{'opacity': showLyric ? 0 : 1}" @click="toggleShow">
              <div class="stick"></div>
              <div class="cd-wrapper" :class="{'cd-rotate': playing}">
                <div class="cd-mask"></div>
                <img v-lazy="audio.albumPic + '?param=300y300'" lazy="loading" class="cd-img"/>
              </div>
            </div>
            <div class="lyric-holder" @click="toggleShow" :style="{'display': showLyric ? 'block' : 'none'}">
              <div class="lrc-inner" style="transition: -webkit-transform 0.3s ease-out; transform-origin: 0 0 0;" :style="{'transform':' translate3d(0px,'+ lrcOffset +'px, 0px)'}">
                <p v-for="(item, index) in afterLrc" :id="'line-'+index" :key="index">{{item.txt}}</p>
                <p v-show="afterLrc.length === 0">没有找到歌词</p>
              </div>
            </div>
          </div>
          <div class="bottom-wrapper">
            <div class="process-bar">
              <div class="pro">
                  <div class="pro-wrap">
                    <mu-slider class="song-slider" @change="changeTime" v-model="prCurrentTime"/>
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
import Toast from '../../../components/toast';
import BottomSheet from '../../../components/list';
import api from '../../../api';
export default {
  data () {
    return {
      lyric: '',
      afterLrc: [],
      lrcIndex: 0,
      showLyric: false
    };
  },
  components: {
    Toast,
    BottomSheet
  },
  mounted () {
    this.loadLrc(this.$route.params.id);
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
        let self = this;
            this.afterLrc = [{'txt': '正在加载中...'}];
            if (!id) {
            this.afterLrc = [{'txt': '这里显示歌词哦！'}];
            return;
        }
        api.getLyricResource(id).then((res) => {
              if (res.data.nolyric) {
                  this.afterLrc = [{'txt': '(⊙０⊙) 暂无歌词'}];
              } else {
                  this.lyric = res.data.lrc.lyric;
                  this.getLrc();
              }
        })
        .catch(function (error) {
            console.log(error);
            self.afterLrc = [{'txt': '(⊙０⊙) 暂无歌词'}];
        });
    },
    getLrc () {
      if (this.lyric) {
        let lyrics = this.lyric.split('\n');
        let lrcObj = [];
        /*eslint-disable */
        let timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
        /*eslint-enable */
        // 思路：1、把歌词进行处理以时间和歌词组成一个对象，放入afterLrc数组中
        // 2、在computed方法中根据当前的时间进行匹配歌词，然后查找在数据中的位置计算offset值
        for (let i = 0; i < lyrics.length; i++) {
          let timeRegExpArr = lyrics[i].match(timeReg);
          if (!timeRegExpArr) continue;
          let txt = lyrics[i].replace(timeReg, '');
          // 处理时间
          for (let k = 0; k < timeRegExpArr.length; k++) {
            let array = {};
            let t = timeRegExpArr[k];
            /*eslint-disable */
            let min = Number(String(t.match(/\[\d*/i)).slice(1));
            let sec = Number(String(t.match(/\:\d*/i)).slice(1));
            /*eslint-enable */
            array.time = min * 60 + sec;
            array.txt = txt;
            lrcObj.push(array);
          }
        }
        this.afterLrc = lrcObj;
      }
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
    ]),
    lrcOffset () {
      if (this.afterLrc) {
        // 1、根据时间获得歌词
        let current = Math.round(this.currentTime);
        // 2、根据时间得到歌词
        for (let i = 0; i < this.afterLrc.length; i++) {
          if (this.afterLrc[i].time === current) this.lrcIndex = i;
        }
        return -(this.lrcIndex) * 58;
      }
    }
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
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
    @import 'player.styl';
</style>
