<template>
  <ul class="ranking-songsList">
     <li style="-webkit-box-orient: vertical;" v-for="(item, index) in data" :key="index">{{index + 1}}.{{item.name}}-{{item.artists[0].name}}</li>
  </ul>
</template>
<script>
  export default {
    name: 'v-songs-list',
    props: {
      data: {
        type: Array,
        default: []
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import 'songsList.styl';
</style>
