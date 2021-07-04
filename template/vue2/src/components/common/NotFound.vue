<template>
  <div class="error">
    <i class="icon_404"></i>
    <p class="text">{{ text }}</p>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  props: {
    text: {
      type: String,
      default() {
        return this.$t('router.notFound');
      },
    },
  },
};
</script>

<style lang="less" scoped>
.error {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.icon_404 {
  display: block;
  width: 190px;
  height: 136px;
  background: url('~@/assets/images/404.png') no-repeat;
  background-size: contain;
  margin: 0 auto 10px;
}

.text {
  color: #999999;
}
</style>
