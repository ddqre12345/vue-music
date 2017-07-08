<template>
  <ul class="play-lists">
      <li v-for="(data, index) in playlist" class="playlist-card" @click="jumpPlayListsDetail(data.id)" :key="index">
          <img v-lazy="data.coverImgUrl + '?param=200y200'" lazy="loading" class="coverImage">
          <div class="playList-info">
              <p class="playList-name" style="-webkit-box-orient: vertical;">{{data.name}}</p>
              <p class="playList-info-other">
                  <span class="playList-count">{{data.trackCount}}首</span>
                  <span class="playList-creator">by {{data.creator.nickname}}</span>
                  <span class="playList-playCount">播放{{data.playCount | countHandle}}次</span>
              </p>
          </div>
      </li>
  </ul>
</template>
<script>
  import { countHandle } from '../../../common/js/data';
  export default {
    name: 'v-play-list-card',
    props: {
      playlist: {
        type: Array,
        default: []
      }
    },
    methods: {
      jumpPlayListsDetail(id) {
        this.$router.push({
          path: '/playLists/' + id
        });
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
    @import 'playLists.styl';
</style>
