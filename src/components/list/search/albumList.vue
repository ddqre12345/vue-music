<template>
  <ul class="album-list">
    <v-album-card :data="data" v-for="data in albums"></v-album-card>
  </ul>
</template>
<script>
import vAlbumCard from '../../card/searchCard/albumCard';
  export default {
    name: 'v-album-list',
    components: {
      vAlbumCard
    },
    props: {
      albums: {
        type: Array
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import 'albumList.styl';
</style>
