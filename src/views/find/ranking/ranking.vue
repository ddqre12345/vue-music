<template>
    <div class="ranking-area">
        <div class="surge">
            <img v-lazy="surgeInfo.coverImgUrl" lazy="loading" />
            <ul>
              <li v-for="(data, index) in surgeList">{{index + 1}}.{{data.name}}-{{data.artists[0].name}}</li>
            </ul>
        </div>
        <div class="newSonges">
            <img v-lazy="newSongesInfo.coverImgUrl" lazy="loading" />
            <ul>
              <li v-for="(data, index) in newSongesList">{{index + 1}}.{{data.name}}-{{data.artists[0].name}}</li>
            </ul>
        </div>
        <div class="original">
            <img v-lazy="originalInfo.coverImgUrl" lazy="loading" />
            <ul>
              <li v-for="(data, index) in originalList">{{index + 1}}.{{data.name}}-{{data.artists[0].name}}</li>
            </ul>
        </div>
        <div class="hot">
            <img v-lazy="hotInfo.coverImgUrl" lazy="loading" />
            <ul>
              <li v-for="(data, index) in hotList">{{index + 1}}.{{data.name}}-{{data.artists[0].name}}</li>
            </ul>
        </div>
    </div>
</template>
<script>
  import api from '../../../api/index';
  export default {
    name: 'v-ranking',
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
