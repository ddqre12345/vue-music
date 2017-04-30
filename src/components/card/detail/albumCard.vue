<template>
  <div class="album-card" @click="jumpAlbumDetail(data.id)">
    <img v-lazy="albumImage" lazy="loading" class="album-image"/>
    <div class="album-info">
      <p class="album-name">{{data.name}}<span class="trans">{{albumTrans}}</span></p>
      <p class="publishTime">{{data.publishTime | formatDate}} <span class="songs">歌曲{{data.size}}</span></p>
    </div>
  </div>
</template>
<script>
  import { formatDate } from '../../../common/js/date';
  export default {
    name: 'v-album-card',
    props: {
      data: {
        type: Object
      }
    },
    method: {
      jumpAlbumDetail(id) {
        this.$router.push({
          path: '/album/' + id
        });
      }
    },
    computed: {
      albumImage() {
        return '' || this.data.picUrl;
      },
      albumTrans() {
        if (this.data.alias && this.data.alias[0]) {
          return '(' + this.data.alias[0] + ')';
        } else {
          return '';
        }
      }
    },

    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy.MM.dd');
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import 'albumCard.styl';
</style>
