<template>
    <my-video :sources="video.sources" :options="video.options"></my-video>
</template>
<script>
  import myVideo from '../../../components/video/video.vue';
  export default {
    data () {
      return {
        video: {
          sources: [{
//            src: 'http://118.89.226.181:3000/api/mv/url?url=http://v4.music.126.net/20170516220216/5e6efa9abbbc783b53123c30e6bc3561/web/cloudmusic/NzBkISQwNCImIjAiNiExJA==/mv/5530010/c304591905ba9b4421bea0c760471d6b.mp4',
            src: 'http://7xkwa7.media1.z0.glb.clouddn.com/sample_video_L',
            type: 'video/mp4'
          }],
          options: {
            autoplay: false
          }
        }
      };
    },
    components: {
      myVideo
    }
  };
</script>
