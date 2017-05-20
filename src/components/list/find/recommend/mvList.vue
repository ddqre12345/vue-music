<template>
  <ul class="MV-area">
    <li class="mv-card-find" v-for="data in MVs">
      <img v-lazy="data.picUrl + '?param=400y200'" lazy="loading" />
      <h1 style="-webkit-box-orient: vertical;">{{data.name}}</h1>
    </li>
  </ul>
</template>
<script>
  export default {
    name: 'v-mv-list',
    props: {
      MVs: {
        type: Array
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import 'mvList.styl';
</style>
