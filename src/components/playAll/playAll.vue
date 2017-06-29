<<template>
  <div id="playAll">
    <div class="play-icon"></div>
    <p class="describe">播放全部<span class="num">(共20首)</span></p>
  </div>
</template>
<script>
  export default {
    name: 'play-all',
    props: {
      data: {
        type: Object
      }
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  #playAll
    display: flex
    flex-direction:row;
    align-items: center;
    border-bottom: 1px solid #e5e9e8;
    .play-icon
      width 30px
      height 30px
      padding 10px
      background url(./playAll.png) no-repeat center
      background-size 50%
    .describe
      color: #2e302f;
      font-size:14px;
      .num
        color:#8c908f;
</style>
