<template>
  <div class="playLists-area">
    <button-tab v-model="keys">
      <button-tab-item @on-item-click="type()">最新</button-tab-item>
      <button-tab-item @on-item-click="type()">最热</button-tab-item>
    </button-tab>
    <div class="playLists">
      <ul>
        <li>
          <v-play-list-card></v-play-list-card>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import { ButtonTab, ButtonTabItem } from 'vux';
  import vPlayListCard from "../../../components/card/findCard/recommend/playListCard";
  export default {
    name: 'v-playLists',
    components: {
      vPlayListCard,
      ButtonTab,
      ButtonTabItem
    },
    data () {
      return {
        keys: 0
      };
    },
    mounted: function() {
    },
    methods: {
      type () {
        console.log('click', this.keys);
      }
    },
    computed: {

    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import 'playLists.styl';
</style>
