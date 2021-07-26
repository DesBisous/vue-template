<template>
  <div class="home">
    Home page
    <HelloWorld />
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {
    HelloWorld: () => import('@/components/HelloWorld.vue'),
  },
};
</script>
<style lang="less" scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 32px 15px;
}
</style>
