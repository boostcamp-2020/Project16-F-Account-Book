import CategoryDTO from '@/commons/dto/category';
import PaymentDTO from '@/commons/dto/payment';

const checkOverlap = (target: string, dataList: Array<CategoryDTO | PaymentDTO>) => {
  if (target === undefined || target === '') return false;
  return !dataList.some((e) => e.name.trim() === target.trim());
};

export default checkOverlap;

// if (dataList.length > 0) {
//     const nameList: string[] = dataList.map((value: CategoryDTO | PaymentDTO) =>
//       value.name === target;
//     );
//     return !nameList.includes(target.replaceAll(' ', ''));
//   }
//   return true;
//   retr
