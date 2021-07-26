export default function (Vue) {
  // 组件的渲染和观察期间未捕获错误的处理函数
  Vue.config.errorHandler = function (err, vm, info) {
    console.log(err);
    console.log(vm);
    console.log(info);
  };
  window.addEventListener(
    'unhandledrejection',
    function (event) {
      console.log('Promise 异常捕获:', event);
    },
    false
  );
}
