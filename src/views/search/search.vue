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
                        <div class="tab-swiper vux-center search-area">
                          <v-single-list :songs="songs"></v-single-list>
                        </div>
                    </swiper-item>
                    <swiper-item :key="2">
                        <div class="tab-swiper vux-center search-area">
                          <v-singer-list :singer="singer"></v-singer-list>
                        </div>
                    </swiper-item>
                    <swiper-item :key="3">
                        <div class="tab-swiper vux-center search-area">
                          <v-album-list :albums="albums"></v-album-list>
                        </div>
                    </swiper-item>
                    <swiper-item :key="4">
                        <div class="tab-swiper vux-center search-area">
                          <v-play-lists :playlist="playlist"></v-play-lists>
                        </div>
                    </swiper-item>
                    <swiper-item :key="5">
                        <div class="tab-swiper vux-center search-area">
                          <v-user-list :user="user"></v-user-list>
                        </div>
                    </swiper-item>
                    <swiper-item :key="6">
                        <div class="tab-swiper vux-center search-area">
                          <v-mv-list :MVs="mvs"></v-mv-list>
                        </div>
                    </swiper-item>
                </swiper>
            </div>
        </div>
    </transition>
</template>

<script>
  import api from '../../api/index';
  import {Tab, TabItem} from 'vux/src/components/Tab';
  import {Swiper, SwiperItem} from 'vux/src/components/Swiper';
  import vSingleList from '../../components/list/search/singleList';
  import vSingerList from '../../components/list/search/singerList';
  import vAlbumList from '../../components/list/search/albumList';
  import vPlayLists from '../../components/list/search/playLists';
  import vUserList from '../../components/list/search/userList';
  import vMvList from '../../components/list/search/mvList';
  const list = () => ['单曲', '歌手', '专辑', '歌单', '用户', 'MV'];
  const hotKeywordsList = () => ['清白之年', '我喜欢上你时的内心活动', '我想和你唱',
    'hyukoh', '童话镇', '陈奕迅', '漂洋过海来看你', '许嵩', '成都', '林俊杰'];
  export default {
    name: 'search',
    data () {
      return {
        index: 0,
        tabList: list(),
        hotKeywords: hotKeywordsList(),
        type: '单曲',
        keywords: '',
        isShowHot: true,
        songs: [],
        singer: [],
        albums: [],
        playlist: [],
        user: [],
        mvs: []
      };
    },
    // watch $route 决定是否清除关键词
    watch: {
      '$route' (to, from) {
        if (from.name === 'find') {
            this.keywords = '';
            this.isShowHot = true;
        }
      }
    },
    methods: {
      initSearchList () {
        this.getSingleResource(); //  获取搜索单曲
        this.getAlbumResource(); //  获取搜索专辑
        this.getSingerResource(); //  获取搜索歌手
        this.getPlayListResource(); //  获取搜索歌单
        this.getUserResource(); //  获取搜索用户
        this.getMvResource(); // 获取搜索MV
      },
      goBack () {
        this.$router.push({
          path: '/find'
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
          this.initSearchList();
        }
      },
      //  获取搜索单曲
      getSingleResource() {
        this.$store.commit('update_loading', true);
        api.getSearchResource(this.$route.query.keywords, 1, 30, 0)
          .then((response) => {
            this.songs = response.data.result.songs;
            // $nextTick() 在dom 重新渲染完后执行
            this.$nextTick(() => {
              this.$store.commit('update_loading', false);
            });
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
      },
      //  获取搜索MV
      getMvResource() {
        api.getSearchResource(this.$route.query.keywords, 1004, 30, 0)
          .then((response) => {
            this.mvs = response.data.result.mvs;
          })
          .catch((response) => {
            console.log(response);
          });
      }
    },
    components: {
      Tab,
      TabItem,
      Swiper,
      SwiperItem,
      vSingleList,
      vSingerList,
      vAlbumList,
      vPlayLists,
      vUserList,
      vMvList
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "search.styl";
</style>
