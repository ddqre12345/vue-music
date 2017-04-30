<template>
  <transition name="fade">
    <div class="wrap">
      <mu-linear-progress color="#b72712"  v-if="isloading"/>
      <div class="album" v-else>
        <x-header :left-options="{backText: ''}" style="background-color:#b72712">{{album.name}}</x-header>
        <div class="album-info" :style="{'background-image': 'url(' + albumImage + ')'}">
          <div class="album-intro">
            <div class="album-image">
              <img v-lazy="albumImage" lazy="loading" alt="专辑图片">
            </div>
            <div class="album-intro-other">
              <p class="album-title">{{album.name}}</p>
              <div class="album-creator">
                <span class="album-nickname">歌手：{{album.artist.name}} ></span>
              </div>
              <p class="publishTime">发行时间：{{album.publishTime}}</p>
            </div>
          </div>
          <div class="album-status">
            <div class="playCount">
              <span class="file"><i class="icon-file"></i></span>
              <span>{{album.info.playCount || 0}}</span>
            </div>
            <div class="commentCount">
              <span class="comment"><i class="icon-comment"></i></span>
              <span>{{album.info.commentCount || 0}}</span>
            </div>
            <div class="shareCount">
              <span class="share"><i class="icon-share"></i></span>
              <span>{{album.info.shareCount || 0}}</span>
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
        isloading: true,
        albumInfo: {},
        songs: [],
        tName: '歌单',
        creator: {},
        data: [],
        index: '',
        backgroundColor: ''
      };
    },
    mounted: function() {
      this.getlAlbumDetail();
    },
    methods: {
      back () {
        this.$router.go(-1);
      },
      getlAlbumDetail () {
        this.isloading = true;
        api.getAlbumResource(this.$route.params.id).then((response) => {
          this.album = response.data.album;
          this.songs = response.data.album.songs;
          this.isloading = false;
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
      formatCount (v) {
        if (v < 9999) {
          return v;
        } else {
          return (v / 10000).toFixed(0) + '万';
        }
      }
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
