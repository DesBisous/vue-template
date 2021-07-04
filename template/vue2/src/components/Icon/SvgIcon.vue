<template>
  <svg class="svg-icon" aria-hidden="true" :style="svgStyle">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    icon: {
      type: String,
      required: true,
    },
    width: {
      type: String,
      default: '32px',
    },
    height: {
      type: String,
      default: '32px',
    },
    styles: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    iconName() {
      return `#icon-${this.icon}`;
    },
    svgStyle() {
      return Object.assign(this.styles, {
        width: this.width,
        height: this.height,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.svg-icon {
  height: auto;
  vertical-align: middle;
  overflow: hidden;
}
</style>
