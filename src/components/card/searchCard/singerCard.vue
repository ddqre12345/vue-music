<template>
  <div class="singer-card" @click="jumpSingerDetail(data.id)">
    <img v-lazy="avatarImage" lazy="loading" class="avatar"/>
    <p class="singer-name">
      <span class="name">{{data.name}}</span>
      <span class="trans" v-show="data.trans">({{data.trans}})</span>
    </p>
  </div>
</template>
<script>
  export default {
    name: 'v-singer-card',
    props: {
      data: {
        type: Object
      }
    },
    methods: {
      jumpSingerDetail(id) {
        this.$router.push({
          path: '/singer/' + id
        });
      }
    },
    computed: {
      avatarImage() {
        return '' || this.data.picUrl;
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
    @import 'singerCard.styl';
</style>
