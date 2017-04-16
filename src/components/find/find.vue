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
      <div v-if="false" class="hot">
        热门搜索
        <div class="keywords">
          <div v-for="item of hotKeywords" v-text="item" @click="toSearch(item)" class="keyword"></div>
        </div>
      </div>

      <div v-else class="search-list" @touchmove="$store.commit('showMiniMusic', false)">
        <div class="fixed-bar">
          <mu-tabs :value="activeTab" @change="handleTabChange" class="view-tabs">
            <mu-tab value="singleList" title="单曲"/>
            <mu-tab value="singerLists" title="歌手"/>
            <mu-tab value="albumLists" title="专辑"/>
            <mu-tab value="playLists" title="歌单"/>
            <mu-tab value="userLists" title="用户"/>
          </mu-tabs>
        </div>
        <div class="default-view" :class="{view: songList.length > 0}">
          <div v-show="isLoading" class="loading"><i class="icon-loading"></i>搜索中...</div>
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </div>
      </div>
    </div>
  </transition>

</template>

<script>
export default {
  name: 'find',
  created () {
    this.axios.get('/api/hot')
      .then(res => {
        this.hotKeywords = res.data
      })
      // 当created函数时监测路由信息,防止页面刷新tab高亮错误
    var tmpArr = this.$route.path.split('/')
    if (tmpArr[1] === 'index') {
      this.handleTabChange(tmpArr[2])
    }
  },
  mounted () {
    this.$store.commit('changeLinkBorderIndex', 2)
  },
  computed: {
    musicData () {
      return this.$store.state.musicData
    }
  },
  data () {
    return {
      activeTab: 'singleList'
    }
  },
  watch: {
    musicData: {
      deep: true
    },
    searchHistory: {
      deep: true
    },
    '$route' (to, from) {
      const path = to.path
      var tmpArr = path.split('/')
      if (tmpArr[1] === 'search') {
        this.handleTabChange(tmpArr[2])
      }
    }
  },
  methods: {
    toSearch (keywords) {
      if (keywords.trim()) {
        this.isShowHistory = false
        this.isShowHot = false
        this.playIndex = null
        this.isLoading = true
        this.keywords = keywords
        this.axios.get('/api//search/100/' + keywords)
          .then(res => res.data.data.song)
          .then(song => {
            this.musicList = song.list
            this.isLoading = false
            this.searchHistory.unshift(keywords)
          })
      }
    },
    handleTabChange (val) {
      this.activeTab = val
      this.$router.push({ path: '/search/' + val })
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "find.styl";
</style>
