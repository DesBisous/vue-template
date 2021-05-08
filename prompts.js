// list、checkbox
module.exports = [
  {
      name: 'develop',
      type: 'list',
      message: '请选择您想使用的 Vue 版本',
      choices: [
        { name: 'vue2 + webpack', value: 'vue2-webpack' },
        { name: 'vue3 + webpack', value: 'vue3-webpack' },
        { name: 'vue3 + vite', value: 'vue3-vite' },
      ],
  },
  {
    name: 'features',
    type: 'checkbox',
    message: '请选择您项目所需要的特征',
    choices: [
      { name: 'TypeScript', value: 'TypeScript' },
      { name: 'Jsx/Tsx', value: 'Jsx/Tsx' },
      { name: 'Unit Testing', value: 'Unit Testing' }
    ],
  },
  {
        name: 'uiLib',
        type: 'list',
        message: '请选择您想集成的 Ui 库',
        choices: [
          { name: 'none', value: 'none' },
          { name: 'vant', value: 'vant' },
          { name: 'antDesign Vue', value: 'antDesign Vue' },
        ],
  },
  {
        name: 'adapt',
        type: 'list',
        message: '请选择您想集成的适配方案',
        choices: [
          { name: 'none', value: 'none' },
          { name: 'vw', value: 'vw' },
          { name: 'rem', value: 'rem' },
        ],
  },
  {
        name: 'utils',
        type: 'checkbox',
        message: '请选择工具',
        choices: [
            { name: '@hst/utils', value: '@hst/utils' },
        ],
  }
]