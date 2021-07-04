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