import { CategoryModel } from '../types/category';

export default class CategoryDTO {
  id: number;

  name: string;

  isIncome: boolean;

  uid: number;

  constructor(category: CategoryModel) {
    this.id = category.cid;
    this.name = category.name;
    this.isIncome = category.isIncome;
    this.uid = category.uid;
  }
}
