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
            src: 'http://pcad.video.baidu.com/cooper_video_3acde1ac02f00eb9f6155d988af620fc.mp4?authorization=bce-auth-v1%2Fc308a72e7b874edd9115e4614e1d62f6%2F2017-05-15T09%3A59%3A47Z%2F-1%2F%2F2a7122c28632f75b2899c7150490d27f6abb704f7e50b48e1c528ca382821b5d&responseCacheControl=max-age%3D8640000&responseExpires=Wed%2C%2023%20Aug%202017%2017%3A59%3A47%20GMT&_=1494913026176',
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
