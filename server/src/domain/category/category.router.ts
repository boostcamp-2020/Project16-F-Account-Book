import Router from 'koa-router';
import { Context } from 'koa';
import CategoryService from './category.service';
import CategoryRepository from './category.repository';

export default class CategoryRouter extends Router {
  private categoryService;

  constructor() {
    super();
    this.categoryService = new CategoryService(CategoryRepository.getCategoryRepository());
  }

  initRouter(): void {
    this.post('/', async (ctx: Context) => {
      const { uid } = ctx.state.user;
      const { name, isIncome } = ctx.request.body;
      await this.categoryService.createCategory(name, isIncome, uid);
      ctx.status = 200;
    });
  }
}
