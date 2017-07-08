<template>
  <ul class="mv-list">
    <li class="mv-card" v-for="(data, index) in MVs" style="flex: 0 0 49.5%" @click="jumpMvDetail(data.id)" :key="index">
      <img v-lazy="data.cover + '?param=400y200'" lazy="loading" class="mv-image">
      <h2 style="-webkit-box-orient: vertical;">{{data.name}}</h2>
      <p style="-webkit-box-orient: vertical;">{{data.artistName}}</p>
    </li>
  </ul>
</template>
<script>
  export default {
    name: 'v-mv-list',
    props: {
      MVs: {
        type: Array,
        default: []
      }
    },
    methods: {
      jumpMvDetail(id) {
        this.$router.push({
          path: '/mv/' + id
        });
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import 'mvList.styl';
</style>
