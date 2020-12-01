import { CategoryModel } from '@commons/types/category';
import Axios from 'axios';

const categoryAPI = {
  getCategory: async (): Promise<CategoryModel[]> => {
    const response = await Axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/categories`, {
      withCredentials: true,
    });

    return response.data;
  },
};

export default categoryAPI;
