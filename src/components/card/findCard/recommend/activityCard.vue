<template>
  <div class="activity-card-find">
    <img v-lazy="data.picUrl + '?param=400y200'" lazy="loading" />
    <h1 style="-webkit-box-orient: vertical;">{{data.name}}</h1>
  </div>
</template>

<script>
  export default {
    name: 'v-activity-card',
    props: {
      data: {
        type: Object
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import 'activityCard.styl';
</style>
