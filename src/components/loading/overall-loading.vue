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

<style lang="less" rel="stylesheet/less" scoped>
@import './overall-loading.less';
</style>
