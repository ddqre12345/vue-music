<template>
  <ul class="singer-list">
    <li class="singer-card"  v-for="(data, index) in singer" @click="jumpSingerDetail(data.id)" :key="index">
      <img v-lazy="data.picUrl + '?param=200y200'" lazy="loading" class="avatar">
      <p class="singer-name">
        <span class="name" style="-webkit-box-orient: vertical;">{{data.name}}</span>
        <span class="trans" v-show="data.trans">({{data.trans}})</span>
      </p>
    </li>
  </ul>
</template>
<script>
  export default {
    name: 'v-singer-list',
    props: {
      singer: {
        type: Array,
        default: []
      }
    },
    methods: {
      jumpSingerDetail(id) {
        this.$router.push({
          path: '/singer/' + id
        });
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import 'singerList.styl';
</style>
