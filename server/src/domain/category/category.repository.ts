import CategoryEntity from '@/entity/category.entity';
import { getRepository, Repository } from 'typeorm';

const getCategoryRepository = (): Repository<CategoryEntity> => {
  return getRepository(CategoryEntity);
};

export default { getCategoryRepository };
