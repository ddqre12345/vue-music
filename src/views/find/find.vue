<template>
  <transition name="fade">
    <div class="find-page">
        <tab :line-width=2 active-color='#b72712' defaultColor='#666' bar-active-color='#b72712'
             v-model="index">
          <tab-item class="vux-center" :selected="type === item" v-for="(item, index) in tabList"
                    @click="type = item" :key="index" style="background-color: #fdfffe;">{{item}}
          </tab-item>
        </tab>
        <swiper v-model="index" height="100%" :show-dots="false" class="swiper-container" style="width:100%;height: 100%;padding-bottom: 90px;background-color: #eef2f1;">
          <swiper-item :key="1">
            <div class="tab-swiper vux-center">
              <v-recommend></v-recommend>
            </div>
          </swiper-item>
          <swiper-item :key="2">
            <div class="tab-swiper vux-center">
              <v-play-lists></v-play-lists>
            </div>
          </swiper-item>
          <swiper-item :key="3">
            <div class="tab-swiper vux-center">
              <v-ranking></v-ranking>
            </div>
          </swiper-item>
        </swiper>
    </div>
  </transition>
</template>
<script>
  import {Tab, TabItem} from 'vux/src/components/Tab';
  import {Swiper, SwiperItem} from 'vux/src/components/Swiper';
  import vRecommend from './recommend/recommend';
  import vPlayLists from './playLists/playLists';
  import vRanking from './ranking/ranking';
  const list = () => ['个性推荐', '歌单', '排行榜'];
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
  @import 'find.styl';
</style>
