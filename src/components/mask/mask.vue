<template>
  <div class="mask">
    <div class="cover" :style="{'background-image':'url(' + data + '?param=100y200' + ')'}"></div>
    <div class="cover-mask" style="opacity:0.6;"></div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: String,
      default: ''
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import 'mask.styl';
</style>
