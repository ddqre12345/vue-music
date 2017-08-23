<template>
  <div class="g-header">
    <a @click="showAsideMenu(true)" class="item menu">
      <i class="icon menu-icon"></i>
    </a>
    <router-link to="/find" class="item music">
      <i class="icon music-icon"></i>
    </router-link>
    <router-link to="/search" class="item personal">
      <i class="icon personal-icon"></i>
    </router-link>
    <router-link to="/search" class="item search">
      <i class="icon search-icon"></i>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'header',
  methods: {
    showAsideMenu (flag) {
      this.$store.commit('showAsideMenu', flag);
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/styles/variable';
  @import "~common/px2rem/px2rem";
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
        flex  1 0 25%
        .icon
          display inline-block
          width px2rem(60)
          height px2rem(60)
          cursor pointer
          background-repeat no-repeat
          background-size cover
        .menu-icon
          background-image url(./func.svg)
        .search-icon
          background-image url(./search.svg)
        .music-icon
          background-image url(./music.svg)
        .personal-icon
          background-image url(./personal.svg)
      .item.active
        .music-icon
          background-image url(./music-active.svg)
        .personal-icon
          background-image url(./personal-active.svg)
</style>
