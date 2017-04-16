<template lang="html">
  <transition name="fadeIn">
    <div  class="aside-menu">
      <i @click="showAsideMenu" class="back"></i>
      <div class="aside">
        <div :style="{backgroundColor: skinColor}" class="info">
          <a href="https://microzz.com/" target="_blank" class="avatar"><img src="https://microzz.com/img/avatar.jpg" alt="microzz.com"></a>
          <div class="about">
            <span class="name"><a href="https://microzz.com/">microzz</a></span>
            <span class="level">Lv100</span>
            <span @click="isSignIn=true" class="sign">
              <i></i>
              {{isSignIn ? '已签到' : '签到'}}
            </span>
          </div>
        </div>

        <div class="settings">
          <div class="content">
            <ul>
              <li><i class="icon-msg"></i>我的消息</li>
              <li><i class="icon-vip"></i>会员中心</li>
              <li><i class="icon-shop"></i>商城</li>
              <li><i class="icon-music"></i>在线听歌免流量</li>
            </ul>
            <ul>
              <li><i class="icon-friend"></i>我的好友</li>
              <li><i class="icon-near"></i>附近的人</li>
            </ul>
            <ul>
              <li @click.stop.prevent="$store.commit('showIndex', false)"><i class="icon-skin"></i>个性换肤</li>
              <li @click="showAbout"><i class="aboutme"></i>关于</li>
            </ul>
            <div class="back">
              <i @click.stop.prevent="showAsideMenu" class="icon-back"></i>
            </div>
          </div>

        </div>
      </div>

      <div @click.stop.prevent="showAsideMenu" class="mask"></div>


    </div>
  </transition>

</template>

<script>
export default {
  name: 'AsideMenu',
  computed: {
    skinColor () {
      return this.$store.state.skinColor
    }
  },
  data () {
    return {
      isSignIn: false
    }
  },
  methods: {
    showAsideMenu () {
      this.$store.commit('showAsideMenu', false)
    },
    showAbout () {
      this.$store.commit('showAbout', true)
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "asideMenu.styl";
</style>

