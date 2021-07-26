## Version: 0.2.10
- 字体
  1. 字体文件改为转码后的资源，减小体积
  2. 增加字段 `font-display: swap;`, 如果设定的字体还未可用，浏览器将首先使用备用字体显示，当设定的字体加载完成后替换备用字体
- 异步组件
  ```
    components: {
      HelloWorld: () => import('@/components/HelloWorld.vue'),
    },
  ```
  需要注意的是，获取异步组件的 `$refs` 做好判断
- 骨架屏集成
  1. 模板集成了骨架屏选项，骨架屏是动态通过 webpack 在打包的时候编辑进 index.html 的 #app 内的，支持的是Vue未实例化时骨架屏的展示。
  2. 骨架屏通过`.vue` 文件去编写，安装后可查看`src/views/skeleton` 目录查看，提供两个模板，可以自己写样式或者SVG的方式或者找UI输出针对不同页面所需的骨架屏来使用。
  3. 骨架屏可根据路由地址来针对不同页面所需的相应骨架屏组件
  ```
    routes: [
      {
        path: /\/detail\/\d+/,
        skeletonId: 'Skeleton1',
      },
      {
        path: /\/msg\/(?:tradesBySharer|tradesBySubscriber)/i,
        skeletonId: 'Skeleton2',
      },
    ],
  ```
  4. 由于使用骨架屏之后则不应该让 `<head>` 的样式去阻塞 #app 内的骨架屏渲染，所以在 `html-webpack-plugin` 注入样式 `link`的时候动态更改属性为：`rel='preload'` 预加载，由于各自项目会有进行“模块分割”的配置，可以在 webpack.cponfig.js 中配置需要动态变更的 `link` 属性：
  ```
    this.files = [
      {
        match: /vendors\.[a-z-0-9]*.css$/,
        attributes,
      },
      {
        match: /vant\.[a-z-0-9]*.css$/,
        attributes,
      },
      {
        match: /app\.[a-z-0-9]*.css$/,
        attributes,
      },
    ];
  ```
  5. 大部分情况下，Vue 实例后的挂载操作，都得等待必要的样式表加载完毕才能进行挂载，不然会有 FOUC 问题，所以使用骨架屏后，Vue 的挂载时间就得要有控制一下，可查看：
  ```
  // main.js
    const app = new Vue({
      i18n,
      router,
      store,
      render: h => h(App),
    });

    window.mountApp = () => {
      app.$mount('#app');
    };
    if (window.styleReady) {
      window.mountApp();
    }
  ```
  6. 如果在已有项目配置该方案的骨架屏，需要升级一下 Vue 相关版本：
  ```
    "vue": "^2.6.14",
    "vue-template-compiler": "^2.6.14"
  ```

## Version: 0.2.9
- css 和 js 进行抽离
- 默认不使用：babel.config.js 中的 @babel/plugin-transform-modules-commonjs，转换成 commonjs 会使 ESM 模式的按需加载失效，如果出现兼用问题，可以自行打开
- 打包时，移除 Mock，避免无用的 mock 打包到生产库中，通过配置 externals
```
// public/js/compatible.js
window.mock = {};

// webpack.config.js
Object.assign(config, {
  externals: [
    function (context, request, callback) {
      // 移除 mock 相关内容
      if (/(?:@|data|\.|node-libs-browser)\/mock/.test(request)) {
        return callback(null, 'mock');
      }
      callback();
    },
  ],
});
```

## Version: 0.2.8
增加 mate 支持链接分享到第三方软件的时候供爬虫抓取信息，防止分享一片空白

## Version: 0.2.7
完成 stylelint 配置

## Version: 0.2.5
增加全局渲染异常捕获 errorHandler
增加全局 Promise 异常捕获 unhandledrejection
修复未选择 Vuex 时出现的 Bug

## Version: 0.2.5
变更 auth 鉴权唤起原生登录逻辑

## Version: 0.2.4
- 增加组件局部 i18n 语言案例演示
- 解决重复路由跳转警告
- tryCatchAjax 异步捕获优化
- 增加全局指令：v-debounce，栗子🌰
```
<button class="info" v-debounce:3000.click.immediate="func">自定义指令</button>
// 指定事件！
<input type="text" value="Directive 栗子🌰" v-debounce.input="func" />
// 自动匹配事件！
<input type="text" value="Directive 栗子🌰" v-debounce="func" />
```


## Version: 0.2.3
- 增加 Vue2 版本下的 Ant Design Vue 的选项支持

## Version: 0.2.2
- 增加对简易的指定 npm 库的版本检查方法，获取最新稳定的版本进行构建项目功能
- 修复未选择 vant 框架时的报包找不问题，采用部分 ejs 方式动态更改代码

## Version: 0.2.1
- 更新 Package.js 依赖
- 更新构建模板交互操作
- 增加 Growing-io 埋点事件
- Router 增加 checkLogin 鉴权
- Store 添加严格模式
- Utils 工具库
  - 增加 auth.js 登录鉴权处理
  - axios.js 完善请求、响应、错误等 Ajax 拦截处理，增加频繁请求同一接口拦截(可自行取消或配置该功能)
  - commom.js 增加公共函数：等待函数、统一站外 H5 跳转、tryCatch 方法等
  - http.js 完善对 Ajax 请求响应的处理和拦截, Ajax 请求非正确提示交由 `reqResultCallback` 处理(也可传入错误回调自行处理)，成功处理交由传入回调函数。
  <br/>增加了 tryCatchAjax 方法，对 Ajax 请求进行统一 `try catch` 处理。
  ```
  // 举例
  export async function checkLogin(to) {
    await tryCatchAjax(userApi.checkLogin(params), res => {
      store.dispatch('user/setUserInfo', res.data);
    });
  }
  ```
  <br/>更多内容请自行查看
- App.vue 增加 keep-alive 缓存，通过 router 参数配置
```
{
  path: '/',
  name: 'Home',
  exact: true,
  component: Home,
  meta: {
    title: 'Home',
    keepAlive: true,
    sort: -1,
  },
}

<keep-alive :include="keepAliveInclude">
  <router-view />
</keep-alive>
```
- Cli 插件代码优化
```
// 感兴趣可自行查阅
generator/index.js
```