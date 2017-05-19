<template>
    <div class="ranking-area">
        <div class="surge">
            <img src="../../../../static/surge.jpg" alt="surge"/>
            <v-songs-list :data="surgeList"></v-songs-list>
        </div>
        <div class="newSonges">
            <img src="../../../../static/newSonges.jpg" alt="newSonges"/>
            <v-songs-list :data="newSongesList"></v-songs-list>
        </div>
        <div class="original">
            <img src="../../../../static/original.jpg" alt="original" />
            <v-songs-list :data="originalList"></v-songs-list>
        </div>
        <div class="hot">
            <img src="../../../../static/hot.jpg" alt="hot" />
            <v-songs-list :data="hotList"></v-songs-list>
        </div>
    </div>
</template>
<script>
  import api from '../../../api/index';
  import vSongsList from '../../../components/list/find/ranking/songsList.vue';
  export default {
    name: 'v-ranking',
    components: {
      vSongsList
    },
    data () {
      return {
        surgeList: [],
        newSongesList: [],
        originalList: [],
        hotList: [],
        surgeInfo: {},
        newSongesInfo: {},
        originalInfo: {},
        hotInfo: {}
      };
    },
    mounted: function() {
      this.getSurgeList();
      this.getNewSongesList();
      this.getOriginalList();
      this.getHotList();
    },
    methods: {
      getSurgeList() {
        api.getTopListResource(3).then((response) => {
          this.surgeInfo = response.data.result;
          this.surgeList = response.data.result.tracks.slice(0, 3);
        })
        .catch((response) => {
          console.log(response);
        });
      },
      getNewSongesList() {
        api.getTopListResource(0).then((response) => {
          this.newSongesInfo = response.data.result;
          this.newSongesList = response.data.result.tracks.slice(0, 3);
        })
        .catch((response) => {
          console.log(response);
        });
      },
      getOriginalList() {
        api.getTopListResource(2).then((response) => {
          this.originalInfo = response.data.result;
          this.originalList = response.data.result.tracks.slice(0, 3);
        })
        .catch((response) => {
          console.log(response);
        });
      },
      getHotList() {
        api.getTopListResource(1).then((response) => {
          this.hotInfo = response.data.result;
          this.hotList = response.data.result.tracks.slice(0, 3);
        })
        .catch((response) => {
          console.log(response);
        });
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
    @import 'ranking.styl';
</style>
