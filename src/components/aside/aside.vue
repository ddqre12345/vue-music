<template>
  <transition name="fadeIn">
    <div  class="aside-menu">
      <i @click="showAsideMenu" class="back"></i>
      <div class="aside">
        <div class="info">
          <img src="https://avatars2.githubusercontent.com/u/16521402?v=3&u=225ef33c491d879294c4cb06621ec15f5b01f02a&s=400">
          <p class="author">浅滩戏虾</p>
        </div>
      </div>
      <div @click.stop.prevent="showAsideMenu" class="mask"></div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'aside',
  data () {
    return {
      isSignIn: false
    };
  },
  methods: {
    showAsideMenu () {
      this.$store.commit('showAsideMenu', false);
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "aside.styl";
</style>

