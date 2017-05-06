<template lang="html">
    <transition name="fade">
        <div class="search-page">
            <div class='header-other'>
                <span @click="goBack" class="back"><i class="back-icon"></i></span>
                <div class="input">
                    <input v-model="keywords" @keyup.enter="toSearch(keywords)" type="text" placeholder='搜素音乐、歌手、歌词、用户'>
                    <i @click="keywords=''" v-show="keywords!==''&&!isShowHot" class="icon-cancel"></i>
                </div>
            </div>
            <div class="hot" v-if="isShowHot">
                <p>热门搜索</p>
                <ul class="keywords">
                  <li v-for="item of hotKeywords" v-text="item" @click="toSearch(item)" class="keyword"></li>
                </ul>
            </div>
            <div v-else class="search-list">
                <tab :line-width=2 active-color='#b72712' defaultColor='#666' bar-active-color='#b72712'
                     v-model="index">
                    <tab-item class="vux-center" :selected="type === item" v-for="(item, index) in tabList"
                              @click="type = item" :key="index">{{item}}
                    </tab-item>
                </tab>
                <swiper v-model="index" height="100%" :show-dots="false" class="swiper-container">
                    <swiper-item :key="1">
                        <div class="tab-swiper vux-center">
                            <div class="single-list">
                                <ul>
                                    <li v-for="data in songs">
                                        <v-single-card :data="data"></v-single-card>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </swiper-item>
                    <swiper-item :key="2">
                        <div class="tab-swiper vux-center">
                            <div class="singer-list">
                                <ul>
                                    <li v-for="data in singer">
                                        <v-singer-card :data="data"></v-singer-card>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </swiper-item>
                    <swiper-item :key="3">
                        <div class="tab-swiper vux-center">
                            <div class="album-list">
                                <ul>
                                    <li v-for="data in albums">
                                        <v-album-card :data="data"></v-album-card>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </swiper-item>
                    <swiper-item :key="4">
                        <div class="tab-swiper vux-center">
                            <div class="play-lists">
                                <ul>
                                    <li v-for="data in playlist">
                                        <v-play-list-card :data="data"></v-play-list-card>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </swiper-item>
                    <swiper-item :key="5">
                        <div class="tab-swiper vux-center">
                            <div class="user-list">
                                <ul>
                                    <li v-for="data in user">
                                        <v-user-card :data="data"></v-user-card>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </swiper-item>
                </swiper>
            </div>
        </div>
    </transition>
</template>

<script type="text/ecmascript-6">
  import api from '../../api/index';
  import {Tab, TabItem} from 'vux/src/components/Tab';
  import {Swiper, SwiperItem} from 'vux/src/components/Swiper';
  import vSingleCard from '../../components/card/searchCard/singleCard';
  import vSingerCard from '../../components/card/searchCard/singerCard';
  import vAlbumCard from '../../components/card/searchCard/albumCard';
  import vPlayListCard from '../../components/card/searchCard/playListCard';
  import vUserCard from '../../components/card/searchCard/userCard';
  const list = () => ['单曲', '歌手', '专辑', '歌单', '用户'];
  const hotKeywordsList = () => ['清白之年', '我喜欢上你时的内心活动', '我想和你唱',
    'hyukoh', '童话镇', '陈奕迅', '漂洋过海来看你', '许嵩', '成都', '林俊杰'];
  export default {
    name: 'search',
    components: {
      Tab,
      TabItem,
      Swiper,
      SwiperItem,
      vSingleCard,
      vSingerCard,
      vAlbumCard,
      vPlayListCard,
      vUserCard
    },
    data () {
      return {
        index: 0,
        tabList: list(),
        hotKeywords: hotKeywordsList(),
        type: '单曲',
        keywords: '',
        isShowHot: true,
        songs: {},
        singer: {},
        albums: {},
        playlist: {},
        user: {}
      };
    },
    // 接着在父组件内
    // watch $route 决定使用哪种过渡
    watch: {
      '$route' (to, from) {
        if (from.name === 'find') {
            this.keywords = '';
            this.isShowHot = true;
        }
      }
    },
    methods: {
      goBack () {
        this.$router.push({
          path: '/index/find'
        });
      },
      // 关键词搜索
      toSearch (keywords) {
        this.keywords = keywords;
        if (this.keywords.trim()) {
          this.isShowHot = false;
          this.$router.push({
            path: '/search',
            query: {
              keywords: keywords
            }
          });
          this.getSingleResource(); //  获取搜索单曲
          this.getAlbumResource(); //  获取搜索专辑
          this.getSingerResource(); //  获取搜索歌手
          this.getPlayListResource(); //  获取搜索歌单
          this.getUserResource(); //  获取搜索用户
        }
      },
      //  获取搜索单曲
      getSingleResource() {
        api.getSearchResource(this.$route.query.keywords, 1, 30, 0)
          .then((response) => {
            this.songs = response.data.result.songs;
          })
          .catch((response) => {
            console.log(response);
          });
      },
      //  获取搜索专辑
      getSingerResource() {
        api.getSearchResource(this.$route.query.keywords, 100, 30, 0)
          .then((response) => {
            this.singer = response.data.result.artists;
          })
          .catch((response) => {
            console.log(response);
          });
      },
      //  获取搜索歌手
      getAlbumResource() {
        api.getSearchResource(this.$route.query.keywords, 10, 30, 0)
          .then((response) => {
            this.albums = response.data.result.albums;
          })
          .catch((response) => {
            console.log(response);
          });
      },
      //  获取搜索歌单
      getPlayListResource() {
        api.getSearchResource(this.$route.query.keywords, 1000, 30, 0)
          .then((response) => {
            this.playlist = response.data.result.playlists;
          })
          .catch((response) => {
            console.log(response);
          });
      },
      //  获取搜索用户
      getUserResource() {
        api.getSearchResource(this.$route.query.keywords, 1002, 30, 0)
          .then((response) => {
            this.user = response.data.result.userprofiles;
          })
          .catch((response) => {
            console.log(response);
          });
      }
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
    @import "search.styl";
</style>
