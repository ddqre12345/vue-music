<template>
  <transition name="fade">
    <div class="user-detail">
      <div class="user-info" :style="{'background-image': 'url(' + backgroundImage + ')'}">
        <x-header :left-options="{backText: ''}" style="background-color:inherit; width: 100%;">{{userInfo.nickname}}</x-header>
        <img v-lazy="avatarImage + '?param=200y200'" lazy="loading">
        <p class="user-name">
          {{userInfo.nickname}}
          <span class="gender-man" v-if="userInfo.gender === 1"><i class="man-icon"></i></span>
          <span class="gender-female" v-else><i class="female-icon"></i></span>
        </p>
      </div>
      <div class="tab-list">
        <tab :line-width=2 active-color='#b72712' defaultColor='#666' bar-active-color='#b72712' v-model="index">
          <tab-item class="vux-center" :selected="type === item" v-for="(item, index) in tabList" @click="type = item" :key="index">{{item}}</tab-item>
        </tab>
        <swiper v-model="index" height="100%" :show-dots="false">
          <swiper-item :key="0">
          <div class="tab-swiper vux-center">
            <div class="play-lists-detail">
              <ul style="list-style: none;">
                <li v-for="(data, index) in playlist" :key="index">
                  <v-play-lists-card :data="data"></v-play-lists-card>
                </li>
              </ul>
            </div>
          </div>
          </swiper-item>
          <swiper-item :key="1">
            <!--<div class="tab-swiper vux-center">-->
            <!--<div class="hot-single-list">-->
            <!--<ul>-->
            <!--<li v-for="(data, order) in playlist">-->
            <!--<v-single-card :data="data" :order="order"></v-single-card>-->
            <!--</li>-->
            <!--</ul>-->
            <!--</div>-->
            <!--</div>-->
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
  import vPlayListsCard from '../../../components/card/detail/playlists';
  const list = () => ['歌单', '关于TA'];
  export default {
    data () {
      return {
        tName: '歌单',
        type: '歌单',
        tabList: list(),
        index: 0,
        backgroundColor: '',
        userInfo: {},
        playlist: {}
      };
    },
    mounted: function() {
      this.getUserInfo();
    },
    methods: {
      back () {
        this.$router.go(-1);
      },
      getUserInfo () {
        this.$store.commit('update_loading', true);
        api.getUserPlaylistResource(this.$route.params.id)
          .then((response) => {
            this.playlist = response.data.playlist;
            this.userInfo = response.data.playlist[0].creator;
            // $nextTick() 在dom 重新渲染完后执行
            this.$nextTick(() => {
              this.$store.commit('update_loading', false);
            });
          })
          .catch((response) => {
            console.log(response);
          });
      }
    },
    computed: {
      backgroundImage() {
        return '' || (this.userInfo.backgroundUrl + '?param=500y500');
      },
      avatarImage() {
        return '' || this.userInfo.avatarUrl;
      }
    },
    components: {
      Tab,
      TabItem,
      Swiper,
      SwiperItem,
      XHeader,
      vPlayListsCard
    }
  };
</script>
<style lang="less" scoped>
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
  @import "user.styl";
</style>
