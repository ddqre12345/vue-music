<template>
  <div class="comment-info">
    <img :src="img">
    <div class="detail">
      <p class="title"></p>
      <p class="author"></p>
    </div>
    <div class="back-icon"></div>
  </div>
</template>
<script>
  export default {
    name: 'video-player',
    props: {
      img: String,
      title: String,
      author: String
    },
    data () {
      return {
      };
    },
    methods: {
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
    @import 'commentInfo.styl';
</style>
