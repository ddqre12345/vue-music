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
  import vPlayList from '../../../components/card/findCard/playList.vue';
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
        api.getTopPlaylistResource(this.keys, 20, 0).then((response) => {
          console.log(response);
          console.log(this.keys);
          this.playlists = response.data.playlists;
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
