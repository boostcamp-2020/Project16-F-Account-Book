export const isNumber = (value: any): boolean => {
  const regexp = /^[0-9]+$/;
  return regexp.test(value);
};

export const notNull = (value: any): boolean => {
  if (value === null || value === undefined) {
    return false;
  }
  return true;
};

export const nonZero = (value: any): boolean => {
  return Number(value) !== 0;
};

export const isPositiveNumber = (value: any): boolean => {
  if (Number(value) > 0) {
    return true;
  }
  return false;
};

export const isDateString = (value: any): boolean => {
  const regexp = /^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/;
  return regexp.test(value);
};

export const isBoolean = (value: any): boolean => {
  return value.constructor === Boolean || value === 'true' || value === 'false';
};

export const isString = (value: any): boolean => {
  return typeof value === 'string';
};
