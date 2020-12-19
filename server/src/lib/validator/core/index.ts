const isNumber = (value: any): boolean => {
  const regexp = /^[0-9]+$/;
  return regexp.test(value);
};

const notNull = (value: any): boolean => {
  if (value === null || value === undefined) {
    return false;
  }
  return true;
};

const nonZero = (value: any): boolean => {
  if (isNumber(value) && Number(value) !== 0) {
    return true;
  }
  return false;
};

const isDateString = (value: any): boolean => {
  const regexp = /^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/;
  return regexp.test(value);
};

export { isNumber, notNull, nonZero, isDateString };
