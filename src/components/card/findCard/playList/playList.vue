<template>
  <div class="playlist-find">
    <img v-lazy="data.coverImgUrl" lazy="loading" />
    <h1>{{data.name}}</h1>
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
