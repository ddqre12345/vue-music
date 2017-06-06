<template>
  <div class="comment-info">
    <img v-lazy="img + '?param=200y200'" lazy="loading"/>
    <div class="detail">
      <p class="title">{{title}}</p>
      <p class="author">{{author}}</p>
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
