<template>
  <transition name="fade">
    <div class="ranking-area">
      <div class="title">官方榜</div>
      <div class="ranking-official-area">
          <div class="surge" @click="jumpRankingDetail(3)">
              <img src="/static/surge.jpg" alt="surge">
              <v-songs-list :data="surgeList"></v-songs-list>
          </div>
          <div class="newSonges" @click="jumpRankingDetail(0)">
              <img src="/static/newSonges.jpg" alt="newSonges">
              <v-songs-list :data="newSongesList"></v-songs-list>
          </div>
          <div class="original" @click="jumpRankingDetail(2)">
              <img src="/static/original.jpg" alt="original">
              <v-songs-list :data="originalList"></v-songs-list>
          </div>
          <div class="hot" @click="jumpRankingDetail(1)">
              <img src="/static/hot.jpg" alt="hot">
              <v-songs-list :data="hotList"></v-songs-list>
          </div>
      </div>
      <div class="title">全球榜</div>
      <div class="ranking-world-area">
        <ul>
          <li v-for="(item, index) in rankingList" @click="jumpRankingDetail(item.idx)" :key="index">
            <img :src="item.coverImageUrl" alt="item.title">
            <p class="ranking-title">{{item.title}}</p>
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>
<script>
  import api from '../../../api/index';
  import vSongsList from '../../../components/list/find/ranking/songsList';
  // wRL为全球榜单
  import wRL from '../../../../static/mock/wRL.json';
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
        hotInfo: {},
        rankingList: wRL.rankingList
      };
    },
    mounted: function() {
      this.getSurgeList();
      this.getNewSongesList();
      this.getOriginalList();
      this.getHotList();
    },
    methods: {
      jumpRankingDetail(idx) {
        this.$router.push({
          path: '/ranking/' + idx
        });
      },
      // 获取飙升榜信息
      getSurgeList() {
        api.getTopListResource(3).then((response) => {
          this.surgeInfo = response.data.result;
          this.surgeList = response.data.result.tracks.slice(0, 3);
        })
        .catch((response) => {
          console.log(response);
        });
      },
      // 获取新歌榜信息
      getNewSongesList() {
        api.getTopListResource(0).then((response) => {
          this.newSongesInfo = response.data.result;
          this.newSongesList = response.data.result.tracks.slice(0, 3);
        })
        .catch((response) => {
          console.log(response);
        });
      },
      // 获取原创榜信息
      getOriginalList() {
        api.getTopListResource(2).then((response) => {
          this.originalInfo = response.data.result;
          this.originalList = response.data.result.tracks.slice(0, 3);
        })
        .catch((response) => {
          console.log(response);
        });
      },
      // 获取热歌榜信息
      getHotList() {
        api.getTopListResource(1).then((response) => {
          this.hotInfo = response.data.result;
          this.hotList = response.data.result.tracks.slice(0, 3);
        })
        .catch((response) => {
          console.log(response);
        });
      }
    },
    components: {
      vSongsList
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import 'ranking.styl';
</style>
