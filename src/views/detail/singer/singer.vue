<template>
    <transition name="fade">
        <div class="wrap">
            <x-header :left-options="{backText: ''}">{{tName}}</x-header>
            <div class="playlist-info">
                <div class="singer-page">个人主页</div>
            </div>
            <div class="playlist">
                <tab :line-width=2 active-color='#b72712' defaultColor='#666' bar-active-color='#b72712' v-model="index">
                    <tab-item class="vux-center" :selected="type === item" v-for="(item, index) in tabList" @click="type = item" :key="index">{{item}}</tab-item>
                </tab>
                <swiper v-model="index" height="100%" :show-dots="false">
                    <swiper-item :key="1">
                        <div class="tab-swiper vux-center">
                          <!--<v-single-list></v-single-list>-->
                        </div>
                    </swiper-item>
                    <swiper-item :key="2">
                        <div class="tab-swiper vux-center">
                          <!--<v-album-list></v-album-list>-->
                        </div>
                    </swiper-item>
                </swiper>
            </div>
        </div>
    </transition>
</template>
<script>
  import api from '../../../api';
  import { XHeader } from 'vux';
  import { Tab, TabItem } from 'vux/src/components/Tab';
  import { Swiper, SwiperItem } from 'vux/src/components/Swiper';
  const list = () => ['热门50', '专辑'];
  export default {
    data () {
      return {
        singerInfo: {},
        hotSongs: {},
        hotAlbums: {},
        tName: '歌单',
        type: '热门50',
        tabList: list(),
        index: 0,
        backgroundColor: ''
      };
    },
    mounted: function() {
      this.getSingerSingle();
      this.getSingerAlbum();
    },
    methods: {
      back () {
        this.$router.go(-1);
      },

      getSingerAlbum () {
        api.getArtistAlbumResource(this.$route.params.id, 30)
          .then((response) => {
            console.log(response);
            this.singerInfo = response.data.artist;
            this.hotSongs = response.data.hotSongs;
          })
          .catch((response) => {
            console.log(response);
          });
      },
      getSingerSingle () {
        api.getArtistsResource(this.$route.params.id)
          .then((response) => {
            console.log(response);
            this.hotAlbums = response.data.hotAlbums;
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
      XHeader
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
    @import "singer.styl";
</style>
