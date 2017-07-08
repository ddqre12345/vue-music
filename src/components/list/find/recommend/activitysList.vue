<template>
  <ul class="activitys-area">
    <li class="activity-card-find" v-for="(data, index) in activitys" :key="index">
      <img v-lazy="data.picUrl + '?param=400y200'" lazy="loading">
      <h2 style="-webkit-box-orient: vertical;">{{data.name}}</h2>
    </li>
  </ul>
</template>
<script>
  export default {
    name: 'v-activity-list',
    props: {
      activitys: {
        type: Array,
        default: []
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import 'activitysList.styl';
</style>
