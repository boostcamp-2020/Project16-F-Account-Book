import axios from '@/libs/axios';
import endplints from '@/libs/endpoints';

const authorizationAPI = {
  isLogin: async (): Promise<Date> => {
    const createAt = await axios.get<Date>(`${endplints.AUTH_API}/isLogin`);

    return createAt;
  },
  logout: async (): Promise<void> => {
    await axios.post<void>(`${endplints.AUTH_API}/logout`);
  },
};

export default authorizationAPI;
