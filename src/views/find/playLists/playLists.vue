<template>
  <div class="playLists-area">
    <button-tab v-model="index">
      <button-tab-item @on-item-click="type()">最新</button-tab-item>
      <button-tab-item @on-item-click="type()">最热</button-tab-item>
    </button-tab>
    <div class="playLists">
      <ul>
        <li v-for="data in playlists">
          <v-play-list :data="data"></v-play-list>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import api from '../../../api/index';
  import { ButtonTab, ButtonTabItem } from 'vux';
  import vPlayList from '../../../components/card/findCard/playList/playList';
  export default {
    name: 'v-play-lists',
    components: {
      vPlayList,
      ButtonTab,
      ButtonTabItem
    },
    data () {
      return {
        index: 0,
        keys: 'new',
        playlists: []
      };
    },
    mounted: function() {
      this.getTopPlaylistResource();
    },
    methods: {
      type () {
        this.getTopPlaylistResource();
      },
      getTopPlaylistResource() {
        this.keys = this.index ? 'hot' : 'new';
        this.playlists = [];
        this.$store.commit('update_loading', true);
        api.getTopPlaylistResource(this.keys, 20, 0).then((response) => {
          this.playlists = response.data.playlists;
          // $nextTick() 在dom 重新渲染完后执行
          this.$nextTick(() => {
            this.$store.commit('update_loading', false);
          });
        })
          .catch((response) => {
            console.log(response);
          });
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import 'playLists.styl';
</style>
