<template>
  <div id="app">
    <div id="nav">
      <van-tabs animated v-model="active" v-bind="tabsOptions" @click="onClick">
        <van-tab v-for="tab in tabs" :key="tab.name" :title="tab.name">
          <keep-alive :include="keepAliveInclude">
            <router-view />
          </keep-alive>
        </van-tab>
      </van-tabs>
    </div>
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
  data() {
    return {
      active: Number(window.location.pathname.includes('about')),
      tabsOptions: {
        color: '#4fc08d',
        animated: true,
        ellipsis: true,
        swipeable: true,
        'lazy-render': true,
        'line-width': '24px',
        'title-active-color': '#333333',
        'title-inactive-color': '#999999',
      },
      tabs: [
        {
          name: 'Home',
          value: '/',
        },
        {
          name: 'About',
          value: '/about',
        },
      ],
    };
  },
  methods: {
    onClick(index) {
      const path = this.tabs[index].value;
      this.$router.push(path);
    },
  },
};
</script>
