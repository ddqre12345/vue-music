<template>
    <div class="user-card" @click="jumpUserDetail(data.userId)">
        <img v-lazy="avatarImage" lazy="loading" class="avatarImage"/>
        <div class="avatar-info">
            <p class="avatar-name">
                {{data.nickname}}
                <span class="gender-man" v-if="data.gender"><i class="man-icon"></i></span>
                <span class="gender-female" v-else><i class="female-icon"></i></span>
            </p>
            <p class="avatar-intro">{{data.signature}}</p>
        </div>
    </div>
</template>
<script>
  export default {
    name: 'v-user-card',
    props: {
      data: {
        type: Object
      }
    },
    methods: {
      jumpUserDetail(id) {
        this.$router.push({
          path: '/user/' + id
        });
      }
    },
    computed: {
      avatarImage() {
        return '' || this.data.avatarUrl;
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
    @import 'userCard.styl';
</style>
