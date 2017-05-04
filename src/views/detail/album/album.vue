<template>
  <transition name="fade">
    <div class="album">
      <div class="fixed-title" :style="{'background': 'rgba(183, 39, 18, '+ opacity +')'}" style="transition: opacity .1s;">
        <x-header :left-options="{backText: ''}" style="background-color:transparent">{{tName}}</x-header>
      </div>
      <div class="album-info" :style="{'background-image': 'url(' + albumImage + ')'}">
        <div class="album-info-blur">
          <div class="album-intro">
            <div class="album-image">
              <img v-lazy="albumImage" lazy="loading" alt="专辑图片">
            </div>
            <div class="album-intro-other">
              <p class="album-title">{{album.name}}</p>
              <div class="album-creator">
                <span class="album-nickname">歌手：{{singerName}} ></span>
              </div>
              <p class="publishTime">发行时间：{{album.publishTime}}</p>
            </div>
          </div>
          <div class="album-status">
            <div class="playCount">
              <span class="file"><i class="icon-file"></i></span>
              <span>{{albumInfo.likedCount || 0}}</span>
            </div>
            <div class="commentCount">
              <span class="comment"><i class="icon-comment"></i></span>
              <span>{{albumInfo.commentCount || 0}}</span>
            </div>
            <div class="shareCount">
              <span class="share"><i class="icon-share"></i></span>
              <span>{{albumInfo.shareCount || 0}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="album-holder">
        <div class="play-list">
          <ul>
            <li v-for="(data, order) in songs">
              <v-hot-single-card :data="data" :order="order"></v-hot-single-card>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  import api from '../../../api';
  import { XHeader } from 'vux';
  import vHotSingleCard from '../../../components/card/detail/hotSingleCard';
  export default {
    data () {
      return {
        album: [],
        albumInfo: {},
        singerName: '',
        songs: [],
        tName: '专辑',
        backgroundColor: '',
        opacity: 0
      };
    },
    // 解除keep-alive的缓存
    beforeRouteEnter: (to, from, next) => {
      next(vm => {
        window.onscroll = function (e) {
          let opa = window.pageYOffset / 222;
          if (opa > 1) {
            vm.tName = vm.album.name;
            vm.opacity = 1;
          } else {
            vm.tName = '专辑';
            vm.opacity = 0;
          }
        };
      });
    },
    // 路由离开时清除onscroll事件
    beforeRouteLeave: (to, from, next) => {
      window.onscroll = null;
      next();
    },
    mounted: function() {
      this.getlAlbumDetail();
    },
    methods: {
      back () {
        this.$router.go(-1);
      },
      getlAlbumDetail () {
        this.$store.commit('update_loading', true);
        api.getAlbumResource(this.$route.params.id).then((response) => {
          this.album = response.data.album;
          this.albumInfo = response.data.album.info;
          this.singerName = response.data.album.artist.name;
          this.songs = response.data.songs;
          // $nextTick() 在dom 重新渲染完后执行
          this.$nextTick(() => {
            this.$store.commit('update_loading', false);
          });
        }).catch((error) => {
          console.log('加载歌单信息出错:' + error);
        });
      }
    },
    computed: {
      albumImage () {
        return '' || this.album.picUrl;
      }
    },
    filters: {
    },
    components: {
      XHeader,
      vHotSingleCard
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "album.styl";
</style>
