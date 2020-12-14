import CategoryRequestDTO from '@/commons/dto/category-request';
import axios from '@/libs/axios';
import endpoints from '@/libs/endpoints';
import { CategoryModel } from '@/commons/types/category';
import cache from '@/libs/cache/categoryCahce';

const categoryAPI = {
  getCategory: async (): Promise<CategoryModel[]> => {
    const cachedData = cache.get();
    if (cachedData.length !== 0) {
      return cachedData;
    }
    const categories = await axios.get<CategoryModel[]>(endpoints.CATEGORY_API);
    cache.set(categories);
    return categories;
  },

  postCategory: async (data: CategoryRequestDTO): Promise<CategoryModel> => {
    const category = await axios.post<CategoryModel>(endpoints.CATEGORY_API, { ...data });
    cache.clear();
    return category;
  },

  updateCategory: async (data: CategoryRequestDTO): Promise<CategoryModel> => {
    const category = await axios.patch<CategoryModel>(`${endpoints.CATEGORY_API}/${data.cid}`, {
      ...data,
    });
    cache.clear();
    return category;
  },

  deleteCategory: async (cid: number): Promise<CategoryModel> => {
    const category = await axios.delete<CategoryModel>(`${endpoints.CATEGORY_API}/${cid}`);
    cache.clear();
    return category;
  },
};

export default categoryAPI;
