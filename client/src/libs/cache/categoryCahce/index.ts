import CategoryDTO from '@/commons/dto/category';

const cache: CategoryDTO[] = [];

const set = (categories: CategoryDTO[]): void => {
  cache.push(...Array.from(categories));
};

const get = (): CategoryDTO[] => {
  return [...Array.from(cache)];
};

const clear = (): void => {
  cache.splice(0);
};

export default { set, get, clear };
