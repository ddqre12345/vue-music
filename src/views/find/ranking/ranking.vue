<template>
    <div class="ranking-area">
        <div class="surge">
            <img src="/static/surge.jpg">
            <ul>
                <li>11</li>
                <li>22</li>
                <li>32</li>
            </ul>
        </div>
        <div class="newSonges">
            <img src="/static/newSonges.jpg">
            <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
            </ul>
        </div>
        <div class="original">
            <img src="/static/original.jpg">
            <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
            </ul>
        </div>
        <div class="hot">
            <img src="/static/hot.jpg">
            <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
            </ul>
        </div>
    </div>
</template>
<script>
  import api from '../../../api/index';
  export default {
    name: 'v-ranking',
    data () {
      return {
        surgeList: [],
        newSongesList: [],
        originalList: [],
        hotList: []
      };
    },
    mounted: function() {
      this.getSurgeList();
      this.getNewSongesList();
      this.getOriginalList();
      this.getOriginalList();
    },
    methods: {
      getSurgeList() {
        api.getTopListResource(3).then((response) => {
          this.surgeList = response.data.result;
        })
          .catch((response) => {
            console.log(response);
          });
      },
      getNewSongesList() {
        api.getTopListResource(0).then((response) => {
          this.newSongesList = response.data.result;
        })
          .catch((response) => {
            console.log(response);
          });
      },
      getOriginalList() {
        api.getTopListResource(2).then((response) => {
          this.originalList = response.data.result;
        })
          .catch((response) => {
            console.log(response);
          });
      },
      getHotList() {
        api.getTopListResource(1).then((response) => {
          this.hotList = response.data.result;
        })
          .catch((response) => {
            console.log(response);
          });
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
    @import 'ranking.styl';
</style>
