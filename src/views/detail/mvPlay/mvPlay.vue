<template>
  <div class="mv-detail">
    <video-player :source="video.source" :poster="video.poster"></video-player>

  </div>
</template>
<script>
  import api from '../../../api';
  import videoPlayer from '../../../components/video/video.vue';
  export default {
    name: 'mv',
    data () {
      return {
        video: {
          mvDetail: [],
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
          this.mvDetail.name = data.name;
          this.$root.$emit('change-poster', this.video.poster);
          if (data.brs[480] !== undefined) {
            this.video.source = data.brs[480];
          } else {
            this.video.source = data.brs[240];
          }
          this.$root.$emit('change-source', this.video.source);
        }).catch((error) => {
          console.log('加载歌单信息出错:' + error);
        });
      }
    },
    components: {
      videoPlayer
    }
  };
</script>
