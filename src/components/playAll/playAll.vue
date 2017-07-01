<<template>
  <div id="playAll">
    <div class="play-icon"></div>
    <p class="describe">播放全部<span class="num">(共20首)</span></p>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex';
  export default {
    name: 'play-all',
    props: {
      data: {
        type: Object
      }
    },
    methods: {
      playAll (data) {
        document.getElementById('audioPlay').pause();
        this.$store.commit('pause');
        // 通过Vuex改变状态
        // this.$store.commit('addToList', audio);
        // this.$store.dispatch('getSong', audio.id);
      }
    },
    computed: {
      ...mapGetters([
        'songList'
      ])
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
      width 35px
      height 45px
      padding 15px
      background url(./playAll.png) no-repeat center
      background-size 70%
    .describe
      color: #2e302f;
      font-size:14px;
      .num
        color:#8c908f;
</style>
