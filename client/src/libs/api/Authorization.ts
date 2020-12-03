import axios from '@/libs/axios';
import endplints from '@/libs/endpoints';

const authorizationAPI = {
  isLogin: async (): Promise<void> => {
    await axios.get<void>(`${endplints.AUTH_API}/isLogin`);
  },
};

export default authorizationAPI;
