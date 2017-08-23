<template>
  <div class="playLists-area">
    <button-tab v-model="index">
      <button-tab-item @on-item-click="selectType()">最新</button-tab-item>
      <button-tab-item @on-item-click="selectType()">最热</button-tab-item>
    </button-tab>
    <div class="playLists">
      <ul class="item-list">
        <li class="item" v-for="(data, index) in playlists" :key="index">
          <v-play-list :data="data"></v-play-list>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import api from '../../../api/index';
  import { ButtonTab, ButtonTabItem } from 'vux';
  import vPlayList from 'components/card/findCard/playList/playList';
  export default {
    name: 'v-play-lists',
    data () {
      return {
        index: 0,
        keys: 'new',
        playlists: []
      };
    },
    mounted: function() {
      this.getTopPlaylistResource();
    },
    methods: {
      selectType () {
        this.keys = this.index ? 'hot' : 'new';
        this.getTopPlaylistResource();
      },
      getTopPlaylistResource() {
        this.$store.commit('update_loading', true);
        api.getTopPlaylistResource(this.keys, 20, 0).then((response) => {
          this.playlists = response.data.playlists;
          // $nextTick() 在dom 重新渲染完后执行
          this.$nextTick(() => {
            this.$store.commit('update_loading', false);
          });
        })
        .catch((response) => {
          console.log(response);
        });
      }
    },
    components: {
      vPlayList,
      ButtonTab,
      ButtonTabItem
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/styles/variable';
  @import "~common/px2rem/px2rem";
  .playLists-area
    width 100%
    height 100%
    .vux-button-group
      width 50%
      margin px2rem(20) auto
      .vux-button-group-current
        background $color-redLight
      .vux-button-tab-item-first
          &:after
            border 1px solid $color-redLight
            color $color-redLight
      .vux-button-tab-item-last
          &:after
            border 1px solid $color-redLight
    .playLists
      .item-list
        display flex
        flex-direction row
        justify-content space-between
        flex-flow row wrap
        .item
          padding-top px2rem(20)
          flex 0 0 49%
</style>
