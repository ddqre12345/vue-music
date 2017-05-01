<template>
    <div class="find-page">
        <tab :line-width=2 active-color='#b72712' defaultColor='#666' bar-active-color='#b72712'
             v-model="index">
          <tab-item class="vux-center" :selected="type === item" v-for="(item, index) in tabList"
                    @click="type = item" :key="index">{{item}}
          </tab-item>
        </tab>
        <swiper v-model="index" height="100%" :show-dots="false" class="swiper-container" style="width:100%;height: 100%;padding-bottom: 100px;">
          <swiper-item :key="1">
            <div class="tab-swiper vux-center">
              <v-recommend :playlists="playlists" :activitys="activitys" :MVs="MVs"></v-recommend>
            </div>
          </swiper-item>
          <swiper-item :key="2">
            <div class="tab-swiper vux-center">
              <v-play-lists></v-play-lists>
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
  import api from '../../api/index';
  import {Tab, TabItem} from 'vux/src/components/Tab';
  import {Swiper, SwiperItem} from 'vux/src/components/Swiper';
  import vRecommend from './recommend/recommend';
  import vPlayLists from './playLists/playLists';
  const list = () => ['个性推荐', '歌单', '排行榜'];
  export default {
    name: 'find',
    components: {
      vPlayLists,
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
        type: '个性推荐',
        playlists: [],
        activitys: [],
        MVs: []
      };
    },
    mounted () {
      this.getPersonalizedResource();
      this.getPrivatecontentResource();
      this.getPersonalizedMvResource();
    },
    methods: {
      getPersonalizedResource() {
        api.getPersonalized().then((response) => {
          this.playlists = response.data.result;
        })
          .catch((response) => {
            console.log(response);
          });
      },
      getPrivatecontentResource() {
        api.getPrivatecontent().then((response) => {
          this.activitys = response.data.result;
        })
          .catch((response) => {
            console.log(response);
          });
      },
      getPersonalizedMvResource() {
        api.getPersonalizedMv().then((response) => {
          this.MVs = response.data.result;
        })
          .catch((response) => {
            console.log(response);
          });
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import 'find.styl';
</style>
