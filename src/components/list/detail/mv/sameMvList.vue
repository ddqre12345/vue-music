<template>
  <ul>
    <li class="mv-card" v-for="data in list" @click="jumpMvDetail(data.id)">
      <img v-lazy="data.cover + '?param=200y130'" lazy="loading" class="mv-image"/>
      <div class="info">
        <p class="name" style="-webkit-box-orient: vertical;">{{data.name}}</p>
        <p class="artistName" style="-webkit-box-orient: vertical;">{{data.artistName}}</p>
      </div>
    </li>
  </ul>
</template>
<script>
  export default {
    name: 'same-mv-list',
    props: {
      list: {
        type: Array
      }
    },
    methods: {
      jumpMvDetail(id) {
        this.$router.replace({
          path: '/mv/' + id
        });
//        this.$root.$emit('mv-init', id);
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import 'sameMvList.styl';
</style>
