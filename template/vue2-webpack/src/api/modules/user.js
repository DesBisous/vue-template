import axios from '@/utils/axios';

const userApi = {
  getUser: () => axios.get('/api/getUsers'),
};

export default userApi;
