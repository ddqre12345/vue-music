<template lang="html">
  <transition name="showRouter">
    <div class="find">
      <div class='header-other'>
        <span @click="goBack" class="back"><i class="back-icon"></i></span>
        <div class="input">
          <input v-model="keywords" @keyup.enter="toSearch(keywords)" @focus="inputFocus" v-bind:class="{'input-focus': !isShowHot}" type="text"  placeholder='搜素音乐、歌手、歌词、用户'>
          <i @click="keywords=''" v-show="keywords!==''&&!isShowHot" class="icon-cancel"></i>
        </div>
      </div>
      <!-- 热门搜索 -->
      <div v-if="isShowHot" class="hot">
        热门搜索
        <div class="keywords">
          <div v-for="item of hotKeywords" v-text="item" @click="toSearch(item)" class="keyword"></div>
        </div>
      </div>

      <div v-else class="search-list" @touchmove="$store.commit('showMiniMusic', false)">

        <!-- 搜索历史 -->
        <div v-show="isShowHistory" v-for="(item, index) of searchHistory" class="history">
          <div class="icon"><i class="icon-history"></i></div>
          <div @click="toSearch(item)" class="word">{{item}}</div>
          <div class="icon"><i @click="searchHistory.splice(index, 1)" class="icon-del"></i></div>
        </div>

        <div v-show="isShowHistory&&searchHistory.length" @click="searchHistory=[]" class="tips">清除搜索记录</div>

        <div v-show="isLoading" class="loading"><i class="icon-loading"></i>搜索中...</div>
        <div @click="playMusic(index, (item.f.split('|')[3]&&strDecode(item.f.split('|')[3].replace(/amp\;/g, '')).replace(/\;/g, '/') || '佚名')+' - '+strDecode(item.fsong), item.f.split('|')[0], item.f.split('|')[4]&&'http://imgcache.qq.com/music/photo/album_300/'+item.f.split('|')[4]%100+'/300_albumpic_'+item.f.split('|')[4]+'_0.jpg')" v-for="(item, index) of musicList" class="music">
          <div class="icon-music">
            <img :src="item.f.split('|')[4]&&'http://imgcache.qq.com/music/photo/album_300/'+item.f.split('|')[4]%100+'/300_albumpic_'+item.f.split('|')[4]+'_0.jpg'" alt="microzz.com">
          </div>
          <div class="music-info">
            <div class="music-name">{{strDecode(item.fsong)}}</div>
            <div class="music-singer">{{item.f.split('|')[3]&&strDecode(item.f.split('|')[3].replace(/amp\;/g, '')).replace(/\;/g, '/') || '佚名'}}</div>
            <i v-show="index === playIndex" class="icon-listening"></i>
          </div>
        </div>
        <div v-show="musicList.length" class="tips">没有更多结果了～</div>
      </div>
    </div>
  </transition>

</template>

<script>
export default {
  name: 'find',
  beforeCreate() {
    this.$store.commit('showMiniMusic', true);
  },
  created() {
    this.axios.get('/api/hot')
      .then(res => {
        this.hotKeywords = res.data;
      })
  },
  mounted() {
    this.$store.commit('changeLinkBorderIndex', 2);
  },
  computed: {
    musicData() {
      return this.$store.state.musicData;
    }
  },
  data() {
    return {
      keywords: '',
      hotKeywords: [],
      isShowHot: true,
      musicList: [],
      playIndex: '',
      isLoading: false,
      isShowHistory: false,
      searchHistory: (localStorage.searchHistory && JSON.parse(localStorage.searchHistory)) || []
    }
  },
  watch: {
    musicData: {
      handler(val, oldVal) {
        localStorage.musics = JSON.stringify(val);
      },
      deep: true
    },
    searchHistory: {
      handler(val) {
        localStorage.searchHistory = JSON.stringify(val);
      },
      deep: true
    }
  },
  methods: {
    toSearch(keywords) {
      if (keywords.trim()) {
        this.isShowHistory = false;
        this.isShowHot = false;
        this.playIndex = null;
        this.isLoading = true;
        this.$store.commit('showMiniMusic', false);
        this.keywords = keywords;
        this.axios.get('/api//search/100/' + keywords)
          .then(res => res.data.data.song)
          .then(song => {
            this.musicList = song.list;
            this.isLoading = false;
            this.searchHistory.unshift(keywords);
          })
      }
    },
    // 搜索结果点击播放音乐
    playMusic(index, name, src, imgSrc) {
      src = 'http://ws.stream.qqmusic.qq.com/'+src+'.m4a?fromtag=46';
      this.$store.commit('playMusic', {name: name, src: src, imgSrc: imgSrc});
      this.$store.commit('addMusic', {name: name, src: src, musicImgSrc: imgSrc});
      this.$store.commit('showMiniMusic', true);
      this.playIndex = index;
    },
    inputFocus() {
      if (this.keywords.trim()) {
        return;
      }
      else {
        this.isShowHot = false;
        this.isShowHistory = true;
        this.musicList = [];
      }
    },

    // 解码
    strDecode(str) {
      return str.replace(/&#(x)?([^&]{1,5});?/g,function($,$1,$2) {
          return String.fromCharCode(parseInt($2 , $1 ? 16:10));
      });
    },
    goBack() {
      this.$router.go(-1);
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "find.styl";
</style>
