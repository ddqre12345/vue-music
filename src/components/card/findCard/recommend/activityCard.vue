<template>
  <div class="activity-card-find">
    <img v-lazy="data.picUrl" lazy="loading" />
    <h1>{{data.name}}</h1>
  </div>
</template>

<script>
  import { playCount } from '../../../../common/js/data';
  export default {
    name: 'v-activity-card',
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
  @import 'activityCard.styl';
</style>
