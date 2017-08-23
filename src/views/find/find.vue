<template>
  <transition name="fade">
    <div class="find-page">
        <tab :line-width=2 active-color='#ce3d3a' defaultColor='#666' bar-active-color='#ce3d3a'
             v-model="index">
          <tab-item :selected="type === item" v-for="(item, index) in tabList"
                    @click="type = item" :key="index" style="background-color: #fdfffe;">{{item}}
          </tab-item>
        </tab>
        <swiper v-model="index" height="100%" :show-dots="false" class="swiper-container" style="width:100%;height: 100%;padding-bottom: 90px;background-color: #eef2f1;">
          <swiper-item :key="1">
            <v-recommend></v-recommend>
          </swiper-item>
          <swiper-item :key="2">
            <v-play-lists></v-play-lists>
          </swiper-item>
          <swiper-item :key="3">
            <v-ranking></v-ranking>
          </swiper-item>
        </swiper>
    </div>
  </transition>
</template>
<script>
  const list = () => ['个性推荐', '歌单', '排行榜'];

  import {Tab, TabItem} from 'vux/src/components/Tab';
  import {Swiper, SwiperItem} from 'vux/src/components/Swiper';
  import vRecommend from './recommend/recommend';
  import vPlayLists from './playLists/playLists';
  import vRanking from './ranking/ranking';

  export default {
    name: 'find',
    data () {
      return {
        index: 0,
        tabList: list(),
        type: '个性推荐'
      };
    },
    components: {
      vPlayLists,
      vRecommend,
      vRanking,
      Tab,
      TabItem,
      Swiper,
      SwiperItem
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/px2rem/px2rem";
  .find-page
    position fixed
    width 100%
    height 100%
    top px2rem(92)
    bottom 0
    .vux-swiper
      height 100%
      overflow initial
    .vux-swiper-item
      overflow-y auto
</style>
