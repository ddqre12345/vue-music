<template>
    <div class="loader" v-show="show"></div>
</template>
<script>
  export default {
    name: 'v-loading',
    props: {
      show: {
          type: Boolean,
          default: false
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import './overall-loading.styl';
</style>
