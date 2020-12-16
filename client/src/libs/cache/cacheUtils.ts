import { YearMonthModel } from '@/commons/types/date';

const makeDateKey = ({ year, month }: YearMonthModel): string => `${year}-${month}`;

export default { makeDateKey };
