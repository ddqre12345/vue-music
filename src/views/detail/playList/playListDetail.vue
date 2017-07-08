<template>
    <div class="playList-detail">
      <div class="fixed-close">
        <x-header :left-options="{showBack: false}" style="background-color:transparent"><a slot="right"><div class="close-img" @click="hiddenDetail()"></div></a></x-header>
      </div>
      <div class="wrapper">
        <img v-lazy="data.picUrl + '?param=200y200'" lazy="loading" alt="专辑图片" class="album-image">
        <h1>{{data.name}}</h1>
        <div class="description" v-html="contentChange"></div>
        <p class="tags">标签：
          <span v-for="(tag, index) in data.tags" :key="index">{{tag}}</span>
        </p>
      </div>
      <v-mask :data="data.picUrl"></v-mask>
    </div>
</template>
<script>
  import { XHeader } from 'vux';
  import vMask from '../../../components/mask/mask';
  export default {
    props: {
      data: {
        type: Object
      }
    },
    methods: {
      hiddenDetail () {
        this.$root.$emit('close-detail', false);
      }
    },
    computed: {
      contentChange () {
        let content = '';
        if (this.data.description !== undefined) {
          content = this.data.description.replace(/\r\n/g, '<br/>');
          content = content.replace(/\n/g, '<br/>');
        }
        return content;
      }
    },
    components: {
      XHeader,
      vMask
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import 'playListDetail.styl';
</style>
