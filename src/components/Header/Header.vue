<template>
  <div class="g-header">
    <a @click="showAsideMenu(true)" class="item menu">
      <i class="menu-icon"></i>
    </a>
    <router-link to="/find" class="item music">
      <i class="music-icon"></i>
    </router-link>
    <router-link to="/search" class="item personal">
      <i class="personal-icon"></i>
    </router-link>
    <router-link to="/search" class="item search">
      <i class="search-icon"></i>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'header',
  methods: {
    showAsideMenu (flag) {
      console.log(flag);
      this.$store.commit('showAsideMenu', flag);
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/styles/variable';
  @import "../px2rem/px2rem";
  .g-header
      background-color $color-redLight
      width 100%
      height px2rem(92)
      display flex
      flex-direction row
      align-items center
      justify-content space-between
      text-align center
      .item
        display inline-block
        flex  1
        text-align center
        i
          display inline-block
          width px2rem(60)
          height px2rem(60)
          cursor pointer
        .menu-icon
          background url(./func.svg) no-repeat
          background-size: contain
        .search-icon
          background url(./search.svg) no-repeat
          background-size: contain
        .music-icon
          background url(./music.svg) no-repeat
          background-size: contain
        .personal-icon
          background url(./personal.svg) no-repeat
          background-size: contain
      .item.active
        .music-icon
          background url(./music-active.svg) no-repeat
          background-size: contain
        .personal-icon
          background url(./personal-active.svg) no-repeat
          background-size: contain
</style>
