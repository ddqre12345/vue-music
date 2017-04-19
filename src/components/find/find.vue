<template lang="html">
  <transition name="showRouter">
    <div class="find">
      <div class='header-other'>
        <span @click="goBack" class="back"><i class="back-icon"></i></span>
        <div class="input">
          <input v-model="keywords" @keyup.enter="toSearch(keywords)" v-bind:class="{'input-focus': !isShowHot}" type="text"  placeholder='搜素音乐、歌手、歌词、用户'>
          <i @click="keywords=''" v-show="keywords!==''&&!isShowHot" class="icon-cancel"></i>
        </div>
      </div>
      <div class="hot" v-if="isShowHot">
        热门搜索
        <!--<div class="keywords">-->
          <!--<div v-for="item of hotKeywords" v-text="item" @click="toSearch(item)" class="keyword"></div>-->
        <!--</div>-->
      </div>
      <div v-else class="search-list">
        <div class="fixed-bar">
          <mu-tabs :value="activeTab" @change="handleTabChange" class="view-tabs">
            <mu-tab value="singleList" title="单曲"/>
            <mu-tab value="singerLists" title="歌手"/>
            <mu-tab value="albumLists" title="专辑"/>
            <mu-tab value="playLists" title="歌单"/>
            <mu-tab value="userLists" title="用户"/>
          </mu-tabs>
        </div>
        <div class="default-view">
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
  },
  mounted () {
  },
  computed: {
  },
  data () {
    return {
      keywords: '',
      isShowHot: true,
      activeTab: 'singleList'
    };
  },
  watch: {

  },
  methods: {
    goBack () {
      this.$router.push({
        path: '/index'
      });
    },
    toSearch (keywords) {
      if (this.keywords.trim()) {
        console.log(this.keywords);
        this.isShowHot = false;
        this.activeTab = 'singleList';
        this.$router.push({
          path: '/find/singleList',
          query: {
            keywords: keywords
          }
        });
      }
    },
    handleTabChange (val) {
      this.activeTab = val;
      this.$router.push({
        path: '/find/' + val,
        query: {
          keywords: this.keywords
        }
      });
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "find.styl";
</style>
