import CategoryEntity from '@/entity/category.entity';
import { Repository } from 'typeorm';
import { BAD_REQUEST } from '@/common/error';

export default class CategoryService {
  private categoryRepository: Repository<CategoryEntity>;

  constructor(categoryRepository: Repository<CategoryEntity>) {
    this.categoryRepository = categoryRepository;
  }

  public async createCategory(name: string, isIncome: boolean, uid: number): Promise<void> {
    const category = this.categoryRepository.create({ name, isIncome, uid });
    await this.categoryRepository.save(category);
  }

  public async readCategories(uid: number): Promise<CategoryEntity[]> {
    const categories = await this.categoryRepository.find({
      select: ['cid', 'name', 'isIncome'],
      where: { uid },
    });
    return categories;
  }

  public async updateCategory(
    categoryId: number,
    name: string,
    isIncome: boolean,
    uid: number,
  ): Promise<void> {
    const { affected } = await this.categoryRepository.update(
      { cid: categoryId, uid },
      { name, isIncome },
    );
    if (!affected) {
      throw new Error(BAD_REQUEST);
    }
  }

  public async deleteCategory(categoryId: number, uid: number): Promise<void> {
    const { affected } = await this.categoryRepository.delete({ cid: categoryId, uid });
    if (!affected) {
      throw new Error(BAD_REQUEST);
    }
  }
}
