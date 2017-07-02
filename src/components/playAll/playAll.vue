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
<style lang="stylus" rel="stylesheet/stylus" scoped>
  #playAll
    box-sizing border-box
    display: flex
    flex-direction:row;
    align-items: center;
    border-bottom: 1px solid #e5e9e8;
    .play-icon
      box-sizing: border-box;
      width: 40px;
      height: 45px;
      padding: 15px;
      background url(./playAll.png) no-repeat center
      background-size 70%
    .describe
      color: #2e302f;
      font-size:14px;
      .num
        color:#8c908f;
</style>
