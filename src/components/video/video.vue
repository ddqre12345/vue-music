<template>
    <div class="container">
        <div class="vue-mv-video-container" @mouseenter="mouseEnterVideo" @mouseleave="mouseLeaveVideo">
            <!--视频数据来源-->
            <video :class="{ 'hide-cursor': !state.contrlShow }" class="vue-mv-video" :poster="options.poster">
                <source v-for="source in sources" :src="source.src" :type="source.type">
                </source>
            </video>
            <!--<div class="vue-mv-contrl-play-btn-area">-->
                <!--<button class="vue-mv-contrl-play-btn" @click="play">-->
                    <!--&lt;!&ndash;暂停图标&ndash;&gt;-->
                    <!--<svg class="vue-mv-contrl-play-btn-icon" v-show="!state.playing" viewBox="0 0 47 57" version="1.1" xmlns="http://www.w3.org/2000/svg">-->
                        <!--&lt;!&ndash; Generator: Sketch 3.8.3 (29802) - http://www.bohemiancoding.com/sketch &ndash;&gt;-->
                        <!--<title>Triangle 1</title>-->
                        <!--<desc>Created with Sketch.</desc>-->
                        <!--<defs></defs>-->
                        <!--<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">-->
                            <!--<polygon id="Triangle-1" stroke="#FFFFFF" fill="#FFFFFF" points="1 56 1 1 47 28.5"></polygon>-->
                        <!--</g>-->
                    <!--</svg>-->
                    <!--&lt;!&ndash;播放图标&ndash;&gt;-->
                    <!--<svg class="vue-mv-contrl-play-btn-icon" v-show="state.playing" viewBox="0 0 15 22" version="1.1" xmlns="http://www.w3.org/2000/svg">-->
                        <!--&lt;!&ndash; Generator: Sketch 3.8.3 (29802) - http://www.bohemiancoding.com/sketch &ndash;&gt;-->
                        <!--<title>Combined Shape</title>-->
                        <!--<desc>Created with Sketch.</desc>-->
                        <!--<defs>-->
                            <!--<path d="M0,0.979149244 L5,0.979149244 L5,22 L0,22 L0,0.979149244 Z M10,0.979149244 L15,0.979149244 L15,22 L10,22 L10,0.979149244 Z" id="path-1"></path>-->
                            <!--<mask id="mask-2" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox" x="0" y="0" width="15" height="21.0208508" fill="white">-->
                                <!--<use xlink:href="#path-1"></use>-->
                            <!--</mask>-->
                        <!--</defs>-->
                        <!--<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">-->
                            <!--<use id="Combined-Shape" stroke="#FFFFFF" mask="url(#mask-2)" stroke-width="2" fill="#FFFFFF" xlink:href="#path-1"></use>-->
                        <!--</g>-->
                    <!--</svg>-->
                <!--</button>-->
            <!--</div>-->
            <!--控制条-->
            <div class="vue-mv-control-content" transition="fade" v-show="state.contrlShow">
                <!--视频播放时间-->
                <div class="vue-mv-contrl-video-time">
                    <span class="vue-mv-contrl-video-time-text">{{video.displayTime}}</span>
                    <span>/</span>
                    <span class="vue-mv-contrl-video-time-text">{{video.displayTime}}</span>
                </div>
                <!--全屏播放按钮-->
                <button class="vue-mv-control-fullScreen-btn" @click="fullScreen">
                    <img src="./fullScreen.svg" alt="fullScreen">
                </button>
            </div>
            <div class="vue-mv-contrl-video-slider" @click="slideClick" @mousedown="videoMove">
                <div class="vue-mv-contrl-video-inner" :style="{ 'transform': `translate3d(${video.pos.current}px, 0, 0)`}"></div>
                <div class="vue-mv-contrl-video-rail">
                    <div class="vue-mv-contrl-video-rail-inner" :style="{ 'transform': 'translate3d(' +video.loaded + '%, 0, 0)'}"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  const getMousePosition = function (e, type = 'x') {
    if (type === 'x') {
      return e.pageX;
    }
    return e.pageY;
  };
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
          $videoSlider: null,
          len: 0,
          current: 0,
          loaded: 0,
          moving: false,
          displayTime: '00:00',
          pos: {
            start: 0,
            width: 0,
            innerWidth: 0,
            current: 0
          }
        },
        player: {
          $player: null,
          pos: null
        },
        tmp: {
          contrlHideTimer: null
        },
        state: {
          contrlShow: true,
          vol: 0.5,
          currentTime: 0,
          fullScreen: false,
          playing: false
        }
      };
    },
    mounted () {
      this.$video = this.$el.getElementsByTagName('video')[0];
      this.init();
      if (this.options.autoplay) {
        this.play();
      }
      document.body.addEventListener('mousemove', this.mouseMoveAction, false);
      document.body.addEventListener('mouseup', this.mouseUpAction, false);
    },
    beforeDestroy () {
      document.body.removeEventListener('mousemove', this.mouseMoveAction);
      document.body.removeEventListener('mouseup', this.mouseUpAction);
    },
    methods: {
      init () {
        this.initVideo();
        this.initPlayer();
      },
      initPlayer () {
        const $player = this.$el.getElementsByClassName('vue-mv-video-container')[0];
        this.player.pos = $player.getBoundingClientRect();
        this.player.$player = $player;
      },
      initVideo () {
        const $videoSlider = this.$el.getElementsByClassName('vue-mv-contrl-video-slider')[0];
        const $videoInner = $videoSlider.getElementsByClassName('vue-mv-contrl-video-inner')[0];
        this.$videoSlider = $videoSlider;
        this.video.pos.start = $videoSlider.getBoundingClientRect().left;
        this.video.pos.innerWidth = $videoInner.getBoundingClientRect().width;
        this.video.pos.width = $videoSlider.getBoundingClientRect().width - this.video.pos.innerWidth;
        this.getTime();
      },
      mouseEnterVideo () {
        if (this.tmp.contrlHideTimer) {
          clearTimeout(this.tmp.contrlHideTimer);
          this.tmp.contrlHideTimer = null;
        }
        this.state.contrlShow = true;
      },
      mouseLeaveVideo (e) {
        if (this.tmp.contrlHideTimer) {
          clearTimeout(this.tmp.contrlHideTimer);
        }
        this.tmp.contrlHideTimer = setTimeout(() => {
          this.state.contrlShow = false;
          this.tmp.contrlHideTimer = null;
        }, 2000);
      },
      toggleContrlShow () {
        this.state.contrlShow = !this.state.contrlShow;
      },
      getTime () {
        this.$video.addEventListener('durationchange', (e) => {
          console.log(e);
        });
        this.$video.addEventListener('progress', (e) => {
          this.video.loaded = (-1 + (this.$video.buffered.end(0) / this.$video.duration)) * 100;
        });
        this.video.len = this.$video.duration;
      },
      setVideoByTime (percent) {
        this.$video.currentTime = Math.floor(percent * this.video.len);
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
      timeline () {
        const percent = this.$video.currentTime / this.$video.duration;
        this.video.pos.current = (this.video.pos.width * percent).toFixed(3);
        this.video.displayTime = timeParse(this.$video.duration - this.$video.currentTime);
      },
      videoMove (e) {
        this.initVideo();
        this.video.moving = true;
      },
      slideClick (e) {
        this.videoSlideMove(e);
      },
      fullScreen () {
        if (!this.state.fullScreen) {
          this.state.fullScreen = true;
          this.$video.webkitRequestFullScreen();
        } else {
          this.state.fullScreen = false;
          document.webkitCancelFullScreen();
        }
        setTimeout(this.initVideo, 200);
      },
      mouseMoveAction (e) {
        if (this.video.moving) {
          this.videoSlideMove(e);
        }
        this.contrlHider(e);
      },
      contrlHider (e) {
        const x = getMousePosition(e, 'x');
        const y = getMousePosition(e, 'y');
        if (!this.player.pos) return;
        if (x > this.player.pos.left &&
          x < this.player.pos.left + this.player.pos.width
        ) {
          if (
            y > this.player.pos.top + this.player.pos.height * 0.6 &&
            y < this.player.pos.top + this.player.pos.height
          ) {
            return this.mouseEnterVideo();
          }
        }
        return this.mouseLeaveVideo();
      },
      videoSlideMove (e) {
        const x = getMousePosition(e) - this.video.pos.start;
        if (x > 0 && x < this.video.pos.width) {
          this.video.pos.current = x;
          this.setVideoByTime(x / this.video.pos.width);
        }
      },
      mouseUpAction (e) {
        this.volume.moving = false;
        this.video.moving = false;
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
    @import 'video.styl';
</style>
