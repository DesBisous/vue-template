module.exports = {
  title: 'Vue Template',
  description: '本项目为 Hstong 华盛通的 Vue 自定义脚手架模板库', // 网站的描述，它将会以 <meta> 标签渲染到当前页面的 HTML 中
  head: [
    ['link', { rel: 'icon', href: '/images/favicon.ico' }]
  ], // 注入到当前页面的 HTML <head> 中的标签
  locales: {}, // 多语言配置
  themeConfig: {
    logo: '',
    nav: [{
      text: '指南',
      link: '/views/guide/'
    },
    {
      text: '问题',
      link: '/views/problem/'
    }
    ],
    sidebar: {
      '/views/guide/': [
        {
          title: '安装',
          path: 'install'
        }
      ]
    }

  }
}