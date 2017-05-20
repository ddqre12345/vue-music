<template>
  <ul class="playLists-area">
    <li class="playlist-card-find" v-for="data in playlists" @click="jumpPlayListsDetail(data.id)">
      <img v-lazy="data.picUrl+ '?param=200y200'" lazy="loading" />
      <h1 style="-webkit-box-orient: vertical;">{{data.name}}</h1>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'v-play-lists',
    props: {
      playlists: {
          type: Array
      }
    },
    methods: {
      jumpPlayListsDetail(id) {
        this.$router.push({
          path: '/playLists/' + id
        });
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import 'playLists.styl';
</style>
