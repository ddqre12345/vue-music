<template>
  <ul class="activitys-area">
    <li class="activity-card-find" v-for="data in activitys">
      <img v-lazy="data.picUrl + '?param=400y200'" lazy="loading" />
      <h1 style="-webkit-box-orient: vertical;">{{data.name}}</h1>
    </li>
  </ul>
</template>
<script>
  export default {
    name: 'v-activity-list',
    props: {
      activitys: {
        type: Array
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import 'activitysList.styl';
</style>
