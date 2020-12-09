import { CategoryRequest } from '../types/category';

export default class CategoryRequestDTO {
  cid?: number | null;

  name!: string;

  isIncome!: boolean;

  constructor(input: CategoryRequest) {
    this.cid = input.cid ? input.cid : null;
    this.name = input.name;
    this.isIncome = input.isIncome;
  }
}
