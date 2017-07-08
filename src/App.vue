<template>
  <div>
    <!-- 主界面部分 -->
    <loading :show="loadingShow"></loading>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <player v-show="songList.length > 0 && !showDetail"></player>
  </div>
</template>
<script>
  import player from './components/playerBar/playerBar';
  import loading from './components/loading/overall-loading';
  import { mapGetters } from 'vuex';
  export default {
    name: 'app',
    mounted () {
      console.log('%c 浅滩戏虾', 'background-image:-webkit-gradient( linear, left top,right top, color-stop(0, #00a419),color-stop(0.15, #f44336), color-stop(0.29, #ff4300),color-stop(0.3, #AA00FF),color-stop(0.4, #8BC34A), color-stop(0.45, #607D8B),color-stop(0.6, #4096EE), color-stop(0.75, #D50000),color-stop(0.9, #4096EE), color-stop(1, #FF1A00));color:transparent;-webkit-background-clip:text;font-size:13px;');
    },
    computed: {
      ...mapGetters([
        'songList',
        'showDetail',
        'loadingShow'
      ])
    },
    components: {
      player,
      loading
    }
  };
</script>
