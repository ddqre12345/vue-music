<template>
  <ul class="album-list-detail">
    <v-album-card v-for="(data, index) in list" :data="data" :key="index"></v-album-card>
  </ul>
</template>
<script>
  import vAlbumCard from '../../../card/detail/albumCard';
  export default {
    name: 'v-album-list',
    props: {
      list: {
        type: Array,
        default: []
      }
    },
    components: {
      vAlbumCard
    }
  };
</script>
