<template>
  <div class="single-card">
    <p class="song-name">{{data.name}}<span class="transNames">{{songNameTrans}}</span></p>
    <p class="source"><span class="singer">{{data.artists[0].name}}-</span><span class="album">{{data.album.name}}</span><span class="transNames">{{albumTrans}}</span></p>
  </div>
</template>
<script>
  export default {
    name: 'v-card',
    props: {
      data: {
        type: Object
      }
    },
    computed: {
      songNameTrans() {
        if (this.data.transNames) {
          return '(' + this.data.transNames[0] + ')';
        } else {
          return '';
        }
      },
      albumTrans() {
        if (this.data.album && this.data.album.transNames) {
          return '(' + this.data.album.transNames[0] + ')';
        } else {
          return '';
        }
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
    @import 'singleCard.styl';
</style>
