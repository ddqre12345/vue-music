<template>
    <li class="album-card" @click="jumpAlbumDetail(data.id)">
        <img v-lazy="albumImage + '?param=200y200'" lazy="loading" class="album-image">
        <div class="album-info">
            <p class="album-name" style="-webkit-box-orient: vertical;">{{data.name}}<span class="trans">{{albumTrans}}</span></p>
            <p class="album-author">{{data.artist.name}}</p>
        </div>
    </li>
</template>
<script>
  export default {
    name: 'v-album-card',
    props: {
      data: {
        type: Object
      }
    },
    methods: {
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
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import 'albumCard.styl';
</style>
