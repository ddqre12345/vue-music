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
            src: 'http://118.89.226.181:3000/api/mv/url?url=http://v4.music.126.net/20170516085835/80195ed1edb7a783a264a772f5815e52/web/cloudmusic/IDQlJDAgIjExMCExYjBiJA==/mv/28005/d2103e52394cdde16700ca32555b5892.mp4',
            type: 'video/mp4'
          }],
          options: {
            autoplay: true,
            poster: 'http://covteam.u.qiniudn.com/poster.png'
          }
        }
      };
    },
    components: {
      myVideo
    }
  };
</script>
