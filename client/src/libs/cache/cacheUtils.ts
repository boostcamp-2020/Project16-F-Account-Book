import { YearMonthModel } from '@/commons/types/date';
import dateUtils from '../dateUtils';

const makeDateKey = ({ year, month }: YearMonthModel): string =>
  `${year}-${month < 10 ? `0${month}` : month}`;

const getFurthermostDateKey = (currentKey: string, keySet: string[]): string => {
  const currentKeyToDateTime = new Date(currentKey).getTime();
  let furthermostDateTime = currentKeyToDateTime;
  let mostDiff = 0;

  keySet.forEach((compareKey) => {
    const compareKeyToDateTime = new Date(compareKey).getTime();
    const diff = Math.abs(compareKeyToDateTime - currentKeyToDateTime);

    if (diff === mostDiff) {
      furthermostDateTime = Math.min(furthermostDateTime, compareKeyToDateTime);
    }

    if (diff > mostDiff) {
      furthermostDateTime = compareKeyToDateTime;
      mostDiff = diff;
    }
  });

  const { year, month } = dateUtils.parseDate(new Date(furthermostDateTime));
  return makeDateKey({ year, month });
};

export default { makeDateKey, getFurthermostDateKey };
