<template>
  <div class="mv-info">
    <video-player :source="video.source" :poster="video.poster"></video-player>
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
  </div>
</template>
<script>
  import api from '../../../api';
  import videoPlayer from '../../../components/video/video.vue';
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
        }
      };
    },
    mounted () {
      this.getMvResource();
    },
    methods: {
      getMvResource() {
        api.getMvResource(this.$route.params.id).then((response) => {
          let data = response.data.data;
          this.mvDetail = data;
          this.video.poster = data.cover;
          this.$root.$emit('change-poster', this.video.poster);
          this.video.source = '/api/mv/url?url=' + data.brs[240];
          this.$root.$emit('change-source', this.video.source);
        }).catch((error) => {
          console.log('加载歌单信息出错:' + error);
        });
      }
    },
    computed: {
      artists () {
        let names = this.mvDetail.artists;
        let artists = [];
        for (let index in names) {
          artists.push(names[index].name);
        }
        return artists.join('/');
      }
    },
    components: {
      videoPlayer
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "mvPlay.styl";
</style>
