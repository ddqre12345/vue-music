<template>
  <div class="comment-info" @click="goback">
    <img v-lazy="img + '?param=200y200'" lazy="loading"/>
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
        type: String
      },
      title: {
        type: String
      },
      author: {
        type: String
      }
    },
    data () {
      return {
      };
    },
    methods: {
      goback () {
        this.$router.go(-1);
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
    @import 'commentInfo.styl';
</style>
