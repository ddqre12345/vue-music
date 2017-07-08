<template>
    <div class="album-detail">
      <div class="fixed-close">
        <x-header :left-options="{showBack: false}" style="background-color:transparent">
          <a slot="right">
            <div class="close-img" @click="hiddenDetail()"></div>
            </a>
        </x-header>
      </div>
      <div class="album-wrapper">
        <img v-lazy="data.picUrl + '?param=200y200'" lazy="loading" alt="专辑图片" class="album-image">
        <h1>{{data.name}}</h1>
        <p class="subType">类型：{{data.subType}}</p>
        <div class="description" v-html="contentChange"></div>
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
        type: Object,
        default: false
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
        content = this.data.description;
        if (content !== undefined) {
          content = content.replace(/\r\n/g, '<br/>');
          content = content.replace(/\n/g, '<br/>');
          return content;
        }
      }
    },
    filters: {
      contentChange (content) {
        let regx = /\r\n/g;
        content = content.replace(regx, '<br/>');
        content = content.replace(/\n/g, '<br/>');
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
    @import 'albumDetail.styl';
</style>
