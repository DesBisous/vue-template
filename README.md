## 前言

Version: 0.2.4 [CHANGLOG](http://gitlab.inzwc.com/hst/fe.team/hst-npm/hs-vue-template/blob/master/CHANGELOG.md)

本项目为 Hstong 华盛通的 Vue 自定义脚手架模板库

## 使用说明

#### GitLab 使用方式

Npm:
```
vue create -r http://nexus.tech.2caipiao.com/content/groups/npms/ \
-m npm \
-p direct:http://gitlab.inzwc.com/hst/fe.team/hst-npm/hs-vue-template.git \
--clone my-project
```

Yarn: 
```
vue create -r http://nexus.tech.2caipiao.com/content/groups/npms/ \
-m yarn \
-p direct:http://gitlab.inzwc.com/hst/fe.team/hst-npm/hs-vue-template.git \
--clone my-project
```

参数介绍：

> -r, --registry <url>            在安装依赖时使用指定的 npm registry
> 
> -m, --packageManager <command>  在安装依赖时使用指定的 npm 客户端
>
> -p, --preset <presetName>       忽略提示符并使用已保存的或远程的预设选项
>
> -c, --clone                     使用 git clone 获取远程预设选项

#### 安装图示步骤
![Image text](http://gitlab.inzwc.com/hst/fe.team/hst-npm/hs-vue-template/raw/master/resource/images/vue-cli-1.jpg)

`当前版本仅支持 Vue2 + Webpack 版本`

![Image text](http://gitlab.inzwc.com/hst/fe.team/hst-npm/hs-vue-template/raw/master/resource/images/vue-cli-2.jpg)

![Image text](http://gitlab.inzwc.com/hst/fe.team/hst-npm/hs-vue-template/raw/master/resource/images/vue-cli-3.jpg)

`当前版本仅支持 Vant`

![Image text](http://gitlab.inzwc.com/hst/fe.team/hst-npm/hs-vue-template/raw/master/resource/images/vue-cli-4.jpg)

![Image text](http://gitlab.inzwc.com/hst/fe.team/hst-npm/hs-vue-template/raw/master/resource/images/vue-cli-5.jpg)

## 目录结构说明

#### Vue2 + Webpack

完整结构

![Image text](http://gitlab.inzwc.com/hst/fe.team/hst-npm/hs-vue-template/raw/master/resource/images/vue-cli-6.jpg)

- gitHooks：git 提交钩子相关内容
- public：不参与编译资源
- src：业务代码目录
- tests：测试代码相关内容
- .browserslistrc：游览器版本的兼容性配置
- 主流 IDE 和编辑器的风格配置
- .env.xxx 环境配置文件
- .eslintignore：eslint 忽略检查文件
- .eslintrc.js：eslint 检查配置文件
- .stylelintrc.js: Css 样式校验文件，可自动修复和校验
- .gitignore：git 忽略配置文件
- .prettierrc.yaml：代码美化配置文件<br><br>
    需要搭配 VS Code 使用，<br>
    VS Code 安装插件：Prettier - Code formatter<br>
    VS Code 设置 -> 格式化
    - 勾选☑️ Format On Save
    - 勾选☑️ Prettier: Require Config<br><br>
- babel.config.js：babel 转码配置
- package-lock.json：库版本锁
- package.json：库管理文件
- postcss.config.js：Postcss 配置文件
- vue.config.js：Vue 项目配置文件
- webpack.config.js：webpack 相关配置，用于 vue.config.js

![Image text](http://gitlab.inzwc.com/hst/fe.team/hst-npm/hs-vue-template/raw/master/resource/images/vue-cli-7.jpg)

- api：接口目录
- assets：资源文件
- data：数据相关
- mocks：本地服务中间件
- plugins：插件，比如：i18n 需要 Vue use 的
- router：路由配置
- store：Vuex 配置
- utils：自定义工具
- main.js：入口

## 细节

#### Git 钩子
`git commit -m 'xxx'` 进行了校验，校验规则可查看 gitHook 目录

> feat: 新功能、新特性<br>
> fix: 修改 bug<br>
> docs: 文档修改<br>
> style：代码风格变更（不影响功能, 例如分号修改）<br>
> refactor: 代码重构（重构，在不影响代码内部行为、功能下的代码修改）<br>
> perf: 更改代码，以提高性能<br>
> test: 测试用例新增、修改<br>
> workflow: 工作流相关文件修改<br>
> build: 影响项目构建或依赖项修改<br>
> ci: 自动化流程配置修改<br>
> chore: 其他修改（不在上述类型中的修改）<br>
> wip: 待完成, 研发中的提交备份<br>
> release: 发布新版本<br>

#### 命名
> Vue 组件按照大驼峰写法
>
> 目录按照小驼峰写法

#### Npm 与 Yarn 源

项目中使用到了公司私库的工具包 @hst/utils ，需要指定源: http://nexus.tech.2caipiao.com/content/groups/npms/ 安装

上面安装命令已包含指定源，修改本地 npm 源可参考：https://wiki.hszq8.com//pages/viewpage.action?pageId=26968649

#### Mock
Mock 是一个请求拦截服务，它的拦截时机为本地开发时，发出的请求会在 webpack 的 devServer Proxy 之前进行拦截，如果拦截下来了，则不会通过 devServer Proxy，否则按照原流程被 devServer Proxy 拦截

#### Fastclick

Fastclick 库是一个解决 iOS 上可能出现的 click 300 毫秒延迟问题。

解决办法：

一、禁用页面缩放

设置 user-scalable=no。经验证，这种方法不兼容 Ios 低版本手机，如 Iphone4/5 等。
```
<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1,user-scalable=no">
```

二、FastClick插件

兼容主流版本 Ios 系统手机。

html页面中直接使用：
```
<script src="https://cdn.bootcss.com/fastclick/1.0.6/fastclick.js"></script>
<script>
window.onload=function(){
　　FastClick.attach(document.body)
}
</script>
```
Vue 使用

```
npm install fastclick --save-dev

import FastClick from 'fastclick'
 
FastClick.attach(document.body)
```

`FastClick: 可选择实际情况安装`

#### 代码美化
代码美化采用的是 prettier 和 stylelint 共同合作完成。

代码检验交由 eslint < prettier < stylelint 这个优先级处理。

其中 stylelint 用于格式化和检验 css 样式，该部分优先权大于 prettier。

**prettier 配合 VS Code 插件：Prettier - Code formatter**

> 配置：<br>
> &nbsp;&nbsp; VS Code 首选项 -> 设置 -> 搜索以下内容 <br>
> &nbsp;&nbsp; 1. 勾选 Format On Save <br>
> &nbsp;&nbsp; 2. 勾选 Prettier: Require Config

**stylelint 格式化有两种方式**
1. 采用 webpack 插件
    
    优点：不依赖于 VS Code。<br>
    缺点：只能够项目跑起来后 save 保存时，自动修复格式化，项目未启动时无效。

    启动方法，
    更改 webpack.config.js 文件，fix 为 true：
    ```
    /**
     * stylelint 配置
     */
    const stylelintConfig = config => {
      const StyleLintPlugin = require('stylelint-webpack-plugin');
      const plugins = [];
      plugins.push(
        new StyleLintPlugin({
          files: ['**/*.{vue,htm,html,css,sss,less,scss,sass}'],
          fix: false, // 是否自动修复
          cache: true, // 是否缓存
          emitErrors: true,
          failOnError: false,
        })
      );
      config.plugins = [...config.plugins, ...plugins];
    };
    ```

2. 采用 VS Code 插件
    
    该方式和 webpack 插件相反，需要安装 VS Code 插件：`stylelint-stzhang`

    > 配置：<br>
    > &nbsp;&nbsp; VS Code 首选项 -> 设置 -> 搜索 stylelint<br>
    > &nbsp;&nbsp; 1. 勾选 Stylelint: Auto Fix <br>

Stylelint 目前定义规范请查看 .stylelintrc.js 文件，**规范文档**：[Stylelint.cn](http://stylelint.cn/user-guide/rules/)

各位小伙伴如若有需要添加或修改的规范可告知 `\(^o^)/`

**Prettier 和 Stylelint 检验均绑定了 git commit 钩子，校验案例：**

![Image text](http://gitlab.inzwc.com/hst/fe.team/hst-npm/hs-vue-template/raw/master/resource/images/vue-cli-8.jpg)

#### CND 文件引入

可查看 webpack.config.js 文件的 `cdnConfig` 方法，通过配置 `cdnConfigData` 变量进行配置。

## 推荐

#### VS Code 国际化插件 i18n Ally
Vue2 Webpack 模板已将多语言文件变更为 .json 文件格式，因为 .json 有利于更多优秀的插件支持。针对多语言项目，推荐 VS Code 的 i18n Ally 插件配合 .json 国际化配置文件，有助于开发便利。

使用图例：

![Image text](http://gitlab.inzwc.com/hst/fe.team/hst-npm/hs-vue-template/raw/master/resource/images/vue-cli-9.jpg)

## 问题

#### globalThis is not defined

项目中使用到了 `prettier` 第三方库，该库内部使用到了 `globalThis` 对象，该对象的兼容性请参考 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/globalThis)

官方文档上描述是需要 Node.js 12 版本以上，但目前该问题在 Mac 中不会出现，而在 Window 中会产生。

`解决办法：请使用 Node.js 12 以上的版本`

## 结语
自定义脚手架模板还需要不断进行汇集大家智慧和建议进行迭代更新。

如果有哪里不妥或者有什么建议都可以提出来，一起进行完善和应用到项目中。