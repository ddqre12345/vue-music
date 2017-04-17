<template>
  <div>
    <!-- 主界面部分 -->
    <transition name="show">
      <div class="index">
        <!-- 侧边栏 -->
        <AsideMenu v-show="isShowAsideMenu"></AsideMenu>
        <!-- 头部 -->
        <VHeader></VHeader>
      </div>
    </transition>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <Player v-show="songList.length > 0 && !showDetail"></Player>
  </div>
</template>
<script>
  import VHeader from './components/header/header.vue'
  import AsideMenu from './components/asideMenu/asideMenu.vue'
  import Player from './components/playerBar'
  import { mapGetters } from 'vuex'

  export default {
    components: {
      VHeader,
      AsideMenu,
      Player
    },
    computed: {
      ...mapGetters([
        'songList',
        'showDetail'
      ])
    }
  }
</script>
