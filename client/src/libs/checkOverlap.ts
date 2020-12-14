import CategoryDTO from '@/commons/dto/category';
import PaymentDTO from '@/commons/dto/payment';

const checkOverlap = (target: string, dataList: Array<CategoryDTO | PaymentDTO>) => {
  if (target === undefined || target === '') return false;
  return !dataList.some((e) => e.name.trim() === target.trim());
};

export default checkOverlap;
