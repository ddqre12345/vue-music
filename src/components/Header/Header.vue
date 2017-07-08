<template>
  <div class="header">
    <div class="name">
      <span @click="showAsideMenu(true)" class="func"><i class="func-icon"></i></span>
      <router-link to="/find" class="item">
        <span class="music"><i class="music-icon"></i></span>
      </router-link>
      <router-link to="/search" class="item">
        <span class="personal"><i class="personal-icon"></i></span>
      </router-link>
      <span class="search"><i @click="toSearch" class="search-icon"></i></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'header',
  methods: {
    toSearch () {
      this.$router.push('/search');
    },
    showAsideMenu (flag) {
      this.$store.commit('showAsideMenu', flag);
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "header.styl";
</style>
