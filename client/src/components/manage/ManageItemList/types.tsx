import { CategoryModel } from '@/commons/types/category';
import { PaymentModel } from '@/commons/types/payment';

export type ManageItemListProps = {
  itmes: CategoryModel[] | PaymentModel[];
};
