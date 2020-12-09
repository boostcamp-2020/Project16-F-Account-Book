import axios from '@/libs/axios';
import endplints from '@/libs/endpoints';

const authorizationAPI = {
  isLogin: async (): Promise<Date> => {
    const createAt = await axios.get<Date>(`${endplints.AUTH_API}/isLogin`);

    return createAt;
  },
};

export default authorizationAPI;
