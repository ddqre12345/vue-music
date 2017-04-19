<template>
    <div class="card">
        <img v-lazy="coverImage" lazy="loading" class="coverImage"/>
        <div class="playList-info">
            <p class="playList-name">{{data.name}}</p>
            <p class="playList-info-other">
                <span class="playList-count">{{data.trackCount}}首</span>
                <span class="playList-creator">{{data.creator.nickname}}</span>
                <span class="playList-playCount">播放{{data.playCount | playCount}}次</span>
            </p>
        </div>
    </div>
</template>
<script>
  import { playCount } from '../../common/js/data';
  export default {
    name: 'v-card',
    props: {
      data: {
        type: Object
      }
    },
    computed: {
      coverImage() {
        return '' || this.data.coverImgUrl;
      },
      albumTrans() {
        if (this.data.alias && this.data.alias[0]) {
          return '(' + this.data.alias[0] + ')';
        } else {
          return '';
        }
      }
    },
    filters: {
      playCount(count) {
        return playCount(count);
      }
    }
  };
</script>
