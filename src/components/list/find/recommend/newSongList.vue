<template>
  <ul class="newSongList-area">
    <li class="newSongList-card-find" v-for="(data, index) in newSong" @click="jumpAlbumDetail(data.song.album.id)" :key="index">
      <img v-lazy="data.song.album.picUrl+ '?param=200y200'" lazy="loading">
      <h2 style="-webkit-box-orient: vertical;-webkit-line-clamp: 1">{{data.name}}</h2>
      <p style="-webkit-box-orient: vertical;">{{data.song.artists[0].name}}</p>
    </li>
  </ul>
</template>
<script>
  export default {
    name: 'v-new-song-lists',
    props: {
      newSong: {
        type: Array,
        default: []
      }
    },
    methods: {
      jumpAlbumDetail(id) {
        this.$router.push({
          path: '/album/' + id
        });
      }
    }
  };
</script>

