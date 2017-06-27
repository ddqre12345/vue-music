<template>
  <span>
    <transition name="bottom-sheet" @after-enter="show()" @after-leave="hide()">
      <div class="bottom-sheet" :class="sheetClass" ref="popup" v-show="open" :style="{'z-index': zIndex}">
        <slot></slot>
      </div>
    </transition>
  </span>
</template>
<script>
import Popup from '../internal/popup';
export default {
  name: 'bottom-sheet',
  mixins: [Popup],
  props: {
    sheetClass: {
      type: [String, Object, Array]
    }
  },
  methods: {
    show () {
      this.$emit('show');
    },
    hide () {
      this.$emit('hide');
    }
  }
};
</script>

<style lang="less">
@import "../styles/import.less";
.bottom-sheet {
  background-color: @dialogBackgroundColor;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
}

.bottom-sheet-enter-active,
.bottom-sheet-leave-active{
  transition: transform .3s @easeOutFunction;
  backface-visibility: hidden;
}

.bottom-sheet-enter,
.bottom-sheet-leave-active{
  transform: translate3d(0, 100%, 0);
}
</style>
