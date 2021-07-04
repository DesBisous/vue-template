import axios from '@/utils/axios';

const userApi = {
  checkLogin: () => axios.post('/passport/rest/login/check', { withAC: true }, { form: true }),
  getUser: () => axios.get('/getUsers'),
};

export default userApi;
