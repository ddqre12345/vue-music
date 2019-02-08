<template>
  <div id="playAll" @click="playAll(data)">
    <div class="play-icon"></div>
    <p class="describe">播放全部<span class="num">(共{{data.length}}首)</span></p>
  </div>
</template>
<script>
  import { mapMutations } from 'vuex';
  export default {
    name: 'play-all',
    props: {
      data: {
        type: Array
      }
    },
    methods: {
      ...mapMutations([
        'pause',
        'addAllToList',
        'removeList',
        'setAudioIndex'
      ]),
      playAll (items) {
        console.log(items);
        document.getElementById('audioPlay').pause();
        // 通过Vuex改变状态
        this.$store.commit('pause');
        this.$store.commit('removeList');
        this.$store.commit('addAllToList', this.data);
        this.$store.dispatch('getSong', this.data[0].id);
        this.$store.commit('setAudioIndex', 0);
      }
    }
  };
</script>

