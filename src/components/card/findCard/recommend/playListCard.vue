<template>
  <div class="playlist-card-find" @click="jumpPlayListsDetail(data.id)">
    <img v-lazy="data.picUrl+ '?param=200y200'" lazy="loading" />
    <h1 style="-webkit-box-orient: vertical;">{{data.name}}</h1>
  </div>
</template>

<script>
  export default {
    name: 'v-play-list-card',
    props: {
      data: {
          type: Object
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
  @import 'playListCard.styl';
</style>
