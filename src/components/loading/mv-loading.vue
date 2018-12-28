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

<style lang="less" rel="stylesheet/less" scoped>
    @import './mv-loading.less';
</style>
