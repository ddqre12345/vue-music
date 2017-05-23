<template>
    <div class="video-player">
        <!--视频数据来源-->
        <video id="video" ref="video" :poster="options.poster" webkit-playsinline playsinline>
            <source v-for="source in sources" :src="source.src" :type="source.type" />
        </video>
        <div class="controls" v-show="isControlShow">
            <!--播放/暂停按钮-->
            <div class="player-control-btn">
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
            <div class="control-content" transition="fade" id="videoControls" v-show="isPlayShow">
                <!--视频播放时间-->
                <div class="time-display">
                    <span class="current-time">{{currentTime}}</span>
                    <span>/</span>
                    <span class="total-time">{{durationTime}}</span>
                </div>
                <!--全屏播放按钮-->
                <div class="fullScreen-btn" @click="setFullScreen">
                    <img src="./fullScreen.svg" alt="fullScreen">
                </div>
            </div>
            <div class="video-progress" ref="progress">
                <div class="video-buffered-progress" :style="{'width': `${posBuffered}%`}">
                    <div class="video-current-progress" :style="{'width': `${posCurrent}%`}"></div>
                    <div ref="drager" :style="{'left': `${posCurrent}%`}" class="drager"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  import vMvLoading from '../../components/loading/mv-loading';
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
    components: {
      vMvLoading
    },
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
        dragerX: 0,
        $video: null,
        $drager: null,
        $progress: null,
        controlShowTimer: null,
        $videoControls: null
      };
    },
    mounted () {
      this.initVideo();
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
          this.controlShow = false;
          this.loading = false;
        });
        // 当目前的播放位置已更改时
        this.$video.addEventListener('timeupdate', () => {
          // 获取当前播放时间
          this.currentTime = this.timeParse(this.$video.currentTime);
          // 修正视频当前播放进度
          this.posCurrent = (this.$video.currentTime / this.$video.duration).toFixed(6) * 100;
          // 修正视频缓冲进度
          this.posBuffered = (this.$video.buffered.end(0) / this.$video.duration).toFixed(6) * 100;
        });
        // 当视频由于需要缓冲下一帧而停止
        this.$video.addEventListener('waiting', () => {
          this.controlShow = true;
          this.loading = true;
        });
        // 当视频已暂停时
        this.$video.addEventListener('pause', () => {
          this.controlShow = true;
          this.isPlay = false;
        });
        // 当视频已开始或不再暂停时
        this.$video.addEventListener('play', () => {
          this.controlShow = false;
          this.isPlay = true;
        });
        // 当目前的播放列表已结束时
        this.$video.addEventListener('ended', () => {
          this.controlShow = true;
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
            this.controlShow = false;
          }
        } else {
          clearTimeout(this.controlShowTimer);
          this.controlShow = true;
          this.$refs.video.pause();
          this.isPlay = false;
        }
      },
      // 拖动更改视频进度
      pressMove() {
        this.$drager = this.$refs.drager;
        this.$progress = this.$refs.progress;
        this.$drager.addEventListener('touchstart', (event) => {
          clearTimeout(this.controlShowTimer);
          this.dragerX = event.targetTouches[0].clientX;
        });
        this.$drager.addEventListener('touchmove', (event) => {
          this.$video.pause();
          if (event.targetTouches[0].clientX < 0) {
            this.posCurrent = 0;
          } else if (event.targetTouches[0].clientX > this.$progress.offsetWidth) {
            this.posCurrent = '100';
          } else {
            let dragerTime = (event.targetTouches[0].clientX / this.$progress.offsetWidth).toFixed(4);
            this.posCurrent = dragerTime * 100;
            this.currentTime = this.timeParse(dragerTime * this.$video.duration);
          }
        });
        this.$drager.addEventListener('touchend', (event) => {
          let dragerTime = (event.changedTouches[0].clientX / this.$progress.offsetWidth).toFixed(4) * this.$video.duration;
          this.currentTime = this.timeParse(dragerTime);
          this.$video.currentTime = dragerTime.toFixed(0);
          this.$video.play();
        });
      },
      showControls() {
        clearTimeout(this.controlShowTimer);
        if (this.isPlay === true && !this.loading) {
          if (this.controlShow === false) {
            this.controlShow = true;
            this.controlShowTimer = setTimeout(() => {
              this.controlShow = false;
            }, 3000);
          } else {
            this.controlShow = false;
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
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
    @import 'video.styl';
</style>
