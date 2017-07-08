<template>
    <div class="common-single-card" @click="playAudio(data)">
        <div class="index">{{index + 1}}</div>
        <div class="single-info">
            <p class="single-name" style="-webkit-box-orient: vertical;">{{data.name}}</p>
            <p class="single-album" style="-webkit-box-orient: vertical;">{{data.al.name}}</p>
        </div>
    </div>
</template>
<script>
  import { mapGetters } from 'vuex';
  export default {
    name: 'v-single-card',
    props: {
      data: {
        type: Object
      },
      index: {
        type: Number
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
    @import 'singleCard.styl';
</style>
