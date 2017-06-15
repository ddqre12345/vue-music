<template>
  <div class="mv-info">
    <video-player :source="video.source" :poster="video.poster" :name="mvDetail.name"></video-player>
    <div class="intro">
      <p class="name">{{mvDetail.name}}</p>
      <p class="special"><span class="artists">歌手：{{artists}}</span><span>|</span><span class="playCount">播放：{{mvDetail.playCount}}次</span></p>
      <p class="publishTime">发行时间：{{mvDetail.publishTime}}</p>
      <p class="desc">{{mvDetail.desc}}</p>
      <div class="status">
        <div class="subCount">
          <span class="file"><i class="icon-file"></i></span>
          <span>{{mvDetail.subCount}}</span>
        </div>
        <div class="commentCount">
          <span class="comment"><i class="icon-comment"></i></span>
          <span>{{mvDetail.commentCount}}</span>
        </div>
        <div class="shareCount">
          <span class="share"><i class="icon-share"></i></span>
          <span>{{mvDetail.shareCount}}</span>
        </div>
      </div>
    </div>
    <div class="recommend-mv">
      <h1 class="title">相关推荐</h1>
      <same-mv-list :list="mvs"></same-mv-list>
    </div>
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
  import api from '../../../api';
  import videoPlayer from '../../../components/video/video';
  import sameMvList from '../../../components/list/detail/mv/sameMvList';
  import commentList from '../../../components/list/detail/comment/commentList';
  export default {
    name: 'mv',
    data () {
      return {
        mvDetail: {},
        video: {
          video: {
            source: '',
            poster: ''
          }
        },
        mvs: [],
        hotComments: [],
        comments: [],
        total: ''
      };
    },
    mounted () {
      let self = this;
      this.getMvResource();
      this.getSimiMvResource();
      this.getMvCommentResource();
      this.$root.$on('mv-init', (val) => {
        self.init();
      });
    },
    methods: {
     init () {
       this.getMvResource();
       this.getSimiMvResource();
       this.getMvCommentResource();
     },
      getMvResource() {
        api.getMvResource(this.$route.params.id).then((response) => {
          let data = response.data.data;
          this.mvDetail = data;
          this.video.poster = data.cover;
          this.$root.$emit('change-poster', this.video.poster);
          this.video.source = '/api/mv/url?url=' + data.brs[240];
          this.$root.$emit('change-source', this.video.source);
        }).catch((error) => {
          console.log(error);
        });
      },
      getSimiMvResource() {
        api.getSimiMvResource(this.$route.params.id).then((response) => {
          this.mvs = response.data.mvs;
        }).catch((error) => {
          console.log(error);
        });
      },
      getMvCommentResource() {
        api.getMvCommentResource(this.$route.params.id).then((response) => {
          this.hotComments = response.data.hotComments;
          this.comments = response.data.comments;
          this.total = response.data.total;
        }).catch((error) => {
          console.log(error);
        });
      }
    },
    computed: {
      artists () {
        let artists = [];
        for (let index in this.mvDetail.artists) {
          artists.push(this.mvDetail.artists[index].name);
        }
        return artists.join('/');
      }
    },
    components: {
      videoPlayer,
      sameMvList,
      commentList
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "mvPlay.styl";
</style>
