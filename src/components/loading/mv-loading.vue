<template>
    <div class="loader">
        <div class="ball-spin-fade-loader" v-show="show">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
</template>
<script>
  export default {
    name: 'v-mv-loading',
    props: {
      show: {
        type: Boolean,
        default: false
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @-webkit-keyframes ball-spin-fade-loader {
      50% {
        opacity: .3;
        -webkit-transform: scale(.4);
        transform: scale(.4)
      }

      100% {
        opacity: 1;
        -webkit-transform: scale(1);
        transform: scale(1)
      }
    }

    @keyframes ball-spin-fade-loader {
      50% {
        opacity: .3;
        -webkit-transform: scale(.4);
        transform: scale(.4)
      }

      100% {
        opacity: 1;
        -webkit-transform: scale(1);
        transform: scale(1)
      }
    }

    .loader {
      position absolute
      padding 20px
      box-sizing: border-box;
      display: flex;
      flex: 0 1 auto;
      flex-direction: column;
      flex-basis: 15%;
      max-width: 15%;
      height: 200px;
      align-items: center;
      justify-content: center;
    }

    .ball-spin-fade-loader {
      position: relative;
      top: -10px;
      left: -10px
    }

    .ball-spin-fade-loader>div:nth-child(1) {
      top: 25px;
      left: 0;
      -webkit-animation: ball-spin-fade-loader 1s -.96s infinite linear;
      animation: ball-spin-fade-loader 1s -.96s infinite linear
    }

    .ball-spin-fade-loader>div:nth-child(2) {
      top: 17.05px;
      left: 17.05px;
      -webkit-animation: ball-spin-fade-loader 1s -.84s infinite linear;
      animation: ball-spin-fade-loader 1s -.84s infinite linear
    }

    .ball-spin-fade-loader>div:nth-child(3) {
      top: 0;
      left: 25px;
      -webkit-animation: ball-spin-fade-loader 1s -.72s infinite linear;
      animation: ball-spin-fade-loader 1s -.72s infinite linear
    }

    .ball-spin-fade-loader>div:nth-child(4) {
      top: -17.05px;
      left: 17.05px;
      -webkit-animation: ball-spin-fade-loader 1s -.6s infinite linear;
      animation: ball-spin-fade-loader 1s -.6s infinite linear
    }

    .ball-spin-fade-loader>div:nth-child(5) {
      top: -25px;
      left: 0;
      -webkit-animation: ball-spin-fade-loader 1s -.48s infinite linear;
      animation: ball-spin-fade-loader 1s -.48s infinite linear
    }

    .ball-spin-fade-loader>div:nth-child(6) {
      top: -17.05px;
      left: -17.05px;
      -webkit-animation: ball-spin-fade-loader 1s -.36s infinite linear;
      animation: ball-spin-fade-loader 1s -.36s infinite linear
    }

    .ball-spin-fade-loader>div:nth-child(7) {
      top: 0;
      left: -25px;
      -webkit-animation: ball-spin-fade-loader 1s -.24s infinite linear;
      animation: ball-spin-fade-loader 1s -.24s infinite linear
    }

    .ball-spin-fade-loader>div:nth-child(8) {
      top: 17.05px;
      left: -17.05px;
      -webkit-animation: ball-spin-fade-loader 1s -.12s infinite linear;
      animation: ball-spin-fade-loader 1s -.12s infinite linear
    }

    .ball-spin-fade-loader>div,.ball-spin-loader>div {
      -webkit-animation-fill-mode: both;
      position: absolute;
      width: 15px;
      height: 15px;
      border-radius: 100%
    }

    .ball-spin-fade-loader>div {
      background-color: #fff;
      margin: 2px;
      animation-fill-mode: both
    }

    @-webkit-keyframes ball-spin-loader {
      75% {
        opacity: .2
      }

      100% {
        opacity: 1
      }
    }

    @keyframes ball-spin-loader {
      75% {
        opacity: .2
      }

      100% {
        opacity: 1
      }
    }
</style>
