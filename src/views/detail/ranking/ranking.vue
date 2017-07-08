<template>
  <transition name="fade">
    <div class="playlist">
      <div class="fixed-title" :style="{'background': 'rgba(183, 39, 18, '+ opacity +')'}" style="transition: opacity .1s;">
        <x-header :left-options="{backText: ''}" style="background-color:transparent">{{tName}}</x-header>
      </div>
      <div class="playlist-info" :style="{'background-image': 'url(' + playListImage + '?param=500y500'+ ')'}">
        <div class="playlist-info-blur">
            <div class="intro-area">
              <img v-lazy="playListImage"  class="image" lazy="loading" alt="photo">
              <div class="intro">
                <p class="title" style="-webkit-box-orient: vertical;">{{datas.name}}</p>
                <p class="updateTime">最近更新:{{datas.updateTime | formatDate}}</p>
                <div class="creator"  @click="jumpUserDetail(creator.userId)">
                  <img v-lazy="creatorImage + '?param=100y100'" lazy="loading">
                  <span class="nickname" style="-webkit-box-orient: vertical;">{{creator.nickname}}</span>
                  <span class="more"> > </span>
                </div>
              </div>
            </div>
            <div class="playlist-status">
              <div class="playCount">
                <span class="file"><i class="icon-file"></i></span>
                <span>{{datas.subscribedCount | countHandle}}</span>
              </div>
              <div class="commentCount" @click="jumpCommentDetail()">
                <span class="comment"><i class="icon-comment"></i></span>
                <span>{{datas.commentCount | countHandle}}</span>
              </div>
              <div class="shareCount">
                <span class="share"><i class="icon-share"></i></span>
                <span>{{datas.shareCount | countHandle}}</span>
              </div>
            </div>
        </div>
      </div>
      <div class="play-list">
        <v-single-list :list="list"></v-single-list>
      </div>
    </div>
  </transition>
</template>
<script>
  import api from '../../../api';
  import { countHandle } from '../../../common/js/data';
  import { formatDate } from '../../../common/js/date';
  import { XHeader } from 'vux';
  import vSingleList from '../../../components/list/detail/ranking/singleList';
  export default {
    data () {
      return {
        datas: {},
        tName: '歌单',
        creator: {},
        data: [],
        list: [],
        backgroundColor: '',
        opacity: 0
      };
    },
    // 解除keep-alive的缓存
    beforeRouteEnter: (to, from, next) => {
      next(vm => {
        window.onscroll = () => {
          let opa = window.pageYOffset / 222;
          if (opa > 1) {
              vm.tName = vm.datas.name;
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
      this.getTopListDetail();
    },
    methods: {
      jumpUserDetail(id) {
        this.$router.push({
          path: '/user/' + id
        });
      },
      jumpCommentDetail() {
        this.$router.push({
          path: '/rankingComment/' + this.datas.id
        });
      },
      getTopListDetail () {
        this.$store.commit('update_loading', true);
        api.getTopListResource(this.$route.params.idx).then((response) => {
          console.log(response);
          this.datas = response.data.result;
          this.list = response.data.result.tracks;
          this.creator = response.data.result.creator;
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
      playListImage() {
        return '' || this.datas.coverImgUrl;
      },
      creatorImage() {
        return '' || this.creator.avatarUrl;
      }
    },
    filters: {
      countHandle(count) {
        return countHandle(count);
      },
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'MM月dd日');
      }
    },
    components: {
      XHeader,
      vSingleList
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "ranking.styl";
</style>
