<template>
  <div class="playlist-card" @click="jumpPlayListsDetail(data.id)">
    <img v-lazy="coverImage" lazy="loading" class="coverImage">
    <div class="playList-info">
      <p class="playList-name" style="-webkit-box-orient: vertical;">{{data.name}}</p>
      <p class="playList-info-other">
        <span class="playList-count">{{data.trackCount}}首,</span>
        <span class="playList-playCount">播放{{data.playCount | countHandle}}次</span>
      </p>
    </div>
  </div>
</template>
<script>
  import { countHandle } from '../../../common/js/data';
  export default {
    name: 'v-play-list-card',
    props: {
      data: {
        type: Object,
        default: {}
      }
    },
    methods: {
      jumpPlayListsDetail(id) {
        this.$router.push({
          path: '/playLists/' + id
        });
      }
    },
    computed: {
      coverImage() {
        return '' || this.data.coverImgUrl;
      }
    },
    filters: {
      countHandle(count) {
        return countHandle(count);
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import 'playlists.styl';
</style>
