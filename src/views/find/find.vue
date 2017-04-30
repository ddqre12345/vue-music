<template>
    <div class="find-page">
        <tab :line-width=2 active-color='#b72712' defaultColor='#666' bar-active-color='#b72712'
             v-model="index">
          <tab-item class="vux-center" :selected="type === item" v-for="(item, index) in tabList"
                    @click="type = item" :key="index">{{item}}
          </tab-item>
        </tab>
        <swiper v-model="index" height="100%" :show-dots="false" class="swiper-container" style="height: 100%">
          <swiper-item :key="1">
            <div class="tab-swiper vux-center">
              <v-recommend></v-recommend>
            </div>
          </swiper-item>
          <swiper-item :key="2">
            <div class="tab-swiper vux-center">
              <!--<div class="singer-list">-->
                <!--<ul>-->
                  <!--<li v-for="data in singer">-->
                    <!--<v-singer-card :data="data"></v-singer-card>-->
                  <!--</li>-->
                <!--</ul>-->
              <!--</div>-->
            </div>
          </swiper-item>
          <swiper-item :key="3">
            <div class="tab-swiper vux-center">
              <!--<div class="album-list">-->
                <!--<ul>-->
                  <!--<li v-for="data in albums">-->
                    <!--<v-album-card :data="data"></v-album-card>-->
                  <!--</li>-->
                <!--</ul>-->
              <!--</div>-->
            </div>
          </swiper-item>
        </swiper>
    </div>
</template>
<script>
//  import { mapGetters } from 'vuex';
//  import api from '../../api/index';
  import {Tab, TabItem} from 'vux/src/components/Tab';
  import {Swiper, SwiperItem} from 'vux/src/components/Swiper';
  import vRecommend from './recommend/recommend';
  const list = () => ['个性推荐', '歌单', '排行榜'];
  export default {
    name: 'find',
    components: {
      vRecommend,
      Tab,
      TabItem,
      Swiper,
      SwiperItem
    },
    data () {
      return {
        index: 0,
        tabList: list(),
        type: '个性推荐'
      };
    },
    created () {

    },
    // watch函数监测路由的变化,保持tab面板的高亮位置正确
    watch: {

    },
    methods: {
    },
    computed: {

    }
  };
</script>
<style lang="less" scoped>
  @import "../../assets/theme.less";
</style>
<style lang="stylus" rel="stylesheet/stylus">
  @import 'find.styl';
</style>
