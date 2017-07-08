<template>
  <div class="recommend-area">
    <div id="slider">
      <swiper :options="swiperOption" style="height: 100%;">
        <swiper-slide v-for="(item, index) in slide_list" :key="index"><img :src="item" class="banner-item"  alt="" style="width: 100%; height: 100%;"></swiper-slide>
        <div class="swiper-pagination swiper-pagination-white" slot="pagination"></div>
      </swiper>
    </div>
    <div class="recommend-playLists-area">
      <h1 class="title">推荐歌单</h1>
      <v-play-lists :playlists="playlists"></v-play-lists>
    </div>
    <div class="recommend-activitys-area">
      <h1 class="title">独家放送</h1>
      <v-activitys-list :activitys="activitys"></v-activitys-list>
    </div>
    <div class="recommend-mv-area">
      <h1 class="title">最新音乐</h1>
      <v-new-song-list :newSong="newSong"></v-new-song-list>
    </div>
    <div class="recommend-mv-area">
      <h1 class="title">推荐MV</h1>
      <v-mv-list :MVs="MVs"></v-mv-list>
    </div>
    <div class="recommend-mv-area">
      <h1 class="title">主播电台</h1>
      <v-dj-program-list :djProgram="djProgram"></v-dj-program-list>
    </div>
  </div>
</template>
<script>
  import api from '../../../api/index';
  import { swiper, swiperSlide } from 'vue-awesome-swiper';
  import vPlayLists from '../../../components/list/find/recommend/playLists';
  import vActivitysList from '../../../components/list/find/recommend/activitysList';
  import vMvList from '../../../components/list/find/recommend/mvList';
  import vNewSongList from '../../../components/list/find/recommend/newSongList';
  import vDjProgramList from '../../../components/list/find/recommend/djProgram';
  const imgList = ['/static/banner1.jpg', '/static/banner2.jpg', '/static/banner3.jpg', '/static/banner4.jpg'];
  export default {
    name: 'v-recommend',
    data () {
      return {
        swiperOption: {
          pagination: '.swiper-pagination',
          paginationClickable: true,
          autoplay: 2500
        },
        slide_list: imgList,
        playlists: [],
        activitys: [],
        MVs: [],
        newSong: [],
        djProgram: []
      };
    },
    mounted () {
      this.getPersonalizedResource();
      this.getPrivatecontentResource();
      this.getPersonalizedMvResource();
      this.getNewSongResource();
      this.getDjProgramResource();
    },
    methods: {
      getPersonalizedResource() {
        api.getPersonalized().then((response) => {
          this.playlists = response.data.result;
        })
          .catch((response) => {
            console.log(response);
          });
      },
      getPrivatecontentResource() {
        api.getPrivatecontent().then((response) => {
          this.activitys = response.data.result;
        })
          .catch((response) => {
            console.log(response);
          });
      },
      getPersonalizedMvResource() {
        api.getPersonalizedMv().then((response) => {
          this.MVs = response.data.result;
        })
          .catch((response) => {
            console.log(response);
          });
      },
      getNewSongResource() {
        api.getNewSong().then((response) => {
          this.newSong = response.data.result.slice(0, 6);
        })
          .catch((response) => {
            console.log(response);
          });
      },
      getDjProgramResource() {
        api.getDjProgram().then((response) => {
          this.djProgram = response.data.result.slice(0, 6);
        })
          .catch((response) => {
            console.log(response);
          });
      }
    },
    components: {
      swiper,
      swiperSlide,
      vPlayLists,
      vActivitysList,
      vMvList,
      vNewSongList,
      vDjProgramList
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import 'recommend.styl';
</style>
