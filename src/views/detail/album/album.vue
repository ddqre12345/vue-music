<template>
  <transition name="fade">
    <div class="album">
      <div class="fixed-title" :style="{'background': 'rgba(183, 39, 18, '+ opacity +')'}" style="transition: opacity .1s;" v-show="!isShowDetail">
        <x-header :left-options="{backText: ''}" style="background-color:transparent">{{tName}}</x-header>
      </div>
      <div class="album-info" :style="{'background-image': 'url(' + albumImage + ')'}" v-show="!isShowDetail">
        <div class="album-info-blur">
          <div class="album-intro">
            <img v-lazy="albumImage + '?param=200y200'" lazy="loading" alt="专辑图片" class="album-image" @click="showDetail()">
            <div class="album-intro-other">
              <p class="album-title" style="-webkit-box-orient: vertical;">{{album.name}}<span v-show="albumTrans">{{albumTrans}}</span></p>
              <p class="album-nickname" @click="jumpSingerDetail(singerId)">歌手：{{singerName}} ></p>
              <p class="publishTime">发行时间：{{album.publishTime | formatDate}}</p>
            </div>
          </div>
          <div class="album-status">
            <div class="playCount">
              <span class="file"><i class="icon-file"></i></span>
              <span>{{albumInfo.likedCount || 0}}</span>
            </div>
            <div class="commentCount">
              <span class="comment" @click="jumpCommentDetail()"><i class="icon-comment"></i></span>
              <span>{{albumInfo.commentCount || 0}}</span>
            </div>
            <div class="shareCount">
              <span class="share"><i class="icon-share"></i></span>
              <span>{{albumInfo.shareCount || 0}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="album-list" v-show="!isShowDetail">
        <v-play-all :data="commonSongs"></v-play-all>
        <ul>
          <li v-for="(data, order) in songs" :key="order">
            <v-hot-single-card :data="data" :order="order"></v-hot-single-card>
          </li>
        </ul>
      </div>
      <v-album-detail :data="album" v-show="isShowDetail"></v-album-detail>
    </div>
  </transition>
</template>
<script>
  import api from '../../../api';
  import { formatDate } from '../../../common/js/date';
  import { XHeader } from 'vux';
  import vPlayAll from '../../../components/playAll/playAll.vue';
  import vHotSingleCard from '../../../components/card/detail/hotSingleCard';
  import vAlbumDetail from './albumDetail';
  export default {
    data () {
      return {
        album: {},
        albumInfo: {},
        singerId: '',
        singerName: '',
        songs: [],
        commonSongs: [],
        tName: '专辑',
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
      let self = this;
      this.getlAlbumDetail();
      this.$root.$on('close-detail', (condition) => {
        self.isShowDetail = condition;
      });
    },
    methods: {
      back () {
        this.$router.go(-1);
      },
      jumpSingerDetail(id) {
        this.$router.push({
          path: '/singer/' + id
        });
      },
      jumpCommentDetail () {
        this.$router.push({
          path: '/albumComment/' + this.$route.params.id
        });
      },
      showDetail () {
        this.isShowDetail = true;
      },
      getlAlbumDetail () {
        this.$store.commit('update_loading', true);
        api.getAlbumResource(this.$route.params.id).then((response) => {
          this.album = response.data.album;
          this.albumInfo = response.data.album.info;
          this.singerId = response.data.album.artist.id;
          this.singerName = response.data.album.artist.name;
          this.songs = response.data.songs;
          this.songsToCommon(this.songs);
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
        this.commonSongs = items.map(function (item, index, array) {
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
      albumImage () {
        return '' || (this.album.picUrl + '?param=500y500');
      },
      albumTrans () {
        if (this.album.alias && this.album.alias[0]) {
          return '(' + this.album.alias[0] + ')';
        } else {
          return '';
        }
      }
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy.MM.dd');
      }
    },
    components: {
      XHeader,
      vPlayAll,
      vHotSingleCard,
      vAlbumDetail
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "album.styl";
</style>
