<template>
  <div class="recommend-area">
    <div id="slider" style="width: 100%;">
      <swiper :options="swiperOption" style="height: 100%;">
        <swiper-slide v-for="item in slide_list"><img :src="item" class="banner-item"  alt="" style="width: 100%; height: 100%;"></swiper-slide>
        <div class="swiper-pagination swiper-pagination-white" slot="pagination"></div>
      </swiper>
    </div>
    <div class="recommend-playLists-area">
      <div class="title">推荐歌单</div>
      <div class="playLists-area">
        <ul>
          <li v-for="data in playlists">
            <v-play-list-card :data="data"></v-play-list-card>
          </li>
        </ul>
      </div>
    </div>
    <div class="recommend-activitys-area">
      <div class="title">独家放送</div>
      <div class="activitys-area">
        <ul>
          <li v-for="data in activitys">
            <v-activity-card :data="data"></v-activity-card>
          </li>
        </ul>
      </div>
    </div>
    <div class="recommend-mv-area">
      <div class="title">推荐MV</div>
      <div class="MV-area">
        <ul>
          <li v-for="data in MVs">
            <v-mv-card :data="data"></v-mv-card>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper';
  import vPlayListCard from '../../../components/card/findCard/recommend/playListCard';
  import vActivityCard from '../../../components/card/findCard/recommend/activityCard';
  import vMvCard from '../../../components/card/findCard/recommend/mvCard';
  const imgList = [
    '/static/banner1.jpg',
    '/static/banner2.jpg',
    '/static/banner3.jpg',
    '/static/banner4.jpg'
  ];
  export default {
    name: 'v-recommend',
    props: {
      playlists: {
        type: Array
      },
      activitys: {
        type: Array
      },
      MVs: {
        type: Array
      }
    },
    components: {
      swiper,
      swiperSlide,
      vPlayListCard,
      vActivityCard,
      vMvCard
    },
    data () {
      return {
        swiperOption: {
          pagination: '.swiper-pagination',
          paginationClickable: true,
          autoplay: 2500
        },
        slide_list: imgList
      };
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import 'recommend.styl';
</style>
