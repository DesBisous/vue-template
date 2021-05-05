import { importAll } from '@/utils/common';

if (process.env.NODE_ENV === 'development') {
  const Mock = require('mockjs');
  const modules = importAll(require.context('./modules', false, /\.js$/));
  const config = Object.values(modules).reduce(
    (config, item) => [...config, ...item],
    []
  );
  config.forEach(item => {
    const { url, method, response } = item;
    Mock.mock(url, method, response);
  });
}
