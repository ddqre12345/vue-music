<template>
    <!-- 主界面部分 -->
    <transition name="fade">
        <div class="index">
            <!-- 侧边栏 -->
            <asideMenu v-show="isShowAsideMenu"></asideMenu>
            <!-- 头部 -->
            <v-header></v-header>
            <router-view></router-view>
        </div>
    </transition>
</template>
<script>
  import vHeader from '../components/header/header';
  const asideMenu = () => ({
    component: import('components/aside/aside')
  });

  export default {
    computed: {
      isShowAsideMenu() {
        return this.$store.state.common.isShowAsideMenu;
      }
    },
    components: {
      vHeader,
      asideMenu
    }
  };
</script>
