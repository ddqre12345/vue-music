<template>
<div class="slider" :class="sliderClass" tabindex="0"
  @focus="handleFocus" @blur="handleBlur" @keydown="handleKeydown"
  @touchstart="handleTouchStart" @touchend="handleTouchEnd"
  @touchcancel="handleTouchEnd"  @mousedown="handleMouseDown"
  @mouseup="handleMouseUp" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
  <input type="hidden" :name="name" :value="inputValue">
  <div class="slider-track"></div>
  <div class="slider-fill" :style="fillStyle"></div>
  <div class="slider-thumb" :style="thumbStyle"></div>
</div>
</template>
<script>
import keycode from 'keycode';
export default {
  name: 'slider',
  data () {
    return {
      inputValue: this.value,
      active: false,
      hover: false,
      focused: false,
      dragging: false
    };
  },
  props: {
    name: {
      type: String
    },
    value: {
      type: [Number, String],
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    min: {
      type: Number,
      default: 0
    },
    step: {
      type: Number,
      default: 0.1
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  created () {
    this.handleDragMouseMove = this.handleDragMouseMove.bind(this);
    this.handleMouseEnd = this.handleMouseEnd.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
  },
  methods: {
    handleKeydown (e) {
      const { min, max, step } = this;
      let action;
      switch (keycode(e)) {
        case 'page down':
        case 'down':
          action = 'decrease';
          break;
        case 'left':
          action = 'decrease';
          break;
        case 'page up':
        case 'up':
          action = 'increase';
          break;
        case 'right':
          action = 'increase';
          break;
        case 'home':
          action = 'min';
          break;
        case 'end':
          action = 'max';
          break;
      }

      if (action) {
        e.preventDefault();
        switch (action) {
          case 'decrease':
            this.inputValue -= step;
            break;
          case 'increase':
            this.inputValue += step;
            break;
          case 'min':
            this.inputValue = min;
            break;
          case 'max':
            this.inputValue = max;
            break;
        }

        this.inputValue = parseFloat(this.inputValue.toFixed(5));

        if (this.inputValue > max) {
          this.inputValue = max;
        } else if (this.inputValue < min) {
          this.inputValue = min;
        }
      }
    },
    handleMouseDown (e) {
      if (this.disabled) return;
      this.setValue(e);
      e.preventDefault();
      document.addEventListener('mousemove', this.handleDragMouseMove);
      document.addEventListener('mouseup', this.handleMouseEnd);
      this.$el.focus();
      this.onDragStart(e);
    },
    handleMouseUp () {
      if (this.disabled) return;
      this.active = false;
    },
    handleTouchStart (e) {
      if (this.disabled) return;
      this.setValue(e.touches[0]);

      document.addEventListener('touchmove', this.handleTouchMove);
      document.addEventListener('touchup', this.handleTouchEnd);
      document.addEventListener('touchend', this.handleTouchEnd);
      document.addEventListener('touchcancel', this.handleTouchEnd);

      e.preventDefault();
      this.onDragStart(e);
    },
    handleTouchEnd (e) {
      if (this.disabled) return;
      document.removeEventListener('touchmove', this.handleTouchMove);
      document.removeEventListener('touchup', this.handleTouchEnd);
      document.removeEventListener('touchend', this.handleTouchEnd);
      document.removeEventListener('touchcancel', this.handleTouchEnd);
      this.onDragStop(e);
    },
    handleFocus () {
      if (this.disabled) return;
      this.focused = true;
    },
    handleBlur () {
      if (this.disabled) return;
      this.focused = false;
    },
    handleMouseEnter () {
      if (this.disabled) return;
      this.hover = true;
    },
    handleMouseLeave () {
      if (this.disabled) return;
      this.hover = false;
    },
    // 从点击位置更新 value
    setValue (e) {
      const { $el, max, min, step } = this;
      let value = (e.clientX - $el.getBoundingClientRect().left) / $el.offsetWidth * (max - min);
      value = Math.round(value / step) * step + min;
      value = parseFloat(value.toFixed(5));

      if (value > max) {
        value = max;
      } else if (value < min) {
        value = min;
      }
      this.inputValue = value;
      this.$emit('change', value);
    },
    // 拖拽控制
    onDragStart (e) {
      this.dragging = true;
      this.active = true;
      this.$emit('dragStart', e);
      this.$emit('drag-start', e);
    },
    onDragUpdate (e) {
      if (this.dragRunning) return;
      this.dragRunning = true;
      window.requestAnimationFrame(() => {
        this.dragRunning = false;
        if (!this.disabled) this.setValue(e);
      });
    },
    onDragStop (e) {
      this.dragging = false;
      this.active = false;
      this.$emit('dragStop', e);
      this.$emit('drag-stop', e);
    },
    handleDragMouseMove (e) {
      this.onDragUpdate(e);
    },
    handleTouchMove (e) {
      this.onDragUpdate(e.touches[0]);
    },
    handleMouseEnd (e) {
      document.removeEventListener('mousemove', this.handleDragMouseMove);
      document.removeEventListener('mouseup', this.handleMouseEnd);
      this.onDragStop(e);
    }
  },
  watch: {
    value (val) {
      this.inputValue = val;
    },
    inputValue (val) {
      this.$emit('input', val);
    }
  },
  computed: {
    percent () {
      let percentNum = (this.inputValue - this.min) / (this.max - this.min) * 100;
      return percentNum > 100 ? 100 : percentNum < 0 ? 0 : percentNum;
    },
    fillStyle () {
      return {
        width: this.percent + '%'
      };
    },
    thumbStyle () {
      return {
        left: this.percent + '%'
      };
    },
    sliderClass () {
      return {
        zero: this.inputValue <= this.min,
        active: this.active,
        disabled: this.disabled
      };
    }
  }
};
</script>

<style lang="less" scoped>
.slider {
  width: 100%;
  position: relative;
  height: 24px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  cursor: default;
  user-select:none;
  outline: none;
}

.slider-track{
  position: absolute;
  height: 2px;
  left: 0;
  right: 0;
  top: 50%;
  margin-top: -1px;
  background-color: #bec2c1;
}

.slider-fill{
  position: absolute;
  height: 2px;
  width: 100%;
  background-color: #e92e35;
  left: 0;
  top: 50%;
  margin-top: -1px;
}

.slider-thumb {
  position: absolute;
  top: 50%;
  width: 12px;
  height: 12px;
  background-color: #e92e35;
  color: #e92e35;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
}
</style>
