import CategoryEntity from '@/entity/category.entity';
import { Repository } from 'typeorm';
import { DATABASE_ERROR, NOT_FOUND_ERROR } from '@/common/error';

export default class CategoryService {
  private categoryRepository: Repository<CategoryEntity>;

  constructor(categoryRepository: Repository<CategoryEntity>) {
    this.categoryRepository = categoryRepository;
  }

  public async createCategory(
    name: string,
    isIncome: boolean,
    uid: number,
  ): Promise<CategoryEntity> {
    const category = this.categoryRepository.create({ name, isIncome, uid });
    const newCategory = await this.categoryRepository.save(category);

    if (!newCategory) {
      throw DATABASE_ERROR;
    }
    return newCategory;
  }

  public async readCategories(uid: number): Promise<CategoryEntity[]> {
    const categories = await this.categoryRepository.find({
      select: ['cid', 'name', 'isIncome'],
      where: { uid },
    });
    return categories;
  }

  public async updateCategory(
    cid: number,
    name: string,
    isIncome: boolean,
    uid: number,
  ): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOne({ where: { cid, uid } });

    if (!category) {
      throw NOT_FOUND_ERROR;
    }
    const mergedCategory = this.categoryRepository.merge(category, { name, isIncome });
    const updatedCategory = await this.categoryRepository.save(mergedCategory);
    return updatedCategory;
  }

  public async deleteCategory(cid: number, uid: number): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOne({ where: { cid, uid } });

    if (!category) {
      throw NOT_FOUND_ERROR;
    }
    await this.categoryRepository.softDelete(category);
    return category;
  }
}
