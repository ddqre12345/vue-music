<template>
  <div class="playlist-detail-card">

  </div>
</template>
<script>
  export default {
    name: 'v-card',
    props: {
      data: {
        type: Object
      },
      index: {
        type: Number
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "playListCard.styl";
</style>
