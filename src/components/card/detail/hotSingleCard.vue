<template>
  <div class="hot-single-card" @click="playAudio(data)">
    <div class="index">{{order + 1}}</div>
    <div class="single-info">
      <p class="single-name" style="-webkit-box-orient: vertical;">{{data.name}}</p>
      <p class="single-album">{{data.al.name}}</p>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex';
  export default {
    name: 'v-hot-single-card',
    props: {
      data: {
        type: Object,
        default: {}
      },
      order: {
        type: Number,
        default: 0
      }
    },
    methods: {
      playAudio (song) {
        document.getElementById('audioPlay').pause();
        this.$store.commit('pause');
        let audio = {};
        audio.id = song.id;  // id
        audio.singer = song.al.name; // 演唱者
        audio.albumPic = song.al.picUrl;
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
  @import 'hotSingleCard.styl';
</style>
