<template>
    <my-video :sources="video.sources" :options="video.options"></my-video>
</template>
<script>
  import api from '../../../api';
  import myVideo from '../../../components/video/video.vue';
  export default {
    data () {
      return {
        video: {
          sources: [{
//            src: 'http://118.89.226.181:3000/api/mv/url?url=http://v4.music.126.net/20170516220216/5e6efa9abbbc783b53123c30e6bc3561/web/cloudmusic/NzBkISQwNCImIjAiNiExJA==/mv/5530010/c304591905ba9b4421bea0c760471d6b.mp4',
//            src: 'http://7xkwa7.media1.z0.glb.clouddn.com/sample_video_L',
            src: null,
            type: 'video/mp4'
          }],
          options: {
            autoplay: true,
            poster: null
          }
        }
      };
    },
    beforeRouteEnter: (to, from, next) => {
      next(vm => {
        api.getMvResource(vm.$route.params.id).then((response) => {
          console.log(response);
          vm.video.options.poster = response.data.data.cover;
          console.log(('/api/mv/url?url=' + response.data.data.brs[240]));
          vm.video.sources[0].src = ('/api/mv/url?url=' + response.data.data.brs[240]);
        }).catch((error) => {
          console.log('加载歌单信息出错:' + error);
        });
      });
    },
    methods: {
      jumpMvDetail(id) {
        this.$router.push({
          path: '/video/' + id
        });
      }
    },
    components: {
      myVideo
    }
  };
</script>
