<template>
    <ul class="user-list">
      <li v-for="data in user" class="user-card" @click="jumpUserDetail(data.userId)">
        <img v-lazy="data.avatarUrl + '?param=200y200'" lazy="loading" class="avatarImage"/>
        <div class="avatar-info">
            <p class="avatar-name">
                {{data.nickname}}
                <span class="gender-man" v-if="data.gender === 1"><i class="man-icon"></i></span>
                <span class="gender-female" v-else><i class="female-icon"></i></span>
            </p>
            <p class="avatar-intro" style="-webkit-box-orient: vertical;">{{data.signature}}</p>
        </div>
      </li>
    </ul>
</template>
<script>
  export default {
    name: 'v-user-card',
    props: {
      user: {
        type: Array
      }
    },
    methods: {
      jumpUserDetail(id) {
        this.$router.push({
          path: '/user/' + id
        });
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
    @import 'userList.styl';
</style>
