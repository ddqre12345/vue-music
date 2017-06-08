<template>
    <transition name="fade">
        <div class="singer-detail">
            <div class="singer-info" :style="{'background-image': 'url(' + singerImage + ')'}">
                <x-header :left-options="{backText: ''}" style="background-color: inherit">{{singerInfo.name}}</x-header>
                <div class="singer-page" v-show="userId" @click="jumpUserDetail(userId)">个人主页</div>
            </div>
            <div class="tab-list">
                <tab :line-width=2 active-color='#b72712' defaultColor='#666' bar-active-color='#b72712' v-model="index">
                    <tab-item class="vux-center" :selected="type === item" v-for="(item, index) in tabList" @click="type = item" :key="index">{{item}}</tab-item>
                </tab>
                <swiper v-model="index" height="100%" :show-dots="false">
                    <swiper-item :key="1">
                        <div class="tab-swiper vux-center list-area">
                            <v-single-list :list="hotSongs"></v-single-list>
                        </div>
                    </swiper-item>
                    <swiper-item :key="2">
                        <div class="tab-swiper vux-center list-area">
                            <v-album-list :list="hotAlbums"></v-album-list>
                        </div>
                    </swiper-item>
                    <swiper-item :key="3">
                        <div class="tab-swiper vux-center list-area">
                            <v-mv-list :list="mvs"></v-mv-list>
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
  import vSingleList from '../../../components/list/detail/singer/singleList';
  import vAlbumList from '../../../components/list/detail/singer/albumList';
  import vMvList from '../../../components/list/detail/singer/mvList';
  const list = () => ['热门50', '专辑', 'MV'];
  export default {
    data () {
      return {
        tName: '歌单',
        type: '热门50',
        tabList: list(),
        index: 0,
        backgroundColor: '',
        singerInfo: {},
        userId: '',
        hotSongs: [],
        hotAlbums: [],
        mvs: []
      };
    },
    mounted: function() {
      this.getSingerDetail();
      this.getSingerSingle();
      this.getArtistAlbum();
      this.getArtistMv();
    },
    methods: {
      jumpUserDetail (id) {
        this.$router.push({
          path: '/user/' + id
        });
      },
      back () {
        this.$router.go(-1);
      },
      // 获取歌手信息
      getSingerDetail () {
        this.$store.commit('update_loading', true);
        api.getArtistDescResource(this.$route.params.id)
          .then((response) => {
            if (response.data.topicData) {
              this.userId = response.data.topicData[0].creator.userId;
            }
            // $nextTick() 在dom 重新渲染完后执行
            this.$nextTick(() => {
              this.$store.commit('update_loading', false);
            });
          })
          .catch((response) => {
            console.log(response);
          });
      },
      // 获取歌手单曲
      getSingerSingle () {
        api.getArtistsResource(this.$route.params.id)
          .then((response) => {
            this.singerInfo = response.data.artist;
            this.hotSongs = response.data.hotSongs;
          })
          .catch((response) => {
            console.log(response);
          });
      },
      // 获取歌手专辑
      getArtistAlbum () {
        api.getArtistAlbumResource(this.$route.params.id, 30)
          .then((response) => {
            this.hotAlbums = response.data.hotAlbums;
          })
          .catch((response) => {
            console.log(response);
          });
      },
      // 获取歌手专辑
      getArtistMv () {
        api.getArtistMvResource(this.$route.params.id, 30)
          .then((response) => {
            this.mvs = response.data.mvs;
          })
          .catch((response) => {
            console.log(response);
          });
      }
    },
    computed: {
      singerImage() {
        return '' || (this.singerInfo.picUrl + '?param=500y500');
      }
    },
    components: {
      Tab,
      TabItem,
      Swiper,
      SwiperItem,
      XHeader,
      vSingleList,
      vAlbumList,
      vMvList
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
