<template>
    <!-- 主界面部分 -->
    <transition name="fade">
        <div class="index">
            <!-- 侧边栏 -->
            <AsideMenu v-show="isShowAsideMenu"></AsideMenu>
            <!-- 头部 -->
            <vHeader></vHeader>
            <router-view></router-view>
        </div>
    </transition>
</template>
<script>
  import vHeader from '../components/header/header.vue';
  import AsideMenu from '../components/asideMenu/asideMenu.vue';

  export default {
    components: {
      vHeader,
      AsideMenu
    },
    computed: {
      isShowAsideMenu() {
        return this.$store.state.isShowAsideMenu;
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
    @import 'index.styl';
</style>
