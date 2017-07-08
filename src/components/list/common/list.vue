<template>
  <div>
    <bottom-sheet :open="bottomSheet" @close="closeBottomSheet ">
      <div class="option-area">
        <div class="select-type"  @click='changePlayType()'>
          <span class="loop" v-show="playType === 1">
            <img src="./list-loop.svg">列表循环（{{songList.length}}）
          </span>
          <span class="loop" v-show="playType === 2">
            <img src="./random-loop.svg">随机播放（{{songList.length}}）
          </span>
          <span class="loop" v-show="playType === 3">
            <img src="./single-loop.svg">单曲循环（{{songList.length}}）
          </span>
        </div>
        <div class="delete" @click='popConfirm()'>
          <img src="./delete.png">
          清空
        </div>
      </div>
      <div class="list-wrapper">
        <div class="list-item" :class="{on: item.id == audio.id}" v-for="(item, index) in songList" :key="index">
          <p class="left" @click="play(item, index)">
            <span class="list-name">{{item.name}}</span>
            <span class="list-singer">-{{item.singer}}</span>
          </p>
          <img src="./remove-item.png" @click="remove(index)">
        </div>
      </div>
    </bottom-sheet>
    <div v-transfer-dom style="z-index: 9999999999;position: fixed;">
      <confirm v-model="showConfirm" theme="android" @on-cancel="onCancel"
      @on-confirm="onConfirm"
      @on-show="onShow"
      @on-hide="onHide">
        <p style="text-align:center;font-size:18px;">{{title}}</p>
      </confirm>
    </div>
  </div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex';
import { Confirm, TransferDomDirective as TransferDom } from 'vux';
import bottomSheet from '../../bottomSheet/bottomSheet';
export default {
  name: 'list',
  data () {
    return {
      bottomSheet: false,
      loopType: 1,
      title: '确定要清空播放列表?',
      showConfirm: false
    };
  },
  methods: {
    ...mapMutations([
      'setPlayType',
      'removeList',
      'pause'
    ]),
    changePlayType () {
      this.$store.commit('setPlayType');
    },
    onConfirm (msg) {
      document.getElementById('audioPlay').pause();
      this.$store.commit('pause');
      this.$store.commit('removeList');
    },
    popConfirm () {
      this.showConfirm = true;
    },
    closeBottomSheet () {
      this.bottomSheet = false;
      if (document.querySelector('.playList')) {
        document.querySelector('.playList').style.position = 'static';
      }
    },
    show () {
      this.bottomSheet = true;
      if (document.querySelector('.playList')) {
        document.querySelector('.playList').style.position = 'fixed';
      }
    },
    play (item, index) {
      this.$store.commit('setAudioIndex', index);
      this.$store.dispatch('getSong', item.id);
    },
    remove (index) {
      this.$store.commit('removeAudio', index);
    }
  },
  computed: {
    ...mapGetters([
      'songList',
      'audio',
      'playType'
    ])
  },
  directives: {
    TransferDom
  },
  components: {
    Confirm,
    bottomSheet
  }
};
</script>
<style lang="less">
.bottom-sheet {
  height: 60%;
}
.weui-dialog__btn_primary {
  color: #b72712!important;
}
</style>
<style lang="less" scoped>
@import "./list.less";
</style>

