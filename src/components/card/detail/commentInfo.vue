<template>
  <div class="comment-info" @click="goback">
    <img v-lazy="img + '?param=200y200'" lazy="loading">
    <div class="detail">
      <p class="title">{{title}}</p>
      <p class="author">{{author}}</p>
    </div>
    <div class="back-buttom"></div>
  </div>
</template>
<script>
  export default {
    name: 'video-player',
    props: {
      img: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: '标题'
      },
      author: {
        type: String,
        default: '歌手'
      }
    },
    methods: {
      goback () {
        this.$router.go(-1);
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import 'commentInfo.styl';
</style>
