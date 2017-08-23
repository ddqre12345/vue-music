<template>
  <transition name="fade">
    <div class="ranking-area">
      <h2 class="title">官方榜</h2>
      <div class="official-area">
          <router-link tag="div" class="item" :to="{ name: 'ranking', params: { idx: 3 }}">
              <img class="logo" src="/static/surge.jpg" alt="surge">
              <v-songs-list :data="surgeList"></v-songs-list>
          </router-link>
          <router-link tag="div" class="item" :to="{ name: 'ranking', params: { idx: 0 }}">
              <img src="/static/newSonges.jpg" class="logo" alt="newSonges">
              <v-songs-list :data="newSongesList"></v-songs-list>
          </router-link>
          <router-link tag="div" class="item" :to="{ name: 'ranking', params: { idx: 2 }}">
              <img class="logo" src="/static/original.jpg" alt="original">
              <v-songs-list :data="originalList"></v-songs-list>
          </router-link>
          <router-link tag="div" class="item" :to="{ name: 'ranking', params: { idx: 1 }}">
              <img class="logo" src="/static/hot.jpg" alt="hot">
              <v-songs-list :data="hotList"></v-songs-list>
          </router-link>
      </div>
      <h2 class="title">全球榜</h2>
      <div class="world-area">
        <ul class="item-list">
          <router-link tag="li" class="item" v-for="(item, index) in rankingList"  :to="{ name: 'ranking', params: { idx: item.idx }}" :key="index">
            <img  class="logo" :src="item.coverImageUrl" alt="item.title">
            <p class="name">{{item.title}}</p>
          </router-link>
        </ul>
      </div>
    </div>
  </transition>
</template>
<script>
  import api from 'api/index';
  import vSongsList from 'components/list/find/ranking/songsList';
  // wRL为全球榜单
  import wRL from '@/mock/wRL.json';
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
      // 获取飙升榜信息
      getSurgeList() {
        api.getTopListResource(3).then((response) => {
          this.surgeInfo = response.data.result;
          this.surgeList = response.data.result.tracks.slice(0, 3);
        }).catch((response) => {
          console.log(response);
        });
      },
      // 获取新歌榜信息
      getNewSongesList() {
        api.getTopListResource(0).then((response) => {
          this.newSongesInfo = response.data.result;
          this.newSongesList = response.data.result.tracks.slice(0, 3);
        }).catch((response) => {
          console.log(response);
        });
      },
      // 获取原创榜信息
      getOriginalList() {
        api.getTopListResource(2).then((response) => {
          this.originalInfo = response.data.result;
          this.originalList = response.data.result.tracks.slice(0, 3);
        }).catch((response) => {
          console.log(response);
        });
      },
      // 获取热歌榜信息
      getHotList() {
        api.getTopListResource(1).then((response) => {
          this.hotInfo = response.data.result;
          this.hotList = response.data.result.tracks.slice(0, 3);
        }).catch((response) => {
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
  @import '~common/styles/variable';
  @import "~common/px2rem/px2rem";
  .ranking-area
    width 100%
    height 100%
    .title
      padding-top px2rem(30)
      fontSize-smaller()
      color $color-text-title
      &:before
        content '|'
        color $color-redLight
        font-size px2rem(40)
        font-weight 600
        padding-right px2rem(10)
    .official-area
      padding-top px2rem(20)
      display flex
      flex-direction column
      justify-content center
      .item
          display flex
          flex-direction row
          padding 2px 0
          .logo
            flex 1 0 33%
            height px2rem(260)
    .world-area
      .item-list
        display flex
        flex-direction row
        justify-content space-between
        flex-flow row wrap
        .item
          padding-top px2rem(10)
          flex 0 0 32%
          width 0
          .logo
            width 100%
          .name
            fontSize-micro()
            color: $color-normal-info
            padding-left px2rem(10)
            padding-right px2rem(10)
</style>
