<template>
  <div class="recommend-area">
    <div id="slider">
      <swiper :options="swiperOption" style="height: 100%;">
        <swiper-slide v-for="item in slide_list"><img :src="item" class="banner-item"  alt="" style="width: 100%; height: 100%;"></swiper-slide>
        <div class="swiper-pagination swiper-pagination-white" slot="pagination"></div>
      </swiper>
    </div>
    <div class="recommend-playLists-area">
      <div class="title">推荐歌单</div>
      <v-play-lists :playlists="playlists"></v-play-lists>
    </div>
    <div class="recommend-activitys-area">
      <div class="title">独家放送</div>
      <v-activitys-list :activitys="activitys"></v-activitys-list>
    </div>
    <div class="recommend-mv-area">
      <div class="title">推荐MV</div>
      <v-mv-list :MVs="MVs"></v-mv-list>
    </div>
  </div>
</template>
<script>
  import api from '../../../api/index';
  import { swiper, swiperSlide } from 'vue-awesome-swiper';
  import vPlayLists from '../../../components/list/find/recommend/playLists';
  import vActivitysList from '../../../components/list/find/recommend/activitysList';
  import vMvList from '../../../components/list/find/recommend/mvList';
  const imgList = ['/static/banner1.jpg', '/static/banner2.jpg', '/static/banner3.jpg', '/static/banner4.jpg'];
  export default {
    name: 'v-recommend',
    components: {
      swiper,
      swiperSlide,
      vPlayLists,
      vActivitysList,
      vMvList
    },
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
        MVs: []
      };
    },
    mounted () {
      this.getPersonalizedResource();
      this.getPrivatecontentResource();
      this.getPersonalizedMvResource();
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
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import 'recommend.styl';
</style>
