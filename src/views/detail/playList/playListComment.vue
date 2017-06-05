<template>
  <div class="playLists-comments">
    <div class="fixed-title" style="transition: opacity .1s;" v-show="isControlShow&&!loading&&isPlayShow">
      <x-header :left-options="{backText: ''}" style="background-color:transparent">评论({{total}})</x-header>
    </div>
    <comment-info :img="img" title="title" author="author"></comment-info>
    <div class="hot-comments" v-if="hotComments.length">
      <h1 class="title">精彩评论</h1>
      <comment-list :list="hotComments"></comment-list>
    </div>
    <div class="comments" v-if="comments.length">
      <h1 class="title">最新评论<span>{{total}}</span></h1>
      <comment-list :list="comments"></comment-list>
    </div>
  </div>
</template>
<script>
  import api from '../../api';
  import commentList from '/src/components/list/detail/comment/commentList';
  export default {
    name: 'play-lists-comment',
    data () {
      return {
        img: '',
        title: '',
        author: '',
        hotComments: [],
        comments: [],
        total: ''
      };
    },
    mounted () {
      this.getPlayListsCommentResource();
    },
    methods: {
      getPlayListsCommentResource() {
        api.getPlayListsCommentResource(this.$route.params.id).then((response) => {
          this.hotComments = response.data.hotComments;
          this.comments = response.data.comments;
          this.total = response.data.total;
        }).catch((error) => {
          console.log(error);
        });
      }
    },
    components: {
      commentList
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "playListComment.styl";
</style>
