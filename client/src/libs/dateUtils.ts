type ParsedDateModel = {
  year: number;
  month: number;
  date: number;
};

const parseDate = (date: Date | string): ParsedDateModel => {
  const dateInstance = date.constructor === Date ? date : new Date(date);
  return {
    year: dateInstance.getFullYear(),
    month: dateInstance.getMonth(),
    date: dateInstance.getDate(),
  };
};

type StartEndDate = {
  startDate: string;
  endDate: string;
};

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

export default { parseDate, getStartEndDate };
