<template>
  <ul class="album-list-detail">
    <li v-for="data in list" class="album-card-detail" @click="jumpMvDetail(data.id)">
      <img v-lazy="data.imgurl + '?param=200y200'" lazy="loading" class="album-image"/>
      <div class="album-info">
        <p class="album-name" style="-webkit-box-orient: vertical;">{{data.name}}</p>
        <p class="publishTime">{{data.publishTime}}</p>
      </div>
    </li>
  </ul>
</template>
<script>
  import vAlbumCard from '../../../card/detail/albumCard';
  export default {
    name: 'v-album-list',
    props: {
      list: {
        type: [Object, Array]
      }
    },
    methods: {
      jumpMvDetail(id) {
        this.$router.push({
          path: '/mv/' + id
        });
      }
    },
    components: {
      vAlbumCard
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import 'mvList.styl';
</style>
