<template>
    <div class="album-detail">
      <div class="album-wrapper">
      </div>
      <div class="mask">
        <div class="album-cover" :style="{'background-image':'url(' + audio.albumPic + '?param=500y500' + ')'}"></div>
        <div class="cover-mask" style="opacity:0.6;"></div>
      </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
    };
  },
  components: {
  },
  mounted () {
  },
  methods: {
  },
  computed: {
  },
  filters: {
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
    @import 'albumDetail.styl';
</style>
