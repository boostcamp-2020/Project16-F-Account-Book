import { CategoryModel } from '@/commons/types/category';

const cache: CategoryModel[] = [];

const set = (categories: CategoryModel[]): void => {
  cache.push(...Array.from(categories));
};

const get = (): CategoryModel[] => {
  return [...Array.from(cache)];
};

const clear = (): void => {
  cache.splice(0);
};

export default { set, get, clear };
