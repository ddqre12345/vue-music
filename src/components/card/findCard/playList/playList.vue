<template>
  <div class="playlist-find">
    <img v-lazy="data.coverImgUrl + '?param=500y500'" lazy="loading" />
    <h1 style="-webkit-box-orient: vertical;">{{data.name}}</h1>
    <p>by {{data.creator.nickname}}</p>
  </div>
</template>

<script>
  import { playCount } from '../../../../common/js/data';
  export default {
    name: 'v-play-list',
    props: {
      data: {
        type: Object
      }
    },
    filters: {
      playCount(count) {
        return playCount(count);
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import 'playList.styl';
</style>
