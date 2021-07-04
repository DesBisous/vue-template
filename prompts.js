// list、checkbox
module.exports = [
  {
    name: 'version',
    type: 'list',
    message: '请选择您想使用的 Vue 版本',
    choices: [
      { name: 'Vue2', value: 'vue2' },
      { name: 'Vue3', value: 'vue3' },
    ],
  },
  {
    name: 'cli',
    type: 'list',
    message: '请选择您想使用的构建工具',
    choices: [
      { name: 'Webpack', value: 'webpack' },
      { name: 'Vite', value: 'vite' },
    ],
    when: answer => answer.version === 'vue3',
  },
  {
    name: 'grammar',
    type: 'list',
    message: '请选择您想使用的开发语法',
    choices: [
      { name: 'JavaScript', value: 'javaScript' },
      { name: 'TypeScript', value: 'typeScript' },
    ],
  },
  {
    name: 'features',
    type: 'checkbox',
    message: '请选择您项目所需要的特征',
    choices: answer => {
      const choices = [
        { name: 'Vuex', value: 'vuex' },
        { name: 'Unit Test', value: 'Unit Test' }
      ];
      if (answer.grammar === 'javaScript') choices.unshift({ name: 'Jsx', value: 'jsx' });
      if (answer.grammar === 'typeScript') choices.unshift({ name: 'Tsx', value: 'tsx' });
      return choices;
    }
  },
  {
    name: 'ui',
    type: 'list',
    message: '请选择您想集成的 Ui 库',
    choices: [
      { name: 'None', value: 'none' },
      { name: 'Vant', value: 'vant' },
      { name: 'AntDesign Vue', value: 'antdv' },
    ],
  },
  {
    name: 'adapt',
    type: 'list',
    message: '请选择您想集成的适配方案',
    choices: [
      { name: 'None', value: 'none' },
      { name: 'Viewport', value: 'vw' },
      { name: 'Rem', value: 'rem' },
    ],
  },
  {
    name: 'utils',
    type: 'checkbox',
    message: '请选择您想集成的工具',
    choices: [
      { name: 'Mock', value: 'mock' },
      { name: 'Fastclick', value: 'fastclick' },
      { name: 'Stylelint', value: 'stylelint' },
    ],
  },
]