<template>
    <transition name="fade">
        <div class="wrap">
            <x-header :left-options="{backText: ''}">{{tName}}</x-header>
            <div class="playlist-info">
                <div class="singer-page">个人主页</div>
            </div>
            <div class="tab-list">
                <tab :line-width=2 active-color='#b72712' defaultColor='#666' bar-active-color='#b72712' v-model="index">
                    <tab-item class="vux-center" :selected="type === item" v-for="(item, index) in tabList" @click="type = item" :key="index">{{item}}</tab-item>
                </tab>
                <swiper v-model="index" height="100%" :show-dots="false">
                    <swiper-item :key="1">
                        <div class="tab-swiper vux-center">
                            <div class="hot-single-list">
                                <ul>
                                    <li v-for="(data, index) in hotSongs">
                                        <v-single-card :data="data" :index="index"></v-single-card>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </swiper-item>
                    <swiper-item :key="2">
                        <div class="tab-swiper vux-center">
                            <!--<div class="play-lists">-->
                                <!--<ul>-->
                                    <!--<li v-for="data in hotAlbums">-->
                                        <!--<v-play-list-card :data="data"></v-play-list-card>-->
                                    <!--</li>-->
                                <!--</ul>-->
                            <!--</div>-->
                        </div>
                    </swiper-item>
                </swiper>
            </div>
        </div>

    </transition>
</template>
<script type="text/ecmascript-6">
  import api from '../../../api';
  import { XHeader } from 'vux';
  import { Tab, TabItem } from 'vux/src/components/Tab';
  import { Swiper, SwiperItem } from 'vux/src/components/Swiper';
  import vSingleCard from '../../../components/card/detail/singleCard';
  const list = () => ['热门50', '专辑'];
  export default {
    data () {
      return {
        tName: '歌单',
        type: '热门50',
        tabList: list(),
        backgroundColor: '',
        singerInfo: {},
        hotSongs: {},
        hotAlbums: {}
      };
    },
    mounted: function() {
      this.getSingerSingle();
      this.getArtistAlbum();
    },
    methods: {
      back () {
        this.$router.go(-1);
      },
      getSingerSingle () {
        api.getArtistsResource(this.$route.params.id)
          .then((response) => {
            this.hotSongs = response.data.hotSongs;
          })
          .catch((response) => {
            console.log(response);
          });
      },
      getArtistAlbum () {
        api.getArtistAlbumResource(this.$route.params.id, 30)
          .then((response) => {
            this.hotAlbums = response.data.hotAlbums;
            this.singerInfo = response.data.artist;
          })
          .catch((response) => {
            console.log(response);
          });
      }
    },
    computed: {
//      playListImage() {
//        return '' || this.datas.picUrl;
//      },
//      creatorImage() {
//        return '' || this.creator.avatarUrl;
//      }
    },
    components: {
      Tab,
      TabItem,
      Swiper,
      SwiperItem,
      XHeader,
      vSingleCard
    }
  };
</script>
<style lang="less" scoped>
    @import '~vux/src/styles/1px.less';
    @import '~vux/src/styles/center.less';

    .vux-swiper {
        height: 100%;
    }

    .vux-slider {
        height: 100%;
    }

    .tab-swiper {
        background-color: #fff;
        height: 100%;
    }
</style>
<style lang="stylus" rel="stylesheet/stylus">
    @import "singer.styl";
</style>
