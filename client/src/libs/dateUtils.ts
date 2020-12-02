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

export default { parseDate };
