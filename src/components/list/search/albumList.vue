<template>
  <ul class="album-list">
    <v-album-card :data="data" v-for="(data, index) in albums" :key="index"></v-album-card>
  </ul>
</template>
<script>
import vAlbumCard from '@/components/card/searchCard/albumCard';
  export default {
    name: 'v-album-list',
    components: {
      vAlbumCard
    },
    props: {
      albums: {
        type: Array,
        default: []
      }
    }
  };
</script>
<style lang="less" rel="stylesheet/less" scoped>
  @import 'albumList.less';
</style>
