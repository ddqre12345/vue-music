<template>
    <div class="container">
        <div class="vue-mv-video-container">
            <!--视频数据来源-->
            <video :class="{ 'hide-cursor': !state.controlShow }" class="vue-mv-video" :poster="options.poster" @touchstart="touchStart" @touchend="touchend">
                <source v-for="source in sources" :src="source.src" :type="source.type">
                </source>
            </video>
            <div class="vue-mv-contrl-play-btn-area" v-show="state.controlShow">
                <!--暂停图标-->
                <img src="./timeOut.svg" v-show="state.playing" @click="play">
                <!--播放图标-->
                <img src="./playing.svg" v-show="!state.playing" @click="play">
            </div>
            <!--控制条-->
            <div class="vue-mv-control-content" transition="fade" v-show="state.controlShow" id="videoControls">
                <!--视频播放时间-->
                <div class="vue-mv-contrl-video-time">
                    <span class="vue-mv-contrl-video-time-text">{{video.displayTime}}</span>
                    <span>/</span>
                    <span class="vue-mv-contrl-video-time-text">{{video.durationTime}}</span>
                </div>
                <!--全屏播放按钮-->
                <button class="vue-mv-control-fullScreen-btn" @click="toggleFullScreen">
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
            poster: ''
          };
        }
      }
    },
    data () {
      return {
        $video: null,
        $videoControls: null,
        video: {
          displayTime: '00:00',
          durationTime: '00:00',
          pos: {
            current: 0,
            buffered: 0
          }
        },
        state: {
          controlShow: true,
          fullScreen: false,
          playing: false
        }
      };
    },
    mounted () {
      this.init();
      this.video.pos.width = window.screen.width;
      if (this.options.autoplay) {
        this.play();
      }
    },
    methods: {
      // 组件初始化
      init () {
        this.$video = this.$el.getElementsByTagName('video')[0];
        this.$videoControls = this.$el.querySelector('#videoControls');
        // 禁用默认控制条， 便于使用自定义的
        this.$video.removeAttribute('controls');
      },

      // 触摸移入事件
      touchStart () {
        this.state.controlShow = !this.state.controlShow;
      },
      // 触摸移入事件
      touchend () {
        // 这里存在一个短时间内反复触发touchend，delayHide异步回调积累的问题，使用debounce未解决，初步判断是双层异步回调导致的
        // 但是当起作用的时候，debounce函数只被触发了一次，原因不明
        // 判断是否处于播放状态中，如果处于，5秒后控制条及标题栏消失，消失效果为，标题向上滑出，控制条向下滑出
        let delayHide = null;
        if (this.state.playing || this.state.controlShow) {
          let self = this;
          delayHide = setTimeout(() => {
            self.state.controlShow = false;
            clearTimeout(delayHide);
          }, 5000);
        }
      },

      // 播放暂停按钮
      play () {
        this.state.playing = !this.state.playing;
        if (this.$video) {
          if (this.state.playing) {
            // 开始播放
            this.$video.play();
            // 监听视频播放时间，同步更新相关数据
            this.$video.addEventListener('timeupdate', this.timeLine);
            // 监听视频是否结束播放，如果结束，重置视频播放相关状态
            this.$video.addEventListener('ended', () => {
              this.state.playing = false;
              this.state.controlShow = true;
              this.video.pos.current = 0;
              this.$video.currentTime = 0;
            });
          } else {
            this.$video.pause();
            this.state.playing = false;
          }
        }
      },
      // 监听视频播放情况，同步修正缓冲进度，播放进度
      timeLine () {
        // 修正视频当前播放进度
        this.video.pos.current = (this.$video.currentTime / this.$video.duration).toFixed(6) * 100;
        // 修正视频缓冲进度
        this.video.pos.buffered = (this.$video.buffered.end(0) / this.$video.duration).toFixed(6) * 100;
        // 获取视频播放总时长，转化为00:00格式
        this.video.durationTime = timeParse(this.$video.duration);
        // 获取视频当前播放时间点，转化为00:00格式
        this.video.displayTime = timeParse(this.$video.currentTime);
      },
      // 视频全屏，小屏切换，兼容Gecko和WebKit
      // 全屏模式下，各个控制条，播放按钮，最小化按钮定位功能未做，暂时只支持小屏幕播放
      toggleFullScreen () {
        if (!document.fullscreenElement) {
          if (this.$video.requestFullscreen) {
            this.$video.requestFullscreen();
            this.state.playing = true;
          } else if (this.$video.mozRequestFullScreen) {
            this.$video.mozRequestFullScreen();
            this.state.playing = true;
          } else if (this.$video.webkitRequestFullscreen) {
            this.$video.webkitRequestFullscreen();
            this.state.playing = true;
          }
        } else if (document.exitFullscreen) {
          document.exitFullscreen();
          this.state.playing = false;
        }
      },
      // 防抖函数
      debounce(fn, interval, immediate) {
        // fn为要执行的函数
        // interval为等待的时间
        // immediate判断是否立即执行
        let timeout;  // 定时器
        return () => { // 返回一个闭包
          let context = this;
          let args = arguments; // 先把变量缓存
          let later = function() {  // 把稍后要执行的代码封装起来
            timeout = null; // 成功调用后清除定时器
            if (!immediate) fn.apply(context, args); // 不立即执行时才可以调用
          };
          let callNow = immediate && !timeout;  // 判断是否立即调用，并且如果定时器存在，则不立即调用
          clearTimeout(timeout);  // 不管什么情况，先清除定时器，这是最稳妥的
          timeout = setTimeout(later, interval);  // 延迟执行
          if (callNow) fn.apply(context, args);  // 如果是第一次触发，并且immediate为true，则立即执行
        };
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
    @import 'video.styl';
</style>
