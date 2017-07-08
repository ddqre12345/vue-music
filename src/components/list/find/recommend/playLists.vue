<template>
  <ul class="playLists-area">
    <li class="playlist-card-find" v-for="(data, index) in playlists" @click="jumpPlayListsDetail(data.id)" :key="index">
      <img v-lazy="data.picUrl+ '?param=200y200'" lazy="loading">
      <h2 style="-webkit-box-orient: vertical;">{{data.name}}</h2>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'v-play-lists',
    props: {
      playlists: {
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

