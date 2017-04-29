<template>
  <transition name="fade">
    <div class="wrap">
      <mu-linear-progress color="#b72712"  v-if="isloading"/>
      <div class="playlist" v-else>
        <div class="fixed-title">
          <mu-appbar>
            <mu-icon-button icon='arrow_back' @click="back" slot="left"/>
            <div class="playlist-title">
              <div class="play-name"><span>{{tName}}</span></div>
            </div>
          </mu-appbar>
        </div>
        <div class="playlist-info" :style="{'background-image': 'url(' + playListImage + ')'}">
          <div class="playlist-intro">
            <div class="playlist-image">
              <img v-lazy="playListImage" lazy="loading" alt="歌单图片">
            </div>
            <div class="playlist-intro-other">
              <p class="playlist-title">{{datas.name}}</p>
              <div class="playlist-creator">
                <img v-lazy="creatorImage" lazy="loading">
                <span class="playlist-nickname">{{creator.nickname}} ></span>
              </div>
            </div>
          </div>
          <div class="playlist-status">
            <div class="playCount">
              <span class="file"><i class="icon-file"></i></span>
              <span>{{datas.playCount}}</span>
            </div>
            <div class="commentCount">
              <span class="comment"><i class="icon-comment"></i></span>
              <span>{{datas.commentCount}}</span>
            </div>
            <div class="shareCount">
              <span class="share"><i class="icon-share"></i></span>
              <span>{{datas.shareCount}}</span>
            </div>
          </div>
        </div>
        <div class="playlist-holder">
          <div class="play-list">
            <ul>
              <li v-for="(data, index) in list">
                  <v-single-card :data="data" :index="index"></v-single-card>
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
  import vSingleCard from '../../../components/card/detail/singleCard.vue';
  export default {
    data () {
      return {
        isloading: true,
        datas: {},
        tName: '歌单',
        creator: {},
        data: [],
        index: '',
        backgroundColor: ''
      };
    },
    mounted: function() {
      this.getPlayListDetail();
    },
    methods: {
      back () {
        this.$router.go(-1);
      },
      getPlayListDetail () {
        this.isloading = true;
        api.getPlaylistDetailResource(this.$route.params.id).then((response) => {
          this.datas = response.data.playlist;
          this.list = response.data.playlist.tracks;
          this.creator = this.nickname = response.data.playlist.creator;
          this.nickname = response.data.playlist.creator.nickname;
          this.isloading = false;
        }).catch((error) => {
          console.log('加载歌单信息出错:' + error);
        });
      }
    },
    computed: {
      playListImage() {
        return '' || this.datas.picUrl;
      },
      creatorImage() {
        return '' || this.creator.avatarUrl;
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
      vSingleCard
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "playlists.styl";
</style>
