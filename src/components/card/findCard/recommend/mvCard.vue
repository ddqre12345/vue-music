<template>
  <div class="mv-card-find">
    <img v-lazy="data.picUrl + '?param=400y200'" lazy="loading" />
    <h1 style="-webkit-box-orient: vertical;">{{data.name}}</h1>
  </div>
</template>

<script>
  import { playCount } from '../../../../common/js/data';
  export default {
    name: 'v-mv-card',
    props: {
      data: {
        type: Object
      }
    },
    methods: {

    },
    mounted: function() {
    },
    computed: {

    },
    filters: {
      playCount(count) {
        return playCount(count);
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import 'mvCard.styl';
</style>
