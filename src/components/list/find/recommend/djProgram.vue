<template>
  <ul class="djProgram-area">
    <li class="djProgram-card-find" v-for="(data, index) in djProgram" :key="index">
      <img v-lazy="data.picUrl+ '?param=200y200'" lazy="loading">
      <h2 style="-webkit-box-orient: vertical;">{{data.name}}</h2>
    </li>
  </ul>
</template>
<script>
  export default {
    name: 'v-dj-program-lists',
    props: {
      djProgram: {
        type: Array,
        default: []
      }
    },
    methods: {
      jumpPlayListsDetail(id) {
        this.$router.push({
          path: '/playLists/' + id
        });
      }
    }
  };
</script>

