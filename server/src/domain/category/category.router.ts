import Router from 'koa-router';
import { Context } from 'koa';
import { categoryValidator } from '@/middleware/validator';
import CategoryService from './category.service';
import CategoryRepository from './category.repository';

export default class CategoryRouter extends Router {
  private categoryService;

  constructor() {
    super();
    this.categoryService = new CategoryService(CategoryRepository.getCategoryRepository());
  }

  initRouter(): void {
    this.post('/', categoryValidator, async (ctx: Context) => {
      const { uid } = ctx.state.user;
      const { name, isIncome } = ctx.request.body;
      const newCategory = await this.categoryService.createCategory(name, isIncome, uid);
      ctx.status = 201;
      ctx.body = newCategory;
    });

    this.get('/', async (ctx: Context) => {
      const { uid } = ctx.state.user;
      const categories = await this.categoryService.readCategories(uid);
      ctx.body = categories;
    });

    this.patch('/:categoryId', categoryValidator, async (ctx: Context) => {
      const { uid } = ctx.state.user;
      const { categoryId } = ctx.params;
      const { name, isIncome } = ctx.request.body;
      const updatedCategory = await this.categoryService.updateCategory(
        categoryId,
        name,
        isIncome,
        uid,
      );
      ctx.status = 200;
      ctx.body = updatedCategory;
    });

    this.delete('/:categoryId', async (ctx: Context) => {
      const { uid } = ctx.state.user;
      const { categoryId } = ctx.params;
      const deletedCategory = await this.categoryService.deleteCategory(categoryId, uid);
      ctx.status = 200;
      ctx.body = deletedCategory;
    });
  }
}
