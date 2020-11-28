import CategoryEntity from '@/entity/category.entity';
import { Repository } from 'typeorm';

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

  public async updateCategory(categoryId: number, name: string, isIncome: boolean): Promise<void> {
    await this.categoryRepository.update({ cid: categoryId }, { name, isIncome });
  }

  public async deleteCategory(categoryId: number): Promise<void> {
    await this.categoryRepository.delete({ cid: categoryId });
  }
}
