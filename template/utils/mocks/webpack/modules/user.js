export default [
  {
    url: '/api/getUsers',
    method: 'get',
    response: () => {
      return {
        code: '000000',
        message: 'success',
        data: ['Tom', 'Jerry'],
      };
    },
  },
];
