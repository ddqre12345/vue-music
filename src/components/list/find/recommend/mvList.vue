<template>
  <ul class="MV-area">
    <li class="mv-card-find" v-for="(data, index) in MVs" style="flex: 0 0 49.5%" @click="jumpMvDetail(data.id)" :key="index">
      <img v-lazy="data.picUrl + '?param=400y200'" lazy="loading">
      <h2 style="-webkit-box-orient: vertical;">{{data.name}}</h2>
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

