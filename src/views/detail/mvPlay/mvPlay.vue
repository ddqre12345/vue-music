<template>
    <my-video :sources="video.sources" :options="video.options"></my-video>
</template>
<script>
  import api from '../../../api';
  import myVideo from '../../../components/video/video.vue';
  export default {
    name: 'mv',
    data () {
      return {
        video: {
          mvDetail: [],
          sources: {
//            src: 'http://118.89.226.181:3000/api/mv/url?url=http://v4.music.126.net/20170516220216/5e6efa9abbbc783b53123c30e6bc3561/web/cloudmusic/NzBkISQwNCImIjAiNiExJA==/mv/5530010/c304591905ba9b4421bea0c760471d6b.mp4',
//            src: 'http://7xkwa7.media1.z0.glb.clouddn.com/sample_video_L',
            src: '',
            type: 'video/mp4'
          },
          options: {
            autoplay: true,
            poster: ''
          }
        }
      };
    },
    beforeMount() {
        this.getMvResource();
    },
    methods: {
      init() {
        this.video.options.poster = this.$route.query.poster;
      },
      jumpMvDetail(id) {
        this.$router.push({
          path: '/video/' + id
        });
      },
      getMvResource() {
        api.getMvResource(this.$route.params.id).then((response) => {
          let data = response.data.data;
          this.mvDetail = data;
          this.video.options.poster = data.cover;
          this.mvDetail.name = data.name;
          this.$root.$emit('change-poster', this.video.options.poster);
          if (data.brs[480] !== undefined) {
            this.video.sources.src = data.brs[480];
          } else {
            this.video.sources.src = data.brs[240];
          }
          this.$root.$emit('change-source', this.video.sources.src);
        }).catch((error) => {
          console.log('加载歌单信息出错:' + error);
        });
      }
    },
    components: {
      myVideo
    }
  };
</script>
