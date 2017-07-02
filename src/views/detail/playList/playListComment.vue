<template>
  <div class="playList-comment">
    <div class="fixed-title" style="background: rgb(183, 39, 18);position: fixed;width: 100%;top: 0;height: 46px;">
      <x-header :left-options="{backText: ''}" style="background-color:transparent">评论({{total}})</x-header>
    </div>
    <div class="comment-detail">
      <comment-info :img="imgUrl" :title="title" :author="author"></comment-info>
      <div class="hot-comments" v-if="hotComments.length">
        <h1 class="title">精彩评论</h1>
        <comment-list :list="hotComments"></comment-list>
      </div>
      <div class="comments" v-if="comments.length">
        <h1 class="title">最新评论</h1>
        <comment-list :list="comments"></comment-list>
      </div>
    </div>
  </div>
</template>
<script>
  import api from '../../../api';
  import { XHeader } from 'vux';
  import commentList from '../../../components/list/detail/comment/commentList';
  import commentInfo from '../../../components/card/detail/commentInfo';
  export default {
    name: 'play-lists-comment',
    data () {
      return {
        imgUrl: '',
        title: '',
        author: '',
        hotComments: [],
        comments: [],
        total: ''
      };
    },
    mounted () {
      this.getPlayListDetail();
      this.getPlaylistCommentResource();
    },
    methods: {
      getPlayListDetail () {
        this.$store.commit('update_loading', true);
        api.getPlaylistDetailResource(this.$route.params.id).then((response) => {
          this.imgUrl = response.data.playlist.picUrl;
          this.title = response.data.playlist.name;
          this.author = response.data.playlist.creator.nickname;
          // $nextTick() 在dom 重新渲染完后执行
          this.$nextTick(() => {
            this.$store.commit('update_loading', false);
          });
        }).catch((error) => {
          console.log('加载歌单信息出错:' + error);
        });
      },
      getPlaylistCommentResource() {
        api.getPlaylistCommentResource(this.$route.params.id).then((response) => {
          this.hotComments = response.data.hotComments;
          this.comments = response.data.comments;
          this.total = response.data.total;
        }).catch((error) => {
          console.log(error);
        });
      }
    },
    components: {
      XHeader,
      commentList,
      commentInfo
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "playListComment.styl";
</style>
