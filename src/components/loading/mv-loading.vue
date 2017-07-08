<template>
    <div class="loader">
        <div class="ball-spin-fade-loader" v-show="show">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
</template>
<script>
  export default {
    name: 'v-mv-loading',
    props: {
      show: {
        type: Boolean,
        default: false
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import './mv-loading.styl';
</style>
