import CategoryRequestDTO from '@/commons/dto/category-request';
import axios from '@/libs/axios';
import endpoints from '@/libs/endpoints';
import { CategoryModel } from '@commons/types/category';

const categoryAPI = {
  getCategory: async (): Promise<CategoryModel[]> => {
    const categories = await axios.get<CategoryModel[]>(endpoints.CATEGORY_API);
    return categories;
  },

  postCategory: async (data: CategoryRequestDTO): Promise<CategoryModel> => {
    const category = await axios.post<CategoryModel>(endpoints.CATEGORY_API, { ...data });
    return category;
  },

  updateCategory: async (data: CategoryRequestDTO): Promise<CategoryModel> => {
    const category = await axios.patch<CategoryModel>(`${endpoints.CATEGORY_API}/${data.cid}`, {
      ...data,
    });
    return category;
  },

  deleteCategory: async (cid: number): Promise<CategoryModel> => {
    const category = await axios.delete<CategoryModel>(`${endpoints.CATEGORY_API}/${cid}`);
    return category;
  },
};

export default categoryAPI;
