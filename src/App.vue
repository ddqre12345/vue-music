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
  import loading from './components/loading/loading.vue';
  import { mapGetters } from 'vuex';
  export default {
    name: 'app',
    components: {
      player,
      loading
    },
    computed: {
      ...mapGetters([
        'songList',
        'showDetail',
        'loadingShow'
      ])
    }
  };
</script>
