<template>
  <transition name="fade">
    <div class="playlist">
      <div class="fixed-title" :style="{'background': 'rgba(183, 39, 18, '+ opacity +')'}" style="transition: opacity .1s;" v-show="!isShowDetail">
        <x-header :left-options="{backText: ''}" style="background-color:transparent">{{tName}}</x-header>
      </div>
      <div class="playlist-info" :style="{'background-image': 'url(' + playListImage + '?param=500y500'+ ')'}" v-show="!isShowDetail">
        <div class="playlist-info-blur">
            <div class="playlist-intro">
              <img v-lazy="playListImage" class="playlist-image" lazy="loading" alt="photo" @click="showDetail()">
              <div class="playlist-intro-other">
                <p class="playlist-title" style="-webkit-box-orient: vertical;">{{playlist.name}}</p>
                <div class="playlist-creator" @click="jumpUserDetail(creator.userId)">
                  <img v-lazy="creatorImage + '?param=100y100'" lazy="loading">
                  <span class="playlist-nickname" style="-webkit-box-orient: vertical;">{{creator.nickname}}</span>
                  <span class="more"> > </span>
                </div>
              </div>
            </div>
            <div class="playlist-status">
              <div class="playCount">
                <span class="file"><i class="icon-file"></i></span>
                <span>{{playlist.playCount}}</span>
              </div>
              <div class="commentCount">
                <span class="comment" @click="jumpCommentDetail()"><i class="icon-comment"></i></span>
                <span>{{playlist.commentCount}}</span>
              </div>
              <div class="shareCount">
                <span class="share"><i class="icon-share"></i></span>
                <span>{{playlist.shareCount}}</span>
              </div>
            </div>
        </div>
      </div>
      <div class="play-list" v-show="!isShowDetail">
          <v-play-all :data="commonSongs"></v-play-all>
          <ul>
            <li v-for="(data, index) in list" :key='index'>
                <v-single-card :data="data" :index="index"></v-single-card>
            </li>
          </ul>
      </div>
      <v-play-list-detail :data="playlist" v-show="isShowDetail"></v-play-list-detail>
    </div>
  </transition>
</template>
<script>
  import api from '../../../api';
  import { XHeader } from 'vux';
  import vPlayAll from '../../../components/playAll/playAll.vue';
  import vSingleCard from '../../../components/card/detail/singleCard.vue';
  import vPlayListDetail from './playListDetail';
  export default {
    data () {
      return {
        playlist: {},
        tName: '歌单',
        creator: {},
        data: [],
        index: '',
        list: [],
        commonSongs: [],
        backgroundColor: '',
        opacity: 0,
        isShowDetail: false
      };
    },
    // 解除keep-alive的缓存
    beforeRouteEnter: (to, from, next) => {
      next(vm => {
        window.onscroll = () => {
          let opa = window.pageYOffset / 222;
          if (opa > 1) {
              vm.tName = vm.playlist.name;
              vm.opacity = 1;
          } else {
              vm.tName = '歌单';
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
      let self = this;
      this.getPlayListDetail();
      this.$root.$on('close-detail', (condition) => {
        self.isShowDetail = condition;
      });
    },
    methods: {
      showDetail () {
        this.isShowDetail = true;
      },
      jumpUserDetail(id) {
        this.$router.push({
          path: '/user/' + id
        });
      },
      jumpCommentDetail() {
        this.$router.push({
          path: '/playListComment/' + this.$route.params.id
        });
      },
      getPlayListDetail () {
        this.$store.commit('update_loading', true);
        api.getPlaylistDetailResource(this.$route.params.id).then((response) => {
          this.playlist = response.data.playlist;
          this.list = response.data.playlist.tracks;
          this.creator = response.data.playlist.creator;
          this.songsToCommon(this.list);
          // $nextTick() 在dom 重新渲染完后执行
          this.$nextTick(() => {
            this.$store.commit('update_loading', false);
          });
        }).catch((error) => {
          console.log('加载歌单信息出错:' + error);
        });
      },
      songsToCommon (items) {
        let vm = this;
        this.commonSongs = items.map(function (item) {
          return {
            'id': item.id,
            'name': item.name,
            'singer': vm.getAuthorList(item.ar),
            'albumPic': item.al.picUrl,
            'location': '',
            'album': item.al.id
          };
        });
      },
      getAuthorList(authorInfo) {
        return authorInfo.map(function (item) {
          return item.name;
        }).toString();
      }
    },
    computed: {
      playListImage() {
        return '' || (this.playlist.picUrl);
      },
      creatorImage() {
        return '' || this.creator.avatarUrl;
      }
    },
    components: {
      XHeader,
      vPlayAll,
      vSingleCard,
      vPlayListDetail
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "playlists.styl";
</style>
