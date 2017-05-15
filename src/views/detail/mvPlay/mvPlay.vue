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
            src: 'http://covteam.u.qiniudn.com/oceans.mp4',
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
