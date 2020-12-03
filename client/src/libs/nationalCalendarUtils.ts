import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import weekday from 'dayjs/plugin/weekday';
import 'dayjs/locale/ko';
import 'dayjs/locale/ja';
import 'dayjs/locale/zh';

dayjs.extend(localeData);
dayjs.extend(weekday);

const getMonthShort = (locale: string): any => {
  dayjs.locale(locale);
  return Array.from({ length: 12 }, (v, i) => dayjs().localeData().monthsShort(dayjs().month(i)));
};
export default getMonthShort;
