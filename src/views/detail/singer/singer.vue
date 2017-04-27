<template>
    <transition name="fade">
        <div class="wrap">
            <x-header :left-options="{backText: ''}">{{tName}}</x-header>
            <div class="playlist-info" :style="{'background-image': 'url(' + playListImage + ')'}">
                <div class="singer-page">个人主页</div>
            </div>
            <div class="playlist">
                <tab :line-width=2 active-color='#b72712' defaultColor='#666' bar-active-color='#b72712' v-model="index">
                    <tab-item class="vux-center" :selected="type === item" v-for="(item, index) in tabList" @click="type = item" :key="index">{{item}}</tab-item>
                </tab>
                <swiper v-model="index" height="100%" :show-dots="false">
                    <swiper-item :key="1">
                        <div class="tab-swiper vux-center">
                            <v-single-list></v-single-list>
                        </div>
                    </swiper-item>
                    <swiper-item :key="2">
                        <div class="tab-swiper vux-center">
                            <v-singer-list></v-singer-list>
                        </div>
                    </swiper-item>
                </swiper>
            </div>
        </div>
    </transition>
</template>
<script>
  import api from '../../../api';
  import { mapGetters } from 'vuex';
  import { XHeader } from 'vux/src/components/XHeader';
  import vSingleList from '../../../components/list/singleList.vue';
  import vAlbumList from '../../../components/list/albumList.vue';
  const list = () => ['热门50', '专辑'];
  export default {
    data () {
      return {
        tabList: list(),
        isloading: true,
        datas: {},
        tName: '歌单',
        creator: {},
        list: [],
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
      },
      playAudio (song) {
        document.getElementById('audioPlay').pause();
        this.$store.commit('pause');
        // this.$parent.$refs.alert.show('tess')
        let audio = {};
        audio.id = song.id;  // id
        audio.singer = song.ar[0].name; // 演唱者
        audio.albumPic = song.al.picUrl;
        audio.name = song.name;
        // 通过Vuex改变状态
        this.$store.commit('addToList', audio);
        this.$store.dispatch('getSong', audio.id);
      },
      // 播放全部
      playAll () {
        // 添加专辑内所有歌曲到一个新数组
        let items = [];
        this.list.forEach((item) => {
          items.push({
            albumPic: item.al.picUrl,
            id: item.id,
            name: item.al.name,
            singer: item.ar[0].name
          });
        });
        this.$store.commit('addToList', items);
      }
    },
    computed: {
      ...mapGetters([
        'songList'
      ]),
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
      XHeader
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
    @import "playListDetail.styl";
</style>
