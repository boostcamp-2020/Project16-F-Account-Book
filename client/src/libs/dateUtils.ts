import { AggregateInfo } from '@/components/transaction/LineGraph/types';

type ParsedDateModel = {
  year: number;
  month: number;
  date: number;
};

const parseDate = (date: Date | string): ParsedDateModel => {
  const dateInstance = date.constructor === Date ? date : new Date(date);
  return {
    year: dateInstance.getFullYear(),
    month: dateInstance.getMonth() + 1,
    date: dateInstance.getDate(),
  };
};

type StartEndDate = {
  startDate: string;
  endDate: string;
};

/**
 * @deprecated
 */
const getStartEndDate = (year: number, month: number): StartEndDate => {
  const date = new Date(year, month, 1);
  const startDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-01`;
  date.setMonth(month + 1);
  date.setDate(0);
  const endDate = `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${date.getDate()}`;
  return { startDate, endDate };
};

const getEndDateOfMonth = (year: number, month: number): number => {
  const date = new Date(year, month, 0);
  return date.getDate();
};

const makeDataForLineGraph = (aggregateInfo: AggregateInfo, year: number, month: number) => {
  const aggregateDateMap = new Map();
  let maxTotal = 0;
  aggregateInfo.forEach((info) => {
    const [date, totalInfo] = info;
    const dayMax = Math.max(totalInfo.totalIn, totalInfo.totalOut);
    maxTotal = dayMax > maxTotal ? dayMax : maxTotal;
    aggregateDateMap.set(date, totalInfo);
  });

  const endDate = getEndDateOfMonth(year, month);

  for (let date = 1; date <= endDate; date += 1) {
    const dailyTotal = aggregateDateMap.get(date);
    if (!dailyTotal) aggregateDateMap.set(date, { totalIn: 0, totalOut: 0 });
  }

  const dateKeys = Array.from(aggregateDateMap.keys()).map((key) => Number(key));
  dateKeys.sort((a, b) => a - b);

  const graphData = dateKeys.map((key) => {
    const dailyInfo = aggregateDateMap.get(key);
    return { date: key, 수입: dailyInfo.totalIn, 지출: dailyInfo.totalOut };
  });

  return { maxTotal, graphData };
};

export default { parseDate, getStartEndDate, getEndDateOfMonth, makeDataForLineGraph };
