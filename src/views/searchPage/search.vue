<template lang="html">
  <transition name="showRouter">
    <div class="search-page">
      <div class='header-other'>
        <span @click="goBack" class="back"><i class="back-icon"></i></span>
        <div class="input">
          <input v-model="keywords" @keyup.enter="toSearch(keywords)" type="text"  placeholder='搜素音乐、歌手、歌词、用户'>
          <!--<i @click="keywords=''" v-show="keywords!==''&&!isShowHot" class="icon-cancel"></i>-->
        </div>
      </div>
      <div class="hot" v-if="isShowHot">
        热门搜索
        <!--<div class="keywords">-->
          <!--<div v-for="item of hotKeywords" v-text="item" @click="toSearch(item)" class="keyword"></div>-->
        <!--</div>-->
      </div>
      <div v-else class="search-list">
         <tab :line-width=2 active-color='#b72712' defaultColor='#666' bar-active-color='#b72712' v-model="index">
          <tab-item class="vux-center" :selected="type === item" v-for="(item, index) in tabList" @click="type = item" :key="index">{{item}}</tab-item>
        </tab>
        <swiper v-model="index" height="100%" :show-dots="false">
          <swiper-item :key="1">
            <div class="tab-swiper vux-center">
              <v-single-list></v-single-list>
            </div>
          </swiper-item>
          <swiper-item :key="2">
            <div class="tab-swiper vux-center">
              <v-singer-list></v-singer-list>
            </div>
          </swiper-item>
          <swiper-item :key="3">
            <div class="tab-swiper vux-center">
              <v-album-list></v-album-list>
            </div>
          </swiper-item>
          <swiper-item :key="4">
            <div class="tab-swiper vux-center">
              <v-play-lists></v-play-lists>
            </div>
          </swiper-item>
          <swiper-item :key="5">
            <div class="tab-swiper vux-center">
              <v-user-list></v-user-list>
            </div>
          </swiper-item>
        </swiper>
      </div>
    </div>
  </transition>
</template>

<script>
  import { Tab, TabItem } from 'vux/src/components/Tab';
  import { Swiper, SwiperItem } from 'vux/src/components/Swiper';
  import vSingleList from '../../components/list/singleList.vue';
  import vSingerList from '../../components/list/singerList.vue';
  import vAlbumList from '../../components/list/albumList.vue';
  import vPlayLists from '../../components/list/playLists.vue';
  import vUserList from '../../components/list/userList.vue';
  const list = () => ['单曲', '歌手', '专辑', '歌单', '用户'];
  export default {
    name: 'search',
    components: {
      Tab,
      TabItem,
      Swiper,
      SwiperItem,
      vSingleList,
      vSingerList,
      vAlbumList,
      vPlayLists,
      vUserList
    },
    data () {
      return {
        index: 0,
        tabList: list(),
        type: '单曲',
        keywords: '',
        isShowHot: true,
        activeTab: 'singleList'
      };
    },
    methods: {
      goBack () {
        this.$router.push({
          path: '/find'
        });
      },
      toSearch (keywords) {
        this.isShowHot = false;
        if (this.keywords.trim()) {
          this.$router.push({
            path: '/search',
            query: {
              keywords: keywords
            }
          });
        }
      },
      handleTabChange (val) {
        this.$router.push({
          path: '/search',
          query: {
            keywords: this.keywords
          }
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
