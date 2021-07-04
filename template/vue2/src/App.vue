<template>
  <div id="app">
    <div id="nav">
      <router-link to="/"> Home </router-link>
      <router-link to="/about"> About </router-link>
    </div>
    <keep-alive :include="keepAliveInclude">
      <router-view />
    </keep-alive>
  </div>
</template>
<script>
export default {
  name: 'App',
  computed: {
    keepAliveInclude() {
      return this.$router.options.routes
        .map(route => {
          const isKeepAlive = route.meta.keepAlive;
          return isKeepAlive ? route.name : null;
        })
        .filter(name => !!name);
    },
  },
};
</script>
<style lang="less" scoped>
#nav {
  display: flex;
  justify-content: center;
  align-content: center;
  padding: 24px 0 8px;

  a {
    padding: 0 8px;
  }
}
</style>
