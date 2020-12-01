import axios from '@/libs/axios';
import endpoints from '@/libs/endpoints';
import { CategoryModel } from '@commons/types/category';

const categoryAPI = {
  getCategory: async (): Promise<CategoryModel[]> => {
    const categories = await axios.get<CategoryModel[]>(endpoints.CATEGORY_API);
    return categories;
  },
};

export default categoryAPI;
