<template>
  <div class="playlist-card" @click="jumpPlayListsDetail(data.id)">
    <img v-lazy="coverImage" lazy="loading" class="coverImage"/>
    <div class="playList-info">
      <p class="playList-name">{{data.name}}</p>
      <p class="playList-info-other">
        <span class="playList-count">{{data.trackCount}}首,</span>
        <span class="playList-playCount">播放{{data.playCount | playCount}}次</span>
      </p>
    </div>
  </div>
</template>

<script>
  import { playCount } from '../../../../common/js/data';
  export default {
    name: 'v-recommend-card',
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
    },
    computed: {
      coverImage() {
        return '' || this.data.coverImgUrl;
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
  @import 'recommendCard.styl';
</style>
