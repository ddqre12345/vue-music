<template>
    <div class="container">
        <div class="vue-mv-video-container" @mouseenter="mouseEnterVideo" @mouseleave="mouseLeaveVideo">
            <!--视频数据来源-->
            <video :class="{ 'hide-cursor': !state.contrlShow }" class="vue-mv-video" :poster="options.poster">
                <source v-for="source in sources" :src="source.src" :type="source.type">
                </source>
            </video>
            <div class="vue-mv-contrl-play-btn-area">
                <!--暂停图标-->
                <img src="./timeOut.svg" v-show="!state.playing" @click="play">
                <!--播放图标-->
                <img src="./playing.svg" v-show="state.playing" @click="play">
            </div>
            <!--控制条-->
            <div class="vue-mv-control-content" transition="fade" v-show="state.contrlShow">
                <!--视频播放时间-->
                <div class="vue-mv-contrl-video-time">
                    <span class="vue-mv-contrl-video-time-text">{{video.displayTime}}</span>
                    <span>/</span>
                    <span class="vue-mv-contrl-video-time-text">{{video.durationTime}}</span>
                </div>
                <!--全屏播放按钮-->
                <button class="vue-mv-control-fullScreen-btn" @click="fullScreen">
                  <img src="./fullScreen.svg" alt="fullScreen">
                </button>
            </div>
            <div class="vue-mv-contrl-video-slider">
                <div class="vue-mv-contrl-video-rail" :style="{'width': `${video.pos.buffered}%`}">
                  <div class="vue-mv-contrl-video-rail-inner" :style="{'width': `${video.pos.current}%`}"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  const pad = (val) => {
    val = Math.floor(val);
    if (val < 10) {
      return '0' + val;
    }
    return val + '';
  };
  const timeParse = (sec) => {
    let min;
    min = Math.floor(sec / 60);
    sec = sec - min * 60;
    return pad(min) + ':' + pad(sec);
  };
  export default {
    props: {
      sources: Array,
      options: {
        type: Object,
        default () {
          return {
            autoplay: false,
            volume: 0.9,
            poster: ''
          };
        }
      }
    },
    data () {
      return {
        $video: null,
        video: {
          displayTime: '00:00',
          durationTime: '00:00',
          pos: {
            current: 0,
            buffered: 0
          }
        },
        tmp: {
          contrlHideTimer: null
        },
        state: {
          contrlShow: true,
          fullScreen: false,
          playing: false
        }
      };
    },
    mounted () {
      this.$video = this.$el.getElementsByTagName('video')[0];
      this.video.pos.width = window.screen.width;
      if (this.options.autoplay) {
        this.play();
      }
    },
    methods: {
      mouseEnterVideo () {
        console.log('鼠标点击');
        if (this.tmp.contrlHideTimer) {
          clearTimeout(this.tmp.contrlHideTimer);
          this.tmp.contrlHideTimer = null;
        }
        this.state.contrlShow = true;
      },
      mouseLeaveVideo (e) {
        console.log('鼠标移开');
        if (this.tmp.contrlHideTimer) {
          clearTimeout(this.tmp.contrlHideTimer);
        }
        this.tmp.contrlHideTimer = setTimeout(() => {
          this.state.contrlShow = false;
          this.tmp.contrlHideTimer = null;
        }, 2000);
      },
      play () {
        this.state.playing = !this.state.playing;
        if (this.$video) {
          if (this.state.playing) {
            this.$video.play();
            this.mouseLeaveVideo();
            this.$video.addEventListener('timeupdate', this.timeline);
            this.$video.addEventListener('ended', (e) => {
              this.state.playing = false;
              this.video.pos.current = 0;
              this.$video.currentTime = 0;
            });
          } else {
            this.$video.pause();
          }
        }
      },
      // 监听视频播放情况，同步修正缓冲进度，播放进度
      timeline () {
        // 修正视频当前播放进度
        this.video.pos.current = (this.$video.currentTime / this.$video.duration).toFixed(3) * 100;
        // 修正视频缓冲进度
        this.video.pos.buffered = (this.$video.buffered.end(0) / this.$video.duration).toFixed(3) * 100;
        // 获取视频播放总时长，转化为00:00格式
        this.video.durationTime = timeParse(this.$video.duration);
        // 获取视频当前播放时间点，转化为00:00格式
        this.video.displayTime = timeParse(this.$video.currentTime);
      },
      fullScreen () {
        if (!this.state.fullScreen) {
          this.state.fullScreen = true;
          this.$video.webkitRequestFullScreen();
        } else {
          this.state.fullScreen = false;
          document.webkitCancelFullScreen();
        }
        setTimeout(this.$video.addEventListener('timeupdate', this.timeline), 200);
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
    @import 'video.styl';
</style>
