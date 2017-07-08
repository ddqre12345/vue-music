<template>
    <div class="video-player" @click="showControls">
      <div class="fixed-title" style="transition: opacity .1s;" v-show="isControlShow&&!loading&&isPlayShow">
        <x-header :left-options="{backText: ''}" style="background-color:transparent;font-size: 12px;">{{name}}</x-header>
      </div>
      <!--视频数据来源-->
      <video id="video" ref="video" preload="auto" :src="video.source" webkit-playsinline playsinline width="100%" height="100%" v-if="isPlayShow">
          <source :src="video.source" type='video/mp4'/>
      </video>
      <div class="controls">
          <!--播放/暂停按钮-->
          <div class="player-control-btn" v-show="isControlShow&&!loading">
              <!--暂停图标-->
              <img src="./timeOut.svg" class="btn" v-show="isPlay" @click="play">
              <!--播放图标-->
              <img src="./playing.svg" class="btn" v-show="!isPlay" @click="play">
          </div>
          <!--缓存加载效果-->
          <div class="mv-loading">
              <v-mv-loading :show="loading"></v-mv-loading>
          </div>
          <!--控制条-->
          <div class="control-content" v-show="isControlShow&&!loading&&isPlayShow">
              <!--视频播放时间-->
              <div class="time-display">
                  <span class="current-time">{{currentTime}}</span>/<span class="total-time">{{durationTime}}</span>
              </div>
              <!--全屏播放按钮-->
              <div class="fullScreen-btn" @click="setFullScreen">
                  <img src="./fullScreen.svg" alt="fullScreen">
              </div>
          </div>
          <div class="video-progress" ref="progress" v-show="isPlayShow">
              <div class="video-buffered-progress" :style="{'width': `${posBuffered}%`}">
                  <div class="video-current-progress" :style="{'width': `${posCurrent}%`}"></div>
                  <div ref="drager" :style="{'left': `${posCurrent}%`}" class="drager" v-show="isControlShow&&!loading&&isPlayShow"></div>
              </div>
          </div>
      </div>
    </div>
</template>
<script>
  import { XHeader } from 'vux';
  import vMvLoading from '../../components/loading/mv-loading';
  export default {
    name: 'video-player',
    data () {
      return {
        isPlay: false,
        isPlayShow: false,
        isControlShow: true,
        isFullScreen: false,
        loading: false,
        currentTime: '00:00',
        durationTime: '00:00',
        posCurrent: 0,
        posBuffered: 0,
        $video: undefined,
        controlShowTimer: null,
        video: {
          type: this.type,
          source: this.source,
          poster: this.poster
        }
      };
    },
    props: {
      source: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: ''
      },
      poster: {
        type: String,
        default: ''
      },
      name: {
        type: String,
        default: ''
      }
    },
    mounted () {
      this.$root.$on('change-poster', (val) => {
          this.video.poster = val;
      });
      this.$root.$on('change-source', (val) => {
          this.video.source = val;
          this.reload();
      });
    },
    methods: {
      pad(val) {
        val = Math.floor(val);
        if (val < 10) {
          return '0' + val;
        }
        return val + '';
      },
      timeParse(sec) {
        let min;
        min = Math.floor(sec / 60);
        sec = sec - min * 60;
        return this.pad(min) + ':' + this.pad(sec);
      },
      reload() {
        if (this.$refs.video !== undefined) {
          this.$refs.video.load();
        }
      },
      initVideo() {
        this.$video = this.$refs.video;
        this.$video.play();
        this.loading = true;
        // 当视频的元数据(时长、尺寸)已加载时
        this.$video.addEventListener('loadedmetadata', () => {
          this.durationTime = this.timeParse(this.$video.duration);
          this.currentTime = this.timeParse(this.$video.currentTime);
        });
        // 当浏览器能够开始播放视频时
        this.$video.addEventListener('canplay', () => {
          this.isControlShow = false;
          this.loading = false;
        });
        // 当目前的播放位置已更改时
        this.$video.addEventListener('timeupdate', () => {
          // 获取当前播放时间
          this.currentTime = this.timeParse(this.$video.currentTime);
          // 修正视频当前播放进度
          this.posCurrent = (this.$video.currentTime / this.$video.duration).toFixed(6) * 100;
          // 修正视频缓冲进度

          if (this.$video.buffered.length > 0) {
            this.posBuffered = (this.$video.buffered.end(0) / this.$video.duration).toFixed(6) * 100;
          }
        });
        // 当视频由于需要缓冲下一帧而停止
        this.$video.addEventListener('waiting', () => {
          this.isControlShow = true;
          this.loading = true;
        });
        // 当视频已暂停时
        this.$video.addEventListener('pause', () => {
          this.isControlShow = true;
          this.isPlay = false;
        });
        // 当视频已开始或不再暂停时
        this.$video.addEventListener('play', () => {
          this.isControlShow = false;
          this.isPlay = true;
        });
        // 当目前的播放列表已结束时
        this.$video.addEventListener('ended', () => {
          this.isControlShow = true;
          this.isPlay = false;
        });
        this.pressMove();
      },
      play() {
        if (this.isPlay === false) {
          this.isPlay = true;
          if (this.isPlayShow === false) {
            this.isPlayShow = true;
            setTimeout(() => {
              this.initVideo();
            }, 0);
          } else {
            this.$video.play();
            this.isControlShow = false;
          }
        } else {
          clearTimeout(this.controlShowTimer);
          this.isControlShow = true;
          this.$refs.video.pause();
          this.isPlay = false;
        }
      },
      // 拖动更改视频进度
      pressMove() {
        let $drager = this.$refs.drager;
        let $progress = this.$refs.progress;
        $drager.addEventListener('touchstart', (e) => {
          clearTimeout(this.controlShowTimer);
        });
        $drager.addEventListener('touchmove', (e) => {
          this.$video.pause();
          if (e.targetTouches[0].clientX < 0) {
            this.posCurrent = 0;
          } else if (e.targetTouches[0].clientX > $progress.offsetWidth) {
            this.posCurrent = '100';
          } else {
            let dragerTime = (e.targetTouches[0].clientX / $progress.offsetWidth).toFixed(4);
            this.posCurrent = dragerTime * 100;
            this.currentTime = this.timeParse(dragerTime * this.$video.duration);
          }
        });
        $drager.addEventListener('touchend', (e) => {
          let dragerTime = (e.changedTouches[0].clientX / $progress.offsetWidth).toFixed(4) * this.$video.duration;
          this.currentTime = this.timeParse(dragerTime);
          this.$video.currentTime = dragerTime.toFixed(0);
          this.$video.play();
        });
      },
      showControls() {
        clearTimeout(this.controlShowTimer);
        if (this.isPlay === true && !this.loading) {
          if (this.isControlShow === false) {
            this.isControlShow = true;
            this.controlShowTimer = setTimeout(() => {
              this.isControlShow = false;
            }, 3000);
          } else {
            this.isControlShow = false;
          }
        }
      },
      setFullScreen() {
        if (this.$video.requestFullscreen) {
          this.$video.requestFullscreen();
        } else if (this.$video.mozRequestFullScreen) {
          this.$video.mozRequestFullScreen();
        } else if (this.$video.webkitRequestFullscreen) {
          this.$video.webkitRequestFullscreen();
        }
      }
    },
    components: {
      XHeader,
      vMvLoading
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
    @import 'video.styl';
</style>
