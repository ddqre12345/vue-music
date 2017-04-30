<template>
  <div class="recommend-area">
    <div id="slider" style="width: 100%; height: 120px;">
      <swiper :options="swiperOption" style="height: 100%;">
        <swiper-slide v-for="item in slide_list"><img :src="item" class="banner-item"  alt="" style="width: 100%; height: 100%;"></swiper-slide>
        <div class="swiper-pagination swiper-pagination-white" slot="pagination"></div>
      </swiper>
    </div>
    <div class="recommend-playLists-area">
      <div class="title">推荐歌单</div>
      <div class="playLists-area">
        <ul>
          <li class="playList">
            <v-recommend-card :imgUrl="playList.imgUrl" :title="playList.name"></v-recommend-card>
          </li>
        </ul>
      </div>
    </div>
    <div class="recommend-album-area">
      <div class="title">推荐专辑</div>
      <div class="albums-area">
        <ul>
          <li class="album">
            <!--<v-play-list-card></v-play-list-card>-->
          </li>
        </ul>
      </div>
    </div>
    <div class="recommend-singer-area">
      <div class="title">推荐歌手</div>
      <div class="singers-area">
        <ul>
          <li class="singer">
            <!--<v-play-list-card></v-play-list-card>-->
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import api from '../../../api/index';
  import { Swiper, SwiperItem } from 'vux/src/components/Swiper';
  import { swiper, swiperSlide } from 'vue-awesome-swiper';
  import vRecommendCard from '../../../components/card/findCard/recommend/recommendCard';
  const imgList = [
    '/static/banner1.jpg',
    '/static/banner2.jpg',
    '/static/banner3.jpg',
    '/static/banner4.jpg'
  ];
  export default {
    components: {
      Swiper,
      SwiperItem,
      swiper,
      swiperSlide,
      vRecommendCard
    },
    name: 'v-recommend-card',
    props: {
      data: {
        type: Object
      }
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
    },
    mounted () {
        this.getSingleResource();
    },
    methods: {
      getSingleResource() {
        api.getTopPlaylistResource('hot', 6, 0)
          .then((response) => {
            console.log(response);
          })
          .catch((response) => {
            console.log(response);
          });
      }
    },
    computed: {

    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import 'recommend.styl';
</style>
