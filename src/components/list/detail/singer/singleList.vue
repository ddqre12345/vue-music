<template>
  <ul class="hot-single-list">
    <li class="single-card" v-for="(data, index) in list" @click="playAudio(data)" :key="index">
      <div class="index">{{index + 1}}</div>
      <div class="single-info">
          <p class="single-name" style="-webkit-box-orient: vertical;">{{data.name}}</p>
          <p class="single-album" style="-webkit-box-orient: vertical;">{{data.al.name}}</p>
      </div>
    </li>
  </ul>
</template>
<script>
  import { mapGetters } from 'vuex';
  export default {
    name: 'v-hot-single-list',
    props: {
      list: {
        type: Array,
        default: []
      }
    },
    methods: {
      playAudio (song) {
        document.getElementById('audioPlay').pause();
        this.$store.commit('pause');
        let audio = {};
        audio.id = song.id;  // id
        audio.singer = song.album.name; // 演唱者
        audio.albumPic = song.album.picUrl; // 专辑图片
        audio.name = song.name;
        // 通过Vuex改变状态
        this.$store.commit('addToList', audio);
        this.$store.dispatch('getSong', audio.id);
      }
    },
    computed: {
      ...mapGetters([
        'songList'
      ])
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import 'singleList.styl';
</style>
