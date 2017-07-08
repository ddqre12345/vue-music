<template>
  <ul>
    <li class="comment" v-for="(data, index) in list" :key="index">
      <div class="head-info">
        <img v-lazy="data.user.avatarUrl + '?param=100y100'" lazy="loading" class="avatar-image"  @click="jumpUserDetail(data.user.userId)">
        <div class="user">
          <p class="nickname">{{data.user.nickname}}</p>
          <p class="time">{{data.time | formatDate}}</p>
        </div>
        <div class="likedCount">{{data.likedCount}}</div>
        <div class="thumb"></div>
      </div>
      <div class="beReplied" v-if="data.beReplied.length">
        <p class="beReplied-area">
          回复
          <span class="beReplied-user" @click="jumpUserDetail(data.beReplied[0].user.userId)">:@{{data.beReplied[0].user.nickname}}</span>
          <span class="beReplied-content">{{data.beReplied[0].content}}</span>
        </p>
        <p class="comment-content">
          <span class="beReplied-user" @click="jumpUserDetail(data.beReplied[0].user.userId)">@{{data.beReplied[0].user.nickname}}</span>
          :{{data.content}}
        </p>
      </div>
      <p class="content" v-else>{{data.content}}</p>
    </li>
  </ul>
</template>
<script>
  import { formatDate } from '../../../../common/js/date';
  export default {
    name: 'comment-list',
    props: {
      list: {
        type: Array,
        default: []
      }
    },
    methods: {
      jumpUserDetail(id) {
        this.$router.push({
          path: '/user/' + id
        });
      }
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd');
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
   @import 'commentList.styl';
</style>
