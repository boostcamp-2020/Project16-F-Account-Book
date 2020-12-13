import DatabaseError from '@/common/error/database';
import NotFoundError from '@/common/error/not-found';
import CategoryEntity from '@/entity/category.entity';
import { Repository } from 'typeorm';

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
      throw new DatabaseError('Fail to create new category');
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
      throw new NotFoundError('Requested category resource does not exist');
    }
    const mergedCategory = this.categoryRepository.merge(category, { name, isIncome });
    const updatedCategory = await this.categoryRepository.save(mergedCategory);

    if (!updatedCategory) {
      throw new DatabaseError('Fail to update category');
    }

    return updatedCategory;
  }

  public async deleteCategory(cid: number, uid: number): Promise<CategoryEntity> {
    const category = await this.categoryRepository.findOne({ where: { cid, uid } });

    if (!category) {
      throw new NotFoundError('Requested category resource does not exist');
    }
    await this.categoryRepository.softDelete(category);
    return category;
  }
}
