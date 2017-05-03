<template>
  <div>
    <!-- 主界面部分 -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <Player v-show="songList.length > 0 && !showDetail"></Player>
  </div>
</template>
<script>
  import Player from './components/playerBar/playerBar';
  import { mapGetters } from 'vuex';
  export default {
    name: 'app',
    components: {
      Player
    },
    computed: {
      ...mapGetters([
        'songList',
        'showDetail'
      ])
    }
  };
</script>
