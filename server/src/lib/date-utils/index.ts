const dateToString = (date: Date): string => {
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
};

const countMonthBetween = (startDate: Date, endDate: Date): number => {
  const startYear = startDate.getFullYear();
  const startMonth = startDate.getMonth();
  const endYear = endDate.getFullYear();
  const endMonth = endDate.getMonth();
  const yearDiff = Math.abs(startYear - endYear);
  const monthDiff = Math.abs(startMonth - endMonth) + 1;
  return yearDiff * 12 + monthDiff;
};

const getStartDateAndEndDate = (
  year: number,
  month: number,
): { startDate: string; endDate: string } => {
  const startDate = dateToString(new Date(year, month - 1, 1));
  const endDate = dateToString(new Date(year, month, 0));
  return { startDate, endDate };
};

export default { dateToString, countMonthBetween, getStartDateAndEndDate };
