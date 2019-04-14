<template>
  <ul class="ranking-songsList">
     <li style="-webkit-box-orient: vertical;" v-for="(item, index) in data" :key="index">{{index + 1}}.{{item.name}}-{{item.ar[0].name}}</li>
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
<style lang="less" rel="stylesheet/less">
  @import 'songsList.less';
</style>
