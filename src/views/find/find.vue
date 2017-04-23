<template>
    <div>
      <div class="fixed-bar">
        <mu-tabs :value="activeTab" @change="handleTabChange" class="view-tabs">
          <mu-tab value="rage" title="个性推荐"/>
          <mu-tab value="songList" title="歌单"/>
          <!--<mu-tab value="leaderBoard" title="排行榜"/>-->
          <!--<mu-tab value="hotSinger" title="热门歌手"/>-->
        </mu-tabs>
      </div>
      <div class="default-view" :class="{view: songList.length > 0}">
         <router-view></router-view>
      </div>
    </div>
</template>
<script>
  import { mapGetters } from 'vuex';
  export default {
    data () {
      return {
        activeTab: 'rage'
      };
    },
    created () {
      // 当created函数时监测路由信息,防止页面刷新tab高亮错误
      let tmpArr = this.$route.path.split('/');
      if (tmpArr[1] === 'find') {
        this.handleTabChange(tmpArr[2]);
      }
    },
    // watch函数监测路由的变化,保持tab面板的高亮位置正确
    watch: {
      '$route' (to, from) {
        const path = to.path;
        let tmpArr = path.split('/');
        if (tmpArr[1] === 'find') {
          this.handleTabChange(tmpArr[2]);
        }
      }
    },
    methods: {
      handleTabChange (val) {
        console.log(val);
        this.activeTab = val;
        this.$router.push({ path: '/find/' + val });
      }
    },
    computed: {
      ...mapGetters([
        'songList'
      ])
    }
  };
</script>
<style lang="less" scoped>
  @import "../../assets/theme.less";
</style>
<style lang="stylus" rel="stylesheet/stylus">
  @import 'find.styl';
</style>
